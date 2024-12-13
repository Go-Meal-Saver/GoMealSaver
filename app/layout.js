import localFont from 'next/font/local';
import '../assets/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css'; //
import { ToastContainer } from 'react-toastify';
import Navbar from '../components/Navbar.jsx';
import AuthProvider from '@/components/AuthProvider';
import Footer from '@/components/Footer';
import { GlobalProvider } from '@/context/GlobalContext';
import Head from 'next/head';

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
  title: 'Go Meal Saver',
  description: 'Go Meal Saver',
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <GlobalProvider>
        <html lang="en">
          <Head>
            <meta name="application-name" content="GoMealSaver" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta
              name="apple-mobile-web-app-status-bar-style"
              content="default"
            />
            <meta name="theme-color" content="#ffffff" />
            <link rel="manifest" href="../public/manifest.json" />
            <link rel="apple-touch-icon" href="../assets/images/logo.jpg" />
          </Head>
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
