import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/Home';
import ProgramsPage from './pages/Programs';
import AdminPanel from './pages/admin/AdminPanel';
import ProgramDetailPage from './pages/ProgramDetail';
import Gallery from './pages/Gallery';
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

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-dark text-dark dark:text-white">
      {!isAdmin && <Navbar />}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage isEditing={isEditMode} />} />
          <Route path="/edit" element={<HomePage isEditing={isEditMode} />} />
          <Route path="/programs" element={<ProgramsPage isEditing={isEditMode} />} />
          <Route path="/programs/edit" element={<ProgramsPage isEditing={isEditMode} />} />
          <Route path="/programs/:slug" element={<ProgramDetailPage isEditing={isEditMode} />} />
          <Route path="/programs/:slug/edit" element={<ProgramDetailPage isEditing={isEditMode} />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/admin/*" element={<AdminPanel />} />
        </Routes>
      </div>
      {!isAdmin && isEditMode && (
        <EditButton
          isEditing={isEditMode}
          onToggleEdit={() => {
            const newPath = isEditMode 
              ? location.pathname.replace('/edit', '') 
              : location.pathname + '/edit';
            window.history.pushState({}, '', newPath);
          }}
          onSave={async () => {
            try {
              console.log('Saving changes...');
              const newPath = location.pathname.replace('/edit', '');
              window.history.pushState({}, '', newPath);
            } catch (error) {
              console.error('Error saving changes:', error);
              alert('Failed to save changes. Please try again.');
            }
          }}
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