import { useEffect, useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import { useAuth } from '../../context/AuthContext';
import { apiGet } from '../../api/api';

const UserSchedule = () => {
  const { token } = useAuth();
  const [schedule, setSchedule] = useState(null);
  const [conference, setConference] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setLoading(true);
        const conferences = await apiGet('/conferences', token);
        const firstConference = conferences[0];
        setConference(firstConference);

        if (!firstConference) {
          setError('No conferences available.');
          return;
        }

        const scheduleData = await apiGet(`/schedules/conference/${firstConference._id}`, token);
        setSchedule(scheduleData);
      } catch (fetchError) {
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C1C8E4] via-[#84CEEB]/45 to-[#5680E9]/20">
      <Navbar />
      <div className="flex">
        <Sidebar role="user" />
        <main className="flex-1 p-8">
          <h1 className="mb-8 text-3xl font-black text-slate-900">Conference Schedule</h1>

          {loading ? (
            <div className="glass-card rounded-2xl p-12 text-center">
              <p className="text-slate-600">Loading conference schedule...</p>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-300 text-red-700 rounded-lg p-6">
              {error}
            </div>
          ) : schedule ? (
            <div className="space-y-6">
              <div className="glass-card rounded-2xl p-6">
                <h2 className="mb-2 text-2xl font-bold text-slate-800">{conference?.title}</h2>
                <p className="mb-6 text-sm text-slate-600">{new Date(conference?.date).toLocaleDateString()} • {conference?.location}</p>
                <div className="space-y-4">
                  {schedule.sessions.map((session, index) => (
                    <div key={index} className="rounded-lg border-l-4 border-primary-500 bg-white/55 py-3 pl-4 transition hover:bg-white/70">
                      <p className="text-sm font-semibold text-slate-600">{session.time}</p>
                      <h3 className="mt-1 text-lg font-bold text-slate-800">{session.title}</h3>
                      <p className="mt-1 text-sm text-slate-600">Speaker: {session.speaker}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-12 text-center">
              <p className="text-lg text-slate-600">No schedule is available for the selected conference.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserSchedule;
