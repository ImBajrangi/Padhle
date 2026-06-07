import { useState, useRef, lazy, Suspense } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import usePdfViewer from './hooks/usePdfViewer';
import PDFViewer from './components/PDFViewer';
import ErrorModal from './components/ErrorModal';
import Background from './components/Background';

import Marketplace from './components/Marketplace';
import About from './components/About';
const StitchPlayground = lazy(() => import('./components/StitchPlayground'));
import NotFound from './components/NotFound';
import Footer from './components/Footer';

export default function App() {
  const fileInputRef = useRef(null);
  const viewer = usePdfViewer();
  const [view, setView] = useState('landing'); // 'landing', 'marketplace', 'viewer'
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [marketSearchQuery, setMarketSearchQuery] = useState('');

  const saveRecentFile = (name, pdfUrl) => {
    try {
      const recents = JSON.parse(localStorage.getItem('skilltadka_recent_files') || '[]');
      const filtered = recents.filter(f => f.name !== name);
      filtered.unshift({ name, pdfUrl, timestamp: Date.now() });
      localStorage.setItem('skilltadka_recent_files', JSON.stringify(filtered.slice(0, 5)));
    } catch (e) {
      console.error(e);
    }
  };

  const handleStartLearning = () => {
    setView('marketplace');
  };

  const handleFileSelect = (file) => {
    if (!file) return;
    setSelectedPdf(file);
    viewer.handleFileSelect(file);
    saveRecentFile(file.name, 'local');
    setView('viewer');
  };

  const openReader = (pdf = null) => {
    setSelectedPdf(pdf);
    if (pdf) {
      if (typeof pdf === 'string') {
        const friendlyName = pdf.split('/').pop().replace(/%20/g, ' ').replace('.pdf', '');
        viewer.loadFromUrl(pdf, friendlyName);
        saveRecentFile(friendlyName, pdf);
      } else {
        viewer.handleFileSelect(pdf);
        saveRecentFile(pdf.name, 'local');
      }
    } else {
      viewer.loadFromUrl('/sample.pdf', 'Studio Reader Demo');
      saveRecentFile('Studio Reader Demo', '/sample.pdf');
    }
    setView('viewer');
  };

  // ── View Rendering ──

  if (view === 'landing') {
    return (
      <div className={viewer.isDark ? 'dark-theme' : 'light-theme'}>
        <LandingPage 
          onStartLearning={handleStartLearning} 
          isDark={viewer.isDark} 
          toggleTheme={viewer.toggleTheme} 
        />
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
            searchQuery={marketSearchQuery}
            setSearchQuery={setMarketSearchQuery}
          />

          <main>
            {view === 'marketplace' && (
              <Marketplace 
                onOpenReader={openReader} 
                searchQuery={marketSearchQuery}
                setSearchQuery={setMarketSearchQuery}
              />
            )}
            {view === 'viewer' && (
              <PDFViewer
                file={selectedPdf}
                onClose={() => setView('marketplace')}
              />
            )}
            {view === 'about' && <About />}
            {view === 'stitch' && <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:'60vh',color:'var(--text-secondary)'}}>Loading Playground...</div>}><StitchPlayground /></Suspense>}
            {!['marketplace', 'viewer', 'about', 'stitch'].includes(view) && (
              <NotFound onGoHome={() => setView('landing')} />
            )}
          </main>

          <Footer setView={setView} />
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
