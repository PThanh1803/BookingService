import React,{ useState, useEffect} from "react";
import { Container, Typography } from "@mui/material";
import CardItem  from "../components/CardItem";
import { CardItemSkeleton } from "../components/skeletons";
import { individualAPI } from "../services/api";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid as SwiperGrid, Pagination, Navigation } from 'swiper/modules';

const PopularIndividual = ({isMobile, handleLoginRequired}) => {
    const [individuals, setIndividuals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const getIndividuals = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await individualAPI.getIndividuals();
                if (response.data.status === 200 && response.data.data.length > 0) {
                    setIndividuals(response.data.data);
                }
                else {
                    setError('Không có cá nhân nào');
                }
            } catch (err) {
                setError(err.response?.data?.message || 'Có lỗi xảy ra khi tải danh mục');
            } finally {
                setIsLoading(false);
                setTimeout(() => {
                    setShowContent(true);
                }, 100);
            }
        };
        getIndividuals();
    }, []);

    if (isLoading) {
        return (
            <section className="py-6 pt-2 px-1 md:mt-1 mt-6 md:px-6 bg-white">
                <Container maxWidth="lg">
                    <Typography variant="h5" fontFamily="serif" fontWeight={550} className="text-left text-black block !mb-4 md:!mb-6" >
                        Popular individuals
                    </Typography>

                    <Swiper
                        modules={[SwiperGrid, Pagination, Navigation]}      
                        spaceBetween={24}
                        grid={{ rows: 1, fill: 'row' }}
                        pagination={{ clickable: true }}
                        navigation={!isMobile} 
                        breakpoints={{
                            0: {
                                slidesPerView: 1.2,
                                slidesPerGroup: 1,
                                spaceBetween: 16,
                            },
                            480: {
                                slidesPerView: 2.2,
                                slidesPerGroup: 2,
                                spaceBetween: 20,
                            },
                            640: {
                                slidesPerView: 3.2,
                                slidesPerGroup: 3,
                                spaceBetween: 24,
                            },
                            1024: {
                                slidesPerView: 4,
                                slidesPerGroup: 4,
                                spaceBetween: 24,
                            }
                        }}
                        className="!pb-12"
                    >
                        {[...Array(8)].map((_, index) => (
                            <SwiperSlide key={index} className="h-auto">
                                <CardItemSkeleton />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Container>
            </section>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <Typography variant="h5" fontFamily="serif" fontWeight={550} className="text-left text-black block !mb-4 md:!mb-6" >
                    {error}
                </Typography>
            </div>
        );
    }

    return (
        <section className="py-6 pt-2 px-1 md:mt-1 mt-6 md:px-6 bg-white">
          <Container maxWidth="lg">
            <Typography 
                variant="h5" 
                fontFamily="serif" 
                fontWeight={550} 
                className={`text-left text-black block !mb-4 md:!mb-6 ${showContent ? 'animate-slide-in-left' : 'animate-on-load'}`}
            >
              Popular individuals
            </Typography>

            <Swiper
                modules={[SwiperGrid, Pagination, Navigation]}      
                spaceBetween={24}
                grid={{ rows: 1, fill: 'row' }}
                pagination={{ clickable: true }}
                navigation={!isMobile} 
                breakpoints={{
                    0: {
                        slidesPerView: 1.2,
                        slidesPerGroup: 1,
                        spaceBetween: 16,
                    },
                    480: {
                        slidesPerView: 2.2,
                        slidesPerGroup: 2,
                        spaceBetween: 20,
                    },
                    640: {
                        slidesPerView: 3.2,
                        slidesPerGroup: 3,
                        spaceBetween: 24,
                    },
                    1024: {
                        slidesPerView: 4,
                        slidesPerGroup: 4,
                        spaceBetween: 24,
                    }
                }}
                className={`!pb-12 ${showContent ? 'animate-fade-in-up' : 'animate-on-load'}`}
            >
              {individuals.map((individual, index) => (
                <SwiperSlide 
                    key={individual.id} 
                    className={`h-auto ${showContent ? `animate-fade-in animate-stagger-${Math.min(index + 1, 8)}` : 'animate-on-load'}`}
                >
                  <CardItem {...individual}
                    type="individual"
                    onLoginRequired={handleLoginRequired}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Container>
        </section>
    );
};

export default PopularIndividual;