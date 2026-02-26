import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            International Academic Conference 2024
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join researchers, scholars, and industry experts from around the world to share
            groundbreaking research and innovative ideas.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/register"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary-700 transition"
            >
              Register Now
            </Link>
            <Link
              to="/login"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg text-lg font-semibold border-2 border-primary-600 hover:bg-primary-50 transition"
            >
              Login
            </Link>
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="text-4xl mb-4">📄</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Submit Papers</h3>
            <p className="text-gray-600">
              Share your research with the academic community
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Network</h3>
            <p className="text-gray-600">
              Connect with peers and industry leaders
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Learn</h3>
            <p className="text-gray-600">
              Attend keynotes and technical sessions
            </p>
          </div>
        </div>

        <div className="mt-20 bg-white p-10 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Conference Details
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-primary-600 mb-2">📅 Date</h3>
              <p className="text-gray-700">March 15-16, 2024</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary-600 mb-2">📍 Location</h3>
              <p className="text-gray-700">Virtual & Hybrid</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary-600 mb-2">🎯 Topics</h3>
              <p className="text-gray-700">AI, ML, Quantum Computing, Cybersecurity</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary-600 mb-2">⏰ Deadline</h3>
              <p className="text-gray-700">Paper Submission: February 28, 2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
