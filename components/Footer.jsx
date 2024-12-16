import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/images/logo-remove.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { href: '/', label: 'Home' },
    { href: '/meals', label: 'Meals' },
    { href: '/about', label: 'About Us' },
  ];

  return (
    <footer className="bg-green-800 py-8 border-t border-green-100">
      <div className="container-xl lg:container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Logo Section */}
          <div>
            <Link href="/" aria-label="GoMealSaver Home">
              <Image
                src={logo}
                alt="GoMealSaver Logo"
                width={120}
                height={40}
                priority
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav>
            <ul className="flex flex-wrap justify-center md:justify-start space-x-4 md:space-x-6">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white hover:text-green-600 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Copyright Section */}
          <div>
            <p className="text-sm text-white text-center md:text-right">
              &copy; {currentYear} GoMealSaver. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
