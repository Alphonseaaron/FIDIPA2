import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Trash2, Copy, Loader2 } from 'lucide-react';
import MediaUploader from './MediaUploader';
import AdminHeader from './AdminHeader';

interface MediaItem {
  name: string;
  url: string;
  path: string;
}

export default function MediaLibrary() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [copying, setCopying] = useState<string | null>(null);

  useEffect(() => {
    fetchMediaItems();
  }, []);

  const fetchMediaItems = async () => {
    try {
      const { data: files, error } = await supabase.storage
        .from('media')
        .list('uploads');

      if (error) throw error;

      const items = await Promise.all(
        (files || []).map(async (file) => {
          const { data: { publicUrl } } = supabase.storage
            .from('media')
            .getPublicUrl(`uploads/${file.name}`);

          return {
            name: file.name,
            url: publicUrl,
            path: `uploads/${file.name}`
          };
        })
      );

      setMediaItems(items);
    } catch (error) {
      console.error('Error fetching media items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (item: MediaItem) => {
    if (!window.confirm('Are you sure you want to delete this file?')) return;

    try {
      const { error } = await supabase.storage
        .from('media')
        .remove([item.path]);

      if (error) throw error;
      setMediaItems(prev => prev.filter(i => i.path !== item.path));
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('Failed to delete file');
    }
  };

  const copyToClipboard = async (url: string) => {
    try {
      setCopying(url);
      await navigator.clipboard.writeText(url);
      setTimeout(() => setCopying(null), 1000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      alert('Failed to copy URL');
      setCopying(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <AdminHeader title="Media Library" />
      
      <MediaUploader
        onUploadComplete={(url, path) => {
          setMediaItems(prev => [{
            url,
            path,
            name: path.split('/').pop() || ''
          }, ...prev]);
        }}
        folder="uploads"
      />
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mediaItems.map((item) => (
          <div key={item.path} className="group relative bg-dark-lighter rounded-lg overflow-hidden">
            <img
              src={item.url}
              alt={item.name}
              className="w-full aspect-square object-cover"
            />
            
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                onClick={() => copyToClipboard(item.url)}
                className="p-2 bg-dark/80 rounded-full hover:bg-dark text-white"
                title="Copy URL"
              >
                {copying === item.url ? (
                  <span className="text-primary">Copied!</span>
                ) : (
                  <Copy size={20} />
                )}
              </button>
              <button
                onClick={() => handleDelete(item)}
                className="p-2 bg-dark/80 rounded-full hover:bg-dark text-red-500"
                title="Delete"
              >
                <Trash2 size={20} />
              </button>
            </div>
            
            <div className="absolute bottom-0 inset-x-0 p-2 bg-black/60">
              <p className="text-sm text-white truncate">{item.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}