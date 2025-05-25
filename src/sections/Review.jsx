import ReviewCard from "../components/ReviewCard";
import { Container, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid as SwiperGrid, Pagination, Navigation } from 'swiper/modules';
import { motion as m } from "framer-motion";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const reviews = [
  {
    id: 1,
    review: 'This beauty services website is my go-to for all my beauty needs. The staff is friendly and professional.',
    author: 'Lucy Rodriguez',
    date: '24 March',
    rating: 5,
    avatar: 'https://i.shgcdn.com/8d329ee2-eea6-46eb-bb57-dfe3f7a37599/-/format/auto/-/preview/3000x3000/-/quality/lighter/',
  },
  {
    id: 2,
    review: 'The booking process was easy, and the staff was knowledgeable and attentive. I had a great experience',
    author: 'Maya Patel',
    date: '24 March',
    rating: 5,
    avatar: 'https://i.pinimg.com/236x/a0/66/5d/a0665da9418cabcf3c7685d544c672e3.jpg',
  },
  {
    id: 3,
    review: 'This beauty services website is fantastic! The staff is highly skilled and provides amazing results every time. I highly recommend them!',
    author: 'Ethan Wonson',
    date: '23 March',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  {
    id: 4,
    review: 'This beauty services website is fantastic! The staff is highly skilled and provides amazing results every time. I highly recommend them!',
    author: 'Ethan Wonson',
    date: '23 March',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  {
    id: 5,
    review: 'This beauty services website is fantastic! The staff is highly skilled and provides amazing results every time. I highly recommend them!',
    author: 'Ethan Wonson',
    date: '23 March',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  {
    id: 6,
    review: 'This beauty services website is fantastic! The staff is highly skilled and provides amazing results every time. I highly recommend them!',
    author: 'Ethan Wonson',
    date: '23 March',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
];

const Review = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // width < 600px

  // Thêm các variants cho animation
  const containerVariants = {
    hidden: { 
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.5
      }
    }
  };

  const titleVariants = {
    hidden: { 
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const circleVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  const swiperVariants = {
    hidden: { 
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  return (
    <m.section 
      className="py-16 px-6 bg-gray-50 relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      {/* Circle SVG Background */}
      <m.div 
        className="absolute -right-20 sm:-right-40 md:-right-60 lg:-right-80 -bottom-[150px] sm:-bottom-[200px] md:-bottom-[250px] lg:-bottom-[300px] w-[450px] sm:w-[600px] md:w-[750px] lg:w-[900px] h-[450px] sm:h-[600px] md:h-[750px] lg:h-[900px]"
        variants={circleVariants}
      >
        <svg width="1800" height="1800" viewBox="0 0 1800 1800" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle cx="900" cy="900" r="900" fill="#F0FDFF"/>
          <circle cx="900" cy="900" r="350" fill="#fff"/>
        </svg>
      </m.div>

      <Container maxWidth="lg" className="relative z-10">
        <m.div variants={titleVariants}>
          <Typography
            variant={isMobile ? "h4" : "h2"}
            fontFamily="serif"
            fontWeight={550}
            marginBottom={isMobile ? 2 : 12}
            width={isMobile ? "100%" : "50%"}
          >
            Trust professionals to take care of yourself
          </Typography>
        </m.div>

        <m.div variants={swiperVariants}>
          <Swiper
            modules={[SwiperGrid, Pagination, Navigation]}
            spaceBetween={16}
            grid={{ rows: 1, fill: 'row' }}
            pagination={{ clickable: true }}
            navigation={!isMobile} 
            breakpoints={{
              640: {
                slidesPerView: 3,
                slidesPerGroup: 3,
              },
              600: {
                slidesPerView: 2,
                slidesPerGroup: 2,
              },
              0: {
                slidesPerView: 1,
                slidesPerGroup: 1,
              },
            }}
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={review.id}>
                <m.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                >
                  <ReviewCard {...review} />
                </m.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </m.div>
      </Container>
    </m.section>
  );
};

export default Review;
