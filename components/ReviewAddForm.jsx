'use client';
import { useState } from 'react';
import { Star, Send, Ticket, Utensils } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { addReview } from '@/app/actions/addReview';

const AddReviewForm = ({ order }) => {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const result = await addReview(order.transaction, {
        rating,
        review,
        name: order.name,
        meal: order.meal,
      });

      if (result && result.redirect) {
        router.push(result.redirect);
        return;
      }

      router.push('/orders');

      setRating(0);
      setReview('');
    } catch (error) {
      console.error('Error submitting review:', error);
      setError(error.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-20 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Your Review</h2>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Ticket className="w-6 h-6 text-gray-500" />
          <div>
            <p className="text-sm font-medium text-gray-600">Transaction ID</p>
            <p className="font-semibold text-gray-800">{order.transaction}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Utensils className="w-6 h-6 text-gray-500" />
          <div>
            <p className="text-sm font-medium text-gray-600">Meal ID</p>
            <p className="font-semibold text-gray-800">{order.meal}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            name="name"
            value={order.name}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Rating
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="focus:outline-none"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= (hoveredRating || rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Your Review
          </label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={rating === 0 || !review || isSubmitting}
          className={`flex items-center justify-center w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            rating === 0 || !review || isSubmitting
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <Send className="w-5 h-5 mr-2" />
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default AddReviewForm;
