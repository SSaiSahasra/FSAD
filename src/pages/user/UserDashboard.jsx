import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import Card from '../../components/common/Card';
import { useAuth } from '../../context/AuthContext';
import { apiGet } from '../../api/api';

const MotionMain = motion.main;
const MotionSection = motion.section;

const UserDashboard = () => {
  const { currentUser, token } = useAuth();
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const data = await apiGet('/papers', token);
        setSubmissions(data);
      } catch (fetchError) {
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [token]);

  const acceptedPapers = submissions.filter(s => s.status === 'accepted').length;
  const pendingReviews = submissions.filter(s => s.status === 'submitted' || s.status === 'reviewed').length;

  const progressData = [
    { name: 'W1', score: 20 },
    { name: 'W2', score: 32 },
    { name: 'W3', score: 47 },
    { name: 'W4', score: 58 },
    { name: 'W5', score: 76 },
    { name: 'W6', score: 89 },
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        when: 'beforeChildren',
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.32 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C1C8E4] via-[#84CEEB]/45 to-[#5680E9]/20">
      <Navbar />
      <div className="flex">
        <Sidebar role="user" />
        <MotionMain
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex-1 p-8"
        >
          <h1 className="mb-2 text-3xl font-black text-slate-900">Welcome, {currentUser?.name}!</h1>
          <p className="mb-8 text-slate-600">Manage your conference participation</p>

          {loading ? (
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="skeleton h-32 rounded-2xl" />
              <div className="skeleton h-32 rounded-2xl" />
              <div className="skeleton h-32 rounded-2xl" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card
                title="My Submissions"
                value={submissions.length}
                icon="📄"
                color="blue"
              />
              <Card
                title="Accepted Papers"
                value={acceptedPapers}
                icon="✅"
                color="green"
              />
              <Card
                title="Pending Reviews"
                value={pendingReviews}
                icon="⏳"
                color="yellow"
              />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MotionSection
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              className="glass-card rounded-2xl p-6 lg:col-span-2"
            >
              <h2 className="mb-4 text-xl font-bold text-slate-800">Submission Progress Trend</h2>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData}>
                    <XAxis dataKey="name" stroke="#475569" />
                    <YAxis stroke="#475569" />
                    <Tooltip
                      contentStyle={{
                        borderRadius: '12px',
                        border: '1px solid rgba(255,255,255,0.4)',
                        backgroundColor: 'rgba(255,255,255,0.88)',
                      }}
                    />
                    <Line type="monotone" dataKey="score" stroke="#5680E9" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 7 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </MotionSection>

            <MotionSection
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              className="glass-card rounded-2xl p-6"
            >
              <h2 className="mb-4 text-xl font-bold text-slate-800">Quick Actions</h2>
              <div className="space-y-3">
                <motion.button
                  variants={itemVariants}
                  whileHover={{ y: -4, scale: 1.01 }}
                  onClick={() => navigate('/user/submit')}
                  className="w-full rounded-xl bg-gradient-to-r from-[#5680E9] to-[#8860D0] px-4 py-3 text-left text-white transition hover:shadow-[0_12px_24px_rgba(86,128,233,0.35)]"
                >
                  📝 Submit New Paper
                </motion.button>
                <motion.button
                  variants={itemVariants}
                  whileHover={{ y: -4, scale: 1.01 }}
                  onClick={() => navigate('/user/register')}
                  className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-3 text-left text-white transition hover:shadow-[0_12px_24px_rgba(16,185,129,0.35)]"
                >
                  🎫 Register for Conference
                </motion.button>
                <motion.button
                  variants={itemVariants}
                  whileHover={{ y: -4, scale: 1.01 }}
                  onClick={() => navigate('/user/schedule')}
                  className="w-full rounded-xl bg-gradient-to-r from-[#8860D0] to-violet-500 px-4 py-3 text-left text-white transition hover:shadow-[0_12px_24px_rgba(136,96,208,0.35)]"
                >
                  📅 View Schedule
                </motion.button>
              </div>
            </MotionSection>

            <MotionSection
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              className="glass-card rounded-2xl p-6"
            >
              <h2 className="mb-4 text-xl font-bold text-slate-800">Recent Submissions</h2>
              {loading ? (
                <p className="text-slate-600">Loading submissions...</p>
              ) : error ? (
                <p className="text-red-600">{error}</p>
              ) : submissions.length > 0 ? (
                <div className="space-y-3">
                  {submissions.slice(0, 3).map((sub) => (
                    <motion.div key={sub._id} variants={itemVariants} whileHover={{ x: 5 }} className="rounded-xl bg-white/55 p-3">
                      <p className="font-semibold text-slate-800">{sub.title}</p>
                      <p className="mt-1 text-sm text-slate-600">
                        Status: <span className={`font-semibold ${sub.status === 'accepted' ? 'text-green-600' : sub.status === 'submitted' || sub.status === 'reviewed' ? 'text-yellow-600' : 'text-red-600'}`}>{sub.status}</span>
                      </p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-600">No submissions yet.</p>
              )}
            </MotionSection>
          </div>
        </MotionMain>
      </div>
    </div>
  );
};

export default UserDashboard;
