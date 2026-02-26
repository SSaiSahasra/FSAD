import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ role }) => {
  const location = useLocation();

  const adminLinks = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/submissions', label: 'Submissions', icon: '📄' },
    { path: '/admin/reviewers', label: 'Reviewers', icon: '👥' },
    { path: '/admin/schedule', label: 'Schedule', icon: '📅' },
    { path: '/admin/registrations', label: 'Registrations', icon: '✅' }
  ];

  const userLinks = [
    { path: '/user/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/user/submit', label: 'Submit Paper', icon: '📝' },
    { path: '/user/submissions', label: 'My Submissions', icon: '📄' },
    { path: '/user/register', label: 'Register', icon: '🎫' },
    { path: '/user/schedule', label: 'Schedule', icon: '📅' },
    { path: '/user/profile', label: 'Profile', icon: '👤' }
  ];

  const links = role === 'admin' ? adminLinks : userLinks;

  return (
    <aside className="w-64 bg-white shadow-lg h-screen sticky top-0">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          {role === 'admin' ? 'Admin Panel' : 'User Panel'}
        </h2>
        <nav className="space-y-2">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                location.pathname === link.path
                  ? 'bg-primary-100 text-primary-700 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
