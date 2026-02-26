import { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import Modal from '../../components/common/Modal';
import { reviewers, submissions } from '../../data/dummyData';

const AdminReviewers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [selectedReviewer, setSelectedReviewer] = useState('');

  const handleAssign = () => {
    alert(`Assigned reviewer ${selectedReviewer} to paper ${selectedPaper}`);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar role="admin" />
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Peer Reviewers</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {reviewers.map((reviewer) => (
              <div key={reviewer.id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{reviewer.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{reviewer.email}</p>
                <p className="text-sm text-primary-600 font-semibold">{reviewer.expertise}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Assign Reviewers to Papers</h2>
            <div className="space-y-3">
              {submissions.filter(s => s.status === 'pending').map((sub) => (
                <div key={sub.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-800">{sub.title}</p>
                    <p className="text-sm text-gray-600">{sub.authors}</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedPaper(sub.id);
                      setIsModalOpen(true);
                    }}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
                  >
                    Assign Reviewer
                  </button>
                </div>
              ))}
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
