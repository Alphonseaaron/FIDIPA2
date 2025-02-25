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
    const requiredFields = ['title', 'slug', 'description'];
    const errors = [];
    let rowNumber = 1;

    data.forEach((row) => {
      rowNumber++;

      // Skip completely empty rows
      if (Object.values(row).every(value => !value)) return;

      // Check for required fields
      requiredFields.forEach(field => {
        if (!row[field] || row[field].trim() === '') {
          errors.push(`Row ${rowNumber}: Missing required field "${field}"`);
        }
      });

      // Validate slug format
      if (row.slug) {
        if (!/^[a-z0-9-]+$/.test(row.slug)) {
          errors.push(`Row ${rowNumber}: Invalid slug format. Use only lowercase letters, numbers, and hyphens`);
        }
      }

      // Validate status
      if (row.status) {
        if (!['ongoing', 'completed'].includes(row.status)) {
          errors.push(`Row ${rowNumber}: Invalid status. Must be either "ongoing" or "completed"`);
        }
      }

      // Validate dates
      ['created_at', 'updated_at'].forEach(field => {
        if (row[field]) {
          if (!isValidISODate(row[field])) {
            errors.push(`Row ${rowNumber}: Invalid date format for ${field}. Use ISO format (e.g., 2024-02-24T00:00:00Z)`);
          }
        }
      });

      // Validate meta fields length
      if (row.meta_title && row.meta_title.length > 60) {
        errors.push(`Row ${rowNumber}: Meta title exceeds 60 characters`);
      }
      if (row.meta_description && row.meta_description.length > 160) {
        errors.push(`Row ${rowNumber}: Meta description exceeds 160 characters`);
      }
    });

    return errors;
  };

  const isValidISODate = (dateString) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date) && dateString.includes('T') && dateString.includes('Z');
  };

  const handleImportCSV = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImportError('');
    
    try {
      const text = await file.text();
      const rows = text.split('\n');
      const headers = rows[0].toLowerCase().split(',').map(h => h.trim());
      
      const projects = rows.slice(1)
        .filter(row => row.trim())
        .map(row => {
          const values = row.split(',').map(v => v.trim());
          return headers.reduce((obj, header, i) => {
            let value = values[i] || null;
            
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

      const validationErrors = validateCsvData(projects);
      if (validationErrors.length > 0) {
        setImportError(validationErrors.join('\n'));
        return;
      }

      for (const project of projects) {
        const { error } = await supabase
          .from('projects')
          .upsert({
            ...project,
            updated_at: project.updated_at || new Date().toISOString(),
            created_at: project.created_at || new Date().toISOString()
          });

        if (error) throw error;
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
            <div className="text-red-500 text-sm whitespace-pre-line bg-red-500/10 p-4 rounded-lg border border-red-500/20">
              <p className="font-medium mb-2">Import Validation Errors:</p>
              {importError}
            </div>
          )}
          <div className="bg-dark/50 p-4 rounded-lg">
            <h4 className="font-medium text-white mb-2">CSV Format Requirements:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
              <li>Required fields: title, slug, description</li>
              <li>Optional fields: content, image_url, status, meta_title, meta_description, created_at, updated_at</li>
              <li>Title: Project name (e.g., "Community Training Initiative")</li>
              <li>Slug: URL-friendly version of title (e.g., "community-training-initiative")
                <ul className="list-disc list-inside ml-4 mt-1">
                  <li>Must contain only lowercase letters, numbers, and hyphens</li>
                  <li>No spaces or special characters allowed</li>
                  <li>Must be unique across all projects</li>
                </ul>
              </li>
              <li>Description: Brief overview of the project (1-2 sentences)</li>
              <li>Content: Detailed project information including:
                <ul className="list-disc list-inside ml-4 mt-1">
                  <li>Project objectives</li>
                  <li>Timeline and milestones</li>
                  <li>Implementation details</li>
                  <li>Impact metrics</li>
                  <li>Key achievements</li>
                </ul>
              </li>
              <li>Status: Must be either "ongoing" or "completed" (defaults to "ongoing")</li>
              <li>Image URL: Public URL for project image</li>
              <li>Meta Title: SEO title (maximum 60 characters)</li>
              <li>Meta Description: SEO description (maximum 160 characters)</li>
              <li>Created/Updated At: ISO date format (YYYY-MM-DDTHH:mm:ssZ)</li>
              <li>Empty rows will be skipped</li>
              <li>First row must be column headers</li>
              <li>Values should be comma-separated</li>
              <li>Use quotes for values containing commas</li>
            </ul>
          </div>
        </div>
      </div>

      <DataTable
        columns={[
          { key: 'title', header: 'Title' },
          { key: 'slug', header: 'Slug' },
          { 
            key: 'description', 
            header: 'Description',
            render: (value) => (
              <div className="max-w-md">
                <p className="line-clamp-2">{value}</p>
              </div>
            )
          },
          { 
            key: 'content', 
            header: 'Content',
            render: (value) => (
              <div className="max-w-md">
                <p className="line-clamp-2">{value}</p>
              </div>
            )
          },
          { 
            key: 'image_url', 
            header: 'Image',
            render: (value) => value ? (
              <img src={value} alt="Project" className="w-16 h-16 object-cover rounded" />
            ) : 'No image'
          },
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
          { key: 'meta_title', header: 'Meta Title' },
          { 
            key: 'meta_description', 
            header: 'Meta Description',
            render: (value) => (
              <div className="max-w-md">
                <p className="line-clamp-2">{value}</p>
              </div>
            )
          },
          { 
            key: 'created_at', 
            header: 'Created',
            render: (value) => new Date(value).toLocaleDateString()
          },
          { 
            key: 'updated_at', 
            header: 'Updated',
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