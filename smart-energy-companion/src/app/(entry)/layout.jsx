"use client";
import Nav from "@/components/HomeComponents/Nav/Nav";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { usePathname } from 'next/navigation'
import { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";


// Define background images for different routes
const routeBackgrounds = {
  '/home': '/bg-1.jpg',
  '/services': '/bg-2.jpg',
  '/authorization/users': '/bg-3.jpg',
  '/setpassword': '/bg-4.jpg',
  '/resetpassword': '/bg-4.jpg',
  '/get-started': '/bg-5.jpg',
};

function EntryLayout({ children }) {
  const pathName = usePathname();
  const theme = useTheme();

  // Media query breakpoints (customizable per your agreed breakpoints)
  const xSmall = useMediaQuery(theme.breakpoints.down("xs"));
  const small = useMediaQuery(theme.breakpoints.down("sm"));
  const medium = useMediaQuery(theme.breakpoints.down("md"));
  const large = useMediaQuery(theme.breakpoints.down("lg"));
  const xLarge = useMediaQuery(theme.breakpoints.down("xl"));
  const xxLarge = useMediaQuery(theme.breakpoints.down("xxl"));
  const ultraWide = useMediaQuery(theme.breakpoints.down("xxxxl"));

  const [backgroundImage, setBackgroundImage] = useState('/bg-1.jpg'); // Default background

  // Update the background based on the current route
  useEffect(() => {
    Object.keys(routeBackgrounds).forEach((route) => {
      if (pathName.includes(route)) {
        setBackgroundImage(routeBackgrounds[route]);
      }
    });
  }, [pathName]); // Ensure dependency on pathName


  return (
    <>
      {/* Background container */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${backgroundImage})`, // Dynamic background
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover', // Adjusted background size based on screen size
          backgroundPosition : 'center', // Adjusted position based on screen size
          backgroundAttachment: ultraWide ? 'fixed' : 'scroll', // Parallax effect on ultra-wide screens
          opacity: 0.9, // Lower opacity for blur effect
          zIndex: -1,
          transition: 'background-image 0.5s ease-in-out', // Smooth background transition
        }}
      />

      {/* Foreground content with adjusted opacity and padding */}
      <Box
        sx={{
          minHeight: "100vh", // Ensure the content area fills the viewport
          display: "flex",
          flexDirection: "column",
          fontFamily: theme.typography.fontFamily,
          backgroundColor: "rgba(0, 0, 0, 0.5)", // A semi-transparent overlay to improve text contrast
          padding: "0 5px", // Add padding to give breathing space to the content
          zIndex: 1,
        }}
      >
        {/* Navigation Bar */}
        <Nav />

        {/* Main content area */}
        <Box sx={{ mt: 10, p: 0, flex: 1 }}>
          {children}
        </Box>
       
      </Box>
    </>
  );
}

export default EntryLayout;
