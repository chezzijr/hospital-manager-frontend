import ReactStars from "react-rating-stars-component";
import React from "react";


interface RatingStarProps {
  start: number;
  ratingChanged?: (newStart: number) => void;
}

interface Rating {
  rating: number;
}

const Star: React.FC<Rating> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center">
      {Array.from({ length: fullStars }, (_, index) => (
        <span key={index} className="text-yellow-500 text-2xl">&#9733;</span>
      ))}

      {hasHalfStar && (
        <span className="text-yellow-500 text-2xl">&#9733;</span>
      )}

      {Array.from({ length: 5 - Math.ceil(rating) }, (_, index) => (
        <span key={`empty-${index}`} className="text-gray-300 text-2xl">&#9734;</span>
      ))}
    </div>
  );
};

const RatingStar: React.FC<RatingStarProps> = ({ start, ratingChanged}) => {
  return (
    <ReactStars
      count={start}
      onChange={ratingChanged}
      size={48}
      isHalf={true}
      emptyIcon={<i className="far fa-star"></i>}
      halfIcon={<i className="fa fa-star-half-alt"></i>}
      fullIcon={<i className="fa fa-star"></i>}
      activeColor="#ffd700"
    />
  );
};

export { RatingStar, Star};
