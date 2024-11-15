import Image from 'next/image';

export default function HomeMealsPage() {
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">
          Recent Meals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Meal 1 */}
          <div className="bg-white rounded-xl shadow-md relative">
            <Image
              src="/1.png"
              alt="Chicken Rice Bowl"
              width={500}
              height={300}
              className="w-full h-[200px] object-cover rounded-t-xl"
            />
            <div className="p-4">
              <div className="text-left md:text-center lg:text-left mb-6">
                <div className="text-gray-600">Asian Cuisine</div>
                <h3 className="text-xl font-bold">Chicken Rice Bowl</h3>
              </div>
              <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-green-600 font-bold text-right md:text-center lg:text-right">
                $8.50
              </h3>

              <div className="flex justify-center gap-4 text-gray-500 mb-4">
                <p>
                  <i className="fa-solid fa-clock"></i> 30 mins left
                </p>
                <p>
                  <i className="fa-solid fa-utensils"></i> 2 portions
                </p>
              </div>

              <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
                <p>
                  <i className="fa-solid fa-tag"></i> 50% OFF
                </p>
              </div>

              <div className="border border-gray-100 mb-5"></div>

              <div className="flex flex-col lg:flex-row justify-between mb-4">
                <div className="flex flex-col gap-1">
                  <div className="flex align-middle gap-2">
                    <i className="fa-solid fa-location-dot text-lg text-green-700"></i>
                    <span className="text-green-700">
                      Asian Kitchen Restaurant
                    </span>
                  </div>
                  <div className="flex align-middle gap-2 text-gray-500 text-sm">
                    <i className="fa-solid fa-map-marker-alt"></i>
                    <span>123 Asian Street, Downtown</span>
                  </div>
                </div>
                <a
                  href="/meals/1"
                  className="h-[36px] bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-center text-sm"
                >
                  View Details
                </a>
              </div>
            </div>
          </div>

          {/* Meal 2 */}
          <div className="bg-white rounded-xl shadow-md relative">
            <Image
              src="/2.webp"
              alt="Pizza Margherita"
              width={500}
              height={300}
              className="w-full h-[200px] object-cover rounded-t-xl"
            />
            <div className="p-4">
              <div className="text-left md:text-center lg:text-left mb-6">
                <div className="text-gray-600">Italian Cuisine</div>
                <h3 className="text-xl font-bold">Pizza Margherita</h3>
              </div>
              <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-green-600 font-bold text-right md:text-center lg:text-right">
                $12.00
              </h3>

              <div className="flex justify-center gap-4 text-gray-500 mb-4">
                <p>
                  <i className="fa-solid fa-clock"></i> 45 mins left
                </p>
                <p>
                  <i className="fa-solid fa-utensils"></i> 1 whole pizza
                </p>
              </div>

              <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
                <p>
                  <i className="fa-solid fa-tag"></i> 40% OFF
                </p>
              </div>

              <div className="border border-gray-100 mb-5"></div>

              <div className="flex flex-col lg:flex-row justify-between mb-4">
                <div className="flex flex-col gap-1">
                  <div className="flex align-middle gap-2">
                    <i className="fa-solid fa-location-dot text-lg text-green-700"></i>
                    <span className="text-green-700">Luigi's Pizzeria</span>
                  </div>
                  <div className="flex align-middle gap-2 text-gray-500 text-sm">
                    <i className="fa-solid fa-map-marker-alt"></i>
                    <span>456 Italian Avenue, West Side</span>
                  </div>
                </div>
                <a
                  href="/meals/2"
                  className="h-[36px] bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-center text-sm"
                >
                  View Details
                </a>
              </div>
            </div>
          </div>

          {/* Meal 3 */}
          <div className="bg-white rounded-xl shadow-md relative">
            <Image
              src="/3.jpeg"
              alt="Sushi Platter"
              width={500}
              height={300}
              className="w-full h-[200px] object-cover rounded-t-xl"
            />
            <div className="p-4">
              <div className="text-left md:text-center lg:text-left mb-6">
                <div className="text-gray-600">Japanese Cuisine</div>
                <h3 className="text-xl font-bold">Sushi Platter</h3>
              </div>
              <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-green-600 font-bold text-right md:text-center lg:text-right">
                $15.00
              </h3>

              <div className="flex justify-center gap-4 text-gray-500 mb-4">
                <p>
                  <i className="fa-solid fa-clock"></i> 20 mins left
                </p>
                <p>
                  <i className="fa-solid fa-utensils"></i> 12 pieces
                </p>
              </div>

              <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
                <p>
                  <i className="fa-solid fa-tag"></i> 45% OFF
                </p>
              </div>

              <div className="border border-gray-100 mb-5"></div>

              <div className="flex flex-col lg:flex-row justify-between mb-4">
                <div className="flex flex-col gap-1">
                  <div className="flex align-middle gap-2">
                    <i className="fa-solid fa-location-dot text-lg text-green-700"></i>
                    <span className="text-green-700">Sakura Sushi</span>
                  </div>
                  <div className="flex align-middle gap-2 text-gray-500 text-sm">
                    <i className="fa-solid fa-map-marker-alt"></i>
                    <span>789 Japan Street, East District</span>
                  </div>
                </div>
                <a
                  href="/meals/3"
                  className="h-[36px] bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-center text-sm"
                >
                  View Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
