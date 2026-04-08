import { useEffect, useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import Modal from '../../components/common/Modal';
import { useAuth } from '../../context/AuthContext';
import { apiDelete, apiGet, apiPost, apiPut } from '../../api/api';

const AdminSchedule = () => {
  const { token } = useAuth();
  const [conference, setConference] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editingSessionId, setEditingSessionId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    speaker: '',
    room: '',
    track: 'General',
    startTime: '',
    endTime: '',
  });

  const normalizeDatetime = (isoValue) => {
    if (!isoValue) {
      return '';
    }

    return String(isoValue).slice(0, 16);
  };

  const loadSchedule = async () => {
    try {
      setLoading(true);
      setError('');

      const conferences = await apiGet('/conferences', token);
      const firstConference = conferences?.[0] || null;
      setConference(firstConference);

      if (!firstConference?._id) {
        setSchedule(null);
        setError('No conferences available to manage schedule.');
        return;
      }

      const scheduleData = await apiGet(`/schedules/conference/${firstConference._id}`, token);
      setSchedule(scheduleData);
    } catch (fetchError) {
      setError(fetchError.message || 'Failed to load schedule.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSchedule();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const sessions = Array.isArray(schedule?.sessions)
    ? schedule.sessions
    : Array.isArray(schedule)
      ? schedule
      : [];

  const openAddModal = () => {
    setEditingSessionId(null);
    setFormData({
      title: '',
      speaker: '',
      room: '',
      track: 'General',
      startTime: '',
      endTime: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (session) => {
    setEditingSessionId(session.id || session._id || null);
    setFormData({
      title: session.title || '',
      speaker: session.speaker === 'TBD' ? '' : (session.speaker || ''),
      room: session.room === 'TBD' ? '' : (session.room || ''),
      track: session.track || 'General',
      startTime: normalizeDatetime(session.startTime),
      endTime: normalizeDatetime(session.endTime),
    });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    if (isSaving) {
      return;
    }

    setIsModalOpen(false);
  };

  const handleSaveSession = async () => {
    if (!formData.title.trim() || !formData.startTime || !formData.endTime) {
      setError('Title, start time, and end time are required.');
      return;
    }

    try {
      setIsSaving(true);
      setError('');

      const payload = {
        title: formData.title.trim(),
        speaker: formData.speaker.trim(),
        room: formData.room.trim(),
        track: formData.track.trim() || 'General',
        startTime: formData.startTime,
        endTime: formData.endTime,
      };

      if (editingSessionId) {
        await apiPut(`/schedules/${editingSessionId}`, payload, token);
      } else {
        await apiPost('/schedules', payload, token);
      }

      setIsModalOpen(false);
      await loadSchedule();
    } catch (saveError) {
      setError(saveError.message || 'Failed to save session.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteSession = async (sessionId) => {
    if (!sessionId || deletingId) {
      return;
    }

    const confirmed = window.confirm('Delete this session?');
    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(sessionId);
      setError('');
      await apiDelete(`/schedules/${sessionId}`, token);
      await loadSchedule();
    } catch (deleteError) {
      setError(deleteError.message || 'Failed to delete session.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C1C8E4] via-[#84CEEB]/45 to-[#5680E9]/20">
      <Navbar />
      <div className="flex">
        <Sidebar role="admin" />
        <main className="flex-1 p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-slate-900">Conference Schedule</h1>
              <p className="mt-2 text-slate-700">Manage session details for your upcoming conference.</p>
            </div>
            <button
              type="button"
              onClick={openAddModal}
              className="rounded-xl bg-gradient-to-r from-[#5680E9] to-[#8860D0] px-6 py-2 text-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(86,128,233,0.3)]"
            >
              Add Session
            </button>
          </div>

          {loading ? (
            <div className="glass-card rounded-2xl p-12 text-center">
              <p className="text-slate-600">Loading schedule...</p>
            </div>
          ) : error ? (
            <div className="rounded-xl border border-red-300 bg-red-100 p-6 text-red-700">{error}</div>
          ) : (
            <div className="space-y-6">
              <div className="glass-card rounded-2xl p-6">
                <h2 className="mb-2 text-2xl font-bold text-slate-900">{conference?.title || 'Untitled Conference'}</h2>
                <p className="text-sm text-slate-600">
                  {conference?.date ? new Date(conference.date).toLocaleDateString() : 'Date TBD'}
                  {' '}•{' '}
                  {conference?.location || 'Location TBD'}
                </p>
              </div>

              {sessions.length === 0 ? (
                <div className="glass-card rounded-2xl p-10 text-center text-slate-700">
                  No sessions have been scheduled yet.
                </div>
              ) : (
                sessions.map((session) => (
                  <div key={session.id || session._id || session.title} className="glass-card rounded-2xl p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-[#5680E9]">{session.track || 'General'}</p>
                        <h3 className="mt-1 text-xl font-bold text-slate-900">{session.title || 'Session'}</h3>
                        <p className="mt-1 text-sm text-slate-700">Speaker: {session.speaker || 'TBD'}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-[#5680E9]">{session.time || 'Time TBD'}</p>
                        <p className="text-sm text-slate-600">Room: {session.room || 'TBD'}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(session)}
                        className="rounded-lg bg-blue-100 px-3 py-1.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-200"
                      >
                        Edit
                      </button>
                      {(session.id || session._id) && (
                        <button
                          type="button"
                          disabled={deletingId === (session.id || session._id)}
                          onClick={() => handleDeleteSession(session.id || session._id)}
                          className="rounded-lg bg-red-100 px-3 py-1.5 text-sm font-semibold text-red-700 transition hover:bg-red-200 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {deletingId === (session.id || session._id) ? 'Deleting...' : 'Delete'}
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          <Modal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            title={editingSessionId ? 'Edit Session' : 'Add Session'}
          >
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(event) => setFormData((prev) => ({ ...prev, title: event.target.value }))}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2"
                  placeholder="Session title"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-700">Speaker</label>
                  <input
                    type="text"
                    value={formData.speaker}
                    onChange={(event) => setFormData((prev) => ({ ...prev, speaker: event.target.value }))}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2"
                    placeholder="Speaker name"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-700">Room</label>
                  <input
                    type="text"
                    value={formData.room}
                    onChange={(event) => setFormData((prev) => ({ ...prev, room: event.target.value }))}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2"
                    placeholder="Room"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Track</label>
                <input
                  type="text"
                  value={formData.track}
                  onChange={(event) => setFormData((prev) => ({ ...prev, track: event.target.value }))}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2"
                  placeholder="Track"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-700">Start Time</label>
                  <input
                    type="datetime-local"
                    value={formData.startTime}
                    onChange={(event) => setFormData((prev) => ({ ...prev, startTime: event.target.value }))}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-700">End Time</label>
                  <input
                    type="datetime-local"
                    value={formData.endTime}
                    onChange={(event) => setFormData((prev) => ({ ...prev, endTime: event.target.value }))}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleSaveSession}
                disabled={isSaving}
                className="rounded-lg bg-gradient-to-r from-[#5680E9] to-[#8860D0] px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? 'Saving...' : (editingSessionId ? 'Update Session' : 'Create Session')}
              </button>
            </div>
          </Modal>
        </main>
      </div>
    </div>
  );
};

export default AdminSchedule;
