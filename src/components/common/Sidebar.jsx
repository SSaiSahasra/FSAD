import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

const MotionAside = motion.aside;
const MotionLink = motion(Link);

const Sidebar = ({ role }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const adminLinks = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/live', label: 'Live Hub', icon: '💬' },
    { path: '/admin/submissions', label: 'Submissions', icon: '📄' },
    { path: '/admin/reviewers', label: 'Reviewers', icon: '👥' },
    { path: '/admin/schedule', label: 'Schedule', icon: '📅' },
    { path: '/admin/registrations', label: 'Registrations', icon: '✅' }
  ];

  const userLinks = [
    { path: '/user/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/user/live', label: 'Live Hub', icon: '💬' },
    { path: '/user/submit', label: 'Submit Paper', icon: '📝' },
    { path: '/user/submissions', label: 'My Submissions', icon: '📄' },
    { path: '/user/register', label: 'Register', icon: '🎫' },
    { path: '/user/schedule', label: 'Schedule', icon: '📅' },
    { path: '/user/profile', label: 'Profile', icon: '👤' }
  ];

  const links = role === 'admin' ? adminLinks : userLinks;

  return (
    <MotionAside
      initial={{ x: -24, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
      className={`sticky top-16 h-[calc(100vh-4rem)] border-r border-white/25 bg-white/20 backdrop-blur-xl ${collapsed ? 'w-24' : 'w-64'}`}
    >
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between gap-2">
          <h2 className={`text-xl font-black text-slate-800 transition ${collapsed ? 'opacity-0' : 'opacity-100'}`}>
            {role === 'admin' ? 'Admin Panel' : 'User Panel'}
          </h2>
          <button
            type="button"
            onClick={() => setCollapsed((prev) => !prev)}
            className="rounded-lg bg-white/45 px-2 py-1 text-sm font-semibold text-slate-700 transition hover:bg-white/70"
            aria-label="Toggle sidebar"
          >
            {collapsed ? '>' : '<'}
          </button>
        </div>
        <nav className="space-y-2">
          {links.map((link) => (
            <MotionLink
              key={link.path}
              to={link.path}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center px-4 py-3 rounded-lg transition ${
                location.pathname === link.path
                  ? 'bg-gradient-to-r from-[#5680E9] to-[#8860D0] text-white font-semibold shadow-[0_10px_24px_rgba(86,128,233,0.35)]'
                  : 'text-slate-700 hover:bg-white/40'
              }`}
            >
              <span className="text-xl">{link.icon}</span>
              <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${collapsed ? 'ml-0 w-0 opacity-0' : 'ml-3 w-auto opacity-100'}`}>
                {link.label}
              </span>
            </MotionLink>
          ))}
        </nav>
      </div>
    </MotionAside>
  );
};

export default Sidebar;
