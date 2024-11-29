<<<<<<< Updated upstream
'use client';

import Link from 'next/link';
import Image from 'next/image';
import logo from '../assets/images/logo-remove.png';
import profileDefault from '@/assets/images/profile.png';
import { FaGoogle, FaGithub, FaFacebook } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import UnreadMessageCount from './UnreadMessageCount';
import LoginForm from './LoginForm';
import Container from './ContainerLogin';

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const profileImage = session?.user?.image || profileDefault;
  const [providers, setProviders] = useState(null);
  const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const authMenuRef = useRef(null);
  const loginModalRef = useRef(null);

  // Handle navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get authentication providers
  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setAuthProviders();
  }, []);

  // Handle click outside of auth menu and login modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (authMenuRef.current && !authMenuRef.current.contains(event.target)) {
        setIsAuthMenuOpen(false);
      }
      if (
        loginModalRef.current &&
        !loginModalRef.current.contains(event.target)
      ) {
        setIsLoginModalOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobileMenuOpen(false);
      setIsLoginModalOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const providerIcons = {
    google: FaGoogle,
    github: FaGithub,
    facebook: FaFacebook,
  };

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
    setIsAuthMenuOpen(false);
  };

  const renderAuthButton = () => {
    if (status === 'loading') {
      return (
        <button className="hidden md:flex items-center space-x-2 bg-white text-green-800 px-4 py-2 rounded-full">
          <span className="w-4 h-4 border-2 border-green-800 border-t-transparent rounded-full animate-spin"></span>
        </button>
      );
    }

    if (session) {
      return (
        <div className="relative" ref={authMenuRef}>
          <button
            onClick={() => setIsAuthMenuOpen(!isAuthMenuOpen)}
            className="flex items-center space-x-2 bg-white text-green-800 px-2 py-1 rounded-full hover:bg-green-100 transition-all duration-300"
          >
            <Image
              src={profileImage}
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="hidden md:block">{session.user.name}</span>
          </button>

          {isAuthMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                onClick={() => setIsAuthMenuOpen(false)}
              >
                Profile
              </Link>
              <Link
                href="/meals/saved"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                onClick={() => setIsAuthMenuOpen(false)}
              >
                Saved Meals
              </Link>
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="relative" ref={authMenuRef}>
        <button
          onClick={() => {
            setIsLoginModalOpen(true);
            setIsAuthMenuOpen(false);
          }}
          className="hidden md:flex items-center space-x-2 bg-white text-green-800 px-4 py-2 rounded-full hover:bg-green-100 transition-all duration-300"
        >
          <span>Login</span>
        </button>

        {isLoginModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
            <Container>
              <button
                onClick={() => setIsLoginModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="flex items-center justify-center mb-6">
                <Image
                  className="w-8 h-8 mr-2"
                  src={logo}
                  alt="GOMealSaver Logo"
                  priority
                />
                <span className="text-2xl font-semibold text-gray-900">
                  GOMealSaver
                </span>
              </div>
              <LoginForm />
              {providers && (
                <div className="space-y-4">
                  {Object.values(providers).map((provider) => {
                    const Icon = providerIcons[provider.id.toLowerCase()];
                    return (
                      <button
                        key={provider.id}
                        onClick={() => {
                          signIn(provider.id, {
                            callbackUrl: pathname,
                          });
                          setIsLoginModalOpen(false);
                        }}
                        className="flex items-center justify-center w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        {Icon && <Icon className="w-5 h-5 mr-2" />}
                        Sign in with {provider.name}
                      </button>
                    );
                  })}
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-green-300"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500">
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-green-600 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <p className="text-sm font-light text-gray-500">
                {' Dont have an account yet? '}
                <a
                  href="#"
                  className="font-medium text-green-600 hover:underline"
                >
                  Sign up
                </a>
              </p>
            </Container>
          </div>
        )}
      </div>
    );
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-green-800 shadow-lg' : 'bg-green-700'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link
              className="flex items-center space-x-2 transition-transform hover:scale-105"
              href="/"
            >
              <Image
                className="h-12 w-auto"
                src={logo}
                alt="GoMealSaver"
                priority
              />
              <span className="hidden md:block text-white text-xl font-bold">
                GOMealSaver
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative">
              <input
                type="search"
                placeholder="Search meals..."
                className="w-64 px-4 py-2 rounded-full bg-green-600 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            <Link
              href="/"
              className="text-white hover:text-green-200 px-3 py-2 text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/meals"
              className="text-white hover:text-green-200 px-3 py-2 text-sm font-medium transition-colors"
            >
              Meals
            </Link>
            {session && (
              <Link
                href="/meals/add"
                className="text-white hover:text-green-200 px-3 py-2 text-sm font-medium transition-colors"
              >
                Add Meal
              </Link>
            )}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {renderAuthButton()}

            {/* Notifications - Only show if logged in */}
            {session && (
              <Link href="/messages" aria-label="Messages">
                <button
                  className="relative p-2 text-white hover:text-green-200 transition-colors"
                  type="button"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <UnreadMessageCount />
                </button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-green-200 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMobileMenuOpen
                      ? 'M6 18L18 6M6 6l12 12'
                      : 'M4 6h16M4 12h16M4 18h16'
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'
        }`}
      >
        <div className="px-4 py-2 space-y-3 bg-green-800">
          <div className="relative mb-4">
            <input
              type="search"
              placeholder="Search meals..."
              className="w-full px-4 py-2 rounded-full bg-green-700 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          <Link
            href="/"
            className="block text-white hover:bg-green-700 px-3 py-2 rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/meals"
            className="block text-white hover:bg-green-700 px-3 py-2 rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Meals
          </Link>
          {session && (
            <>
              <Link
                href="/meals/add"
                className="block text-white hover:bg-green-700 px-3 py-2 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Add Meal
              </Link>
              <Link
                href="/profile"
                className="block text-white hover:bg-green-700 px-3 py-2 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <Link
                href="/meals/saved"
                className="block text-white hover:bg-green-700 px-3 py-2 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Saved Meals
              </Link>
              <Link
                href="/messages"
                className="block text-white hover:bg-green-700 px-3 py-2 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Messages
              </Link>
              <button
                onClick={() => {
                  handleSignOut();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left text-white hover:bg-green-700 px-3 py-2 rounded-md transition-colors"
              >
                Sign Out
              </button>
            </>
          )}

          {!session && (
            <button
              onClick={() => {
                setIsLoginModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-white hover:bg-green-700 px-3 py-2 rounded-md transition-colors"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
=======
'use client';

import Link from 'next/link';
import Image from 'next/image';
import logo from '../assets/images/logo-remove.png';
import profileDefault from '@/assets/images/profile.png';
import { FaGoogle, FaGithub, FaFacebook } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const profileImage = session?.user?.image || profileDefault;
  const [providers, setProviders] = useState(null);
  const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const authMenuRef = useRef(null);

  // Handle navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get authentication providers
  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setAuthProviders();
  }, []);

  // Handle click outside of auth menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (authMenuRef.current && !authMenuRef.current.contains(event.target)) {
        setIsAuthMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobileMenuOpen(false);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const providerIcons = {
    google: FaGoogle,
    github: FaGithub,
    facebook: FaFacebook,
  };

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
    setIsAuthMenuOpen(false);
  };

  const renderAuthButton = () => {
    if (status === 'loading') {
      return (
        <button className="hidden md:flex items-center space-x-2 bg-white text-green-800 px-4 py-2 rounded-full">
          <span className="w-4 h-4 border-2 border-green-800 border-t-transparent rounded-full animate-spin"></span>
        </button>
      );
    }

    if (session) {
      return (
        <div className="relative" ref={authMenuRef}>
          <button
            onClick={() => setIsAuthMenuOpen(!isAuthMenuOpen)}
            className="flex items-center space-x-2 bg-white text-green-800 px-2 py-1 rounded-full hover:bg-green-100 transition-all duration-300"
          >
            <Image
              src={profileImage}
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="hidden md:block">{session.user.name}</span>
          </button>

          {isAuthMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                onClick={() => setIsAuthMenuOpen(false)}
              >
                Profile
              </Link>
              <Link
                href="/meals/saved"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                onClick={() => setIsAuthMenuOpen(false)}
              >
                saved Meals
              </Link>
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="relative" ref={authMenuRef}>
        <button
          onClick={() => setIsAuthMenuOpen(!isAuthMenuOpen)}
          className="hidden md:flex items-center space-x-2 bg-white text-green-800 px-4 py-2 rounded-full hover:bg-green-100 transition-all duration-300"
        >
          <span>Login</span>
        </button>

        {isAuthMenuOpen && providers && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50">
            {Object.values(providers).map((provider) => {
              const Icon = providerIcons[provider.id.toLowerCase()];
              return (
                <button
                  key={provider.id}
                  onClick={() => {
                    signIn(provider.id, {
                      callbackUrl: pathname,
                    });
                    setIsAuthMenuOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                >
                  {Icon && <Icon className="w-5 h-5 mr-2" />}
                  Sign in with {provider.name}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-green-800 shadow-lg' : 'bg-green-700'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link
              className="flex items-center space-x-2 transition-transform hover:scale-105"
              href="/"
            >
              <Image
                className="h-12 w-auto"
                src={logo}
                alt="GoMealSaver"
                priority
              />
              <span className="hidden md:block text-white text-xl font-bold">
                GOMealSaver
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative">
              <input
                type="search"
                placeholder="Search meals..."
                className="w-64 px-4 py-2 rounded-full bg-green-600 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            <Link
              href="/"
              className="text-white hover:text-green-200 px-3 py-2 text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/meals"
              className="text-white hover:text-green-200 px-3 py-2 text-sm font-medium transition-colors"
            >
              Meals
            </Link>
            {session && (
              <Link
                href="/meals/add"
                className="text-white hover:text-green-200 px-3 py-2 text-sm font-medium transition-colors"
              >
                Add Meal
              </Link>
            )}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {renderAuthButton()}

            {/* Notifications - Only show if logged in */}
            {session && (
              <button className="relative p-2 text-white hover:text-green-200 transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="absolute top-0 right-0 h-5 w-5 text-xs flex items-center justify-center bg-red-500 text-white rounded-full">
                  2
                </span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-green-200 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMobileMenuOpen
                      ? 'M6 18L18 6M6 6l12 12'
                      : 'M4 6h16M4 12h16M4 18h16'
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'
        }`}
      >
        <div className="px-4 py-2 space-y-3 bg-green-800">
          <div className="relative mb-4">
            <input
              type="search"
              placeholder="Search meals..."
              className="w-full px-4 py-2 rounded-full bg-green-700 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          <Link
            href="/"
            className="block text-white hover:bg-green-700 px-3 py-2 rounded-md transition-colors"
          >
            Home
          </Link>
          <Link
            href="/meals"
            className="block text-white hover:bg-green-700 px-3 py-2 rounded-md transition-colors"
          >
            Meals
          </Link>
          {session && (
            <Link
              href="/meals/add"
              className="block text-white hover:bg-green-700 px-3 py-2 rounded-md transition-colors"
            >
              Add Meal
            </Link>
          )}
          {!session && providers && (
            <div className="space-y-2">
              {Object.values(providers).map((provider) => {
                const Icon = providerIcons[provider.id.toLowerCase()];
                return (
                  <button
                    key={provider.id}
                    onClick={() => {
                      signIn(provider.id, {
                        callbackUrl: pathname,
                      });
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center w-full justify-center bg-white text-green-800 px-4 py-2 rounded-full hover:bg-green-100 transition-all duration-300"
                  >
                    {Icon && <Icon className="w-5 h-5 mr-2" />}
                    Sign in with {provider.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
>>>>>>> Stashed changes
