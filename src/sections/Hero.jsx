import React from 'react';
import {
  Container,
  TextField,
  InputAdornment,
  Paper,
  Autocomplete,
} from '@mui/material';
import { Search, LocationOn } from '@mui/icons-material';
import Header from '../components/Navbar'; // Path to Navbar.jsx
import { useLocation } from '../context/LocationContext';
import { useMediaQuery, useTheme } from '@mui/material';
import bannerImageMobile from '../assets/banner1.jpg'; // Path to your mobile image
import bannerImageDesktop from '../assets/banner.jpg'; // Path to your desktop image
import SearchPopup from '../components/SearchPopup'; // Path to SearchPopup.jsx
import { searchAPI } from '../services/api'; // Adjust the import path as needed

const Hero = () => {
  const { cities, currentCity, setCurrentCity, loading, refreshLocation } = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // < 600px
  const [isSearchPopupOpen, setIsSearchPopupOpen] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState([]);
  const [searchError, setSearchError] = React.useState(null);
  const [searchLoading, setSearchLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  const removeVietnameseTones = (str) => {
  return str
    .normalize("NFD") // tách dấu khỏi chữ
    .replace(/[\u0300-\u036f]/g, "") // xóa các ký tự dấu
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};

  const handleSearch = async (inputSearchTerm) => {
    // if (!inputSearchTerm || !inputSearchTerm.trim()) {
    //   setSearchError('Vui lòng nhập từ khóa tìm kiếm');
    //   return;
    // }

    try {
      setSearchLoading(true);
      setSearchError(null);
      setSearchTerm(inputSearchTerm.trim());
      setIsSearchPopupOpen(true);
      // Chuyển đổi tên thành phố có dấu thành không dấu
      const cityWithoutTones = removeVietnameseTones(currentCity);
      console.log('City with tones:', currentCity);
      console.log('City without tones:', cityWithoutTones);
      

      const results = await searchAPI.search(inputSearchTerm.trim(), cityWithoutTones);
      console.log('Search results:', results);
      if (results.data && results.data.result.length > 0) {
        setSearchResults(results.data.result || []);
      } else {
        throw new Error(results.message || 'Không tìm thấy kết quả');
      }
    } catch (err) {
      console.error('Error fetching search results:', err);
      setSearchError(err.message || 'Có lỗi xảy ra khi tìm kiếm');
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };
  const backgroundImage = isMobile ? bannerImageMobile : bannerImageDesktop;
  return (
    <div
      className="relative md:min-h-[700px] h-[500px] flex flex-col items-center bg-cover bg-center"
      style={{
         backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#e6f0fa',
      }}
    >
      <Header />
      {/* Adjust padding of Container to align with Paper */}
      <div className="absolute inset-0 bg-black opacity-50 -z-110 md:hidden block"></div>
      
      {/* Centered content */}
      <Container maxWidth="lg"  className="absolute bottom-16 z-10 text-white px-10 md:px-20 ">
        <div className="max-w-5xl text-center relative z-10">
          <Paper
            elevation={3}
            className=" md:h-24 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 p-2 md:pl-6 shadow-lg bg-white/90 mt-64 rounded-3xl overflow-hidden border border-gray-200"
            square
          >
            {/* Search TextField */}
            <TextField
              placeholder="Search for a salon, individual or service"
              variant="standard"
              fullWidth
              InputProps={
                {
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <Search className="text-gray-400 ml-4" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiFormControl-root': {
                  padding: 0,
                },
                '& .MuiTextField-root': {
                  padding: 0,
                },
                '& .MuiInputBase-root': {
                  padding: 0,
                },
                '& .MuiInputBase-input': {
                  padding: '1.25rem 0',
                },
              }}
              className="border-none focus:outline-none"
            />

            {/* Autocomplete (City Selector) */}
            <Autocomplete
              freeSolo={false}
              disableClearable
              options={cities}
              value={currentCity}
              onChange={(e, newValue) => setCurrentCity(newValue)}
              loading={loading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  fullWidth
                  placeholder="Chọn tỉnh thành"
                  InputProps={{
                    ...params.InputProps,
                    disableUnderline: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOn 
                          className="text-gray-400 cursor-pointer" 
                          onClick={() => refreshLocation()}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              className="min-w-[250px] border-l border-gray-300 px-3 py-4 max-md:border-none max-md:w-full"
            />

            {/* Search Button */}
            <button
              type="submit"
              onClick={() => handleSearch(searchTerm)}
              disabled={searchLoading}
              className="md:px-5 md:py-7 bg-teal-700 text-white rounded-2xl font-bold hover:bg-teal-600 transition-colors min-w-[160px] max-lg:w-full px-4 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >  
              {searchLoading ? 'Đang tìm...' : 'Search'}
            </button>
          </Paper>
          {/* Search Popup */}
          <SearchPopup
            isOpen={isSearchPopupOpen}
            onClose={() => setIsSearchPopupOpen(false)}
            searchResults={searchResults}
            loading={searchLoading}
            error={searchError}
            searchTerm={searchTerm}
          />
        </div>
      </Container>
      
    </div>
  );
};

export default Hero;