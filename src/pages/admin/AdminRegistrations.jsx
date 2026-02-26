import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import { registrations } from '../../data/dummyData';

const AdminRegistrations = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar role="admin" />
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Attendee Registrations</h1>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ticket Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {registrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{reg.userName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{reg.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{reg.ticketType}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{reg.registeredDate}</td>
                    <td className="px-6 py-4 text-sm">
                      <button className="text-primary-600 hover:text-primary-700 font-semibold">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminRegistrations;
