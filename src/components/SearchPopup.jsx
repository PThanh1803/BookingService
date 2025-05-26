import React, { useRef, useEffect } from "react";
import { Search, Close, LocationOn, Person, Business } from '@mui/icons-material';

const SearchPopup = ({ isOpen, onClose, searchResults, loading, error, searchTerm }) => {
    if (!isOpen) return null;
    const resRef = useRef(null);
    const getResultIcon = (type) => {
        switch (type) {
            case 'business':
                return <Business className="text-blue-500" />;
            case 'individual':
                return <Person className="text-green-500" />;
            case 'service':
                return <Search className="text-purple-500" />;
            default:
                return <Search className="text-gray-500" />;
        }
    };

    const getResultTypeLabel = (type) => {
        switch (type) {
            case 'business':
                return 'Salon';
            case 'individual':
                return 'Individual';
            case 'service':
                return 'Service';
            default:
                return 'Result';
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (resRef.current && !resRef.current.contains(event.target)) {
            onClose(); // đóng khi click bên ngoài
          }
        };
    
        if (isOpen) {
          document.addEventListener("mousedown", handleClickOutside);
        }
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [isOpen, onClose]);
    

    return (
        <div className="absolute md:top-20  top-32 md:w-8/12 w-full -z-10 flex" ref={resRef}>
            {/* Backdrop */}
            {/* <div 
                className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10" 
                onClick={onClose}
            ></div> */}
            
            {/* Popup Content */}
            <div className="relative z-0 w-full max-w-2xl  bg-white rounded-b-2xl shadow-2xl max-h-[70vh] overflow-hidden">
                {/* Header */}
                {/* <div className="flex items-center justify-between p-6 bg-gradient-to-r from-teal-600 to-teal-700 text-white">
                    <div className="flex items-center gap-3">
                        <Search className="text-white" />
                        <div>
                            <h2 className="text-xl font-semibold">Search Results</h2>
                            {searchTerm && (
                                <p className="text-teal-100 text-sm">
                                    Results for "{searchTerm}"
                                </p>
                            )}
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                    >
                        <Close />
                    </button>
                </div> */}

                {/* Content */}
                <div className="p-6 md:pt-12 pt-32">
                    {/* Loading State */}
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mb-4"></div>
                            <p className="text-gray-600">Đang tìm kiếm...</p>
                        </div>
                    )}

                    {/* Error State */}
                    {error && !loading && (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-4">
                                <p className="font-medium">Có lỗi xảy ra</p>
                                <p className="text-sm">{error}</p>
                            </div>
                            <button 
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Đóng
                            </button>
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && !error && searchResults.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-12">
                            <Search className="text-gray-300 mb-4" style={{ fontSize: '4rem' }} />
                            <h3 className="text-lg font-medium text-gray-700 mb-2">
                                Không tìm thấy kết quả
                            </h3>
                            <p className="text-gray-500 text-center mb-6">
                                Thử tìm kiếm với từ khóa khác hoặc kiểm tra lại chính tả
                            </p>
                            <button 
                                onClick={onClose}
                                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                            >
                                Đóng
                            </button>
                        </div>
                    )}

                    {/* Results List */}
                    {!loading && !error && searchResults.length > 0 && (
                        <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-gray-600">
                                    Tìm thấy {searchResults.length} kết quả cho từ khóa "{searchTerm}"
                                </p>
                            </div>
                            
                            {searchResults.map((result, index) => (
                                <div 
                                    key={result.id || index} 
                                    className="group bg-gray-50 hover:bg-gray-100 rounded-xl p-4 transition-all duration-200 cursor-pointer border border-transparent hover:border-teal-200"
                                    onClick={() => {
                                        if (result.link) {
                                            window.open(result.link, '_blank');
                                        }
                                        onClose();
                                    }}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 p-2 bg-white rounded-lg shadow-sm">
                                            {getResultIcon(result.type)}
                                        </div>
                                        
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-medium text-gray-900 group-hover:text-teal-700 transition-colors">
                                                    {result.title || result.name || 'Untitled'}
                                                </h3>
                                                <span className="px-2 py-1 text-xs bg-teal-100 text-teal-700 rounded-full">
                                                    {getResultTypeLabel(result.type)}
                                                </span>
                                            </div>
                                            
                                            {result.description && (
                                                <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                                                    {result.description}
                                                </p>
                                            )}
                                            
                                            {result.location && (
                                                <div className="flex items-center gap-1 text-gray-500 text-sm">
                                                    <LocationOn style={{ fontSize: '1rem' }} />
                                                    <span>{result.location}</span>
                                                </div>
                                            )}
                                            
                                            {result.rating && (
                                                <div className="flex items-center gap-2 mt-2">
                                                    <div className="flex items-center">
                                                        {'★'.repeat(Math.floor(result.rating))}
                                                        {'☆'.repeat(5 - Math.floor(result.rating))}
                                                    </div>
                                                    <span className="text-sm text-gray-600">
                                                        {result.rating} ({result.reviewCount || 0} đánh giá)
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="flex-shrink-0 text-gray-400 group-hover:text-teal-600 transition-colors">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {/* {!loading && !error && searchResults.length > 0 && (
                    <div className="border-t bg-gray-50 px-6 py-4">
                        <button 
                            onClick={onClose}
                            className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Đóng
                </button>
                    </div>
                )} */}
            </div>
        </div>
    );
};

export default SearchPopup;