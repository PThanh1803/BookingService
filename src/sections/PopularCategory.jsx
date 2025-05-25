import React, { useEffect, useState } from "react";
import { Container, Typography, Grid } from "@mui/material";
import CategoryCard from "../components/CategoryCard";
import { categoryAPI } from "../services/api";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid as SwiperGrid, Pagination, Navigation } from 'swiper/modules';

const PopularCategory = ({ isMobile }) => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCategories = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await categoryAPI.getCategories();
                if (response.data.length > 0) {
                    setCategories(response.data);
                }
                else {
                    setError('Không có danh mục nào');
                }
            } catch (err) {
                setError(err.response?.data?.message || 'Có lỗi xảy ra khi tải danh mục');
            } finally {
                setIsLoading(false);
            }
        };
        getCategories();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <div className="text-center">
                    <p className="text-red-500 mb-2">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
                    >
                        Thử lại
                    </button>
                </div>
            </div>
        );
    }

    if (categories.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <p className="text-gray-500">Không có danh mục nào</p>
            </div>
        );
    }

    return (
        <section className="py-16 pt-32 md:px-6 px-1 bg-gray-50">
            <Container maxWidth="lg">
                <Swiper
                    modules={[SwiperGrid, Pagination, Navigation]}
                    spaceBetween={12}
                    pagination={{ clickable: true }}
                    navigation={!isMobile}
                    grid={{ rows: 2, fill: 'row' }} // Luôn 2 hàng
                    breakpoints={{
                        0: {
                            slidesPerView: 2, // Giảm xuống 1 slide trên mobile để kiểm soát tốt hơn
                            slidesPerGroup: 2,                         
                        },
                        480: {
                            slidesPerView: 2, // Tăng lên 2 slide từ 480px
                            slidesPerGroup: 2,
                        },
                        640: {
                            slidesPerView: 5, // Tăng lên 4 slide từ 640px
                            slidesPerGroup: 5,
                        },
                    }}
                >
                    {categories.map((category) => (
                        <SwiperSlide key={category.id}>
                            <CategoryCard {...category} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>
        </section>
    );
};

export default PopularCategory;