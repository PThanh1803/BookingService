import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { motion as m, AnimatePresence } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/effect-fade';

const images = [
  {
    url: "https://images.unsplash.com/photo-1595781572981-d63151b232ed?q=80&w=1887&auto=format&fit=crop",
    alt: "Floral arrangement 1"
  },
  {
    url: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=1887&auto=format&fit=crop",
    alt: "Floral arrangement 2"
  },
  {
    url: "https://images.unsplash.com/photo-1455582916367-25f75bfc6710?q=80&w=1887&auto=format&fit=crop",
    alt: "Floral arrangement 3"
  }
];

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        navigate('/');
      } else {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Mật khẩu xác nhận không khớp');
        }
        await signup({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
        });
        navigate('/');
      }
    } catch (error) {
      setError(error.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      phone: '',
      address: '',
    });
    setError('');
  };

  const formVariants = {
    enter: {
      opacity: 0,
      x: isLogin ? -20 : 20,
      transition: { duration: 0.3 }
    },
    center: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      x: isLogin ? 20 : -20,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen flex items-center relative bg-gradient-to-br from-[#95F9E3] via-[#7CEBC6] to-[#61D4CA]">
      {/* Background SVG Patterns */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large blob - top left */}
        <svg className="absolute w-[400px] md:w-[600px] lg:w-[800px] h-[400px] md:h-[600px] lg:h-[800px] -top-[200px] md:-top-[300px] lg:-top-[400px] -left-[200px] md:-left-[300px] lg:-left-[400px] opacity-40 mix-blend-soft-light" viewBox="0 0 800 800">
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#4AEADC', stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: '#21D4A0', stopOpacity: 0.4 }} />
            </linearGradient>
          </defs>
          <path fill="url(#gradient1)" d="M400,0C600,0 800,200 800,400C800,600 600,800 400,800C200,800 0,600 0,400C0,200 200,0 400,0Z">
            <animate attributeName="d" dur="8s" repeatCount="indefinite" values="M400,0C600,0 800,200 800,400C800,600 600,800 400,800C200,800 0,600 0,400C0,200 200,0 400,0Z;M400,0C550,50 750,250 750,400C750,550 550,750 400,750C250,750 50,550 50,400C50,250 250,50 400,0Z;M400,0C600,0 800,200 800,400C800,600 600,800 400,800C200,800 0,600 0,400C0,200 200,0 400,0Z" />
          </path>
        </svg>

        {/* Medium blob - bottom right */}
        <svg className="absolute w-[300px] md:w-[450px] lg:w-[600px] h-[300px] md:h-[450px] lg:h-[600px] -bottom-[150px] md:-bottom-[225px] lg:-bottom-[300px] -right-[150px] md:-right-[225px] lg:-right-[300px] opacity-50 mix-blend-color-dodge" viewBox="0 0 600 600">
          <defs>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#95F9E3', stopOpacity: 0.9 }} />
              <stop offset="100%" style={{ stopColor: '#61D4CA', stopOpacity: 0.6 }} />
            </linearGradient>
          </defs>
          <path fill="url(#gradient2)" d="M300,0C450,0 600,150 600,300C600,450 450,600 300,600C150,600 0,450 0,300C0,150 150,0 300,0Z">
            <animate attributeName="d" dur="6s" repeatCount="indefinite" values="M300,0C450,0 600,150 600,300C600,450 450,600 300,600C150,600 0,450 0,300C0,150 150,0 300,0Z;M300,0C400,100 500,200 500,300C500,400 400,500 300,500C200,500 100,400 100,300C100,200 200,100 300,0Z;M300,0C450,0 600,150 600,300C600,450 450,600 300,600C150,600 0,450 0,300C0,150 150,0 300,0Z" />
          </path>
        </svg>

        {/* Center blob */}
        <svg className="absolute hidden md:block w-[300px] lg:w-[400px] h-[300px] lg:h-[400px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-60 mix-blend-overlay" viewBox="0 0 400 400">
          <defs>
            <radialGradient id="gradient3" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" style={{ stopColor: '#7CEBC6', stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: '#61D4CA', stopOpacity: 0.3 }} />
            </radialGradient>
          </defs>
          <path fill="url(#gradient3)" d="M200,0C300,0 400,100 400,200C400,300 300,400 200,400C100,400 0,300 0,200C0,100 100,0 200,0Z">
            <animate attributeName="d" dur="10s" repeatCount="indefinite" values="M200,0C300,0 400,100 400,200C400,300 300,400 200,400C100,400 0,300 0,200C0,100 100,0 200,0Z;M200,0C250,50 350,150 350,200C350,250 250,350 200,350C150,350 50,250 50,200C50,150 150,50 200,0Z;M200,0C300,0 400,100 400,200C400,300 300,400 200,400C100,400 0,300 0,200C0,100 100,0 200,0Z" />
          </path>
        </svg>

        {/* Floating circles - adjustable position */}
        <svg className="absolute w-[200px] md:w-[250px] lg:w-[300px] h-[200px] md:h-[250px] lg:h-[300px] 
          top-[10%] md:top-[15%] lg:top-[20%] 
          right-[5%] md:right-[10%] lg:right-[15%] 
          opacity-40 mix-blend-multiply animate-float 
          hidden md:block" viewBox="0 0 300 300">
          <defs>
            <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#34EAB9', stopOpacity: 0.9 }} />
              <stop offset="100%" style={{ stopColor: '#4AEADC', stopOpacity: 0.5 }} />
            </linearGradient>
          </defs>
          <path fill="url(#gradient4)" d="M150,0C230,0 300,70 300,150C300,230 230,300 150,300C70,300 0,230 0,150C0,70 70,0 150,0Z">
            <animate attributeName="d" dur="12s" repeatCount="indefinite"
              values="M150,0C230,0 300,70 300,150C300,230 230,300 150,300C70,300 0,230 0,150C0,70 70,0 150,0Z;
                      M150,0C200,50 250,100 250,150C250,200 200,250 150,250C100,250 50,200 50,150C50,100 100,50 150,0Z;
                      M150,0C230,0 300,70 300,150C300,230 230,300 150,300C70,300 0,230 0,150C0,70 70,0 150,0Z"/>
          </path>
        </svg>

        {/* Wave pattern - adjustable size and position */}
        <svg className="absolute w-[300px] md:w-[400px] lg:w-[500px] h-[150px] md:h-[175px] lg:h-[200px] 
          bottom-[5%] md:bottom-[10%] lg:bottom-[15%] 
          left-[5%] md:left-[7%] lg:left-[10%] 
          opacity-30 mix-blend-color-burn
          hidden md:block" viewBox="0 0 500 200">
          <defs>
            <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#7CEBC6', stopOpacity: 0.8 }} />
              <stop offset="50%" style={{ stopColor: '#95F9E3', stopOpacity: 0.6 }} />
              <stop offset="100%" style={{ stopColor: '#61D4CA', stopOpacity: 0.4 }} />
            </linearGradient>
          </defs>
          <path fill="url(#gradient5)" d="M0,100C125,100 125,50 250,50C375,50 375,100 500,100V200H0V100Z">
            <animate attributeName="d" dur="15s" repeatCount="indefinite"
              values="M0,100C125,100 125,50 250,50C375,50 375,100 500,100V200H0V100Z;
                      M0,50C125,50 125,100 250,100C375,100 375,50 500,50V200H0V50Z;
                      M0,100C125,100 125,50 250,50C375,50 375,100 500,100V200H0V100Z"/>
          </path>
        </svg>
      </div>

      <Container maxWidth="lg" className="py-4 md:py-6 lg:py-8 relative z-10">
        <div className="bg-white/90 backdrop-blur-md rounded-xl md:rounded-2xl overflow-hidden 
          shadow-[0_10px_30px_rgba(97,212,202,0.2)] md:shadow-[0_10px_50px_rgba(97,212,202,0.3)] 
          hover:shadow-[0_20px_50px_rgba(97,212,202,0.3)] md:hover:shadow-[0_20px_70px_rgba(97,212,202,0.4)] 
          transition-shadow duration-300 ease-in-out
          flex flex-col md:flex-row 
          min-h-[400px] md:h-[500px] lg:h-[600px]">
          {/* Left side - Form */}
          <div className={`w-full md:w-1/2 p-3 md:p-5 lg:p-6 ${isMobile ? 'order-2' : ''} relative z-10 overflow-hidden`}>
            <AnimatePresence mode="wait">
              <m.div
                key={isLogin ? 'login' : 'signup'}
                initial="enter"
                animate="center"
                exit="exit"
                variants={formVariants}
                className="h-full"
              >
                <Typography variant="h5" fontWeight="bold" className="mb-1">
                  {isLogin ? 'Welcome Back 👋' : 'Create Account 🌟'}
                </Typography>

                <Typography variant="body2" color="text.secondary" className="mb-3">
                  {isLogin ? (
                    <>Today is a new day. It's your day.<br />
                      Sign in to start managing your projects.</>
                  ) : (
                    <>Join us today and start your journey.<br />
                      Create an account to access all features.</>
                  )}
                </Typography>

                {error && (
                  <Alert severity="error" className="mb-4">
                    {error}
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="mt-3 space-y-3">
                  <div className={`${!isLogin ? 'overflow-y-auto max-h-[calc(100vh-280px)] md:max-h-[250px] pr-2' : ''}`}>
                    {!isLogin && (
                      <div className="md:mt-2">
                        <Typography variant="body3 " className="mb-1">Họ và tên</Typography>
                        <TextField
                          name="name"
                          placeholder="Nguyễn Văn A"
                          fullWidth
                          value={formData.name}
                          onChange={handleChange}
                          required
                          variant="outlined"
                          size="small"
                          className="bg-gray-50"
                          disabled={loading}
                        />
                      </div>
                    )}

                    <div className="md:mt-2">
                      <Typography variant="body33" className="mb-1">Email</Typography>
                      <TextField
                        name="email"
                        placeholder="example@email.com"
                        type="email"
                        fullWidth
                        value={formData.email}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        size="small"
                        className="bg-gray-50"
                        disabled={loading}
                      />
                    </div>

                    <div className="md:mt-2">
                      <Typography variant="body3" className="mb-1">Mật khẩu</Typography>
                      <TextField
                        name="password"
                        placeholder="Ít nhất 8 ký tự"
                        type="password"
                        fullWidth
                        value={formData.password}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        size="small"
                        className="bg-gray-50"
                        disabled={loading}
                      />
                    </div>

                    {!isLogin && (
                      <>
                        <div  className="md:mt-2">
                          <Typography variant="body3" className="mb-1">Xác nhận mật khẩu</Typography>
                          <TextField
                            name="confirmPassword"
                            placeholder="Nhập lại mật khẩu"
                            type="password"
                            fullWidth
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            variant="outlined"
                            size="small"
                            className="bg-gray-50"
                            disabled={loading}
                          />
                        </div>

                        <div className="md:mt-2">
                          <Typography variant="body3" className="mb-1">Số điện thoại</Typography>
                          <TextField
                            name="phone"
                            placeholder="0912345678"
                            fullWidth
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            variant="outlined"
                            size="small"
                            className="bg-gray-50"
                            disabled={loading}
                          />
                        </div>

                        <div className="md:mt-2">
                          <Typography variant="body3" className="mb-1">Địa chỉ</Typography>
                          <TextField
                            name="address"
                            placeholder="123 Đường ABC, Quận XYZ, TP.HCM"
                            fullWidth
                            value={formData.address}
                            onChange={handleChange}
                            required
                            variant="outlined"
                            size="small"
                            className="bg-gray-50"
                            disabled={loading}
                          />
                        </div>
                      </>
                    )}
                  </div>

                  {isLogin && (
                    <div className="text-right">
                      <Typography
                        variant="body2"
                        color="primary"
                        className="cursor-pointer hover:underline"
                      >
                        Quên mật khẩu?
                      </Typography>
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                    className="bg-teal-800 hover:bg-teal-900 py-3 normal-case"
                  >
                    {loading ? (
                      <CircularProgress size={24} className="text-white" />
                    ) : (
                      isLogin ? 'Đăng nhập' : 'Đăng ký'
                    )}
                  </Button>

                  <div className="text-center my-4">
                    <Typography variant="body2" color="text.secondary">
                      Hoặc
                    </Typography>
                  </div>

                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<GoogleIcon />}
                    className="mb-3 normal-case py-3"
                    disabled={loading}
                  >
                    {isLogin ? 'Đăng nhập' : 'Đăng ký'} với Google
                  </Button>

                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<FacebookIcon />}
                    className="normal-case py-3"
                    disabled={loading}
                  >
                    {isLogin ? 'Đăng nhập' : 'Đăng ký'} với Facebook
                  </Button>

                  <div className="text-center mt-6">
                    <Typography variant="body2" color="text.secondary">
                      {isLogin ? "Chưa có tài khoản? " : "Đã có tài khoản? "}
                      <span
                        className="text-blue-600 cursor-pointer hover:underline"
                        onClick={() => {
                          if (!loading) {
                            setIsLogin(!isLogin);
                            resetForm();
                          }
                        }}
                      >
                        {isLogin ? 'Đăng ký' : 'Đăng nhập'}
                      </span>
                    </Typography>
                  </div>
                </form>
              </m.div>
            </AnimatePresence>
          </div>

          {/* Right side - Image Slider */}
          <div className={`w-full h-[28vh] md:h-auto md:w-1/2 relative overflow-hidden ${isMobile ? 'order-1' : ''} z-10`}>
            <div className="absolute inset-0 -right-12 -left-12">
              <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
                loop={true}
                className="h-full"
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index} className="h-full">
                    <div className="absolute inset-0 bg-black/40 z-10 rounded-l-2xl" />
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover scale-110 rounded-l-2xl"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </Container>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px) translateX(5px); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        @media (min-width: 768px) {
          .animate-float {
            animation: float 8s ease-in-out infinite;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px) translateX(8px); }
          }
        }
        @media (min-width: 1024px) {
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px) translateX(10px); }
          }
        }
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #61D4CA;
          border-radius: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #4AEADC;
        }
      `}</style>
    </div>
  );
};

export default Login; 