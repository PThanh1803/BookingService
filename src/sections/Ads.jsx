import React from 'react';
import { Container, Typography } from '@mui/material';
import { motion as m } from "framer-motion";
import app from '../assets/app.png';
import appstore from '../assets/appstore.png';
import googleplay from '../assets/googleplay.png';

const Ads = ({isMobile}) => {
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

  const imageVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const contentVariants = {
    hidden: { 
      opacity: 0,
      x: -50
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <m.section 
      className="py-8 pt-2 md:px-4 md:mt-16 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <Container maxWidth="lg">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-36">
          <m.div 
            className="relative w-full lg:flex-1 h-[400px] sm:h-[480px] lg:h-[580px]"
            variants={imageVariants}
          >
            <m.img 
              src={app} 
              alt="Ad 1" 
              className="w-full h-full object-cover rounded-3xl"
              variants={imageVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
            <m.div 
              className="absolute top-0 left-0 w-full max-sm:bg-black max-sm:bg-opacity-50 md:w-1/2 h-full flex flex-col justify-center p-6 sm:p-10 lg:p-20 md:gap-5 rounded-3xl"
              variants={contentVariants}
            >
              <m.div variants={contentVariants}>
                <Typography
                  variant={isMobile ? "h10" : "h5"}
                  fontFamily="serif"
                  fontWeight={600}
                  className="text-teal-400 text-left"
                >
                  LUMINOVA
                </Typography>
              </m.div>

              <m.div variants={contentVariants}>
                <Typography
                  variant={isMobile ? "h4" : "h2"}
                  fontFamily="serif"
                  fontWeight={550}
                  className="text-white text-left !my-2"
                >
                  Any where, any time
                </Typography>
              </m.div>

              <m.div variants={contentVariants}>
                <Typography
                  variant={isMobile ? "h16" : "h8"}
                  className="text-white text-left !mt-2"
                >
                  Experience all the advantages of modern beauty platform. Organize your daily work and find new clients
                </Typography>
              </m.div>

              <m.div 
                className="flex flex-wrap sm:flex-nowrap justify-start gap-4 mt-6"
                variants={contentVariants}
              >
                <m.button
                  onClick={() => console.log('Google Play clicked')}
                  variants={buttonVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img src={googleplay} alt="Google Play" className="w-36 rounded-xl" />
                </m.button>
                <m.button
                  onClick={() => console.log('App Store clicked')}
                  variants={buttonVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img src={appstore} alt="App Store" className="w-36 rounded-xl" />
                </m.button>
              </m.div>
            </m.div>
          </m.div>
        </div>
      </Container>
    </m.section>
  );
};

export default Ads;
