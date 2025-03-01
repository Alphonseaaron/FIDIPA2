import React, { useState } from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import DataTable from '../../components/admin/DataTable';
import ContentForm from '../../components/admin/ContentForm';
import { programs } from '../../data';

export default function ProgramManager() {
  const [programsList, setProgramsList] = useState(programs);
  const [loading, setLoading] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);

  const handleSave = async (data) => {
    try {
      if (editingProgram?.id) {
        // Update existing program
        setProgramsList(prev => prev.map(program => 
          program.id === editingProgram.id ? { ...program, ...data } : program
        ));
      } else {
        // Add new program
        const newProgram = {
          id: Math.random().toString(36).substring(7),
          ...data,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        setProgramsList(prev => [newProgram, ...prev]);
      }
      setEditingProgram(null);
    } catch (error) {
      console.error('Error saving program:', error);
      alert('Failed to save program');
    }
  };

  const handleDelete = async (program) => {
    if (!window.confirm('Are you sure you want to delete this program?')) return;
    
    try {
      setProgramsList(prev => prev.filter(p => p.id !== program.id));
    } catch (error) {
      console.error('Error deleting program:', error);
      alert('Failed to delete program');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
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
            key: 'images', 
            header: 'Image',
            render: (value) => value && value.length > 0 ? (
              <img src={value[0]} alt="Program" className="w-16 h-16 object-cover rounded" />
            ) : 'No image'
          },
          { key: 'metaTitle', header: 'Meta Title' },
          { 
            key: 'metaDescription', 
            header: 'Meta Description',
            render: (value) => (
              <div className="max-w-md">
                <p className="line-clamp-2">{value}</p>
              </div>
            )
          },
          { 
            key: 'createdAt', 
            header: 'Created',
            render: (value) => new Date(value).toLocaleDateString()
          },
          { 
            key: 'updatedAt', 
            header: 'Updated',
            render: (value) => new Date(value).toLocaleDateString()
          }
        ]}
        data={programsList}
        onEdit={setEditingProgram}
        onDelete={handleDelete}
      />
    </div>
  );
}