import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import AdminHeader from '../../components/admin/AdminHeader';
import DataTable from '../../components/admin/DataTable';
import ContentForm from '../../components/admin/ContentForm';
import { Loader2 } from 'lucide-react';

export default function ProgramManager() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProgram, setEditingProgram] = useState(null);
  const [importError, setImportError] = useState('');

  useEffect(() => {
    fetchPrograms();

    const channel = supabase
      .channel('programs-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'programs' },
        () => {
          fetchPrograms();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchPrograms = async () => {
    try {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPrograms(data || []);
    } catch (error) {
      console.error('Error fetching programs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data) => {
    try {
      const { error } = await supabase
        .from('programs')
        .upsert({
          id: editingProgram?.id,
          ...data,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      setEditingProgram(null);
      await fetchPrograms();
    } catch (error) {
      console.error('Error saving program:', error);
      alert('Failed to save program');
    }
  };

  const handleDelete = async (program) => {
    if (!window.confirm('Are you sure you want to delete this program?')) return;
    
    try {
      const { error } = await supabase
        .from('programs')
        .delete()
        .eq('id', program.id);

      if (error) throw error;
      await fetchPrograms();
    } catch (error) {
      console.error('Error deleting program:', error);
      alert('Failed to delete program');
    }
  };

  const validateCsvData = (data) => {
    const requiredFields = ['title', 'slug', 'description'];
    const errors = [];

    data.forEach((row, index) => {
      // Skip empty rows
      if (Object.values(row).every(value => !value)) {
        return;
      }

      requiredFields.forEach(field => {
        if (!row[field]) {
          errors.push(`Row ${index + 1}: Missing required field "${field}"`);
        }
      });

      // Validate slug format if present
      if (row.slug && !/^[a-z0-9-]+$/.test(row.slug)) {
        errors.push(`Row ${index + 1}: Invalid slug format. Use only lowercase letters, numbers, and hyphens`);
      }

      // Validate dates if present
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

  const handleImportCSV = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImportError('');
    
    try {
      const text = await file.text();
      const rows = text.split('\n');
      const headers = rows[0].toLowerCase().split(',').map(h => h.trim());
      
      const programs = rows.slice(1)
        .filter(row => row.trim()) // Skip empty rows
        .map(row => {
          const values = row.split(',').map(v => v.trim());
          return headers.reduce((obj, header, i) => {
            // Clean up the value and handle empty strings
            let value = values[i] || null;
            
            // Handle specific fields
            if (header === 'created_at' || header === 'updated_at') {
              value = value || new Date().toISOString();
            }
            
            obj[header] = value;
            return obj;
          }, {});
        });

      // Validate the data
      const validationErrors = validateCsvData(programs);
      if (validationErrors.length > 0) {
        setImportError(validationErrors.join('\n'));
        return;
      }

      // Insert the programs
      for (const program of programs) {
        const { error } = await supabase
          .from('programs')
          .upsert({
            ...program,
            updated_at: program.updated_at || new Date().toISOString(),
            created_at: program.created_at || new Date().toISOString()
          });

        if (error) throw error;
      }

      await fetchPrograms();
      alert('Programs imported successfully!');
      event.target.value = '';
    } catch (error) {
      console.error('Error importing programs:', error);
      setImportError('Failed to import programs: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (editingProgram !== null) {
    return (
      <div className="space-y-6">
        <AdminHeader 
          title={editingProgram?.id ? 'Edit Program' : 'New Program'} 
        />
        <ContentForm
          type="program"
          initialData={editingProgram}
          onSubmit={handleSave}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminHeader 
        title="Programs" 
        onAdd={() => setEditingProgram({})}
      />
      
      <div className="bg-dark-lighter p-6 rounded-lg space-y-4">
        <h3 className="text-lg font-medium mb-4">Import Programs</h3>
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
          <div className="bg-dark/50 p-4 rounded-lg">
            <h4 className="font-medium text-white mb-2">CSV Format Requirements:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
              <li>Required columns: title, slug, description</li>
              <li>Optional columns: content, image_url, meta_title, meta_description, created_at, updated_at</li>
              <li>Slug format: lowercase letters, numbers, and hyphens only (e.g., "my-program-title")</li>
              <li>Dates should be in ISO format (e.g., 2024-02-24T00:00:00Z)</li>
              <li>Empty rows will be skipped</li>
              <li>First row must be column headers</li>
              <li>Values should be comma-separated</li>
              <li>No quotes needed unless value contains commas</li>
            </ul>
          </div>
        </div>
      </div>

      <DataTable
        columns={[
          { key: 'title', header: 'Title' },
          { key: 'slug', header: 'Slug' },
          { key: 'description', header: 'Description' },
          { 
            key: 'image_url', 
            header: 'Image',
            render: (value) => value ? (
              <img src={value} alt="Program" className="w-16 h-16 object-cover rounded" />
            ) : 'No image'
          },
          { key: 'meta_title', header: 'Meta Title' },
          { key: 'meta_description', header: 'Meta Description' },
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
        data={programs}
        onEdit={setEditingProgram}
        onDelete={handleDelete}
      />
    </div>
  );
}