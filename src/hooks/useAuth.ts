import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, adminSignIn, adminSignOut } from '../lib/supabase';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  user: User | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    error: null,
    user: null
  });

  useEffect(() => {
    // Only check auth state when in admin routes
    if (window.location.pathname.startsWith('/admin')) {
      // Get initial session
      supabase.auth.getSession().then(({ data: { session } }) => {
        setAuthState({
          isAuthenticated: session?.user?.email === 'admin@fidipa.com',
          isLoading: false,
          error: null,
          user: session?.user || null
        });
      });

      // Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        setAuthState({
          isAuthenticated: session?.user?.email === 'admin@fidipa.com',
          isLoading: false,
          error: null,
          user: session?.user || null
        });
      });

      return () => {
        subscription.unsubscribe();
      };
    } else {
      // Not in admin route, set as not authenticated
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        error: null,
        user: null
      });
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { user } = await adminSignIn(email, password);
      return user?.email === 'admin@fidipa.com';
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await adminSignOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return {
    ...authState,
    login,
    logout
  };
}