import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { RealtimeProvider } from './context/RealtimeContext';
import { ToastProvider } from './context/ToastContext';

const Landing = lazy(() => import('./pages/Landing'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminSubmissions = lazy(() => import('./pages/admin/AdminSubmissions'));
const AdminReviewers = lazy(() => import('./pages/admin/AdminReviewers'));
const AdminSchedule = lazy(() => import('./pages/admin/AdminSchedule'));
const AdminRegistrations = lazy(() => import('./pages/admin/AdminRegistrations'));
const LiveHub = lazy(() => import('./pages/common/LiveHub'));

const UserDashboard = lazy(() => import('./pages/user/UserDashboard'));
const SubmitPaper = lazy(() => import('./pages/user/SubmitPaper'));
const UserSubmissions = lazy(() => import('./pages/user/UserSubmissions'));
const UserRegister = lazy(() => import('./pages/user/UserRegister'));
const UserSchedule = lazy(() => import('./pages/user/UserSchedule'));
const UserProfile = lazy(() => import('./pages/user/UserProfile'));

const MotionDiv = motion.div;

const ProtectedRoute = ({ children, role }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  const userRole = currentUser.role?.toLowerCase();
  if (role && userRole !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

const PageTransition = ({ children }) => (
  <MotionDiv
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -18 }}
    transition={{ duration: 0.36, ease: 'easeOut' }}
  >
    {children}
  </MotionDiv>
);

const RouteLoader = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#C1C8E4] via-[#84CEEB]/45 to-[#5680E9]/20 p-8">
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="skeleton h-16 rounded-2xl" />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="skeleton h-32 rounded-2xl" />
        <div className="skeleton h-32 rounded-2xl" />
        <div className="skeleton h-32 rounded-2xl" />
      </div>
      <div className="skeleton h-64 rounded-2xl" />
    </div>
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<RouteLoader />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Landing /></PageTransition>} />
          <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
          <Route path="/register" element={<PageTransition><Register /></PageTransition>} />

          <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><PageTransition><AdminDashboard /></PageTransition></ProtectedRoute>} />
          <Route path="/admin/submissions" element={<ProtectedRoute role="admin"><PageTransition><AdminSubmissions /></PageTransition></ProtectedRoute>} />
          <Route path="/admin/reviewers" element={<ProtectedRoute role="admin"><PageTransition><AdminReviewers /></PageTransition></ProtectedRoute>} />
          <Route path="/admin/schedule" element={<ProtectedRoute role="admin"><PageTransition><AdminSchedule /></PageTransition></ProtectedRoute>} />
          <Route path="/admin/registrations" element={<ProtectedRoute role="admin"><PageTransition><AdminRegistrations /></PageTransition></ProtectedRoute>} />
          <Route path="/admin/live" element={<ProtectedRoute role="admin"><PageTransition><LiveHub role="admin" /></PageTransition></ProtectedRoute>} />

          <Route path="/user/dashboard" element={<ProtectedRoute role="user"><PageTransition><UserDashboard /></PageTransition></ProtectedRoute>} />
          <Route path="/user/submit" element={<ProtectedRoute role="user"><PageTransition><SubmitPaper /></PageTransition></ProtectedRoute>} />
          <Route path="/user/submissions" element={<ProtectedRoute role="user"><PageTransition><UserSubmissions /></PageTransition></ProtectedRoute>} />
          <Route path="/user/register" element={<ProtectedRoute role="user"><PageTransition><UserRegister /></PageTransition></ProtectedRoute>} />
          <Route path="/user/schedule" element={<ProtectedRoute role="user"><PageTransition><UserSchedule /></PageTransition></ProtectedRoute>} />
          <Route path="/user/profile" element={<ProtectedRoute role="user"><PageTransition><UserProfile /></PageTransition></ProtectedRoute>} />
          <Route path="/user/live" element={<ProtectedRoute role="user"><PageTransition><LiveHub role="user" /></PageTransition></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
};

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <RealtimeProvider>
            <Router basename={import.meta.env.BASE_URL}>
              <AnimatedRoutes />
            </Router>
          </RealtimeProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
