import React from 'react';

const CardItemSkeleton = () => {
  return (
    <div className="rounded-md transition-all duration-300 w-64 animate-pulse">
      {/* Image Skeleton */}
      <div className="relative md:h-48 md:w-64 h-36 w-40 overflow-hidden rounded-lg bg-gray-200">
        {/* Favorite button skeleton */}
        <div className="absolute top-2 right-2 z-20">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
        
        {/* Rating skeleton */}
        <div className="absolute top-2 left-2 z-10 flex items-center gap-1 bg-gray-300 rounded-full py-1 md:py-2 px-2 md:px-3">
          <div className="w-4 h-4 bg-gray-400 rounded"></div>
          <div className="w-6 h-3 bg-gray-400 rounded"></div>
        </div>

        {/* Recommended badge skeleton */}
        <div className="absolute bottom-2 left-2 z-10">  
          <div className="w-20 h-6 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-3">
        {/* Title skeleton */}
        <div className="mb-2">
          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        </div>
        
        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    </div>
  );
};

export default CardItemSkeleton; 