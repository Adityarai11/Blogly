import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Typography, Box, Tabs, Tab } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authAction } from '../redux/store';

const Header = () => {
  const isLogin = useSelector((state) => state.isLogin); // Check login status from Redux store
  const navigate = useNavigate(); 
  const dispatch = useDispatch(); 
  const [value, setValue] = useState(0); // Default to first tab

  const handleLogout = () => {
    try {
      // Dispatch logout action to update Redux state
      dispatch(authAction.logout());
      alert('Logout successful'); // Show logout success message
    } catch (error) {
      console.log(error); // Handle error during logout
    }
  };

  useEffect(() => {
    if (!isLogin) {
      navigate('/login'); // Navigate to login page when isLogin is false
    }
  }, [isLogin, navigate]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          My Blog App
        </Typography>

        {isLogin && ( // Render navigation tabs only if the user is logged in
          <Box display="flex" marginLeft="auto" marginRight="auto">
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)} // Update the tab value on tab change
              indicatorColor="secondary"
            >
              <Tab label="Blogs" component={Link} to="/blogs" />
              <Tab label="My Blogs" component={Link} to="/my-blogs" />
            </Tabs>
          </Box>
        )}

        <Box display="flex" marginLeft="auto">
          {!isLogin ? ( // If user is not logged in, show Login and Register buttons
            <>
              <Button sx={{ margin: 1, color: 'inherit' }} component={Link} to="/login">
                Login
              </Button>
              <Button sx={{ margin: 1, color: 'inherit' }} component={Link} to="/register">
                Register
              </Button>
            </>
          ) : ( // If user is logged in, show Logout button
            <Button onClick={handleLogout} sx={{ margin: 1, color: 'inherit' }} component={Link} to="/logout">
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
