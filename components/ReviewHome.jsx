'use client';
import Image from 'next/image';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import AbiImg from '@/assets/profile/abi.png';
import AkbarImg from '@/assets/profile/akbar.jpg';
import DodyImg from '@/assets/profile/dody.jpg';
import SenaImg from '@/assets/profile/sena.jpg';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CustomerReviews = () => {
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
        '"Easy, practical and economical! GoMealSaver allows me to get delicious food at a lower price.',
      location: 'Yogyakarta, Indonesia"',
      image: AbiImg,
    },
  ];

  return (
    <div className="py-40">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          What do they say?
        </h2>
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          className="customer-review-swiper"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="bg-white rounded-lg p-8  text-center">
                <Image
                  src={review.image}
                  alt={review.name}
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                />
                <p className="text-gray-600 italic mb-6">{review.review}</p>
                <h3 className="text-xl font-semibold text-gray-800">
                  {review.name}
                </h3>
                <p className="text-md text-gray-500">{review.location}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CustomerReviews;
