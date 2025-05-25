import api from './index';

// Mock data for individuals
const mockIndividuals = [
  {
    id: 1,
    name: "Iryna Kovalchuk",
    address: "Åsögatan St. 80",
    rating: 4.8,
    image: "https://media.istockphoto.com/id/1147811403/photo/business-woman-lady-boss-in-beauty-salon-making-hairdress-and-looking-to-the-mirror.jpg?s=612x612&w=0&k=20&c=WmL2VgSEdUPI7W0ogFHuRtBsL0BFT6KYdLJ7cuadmHk=",
    recommended: true,
  },
  {
    id: 2,
    name: "Yuliya",
    address: "Djurgårdsvägen St. 36",
    rating: 4.8,
    image: "https://media.istockphoto.com/id/1147811403/photo/business-woman-lady-boss-in-beauty-salon-making-hairdress-and-looking-to-the-mirror.jpg?s=612x612&w=0&k=20&c=WmL2VgSEdUPI7W0ogFHuRtBsL0BFT6KYdLJ7cuadmHk=",
    recommended: true,
  },
  {
    id: 3,
    name: "Maria Petrova",
    address: "Ringvägen St. 74",
    rating: 4.8,
    image: "https://media.istockphoto.com/id/1147811403/photo/business-woman-lady-boss-in-beauty-salon-making-hairdress-and-looking-to-the-mirror.jpg?s=612x612&w=0&k=20&c=WmL2VgSEdUPI7W0ogFHuRtBsL0BFT6KYdLJ7cuadmHk=",
    recommended: true,
  },
  {
    id: 4,
    name: "Anna Kravchenko",
    address: "Sibyllegatan St. 35",
    rating: 4.8,
    image: "https://media.istockphoto.com/id/1147811403/photo/business-woman-lady-boss-in-beauty-salon-making-hairdress-and-looking-to-the-mirror.jpg?s=612x612&w=0&k=20&c=WmL2VgSEdUPI7W0ogFHuRtBsL0BFT6KYdLJ7cuadmHk=",
    recommended: true,
  },
];

// Mock fetch individuals function
export const mockFetchIndividuals = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockIndividuals);
    }, 500);
  });
};

// Real API function (to be implemented with actual API)
export const fetchIndividuals = async () => {
  try {
    const response = await api.get('/individuals');
    console.log('Individuals API Response:', response.data); // Debug để xem dữ liệu
    
    if (!response.data) {
      return mockIndividuals; // Trả về mock data nếu không có dữ liệu
    }
    
    // Nếu response.data là array thì trả về, không thì trả về mock data
    return Array.isArray(response.data) ? response.data : mockIndividuals;
    
  } catch (error) {
    console.error('Error fetching individuals:', error);
    // Trả về mock data thay vì throw error
    return mockIndividuals;
  }
}; 