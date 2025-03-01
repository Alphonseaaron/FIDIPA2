import { useState, useEffect } from 'react';
<<<<<<< HEAD

interface User {
  email: string;
  role: 'admin' | 'user';
}
=======
import { User } from '@supabase/supabase-js';
import { supabase, adminSignIn, adminSignOut } from '../lib/supabase';
>>>>>>> 2235afba310fc26825bf3948de2acd839cb7377b

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
<<<<<<< HEAD
    // Check if user is logged in from localStorage
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      setAuthState({
        isAuthenticated: userData.email === 'admin@fidipa.org',
        isLoading: false,
        error: null,
        user: userData
      });
    } else {
=======
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
>>>>>>> 2235afba310fc26825bf3948de2acd839cb7377b
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
<<<<<<< HEAD
      // Simple admin authentication
      if (email === 'admin@fidipa.org' && password === 'admin123') {
        const user = { email, role: 'admin' as const };
        localStorage.setItem('user', JSON.stringify(user));
        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          error: null,
          user
        });
        return true;
      }
      throw new Error('Invalid credentials');
=======
      const { user } = await adminSignIn(email, password);
      return user?.email === 'admin@fidipa.com';
>>>>>>> 2235afba310fc26825bf3948de2acd839cb7377b
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
<<<<<<< HEAD
    localStorage.removeItem('user');
    setAuthState({
      isAuthenticated: false,
      isLoading: false,
      error: null,
      user: null
    });
=======
    try {
      await adminSignOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
>>>>>>> 2235afba310fc26825bf3948de2acd839cb7377b
  };

  return {
    ...authState,
    login,
    logout
  };
}