import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ReportProvider } from './contexts/ReportContext';
import { RewardProvider } from './contexts/RewardContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Report from './pages/Report';
import Dashboard from './pages/Dashboard';
import Rewards from './pages/Rewards';
import About from './pages/About';
import Donate from './pages/Donate';
import Sponsors from './pages/Sponsors';
import Shelters from './pages/Shelters';
import ProtectedRoute from './components/auth/ProtectedRoute';
import NotFound from './pages/NotFound';

// Scroll restoration component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Intersection Observer for fade-in animations
function setupScrollAnimation() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
  });
}

function App() {
  useEffect(() => {
    setupScrollAnimation();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <ReportProvider>
          <RewardProvider>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen bg-gray-50">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/report" element={
                    <ProtectedRoute>
                      <Report />
                    </ProtectedRoute>
                  } />
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/rewards" element={
                    <ProtectedRoute>
                      <Rewards />
                    </ProtectedRoute>
                  } />
                  <Route path="/about" element={<About />} />
                  <Route path="/donate" element={<Donate />} />
                  <Route path="/sponsors" element={<Sponsors />} />
                  <Route path="/shelters" element={<Shelters />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </RewardProvider>
        </ReportProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;