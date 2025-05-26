import React from 'react';

const CategoryCardSkeleton = () => {
  return (
    <div className="relative group cursor-pointer animate-pulse">
      {/* Background skeleton */}
      <div className="relative md:h-36 md:w-52 h-28 w-40 rounded-xl overflow-hidden bg-gray-200">
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
      </div>

      {/* Category Name skeleton */}
      <div className="absolute top-0 left-2 right-0 p-4 z-20 max-w-[100px]">
        <div className="h-4 bg-gray-300 rounded w-16"></div>
      </div>
    </div>
  );
};

export default CategoryCardSkeleton; 