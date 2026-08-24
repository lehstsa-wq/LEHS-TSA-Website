
import React, { useEffect, Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { ModalProvider } from './context/ModalContext';
import { BackToTop } from './components/BackToTop';
import { initAnalytics, trackPageView } from './lib/analytics';
import { StickyMobileCTA } from './components/StickyMobileCTA';
import { Cursor } from './components/art/Cursor';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Officers from './pages/Officers';
import Resources from './pages/Resources';
import Join from './pages/Join';
import Contact from './pages/Contact';
import News from './pages/News';

// Behind auth or heavy: split into their own chunks so the first paint does not
// carry the admin console.
const Competitions = lazy(() => import('./pages/Competitions'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const StudentUpdates = lazy(() => import('./pages/StudentUpdates'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const Settings = lazy(() => import('./pages/Settings'));
const Interests = lazy(() => import('./pages/Interests'));
const MemberDirectory = lazy(() => import('./pages/MemberDirectory'));
const CheckIn = lazy(() => import('./pages/CheckIn'));
const Teams = lazy(() => import('./pages/Teams'));
const Opportunities = lazy(() => import('./pages/Opportunities'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const ThankYou = lazy(() => import('./pages/ThankYou'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Analytics Tracker Placeholder
const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => { initAnalytics(); }, []);

  useEffect(() => {
    // HashRouter navigations never trigger a document load, so each route
    // change has to report its own page view.
    trackPageView(location.pathname + location.hash, document.title);
  }, [location]);

  return null;
};


/** Shown while a lazily loaded route chunk is fetched. */
const RouteFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center" role="status" aria-live="polite">
    <span className="sr-only">Loading page</span>
    <span className="h-6 w-6 rounded-full border-2 border-current border-t-transparent animate-spin opacity-40" />
  </div>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <ThemeProvider>
          <ToastProvider>
            <ModalProvider>
              <Router>
                <ScrollToTop />
                <RouteTracker />
                <Cursor />
                <Layout>
                  <Suspense fallback={<RouteFallback />}>
                  <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/officers" element={<Officers />} />
                  <Route path="/competitions" element={<Competitions />} />
                  <Route path="/news" element={<News />} />
                  <Route path="/resources" element={<Resources />} />
                  <Route path="/join" element={<Join />} />
                  <Route path="/contact" element={<Contact />} />
                  
                  {/* Auth Routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />

                  {/* Protected Routes */}
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/updates" 
                    element={
                      <ProtectedRoute>
                        <StudentUpdates />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/interests" 
                    element={
                      <ProtectedRoute>
                        <Interests />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/settings" 
                    element={
                      <ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>
                    } 
                  />
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute requireOfficer={true}>
                        <AdminPanel />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/directory"
                    element={
                      <ProtectedRoute>
                        <MemberDirectory />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/check-in" element={<CheckIn />} />
                  <Route
                    path="/opportunities"
                    element={
                      <ProtectedRoute>
                        <Opportunities />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/thank-you" element={<ThankYou />} />
                  <Route
                    path="/teams"
                    element={
                      <ProtectedRoute>
                        <Teams />
                      </ProtectedRoute>
                    }
                  />
                  {/* Catch-all: keep last so every other route matches first */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                  </Suspense>
              </Layout>
              <BackToTop />
              <StickyMobileCTA />
            </Router>
            </ModalProvider>
          </ToastProvider>
        </ThemeProvider>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;
