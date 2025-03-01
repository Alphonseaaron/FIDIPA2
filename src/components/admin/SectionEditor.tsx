import React, { useState, useEffect } from 'react';
import AdminHeader from './AdminHeader';
import DataTable from './DataTable';
import Editor from './Editor';
import MediaUploader from './MediaUploader';
import { Loader2 } from 'lucide-react';

interface Section {
  id: string;
  title: string;
  content: string | null;
  image_url: string | null;
  sort_order: number;
}

export default function SectionEditor() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Simulate fetching sections
    setTimeout(() => {
      const mockSections = [
        {
          id: '1',
          title: 'Home Section',
          content: 'Welcome to FIDIPA',
          image_url: '/src/assets/images/DSC01363.JPG',
          sort_order: 0
        },
        {
          id: '2',
          title: 'About Section',
          content: 'FIDIPA is a Non-Governmental Organization registered in Kenya in 2007.',
          image_url: '/src/assets/images/SAM_0721.JPG',
          sort_order: 1
        }
      ];
      setSections(mockSections);
      setLoading(false);
    }, 1000);
  }, []);

  const fetchSections = async () => {
    // This would be replaced with actual data fetching in a real implementation
    setLoading(true);
    setTimeout(() => {
      const mockSections = [
        {
          id: '1',
          title: 'Home Section',
          content: 'Welcome to FIDIPA',
          image_url: '/src/assets/images/DSC01363.JPG',
          sort_order: 0
        },
        {
          id: '2',
          title: 'About Section',
          content: 'FIDIPA is a Non-Governmental Organization registered in Kenya in 2007.',
          image_url: '/src/assets/images/SAM_0721.JPG',
          sort_order: 1
        }
      ];
      setSections(mockSections);
      setLoading(false);
    }, 1000);
  };

  const handleSave = async (section: Section) => {
    setSaving(true);
    try {
      // Simulate saving
      setTimeout(() => {
        if (section.id) {
          setSections(prev => prev.map(s => s.id === section.id ? section : s));
        } else {
          const newSection = {
            ...section,
            id: Math.random().toString(36).substring(7)
          };
          setSections(prev => [...prev, newSection]);
        }
        setEditingSection(null);
        setSaving(false);
      }, 1000);
    } catch (error) {
      console.error('Error saving section:', error);
      alert('Failed to save section');
      setSaving(false);
    }
  };

  const handleDelete = async (section: Section) => {
    try {
      // Simulate deleting
      setTimeout(() => {
        setSections(prev => prev.filter(s => s.id !== section.id));
      }, 500);
    } catch (error) {
      console.error('Error deleting section:', error);
      alert('Failed to delete section');
    }
  };

  const handleAdd = () => {
    setEditingSection({
      id: '',
      title: '',
      content: '',
      image_url: null,
      sort_order: sections.length
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (editingSection) {
    return (
      <div className="space-y-6">
        <AdminHeader 
          title={editingSection.id ? 'Edit Section' : 'New Section'} 
        />
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={editingSection.title}
              onChange={(e) => setEditingSection({ ...editingSection, title: e.target.value })}
              className="w-full p-2 rounded bg-dark border border-gray-600 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Content</label>
            <Editor
              value={editingSection.content || ''}
              onChange={(content) => setEditingSection({ ...editingSection, content })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Image</label>
            <MediaUploader
              onUploadComplete={(url) => setEditingSection({ ...editingSection, image_url: url })}
              folder="sections"
            />
            {editingSection.image_url && (
              <img 
                src={editingSection.image_url} 
                alt="Preview" 
                className="mt-2 max-h-40 rounded"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Order</label>
            <input
              type="number"
              value={editingSection.sort_order}
              onChange={(e) => setEditingSection({ 
                ...editingSection, 
                sort_order: parseInt(e.target.value) 
              })}
              className="w-full p-2 rounded bg-dark border border-gray-600 text-white"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setEditingSection(null)}
              className="px-4 py-2 rounded border border-gray-600 hover:border-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => handleSave(editingSection)}
              disabled={saving}
              className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AdminHeader title="Sections" onAdd={handleAdd} />
      <DataTable
        columns={[
          { key: 'title', header: 'Title' },
          { 
            key: 'image_url', 
            header: 'Image',
            render: (value) => value ? (
              <img src={value} alt="Section" className="w-16 h-16 object-cover rounded" />
            ) : null
          },
          { key: 'sort_order', header: 'Order' }
        ]}
        data={sections}
        onEdit={setEditingSection}
        onDelete={handleDelete}
      />
    </div>
  );
}