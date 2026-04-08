import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import GoogleAuthButton from '../components/common/GoogleAuthButton';

const MotionDiv = motion.div;

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    affiliation: '',
    bio: ''
  });
  const { register, authenticateWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await register(formData);
    if (result.success) {
      navigate('/user/dashboard');
    } else {
      setError(result.message || 'Unable to register.');
    }
  };

  const handleGoogleAuth = async (idToken) => {
    const result = await authenticateWithGoogle(idToken);
    if (result.success) {
      navigate('/user/dashboard');
    } else {
      setError(result.message || 'Google authentication failed');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#C1C8E4] via-[#84CEEB]/55 to-[#5680E9]/20">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="orb orb-a" />
        <div className="orb orb-c" />
      </div>
      <Navbar />
      <div className="relative z-10 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-slate-900/10 backdrop-blur-[2px]" />
        <MotionDiv
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45 }}
          className="glass-card relative w-full max-w-xl rounded-[28px] p-8"
        >
          <h2 className="mb-8 text-center text-4xl font-black text-slate-900">
            Create Account
          </h2>
          {error && (
            <div className="mb-4 rounded-xl border border-red-300 bg-red-100 px-4 py-3 text-red-700">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-premium"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-premium"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-premium"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Affiliation</label>
              <input
                type="text"
                name="affiliation"
                value={formData.affiliation}
                onChange={handleChange}
                className="input-premium"
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="3"
                className="input-premium"
              />
            </div>
            <button
              type="submit"
              className="ripple-btn md:col-span-2 w-full rounded-xl bg-gradient-to-r from-[#5680E9] to-[#8860D0] py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(86,128,233,0.35)]"
            >
              Register
            </button>
          </form>
          <div className="my-6">
            <p className="mb-3 text-center text-sm text-slate-600">or continue with</p>
            <GoogleAuthButton
              onCredential={handleGoogleAuth}
              onError={(message) => setError(message)}
              buttonText="signup_with"
            />
          </div>
          <p className="mt-6 text-center text-slate-700">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-[#5680E9] hover:text-[#8860D0]">
              Login here
            </Link>
          </p>
        </MotionDiv>
      </div>
    </div>
  );
};

export default Register;
