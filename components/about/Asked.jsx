/* eslint-disable react/no-unescaped-entities */
'use client';
import { useState, useEffect } from 'react';

export default function Asked() {
  const [openTab, setOpenTab] = useState(null);

  const handleTabClick = (tabIndex) => {
    setOpenTab(openTab === tabIndex ? null : tabIndex);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest('.tab-container')) {
      setOpenTab(null);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <section id="faq-accordion">
      {/* Added Title Section */}
      <div className="text-center mb-8 pt-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">FAQ</h2>
        <p className="text-gray-600 max-w-2xl mx-auto px-6">
          Frequently Asked Questions About GomealSaver
        </p>
      </div>

      <div className="container mx-auto px-6 mb-32">
        <div className="max-w-2xl m-8 mx-auto overflow-hidden tab-container">
          {/* Tab 1 */}
          <div className="py-1 border-b outline-none group" tabIndex="1">
            <div
              className="flex items-center justify-between py-3 text-gray-500 transition duration-500 cursor-pointer group ease"
              onClick={() => handleTabClick(1)}
            >
              <div className="transition duration-500 ease group-hover:text-fern-green-500">
                What's GoMealSaver?
              </div>
              <div
                className={`transition duration-500 ease ${
                  openTab === 1 ? 'rotate-180 text-fern-green-500' : ''
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    d="M1 1l8 8 8-8"
                  />
                </svg>
              </div>
            </div>

            <div
              className={`overflow-hidden transition duration-500 ease ${
                openTab === 1 ? 'max-h-screen' : 'max-h-0'
              }`}
            >
              <p className="py-2 text-justify text-gray-400">
                GoMealSaver waste while saving money. Our app connects you with
                nearby restaurants and food stores that offer quality food at
                discounted prices before it goes to waste. With smart search
                features, real-time chat system, easy ordering, and secure
                transactions, GoMealSaver makes food rescue easier and more
                enjoyable.
              </p>
            </div>
          </div>

          {/* Tab 2 */}
          <div className="py-1 border-b outline-none group" tabIndex="2">
            <div
              className="flex items-center justify-between py-3 text-gray-500 transition duration-500 cursor-pointer group ease"
              onClick={() => handleTabClick(2)}
            >
              <div className="transition duration-500 ease group-hover:text-fern-green-500">
                How to find food in GoMealSaver?
              </div>
              <div
                className={`transition duration-500 ease ${
                  openTab === 2 ? 'rotate-180 text-fern-green-500' : ''
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    d="M1 1l8 8 8-8"
                  />
                </svg>
              </div>
            </div>

            <div
              className={`overflow-hidden transition duration-500 ease ${
                openTab === 2 ? 'max-h-screen' : 'max-h-0'
              }`}
            >
              <p className="py-2 text-justify text-gray-400">
                Our search feature is super easy to use! Simply enter your
                location, and you'll see a list of food available nearby. in the
                vicinity. You can filter by food type, food type, region. food,
                region.
              </p>
            </div>
          </div>

          {/* Tab 3 */}
          <div className="py-1 border-b outline-none group" tabIndex="3">
            <div
              className="flex items-center justify-between py-3 text-gray-500 transition duration-500 cursor-pointer group ease"
              onClick={() => handleTabClick(3)}
            >
              <div className="transition duration-500 ease group-hover:text-fern-green-500">
                How does the GomealSaver chat system work?
              </div>
              <div
                className={`transition duration-500 ease ${
                  openTab === 3 ? 'rotate-180 text-fern-green-500' : ''
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    d="M1 1l8 8 8-8"
                  />
                </svg>
              </div>
            </div>

            <div
              className={`overflow-hidden transition duration-500 ease ${
                openTab === 3 ? 'max-h-screen' : 'max-h-0'
              }`}
            >
              <p className="py-2 text-justify text-gray-400">
                Our chat feature lets you communicate directly with seller to
                inquire about food details, pick-up times, or other customized
                information. Chat is available before and after order to ensure
                a smooth shopping experience.
              </p>
            </div>
          </div>

          {/* Tab 4 */}
          <div className="py-1 border-b outline-none group" tabIndex="4">
            <div
              className="flex items-center justify-between py-3 text-gray-500 transition duration-500 cursor-pointer group ease"
              onClick={() => handleTabClick(4)}
            >
              <div className="transition duration-500 ease group-hover:text-fern-green-500">
                How do I place an order and make payment?
              </div>
              <div
                className={`transition duration-500 ease ${
                  openTab === 4 ? 'rotate-180 text-fern-green-500' : ''
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    d="M1 1l8 8 8-8"
                  />
                </svg>
              </div>
            </div>

            <div
              className={`overflow-hidden transition duration-500 ease ${
                openTab === 4 ? 'max-h-screen' : 'max-h-0'
              }`}
            >
              <p className="py-2 text-justify text-gray-400">
                Ordering on GomealSaver is super easy! Select the food you want
                want, click the order button. Payment is made directly at store
                when picking up the order. Once the order is confirmed, you will
                receive a digital proof of order and pickup. All transactions
                are recorded in our system, and You can view your full order
                history on your profile.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
