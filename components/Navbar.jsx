'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../assets/images/logo-remove.png';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
              <span className="hidden md:block text-white text-2xl font-bold">
                GO Meal Saver
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Search Bar */}
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
            <Link
              href="/add-meal"
              className="text-white hover:text-green-200 px-3 py-2 text-sm font-medium transition-colors"
            >
              Add Meal
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:flex items-center space-x-2 bg-white text-green-800 px-4 py-2 rounded-full hover:bg-green-100 transition-all duration-300">
              <span>Login</span>
            </button>

            {/* Notifications */}
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
          <Link
            href="/add-meal"
            className="block text-white hover:bg-green-700 px-3 py-2 rounded-md transition-colors"
          >
            Add Meal
          </Link>
          <button className="w-full text-center bg-white text-green-800 px-4 py-2 rounded-full hover:bg-green-100 transition-all duration-300">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}
