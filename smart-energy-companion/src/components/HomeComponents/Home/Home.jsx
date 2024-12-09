"use client";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import useMediaQuery from "@mui/material/useMediaQuery";
import { motion } from "framer-motion";
import BoltIcon from '@mui/icons-material/Bolt';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import SavingsIcon from '@mui/icons-material/Savings';
import { useRouter } from "next/navigation";
import FeatureMarquee from '@/components/HomeComponents/FeatureMarquee/FeatureMarquee';
import KeyBenefits from '@/components/HomeComponents/KeyBenefits/KeyBenefits';

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionCard = motion(Card);

const keyFeatures = [
  {
    icon: <BoltIcon sx={{ fontSize: 40, color: '#2196F3' }} />,
    title: "Real-Time Energy Monitoring",
    description: "Track your energy consumption in real-time with detailed analytics for every appliance in your home.",
  },
  {
    icon: <ShowChartIcon sx={{ fontSize: 40, color: '#2196F3' }} />,
    title: "Smart Analytics",
    description: "Get intelligent insights about your usage patterns and receive personalized optimization recommendations.",
  },
  {
    icon: <TipsAndUpdatesIcon sx={{ fontSize: 40, color: '#2196F3' }} />,
    title: "Energy Education",
    description: "Learn about energy efficiency through our comprehensive educational resources and interactive guides.",
  },
  {
    icon: <SavingsIcon sx={{ fontSize: 40, color: '#2196F3' }} />,
    title: "Cost Optimization",
    description: "Discover potential savings and optimize your energy usage for maximum cost efficiency.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Home() {
  const router = useRouter();
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  return (
    <>
      <Box sx={{ width: "100%", overflow: "hidden" }}>
        <Box>
          {/* Hero Section */}
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center" sx={{ minHeight: "80vh" }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <MotionBox
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <MotionTypography
                    variant="h1"
                    sx={{
                      fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
                      fontWeight: 800,
                      mb: 2,
                      background: "linear-gradient(135deg, #2196F3 0%, #4CAF50 50%, #2196F3 100%)",
                      backgroundSize: "200% auto",
                      animation: "gradient 3s linear infinite",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                      textShadow: "0 2px 10px rgba(33, 150, 243, 0.3)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.2,
                      "@keyframes gradient": {
                        "0%": {
                          backgroundPosition: "0% center"
                        },
                        "100%": {
                          backgroundPosition: "200% center"
                        }
                      }
                    }}
                  >
                    Smart Energy Companion
                  </MotionTypography>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 4,
                      color: "rgba(255, 255, 255, 0.9)",
                      lineHeight: 1.6,
                      fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.4rem" },
                      maxWidth: "600px",
                      textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: "-10px",
                        left: "0",
                        width: "60px",
                        height: "4px",
                        background: "linear-gradient(90deg, #2196F3 0%, #4CAF50 100%)",
                        borderRadius: "2px",
                      }
                    }}
                  >
                    All-in-one tool for efficient energy literacy, management, and analysis. <br/> Take control of your energy consumption today.
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => router.push('/get-started')}
                    sx={{
                      mr: 2,
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      background: "linear-gradient(45deg, #2196F3 30%, #4CAF50 90%)",
                      boxShadow: "0 3px 5px 2px rgba(33, 150, 243, .3)",
                    }}
                  >
                    Get Started
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => router.push('/learn-more')}
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                    }}
                  >
                    Learn More
                  </Button>
                </MotionBox>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <MotionBox
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  sx={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "600px",
                    margin: "0 auto",
                    padding: { xs: "20px", md: "30px" },
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "20px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.97)",
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: '-3px',
                        padding: '3px',
                        borderRadius: '18px',
                        background: `linear-gradient(
                          to right,
                          #00ff00,
                          #00ffff,
                          #0099ff,
                          #00ff00,
                          #00ffff,
                          #0099ff
                        )`,
                        backgroundSize: '400% 100%',
                        WebkitMask: 
                          'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                        animation: 'border-lightning 4s linear infinite',
                        opacity: 0.8,
                        filter: 'brightness(1.2) contrast(1.5)',
                      },
                      '@keyframes border-lightning': {
                        '0%': {
                          backgroundPosition: '0% 0',
                        },
                        '100%': {
                          backgroundPosition: '-400% 0',
                        }
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        inset: '-3px',
                        padding: '3px',
                        borderRadius: '18px',
                        background: `linear-gradient(
                          to right,
                          #ff00ff,
                          #00ffff,
                          #ff00ff,
                          #00ffff,
                          #ff00ff,
                          #00ffff
                        )`,
                        backgroundSize: '400% 100%',
                        WebkitMask: 
                          'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                        animation: 'border-lightning 4s linear infinite reverse',
                        opacity: 0.7,
                        filter: 'brightness(1.2) contrast(1.5)',
                        mixBlendMode: 'lighten'
                      }
                    }}
                  >
                    <Box
                      component="img"
                      src="/logo-2.png"
                      alt="Energy Dashboard"
                      sx={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "15px",
                        transition: "all 0.3s ease-in-out",
                        filter: "drop-shadow(0 0 20px rgba(33, 150, 243, 0.3))",
                        '&:hover': {
                          transform: "translateY(-5px) scale(1.02)",
                          filter: "drop-shadow(0 15px 30px rgba(33, 150, 243, 0.4))",
                        },
                      }}
                    />
                  </Box>
                </MotionBox>
              </Grid>
            </Grid>
          </Container>

          {/* Feature Marquee Section */}
          <FeatureMarquee />

          {/* Key Benefits Section */}
          <KeyBenefits />
        </Box>
      </Box>
    </>
  );
}
