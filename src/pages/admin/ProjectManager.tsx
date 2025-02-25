import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import AdminHeader from '../../components/admin/AdminHeader';
import DataTable from '../../components/admin/DataTable';
import ContentForm from '../../components/admin/ContentForm';
import { Loader2 } from 'lucide-react';

export default function ProjectManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);
  const [importError, setImportError] = useState('');

  useEffect(() => {
    fetchProjects();

    const channel = supabase
      .channel('projects-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'projects' },
        () => {
          fetchProjects();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data) => {
    try {
      const { error } = await supabase
        .from('projects')
        .upsert({
          id: editingProject?.id,
          ...data,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      setEditingProject(null);
      await fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Failed to save project');
    }
  };

  const handleDelete = async (project) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', project.id);

      if (error) throw error;
      await fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project');
    }
  };

  const validateCsvData = (data) => {
    const requiredFields = ['id', 'title', 'slug', 'description'];
    const errors = [];

    data.forEach((row, index) => {
      requiredFields.forEach(field => {
        if (!row[field]) {
          errors.push(`Row ${index + 1}: Missing required field "${field}"`);
        }
      });

      // Validate slug format
      if (row.slug && !/^[a-z0-9-]+$/.test(row.slug)) {
        errors.push(`Row ${index + 1}: Invalid slug format. Use only lowercase letters, numbers, and hyphens`);
      }

      // Validate status if provided
      if (row.status && !['ongoing', 'completed'].includes(row.status)) {
        errors.push(`Row ${index + 1}: Invalid status. Must be either "ongoing" or "completed"`);
      }

      // Validate dates
      ['created_at', 'updated_at'].forEach(field => {
        if (row[field] && !isValidISODate(row[field])) {
          errors.push(`Row ${index + 1}: Invalid date format for ${field}. Use ISO format (e.g., 2024-02-24T00:00:00Z)`);
        }
      });
    });

    return errors;
  };

  const isValidISODate = (dateString) => {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date) && dateString.includes('T');
  };

  const parseCSVRow = (row) => {
    const values = [];
    let currentValue = '';
    let insideQuotes = false;

    for (let i = 0; i < row.length; i++) {
      const char = row[i];
      if (char === '"') {
        insideQuotes = !insideQuotes;
      } else if (char === ',' && !insideQuotes) {
        values.push(currentValue.trim());
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    values.push(currentValue.trim());
    return values;
  };

  const handleImportCSV = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImportError('');
    
    try {
      const text = await file.text();
      const rows = text.split('\n');
      const headers = parseCSVRow(rows[0]).map(h => h.toLowerCase().replace(/^["']|["']$/g, ''));
      
      const projects = rows.slice(1)
        .filter(row => row.trim())
        .map(row => {
          const values = parseCSVRow(row);
          return headers.reduce((obj, header, i) => {
            // Clean up the value and handle empty strings
            let value = values[i]?.replace(/^["']|["']$/g, '').trim() || null;
            
            // Handle specific fields
            if (header === 'created_at' || header === 'updated_at') {
              value = value || new Date().toISOString();
            }
            if (header === 'status') {
              value = value || 'ongoing';
            }
            
            obj[header] = value;
            return obj;
          }, {});
        });

      // Validate the data
      const validationErrors = validateCsvData(projects);
      if (validationErrors.length > 0) {
        setImportError(validationErrors.join('\n'));
        return;
      }

      // Insert the projects
      for (const project of projects) {
        const { error } = await supabase
          .from('projects')
          .upsert({
            ...project,
            updated_at: project.updated_at || new Date().toISOString(),
            created_at: project.created_at || new Date().toISOString()
          });

        if (error) {
          console.error('Error inserting project:', error);
          throw new Error(`Failed to insert project "${project.title}": ${error.message}`);
        }
      }

      await fetchProjects();
      alert('Projects imported successfully!');
      event.target.value = '';
    } catch (error) {
      console.error('Error importing projects:', error);
      setImportError('Failed to import projects: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (editingProject !== null) {
    return (
      <div className="space-y-6">
        <AdminHeader 
          title={editingProject?.id ? 'Edit Project' : 'New Project'} 
        />
        <ContentForm
          type="project"
          initialData={editingProject}
          onSubmit={handleSave}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminHeader 
        title="Projects" 
        onAdd={() => setEditingProject({})}
      />
      
      <div className="bg-dark-lighter p-6 rounded-lg space-y-4">
        <h3 className="text-lg font-medium mb-4">Import Projects</h3>
        <div className="space-y-2">
          <input
            type="file"
            accept=".csv"
            onChange={handleImportCSV}
            className="block w-full text-sm text-gray-400
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-primary file:text-white
              hover:file:bg-primary/90"
          />
          {importError && (
            <div className="text-red-500 text-sm whitespace-pre-line">
              {importError}
            </div>
          )}
          <p className="text-sm text-gray-400">
            CSV must include: id, title, slug, description (Required fields)
          </p>
          <p className="text-sm text-gray-400">
            Optional fields: content, image_url, status, meta_title, meta_description, created_at, updated_at
          </p>
        </div>
      </div>

      <DataTable
        columns={[
          { key: 'title', header: 'Title' },
          { key: 'description', header: 'Description' },
          { 
            key: 'status', 
            header: 'Status',
            render: (value) => (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                value === 'completed' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
              }`}>
                {value || 'ongoing'}
              </span>
            )
          },
          { 
            key: 'created_at', 
            header: 'Created',
            render: (value) => new Date(value).toLocaleDateString()
          }
        ]}
        data={projects}
        onEdit={setEditingProject}
        onDelete={handleDelete}
      />
    </div>
  );
}