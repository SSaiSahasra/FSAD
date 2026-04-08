import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const MotionSpan = motion.span;

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative h-10 w-20 rounded-full border border-white/30 bg-white/20 p-1 backdrop-blur-md transition"
      aria-label="Toggle light and dark mode"
      aria-pressed={isDark}
      type="button"
    >
      <MotionSpan
        className="absolute inset-y-1 left-1 w-8 rounded-full bg-gradient-to-br from-[#84CEEB] to-[#5680E9] shadow-[0_4px_12px_rgba(86,128,233,0.45)]"
        animate={{ x: isDark ? 38 : 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      />
      <span className="relative z-10 flex h-full items-center justify-between px-1 text-xs font-semibold text-slate-800 dark:text-slate-100">
        <span>☀</span>
        <span>☾</span>
      </span>
    </button>
  );
};

export default ThemeToggle;
