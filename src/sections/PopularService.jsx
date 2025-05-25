import React,{ useState, useEffect} from "react";
import { Container, Select, MenuItem, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid as SwiperGrid, Pagination, Navigation } from 'swiper/modules';
import ServiceCard from "../components/ServiceCard";
import { serviceAPI } from "../services/api";
import { useLocation } from '../context/LocationContext';

const PopularService = ({isMobile}) => {
    const [services, setServices] = useState([]);
    const { cities, currentCity, setCurrentCity } = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: 400,
            width: 250,
          },
        },
      };
      
    const handleChange = (event) => {
        setCurrentCity(event.target.value);
    };
    useEffect(() => {
        const getServices = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await serviceAPI.getServices();
                if (response.data.length > 0) {
                    setServices(response.data);
                }
                else {
                    setError('Không có dịch vụ nào');
                }
            } catch (err) {
                setError(err.response?.data?.message || 'Có lỗi xảy ra khi tải danh mục');
            } finally {
                setIsLoading(false);
            }
        };
        getServices();
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
                <Typography variant="h5" fontFamily="serif" fontWeight={550} className="text-left text-black block !mb-4 md:!mb-10" >
                    {error}
                </Typography>
            </div>
        );
    }

    return (
        <section className="md:pb-16 md:pt-32 pb-2 pt-2 md:px-6 px-1 bg-gray-50">
            <Container maxWidth="lg">
                <div className="text-left text-black md:mb-16 mb-6 flex flex-wrap items-center space-x-2 ">
                    <Typography
                        variant={isMobile ? "h4" : "h2"}
                        fontFamily="serif"
                        margin={1}                     
                        fontWeight={550}
                    >
                        Popular services in
                    </Typography>
                    <Select
                        value={currentCity}
                        onChange={handleChange}
                        variant="standard"
                        disableUnderline
                        MenuProps={MenuProps}
                        sx={{
                            fontFamily: "serif",
                            fontSize: isMobile ? "2rem" : "3.5rem",
                            fontWeight: 550,
                            color: "green",
                            '& .MuiSelect-icon': {
                                color: "green",
                            },
                        }}
                    >
                        {cities.map((cityName) => (
                            <MenuItem key={cityName} value={cityName}   >
                                {cityName}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
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
                            slidesPerView: 5,
                            slidesPerGroup: 5,
                        },
                    }}
                    
                >
                {services.map((service) => (
                <SwiperSlide key={service.id}>
                    <ServiceCard {...service} />
                </SwiperSlide>
                ))}
            </Swiper>
        </Container>
      </section>
    );
};

export default PopularService;
