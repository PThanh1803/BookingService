import React from 'react';

const ServiceCardSkeleton = () => {
  return (
    <div className="relative group cursor-pointer animate-pulse">
      {/* Background skeleton */}
      <div className="relative md:h-72 md:w-52 h-56 w-40 rounded-2xl overflow-hidden bg-gray-200">
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
      </div>

      {/* Service Name skeleton */}
      <div className="absolute top-0 left-2 right-0 p-4 z-20">
        <div className="max-w-[100px]">
          <div className="h-6 bg-gray-300 rounded w-20"></div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCardSkeleton; 