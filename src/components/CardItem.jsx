import React from 'react';
import { IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import StarIcon from '@mui/icons-material/Star';
const CardItem = ({
  id,
  type,
  name,
  description,
  avgRating,
  ratings,
  image,
  onFavoriteClick,
  onLoginRequired
}) => {
  const { isAuthenticated, isFavorite, toggleFavorite } = useAuth();
  const isFav = isFavorite(id, type);

  const getRating = () => {
    if (ratings && ratings.length > 0) {
      const total = ratings.reduce((acc, curr) => acc + curr.rate, 0);
      return total / ratings.length;
    }
    return 0;
  };

  const handleFavoriteClick = async () => {
    if (!isAuthenticated) {
      onLoginRequired();
      return;
    }
    
    try {
      await toggleFavorite(id, type);
      if (onFavoriteClick) {
        onFavoriteClick(id, !isFav);
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
      // Có thể hiển thị thông báo lỗi cho user
    }
  };

  return (
    <div className="rounded-md hover:cursor-pointer transition-all duration-300 md:w-64 w-40">
      {/* Image */}
      <div className="relative md:h-48 md:w-64 h-36 w-40 overflow-hidden rounded-lg">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover "
        />
        <div className="absolute top-2 right-2 z-20">
          <IconButton
              onClick={handleFavoriteClick}
              size="small"
              className="bg-black/20 hover:bg-black/30 shadow-md"
              sx={{
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.3)' },
              }}
            >
              {isFav ? (
                <Favorite className="text-red-500 drop-shadow-md" sx={{ fontSize: 20 }} />
              ) : (
                <FavoriteBorder className="text-white drop-shadow-md" sx={{ fontSize: 20 }} />
              )}
          </IconButton>
        </div>
      
        <div className=" absolute top-2 left-2 z-10 flex items-center md:gap-1 mb-1 bg-white rounded-full py-1 md:py-2 px-2 md:px-3 shadow-sm shadow-gray-300">
          {/* <Rating
            value={rating}
            precision={0.1}
            readOnly
            size="small"
            sx={{
              fontSize: '12px',
              '& .MuiRating-icon': {
                marginRight: '-2px'
              }
            }}
          /> */}
          <StarIcon className="text-yellow-500" sx={{ fontSize: 16 }} />
          <span className="text-xs font-bold text-gray-700 ml-1">
          { avgRating?.toFixed(1) ?? getRating().toFixed(1) }
          </span>
        </div>

        <div className="absolute bottom-2 left-2 z-10">  
          <span className="inline-block bg-teal-100 text-teal-800 font-bold text-xs px-3 py-2 rounded-full shadow-md ">
            Recommended
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="md:p-3 p-2 md:w-64 w-40 ">
        <div className="flex items-start mb-1">
          <h3 className="text-base font-medium text-gray-900">{name}</h3>
        </div>
        
        <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
      </div>
    </div>
  );
};

export default CardItem; 