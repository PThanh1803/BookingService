import React from "react";
import { Container, Typography, useMediaQuery, useTheme } from "@mui/material";
import { motion as m } from "framer-motion";
import blog from "../assets/blog.png";

const Blog = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // sm = 600px

    // Thêm các variants cho animation
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2, // Con xuất hiện lần lượt
          duration: 0.5
        }
      }
    };

    const itemVariants = {
      hidden: { 
        opacity: 0,
        y: 20
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: "easeOut"
        }
      }
    };

    const imageVariants = {
      hidden: { 
        opacity: 0,
        x: -50
      },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.7,
          ease: "easeOut"
        }
      }
    };

  return (
    <m.section 
      className="py-16 pt-32 px-4 bg-gray-50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <Container maxWidth="lg">
        <div className="flex flex-col lg:flex-row items-center justify-between md:gap-10 lg:gap-36">
          <m.div 
            className="w-full lg:w-1/2 relative"
            variants={imageVariants}
          >
            {/* SVG Background Shape */}
            <m.div 
              className="absolute bg-[#F0FDFF] -bottom-20 -left-20 w-full h-auto max-sm:h-[300px] md:h-[700px] object-cover rounded-2xl rounded-tl-[6rem] z-0"
              variants={itemVariants}
            >
            </m.div>
            <m.img
              src={blog}
              alt="Coming Soon"
              className="w-full h-auto max-sm:h-[300px] md:h-[700px] object-cover rounded-2xl rounded-tl-[6rem] relative z-10"
              variants={itemVariants}
            />
          </m.div>

          <m.div 
            className="w-full lg:w-1/2 flex flex-col justify-center text-left mt-6 lg:mt-0 z-10"
            variants={itemVariants}
          >
            <m.div variants={itemVariants}>
              <Typography
                variant="h6"
                component="h1"
                fontWeight={600}
                marginBottom={isMobile ? 1 : 2}
                className="text-teal-500"
              >
                For individuals and businesses
              </Typography>
            </m.div>

            <m.div variants={itemVariants}>
              <Typography
                variant={isMobile ? "h4" : "h2"}
                fontFamily="serif"
                fontWeight={600}
                marginBottom={isMobile ? 1 : 4}
              >
                Are you a personal business or a side-hustler?
              </Typography>
            </m.div>

            <m.div variants={itemVariants}>
              <Typography
                variant="body1"
                marginBottom={isMobile ? 4 : 6}
                className="text-gray-600"
              >
                Experience all the advantages of a modern beauty platform. Organize your daily work and find new clients. You can manage your entire business in one program and receive clear reports on your work.
              </Typography>
            </m.div>

            <m.div 
              className="w-full flex justify-start"
              variants={itemVariants}
            >
              <m.button
                className="px-5 py-4 bg-teal-700 text-white rounded-2xl hover:bg-teal-800 transition-colors w-full sm:w-auto"
                onClick={() => console.log("Join Now clicked")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Join Now
              </m.button>
            </m.div>
          </m.div>
        </div>
      </Container>
    </m.section>
  );
};

export default Blog;
