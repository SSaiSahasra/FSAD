import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import { useAuth } from '../../context/AuthContext';
import { useRealtime } from '../../context/RealtimeContext';

const MotionMain = motion.main;
const MotionDiv = motion.div;

const LiveHub = ({ role }) => {
  const { currentUser } = useAuth();
  const { isConnected, hasRestSync, notifications, chatMessages, qaMessages, sendChatMessage, askQuestion } = useRealtime();

  const [chatInput, setChatInput] = useState('');
  const [questionInput, setQuestionInput] = useState('');

  const submitChat = (event) => {
    event.preventDefault();
    if (!chatInput.trim()) {
      return;
    }

    const sender = currentUser?.name || 'Attendee';
    sendChatMessage(sender, chatInput.trim());
    setChatInput('');
  };

  const submitQuestion = (event) => {
    event.preventDefault();
    if (!questionInput.trim()) {
      return;
    }

    const asker = currentUser?.name || 'Attendee';
    askQuestion(asker, questionInput.trim());
    setQuestionInput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C1C8E4] via-[#84CEEB]/45 to-[#5680E9]/20">
      <Navbar />
      <div className="flex">
        <Sidebar role={role} />
        <MotionMain
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex-1 p-8"
        >
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-3xl font-black text-slate-900">Live Hub</h1>
            <span className="rounded-full border border-white/40 bg-white/50 px-4 py-2 text-sm font-semibold text-slate-700">
              {isConnected ? 'WebSocket Live' : hasRestSync ? 'REST Synced' : 'Connecting...'}
            </span>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <section className="glass-card rounded-3xl p-6 lg:col-span-1">
              <h2 className="text-xl font-bold text-slate-800">Live Notifications</h2>
              <div className="mt-4 space-y-3">
                {notifications.length === 0 && <p className="text-sm text-slate-600">Waiting for updates...</p>}
                {notifications.map((item) => (
                  <MotionDiv key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-white/55 p-3">
                    <p className="text-xs font-bold text-[#8860D0]">{item.title}</p>
                    <p className="text-sm text-slate-700">{item.message}</p>
                  </MotionDiv>
                ))}
              </div>
            </section>

            <section className="glass-card rounded-3xl p-6 lg:col-span-1">
              <h2 className="text-xl font-bold text-slate-800">Attendee Live Chat</h2>
              <div className="mt-4 h-72 space-y-2 overflow-y-auto pr-2">
                {chatMessages.length === 0 && <p className="text-sm text-slate-600">No chat messages yet.</p>}
                {chatMessages.map((message, idx) => (
                  <div key={`${message.timestamp}-${idx}`} className="rounded-2xl bg-white/55 px-3 py-2">
                    <p className="text-xs font-semibold text-[#5680E9]">{message.sender}</p>
                    <p className="text-sm text-slate-700">{message.content}</p>
                  </div>
                ))}
              </div>
              <form className="mt-4 flex gap-2" onSubmit={submitChat}>
                <input
                  className="input-premium flex-1 text-sm"
                  placeholder="Type your message..."
                  value={chatInput}
                  onChange={(event) => setChatInput(event.target.value)}
                  aria-label="Chat message"
                />
                <button type="submit" className="btn-glass ripple-btn px-4 py-2 text-sm">Send</button>
              </form>
            </section>

            <section className="glass-card rounded-3xl p-6 lg:col-span-1">
              <h2 className="text-xl font-bold text-slate-800">Live Q&A</h2>
              <div className="mt-4 h-72 space-y-2 overflow-y-auto pr-2">
                {qaMessages.length === 0 && <p className="text-sm text-slate-600">No questions yet.</p>}
                {qaMessages.map((message, idx) => (
                  <div key={`${message.timestamp}-${idx}`} className="rounded-2xl bg-white/55 px-3 py-2">
                    <p className="text-xs font-semibold text-[#8860D0]">{message.asker}</p>
                    <p className="text-sm text-slate-700">{message.question}</p>
                  </div>
                ))}
              </div>
              <form className="mt-4 flex gap-2" onSubmit={submitQuestion}>
                <input
                  className="input-premium flex-1 text-sm"
                  placeholder="Ask a question..."
                  value={questionInput}
                  onChange={(event) => setQuestionInput(event.target.value)}
                  aria-label="Question input"
                />
                <button type="submit" className="btn-glow ripple-btn px-4 py-2 text-sm">Ask</button>
              </form>
            </section>
          </div>
        </MotionMain>
      </div>
    </div>
  );
};

export default LiveHub;
