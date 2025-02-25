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
      
      const programs = rows.slice(1)
        .filter(row => row.trim())
        .map(row => {
          const values = row.split(',').map(v => v.trim());
          return headers.reduce((obj, header, i) => {
            let value = values[i] || null;
            
            if (header === 'created_at' || header === 'updated_at') {
              value = value || new Date().toISOString();
            }
            
            obj[header] = value;
            return obj;
          }, {});
        });

      const validationErrors = validateCsvData(programs);
      if (validationErrors.length > 0) {
        setImportError(validationErrors.join('\n'));
        return;
      }

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
            <div className="text-red-500 text-sm whitespace-pre-line bg-red-500/10 p-4 rounded-lg border border-red-500/20">
              <p className="font-medium mb-2">Import Validation Errors:</p>
              {importError}
            </div>
          )}
          <div className="bg-dark/50 p-4 rounded-lg">
            <h4 className="font-medium text-white mb-2">CSV Format Requirements:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
              <li>Required fields: title, slug, description</li>
              <li>Optional fields: content, image_url, meta_title, meta_description, created_at, updated_at</li>
              <li>Title: Program name (e.g., "Gender Equality and Social Inclusion Program")</li>
              <li>Slug: URL-friendly version of title (e.g., "gender-equality-and-social-inclusion")
                <ul className="list-disc list-inside ml-4 mt-1">
                  <li>Must contain only lowercase letters, numbers, and hyphens</li>
                  <li>No spaces or special characters allowed</li>
                  <li>Must be unique across all programs</li>
                </ul>
              </li>
              <li>Description: Brief overview of the program (1-2 sentences)</li>
              <li>Content: Detailed program information including:
                <ul className="list-disc list-inside ml-4 mt-1">
                  <li>Program objectives</li>
                  <li>Key components</li>
                  <li>Target beneficiaries</li>
                  <li>Implementation approach</li>
                  <li>Expected outcomes</li>
                </ul>
              </li>
              <li>Image URL: Public URL for program image</li>
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
              <img src={value} alt="Program" className="w-16 h-16 object-cover rounded" />
            ) : 'No image'
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
        data={programs}
        onEdit={setEditingProgram}
        onDelete={handleDelete}
      />
    </div>
  );
}