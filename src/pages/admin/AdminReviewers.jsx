import { useEffect, useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import Modal from '../../components/common/Modal';
import { useAuth } from '../../context/AuthContext';
import { apiGet, apiPost } from '../../api/api';

const AdminReviewers = () => {
  const { token } = useAuth();
  const [reviewers, setReviewers] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [selectedReviewer, setSelectedReviewer] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [reviewerData, paperData] = await Promise.all([
          apiGet('/users/reviewers', token),
          apiGet('/papers', token),
        ]);
        setReviewers(reviewerData);
        setSubmissions(paperData.filter((paper) => paper.status === 'submitted'));
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [token]);

  const handleAssign = async () => {
    if (!selectedPaper || !selectedReviewer) {
      return;
    }

    try {
      await apiPost(
        `/papers/${selectedPaper}/assign-reviewer`,
        JSON.stringify({ reviewerId: selectedReviewer }),
        token,
        'application/json'
      );
      setIsModalOpen(false);
      setSelectedReviewer('');
      const updatedSubmissions = submissions.filter((paper) => paper._id !== selectedPaper);
      setSubmissions(updatedSubmissions);
    } catch (assignError) {
      setError(assignError.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C1C8E4] via-[#84CEEB]/45 to-[#5680E9]/20">
      <Navbar />
      <div className="flex">
        <Sidebar role="admin" />
        <main className="flex-1 p-8">
          <h1 className="mb-8 text-3xl font-black text-slate-900">Peer Reviewers</h1>

          {loading && (
            <div className="glass-card mb-6 rounded-2xl p-6 text-slate-700">Loading reviewers and pending papers...</div>
          )}

          {error && (
            <div className="mb-6 rounded-xl border border-red-300 bg-red-100 px-4 py-3 text-red-700">{error}</div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {reviewers.map((reviewer) => (
              <div key={reviewer._id || reviewer.id} className="glass-card rounded-2xl p-6">
                <h3 className="mb-2 text-xl font-bold text-slate-800">{reviewer.name}</h3>
                <p className="mb-2 text-sm text-slate-600">{reviewer.email}</p>
                <p className="text-sm font-semibold text-[#5680E9]">{reviewer.affiliation || reviewer.bio || 'Reviewer'}</p>
              </div>
            ))}
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h2 className="mb-4 text-xl font-bold text-slate-800">Assign Reviewers to Papers</h2>
            <div className="space-y-3">
              {submissions.filter((s) => s.status === 'submitted').map((sub) => (
                <div key={sub._id} className="flex items-center justify-between rounded-xl bg-white/55 p-4">
                  <div>
                    <p className="font-semibold text-slate-800">{sub.title}</p>
                    <p className="text-sm text-slate-600">{sub.authors || 'No authors listed'}</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedPaper(sub._id);
                      setIsModalOpen(true);
                    }}
                    className="rounded-xl bg-gradient-to-r from-[#5680E9] to-[#8860D0] px-4 py-2 text-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(86,128,233,0.35)]"
                  >
                    Assign Reviewer
                  </button>
                </div>
              ))}

              {!loading && submissions.filter((s) => s.status === 'submitted').length === 0 && (
                <p className="text-slate-600">No pending submissions to assign.</p>
              )}
            </div>
          </div>

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Assign Reviewer">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Select Reviewer</label>
              <select
                value={selectedReviewer}
                onChange={(e) => setSelectedReviewer(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Choose a reviewer</option>
                {reviewers.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} - {r.expertise}
                  </option>
                ))}
              </select>
              <button
                onClick={handleAssign}
                className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition"
              >
                Assign
              </button>
            </div>
          </Modal>
        </main>
      </div>
    </div>
  );
};

export default AdminReviewers;
