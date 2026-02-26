import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import { schedule } from '../../data/dummyData';

const AdminSchedule = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar role="admin" />
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Conference Schedule</h1>
            <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition">
              Add Session
            </button>
          </div>

          <div className="space-y-6">
            {schedule.map((day) => (
              <div key={day.id} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{day.date}</h2>
                <div className="space-y-4">
                  {day.sessions.map((session) => (
                    <div key={session.id} className="border-l-4 border-primary-500 pl-4 py-3 bg-gray-50 rounded">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-gray-600 font-semibold">{session.time}</p>
                          <h3 className="text-lg font-bold text-gray-800 mt-1">{session.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Speaker: {session.speaker} | Room: {session.room}
                          </p>
                          <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                            session.type === 'keynote' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {session.type.toUpperCase()}
                          </span>
                        </div>
                        <div className="space-x-2">
                          <button className="text-primary-600 hover:text-primary-700 font-semibold">Edit</button>
                          <button className="text-red-600 hover:text-red-700 font-semibold">Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminSchedule;
