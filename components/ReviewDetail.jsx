import React from 'react';
import { Star } from 'lucide-react';

const ReviewCard = ({ review }) => {
  // Guard clause for when review prop is undefined
  if (!review) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-500">No review data available</p>
        </div>
      </div>
    );
  }

  // Function to format date with error handling
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (error) {
      return 'Date unavailable';
    }
  };

  // Function to render stars
  const renderStars = (rating) => {
    const validRating = Number(rating) || 0;
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          className={`w-5 h-5 ${
            index < validRating
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-300'
          }`}
        />
      ));
  };

  // Safely access review properties with fallbacks
  const name = review.name || 'Anonymous';
  const initials = name.slice(0, 2).toUpperCase();
  const displayName = `${name.slice(0, 8)}${name.length > 8 ? '...' : ''}`;

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {renderStars(review.rating)}
          </div>
          <span className="text-sm text-gray-500">
            {formatDate(review.createdAt)}
          </span>
        </div>

        <div className="mb-4">
          <p className="text-gray-700">
            {review.review || 'No review text provided'}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">
                {initials}
              </span>
            </div>
            <span className="text-sm text-gray-500">User: {displayName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
