import ReactStars from "react-stars";

interface StarRating {
  rating: number;
}

interface Rating {
  setRating: React.Dispatch<React.SetStateAction<number>>;
  size: number;
}

export const Star: React.FC<StarRating> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center">
      {Array.from({ length: fullStars }, (_, index) => (
        <span
          key={index}
          onClick={() => {
            console.log(index);
          }}
          className="text-yellow-500 text-2xl"
        >
          &#9733;
        </span>
      ))}

      {hasHalfStar && <span className="text-yellow-500 text-2xl">&#9733;</span>}

      {Array.from({ length: 5 - Math.ceil(rating) }, (_, index) => (
        <span key={`empty-${index}`} className="text-gray-300 text-2xl">
          &#9734;
        </span>
      ))}
    </div>
  );
};

export const RatingStar: React.FC<Rating> = ({ setRating, size }) => {
  const ratingChanged = (newRating: number) => {
    setRating(newRating);
  };

  return (
    <div>
      <ReactStars
        count={5}
        onChange={ratingChanged}
        size={size}
        color2={"#ffd700"}
        className="static-react-stars" // Use the static class name defined in custom CSS
      />
    </div>
  );
};