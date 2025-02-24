import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

// Supabase configuration
const supabaseUrl = 'https://bwvkubhcicqtirckhvpk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3dmt1YmhjaWNxdGlyY2todnBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzOTg2NzYsImV4cCI6MjA1NTk3NDY3Nn0.eW2nj8GLOkXLGM8n8MlIPaOjV-bUwnN4BsvXkTE-jEE';

// Create Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Storage functions
export async function uploadFile(file: File, folder: string = 'uploads'): Promise<{ url: string; path: string }> {
  try {
    const fileExtension = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExtension}`;
    const filePath = `${folder}/${fileName}`;
    
    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl: url } } = supabase.storage
      .from('media')
      .getPublicUrl(filePath);
    
    return {
      url,
      path: filePath
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

export async function deleteFile(path: string): Promise<void> {
  try {
    const { error } = await supabase.storage
      .from('media')
      .remove([path]);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}

// Authentication functions
export async function signIn() {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'admin@fidipa.org',
      password: 'fidipa2025!'
    });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}

// Initialize realtime subscriptions
const channels = {
  sections: supabase.channel('sections-changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'sections' }, 
      payload => console.log('Sections changed:', payload)
    ),
  programs: supabase.channel('programs-changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'programs' },
      payload => console.log('Programs changed:', payload)
    ),
  projects: supabase.channel('projects-changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' },
      payload => console.log('Projects changed:', payload)
    ),
  blog: supabase.channel('blog-changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'blog_posts' },
      payload => console.log('Blog posts changed:', payload)
    ),
  team: supabase.channel('team-changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'team_members' },
      payload => console.log('Team members changed:', payload)
    ),
  board: supabase.channel('board-changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'board_members' },
      payload => console.log('Board members changed:', payload)
    ),
  config: supabase.channel('config-changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'site_config' },
      payload => console.log('Site config changed:', payload)
    )
};

// Subscribe to all channels
Object.values(channels).forEach(channel => channel.subscribe());

export default supabase;