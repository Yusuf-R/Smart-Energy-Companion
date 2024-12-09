import { Box, Container, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const KeyBenefits = () => {
  const benefits = [
    {
      stat: '30%',
      title: 'Average Savings',
      description: 'Users report significant reduction in monthly energy bills through smart monitoring',
      icon: '💰'
    },
    {
      stat: '2.5 Tons',
      title: 'CO₂ Reduced',
      description: 'Average annual carbon footprint reduction per household using our platform',
      icon: '🌱'
    },
    {
      stat: '24/7',
      title: 'Real-time Insights',
      description: 'Continuous monitoring and instant alerts for optimal energy management',
      icon: '📊'
    },
    {
      stat: '15 min',
      title: 'Quick Setup',
      description: 'Get started and connect your devices in minutes, not hours',
      icon: '⚡'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 15, mb: 10 }}>
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        sx={{ textAlign: 'center', mb: 8 }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #2196F3, #4CAF50)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2
          }}
        >
          Real Impact, Real Savings
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ maxWidth: '800px', mx: 'auto', mb: 6, color: '#FFF' }}
        >
          Join thousands of users who are transforming their energy consumption and making a difference
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {benefits.map((benefit, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              sx={{
                p: 3,
                height: '100%',
                borderRadius: 4,
                background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
                }
              }}
            >
              <Typography variant="h1" sx={{ fontSize: '3rem', mb: 1, }}>
                {benefit.icon}
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(90deg, #2196F3, #4CAF50)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1
                }}
              >
                {benefit.stat}
              </Typography>
              <Typography
                variant="h6"
                sx={{ mb: 2, fontWeight: 'bold', color: '#FFF' }}
              >
                {benefit.title}
              </Typography>
              <Typography
                variant="body1"
                color="#FFF"
              >
                {benefit.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default KeyBenefits;
