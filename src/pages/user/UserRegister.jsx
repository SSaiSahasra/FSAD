import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import { useAuth } from '../../context/AuthContext';
import { apiGet, apiPost } from '../../api/api';

const UserRegister = () => {
  const { currentUser, token } = useAuth();
  const navigate = useNavigate();
  const [ticketType, setTicketType] = useState('full');
  const [registered, setRegistered] = useState(false);
  const [conferences, setConferences] = useState([]);
  const [selectedConference, setSelectedConference] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchConferences = async () => {
      try {
        const data = await apiGet('/conferences', token);
        setConferences(data);
        setSelectedConference(data[0]?._id || data[0]?.id || '');
      } catch (fetchError) {
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConferences();
  }, [token]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!selectedConference) {
      setError('Please select a conference.');
      return;
    }

    try {
      await apiPost('/registrations', JSON.stringify({ conferenceId: selectedConference, ticketType }), token, 'application/json');
      setRegistered(true);
    } catch (submitError) {
      setError(submitError.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C1C8E4] via-[#84CEEB]/45 to-[#5680E9]/20">
      <Navbar />
      <div className="flex">
        <Sidebar role="user" />
        <main className="flex-1 p-8">
          <h1 className="mb-8 text-3xl font-black text-slate-900">Register for Conference</h1>

          {!registered ? (
            <div className="max-w-4xl">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="glass-card rounded-2xl border-2 border-primary-500 p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Full Conference</h3>
                  <p className="text-3xl font-bold text-primary-600 mb-4">$299</p>
                  <ul className="space-y-2 text-sm text-gray-600 mb-6">
                    <li>✓ All sessions access</li>
                    <li>✓ Networking events</li>
                    <li>✓ Conference materials</li>
                    <li>✓ Certificate</li>
                  </ul>
                  <button
                    onClick={() => setTicketType('full')}
                    className={`w-full py-2 rounded-lg transition ${
                      ticketType === 'full'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Select
                  </button>
                </div>

                <div className="glass-card rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Single Day</h3>
                  <p className="text-3xl font-bold text-primary-600 mb-4">$149</p>
                  <ul className="space-y-2 text-sm text-gray-600 mb-6">
                    <li>✓ One day access</li>
                    <li>✓ Selected sessions</li>
                    <li>✓ Conference materials</li>
                    <li>✗ Certificate</li>
                  </ul>
                  <button
                    onClick={() => setTicketType('single')}
                    className={`w-full py-2 rounded-lg transition ${
                      ticketType === 'single'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Select
                  </button>
                </div>

                <div className="glass-card rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Virtual</h3>
                  <p className="text-3xl font-bold text-primary-600 mb-4">$99</p>
                  <ul className="space-y-2 text-sm text-gray-600 mb-6">
                    <li>✓ Online streaming</li>
                    <li>✓ Recorded sessions</li>
                    <li>✓ Digital materials</li>
                    <li>✗ Certificate</li>
                  </ul>
                  <button
                    onClick={() => setTicketType('virtual')}
                    className={`w-full py-2 rounded-lg transition ${
                      ticketType === 'virtual'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Select
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="glass-card mb-8 rounded-2xl p-12 text-center">
                  <p className="text-slate-600">Loading conference options...</p>
                </div>
              ) : error ? (
                <div className="bg-red-100 border border-red-300 text-red-700 rounded-lg p-6 mb-8">
                  {error}
                </div>
              ) : (
                <div className="glass-card mb-8 rounded-2xl p-8">
                  <h2 className="mb-6 text-2xl font-bold text-slate-800">Select a Conference</h2>
                  <select
                    value={selectedConference}
                    onChange={(e) => setSelectedConference(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    {conferences.map((conference) => (
                      <option key={conference._id || conference.id} value={conference._id || conference.id}>
                        {conference.title} • {new Date(conference.date).toLocaleDateString()}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="glass-card rounded-2xl p-8">
                <h2 className="mb-6 text-2xl font-bold text-slate-800">Registration Details</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        defaultValue={currentUser?.name}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        required
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue={currentUser?.email}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        required
                        disabled
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
                  >
                    Complete Registration
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="glass-card max-w-2xl rounded-2xl p-12 text-center">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="mb-4 text-3xl font-bold text-slate-800">Registration Successful!</h2>
              <p className="mb-6 text-slate-600">
                You have successfully registered for the conference. A confirmation email has been sent to your email address.
              </p>
              <button onClick={() => navigate('/user/schedule')} className="rounded-xl bg-gradient-to-r from-[#5680E9] to-[#8860D0] px-6 py-3 text-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(86,128,233,0.35)]">
                View Schedule
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserRegister;
