import { useEffect, useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import { useAuth } from '../../context/AuthContext';
import { apiGet } from '../../api/api';

const AdminRegistrations = () => {
  const { token } = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        setLoading(true);
        const data = await apiGet('/registrations', token);
        setRegistrations(data);
      } catch (fetchError) {
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C1C8E4] via-[#84CEEB]/45 to-[#5680E9]/20">
      <Navbar />
      <div className="flex">
        <Sidebar role="admin" />
        <main className="flex-1 p-8">
          <h1 className="mb-8 text-3xl font-black text-slate-900">Attendee Registrations</h1>

          {loading ? (
            <div className="glass-card rounded-2xl p-12 text-center">
              <p className="text-slate-600">Loading registrations...</p>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-300 text-red-700 rounded-lg p-6">
              {error}
            </div>
          ) : (
            <div className="glass-card overflow-hidden rounded-2xl">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-white/45">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-slate-500">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-slate-500">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-slate-500">Ticket Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-slate-500">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white/25">
                  {registrations.map((reg) => (
                    <tr key={reg._id} className="hover:bg-white/45">
                      <td className="px-6 py-4 text-sm text-slate-900">{reg.user?.name || reg.userName || 'Unknown'}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{reg.user?.email || reg.email || 'Unknown'}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{reg.ticketType || 'Standard'}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{new Date(reg.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminRegistrations;
