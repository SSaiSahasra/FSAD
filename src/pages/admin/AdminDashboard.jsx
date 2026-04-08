import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import Card from '../../components/common/Card';
import { useAuth } from '../../context/AuthContext';
import { apiGet } from '../../api/api';

const MotionMain = motion.main;
const MotionSection = motion.section;

const AdminDashboard = () => {
  const { token } = useAuth();
  const [papers, setPapers] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        const paperData = await apiGet('/papers', token);
        const registrationData = await apiGet('/registrations', token);
        setPapers(paperData);
        setRegistrations(registrationData);
      } catch (fetchError) {
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [token]);

  const acceptedCount = papers.filter((paper) => paper.status === 'accepted').length;
  const pendingCount = papers.filter((paper) => paper.status === 'submitted' || paper.status === 'reviewed').length;

  const trendData = [
    { name: 'Mon', submissions: 6, registrations: 18 },
    { name: 'Tue', submissions: 9, registrations: 22 },
    { name: 'Wed', submissions: 12, registrations: 27 },
    { name: 'Thu', submissions: 10, registrations: 24 },
    { name: 'Fri', submissions: 15, registrations: 33 },
    { name: 'Sat', submissions: 18, registrations: 36 },
    { name: 'Sun', submissions: 13, registrations: 29 },
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
        <Sidebar role="admin" />
        <MotionMain
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex-1 p-8"
        >
          <h1 className="mb-8 text-3xl font-black text-slate-900">Admin Dashboard</h1>

          {loading ? (
            <div className="mb-8 space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="skeleton h-32 rounded-2xl" />
                <div className="skeleton h-32 rounded-2xl" />
                <div className="skeleton h-32 rounded-2xl" />
                <div className="skeleton h-32 rounded-2xl" />
              </div>
              <div className="skeleton h-80 rounded-2xl" />
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-300 text-red-700 rounded-lg p-6 mb-8">
              {error}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card title="Total Submissions" value={papers.length} icon="📄" color="blue" />
                <Card title="Accepted Papers" value={acceptedCount} icon="✅" color="green" />
                <Card title="Pending Reviews" value={pendingCount} icon="⏳" color="yellow" />
                <Card title="Registered Participants" value={registrations.length} icon="👥" color="purple" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <MotionSection
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  className="glass-card rounded-2xl p-6 lg:col-span-2"
                >
                  <h2 className="mb-4 text-xl font-bold text-slate-800">Submission vs Registration Trend</h2>
                  <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="submissionsFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#5680E9" stopOpacity={0.35} />
                            <stop offset="95%" stopColor="#5680E9" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="registrationsFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8860D0" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#8860D0" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(71,85,105,0.25)" />
                        <XAxis dataKey="name" stroke="#475569" />
                        <Tooltip
                          contentStyle={{
                            borderRadius: '12px',
                            border: '1px solid rgba(255,255,255,0.4)',
                            backgroundColor: 'rgba(255,255,255,0.88)',
                          }}
                        />
                        <Area type="monotone" dataKey="submissions" stroke="#5680E9" fill="url(#submissionsFill)" strokeWidth={3} />
                        <Area type="monotone" dataKey="registrations" stroke="#8860D0" fill="url(#registrationsFill)" strokeWidth={3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </MotionSection>

                <MotionSection
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  className="glass-card rounded-2xl p-6"
                >
                  <h2 className="mb-4 text-xl font-bold text-slate-800">Recent Activity</h2>
                  <div className="space-y-4">
                    <motion.div variants={itemVariants} whileHover={{ x: 6 }} className="flex items-center space-x-3 rounded-xl bg-white/50 p-3">
                      <span className="text-2xl">📄</span>
                      <div>
                        <p className="font-semibold text-slate-800">New submission received</p>
                        <p className="text-sm text-slate-600">Latest updates from authors</p>
                      </div>
                    </motion.div>
                    <motion.div variants={itemVariants} whileHover={{ x: 6 }} className="flex items-center space-x-3 rounded-xl bg-white/50 p-3">
                      <span className="text-2xl">✅</span>
                      <div>
                        <p className="font-semibold text-slate-800">Paper approved</p>
                        <p className="text-sm text-slate-600">Track accepted papers</p>
                      </div>
                    </motion.div>
                    <motion.div variants={itemVariants} whileHover={{ x: 6 }} className="flex items-center space-x-3 rounded-xl bg-white/50 p-3">
                      <span className="text-2xl">👥</span>
                      <div>
                        <p className="font-semibold text-slate-800">New participant registered</p>
                        <p className="text-sm text-slate-600">Monitor conference interest</p>
                      </div>
                    </motion.div>
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
                    <motion.button variants={itemVariants} whileHover={{ y: -4, scale: 1.01 }} className="w-full rounded-xl bg-gradient-to-r from-[#5680E9] to-[#8860D0] py-3 text-white transition hover:shadow-[0_12px_24px_rgba(86,128,233,0.35)]">
                      Review Submissions
                    </motion.button>
                    <motion.button variants={itemVariants} whileHover={{ y: -4, scale: 1.01 }} className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3 text-white transition hover:shadow-[0_12px_24px_rgba(16,185,129,0.35)]">
                      Assign Reviewers
                    </motion.button>
                    <motion.button variants={itemVariants} whileHover={{ y: -4, scale: 1.01 }} className="w-full rounded-xl bg-gradient-to-r from-[#8860D0] to-violet-500 py-3 text-white transition hover:shadow-[0_12px_24px_rgba(136,96,208,0.35)]">
                      Manage Schedule
                    </motion.button>
                  </div>
                </MotionSection>
              </div>
            </>
          )}
        </MotionMain>
      </div>
    </div>
  );
};

export default AdminDashboard;
