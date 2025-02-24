import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LogOut, Settings, FileText, Users, Layout, BookOpen, FolderOpen } from 'lucide-react';
import SectionEditor from '../../components/admin/SectionEditor';
import ContentForm from '../../components/admin/ContentForm';
import MediaLibrary from '../../components/admin/MediaLibrary';

export default function AdminPanel() {
  const { isAuthenticated, isLoading, login, logout } = useAuth();
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = await login();
    if (!success) {
      setLoginError('Invalid credentials');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="bg-dark-lighter p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded text-sm">
                {loginError}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded transition-colors"
            >
              Sign In with Supabase
            </button>
          </form>
        </div>
      </div>
    );
  }

  const navItems = [
    { title: 'Sections', icon: Layout, path: 'sections' },
    { title: 'Programs', icon: BookOpen, path: 'programs' },
    { title: 'Projects', icon: FolderOpen, path: 'projects' },
    { title: 'Blog Posts', icon: FileText, path: 'blog' },
    { title: 'Team', icon: Users, path: 'team' },
    { title: 'Media', icon: Settings, path: 'media' }
  ];

  return (
    <div className="min-h-screen bg-dark flex">
      {/* Sidebar */}
      <div className="w-64 bg-dark-lighter border-r border-gray-800">
        <div className="p-6">
          <h1 className="text-xl font-bold text-white">FIDIPA Admin</h1>
        </div>
        <nav className="mt-6">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center space-x-2 px-6 py-3 text-gray-300 hover:text-white hover:bg-dark-accent transition-colors"
            >
              <item.icon size={20} />
              <span>{item.title}</span>
            </button>
          ))}
        </nav>
        <button
          onClick={() => logout()}
          className="absolute bottom-8 left-6 flex items-center space-x-2 text-red-500 hover:text-red-400 transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Routes>
          <Route path="sections" element={<SectionEditor />} />
          <Route path="programs/*" element={<ContentForm type="program" />} />
          <Route path="projects/*" element={<ContentForm type="project" />} />
          <Route path="blog/*" element={<ContentForm type="blog" />} />
          <Route path="media" element={<MediaLibrary />} />
          <Route
            index
            element={
              <div className="text-center text-gray-400">
                Select a section from the sidebar to manage content
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}