import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl md:text-2xl font-medium text-gray-600 mb-8">
        Trang bạn tìm kiếm không tồn tại
      </p>
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded transition-colors duration-300"
      >
        Trở về trang chủ
      </Link>
    </div>
  );
};

export default NotFound; 