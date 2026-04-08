import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import { useAuth } from '../../context/AuthContext';
import { apiPost } from '../../api/api';

const SubmitPaper = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    authors: '',
    keywords: '',
    pdfFile: null,
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, pdfFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.pdfFile) {
      setError('Please upload a PDF file for the paper.');
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('abstract', formData.abstract);
    data.append('authors', formData.authors);
    data.append('keywords', formData.keywords);
    data.append('paper', formData.pdfFile);

    try {
      setIsSubmitting(true);
      await apiPost('/papers', data, token);
      navigate('/user/submissions');
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C1C8E4] via-[#84CEEB]/45 to-[#5680E9]/20">
      <Navbar />
      <div className="flex">
        <Sidebar role="user" />
        <main className="flex-1 p-8">
          <h1 className="mb-8 text-3xl font-black text-slate-900">Submit Research Paper</h1>

          {error && (
            <div className="mb-6 rounded-xl border border-red-300 bg-red-100 px-4 py-3 text-red-700">{error}</div>
          )}

          <div className="glass-card max-w-3xl rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Paper Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/45 bg-white/70 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Abstract *
                </label>
                <textarea
                  name="abstract"
                  value={formData.abstract}
                  onChange={handleChange}
                  rows="6"
                  className="w-full rounded-xl border border-white/45 bg-white/70 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Authors (comma-separated) *
                </label>
                <input
                  type="text"
                  name="authors"
                  value={formData.authors}
                  onChange={handleChange}
                  placeholder="John Doe, Jane Smith"
                  className="w-full rounded-xl border border-white/45 bg-white/70 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Keywords (comma-separated) *
                </label>
                <input
                  type="text"
                  name="keywords"
                  value={formData.keywords}
                  onChange={handleChange}
                  placeholder="Machine Learning, AI, Deep Learning"
                  className="w-full rounded-xl border border-white/45 bg-white/70 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Upload PDF *
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="w-full rounded-xl border border-white/45 bg-white/70 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                  required
                />
                <p className="mt-1 text-xs text-slate-500">Maximum file size: 10MB</p>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 rounded-xl bg-gradient-to-r from-[#5680E9] to-[#8860D0] py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(86,128,233,0.35)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Paper'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/user/dashboard')}
                  className="flex-1 rounded-xl bg-white/70 py-3 font-semibold text-slate-700 transition hover:bg-white"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SubmitPaper;
