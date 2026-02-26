import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import { useAuth } from '../../context/AuthContext';
import { submissions } from '../../data/dummyData';

const UserSubmissions = () => {
  const { currentUser } = useAuth();
  const userSubmissions = submissions.filter(s => s.userId === currentUser?.id);

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
        <Sidebar role="user" />
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Submissions</h1>

          {userSubmissions.length > 0 ? (
            <div className="space-y-6">
              {userSubmissions.map((sub) => (
                <div key={sub.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">{sub.title}</h2>
                      <p className="text-sm text-gray-600 mt-1">Submitted: {sub.submittedDate}</p>
                    </div>
                    {getStatusBadge(sub.status)}
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-700"><span className="font-semibold">Authors:</span> {sub.authors}</p>
                    <p className="text-gray-700"><span className="font-semibold">Keywords:</span> {sub.keywords}</p>
                    <p className="text-gray-700"><span className="font-semibold">Abstract:</span> {sub.abstract}</p>
                    {sub.feedback && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <p className="font-semibold text-gray-800">Reviewer Feedback:</p>
                        <p className="text-gray-700 mt-1">{sub.feedback}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-600 text-lg mb-4">You haven't submitted any papers yet.</p>
              <button className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition">
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
