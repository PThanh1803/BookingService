import api from './index';

// Mock data for services
const mockServices = [
  {
    id: 1,
    name: "Women's haircut",
    image: "https://media.istockphoto.com/id/1147811403/photo/business-woman-lady-boss-in-beauty-salon-making-hairdress-and-looking-to-the-mirror.jpg?s=612x612&w=0&k=20&c=WmL2VgSEdUPI7W0ogFHuRtBsL0BFT6KYdLJ7cuadmHk=",
    category: "Hair",
  },
  {
    id: 2,
    name: "Men's Haircut",
    image: "https://media.istockphoto.com/id/1147811403/photo/business-woman-lady-boss-in-beauty-salon-making-hairdress-and-looking-to-the-mirror.jpg?s=612x612&w=0&k=20&c=WmL2VgSEdUPI7W0ogFHuRtBsL0BFT6KYdLJ7cuadmHk=",
    category: "Hair",
  },
  {
    id: 3,
    name: "Face peeling",
    image: "https://media.istockphoto.com/id/1147811403/photo/business-woman-lady-boss-in-beauty-salon-making-hairdress-and-looking-to-the-mirror.jpg?s=612x612&w=0&k=20&c=WmL2VgSEdUPI7W0ogFHuRtBsL0BFT6KYdLJ7cuadmHk=",
    category: "Face",
  },
  {
    id: 4,
    name: "Varnish coating",
    image: "https://media.istockphoto.com/id/1147811403/photo/business-woman-lady-boss-in-beauty-salon-making-hairdress-and-looking-to-the-mirror.jpg?s=612x612&w=0&k=20&c=WmL2VgSEdUPI7W0ogFHuRtBsL0BFT6KYdLJ7cuadmHk=",
    category: "Nails",
  },
  {
    id: 5,
    name: "Laser epilation",
    image: "https://media.istockphoto.com/id/1147811403/photo/business-woman-lady-boss-in-beauty-salon-making-hairdress-and-looking-to-the-mirror.jpg?s=612x612&w=0&k=20&c=WmL2VgSEdUPI7W0ogFHuRtBsL0BFT6KYdLJ7cuadmHk=",
    category: "Body",
  },
   {
    id: 6,
    name: "Women's haircut",
    image: "https://media.istockphoto.com/id/1147811403/photo/business-woman-lady-boss-in-beauty-salon-making-hairdress-and-looking-to-the-mirror.jpg?s=612x612&w=0&k=20&c=WmL2VgSEdUPI7W0ogFHuRtBsL0BFT6KYdLJ7cuadmHk=",
    category: "Hair",
  },
  {
    id: 7,
    name: "Men's Haircut",
    image: "https://media.istockphoto.com/id/1147811403/photo/business-woman-lady-boss-in-beauty-salon-making-hairdress-and-looking-to-the-mirror.jpg?s=612x612&w=0&k=20&c=WmL2VgSEdUPI7W0ogFHuRtBsL0BFT6KYdLJ7cuadmHk=",
    category: "Hair",
  },
  {
    id: 8,
    name: "Face peeling",
    image: "https://media.istockphoto.com/id/1147811403/photo/business-woman-lady-boss-in-beauty-salon-making-hairdress-and-looking-to-the-mirror.jpg?s=612x612&w=0&k=20&c=WmL2VgSEdUPI7W0ogFHuRtBsL0BFT6KYdLJ7cuadmHk=",
    category: "Face",
  },
  {
    id: 9,
    name: "Varnish coating",
    image: "https://media.istockphoto.com/id/1147811403/photo/business-woman-lady-boss-in-beauty-salon-making-hairdress-and-looking-to-the-mirror.jpg?s=612x612&w=0&k=20&c=WmL2VgSEdUPI7W0ogFHuRtBsL0BFT6KYdLJ7cuadmHk=",
    category: "Nails",
  },
  {
    id: 10,
    name: "Laser epilation",
    image: "https://media.istockphoto.com/id/1147811403/photo/business-woman-lady-boss-in-beauty-salon-making-hairdress-and-looking-to-the-mirror.jpg?s=612x612&w=0&k=20&c=WmL2VgSEdUPI7W0ogFHuRtBsL0BFT6KYdLJ7cuadmHk=",
    category: "Body",
  },
  {
    id: 11,
    name: "Laser epilation",
    image: "https://media.istockphoto.com/id/1147811403/photo/business-woman-lady-boss-in-beauty-salon-making-hairdress-and-looking-to-the-mirror.jpg?s=612x612&w=0&k=20&c=WmL2VgSEdUPI7W0ogFHuRtBsL0BFT6KYdLJ7cuadmHk=",
    category: "Body",
  },
   {
    id: 12,
    name: "Women's haircut",
    image: "https://media.istockphoto.com/id/1147811403/photo/business-woman-lady-boss-in-beauty-salon-making-hairdress-and-looking-to-the-mirror.jpg?s=612x612&w=0&k=20&c=WmL2VgSEdUPI7W0ogFHuRtBsL0BFT6KYdLJ7cuadmHk=",
    category: "Hair",
  },
  {
    id: 13,
    name: "Men's Haircut",
    image: "https://media.istockphoto.com/id/1147811403/photo/business-woman-lady-boss-in-beauty-salon-making-hairdress-and-looking-to-the-mirror.jpg?s=612x612&w=0&k=20&c=WmL2VgSEdUPI7W0ogFHuRtBsL0BFT6KYdLJ7cuadmHk=",
    category: "Hair",
  },
  {
    id: 14,
    name: "Face peeling",
    image: "https://media.istockphoto.com/id/1147811403/photo/business-woman-lady-boss-in-beauty-salon-making-hairdress-and-looking-to-the-mirror.jpg?s=612x612&w=0&k=20&c=WmL2VgSEdUPI7W0ogFHuRtBsL0BFT6KYdLJ7cuadmHk=",
    category: "Face",
  },
  {
    id: 15,
    name: "Varnish coating",
    image: "https://media.istockphoto.com/id/1147811403/photo/business-woman-lady-boss-in-beauty-salon-making-hairdress-and-looking-to-the-mirror.jpg?s=612x612&w=0&k=20&c=WmL2VgSEdUPI7W0ogFHuRtBsL0BFT6KYdLJ7cuadmHk=",
    category: "Nails",
  },
  {
    id: 10,
    name: "Laser epilation",
    image: "https://media.istockphoto.com/id/1147811403/photo/business-woman-lady-boss-in-beauty-salon-making-hairdress-and-looking-to-the-mirror.jpg?s=612x612&w=0&k=20&c=WmL2VgSEdUPI7W0ogFHuRtBsL0BFT6KYdLJ7cuadmHk=",
    category: "Body",
  },
];

// Mock fetch services function
export const mockFetchServices = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockServices);
    }, 500);
  });
};

// Real API function (to be implemented with actual API)
export const fetchServices = async () => {
  try {
    const response = await api.get('/services');
    // Kiểm tra xem response.data có phải array không
    console.log('API Response:', response.data); // Debug để xem dữ liệu
    
    if (!response.data) {
      return mockServices; // Trả về mock data nếu không có dữ liệu
    }
    
    // Nếu response.data là array thì trả về, không thì trả về mock data
    return Array.isArray(response.data) ? response.data : mockServices;
    
  } catch (error) {
    console.error('Error fetching services:', error);
    // Trong môi trường development hoặc khi có lỗi, trả về mock data
    return mockServices;
  }
}; 

export const fetchCategories = async () => {
  try {
    const response = await api.get('/categories');
    console.log('Categories API Response:', response.data); // Debug để xem dữ liệu

    if (!response.data) {
      return []; // Trả về mảng rỗng nếu không có dữ liệu
    }
    
    return Array.isArray(response.data) ? response.data : mockServices;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return mockServices; // Trả về mảng rỗng trong trường hợp có lỗi
  }
}