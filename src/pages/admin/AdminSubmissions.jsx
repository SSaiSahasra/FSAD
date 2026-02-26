import { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import Modal from '../../components/common/Modal';
import { submissions } from '../../data/dummyData';

const AdminSubmissions = () => {
  const [submissionList, setSubmissionList] = useState(submissions);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStatusChange = (id, status) => {
    setSubmissionList(submissionList.map(sub =>
      sub.id === id ? { ...sub, status } : sub
    ));
  };

  const viewDetails = (submission) => {
    setSelectedSubmission(submission);
    setIsModalOpen(true);
  };

  const getStatusBadge = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[status]}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar role="admin" />
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Paper Submissions</h1>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Authors</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {submissionList.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{sub.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{sub.authors}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{sub.submittedDate}</td>
                    <td className="px-6 py-4">{getStatusBadge(sub.status)}</td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <button
                        onClick={() => viewDetails(sub)}
                        className="text-primary-600 hover:text-primary-700 font-semibold"
                      >
                        View
                      </button>
                      {sub.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(sub.id, 'accepted')}
                            className="text-green-600 hover:text-green-700 font-semibold"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleStatusChange(sub.id, 'rejected')}
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

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Submission Details">
            {selectedSubmission && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700">Title</h3>
                  <p className="text-gray-900">{selectedSubmission.title}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Authors</h3>
                  <p className="text-gray-900">{selectedSubmission.authors}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Abstract</h3>
                  <p className="text-gray-900">{selectedSubmission.abstract}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Keywords</h3>
                  <p className="text-gray-900">{selectedSubmission.keywords}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Status</h3>
                  {getStatusBadge(selectedSubmission.status)}
                </div>
              </div>
            )}
          </Modal>
        </main>
      </div>
    </div>
  );
};

export default AdminSubmissions;
