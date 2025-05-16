import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/Home';
import ProjectsPage from './pages/Projects';
import AdminPanel from './pages/admin/AdminPanel';
import ProgramsPage from './pages/Programs';
import ProgramDetailPage from './pages/ProgramDetail';
import ProjectDetailPage from './pages/ProjectDetail';
import EditButton from './components/EditButton';

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const isEditMode = location.pathname.includes('/edit');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setIsEditing(isEditMode);
  }, [isEditMode]);

  const handleToggleEdit = () => {
    const newPath = isEditing 
      ? location.pathname.replace('/edit', '') 
      : location.pathname + '/edit';
      
    window.history.pushState({}, '', newPath);
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      // Here you would implement the logic to save changes to the backend
      console.log('Saving changes...');
      
      // After successful save, exit edit mode
      handleToggleEdit();
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('Failed to save changes. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-dark text-dark dark:text-white">
      {!isAdmin && <Navbar />}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage isEditing={isEditing} />} />
          <Route path="/edit" element={<HomePage isEditing={isEditing} />} />
          <Route path="/projects" element={<ProjectsPage isEditing={isEditing} />} />
          <Route path="/projects/edit" element={<ProjectsPage isEditing={isEditing} />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage isEditing={isEditing} />} />
          <Route path="/projects/:slug/edit" element={<ProjectDetailPage isEditing={isEditing} />} />
          <Route path="/programs" element={<ProgramsPage isEditing={isEditing} />} />
          <Route path="/programs/edit" element={<ProgramsPage isEditing={isEditing} />} />
          <Route path="/programs/:slug" element={<ProgramDetailPage isEditing={isEditing} />} />
          <Route path="/programs/:slug/edit" element={<ProgramDetailPage isEditing={isEditing} />} />
          <Route path="/admin/*" element={<AdminPanel />} />
        </Routes>
      </div>
      {!isAdmin && (
        <EditButton
          isEditing={isEditing}
          onToggleEdit={handleToggleEdit}
          onSave={handleSave}
        />
      )}
      {!isAdmin && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;