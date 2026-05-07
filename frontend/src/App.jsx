import React, { useState, useEffect } from 'react';
import Home from './pages/home';
import ExpertDirectory from './pages/experts';
import SecuritySprintMarketplace from './pages/marketplace';
import Dashboard from './pages/reports';
import AuthenticationPage from './pages/auth';
import LegalHub from './pages/legal';
import './styles/globals.css';

function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => setPath(window.location.pathname);

    // Intercept clicks on anchor tags
    const handleLinkClick = (e) => {
      const target = e.target.closest('a');
      if (target && target.href && target.href.startsWith(window.location.origin)) {
        // Only intercept if it's not an external link or a hash link meant for the current page.
        // If it starts with / and it's our own domain, intercept.
        const url = new URL(target.href);
        if (url.pathname !== window.location.pathname) {
          e.preventDefault();
          window.history.pushState({}, '', target.href);
          setPath(url.pathname);
          window.scrollTo(0, 0);
        }
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    document.addEventListener('click', handleLinkClick);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  return (
    <div className="App overflow-x-hidden min-h-screen bg-[#0b111a]">
      {path === '/experts' ? <ExpertDirectory /> : 
       path === '/sprints' ? <SecuritySprintMarketplace /> : 
       path === '/dashboard' ? <Dashboard /> : 
       path === '/auth' ? <AuthenticationPage /> : 
       path === '/legal' ? <LegalHub /> : 
       <Home />}
    </div>
  );
}

export default App;