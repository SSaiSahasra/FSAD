import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import { useRealtime } from '../context/RealtimeContext';

const MotionP = motion.p;
const MotionH1 = motion.h1;
const MotionDiv = motion.div;
const MotionArticle = motion.article;

const HERO_HEADLINE = 'Where Breakthrough Research Meets Real-Time Collaboration';

const FEATURE_CARDS = [
  {
    title: 'Submit Papers',
    icon: '📄',
    description: 'Upload research papers with smart metadata and instant status tracking.',
  },
  {
    title: 'Network',
    icon: '👥',
    description: 'Meet authors, reviewers, and global academics through live channels.',
  },
  {
    title: 'Learn',
    icon: '🎓',
    description: 'Join keynote talks, technical deep-dives, and interactive Q&A.',
  },
];

const TIMELINE = [
  { time: '08:30', title: 'Registration & Coffee', detail: 'Badge check-in and networking lounge opens.' },
  { time: '10:00', title: 'Opening Keynote', detail: 'Future of AI systems in academia and industry.' },
  { time: '12:00', title: 'Paper Track Sessions', detail: 'Parallel tracks: AI, Security, Quantum.' },
  { time: '15:30', title: 'Live Q&A Finale', detail: 'Panel with top reviewers and accepted authors.' },
];

const TOPICS = ['AI', 'ML', 'Quantum Computing', 'Cybersecurity'];

const SESSION_LIBRARY = [
  { id: 1, topic: 'AI', title: 'Generative AI for Scientific Discovery' },
  { id: 2, topic: 'ML', title: 'Efficient Training Strategies for LLMs' },
  { id: 3, topic: 'Quantum Computing', title: 'Quantum Error Correction at Scale' },
  { id: 4, topic: 'Cybersecurity', title: 'Zero-Trust Research Infrastructures' },
  { id: 5, topic: 'AI', title: 'Neuro-Symbolic Systems in Healthcare' },
];

const AnimatedCounter = ({ value, label }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let frameId = 0;
    const duration = 900;
    const start = performance.now();

    const animate = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplayValue(Math.round(eased * Number(value || 0)));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [value]);

  return (
    <div className="glass-card rounded-3xl p-6 text-center">
      <p className="text-4xl font-black text-slate-900">{displayValue}</p>
      <p className="mt-2 text-sm font-medium text-slate-600">{label}</p>
    </div>
  );
};

