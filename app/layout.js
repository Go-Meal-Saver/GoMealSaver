import localFont from 'next/font/local';
import '../assets/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css'; //
import { ToastContainer } from 'react-toastify';
import Navbar from '../components/Navbar.jsx';
import AuthProvider from '@/components/AuthProvider';
import Footer from '@/components/Footer';
import { GlobalProvider } from '@/context/GlobalContext';

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

export const metadata = {
  title: 'Go Mea lSaver',
  description: 'Go Meal Saver',
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <GlobalProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </GlobalProvider>
    </AuthProvider>
  );
}
