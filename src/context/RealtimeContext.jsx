/* eslint-disable react-refresh/only-export-components */
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { apiGet } from '../api/api';

const RealtimeContext = createContext(null);

export const useRealtime = () => useContext(RealtimeContext);

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
const WS_BASE = API_BASE.replace(/\/api\/?$/, '');

const parseFrame = (message) => {
  try {
    return JSON.parse(message.body);
  } catch {
    return null;
  }
};

export const RealtimeProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [hasRestSync, setHasRestSync] = useState(false);
  const [stats, setStats] = useState({ registeredUsers: 0, papersSubmitted: 0, activeSessions: 0 });
  const [chatMessages, setChatMessages] = useState([]);
  const [qaMessages, setQaMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const clientRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    const fetchStatsFallback = async () => {
      const token = localStorage.getItem('token') || '';

      try {
        const payload = await apiGet('/realtime/stats');
        if (mounted && payload) {
          setStats(payload);
          setHasRestSync(true);
        }
      } catch {
        try {
          if (!token) {
            throw new Error('No token for authenticated stats fallback');
          }

          const payload = await apiGet('/realtime/stats', token);
          if (mounted && payload) {
            setStats(payload);
            setHasRestSync(true);
          }
        } catch {
          try {
            if (!token) {
              throw new Error('No token for derived stats fallback');
            }

            const [papers, registrations] = await Promise.all([
              apiGet('/papers', token),
              apiGet('/registrations', token),
            ]);

            if (mounted) {
              setStats((prev) => ({
                ...prev,
                papersSubmitted: Array.isArray(papers) ? papers.length : prev.papersSubmitted,
                registeredUsers: Array.isArray(registrations) ? registrations.length : prev.registeredUsers,
              }));
              setHasRestSync(true);
            }
          } catch {
            if (mounted) {
              setHasRestSync(false);
            }
          }
        }
      }
    };

    fetchStatsFallback();
    const pollId = setInterval(fetchStatsFallback, 12000);

    const client = new Client({
      webSocketFactory: () => new SockJS(`${WS_BASE}/ws`),
      reconnectDelay: 4000,
      debug: () => {},
      onConnect: () => {
        if (!mounted) {
          return;
        }

        setIsConnected(true);
        setHasRestSync(true);
        client.subscribe('/topic/stats', (message) => {
          const payload = parseFrame(message);
          if (payload) {
            setStats(payload);
          }
        });

        client.subscribe('/topic/chat', (message) => {
          const payload = parseFrame(message);
          if (payload?.content) {
            setChatMessages((prev) => [...prev.slice(-19), payload]);
          }
        });

        client.subscribe('/topic/qna', (message) => {
          const payload = parseFrame(message);
          if (payload?.question) {
            setQaMessages((prev) => [...prev.slice(-14), payload]);
          }
        });

        client.subscribe('/topic/notifications', (message) => {
          const payload = parseFrame(message);
          if (payload?.message) {
            const generatedId = typeof crypto !== 'undefined' && crypto.randomUUID
              ? crypto.randomUUID()
              : String(Date.now() + Math.random());

            setNotifications((prev) => [{ ...payload, id: generatedId }, ...prev].slice(0, 8));
          }
        });
      },
      onWebSocketClose: () => setIsConnected(false),
      onStompError: () => setIsConnected(false),
    });

    client.activate();
    clientRef.current = client;

    return () => {
      mounted = false;
      clearInterval(pollId);
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, []);

  const publish = useCallback((destination, body) => {
    if (!clientRef.current?.connected) {
      return false;
    }

    clientRef.current.publish({
      destination,
      body: JSON.stringify(body),
    });

    return true;
  }, []);

  const sendChatMessage = useCallback(
    (sender, content) => publish('/app/chat.send', { sender, content, timestamp: new Date().toISOString() }),
    [publish]
  );

  const askQuestion = useCallback(
    (asker, question) => publish('/app/qa.ask', { asker, question, timestamp: new Date().toISOString() }),
    [publish]
  );

  const markNotificationRead = (id) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  const value = useMemo(
    () => ({
      isConnected,
      hasRestSync,
      stats,
      chatMessages,
      qaMessages,
      notifications,
      sendChatMessage,
      askQuestion,
      markNotificationRead,
    }),
    [askQuestion, chatMessages, hasRestSync, isConnected, notifications, qaMessages, sendChatMessage, stats]
  );

  return <RealtimeContext.Provider value={value}>{children}</RealtimeContext.Provider>;
};