const Landing = () => {
  const [activeTopic, setActiveTopic] = useState('AI');
  const [chatInput, setChatInput] = useState('');
  const [questionInput, setQuestionInput] = useState('');
  const [typedHeadline, setTypedHeadline] = useState('');
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const { stats, isConnected, hasRestSync, notifications, chatMessages, qaMessages, sendChatMessage, askQuestion } = useRealtime();

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setTypedHeadline(HERO_HEADLINE.slice(0, index));
      if (index >= HERO_HEADLINE.length) {
        clearInterval(interval);
      }
    }, 28);

    return () => clearInterval(interval);
  }, []);

  const filteredSessions = useMemo(
    () => SESSION_LIBRARY.filter((session) => session.topic === activeTopic),
    [activeTopic]
  );

  const submitChat = (event) => {
    event.preventDefault();
    if (!chatInput.trim()) {
      return;
    }

    sendChatMessage('Attendee', chatInput.trim());
    setChatInput('');
  };

  const submitQuestion = (event) => {
    event.preventDefault();
    if (!questionInput.trim()) {
      return;
    }

    askQuestion('Attendee', questionInput.trim());
    setQuestionInput('');
  };

  const handleMouseMove = (event) => {
    const { clientX, clientY, currentTarget } = event;
    const rect = currentTarget.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#C1C8E4] via-[#84CEEB]/60 to-[#5680E9]/20 text-slate-900" onMouseMove={handleMouseMove}>
      <div className="spotlight-layer" style={{ '--mx': `${mousePos.x}%`, '--my': `${mousePos.y}%` }} />
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <div className="orb orb-c" />
        {Array.from({ length: 14 }).map((_, idx) => (
          <motion.span
            key={`particle-${idx}`}
            className="particle"
            style={{
              width: `${(idx % 4) + 4}px`,
              height: `${(idx % 4) + 4}px`,
              left: `${(idx * 7) % 100}%`,
              top: `${(idx * 11) % 100}%`,
              background: idx % 2 === 0 ? 'rgba(86,128,233,0.35)' : 'rgba(136,96,208,0.3)',
            }}
            animate={{ y: [0, -14, 0], opacity: [0.35, 0.9, 0.35] }}
            transition={{ duration: 4 + (idx % 5), repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <Navbar />

      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-24 pt-14 sm:px-6 lg:px-8">
        <section className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <MotionP
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex rounded-full border border-white/40 bg-white/40 px-4 py-1 text-sm font-semibold text-[#8860D0] backdrop-blur-md"
            >
              International Academic Conference 2024
            </MotionP>
            <MotionH1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 text-4xl font-black leading-tight md:text-6xl"
            >
              {typedHeadline.includes('Research')
                ? typedHeadline.replace('Research', '')
                : typedHeadline}
              <span className="text-gradient">{typedHeadline.includes('Research') ? 'Research' : ''}</span>
              <span className="ml-1 inline-block h-10 w-[3px] animate-pulse bg-[#5680E9] align-middle md:h-14" />
            </MotionH1>
            <MotionP
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 max-w-2xl text-lg text-slate-700"
            >
              Premium conference experience with live stats, interactive paper tracks, instant attendee chat, and a
              stunning Apple-grade interface.
            </MotionP>

            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link to="/register" className="btn-glow ripple-btn">
                Register Now
              </Link>
              <Link to="/login" className="btn-glass ripple-btn">
                Login
              </Link>
            </MotionDiv>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <AnimatedCounter value={stats.registeredUsers} label="Registered Users" />
              <AnimatedCounter value={stats.papersSubmitted} label="Papers Submitted" />
              <AnimatedCounter value={stats.activeSessions} label="Active Sessions" />
            </div>
          </div>

          <MotionDiv
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{ transform: `translateY(${(mousePos.y - 50) * 0.08}px)` }}
            className="glass-card relative rounded-[32px] p-8"
          >
            <div className="absolute right-6 top-6 rounded-full bg-white/60 px-3 py-1 text-xs font-semibold text-slate-700">
              {isConnected ? 'Live Connected' : hasRestSync ? 'REST Synced' : 'Syncing'}
            </div>
            <h2 className="text-2xl font-bold">Conference Dashboard</h2>
            <p className="mt-2 text-sm text-slate-600">Real-time pulse of registrations, submissions, and session activity.</p>
            <div className="mt-6 space-y-4">
              {[['Users', stats.registeredUsers], ['Submissions', stats.papersSubmitted], ['Sessions', stats.activeSessions]].map(
                ([label, value]) => (
                  <div key={label}>
                    <div className="mb-1 flex justify-between text-sm font-semibold text-slate-700">
                      <span>{label}</span>
                      <span>{value}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/50">
                      <MotionDiv
                        className="h-full rounded-full bg-gradient-to-r from-[#5680E9] via-[#5AB9EA] to-[#8860D0]"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, Number(value || 0))}%` }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </MotionDiv>
        </section>

        <section className="mt-20 grid gap-6 md:grid-cols-3">
          {FEATURE_CARDS.map((card, index) => (
            <MotionArticle
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className="glass-card hover-tilt group rounded-3xl border border-white/35 p-8"
            >
              <MotionDiv whileHover={{ rotate: 6, scale: 1.1 }} className="icon-bounce-hover text-4xl">
                {card.icon}
              </MotionDiv>
              <h3 className="mt-5 text-2xl font-bold">{card.title}</h3>
              <p className="mt-3 text-slate-700">{card.description}</p>
              <Link to="/register" className="mt-5 inline-block text-sm font-semibold text-[#5680E9] transition group-hover:text-[#8860D0]">
                Explore →
              </Link>
            </MotionArticle>
          ))}
        </section>

        <section id="details" className="mt-24 grid gap-8 lg:grid-cols-2">
          <div className="glass-card rounded-3xl p-8">
            <h2 className="text-3xl font-bold">Conference Timeline</h2>
            <div className="mt-8 space-y-6">
              {TIMELINE.map((item, index) => (
                <MotionDiv
                  key={item.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  className="relative border-l-2 border-[#5AB9EA]/60 pl-6"
                >
                  <span className="absolute -left-[9px] top-2 h-4 w-4 rounded-full bg-[#8860D0] shadow-[0_0_0_6px_rgba(136,96,208,0.22)]" />
                  <p className="text-sm font-semibold text-[#5680E9]">{item.time}</p>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.detail}</p>
                </MotionDiv>
              ))}
            </div>
          </div>

          <div id="topics" className="glass-card rounded-3xl p-8">
            <h2 className="text-3xl font-bold">Topics</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {TOPICS.map((topic) => (
                <button
                  key={topic}
                  onClick={() => setActiveTopic(topic)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    activeTopic === topic
                      ? 'bg-gradient-to-r from-[#5680E9] to-[#8860D0] text-white shadow-[0_10px_22px_rgba(86,128,233,0.35)]'
                      : 'bg-white/60 text-slate-700 hover:scale-105 hover:shadow-lg'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              {filteredSessions.map((session) => (
                <div key={session.id} className="rounded-2xl border border-white/40 bg-white/45 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-[#8860D0]">{session.topic}</p>
                  <p className="mt-1 font-semibold">{session.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="live" className="mt-24 grid gap-6 lg:grid-cols-3">
          <div className="glass-card rounded-3xl p-6 lg:col-span-1">
            <h3 className="text-xl font-bold">Live Notifications</h3>
            <div className="mt-4 space-y-3">
              {notifications.length === 0 && <p className="text-sm text-slate-600">Waiting for updates...</p>}
              {notifications.map((item) => (
                <MotionDiv key={item.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-white/55 p-3">
                  <p className="text-xs font-bold text-[#8860D0]">{item.title}</p>
                  <p className="text-sm text-slate-700">{item.message}</p>
                </MotionDiv>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6 lg:col-span-1">
            <h3 className="text-xl font-bold">Attendee Live Chat</h3>
            <div className="mt-4 h-56 space-y-2 overflow-y-auto pr-2">
              {chatMessages.map((message, idx) => (
                <div key={`${message.timestamp}-${idx}`} className="rounded-2xl bg-white/55 px-3 py-2">
                  <p className="text-xs font-semibold text-[#5680E9]">{message.sender}</p>
                  <p className="text-sm text-slate-700">{message.content}</p>
                </div>
              ))}
            </div>
            <form className="mt-3 flex gap-2" onSubmit={submitChat}>
              <input
                className="input-premium flex-1 text-sm"
                placeholder="Message attendees..."
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                aria-label="Chat message"
              />
              <button type="submit" className="btn-glass ripple-btn px-4 py-2 text-sm">Send</button>
            </form>
          </div>

          <div className="glass-card rounded-3xl p-6 lg:col-span-1">
            <h3 className="text-xl font-bold">Live Q&A</h3>
            <div className="mt-4 h-56 space-y-2 overflow-y-auto pr-2">
              {qaMessages.map((message, idx) => (
                <div key={`${message.timestamp}-${idx}`} className="rounded-2xl bg-white/55 px-3 py-2">
                  <p className="text-xs font-semibold text-[#8860D0]">{message.asker}</p>
                  <p className="text-sm text-slate-700">{message.question}</p>
                </div>
              ))}
            </div>
            <form className="mt-3 flex gap-2" onSubmit={submitQuestion}>
              <input
                className="input-premium flex-1 text-sm"
                placeholder="Ask a question..."
                value={questionInput}
                onChange={(event) => setQuestionInput(event.target.value)}
                aria-label="Question input"
              />
              <button type="submit" className="btn-glow ripple-btn px-4 py-2 text-sm">Ask</button>
            </form>
            <p className="mt-2 text-xs text-slate-600">Connection: {isConnected ? 'WebSocket Live' : hasRestSync ? 'REST fallback synced' : 'Awaiting sync'}</p>
          </div>
        </section>

        <footer className="mt-24 rounded-3xl border border-white/20 bg-gradient-to-r from-slate-900 via-[#3f3a68] to-[#2b4e8c] p-10 text-white">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h4 className="text-2xl font-black">International Academic Conference 2024</h4>
              <p className="mt-2 text-sm text-white/80">Premium research collaboration platform built for real-time impact.</p>
            </div>
            <div className="flex gap-3 text-sm font-semibold">
              <a href="#" className="rounded-full bg-white/15 px-4 py-2 transition hover:bg-white/25">X</a>
              <a href="#" className="rounded-full bg-white/15 px-4 py-2 transition hover:bg-white/25">LinkedIn</a>
              <a href="#" className="rounded-full bg-white/15 px-4 py-2 transition hover:bg-white/25">GitHub</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Landing;
