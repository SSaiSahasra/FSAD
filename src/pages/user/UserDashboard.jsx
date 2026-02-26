import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import Card from '../../components/common/Card';
import { useAuth } from '../../context/AuthContext';
import { submissions } from '../../data/dummyData';

const UserDashboard = () => {
  const { currentUser } = useAuth();
  const userSubmissions = submissions.filter(s => s.userId === currentUser?.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar role="user" />
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome, {currentUser?.name}!</h1>
          <p className="text-gray-600 mb-8">Manage your conference participation</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card
              title="My Submissions"
              value={userSubmissions.length}
              icon="📄"
              color="blue"
            />
            <Card
              title="Accepted Papers"
              value={userSubmissions.filter(s => s.status === 'accepted').length}
              icon="✅"
              color="green"
            />
            <Card
              title="Pending Reviews"
              value={userSubmissions.filter(s => s.status === 'pending').length}
              icon="⏳"
              color="yellow"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition text-left px-4">
                  📝 Submit New Paper
                </button>
                <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition text-left px-4">
                  🎫 Register for Conference
                </button>
                <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition text-left px-4">
                  📅 View Schedule
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Submissions</h2>
              <div className="space-y-3">
                {userSubmissions.length > 0 ? (
                  userSubmissions.map((sub) => (
                    <div key={sub.id} className="p-3 bg-gray-50 rounded-lg">
                      <p className="font-semibold text-gray-800">{sub.title}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Status: <span className={`font-semibold ${
                          sub.status === 'accepted' ? 'text-green-600' :
                          sub.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                        }`}>{sub.status}</span>
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No submissions yet</p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
