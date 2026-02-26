import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import { schedule } from '../../data/dummyData';

const UserSchedule = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar role="user" />
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Conference Schedule</h1>

          <div className="space-y-6">
            {schedule.map((day) => (
              <div key={day.id} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{day.date}</h2>
                <div className="space-y-4">
                  {day.sessions.map((session) => (
                    <div key={session.id} className="border-l-4 border-primary-500 pl-4 py-3 bg-gray-50 rounded hover:bg-gray-100 transition">
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

export default UserSchedule;
