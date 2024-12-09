"use client";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import KeyBenefits from '@/components/HomeComponents/KeyBenefits/KeyBenefits';
import HeroSection from "@/components/HomeComponents/HeroSection/HeroSection";
import FeatureMarquee from "@/components/HomeComponents/FeatureMarquee/FeatureMarquee";


const MotionBox = motion(Box);

export default function Home() {
  const router = useRouter();
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      {/* Hero Section with its own background */}
      <HeroSection />

      {/* Feature Marquee Section with background */}
      <Box 
        component="section" 
        sx={{
          position: 'relative',
          backgroundImage: 'url(/bg-3.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          py: { xs: 8, md: 12 },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 1
          }
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <FeatureMarquee />
        </Box>
      </Box>

      {/* Key Benefits Section with background */}
      <Box 
        component="section" 
        sx={{
          position: 'relative',
          backgroundImage: 'url(/bg-6.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          py: { xs: 8, md: 12 },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 1
          }
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <KeyBenefits />
        </Box>
      </Box>
    </Box>
  );
}
