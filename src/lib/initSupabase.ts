import { supabase } from './supabase';

export async function initializeSupabase() {
  try {
    // Test the connection
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;

    // Verify database connection by querying site_config
    const { data: configData, error: configError } = await supabase
      .from('site_config')
      .select('name')
      .single();

    if (configError) throw configError;

    console.log('✅ Supabase initialized successfully');
    console.log(`Connected to: ${configData?.name || 'FIDIPA'}`);

    return true;
  } catch (error) {
    console.error('❌ Error initializing Supabase:', error);
    throw error;
  }
}