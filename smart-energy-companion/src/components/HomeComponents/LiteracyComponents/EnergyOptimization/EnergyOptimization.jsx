'use client';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {
    ElectricBolt as WattIcon,
    PieChart as PieChartIcon,
    Timeline as TimelineIcon,
    TipsAndUpdates as TipsIcon,
} from '@mui/icons-material';
import {useTheme} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React, {useState} from "react";
import { keyframes } from '@mui/material/styles';
import {useRouter} from "next/navigation";


// Subtle floating animation
const floatEffect = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

function EnergyOptimization() {
    const theme = useTheme();
    const [loading, setLoading] = useState({ user: false });
    const router = useRouter();
    // Category cards with buttons for each role
    const categories = [
        {
            title: 'Get Started',
            description: 'Personalized energy insights tailored to your unique use case.',
            backgroundImage:'url("/bg-6.jpg")',
            route: '/authorization/user',
            role: 'user',
        },
    ];

    const handleGetStarted = async (route, role) => {
        setLoading(prev => ({ ...prev, [role]: true }));
        // Simulate a small delay to show loading state
        await new Promise(resolve => setTimeout(resolve, 1000));
        router.push(route);
    };

    return (
        <>
            <Box
                sx={{
                    py: 6,
                    backgroundImage: "url(/bg-4.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "100vh",
                    color: theme.palette.mode === "dark" ? "#FFF" : "#000",
                }}
            >
                <Container maxWidth="lg" sx={{py: 4}}>
                    <Typography
                        variant="h4"
                        gutterBottom
                        sx={{
                            fontWeight: 700,
                            textAlign: "center",
                            background: "linear-gradient(45deg, #4CAF50, #2196F3)",
                            WebkitBackgroundClip: "text",
                            textFillColor: "transparent",
                            mb: 4,
                        }}
                    >
                        Unlock Your Optimization Potential
                    </Typography>
                    <Typography
                        variant="h5"
                        gutterBottom
                        sx={{
                            textAlign: "center",
                            color: "#FFF", // Subtle gray for secondary text
                            mb: 2,
                        }}
                    >
                        Personalized energy insights tailored to your unique use case.
                    </Typography>
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                            textAlign: "center",
                            color: "#FFF", // Neutral color for clarity
                        }}
                    >
                        Set up an account to access advanced tools, optimization plans, and actionable tips
                        for your home, office, supermarket, or business.
                    </Typography>
                  <br/>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '150px',
                            flexWrap: 'wrap',
                            width: '100%',
                            maxWidth: '1200px',
                        }}
                    >
                        {categories.map(({title, description, backgroundImage, route, role}) => (
                            <Box
                                key={title}
                                sx={{
                                    width: {xs: '100%', sm: '280px'},
                                    height: '380px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-end',
                                    padding: '20px',
                                    borderRadius: '15px',
                                    backgroundImage,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    transition: 'transform 0.3s ease-in-out',
                                    animation: `${floatEffect} 3s ease-in-out infinite`,
                                    '&:hover': {
                                        transform: 'scale(1.02)',
                                    },
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        height: '70%',
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                                    },
                                }}
                            >
                                <Box sx={{
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    zIndex: 1,
                                    color: '#FFF',
                                }}>
                                    <Typography variant="h5" sx={{mb: 2, fontWeight: 'bold'}}>
                                        {title}
                                    </Typography>
                                    <Typography variant="body2" sx={{mb: 3}}>
                                        {description}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        disabled={loading[role]}
                                        onClick={() => handleGetStarted(route, role)}
                                        sx={{
                                            backgroundColor: '#2196f3',
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: '#1976d2',
                                            },
                                            '&.Mui-disabled': {
                                                backgroundColor: '#90caf9',
                                                color: 'white',
                                            },
                                        }}
                                    >
                                        {loading[role] ? (
                                            <>
                                                <CircularProgress size={20} color="inherit" sx={{mr: 1}}/>
                                                Processing...
                                            </>
                                        ) : (
                                            'Get Started'
                                        )}
                                    </Button>
                                </Box>
                            </Box>
                        ))}
                    </Box>


                    <Grid container spacing={3} sx={{mt: 6}}>
                        {[
                            {
                                icon: <TipsIcon sx={{fontSize: 40, color: "#4CAF50"}}/>,
                                title: "Customized Plans",
                                description: "Receive personalized optimization plans based on your energy usage.",
                            },
                            {
                                icon: <TimelineIcon sx={{fontSize: 40, color: "#FF9800"}}/>,
                                title: "Detailed Insights",
                                description: "Analyze your energy consumption trends and costs.",
                            },
                            {
                                icon: <PieChartIcon sx={{fontSize: 40, color: "#2196F3"}}/>,
                                title: "Visual Reports",
                                description: "Access visual charts and reports for smarter decisions.",
                            },
                            {
                                icon: <WattIcon sx={{fontSize: 40, color: "#FF5722"}}/>,
                                title: "Actionable Tips",
                                description: "Get energy-saving tips specific to your appliances and location.",
                            },
                        ].map((feature, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Paper
                                    elevation={3}
                                    sx={{
                                        p: 3,
                                        textAlign: "center",
                                        borderRadius: 3,
                                        transition: "transform 0.3s",
                                        "&:hover": {transform: "scale(1.05)"},
                                    }}
                                >
                                    {feature.icon}
                                    <Typography variant="h6" sx={{fontWeight: 600, mt: 2}}>
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{mt: 1, color: "#757575"}}>
                                        {feature.description}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>


                    <Box sx={{mt: 6}}>
                        <Typography
                            variant="h5"
                            gutterBottom
                            sx={{
                                fontWeight: 600,
                                textAlign: "center",
                                color: "#4CAF50",
                                mb: 4,
                            }}
                        >
                            Tailored for Every Use Case
                        </Typography>
                        <Grid container spacing={4}>
                            {[
                                {
                                    title: "Home",
                                    description: "Optimize your household energy usage to reduce bills.",
                                    image: "/home.svg", // Replace with your images
                                },
                                {
                                    title: "Office",
                                    description: "Create a more energy-efficient workspace for your team.",
                                    image: "/office.svg",
                                },
                                {
                                    title: "Supermarket",
                                    description: "Lower operational costs with smarter energy strategies.",
                                    image: "/supermarket.svg",
                                },
                                {
                                    title: "Business",
                                    description: "Streamline energy consumption for maximum profit.",
                                    image: "/business.svg",
                                },
                            ].map((useCase, index) => (
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                    <Paper
                                        elevation={4}
                                        sx={{
                                            p: 2,
                                            borderRadius: 3,
                                            overflow: "hidden",
                                            textAlign: "center",
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={useCase.image}
                                            alt={useCase.title}
                                            sx={{
                                                width: "100%",
                                                height: 150,
                                                objectFit: "cover",
                                                borderRadius: 3,
                                            }}
                                        />
                                        <Typography
                                            variant="h6"
                                            sx={{fontWeight: 600, mt: 2, color: "#2196F3"}}
                                        >
                                            {useCase.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{mt: 1, color: "#757575"}}
                                        >
                                            {useCase.description}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default EnergyOptimization;
