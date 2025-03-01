import { useState, useEffect } from 'react';

interface User {
  email: string;
  role: 'admin' | 'user';
}

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
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        error: null,
        user: null
      });
    }
=======
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setAuthState({
          isAuthenticated: session.user.email === 'admin@fidipa.com',
          isLoading: false,
          error: null,
          user: session.user
        });
      } else {
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          error: null,
          user: null
        });
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setAuthState({
          isAuthenticated: session.user.email === 'admin@fidipa.com',
          isLoading: false,
          error: null,
          user: session.user
        });
      } else {
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          error: null,
          user: null
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
>>>>>>> 2235afba310fc26825bf3948de2acd839cb7377b
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
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      return data.user.email === 'admin@fidipa.com';
>>>>>>> 2235afba310fc26825bf3948de2acd839cb7377b
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        error: 'Invalid credentials'
      }));
      return false;
    }
  };

  const logout = async () => {
    localStorage.removeItem('user');
    setAuthState({
      isAuthenticated: false,
      isLoading: false,
      error: null,
      user: null
    });
  };

  return {
    ...authState,
    login,
    logout
  };
}