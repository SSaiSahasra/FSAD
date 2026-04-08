import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import GoogleAuthButton from '../components/common/GoogleAuthButton';

const MotionDiv = motion.div;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { login, authenticateWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      setIsRedirecting(true);
      setTimeout(() => {
        navigate(result.user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
      }, 320);
    } else {
      setError(result.message || 'Invalid credentials');
    }
  };

  const handleGoogleAuth = async (idToken) => {
    const result = await authenticateWithGoogle(idToken);
    if (result.success) {
      setIsRedirecting(true);
      setTimeout(() => {
        navigate(result.user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
      }, 320);
    } else {
      setError(result.message || 'Google authentication failed');
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#C1C8E4] via-[#84CEEB]/55 to-[#5680E9]/20">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="orb orb-a" />
        <div className="orb orb-b" />
      </div>
      <Navbar />
      <div className="relative z-10 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-slate-900/10 backdrop-blur-[2px]" />
        <MotionDiv
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: isRedirecting ? 0.98 : 1 }}
          transition={{ duration: 0.45 }}
          className="glass-card relative w-full max-w-md rounded-[28px] p-8"
        >
          <h2 className="mb-8 text-center text-4xl font-black text-slate-900">
            Login to Your Account
          </h2>
          {error && (
            <div className="mb-4 rounded-xl border border-red-300 bg-red-100 px-4 py-3 text-red-700">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-premium"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-premium"
                required
              />
            </div>
            <button
              type="submit"
              className="ripple-btn w-full rounded-xl bg-gradient-to-r from-[#5680E9] to-[#8860D0] py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(86,128,233,0.35)]"
            >
              {isRedirecting ? 'Redirecting...' : 'Login'}
            </button>
          </form>
          <div className="my-6">
            <p className="mb-3 text-center text-sm text-slate-600">or continue with</p>
            <GoogleAuthButton
              onCredential={handleGoogleAuth}
              onError={(message) => setError(message)}
              buttonText="continue_with"
            />
          </div>
          <p className="mt-6 text-center text-slate-700">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-[#5680E9] hover:text-[#8860D0]">
              Register here
            </Link>
          </p>
          <div className="mt-6 rounded-xl border border-white/50 bg-white/45 p-4">
            <p className="mb-2 text-sm font-semibold text-slate-700">Demo Credentials:</p>
            <p className="text-xs text-slate-600">Admin: admin@conference.com / admin123</p>
            <p className="text-xs text-slate-600">User: user@example.com / user123</p>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
};

export default Login;
