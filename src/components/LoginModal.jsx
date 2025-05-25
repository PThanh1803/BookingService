import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Alert,
  CircularProgress,
  IconButton,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import CloseIcon from '@mui/icons-material/Close';
import { motion as m, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
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

const LoginModal = ({ open, onClose }) => {
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
        onClose();
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
        onClose();
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
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        className: "bg-gradient-to-br from-[#95F9E3] via-[#7CEBC6] to-[#61D4CA] relative overflow-hidden"
      }}
    >
      {/* Close Button */}
      <div className="absolute top-0 right-0 p-2 z-50">
        <IconButton
          onClick={onClose}
          className="bg-white/80 hover:bg-white backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 w-8 h-8 md:w-10 md:h-10"
          size={isMobile ? "small" : "medium"}
        >
          <CloseIcon className="text-gray-600 hover:text-gray-800 w-5 h-5 md:w-6 md:h-6" />
        </IconButton>
      </div>

      <DialogContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Form Side */}
          <div className={`w-full md:w-1/2 bg-white/90 backdrop-blur-md ${isMobile ? 'order-2' : ''}`}>
            <div className="p-4 md:p-5 relative z-10">
              <AnimatePresence mode="wait">
                <m.div
                  key={isLogin ? 'login' : 'signup'}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={formVariants}
                >
                  <Typography variant="h6" fontWeight="bold" className="mb-1">
                    {isLogin ? 'Chào mừng trở lại 👋' : 'Tạo tài khoản mới 🌟'}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" className="mb-2">
                    {isLogin ? (
                      <>Đăng nhập để bắt đầu quản lý các dự án của bạn.</>
                    ) : (
                      <>Tạo tài khoản để truy cập tất cả tính năng.</>
                    )}
                  </Typography>

                  {error && (
                    <Alert severity="error" className="mb-2">
                      {error}
                    </Alert>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-2">
                    <div>
                      {!isLogin && (
                        <div className="mb-2">
                          <Typography variant="body2" className="mb-1">Họ và tên</Typography>
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

                      <div className="mb-2">
                        <Typography variant="body2" className="mb-1">Email</Typography>
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

                      <div className="mb-2">
                        <Typography variant="body2" className="mb-1">Mật khẩu</Typography>
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
                          <div className="mb-2">
                            <Typography variant="body2" className="mb-1">Xác nhận mật khẩu</Typography>
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

                          <div className="mb-2">
                            <Typography variant="body2" className="mb-1">Số điện thoại</Typography>
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

                          <div className="mb-2">
                            <Typography variant="body2" className="mb-1">Địa chỉ</Typography>
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
                              multiline
                              rows={2}
                            />
                          </div>
                        </>
                      )}

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
                    </div>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={loading}
                      className="bg-teal-800 hover:bg-teal-900 py-2 normal-case mt-2"
                    >
                      {loading ? (
                        <CircularProgress size={20} className="text-white" />
                      ) : (
                        isLogin ? 'Đăng nhập' : 'Đăng ký'
                      )}
                    </Button>

                    <div className="text-center my-2">
                      <Typography variant="body2" color="text.secondary">
                        Hoặc
                      </Typography>
                    </div>

                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<GoogleIcon />}
                      className="mb-2 normal-case py-2"
                      disabled={loading}
                    >
                      {isLogin ? 'Đăng nhập' : 'Đăng ký'} với Google
                    </Button>

                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<FacebookIcon />}
                      className="normal-case py-2"
                      disabled={loading}
                    >
                      {isLogin ? 'Đăng nhập' : 'Đăng ký'} với Facebook
                    </Button>

                    <div className="text-center mt-3">
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
          </div>

          {/* Image Slider Side */}
          <div className={`w-full md:w-1/2 relative overflow-hidden ${isMobile ? 'order-1 h-[25vh]' : 'h-[550px]'}`}>
            <div className="absolute inset-0">
              <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                loop={true}
                className="h-full"
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index} className="h-full">
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </DialogContent>

      <style jsx>{`
        

        /* Close button hover effect */
        .hover\\:shadow-xl:hover {
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </Dialog>
  );
};

export default LoginModal; 