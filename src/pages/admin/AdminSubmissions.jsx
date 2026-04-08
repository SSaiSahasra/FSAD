import { useEffect, useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import Modal from '../../components/common/Modal';
import { useAuth } from '../../context/AuthContext';
import { apiGet, apiPost, apiPut } from '../../api/api';

const AdminSubmissions = () => {
  const { token } = useAuth();
  const [submissionList, setSubmissionList] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reviewForm, setReviewForm] = useState({
    comments: '',
    marks: '',
    percentage: '',
    status: 'reviewed',
  });
  const [savingReview, setSavingReview] = useState(false);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await apiGet('/papers', token);
        setSubmissionList(data);
      } catch (fetchError) {
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [token]);

  const handleStatusChange = async (submissionId, status) => {
    try {
      const updated = await apiPut(`/papers/${submissionId}/status`, { status }, token);
      setSubmissionList((prev) => prev.map((sub) => (sub._id === updated._id ? updated : sub)));
    } catch (statusError) {
      setError(statusError.message);
    }
  };

  const viewDetails = (submission) => {
    setSelectedSubmission(submission);
    setReviewForm({
      comments: submission.comments || '',
      marks: submission.marks != null ? String(submission.marks) : '',
      percentage: submission.percentage != null ? String(submission.percentage) : '',
      status: submission.status === 'submitted' ? 'reviewed' : submission.status,
    });
    setIsModalOpen(true);
  };

  const handleReviewSubmit = async () => {
    if (!selectedSubmission) {
      return;
    }

    try {
      setSavingReview(true);
      const payload = {
        comments: reviewForm.comments,
        marks: reviewForm.marks === '' ? null : Number(reviewForm.marks),
        percentage: reviewForm.percentage === '' ? null : Number(reviewForm.percentage),
        status: reviewForm.status,
      };

      const updated = await apiPost(`/papers/${selectedSubmission._id}/review`, payload, token);
      setSubmissionList((prev) => prev.map((sub) => (sub._id === updated._id ? updated : sub)));
      setSelectedSubmission(updated);
    } catch (reviewError) {
      setError(reviewError.message);
    } finally {
      setSavingReview(false);
    }
  };

  const getPdfUrl = (submission) => {
    if (!submission?.filePath) {
      return '';
    }

    if (submission.filePath.startsWith('http://') || submission.filePath.startsWith('https://')) {
      return submission.filePath;
    }

    const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
    const backendOrigin = apiBase.endsWith('/api') ? apiBase.slice(0, -4) : apiBase;
    return `${backendOrigin}${submission.filePath}`;
  };

  const getStatusBadge = (status) => {
    const colors = {
      submitted: 'bg-yellow-100 text-yellow-800',
      reviewed: 'bg-blue-100 text-blue-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return (
      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${colors[status] || 'bg-slate-100 text-slate-800'}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C1C8E4] via-[#84CEEB]/45 to-[#5680E9]/20">
      <Navbar />
      <div className="flex">
        <Sidebar role="admin" />
        <main className="flex-1 p-8">
          <h1 className="mb-8 text-3xl font-black text-slate-900">Paper Submissions</h1>

          {loading ? (
            <div className="glass-card mb-8 rounded-2xl p-12 text-center">
              <p className="text-slate-600">Loading submissions...</p>
            </div>
          ) : error ? (
            <div className="mb-8 rounded-xl border border-red-300 bg-red-100 p-6 text-red-700">
              {error}
            </div>
          ) : (
            <div className="glass-card overflow-hidden rounded-2xl">
            <table className="min-w-full divide-y divide-white/35">
              <thead className="bg-white/40">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Authors</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/35">
                {submissionList.map((sub) => (
                  <tr key={sub._id} className="transition hover:bg-white/30">
                    <td className="px-6 py-4 text-sm text-slate-900">{sub.title}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{sub.authors || '—'}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{new Date(sub.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{getStatusBadge(sub.status)}</td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <button
                        onClick={() => viewDetails(sub)}
                        className="font-semibold text-primary-600 hover:text-primary-700"
                      >
                        View
                      </button>
                      {sub.filePath && (
                        <a
                          href={getPdfUrl(sub)}
                          target="_blank"
                          rel="noreferrer"
                          className="text-indigo-600 hover:text-indigo-700 font-semibold"
                        >
                          PDF
                        </a>
                      )}
                      {sub.status === 'submitted' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(sub._id, 'accepted')}
                            className="text-green-600 hover:text-green-700 font-semibold"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleStatusChange(sub._id, 'rejected')}
                            className="text-red-600 hover:text-red-700 font-semibold"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )}

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Submission Details">
            {selectedSubmission && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-700">Title</h3>
                  <p className="text-slate-900">{selectedSubmission.title}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-700">Authors</h3>
                  <p className="text-slate-900">{selectedSubmission.authors}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-700">Abstract</h3>
                  <p className="text-slate-900">{selectedSubmission.abstract}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-700">Keywords</h3>
                  <p className="text-slate-900">{selectedSubmission.keywords}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-700">Status</h3>
                  {getStatusBadge(selectedSubmission.status)}
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-slate-700">Review Comments</h3>
                  <textarea
                    rows="4"
                    value={reviewForm.comments}
                    onChange={(e) => setReviewForm((prev) => ({ ...prev, comments: e.target.value }))}
                    className="w-full rounded-xl border border-white/45 bg-white/80 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                    placeholder="Add detailed review comments"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="mb-2 font-semibold text-slate-700">Marks</h3>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={reviewForm.marks}
                      onChange={(e) => setReviewForm((prev) => ({ ...prev, marks: e.target.value }))}
                      className="w-full rounded-xl border border-white/45 bg-white/80 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g. 82"
                    />
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-slate-700">Percentage</h3>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={reviewForm.percentage}
                      onChange={(e) => setReviewForm((prev) => ({ ...prev, percentage: e.target.value }))}
                      className="w-full rounded-xl border border-white/45 bg-white/80 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g. 82"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-slate-700">Review Status</h3>
                  <select
                    value={reviewForm.status}
                    onChange={(e) => setReviewForm((prev) => ({ ...prev, status: e.target.value }))}
                    className="w-full rounded-xl border border-white/45 bg-white/80 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="reviewed">Reviewed</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleReviewSubmit}
                    disabled={savingReview}
                    className="rounded-xl bg-gradient-to-r from-[#5680E9] to-[#8860D0] px-4 py-2 font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(86,128,233,0.3)] disabled:opacity-60"
                  >
                    {savingReview ? 'Saving Review...' : 'Save Review'}
                  </button>
                </div>
                {selectedSubmission.filePath && (
                  <div>
                    <h3 className="font-semibold text-slate-700">Paper PDF</h3>
                    <a
                      href={getPdfUrl(selectedSubmission)}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-primary-600 hover:text-primary-700"
                    >
                      Open PDF in new tab
                    </a>
                  </div>
                )}
              </div>
            )}
          </Modal>
        </main>
      </div>
    </div>
  );
};

export default AdminSubmissions;
