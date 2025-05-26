import React from 'react';
import { Container, Typography } from '@mui/material';
import { businessAPI } from '../services/api';
import CardItem from '../components/CardItem';
import { CardItemSkeleton } from '../components/skeletons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid as SwiperGrid, Pagination, Navigation } from 'swiper/modules';

const PopularBusiness = ({isMobile, handleLoginRequired}) => {
    const [businesses, setBusinesses] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [showContent, setShowContent] = React.useState(false);

    React.useEffect(() => {
        const getBusinesses = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await businessAPI.getBusiness();
                console.log(response);
                if (response.data.status === 200 ) {
                    setBusinesses(response.data.data);
                }
                else {
                    setError('Không có doanh nghiệp nào');
                }
                
            } catch (err) {
                setError(err.response?.data?.message || 'Có lỗi xảy ra khi tải danh sách doanh nghiệp');
                console.log(err);
            } finally {
                setIsLoading(false);
                // Delay để tạo hiệu ứng mượt mà
                setTimeout(() => {
                    setShowContent(true);
                }, 100);
            }
        };
        getBusinesses();
    }, []);

    if (isLoading) {
        return (
            <section className="py-6 pb-2 md:px-6 bg-white">
                <Container maxWidth="lg">
                    <Typography variant="h5" fontFamily="serif" fontWeight={550} className="text-left text-black block !mb-4 md:!mb-6">
                        Popular businesses
                    </Typography>
                    
                    <Swiper
                        modules={[SwiperGrid, Pagination, Navigation]}      
                        spaceBetween={24}
                        grid={{ rows: 1, fill: 'row' }}
                        pagination={{ clickable: true }}
                        navigation={!isMobile} 
                        breakpoints={{
                            0: {
                                slidesPerView: 2,
                                slidesPerGroup: 2,
                                spaceBetween: 8
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
            <section className="py-8 pb-2 md:px-6 bg-white">
                <Container maxWidth="lg">
                    <Typography variant="h5" fontFamily="serif" fontWeight={550} className="text-left text-black block !mb-4 md:!mb-10">
                        Popular businesses
                    </Typography>
                    <div className="flex items-center justify-center min-h-[300px]">
                        <div className="text-center">
                            <p className="text-black-500 mb-2">{error}</p>
                            
                        </div>
                    </div>
                </Container>
            </section>
        );
    }

    if (businesses.length === 0) {
        return (
            <section className="py-8 pb-2 md:px-6 bg-white">
                <Container maxWidth="lg">
                    <Typography variant="h5" fontFamily="serif" fontWeight={550} className="text-left text-black block !mb-4 md:!mb-10">
                        Popular businesses
                    </Typography>
                    <div className="flex items-center justify-center min-h-[300px]">
                        <p className="text-gray-500">Không có doanh nghiệp nào</p>
                    </div>
                </Container>
            </section>
        );
    }

    return (
        <section className="py-6 pb-2 md:px-6 bg-white">
            <Container maxWidth="lg">
                <Typography 
                    variant="h5" 
                    fontFamily="serif" 
                    fontWeight={550} 
                    className={`text-left text-black block !mb-4 md:!mb-6 ${showContent ? 'animate-slide-in-left' : 'animate-on-load'}`}
                >
                    Popular businesses
                </Typography>

                <Swiper
                    modules={[SwiperGrid, Pagination, Navigation]}      
                    spaceBetween={24}
                    grid={{ rows: 1, fill: 'row' }}
                    pagination={{ clickable: true }}
                    navigation={!isMobile} 
                    breakpoints={{
                        0: {
                            slidesPerView: 2,
                            slidesPerGroup: 2,
                            spaceBetween: 8
                        },
                        1024: {
                            slidesPerView: 4,
                            slidesPerGroup: 4,
                            spaceBetween: 24,
                        }
                    }}
                    className={`!pb-12 ${showContent ? 'animate-fade-in-up' : 'animate-on-load'}`}
                >
                    {businesses.map((business, index) => (
                        <SwiperSlide 
                            key={business.id} 
                            className={`h-auto ${showContent ? `animate-fade-in animate-stagger-${Math.min(index + 1, 8)}` : 'animate-on-load'}`}
                        >
                            <CardItem {...business}
                                type="business"
                                id={business._id}
                                onLoginRequired={handleLoginRequired}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>
        </section>
    );
};

export default PopularBusiness;