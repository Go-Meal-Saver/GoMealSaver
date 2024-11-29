import updateMeal from '@/app/actions/updateMeal';
export default function MealEditPage({ meal }) {
  const updateMealById = updateMeal.bind(null, meal._id);

  return (
    <form action={updateMealById} className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl text-center font-semibold mb-6">Add New Meal</h2>

      {/* Basic Meal Info */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Meal Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="eg. Chicken Rice Bowl"
          defaultValue={meal.name}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="cuisine" className="block text-gray-700 font-bold mb-2">
          Cuisine Type
        </label>
        <select
          id="cuisine"
          name="cuisine"
          className="border rounded w-full py-2 px-3"
          defaultValue={meal.cuisine}
          required
        >
          <option value="">Select Cuisine Type</option>
          <option value="Asian Cuisine">Asian Cuisine</option>
          <option value="Italian Cuisine">Italian Cuisine</option>
          <option value="Western Cuisine">Western Cuisine</option>
          <option value="Local Delights">Local Delights</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="border rounded w-full py-2 px-3"
          rows="3"
          placeholder="Describe your meal"
          defaultValue={meal.description}
          required
        ></textarea>
      </div>

      {/* Pricing and Portion */}
      <div className="mb-4 bg-green-50 p-4 rounded">
        <label className="block text-gray-700 font-bold mb-2">
          Pricing & Portion
        </label>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="originalPrice">Original Price ($)</label>
            <input
              type="number"
              id="originalPrice"
              name="originalPrice"
              step="0.01"
              className="border rounded w-full py-2 px-3"
              defaultValue={meal.originalPrice}
              required
            />
          </div>
          <div>
            <label htmlFor="discountPercentage">Discount (%)</label>
            <input
              type="number"
              id="discountPercentage"
              name="discountPercentage"
              min="0"
              max="100"
              className="border rounded w-full py-2 px-3"
              defaultValue={meal.discountPercentage}
              required
            />
          </div>
          <div>
            <label htmlFor="price">Final Price ($)</label>
            <input
              type="number"
              id="price"
              name="price"
              step="0.01"
              className="border rounded w-full py-2 px-3"
              defaultValue={meal.price}
              required
            />
          </div>
          <div>
            <label htmlFor="portionSize">Portion Size</label>
            <select
              id="portionSize"
              name="portionSize"
              className="border rounded w-full py-2 px-3"
              defaultValue={meal.portionSize}
              required
            >
              <option value="">Select Size</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
              <option value="Family">Family Size</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="timeRemaining">Time Remaining</label>
          <input
            type="text"
            id="timeRemaining"
            name="timeRemaining"
            placeholder="eg. 30 mins"
            className="border rounded w-full py-2 px-3"
            defaultValue={meal.timeRemaining}
            required
          />
        </div>
      </div>

      {/* Features */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Features</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {[
            'Halal Certified',
            'Eco-Friendly Packaging',
            'Contactless Pickup',
            'Fresh Ingredients',
            'Last Minute Deal',
            'Quick Pickup',
            'Best Value',
            'Spice Level Adjustable',
            'Utensils Included',
            'Nutritional Info',
            'Food Waste Prevention',
          ].map((feature) => (
            <div key={feature} className="flex items-center">
              <input
                type="checkbox"
                id={`feature_${feature}`}
                name="features"
                value={feature}
                className="mr-2"
                defaultChecked={meal.features.includes(feature)}
              />
              <label htmlFor={`feature_${feature}`}>{feature}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="mb-4 bg-green-50 p-4 rounded">
        <label className="block text-gray-700 font-bold mb-2">
          Restaurant Information
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            id="restaurant_name"
            name="restaurant.name"
            className="border rounded w-full py-2 px-3"
            placeholder="Restaurant Name"
            defaultValue={meal.restaurant.name}
            required
          />
          <input
            type="text"
            id="restaurant_address"
            name="restaurant.address"
            className="border rounded w-full py-2 px-3"
            placeholder="Address"
            defaultValue={meal.restaurant.address}
            required
          />
          <input
            type="text"
            id="restaurant_city"
            name="restaurant.city"
            className="border rounded w-full py-2 px-3"
            placeholder="City"
            defaultValue={meal.restaurant.city}
            required
          />
          <input
            type="text"
            id="restaurant_state"
            name="restaurant.state"
            className="border rounded w-full py-2 px-3"
            placeholder="State"
            defaultValue={meal.restaurant.state}
            required
          />
          <input
            type="email"
            id="restaurant_email"
            name="restaurant.email"
            className="border rounded w-full py-2 px-3"
            placeholder="Email Address"
            defaultValue={meal.restaurant.email}
            required
          />
          <input
            type="tel"
            id="restaurant_phone"
            name="restaurant.phone"
            className="border rounded w-full py-2 px-3"
            placeholder="Phone Number"
            defaultValue={meal.restaurant.phone}
            required
          />
        </div>
      </div>

      <div>
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Update Meal
        </button>
      </div>
    </form>
  );
}
