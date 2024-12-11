import { Box, Container, Grid, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

export default function HeroSection() {
  const router = useRouter();

  return (
    <Box 
      component="section" 
      sx={{
        position: 'relative',
        backgroundImage: 'url(bg-1.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1
        }
      }}
    >
      <Container 
        maxWidth="lg" 
        sx={{ 
          position: 'relative',
          zIndex: 2,
          py: { xs: 8, md: 12 }
        }}
      >
        <Grid container spacing={4} alignItems="center" sx={{ minHeight: "80vh" }}>
          <Grid item xs={12} md={6}>
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

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => router.push('/get-started')}
                  sx={{
                    background: 'linear-gradient(90deg, #2196F3, #4CAF50)',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #1976D2, #388E3C)',
                    },
                  }}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => router.push('/explore')}
                  sx={{
                    borderColor: '#2196F3',
                    color: '#2196F3',
                    '&:hover': {
                      borderColor: '#1976D2',
                      color: '#1976D2',
                    },
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </MotionBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <MotionBox
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                component="img"
                src="/logo-2.png"
                alt="Smart Energy Management"
                sx={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </MotionBox>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
