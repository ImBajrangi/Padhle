import { useState, useRef } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import usePdfViewer from './hooks/usePdfViewer';
import PDFViewer from './components/PDFViewer';
import ErrorModal from './components/ErrorModal';
import Background from './components/Background';

import Marketplace from './components/Marketplace';
import About from './components/About';
import Footer from './components/Footer';

export default function App() {
  const fileInputRef = useRef(null);
  const viewer = usePdfViewer();
  const [view, setView] = useState('landing'); // 'landing', 'marketplace', 'viewer'

  const handleStartLearning = () => {
    setView('marketplace');
  };

  const handleFileSelect = (file) => {
    viewer.handleFileSelect(file);
    setView('viewer');
  };

  const openReader = () => {
    if (viewer.pdfLoaded) {
      setView('viewer');
    } else {
      fileInputRef.current?.click();
    }
  };

  // ── View Rendering ──

  if (view === 'landing') {
    return (
      <div className="light-theme">
        <LandingPage onStartLearning={handleStartLearning} />
      </div>
    );
  }

  return (
    <div className={viewer.isDark ? 'dark-theme' : 'light-theme'}>
      <div className="app-container" style={{ position: 'relative', minHeight: '100vh' }}>
        <Background />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <Header
            fileName={viewer.fileName}
            isDark={viewer.isDark}
            toggleTheme={viewer.toggleTheme}
            onOpenFile={() => fileInputRef.current?.click()}
            currentView={view}
            setView={setView}
          />

          <main>
            {view === 'marketplace' && <Marketplace onOpenReader={openReader} />}
            {view === 'viewer' && (
              <PDFViewer
                file={viewer.selectedFile}
                onClose={() => setView('marketplace')}
              />
            )}
            {view === 'about' && <About />}
          </main>

          <Footer />
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => handleFileSelect(e.target.files[0])}
          accept="application/pdf"
          style={{ display: 'none' }}
        />
        <ErrorModal error={viewer.error} onClose={viewer.clearError} />
      </div>
    </div>
  );
}
