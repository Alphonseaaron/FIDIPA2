import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import AdminHeader from '../../components/admin/AdminHeader';
import DataTable from '../../components/admin/DataTable';
import ContentForm from '../../components/admin/ContentForm';

export default function BlogManager() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    fetchPosts();

    const channel = supabase
      .channel('blog-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'blog_posts' },
        () => {
          fetchPosts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .upsert({
          id: editingPost?.id,
          ...data,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      setEditingPost(null);
      await fetchPosts();
    } catch (error) {
      console.error('Error saving blog post:', error);
      alert('Failed to save blog post');
    }
  };

  const handleDelete = async (post) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', post.id);

      if (error) throw error;
      await fetchPosts();
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
            key: 'created_at', 
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