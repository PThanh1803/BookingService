import { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

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
        
        if (data.error === 0) {
          const citiesData = data.data;
          setCities(citiesData.map(city => city.name));

          // Try getting current location
          try {
            const position = await getCurrentLocation();
            const nearestCity = findNearestCity(position.latitude, position.longitude, citiesData);
            if (nearestCity) {
              setCurrentCity(nearestCity);
              setLoading(false);
              return;
            }
          } catch (locationError) {
            console.log('Unable to get user location:', locationError);
          }

          if (currentUser?.address) {
            console.log('Using user address to find city:', currentUser.address);
            const userCity = citiesData.find(c => 
              c.name.toLowerCase().includes(currentUser.address.toLowerCase())
            )?.name;
            if (userCity) {
              setCurrentCity(userCity);
              setLoading(false);
              return;
            }
          }

          // Default to HCM
          const hcmCity = citiesData.find(c => 
            c.name.toLowerCase().includes('hồ chí minh')
          )?.name;
          setCurrentCity(hcmCity || citiesData[0].name);
        }
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