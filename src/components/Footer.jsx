import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
} from '@mui/icons-material';

const Footer = () => {
  return (
    <footer className=" text-white py-8 max-sm:px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link to="/" className="text-2xl font-bold text-black mb-4 block">
              LUMINOVA
            </Link>
            
          </div>

          
          {/* Copyright */}
        <div className="text-center text-gray-400">
          <p>© Luminova 2024. All rights reserved.</p>
        </div>
          

          {/* Social Media */}
          <div>
          
            <div className="flex md:space-x-2">
              <IconButton
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-gray-600"
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-gray-600"
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-gray-600"
              >
                <TwitterIcon />
              </IconButton>
            </div>
          </div>
        </div>

        
      </div>
    </footer>
  );
};

export default Footer; 