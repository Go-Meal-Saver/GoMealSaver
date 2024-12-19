/* eslint-disable react/no-unescaped-entities */
'use client';
import { useState } from 'react';
import AbiImg from '@/assets/profile/abi.png';
import AkbarImg from '@/assets/profile/akbar.jpg';
import DodyImg from '@/assets/profile/dody.jpg';
import SenaImg from '@/assets/profile/sena.jpg';
import Image from 'next/image';

const TestimonialSection = () => {
  const reviews = [
    {
      id: 1,
      name: 'Harsena Argretya',
      review:
        '"GoMealSaver really helps me save money and reduce food wastage. The food is also high quality and fresh!"',
      location: 'Yogyakarta, Indonesia',
      image: SenaImg,
    },
    {
      id: 2,
      name: 'Muhamad Akbar Algifahri',
      review:
        '"This app is really a solution to avoid food waste. The discounts are great, and I am satisfied with the service provided."',
      location: 'Jakarta, Indonesia',
      image: AkbarImg,
    },
    {
      id: 3,
      name: 'Dody Pramansyah Sianipar',
      review:
        '"I love the eco-friendly concept of GoMealSaver. By bringing my own containers, I can earn cashback and feel like Im contributing to the environment."',
      location: 'Medan, Indonesia',
      image: DodyImg,
    },
    {
      id: 4,
      name: 'Abigael Haidar Cyayyidina Avianto',
      review:
        '"Easy, practical and economical! GoMealSaver allows me to get delicious food at a lower price."',
      location: 'Yogyakarta, Indonesia',
      image: AbiImg,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSlideChange = (direction) => {
    if (isAnimating) return;

    setIsAnimating(true);
    if (direction === 'next') {
      setCurrentSlide((prev) => (prev + 1) % reviews.length);
    } else {
      setCurrentSlide((prev) => (prev - 1 + reviews.length) % reviews.length);
    }

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-fern-green-700 text-lg font-medium mb-2">
            TESTIMONI
          </h2>
          <h3 className="text-4xl font-bold text-gray-900">Customer Reviews</h3>
        </div>

        {/* Review Carousel */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Quote Section */}
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div
                  className="text-6xl text-gray-200 mb-4 transition-opacity duration-500 ease-in-out"
                  key={currentSlide}
                >
                  "
                </div>
                <div
                  className="transition-all duration-500 ease-in-out"
                  key={`quote-${currentSlide}`}
                >
                  <p className="text-xl text-gray-800 mb-8">
                    {reviews[currentSlide].review}
                  </p>
                  <div className="mb-8">
                    <h4 className="font-bold text-gray-900">
                      {reviews[currentSlide].name}
                    </h4>
                    <p className="text-gray-600">
                      {reviews[currentSlide].location}
                    </p>
                  </div>
                </div>
                {/* Navigation Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={() => handleSlideChange('prev')}
                    disabled={isAnimating}
                    className="w-12 h-12 rounded-full bg-teal-400 text-white flex items-center justify-center hover:bg-teal-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => handleSlideChange('next')}
                    disabled={isAnimating}
                    className="w-12 h-12 rounded-full bg-teal-400 text-white flex items-center justify-center hover:bg-teal-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    →
                  </button>
                </div>
              </div>

              {/* Image Section */}
              <div className="relative h-96 md:h-auto overflow-hidden rounded-2xl bg-gray-100">
                {reviews.map((review, index) => (
                  <div
                    key={review.id}
                    className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                      index === currentSlide
                        ? 'translate-x-0 opacity-100'
                        : index < currentSlide
                        ? '-translate-x-full opacity-0'
                        : 'translate-x-full opacity-0'
                    }`}
                  >
                    <Image
                      src={review.image}
                      alt={review.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
