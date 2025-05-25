import React from 'react';
import { Container, Typography } from '@mui/material';
import { businessAPI } from '../services/api';
import CardItem from '../components/CardItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid as SwiperGrid, Pagination, Navigation } from 'swiper/modules';

const PopularBusiness = ({isMobile, handleLoginRequired}) => {
    const [businesses, setBusinesses] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        const getBusinesses = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await businessAPI.getBusiness();
                console.log(response);
                if (response.data.length > 0) {
                    setBusinesses(response.data);
                }
                else {
                    setError('Không có doanh nghiệp nào');
                }
                
            } catch (err) {
                setError(err.response?.data?.message || 'Có lỗi xảy ra khi tải danh sách doanh nghiệp');
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };
        getBusinesses();
    }, []);

    if (isLoading) {
        return (
            <section className="py-8 pb-2 md:px-6 bg-white">
                <Container maxWidth="lg">
                    <Typography variant="h5" fontFamily="serif" fontWeight={550} className="text-left text-black block !mb-4 md:!mb-10">
                        Popular businesses
                    </Typography>
                    <div className="flex items-center justify-center min-h-[300px]">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
                    </div>
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
                            <p className="text-red-500 mb-2">{error}</p>
                            <button 
                                onClick={() => window.location.reload()}
                                className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
                            >
                                Thử lại
                            </button>
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
                <Typography variant="h5" fontFamily="serif" fontWeight={550} className="text-left text-black block !mb-4 md:!mb-6">
                    Popular businesses
                </Typography>

                <Swiper
                    modules={[SwiperGrid, Pagination, Navigation]}      
                    spaceBetween={16}
                    grid={{ rows: 1, fill: 'row' }}
                    pagination={{ clickable: true }}
                    navigation={!isMobile} 
                    breakpoints={{
                        0: {
                            slidesPerView: 2,
                            slidesPerGroup: 2,
                        },
                        480: {
                            slidesPerView: 3,
                            slidesPerGroup: 3,
                        },
                        640: {
                            slidesPerView: 4,
                            slidesPerGroup: 4,
                        },
                    }}
                >
                    {businesses.map((business) => (
                        <SwiperSlide key={business.id}>
                            <CardItem {...business}
                                type="salon"
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