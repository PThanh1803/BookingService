import React,{ useState, useEffect} from "react";
import { Container, Select, MenuItem, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid as SwiperGrid, Pagination, Navigation } from 'swiper/modules';
import ServiceCard from "../components/ServiceCard";
import { ServiceCardSkeleton } from "../components/skeletons";
import { serviceAPI } from "../services/api";
import { useLocation } from '../context/LocationContext';

// Function để chuyển đổi tên thành phố có dấu thành không dấu (giữ nguyên chữ hoa và dấu cách)
const removeVietnameseTones = (str) => {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
};

const PopularService = ({isMobile}) => {
    const [services, setServices] = useState([]);
    const { cities, currentCity, setCurrentCity } = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showContent, setShowContent] = useState(false);
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
                const cityWithoutTones = removeVietnameseTones(currentCity);
                const response = await serviceAPI.getServices(cityWithoutTones);
                console.log('City with tones:', currentCity);
                console.log('City without tones:', cityWithoutTones);
                console.log('Response:', response.data);
                if (response.data.status === 200 && response.data.data.length > 0) {
                    setServices(response.data.data[0].services);
                }
                else {
                    setError('Không có dịch vụ nào');
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
        getServices();
    }, [currentCity]); 

    if (isLoading) {
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
                        {[...Array(10)].map((_, index) => (
                            <SwiperSlide key={index}>
                                <ServiceCardSkeleton />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Container>
            </section>
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
                {error && (
                    <div className="flex items-center justify-center min-h-[200px]">
                        <Typography variant="h5" fontFamily="serif" fontWeight={550} className="text-left text-black block !mb-4 md:!mb-10" >
                            {error}
                        </Typography>
                    </div>
                )}
                {!error && (
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
                    className ={`!pb-12 ${showContent ? 'animate-fade-in-up' : 'animate-on-load'}`}
                >
                {services.map((service, index) => (
                <SwiperSlide 
                    key={service.id}
                    className={showContent ? `animate-fade-in animate-stagger-${Math.min(index + 1, 8)}` : 'animate-on-load' }
                >
                    <ServiceCard title={service.serviceTitle} image={service.serviceImage} />
                </SwiperSlide>
                ))}
            </Swiper>
            )}
        </Container>
      </section>
    );
};

export default PopularService;
