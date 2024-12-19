import React from 'react';
import {
  FaMoneyBillAlt,
  FaMapMarkedAlt,
  FaHandHoldingHeart,
  FaLeaf,
} from 'react-icons/fa';
import Logo from '@/assets/images/logo.jpg';
import Image from 'next/image';

const GoMealSaver = () => {
  return (
    <div className="container-xl px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 items-center gap-8 lg:gap-12">
        {/* Left Text Section */}
        <div className="space-y-6">
          <h2 className="text-3xl font-extrabold mb-6 text-gray-800">
            Go Meal Saver: Comes as a Solution!
          </h2>
          <div className="space-y-6">
            {/* Feature 1 */}
            <div className="flex items-start gap-4">
              <div className="bg-fern-green-600 text-white p-3 rounded-full flex-shrink-0">
                <FaMoneyBillAlt className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-700">
                  Pay Less, Taste Better
                </h3>
                <p className="text-gray-600">
                  All food on sale is always discounted by up to 50%! Stay
                  fresh, delicious, and support food waste reduction.
                </p>
              </div>
            </div>
            {/* Feature 2 */}
            <div className="flex items-start gap-4">
              <div className="bg-fern-green-600 text-white p-3 rounded-full flex-shrink-0">
                <FaMapMarkedAlt className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-700">
                  Ease of Food Saving
                </h3>
                <p className="text-gray-600">
                  Check through the app or pick up at the nearest location.
                  Practical and fast!
                </p>
              </div>
            </div>
            {/* Feature 3 */}
            <div className="flex items-start gap-4">
              <div className="bg-fern-green-600 text-white p-3 rounded-full flex-shrink-0">
                <FaHandHoldingHeart className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-700">
                  Contributing to Social Movements
                </h3>
                <p className="text-gray-600">
                  Every purchase helps support the movement against food waste
                  and provides food for the needy.
                </p>
              </div>
            </div>
            {/* Feature 4 */}
            <div className="flex items-start gap-4">
              <div className="bg-fern-green-600 text-white p-3 rounded-full flex-shrink-0">
                <FaLeaf className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-700">
                  Supporting an Environmentally Friendly Lifestyle
                </h3>
                <p className="text-gray-600">
                  Bring your own containers for food pickup and get up to 25%
                  cashback. Go Meal Saver makes your small actions have a big
                  impact!
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Right Image Section */}
        <div className="flex justify-center items-center">
          <Image
            src={Logo}
            alt="Food Saving"
            className="rounded-xl shadow-lg max-w-full h-auto"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
    </div>
  );
};

export default GoMealSaver;
