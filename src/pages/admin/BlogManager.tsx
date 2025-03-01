import React, { useState } from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import DataTable from '../../components/admin/DataTable';
import ContentForm from '../../components/admin/ContentForm';
import { blogPosts } from '../../data';

export default function BlogManager() {
  const [posts, setPosts] = useState(blogPosts);
  const [loading, setLoading] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const handleSave = async (data) => {
    try {
      if (editingPost?.id) {
        // Update existing post
        setPosts(prev => prev.map(post => 
          post.id === editingPost.id ? { ...post, ...data } : post
        ));
      } else {
        // Add new post
        const newPost = {
          id: Math.random().toString(36).substring(7),
          ...data,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        setPosts(prev => [newPost, ...prev]);
      }
      setEditingPost(null);
    } catch (error) {
      console.error('Error saving blog post:', error);
      alert('Failed to save blog post');
    }
  };

  const handleDelete = async (post) => {
    try {
      setPosts(prev => prev.filter(p => p.id !== post.id));
    } catch (error) {
      console.error('Error deleting blog post:', error);
      alert('Failed to delete blog post');
    }
  };

  if (editingPost !== null) {
    return (
      <div className="space-y-6">
        <AdminHeader 
          title={editingPost?.id ? 'Edit Blog Post' : 'New Blog Post'} 
        />
        <ContentForm
          type="blog"
          initialData={editingPost}
          onSubmit={handleSave}
        />
      </div>
    );
  }

  return (
    <div>
      <AdminHeader 
        title="Blog Posts" 
        onAdd={() => setEditingPost({})}
      />
      <DataTable
        columns={[
          { key: 'title', header: 'Title' },
          { 
            key: 'status', 
            header: 'Status',
            render: (value) => (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                value === 'published' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
              }`}>
                {value || 'draft'}
              </span>
            )
          },
          { 
            key: 'createdAt', 
            header: 'Created',
            render: (value) => new Date(value).toLocaleDateString()
          }
        ]}
        data={posts}
        onEdit={setEditingPost}
        onDelete={handleDelete}
      />
    </div>
  );
}