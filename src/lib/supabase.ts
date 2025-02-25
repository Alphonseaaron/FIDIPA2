import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

// Supabase configuration
const supabaseUrl = 'https://bwvkubhcicqtirckhvpk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3dmt1YmhjaWNxdGlyY2todnBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzOTg2NzYsImV4cCI6MjA1NTk3NDY3Nn0.eW2nj8GLOkXLGM8n8MlIPaOjV-bUwnN4BsvXkTE-jEE';

// Create Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Admin authentication functions
export async function adminSignIn(email: string, password: string) {
  try {
    if (email !== 'admin@fidipa.com') {
      throw new Error('Invalid admin credentials');
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
}

export async function adminSignOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}

export default supabase;