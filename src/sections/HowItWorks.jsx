import { motion } from 'framer-motion';
import part1 from '../assets/part-1.png';
import part2 from '../assets/part-2.png';
import part3 from '../assets/part-3.png';
import { Typography } from '@mui/material';

const containerVariants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
      delayChildren: 0.2,
      once: true
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 50,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const steps = [
  {
    number: 1,
    title: 'Find',
    description: 'Choose a individual or a salon nearby for reviews and ratings',
    image: part1,
  },
  {
    number: 2,
    title: 'Booking',
    description: 'At a convenient time and in just a few clicks',
    image: part2,
  },
  {
    number: 3,
    title: 'Enjoy',
    description: 'Get the best services from professionals',
    image: part3,
  },
];

const PartCad = ({ number, title, description, image }) => {
  return (
    <motion.div 
      className="text-center w-full max-w-sm mx-auto px-4"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="mb-6 relative">
        <img
          src={image}
          alt={title}
          className="w-full h-auto object-cover rounded-xl shadow-[0_2px_20px_rgb(0,0,0,0.2)] shadow-gray-300"
        />
        <motion.div 
          className="absolute bottom-[-2.5rem] left-[-1.5rem] inline-flex items-center justify-center w-14 h-14 rounded-full bg-teal-500 text-white text-xl font-bold mb-6"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4, type: "spring" }}
          viewport={{ once: true }}
        >
          {number}
        </motion.div>
      </div>

      <motion.h3 
        className="text-xl font-semibold text-gray-900 my-2 text-left"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5, once: true }}
      >
        {title}
      </motion.h3>
      <motion.p 
        className="text-gray-600 text-left"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.5, once: true }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

const HowItWorks = ({isMobile}) => {
  return (
    <section className="py-16 px-6 relative bg-gradient-to-b from-[#e6f7f5] to-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <svg
          className="absolute w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#5eead4"
            fillOpacity="0.1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        <div className="text-center mb-20">
          <Typography
                variant={isMobile ? "h10" : "h6"}
                margin={1}                     
                fontWeight={550}
                className="text-green-500"
            >
                How it work?
            </Typography>

            <Typography
              variant={isMobile ? "h4" : "h2"}
              fontFamily="serif"
              fontWeight={550}
              marginBottom={isMobile ? 2 : 12}
              margin={"auto"}
              width={isMobile ? "100%" : "50%"}
          >
                A simple way to beauty and health
            </Typography>
        </div>

        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="relative flex justify-center w-full md:w-1/3 h-auto md:h-[600px]" variants={cardVariants}>
            <div className="relative md:absolute md:top-0 flex justify-center w-full">
              <PartCad {...steps[0]} />
            </div>
          </motion.div>

          <motion.div className="relative flex justify-center w-full md:w-1/3 h-auto md:h-[600px]" variants={cardVariants}>
            <div className="relative md:absolute md:top-20 flex justify-center w-full">
              <PartCad {...steps[1]} />
            </div>
          </motion.div>

            <motion.div className="relative flex justify-center w-full md:w-1/3 h-auto md:h-[600px]" variants={cardVariants}>
            <div className="relative md:absolute md:top-40 flex justify-center w-full">
              <PartCad {...steps[2]} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
