"use client";
import { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Container, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import BoltIcon from '@mui/icons-material/Bolt';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SavingsIcon from '@mui/icons-material/Savings';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TouchAppIcon from '@mui/icons-material/TouchApp';

const MotionBox = motion(Box);

const featureContent = [
  {
    title: "Energy Education",
    icon: <BoltIcon sx={{ fontSize: 40, color: '#2196F3' }} />,
    description: "Empower yourself with knowledge about your appliances and their energy consumption patterns.",
    details: [
      {
        subtitle: "Interactive Appliance Input",
        content: "Add appliances manually or select from preloaded lists with wattage and usage patterns.",
      },
      {
        subtitle: "Consumption Estimation",
        content: "Get real-time estimates of energy consumption in kWh for different timeframes.",
      },
      {
        subtitle: "Educational Insights",
        content: "Receive tailored tips and 'Did You Know?' facts about energy-efficient practices.",
      },
      {
        subtitle: "Comparative Analysis",
        content: "Compare your appliance settings with energy-efficient models for potential savings.",
      }
    ]
  },
  {
    title: "Utilization Analysis",
    icon: <AnalyticsIcon sx={{ fontSize: 40, color: '#4CAF50' }} />,
    description: "Understand your energy consumption patterns to identify inefficiencies and prioritize savings.",
    details: [
      {
        subtitle: "Data Input & Tracking",
        content: "Log daily appliance usage with preloaded templates for different rooms.",
      },
      {
        subtitle: "Trend Analysis",
        content: "Visualize peak usage times and identify major energy consumers.",
      },
      {
        subtitle: "Smart Visualization",
        content: "Interactive charts showing energy consumption patterns and anomalies.",
      },
      {
        subtitle: "Feedback System",
        content: "Get personalized recommendations based on your usage trends.",
      }
    ]
  },
  {
    title: "Cost and Savings",
    icon: <SavingsIcon sx={{ fontSize: 40, color: '#FF9800' }} />,
    description: "Understand the financial impact of your energy consumption and find cost-saving opportunities.",
    details: [
      {
        subtitle: "Cost Breakdown",
        content: "Detailed cost analysis per appliance and room with local tariff rates.",
      },
      {
        subtitle: "Savings Calculator",
        content: "Calculate potential savings from energy-efficient practices and upgrades.",
      },
      {
        subtitle: "Comparative Scenarios",
        content: "Compare costs between current and optimized usage patterns.",
      },
      {
        subtitle: "Budget Planning",
        content: "Set and track energy budgets with real-time monitoring.",
      }
    ]
  },
  {
    title: "Alternative Power",
    icon: <WbSunnyIcon sx={{ fontSize: 40, color: '#9C27B0' }} />,
    description: "Explore cost-effective and sustainable energy alternatives for your needs.",
    details: [
      {
        subtitle: "Viability Assessment",
        content: "Analyze the feasibility of solar panels and inverters for your needs.",
      },
      {
        subtitle: "Cost-Benefit Analysis",
        content: "Detailed breakdown of costs, savings, and payback periods.",
      },
      {
        subtitle: "Smart Recommendations",
        content: "Get personalized suggestions based on your usage patterns.",
      },
      {
        subtitle: "Environmental Impact",
        content: "Track your CO2 savings and environmental contribution.",
      }
    ]
  }
];

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const FeatureMarquee = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isHovered, setIsHovered] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);

  const contentIndex = Math.abs(page % featureContent.length);

  const paginate = useCallback((newDirection) => {
    setPage([page + newDirection, newDirection]);
  }, [page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSwipeHint(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let interval;
    if (autoPlayEnabled && !isHovered) {
      interval = setInterval(() => {
        paginate(1);
      }, 4000); // Change slide every 5 seconds
    }
    return () => clearInterval(interval);
  }, [autoPlayEnabled, isHovered, paginate]);

  return (
    <Box sx={{ 
      width: '100vw',
      position: 'relative',
      left: '50%',
      right: '50%',
      marginLeft: '-50vw',
      marginRight: '-50vw',
      background: 'linear-gradient(180deg, rgba(33, 150, 243, 0.05) 0%, rgba(76, 175, 80, 0.05) 100%)',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
        opacity: 0.6,
        zIndex: 0,
      },
      overflow: "hidden",
      py: { xs: 4, md: 8 },
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    }}>
      <Container maxWidth={false} sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          sx={{ 
            textAlign: 'center',
            mb: { xs: 4, md: 6 },
          }}
        >
          <Typography 
            component={motion.h2}
            variant="h3" 
            align="center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0, 0.71, 0.2, 1.01]
            }}
            sx={{ 
              display: 'inline-block',
              px: 2,
              py: 1,
              background: 'linear-gradient(90deg, #2196F3, #4CAF50)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, rgba(33, 150, 243, 0.2), rgba(76, 175, 80, 0.2))',
                filter: 'blur(10px)',
                zIndex: -1,
              },
              '@keyframes shimmer': {
                '0%': {
                  backgroundPosition: '0% 50%',
                },
                '50%': {
                  backgroundPosition: '100% 50%',
                },
                '100%': {
                  backgroundPosition: '0% 50%',
                },
              },
              animation: 'shimmer 3s ease-in-out infinite',
              backgroundSize: '200% auto',
            }}
          >
            Features
          </Typography>
          <Box
            component={motion.div}
            initial={{ width: 0 }}
            animate={{ width: '100px' }}
            transition={{ duration: 0.8, delay: 0.5 }}
            sx={{
              height: '4px',
              background: 'linear-gradient(90deg, #2196F3, #4CAF50)',
              mx: 'auto',
              mt: 2,
              borderRadius: '2px',
            }}
          />
        </Box>

        <Box
          sx={{
            position: 'relative',
            height: { xs: 'auto', md: '600px' },
            '&:hover .navigation-buttons': {
              opacity: 1,
            },
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Swipe Hint */}
          <AnimatePresence>
            {showSwipeHint && (
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                sx={{
                  position: 'absolute',
                  top: -60,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  bgcolor: 'rgba(33, 150, 243, 0.9)',
                  color: 'white',
                  py: 1,
                  px: 3,
                  borderRadius: 2,
                  zIndex: 10,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              >
                <TouchAppIcon />
                <Typography>Swipe or use arrows to navigate</Typography>
              </MotionBox>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <Box
            className="navigation-buttons"
            sx={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'space-between',
              transform: 'translateY(-50%)',
              px: 2,
              opacity: 0,
              transition: 'opacity 0.3s ease',
              zIndex: 2,
            }}
          >
            <IconButton
              onClick={() => paginate(-1)}
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                '&:hover': {
                  bgcolor: 'white',
                },
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <IconButton
              onClick={() => paginate(1)}
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                '&:hover': {
                  bgcolor: 'white',
                },
              }}
            >
              <ArrowForwardIcon />
            </IconButton>
          </Box>

          {/* Feature Cards */}
          <AnimatePresence initial={false} custom={direction}>
            <MotionBox
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'grab',
                '&:active': {
                  cursor: 'grabbing'
                }
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  alignItems: 'flex-start',
                  gap: 4,
                  p: { xs: 3, md: 6 },
                  width: '100%',
                  maxWidth: '1200px',
                  bgcolor: 'background.paper',
                  borderRadius: 4,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  transform: 'perspective(1000px)',
                  transition: 'all 0.3s ease',
                }}
              >
                <Box sx={{
                  minWidth: { xs: '100%', md: '200px' },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center'
                }}>
                  <Box sx={{
                    p: 2,
                    borderRadius: '50%',
                    bgcolor: 'rgba(33, 150, 243, 0.1)',
                    mb: 2
                  }}>
                    {featureContent[contentIndex].icon}
                  </Box>
                  <Typography 
                    variant="h4" 
                    gutterBottom 
                    sx={{ 
                      color: 'primary.main',
                      fontWeight: 'bold',
                      fontSize: { xs: '1.5rem', md: '2rem' }
                    }}
                  >
                    {featureContent[contentIndex].title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    {featureContent[contentIndex].description}
                  </Typography>
                </Box>

                <Box sx={{ flex: 1 }}>
                  <List>
                    {featureContent[contentIndex].details.map((detail, idx) => (
                      <ListItem key={idx} sx={{ px: 0 }}>
                        <ListItemIcon>
                          <CheckCircleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={
                            <Typography variant="h6" color="primary" sx={{ fontSize: '1.1rem' }}>
                              {detail.subtitle}
                            </Typography>
                          }
                          secondary={detail.content}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
            </MotionBox>
          </AnimatePresence>

          {/* Progress Indicators */}
          <Box
            sx={{
              position: 'absolute',
              bottom: -40,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            {featureContent.map((_, index) => (
              <Box
                key={index}
                onClick={() => setPage([index, index > contentIndex ? 1 : -1])}
                sx={{
                  width: 40,
                  height: 4,
                  borderRadius: 2,
                  bgcolor: index === contentIndex ? 'primary.main' : 'rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: index === contentIndex ? 'primary.main' : 'rgba(0,0,0,0.2)',
                  }
                }}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default FeatureMarquee;
