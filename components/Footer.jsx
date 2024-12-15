import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/images/logo-remove.png';

export default function Footer() {
  const current = new Date().getFullYear();

  return (
    <footer className="bg-green-800 py-8  border-t border-green-100">
      <div className="container-xl lg:container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/">
              <Image
                src={logo}
                alt="GoMealSaver"
                className="h-10 w-auto"
                priority
              />
            </Link>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start mb-6 md:mb-0">
            <ul className="flex flex-wrap space-x-6">
              <li>
                <Link href="/Home" className="text-white hover:text-green-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/meals" className="text-white hover:text-green-600">
                  Meals
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white hover:text-green-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white hover:text-green-600"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm text-white text-center md:text-right">
              &copy; {current} GoMealSaver. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
