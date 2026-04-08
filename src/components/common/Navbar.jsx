import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRealtime } from '../../context/RealtimeContext';
import ThemeToggle from './ThemeToggle';

const MotionNav = motion.nav;

const SECTION_LINKS = [
  { href: '#details', label: 'Conference', id: 'details' },
  { href: '#topics', label: 'Topics', id: 'topics' },
  { href: '#live', label: 'Live Hub', id: 'live' },
];

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const { notifications } = useRealtime();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('details');

  useEffect(() => {
    const onScroll = () => {
      let nextActive = activeSection;

      SECTION_LINKS.forEach((section) => {
        const element = document.getElementById(section.id);
        if (!element) {
          return;
        }

        const rect = element.getBoundingClientRect();
        if (rect.top <= 140 && rect.bottom >= 160) {
          nextActive = section.id;
        }
      });

      if (nextActive !== activeSection) {
        setActiveSection(nextActive);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [activeSection]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAnchorNavigate = (event, id) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  return (
    <MotionNav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 border-b border-white/20 bg-white/25 shadow-[0_16px_40px_rgba(16,24,40,0.12)] backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link to="/" className="group relative text-2xl font-black tracking-tight text-slate-900 dark:text-slate-50">
            IAC 2024
            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-[#5680E9] via-[#5AB9EA] to-[#8860D0] transition-all duration-300 group-hover:w-full" />
          </Link>
          {SECTION_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(event) => handleAnchorNavigate(event, link.id)}
              className={`group relative hidden text-sm font-semibold transition md:inline-block ${
                activeSection === link.id ? 'text-[#5680E9]' : 'text-slate-700 hover:text-[#5680E9]'
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#5680E9] via-[#5AB9EA] to-[#8860D0] transition-all duration-300 ${
                  activeSection === link.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative rounded-full border border-white/40 bg-white/30 p-2 text-sm text-slate-700 backdrop-blur-md">
            <span aria-hidden="true">🔔</span>
            {notifications.length > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#8860D0] px-1 text-[10px] font-bold text-white">
                {notifications.length}
              </span>
            )}
          </div>

          <ThemeToggle />

          {currentUser ? (
            <>
              <span className="hidden text-sm text-slate-700 md:inline-block">Welcome, {currentUser.name}</span>
              <Link
                to={currentUser.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'}
                className="rounded-full border border-[#5680E9]/30 bg-white/70 px-4 py-2 text-sm font-semibold text-[#5680E9] transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-full bg-gradient-to-r from-[#5680E9] to-[#8860D0] px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(86,128,233,0.35)]"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white/60">
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-gradient-to-r from-[#5680E9] to-[#5AB9EA] px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(86,128,233,0.35)]"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </MotionNav>
  );
};

export default Navbar;
