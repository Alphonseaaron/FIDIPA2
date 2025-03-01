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
  }, []);

  const login = async (email: string, password: string) => {
    try {
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