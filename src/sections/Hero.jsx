import { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  InputAdornment,
  Paper,
  Autocomplete,
} from '@mui/material';
import { Search, LocationOn } from '@mui/icons-material';
import Header from '../components/Navbar'; // Path to Navbar.jsx
import bannerImage from '../assets/banner.jpg'; // Path to your image
import { useAuth } from '../context/AuthContext'; // Giả sử bạn có context auth
import { useLocation } from '../context/LocationContext';

const Hero = () => {
  const { cities, currentCity, setCurrentCity, loading, refreshLocation } = useLocation();
  const { user } = useAuth(); // Hook để lấy thông tin user

  return (
    <div
      className="relative md:min-h-[600px] h-[500px] flex flex-col items-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${bannerImage})`,
        backgroundColor: '#e6f0fa',
      }}
    >
      <Header />
      {/* Adjust padding of Container to align with Paper */}
      <Container maxWidth="lg"  className="absolute bottom-16 z-10 text-white px-10 md:px-20 ">
        <div className="max-w-5xl text-center">
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
              onClick={() => console.log(`Searching in ${currentCity}`)}
              className="md:px-5 md:py-7 bg-teal-700 text-white rounded-2xl font-bold hover:bg-teal-600 transition-colors min-w-[160px] max-lg:w-full px-4 py-4"
            >  
              Search
            </button>
          </Paper>

        </div>
      </Container>
    </div>
  );
};

export default Hero;