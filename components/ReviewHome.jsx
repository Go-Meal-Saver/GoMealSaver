'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import SenaImg from '@/assets/profile/sena.jpg';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CustomerReviews = () => {
  const reviews = [
    {
      id: 1,
      name: 'Rina Kartika',
      review:
        '"GoMealSaver sangat membantu saya dalam menghemat uang dan mengurangi pemborosan makanan. Makanan yang didapat juga berkualitas dan segar!"',
      location: 'Yogyakarta, Indonesia',
      image: SenaImg,
    },
    {
      id: 2,
      name: 'Bambang Sutrisno',
      review:
        '"Aplikasi ini benar-benar solusi untuk menghindari limbah makanan. Diskonnya besar, dan saya puas dengan layanan yang diberikan."',
      location: 'Medan, Indonesia',
      image: SenaImg,
    },
    {
      id: 3,
      name: 'Nur Aisyah',
      review:
        '"Saya suka konsep ramah lingkungan dari GoMealSaver. Dengan membawa wadah sendiri, saya bisa dapat cashback dan merasa ikut berkontribusi untuk lingkungan."',
      location: 'Malang, Indonesia',
      image: SenaImg,
    },
    {
      id: 4,
      name: 'Eko Prasetyo',
      review:
        '"Mudah, praktis, dan ekonomis! GoMealSaver membuat saya bisa mendapatkan makanan lezat dengan harga lebih murah.',
      location: 'Semarang, Indonesia"',
      image: SenaImg,
    },
    {
      id: 5,
      name: 'Siti Rohmah',
      review:
        '"Banyak pilihan lokasi untuk pengambilan makanan, jadi sangat praktis. Saya sangat merekomendasikan GoMealSaver untuk semua orang!"',
      location: 'Makassar, Indonesia',
      image: SenaImg,
    },
  ];

  return (
    <div className="py-40">
      <div className="max-w-6xl mx-auto px-6">
        {/* Judul */}
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Apa Kata Mereka?
        </h2>

        {/* Swiper Slider */}
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
