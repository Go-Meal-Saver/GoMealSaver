import Link from 'next/link';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function NotFound() {
  return (
    <section className="bg-green-50 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white px-8 py-14 shadow-lg rounded-xl border border-gray-100 text-center transform hover:scale-[1.01] transition-transform duration-300">
          <div className="flex justify-center mb-6">
            <FaExclamationTriangle className="text-green-600 text-7xl animate-pulse" />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-800">Page Not Found</h1>
            <p className="text-gray-600 text-lg">
              The page you are looking for does not exist.
            </p>
            <div className="mt-8">
              <Link
                href="/"
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
