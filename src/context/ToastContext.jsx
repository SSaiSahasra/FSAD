/* eslint-disable react-refresh/only-export-components */
import { AnimatePresence, motion } from 'framer-motion';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export const APP_TOAST_EVENT = 'conference-platform:toast';

const ToastContext = createContext(null);

export const useToast = () => useContext(ToastContext);

const MotionDiv = motion.div;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const pushToast = useCallback((toast) => {
    const generatedId = typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random()}`;

    const nextToast = {
      id: toast.id || generatedId,
      type: toast.type || 'info',
      message: toast.message || 'Done',
      duration: Number(toast.duration) > 0 ? Number(toast.duration) : 5000,
    };

    setToasts((prev) => [...prev, nextToast].slice(-5));
  }, []);

  useEffect(() => {
    const handler = (event) => {
      if (!event?.detail) {
        return;
      }

      pushToast(event.detail);
    };

    window.addEventListener(APP_TOAST_EVENT, handler);
    return () => window.removeEventListener(APP_TOAST_EVENT, handler);
  }, [pushToast]);

  useEffect(() => {
    if (toasts.length === 0) {
      return;
    }

    const timers = toasts.map((toast) => {
      const timeoutId = setTimeout(() => {
        removeToast(toast.id);
      }, toast.duration);

      return timeoutId;
    });

    return () => timers.forEach((timeoutId) => clearTimeout(timeoutId));
  }, [removeToast, toasts]);

  const value = useMemo(() => ({ pushToast, removeToast }), [pushToast, removeToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-5 top-20 z-[100] flex w-[320px] flex-col gap-3">
        <AnimatePresence>
          {toasts.map((toast) => (
            <MotionDiv
              key={toast.id}
              initial={{ opacity: 0, y: -14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className={`pointer-events-auto rounded-xl border px-4 py-3 shadow-lg backdrop-blur-md ${
                toast.type === 'success'
                  ? 'border-emerald-300 bg-emerald-100/95 text-emerald-800'
                  : toast.type === 'error'
                    ? 'border-red-300 bg-red-100/95 text-red-800'
                    : 'border-sky-300 bg-sky-100/95 text-sky-900'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-semibold leading-5">{toast.message}</p>
                <button
                  type="button"
                  onClick={() => removeToast(toast.id)}
                  className="rounded-md px-2 py-0.5 text-xs font-bold opacity-75 transition hover:opacity-100"
                >
                  X
                </button>
              </div>
            </MotionDiv>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
