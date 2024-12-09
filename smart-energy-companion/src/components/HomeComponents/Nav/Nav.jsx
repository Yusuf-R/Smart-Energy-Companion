'use client';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';

function Nav() {
  const router = useRouter();
  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const xSmall = useMediaQuery(theme.breakpoints.down('xs'));
  const small = useMediaQuery(theme.breakpoints.down('sm'));
  const medium = useMediaQuery(theme.breakpoints.down('md'));
  const large = useMediaQuery(theme.breakpoints.down('lg'));
  const xLarge = useMediaQuery(theme.breakpoints.down('xl'));
  const xxLarge = useMediaQuery(theme.breakpoints.down('xxl'));
  const ultraWide = useMediaQuery(theme.breakpoints.down('xxxxl'));

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const navigationLinks = ['Home', 'About', 'Services', 'Contact'];
  const GetStarted = () => {
    router.push('/get-started');
  }

  return (
    <>
      <Box
        sx={{
          px: 3,
          py: 1.5,
          background: 'linear-gradient(90deg, rgba(11,15,16,1) 0%, rgba(28,24,2,0.873) 33%, rgba(4,31,36,1) 97%)',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 'auto',
          overflow: 'hidden',
        }}
      >
        {/* Logo + text on the left */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            component="img"
            src='/logo-1.png'
            alt='Smart Energy Companion Logo'
            sx={{
              width: {
                xs: '30px',
                sm: '35px',
                md: '40px',
                lg: '50px',
                xl: '60px'
              },
              height: 'auto',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.1)'
              }
            }}
          />
          <Typography 
            variant='h6' 
            sx={{ 
              color: 'white', 
              fontWeight: 'bold', 
              ml: 1,
              fontSize: {
                xs: '1rem',
                sm: '1.1rem',
                md: '1.25rem',
                lg: '1.5rem'
              },
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
              transition: 'color 0.3s ease',
              '&:hover': {
                color: '#4CAF50'
              }
            }}
          >
            Smart Energy Companion
          </Typography>
        </Box>

        {/* Navigation links + Explore on the right */}
        {!small && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* Navigation Links */}
            <Stack direction='row' spacing={4}>
              {navigationLinks.map((link) => (
                <Button
                  key={link}
                  sx={navButtonStyle(xLarge, xxLarge, ultraWide)}
                  onClick={() => window.location = `/${link.toLowerCase()}`}
                >
                  {link}
                </Button>
              ))}
            </Stack>

            {/* Explore Button */}
            <Button
              sx={getStartedButtonStyle(xSmall, small, medium, large)}
              onClick={GetStarted}  // Toggle Explore Drawer
            >
              Explore
            </Button>
          </Box>
        )}

        {/* Drawer for mobile navigation */}
        {small && (
          <>
            <IconButton onClick={toggleDrawer(true)} sx={{ color: 'white' }}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor='right' open={isDrawerOpen} onClose={toggleDrawer(false)}>
              <Box sx={{ width: 250 }}>
                <List>
                  {navigationLinks.map((link) => (
                    <ListItem button key={link} onClick={toggleDrawer(false)}>
                      <ListItemText primary={link}   onClick={() => window.location = `/${link.toLowerCase()}`}/>
                    </ListItem>
                  ))}
                </List>
                <Divider />
                <List>
                  <ListItem button onClick={()=>router.push('/get-started')}>  {/* Toggle Explore Drawer */}
                    <ListItemText primary='Explore'  onClick={GetStarted}/>
                  </ListItem>
                </List>
              </Box>
            </Drawer>
          </>
        )}
      </Box>

    </>
  );
}

const navButtonStyle = (xLarge, xxLarge, ultraWide) => ({
  fontWeight: 'bold',
  fontSize: xLarge ? '12px' : xxLarge ? '14px' : '14px',
  color: 'white',
  '&:hover': {
    color: '#46F0F9',
  },
});

const getStartedButtonStyle = (xSmall, small, medium, large) => ({
  backgroundColor: '#46F0F9',
  color: '#0E1E1E',
  fontWeight: 'bold',
  size: 'small',
  fontSize: xSmall ? '10px' : small ? '12px' : '12px',
  padding: xSmall ? '6px 12px' : small ? '8px 14px' : medium ? '10px 16px' : '12px 20px',
  '&:hover': {
    backgroundColor: '#34C0D9',
  },
});

export default Nav;
