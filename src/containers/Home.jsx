import { useState, useEffect } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import Hero from '../sections/Hero';
import HowItWorks from '../sections/HowItWorks';
import LoginModal from '../components/LoginModal';
import 'swiper/css/navigation';
import PopularCategory from '../sections/PopularCategory';
import PopularBusiness from '../sections/PopularBusiness';
import PopularIndividual from '../sections/PopularIndividual';
import PopularService from '../sections/PopularService';
import Review from '../sections/Review';
import Blog from '../sections/Blog';
import Ads from '../sections/Ads';



const Home = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleLoginRequired = () => {
    setLoginModalOpen(true);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <Hero />

      <PopularCategory isMobile={isMobile} />
      <section className="py-8 pb-2 md:px-6  bg-white">
        <Container maxWidth="lg">
          <Typography
            variant={isMobile ? "h4" : "h2"}
            fontFamily="serif"
            fontWeight={550}
            marginBottom={isMobile ? 0 : 1}
          >
            Recommended for you
          </Typography>
        </Container>
        <PopularBusiness isMobile={isMobile} handleLoginRequired={handleLoginRequired} />
        <PopularIndividual isMobile={isMobile} handleLoginRequired={handleLoginRequired} />

      </section>

      <HowItWorks isMobile={isMobile} />

      <PopularService isMobile={isMobile} />

      <Blog />

      <Review isMobile={isMobile} />

      <Ads isMobile={isMobile} />

      <LoginModal
        open={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </div>
  );
};

export default Home; 