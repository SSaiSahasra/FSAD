import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminSubmissions from './pages/admin/AdminSubmissions';
import AdminReviewers from './pages/admin/AdminReviewers';
import AdminSchedule from './pages/admin/AdminSchedule';
import AdminRegistrations from './pages/admin/AdminRegistrations';

// User Pages
import UserDashboard from './pages/user/UserDashboard';
import SubmitPaper from './pages/user/SubmitPaper';
import UserSubmissions from './pages/user/UserSubmissions';
import UserRegister from './pages/user/UserRegister';
import UserSchedule from './pages/user/UserSchedule';
import UserProfile from './pages/user/UserProfile';

const ProtectedRoute = ({ children, role }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  if (role && currentUser.role !== role) {
    return <Navigate to="/" />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router basename="/FSAD">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/submissions" element={<ProtectedRoute role="admin"><AdminSubmissions /></ProtectedRoute>} />
          <Route path="/admin/reviewers" element={<ProtectedRoute role="admin"><AdminReviewers /></ProtectedRoute>} />
          <Route path="/admin/schedule" element={<ProtectedRoute role="admin"><AdminSchedule /></ProtectedRoute>} />
          <Route path="/admin/registrations" element={<ProtectedRoute role="admin"><AdminRegistrations /></ProtectedRoute>} />
          
          {/* User Routes */}
          <Route path="/user/dashboard" element={<ProtectedRoute role="user"><UserDashboard /></ProtectedRoute>} />
          <Route path="/user/submit" element={<ProtectedRoute role="user"><SubmitPaper /></ProtectedRoute>} />
          <Route path="/user/submissions" element={<ProtectedRoute role="user"><UserSubmissions /></ProtectedRoute>} />
          <Route path="/user/register" element={<ProtectedRoute role="user"><UserRegister /></ProtectedRoute>} />
          <Route path="/user/schedule" element={<ProtectedRoute role="user"><UserSchedule /></ProtectedRoute>} />
          <Route path="/user/profile" element={<ProtectedRoute role="user"><UserProfile /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
