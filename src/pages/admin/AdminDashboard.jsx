import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import Card from '../../components/common/Card';
import { stats } from '../../data/dummyData';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar role="admin" />
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card
              title="Total Submissions"
              value={stats.totalSubmissions}
              icon="📄"
              color="blue"
            />
            <Card
              title="Accepted Papers"
              value={stats.acceptedPapers}
              icon="✅"
              color="green"
            />
            <Card
              title="Pending Reviews"
              value={stats.pendingReviews}
              icon="⏳"
              color="yellow"
            />
            <Card
              title="Registered Participants"
              value={stats.registeredParticipants}
              icon="👥"
              color="purple"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-2xl">📄</span>
                  <div>
                    <p className="font-semibold text-gray-800">New submission received</p>
                    <p className="text-sm text-gray-600">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <span className="text-2xl">✅</span>
                  <div>
                    <p className="font-semibold text-gray-800">Paper approved</p>
                    <p className="text-sm text-gray-600">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <span className="text-2xl">👥</span>
                  <div>
                    <p className="font-semibold text-gray-800">New participant registered</p>
                    <p className="text-sm text-gray-600">1 day ago</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition">
                  Review Submissions
                </button>
                <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition">
                  Assign Reviewers
                </button>
                <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition">
                  Manage Schedule
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
