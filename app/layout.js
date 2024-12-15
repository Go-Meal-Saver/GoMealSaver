import localFont from 'next/font/local';
import { ToastContainer } from 'react-toastify';
import Navbar from '../components/Navbar.jsx';
import AuthProvider from '@/components/AuthProvider';
import Footer from '@/components/Footer';
import { GlobalProvider } from '@/context/GlobalContext';

// Styles
import '../assets/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

// Font configurations
const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

// Metadata configuration
export const metadata = {
  title: 'GoMealSaver',
  description: 'GoMealSaver is a meal planner and grocery list app.',
  applicationName: 'GoMealSaver',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      {
        url: '/manifest/favicon.ico',
        sizes: 'any',
      },
      {
        url: '/manifest/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/manifest/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/manifest/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/manifest/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/manifest/android-chrome-512x512.png',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <GlobalProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </GlobalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
