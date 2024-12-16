'use client';
import { useState } from 'react';
import Image from 'next/image';
import Hargaimg from '@/assets/images/harga.png';
import Kualitasimg from '@/assets/images/kualitas.png';
import Mudahimg from '@/assets/images/pesan.png';
import Link from 'next/link';

export default function Features() {
  const [activeTab, setActiveTab] = useState('simple');

  const tabs = [
    { id: 'simple', label: 'Cheapest Price' },
    { id: 'speedy', label: 'Quality Guaranteed' },
    { id: 'easy', label: 'Easy to Order' },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <>
      {/* Features heading */}
      <section id="features">
        <div className="container mx-auto mt-8 px-6 pt-20">
          <h2 className="mb-4 text-4xl font-semibold text-center">
            Delicious Leftovers at a Great Price
          </h2>
          <p className="max-w-md mx-auto text-center text-gray-400">
            Enjoy delicious quality food at a very affordable price. Save up to
            70% off the original price without compromising on enjoyment.
            Delicious Leftovers at a Great Price
          </p>
        </div>
      </section>

      {/* Features Tabs */}
      <section id="tabs">
        {/* Table/Panels Container */}
        <div className="container relative mx-auto my-6 mb-32 mt-8 px-6">
          <div className="bg-tabs"></div>
          {/* Tabs Flex Container */}
          <div className="flex flex-col justify-center max-w-xl mx-auto mb-6 border-b md:flex-row">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`flex-1 text-center cursor-pointer border-b-4 transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'border-fern-green-500 text-fern-green-500'
                    : 'border-transparent text-gray-600 hover:text-fern-green-500'
                }`}
                onClick={() => handleTabClick(tab.id)}
              >
                <div className="py-5">{tab.label}</div>
              </div>
            ))}
          </div>

          {/* Tab Panels */}
          <div id="panels" className="container mx-auto">
            {/* Panel 1 */}
            <div className={`panel ${activeTab === 'simple' ? '' : 'hidden'}`}>
              <div className="flex flex-col py-5 md:flex-row md:space-x-7">
                {/* Panel Image */}
                <div className="flex justify-center md:w-1/2">
                  <Image
                    width={600}
                    height={200}
                    src={Hargaimg}
                    alt=""
                    className="relative z-10"
                  />
                </div>
                {/* Panel Content */}
                <div className="flex flex-col space-y-8 md:w-1/2">
                  <h3 className="mt-32 text-3xl font-semibold text-center md:mt-0 md:text-left">
                    Cheapest Price
                  </h3>
                  <p className="max-w-md text-center text-grayishBlue md:text-left">
                    Get quality food at up to 70%. We offer smart solutions to
                    reduce food wastage while providing very affordable. Despite
                    being leftovers, we guarantee quality and freshness. Each
                    dish goes through a rigorous checking process to ensure
                    palatability and deliciousness. Cheapest Price
                  </p>
                  <div className="mx-auto md:mx-0">
                    <Link
                      href="/"
                      className="px-6 py-3 mt-4 font-semibold text-white border-2 border-fern-green-400 rounded-lg md:inline-flex bg-fern-green-500 hover:bg-white hover:text-fern-green-500 hover:border-fern-green-500 hover:border-2"
                    >
                      See Promo
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel 2 */}
            <div className={`panel ${activeTab === 'speedy' ? '' : 'hidden'}`}>
              <div className="flex flex-col py-5 md:flex-row md:space-x-7">
                {/* Panel Image */}
                <div className="flex justify-center md:w-1/2">
                  <Image
                    width={600}
                    height={500}
                    src={Kualitasimg}
                    alt=""
                    className="relative z-10"
                  />
                </div>
                {/* Panel Content */}
                <div className="flex flex-col space-y-8 md:w-1/2">
                  <h3 className="mt-14 text-3xl font-semibold text-center md:mt-0 md:text-left">
                    Quality Guaranteed
                  </h3>
                  <p className="max-w-md text-center text-grayishBlue md:text-left">
                    Although it is leftover food, we guarantee its quality and
                    freshness. Each dish goes through a rigorous inspection
                    process to ensure its deliciousness and palatability.
                    Cheapest Price Quality Guaranteed
                  </p>
                  <div className="mx-auto md:mx-0">
                    <Link
                      href="/"
                      className="px-6 py-3 mt-4 font-semibold text-white border-2 border-fern-green-400 rounded-lg md:inline-flex bg-fern-green-500 hover:bg-white hover:text-fern-green-500 hover:border-fern-green-500 hover:border-2"
                    >
                      Quality Assurance
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel 3 */}
            <div className={`panel ${activeTab === 'easy' ? '' : 'hidden'}`}>
              <div className="flex flex-col py-5 md:flex-row md:space-x-7">
                {/* Panel Image */}
                <div className="flex justify-center md:w-1/2">
                  <Image
                    width={400}
                    height={200}
                    src={Mudahimg}
                    alt=""
                    className="relative z-10"
                  />
                </div>
                {/* Panel Content */}
                <div className="flex flex-col space-y-8 md:w-1/2">
                  <h3 className="mt-14 text-3xl font-semibold text-center md:mt-0 md:text-left">
                    Order with Ease
                  </h3>
                  <p className="max-w-md text-center text-grayishBlue md:text-left">
                    The ordering process is quick and simple. Choose, order and
                    enjoy quality leftovers in minutes through our app or
                    website.
                  </p>
                  <div className="mx-auto md:mx-0">
                    <Link
                      href="/"
                      className="px-6 py-3 mt-4 font-semibold text-white border-2 border-fern-green-400 rounded-lg md:inline-flex bg-fern-green-500 hover:bg-white hover:text-fern-green-500 hover:border-fern-green-500 hover:border-2"
                    >
                      Start Order
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
