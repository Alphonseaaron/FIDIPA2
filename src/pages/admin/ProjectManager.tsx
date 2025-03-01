import React, { useState } from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import DataTable from '../../components/admin/DataTable';
import ContentForm from '../../components/admin/ContentForm';
import { projects } from '../../data';

export default function ProjectManager() {
  const [projectsList, setProjectsList] = useState(projects);
  const [loading, setLoading] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const handleSave = async (data) => {
    try {
      if (editingProject?.id) {
        // Update existing project
        setProjectsList(prev => prev.map(project => 
          project.id === editingProject.id ? { ...project, ...data } : project
        ));
      } else {
        // Add new project
        const newProject = {
          id: Math.random().toString(36).substring(7),
          ...data,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        setProjectsList(prev => [newProject, ...prev]);
      }
      setEditingProject(null);
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Failed to save project');
    }
  };

  const handleDelete = async (project) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    
    try {
      setProjectsList(prev => prev.filter(p => p.id !== project.id));
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
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
              <img src={value[0]} alt="Project" className="w-16 h-16 object-cover rounded" />
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
        data={projectsList}
        onEdit={setEditingProject}
        onDelete={handleDelete}
      />
    </div>
  );
}