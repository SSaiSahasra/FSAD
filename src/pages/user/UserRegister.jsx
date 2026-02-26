import { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import { useAuth } from '../../context/AuthContext';

const UserRegister = () => {
  const { currentUser } = useAuth();
  const [ticketType, setTicketType] = useState('full');
  const [registered, setRegistered] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    setRegistered(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar role="user" />
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Register for Conference</h1>

          {!registered ? (
            <div className="max-w-4xl">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6 border-2 border-primary-500">
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

                <div className="bg-white rounded-lg shadow-md p-6">
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

                <div className="bg-white rounded-lg shadow-md p-6">
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

              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Registration Details</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        defaultValue={currentUser?.name}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue={currentUser?.email}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        required
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
            <div className="bg-white rounded-lg shadow-md p-12 text-center max-w-2xl">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Registration Successful!</h2>
              <p className="text-gray-600 mb-6">
                You have successfully registered for the conference. A confirmation email has been sent to your email address.
              </p>
              <button className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition">
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
