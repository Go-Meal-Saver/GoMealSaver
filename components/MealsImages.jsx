'use client';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function MealsImages({ images }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 640, // Mobile breakpoint
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // Desktop breakpoint
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="p-4">
      <div className="container mx-auto">
        {images.length === 1 ? (
          <Image
            src={images[0]}
            alt=""
            className="object-cover h-[200px] sm:h-[400px] mx-auto rounded-xl"
            width={1800}
            height={400}
            priority={true}
          />
        ) : (
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index}>
                <Image
                  src={image}
                  alt=""
                  className="object-cover h-[200px] sm:h-[400px] w-full rounded-xl"
                  width={1800}
                  height={400}
                  priority={true}
                />
              </div>
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
}
