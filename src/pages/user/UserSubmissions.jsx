import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import { useAuth } from '../../context/AuthContext';
import { apiGet } from '../../api/api';

const UserSubmissions = () => {
  const { token } = useAuth();
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

  const getStatusBadge = (status) => {
    const colors = {
      submitted: 'bg-yellow-100 text-yellow-800',
      reviewed: 'bg-blue-100 text-blue-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[status]}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C1C8E4] via-[#84CEEB]/45 to-[#5680E9]/20">
      <Navbar />
      <div className="flex">
        <Sidebar role="user" />
        <main className="flex-1 p-8">
          <h1 className="mb-8 text-3xl font-black text-slate-900">My Submissions</h1>

          {loading ? (
            <div className="glass-card rounded-2xl p-12 text-center">
              <p className="text-lg text-slate-600">Loading your submissions...</p>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-300 text-red-700 rounded-lg p-6">
              {error}
            </div>
          ) : submissions.length > 0 ? (
            <div className="space-y-6">
              {submissions.map((sub) => (
                <div key={sub._id || sub.id} className="glass-card rounded-2xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">{sub.title}</h2>
                      <p className="mt-1 text-sm text-slate-600">Submitted: {new Date(sub.createdAt).toLocaleDateString()}</p>
                    </div>
                    {getStatusBadge(sub.status)}
                  </div>
                  <div className="space-y-2">
                    {sub.authors && (
                      <p className="text-slate-700"><span className="font-semibold">Authors:</span> {sub.authors}</p>
                    )}
                    {sub.keywords && (
                      <p className="text-slate-700"><span className="font-semibold">Keywords:</span> {sub.keywords}</p>
                    )}
                    <p className="text-slate-700"><span className="font-semibold">Abstract:</span> {sub.abstract}</p>
                    {(sub.marks != null || sub.percentage != null) && (
                      <div className="mt-2 rounded-lg bg-white/55 p-3">
                        {sub.marks != null && (
                          <p className="text-slate-700"><span className="font-semibold">Marks:</span> {sub.marks}</p>
                        )}
                        {sub.percentage != null && (
                          <p className="text-slate-700"><span className="font-semibold">Percentage:</span> {sub.percentage}%</p>
                        )}
                      </div>
                    )}
                    {sub.feedback && (
                      <div className="mt-4 rounded-lg bg-[#84CEEB]/20 p-4">
                        <p className="font-semibold text-slate-800">Reviewer Feedback:</p>
                        <p className="mt-1 text-slate-700">{sub.feedback}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-12 text-center">
              <p className="mb-4 text-lg text-slate-600">You haven't submitted any papers yet.</p>
              <button
                onClick={() => navigate('/user/submit')}
                className="rounded-xl bg-gradient-to-r from-[#5680E9] to-[#8860D0] px-6 py-3 text-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(86,128,233,0.35)]"
              >
                Submit Your First Paper
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserSubmissions;
