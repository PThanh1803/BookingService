import { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import stringSimilarity from 'string-similarity';

const LocationContext = createContext();

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

export const LocationProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState('');
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  const findMostSimilarCity = (inputCity, cities) => {
    const { bestMatch } = stringSimilarity.findBestMatch(inputCity, cities );
    return cities.find(c => c  === bestMatch.target);
};
  const findNearestCity = (latitude, longitude, citiesData) => {
    if (!citiesData || citiesData.length === 0) return null;

    let nearestCity = null;
    let shortestDistance = Infinity;

    citiesData.forEach(city => {
      const distance = Math.sqrt(
        Math.pow(city.latitude - latitude, 2) + 
        Math.pow(city.longitude - longitude, 2)
      );

      if (distance < shortestDistance) {
        shortestDistance = distance;
        nearestCity = city;
      }
    });

    return nearestCity?.name;
  };
  
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        position => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        error => {
          reject(error);
        }
      );
    });
  };

   const fetchIPLocation = async () => {
    try {
      console.log("Fetching IP location...",cities);
      const response = await fetch("https://ipinfo.io/json?token=66ee7ecf9895f1"); // hoặc không cần token nếu test
      const data = await response.json();
     if (data.city) {
      return data.city;
     }
      console.warn("No city found in IP info, using default city.");
    } catch (err) {
      console.error("Error fetching IP info:", err);
    }
  };


  const refreshLocation = async () => {
    try {
      setLoading(true);
      const position = await getCurrentLocation();
      const nearestCity = findNearestCity(position.latitude, position.longitude, cities);
      if (nearestCity) {
        setCurrentCity(nearestCity);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error getting location:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const fetchCitiesAndSetDefault = async () => {
    try {
      const response = await fetch('https://esgoo.net/api-tinhthanh/1/0.htm');
      const data = await response.json();

      if (data.error !== 0) throw new Error('Invalid city data');

      const citiesData = data.data;
      setCities(citiesData.map(city => city.name));

      // 1. Thử lấy vị trí thật
      try {
        const position = await getCurrentLocation(); // Phải trả về { latitude, longitude }
        const nearestCity = findNearestCity(position.latitude, position.longitude, citiesData);
        if (nearestCity) {
          setCurrentCity(nearestCity);
          return;
        }
      } catch (locationError) {
        console.log('Could not get geolocation:', locationError);
      }

      // 2. Dựa trên địa chỉ user
      if (currentUser?.address) {
        const userCity = findMostSimilarCity(currentUser.address, citiesData.map(c => c.name));
        if (userCity) {
          setCurrentCity(userCity);
          return;
        }
      }

      // 3. Dựa trên IP
      const ipCity = await fetchIPLocation()
      if (ipCity) {
        const similarCity = findMostSimilarCity(ipCity, citiesData.map(c => c.name));
        if (similarCity) {
          setCurrentCity(similarCity);
          return;
        }
      }
      // 4. Fallback Hồ Chí Minh
      const hcmCity = citiesData.find(c => 
        c.name.toLowerCase().includes('bình dương')
      )?.name || citiesData[0].name;
      setCurrentCity(hcmCity);
    } catch (error) {
      console.error('Error fetching cities:', error);
      setCities([]);
    } finally {
      setLoading(false);
    }
  };

  fetchCitiesAndSetDefault();
}, [currentUser]);


  return (
    <LocationContext.Provider 
      value={{ 
        cities, 
        currentCity, 
        setCurrentCity, 
        loading,
        refreshLocation 
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}; 