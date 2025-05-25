import React,{ useState, useEffect} from "react";
import { Container, Typography } from "@mui/material";
import CardItem  from "../components/CardItem";
import { individualAPI } from "../services/api";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid as SwiperGrid, Pagination, Navigation } from 'swiper/modules';

const PopularIndividual = ({isMobile, handleLoginRequired}) => {
    const [individuals, setIndividuals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getIndividuals = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await individualAPI.getIndividuals();
                if (response.data.length > 0) {
                    setIndividuals(response.data);
                }
                else {
                    setError('Không có cá nhân nào');
                }
            } catch (err) {
                setError(err.response?.data?.message || 'Có lỗi xảy ra khi tải danh mục');
            } finally {
                setIsLoading(false);
            }
        };
        getIndividuals();
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
                <Typography variant="h5" fontFamily="serif" fontWeight={550} className="text-left text-black block !mb-4 md:!mb-6" >
                    {error}
                </Typography>
            </div>
        );
    }

    return (
        <section className="py-6 pt-2 px-1 md:mt-1 mt-6 md:px-6 bg-white">
          <Container maxWidth="lg">
            <Typography variant="h5" fontFamily="serif" fontWeight={550} className="text-left text-black block !mb-4 md:!mb-6" >
              Popular individuals
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
                        slidesPerView: 4  ,
                        slidesPerGroup: 4,
                    },
                }}
                
            >
              {individuals.map((individual) => (
                <SwiperSlide key={individual.id}>
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