import { Rating } from '@mui/material';

const ReviewCard = ({ review, author, date, rating, avatar }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      {/* Rating */}
      <div className="mb-4">
        <Rating value={rating} readOnly precision={0.5} />
      </div>

      {/* Review Text */}
      <p className="text-gray-700 mb-6">
        {review}
      </p>

      {/* Author Info */}
      <div className="flex items-center gap-3">
        <img
          src={avatar}
          alt={author}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h4 className="font-medium text-gray-900">{author}</h4>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard; 