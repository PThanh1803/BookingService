import { Outlet } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Header from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext.jsx';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import { LocationProvider } from './context/LocationContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#115e59', // Tailwind teal-800
      light: '#14b8a6', // Tailwind teal-500
      dark: '#134e4a', // Tailwind teal-900
    },
    secondary: {
      main: '#0f766e', // Tailwind teal-700
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '0.5rem',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <LocationProvider>
          <div className="min-h-screen flex flex-col overflow-x-hidden">

            <main className="flex-grow">
              <Outlet />
            </main>
            <Footer />
          </div>
        </LocationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
