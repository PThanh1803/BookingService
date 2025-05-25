import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { Avatar, Menu, MenuItem, Divider } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = () => {
  const { isAuthenticated, logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  return (
    <>
      <header className="w-full top-0 left-0 right-0 z-50 p-6 max-w-7xl mx-auto " style={{maxWidth: "1200px"}}>
        <div className=" mx-auto ">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className=" md:text-3xl text-2xl font-bold no-underline">
              LUMINOVA
            </Link>

            {/* Navigation */}
            <div className="flex items-center gap-4c ">
              <Link
                to="/business"
                className="px-4 py-2 text-gray-600 font-bold hover:text-teal-700 transition-color"
              >
                For business
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Avatar
                    onClick={handleClick}
                    className="cursor-pointer hover:opacity-80 transition-opacity border-2 border-teal-500"
                    src={currentUser?.photoURL || ''}
                    alt={currentUser?.displayName || 'User'}
                    sx={{ 
                      width: 40, 
                      height: 40,
                      bgcolor: 'rgb(13 148 136)'
                    }}
                  >
                    {!currentUser?.photoURL && (currentUser?.displayName?.[0] || currentUser?.email?.[0] || '').toUpperCase()}
                  </Avatar>

                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      className: "mt-2",
                      elevation: 0,
                      sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                        '&:before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {currentUser?.name || 'User'}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {currentUser?.email}
                      </p>
                    </div>
                    
                    <MenuItem 
                      onClick={handleLogout}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <LogoutIcon className="w-5 h-5 mr-2" />
                      Đăng xuất
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="px-4 py-3 bg-teal-700 text-white rounded-2xl hover:bg-teal-800 transition-colors min-w-[100px]"
                >
                  Log in
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      
    </>
  );
};

export default Header; 