"use client";
import React, { useEffect } from "react";
import { Box, Container, Typography, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { motion, useAnimation } from "framer-motion";
import Button from "@mui/material/Button";
import BoltIcon from '@mui/icons-material/Bolt';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import { useInView } from 'react-intersection-observer';

const MotionBox = motion.create(Box);
const MotionIconButton = motion.create(IconButton);

const energyFeatures = [
    {
        icon: BoltIcon,
        title: "Power Management",
        description: "Smart tools for monitoring and optimizing your energy usage patterns",
        gradient: "linear-gradient(135deg, #FF6B6B, #FFE66D)"
    },
    {
        icon: LightbulbIcon,
        title: "Smart Solutions",
        description: "Innovative approaches to reduce energy waste and improve efficiency",
        gradient: "linear-gradient(135deg, #4ECDC4, #45B7AF)"
    },
    {
        icon: ShowChartIcon,
        title: "Usage Analytics",
        description: "Detailed insights into your consumption patterns and cost analysis",
        gradient: "linear-gradient(135deg, #FFD93D, #FF6B6B)"
    },
    {
        icon: EmojiObjectsIcon,
        title: "Energy Tips",
        description: "Practical advice for sustainable energy usage in daily life",
        gradient: "linear-gradient(135deg, #6C63FF, #4ECDC4)"
    }
];

function About() {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <Box
            sx={{
                py: 8,
                bgcolor: "background.paper",
                background: 'linear-gradient(90deg, rgba(33, 150, 243, 0.3), rgba(76, 175, 80, 0.2))',
                position: "relative",
                overflow: "hidden",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "linear-gradient(180deg, rgba(33,150,243,0.05), rgba(76,175,80,0.05))",
                    zIndex: 0,
                },
            }}
        >
            <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
                {/* Title Section with Sharper Visibility */}
                <MotionBox
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <Typography
                        variant="h3"
                        align="center"
                        sx={{
                            mb: 2,
                            fontWeight: 700, // Increased font-weight for sharper text
                            background: "linear-gradient(135deg, #4CAF50 0%, #2196F3 100%)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            color: "transparent", // Transparent text to show the gradient
                            letterSpacing: "-0.02em",
                            textShadow: "0px 3px 8px rgba(0, 0, 0, 0.6), 0px 2px 4px rgba(76, 175, 80, 0.8)", // Reduced blur for sharper edges
                            position: "relative",
                            "& span": {
                                display: "inline-block",
                                animation: "energyPulse 2s infinite",
                                color: "rgba(255, 255, 255, 1)", // Ensures the gradient visibility
                                textShadow: "0px 5px 10px rgba(33, 150, 243, 0.8), 0px 2px 6px rgba(76, 175, 80, 0.9)", // Adjusted for sharper glow
                            },
                            "@keyframes energyPulse": {
                                "0%, 100%": {
                                    transform: "scale(1)",
                                    textShadow: "0px 3px 10px rgba(33, 150, 243, 0.7), 0px 2px 5px rgba(76, 175, 80, 0.6)",
                                },
                                "50%": {
                                    transform: "scale(1.05)",
                                    textShadow: "0px 6px 15px rgba(33, 150, 243, 1), 0px 3px 8px rgba(76, 175, 80, 0.9)",
                                },
                            },
                        }}
                    >
                        <span>Smart Energy Companion</span> 🍃
                    </Typography>
                </MotionBox>

                {/* Introduction Section */}
                <MotionBox
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    sx={{ mb: 6 }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            mb: 3,
                            fontWeight: "bold",
                            color: "#2196F3",
                            position: "relative",
                            "&::after": {
                                content: '""',
                                position: "absolute",
                                bottom: "-5px",
                                left: 0,
                                width: "50px",
                                height: "3px",
                                background: "#4CAF50",
                            },
                        }}
                    >
                        Introduction
                    </Typography>
                    <Typography variant="h6" sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                        Nigeria is undergoing a technological revolution in the energy sector, with significant
                        changes in billing operations and energy accessibility. However, as these advancements
                        take shape, the rising cost of energy has become a pressing challenge for households,
                        small businesses, and offices across the nation. The increasing tariffs, coupled with
                        economic constraints, have left many users struggling to manage their energy consumption
                        efficiently, leading to higher expenses and reduced productivity.
                        <br/>
                        <br/>
                        Recent data reveals that the average cost of electricity in Nigeria has surged by over
                        40% in the last few years, with prepaid meters and postpaid billing systems becoming
                        more prominent. These changes have forced many users to rethink their energy usage
                        strategies to stay within their budgets. Unfortunately, not everyone has access to
                        expert guidance or the tools necessary to understand and optimize their energy
                        consumption.
                    </Typography>
                </MotionBox>

                {/* Purpose Section */}
                <MotionBox
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    sx={{ mb: 3 }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            mb: 5,
                            fontWeight: "bold",
                            color: "#FF9800",
                            position: "relative",
                            "&::after": {
                                content: '""',
                                position: "absolute",
                                bottom: "-5px",
                                left: 0,
                                width: "60px",
                                height: "3px",
                                background: "#FFC107",
                            },
                        }}
                    >
                        The Purpose of Our System
                    </Typography>
                    <Typography variant="h6" sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                        Recognizing the need for accessible solutions, we have developed a{" "}
                        <strong>Smart Energy Companion</strong>, an intuitive platform designed to empower
                        users with the knowledge and tools to manage their energy consumption effectively. This
                        app provides a comprehensive suite of features aimed at simplifying energy literacy,
                        optimizing usage, and reducing costs—all without the need for expensive consultations or
                        technical expertise.
                    </Typography>
                </MotionBox>

                {/* Features Grid */}
                <MotionBox
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={controls}
                    sx={{ mt: 3, mb: 6 }}
                >
                    <Grid container spacing={4}>
                        {energyFeatures.map((feature, index) => (
                            <Grid size={{ xs: 12, sm: 6,  md: 6 }} key={index}>
                                <MotionBox
                                    variants={itemVariants}
                                    sx={{
                                        p: 4,
                                        height: '100%',
                                        borderRadius: 4,
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                                            '& .feature-icon': {
                                                transform: 'scale(1.1) rotate(5deg)',
                                            }
                                        }
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <MotionIconButton
                                            className="feature-icon"
                                            sx={{
                                                background: feature.gradient,
                                                p: 2,
                                                borderRadius: 3,
                                                mr: 2,
                                                transition: 'transform 0.3s ease',
                                                '& svg': {
                                                    fontSize: '2rem',
                                                    color: 'white'
                                                }
                                            }}
                                        >
                                            <feature.icon />
                                        </MotionIconButton>
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                fontWeight: 700,
                                                background: feature.gradient,
                                                backgroundClip: 'text',
                                                WebkitBackgroundClip: 'text',
                                                color: 'transparent'
                                            }}
                                        >
                                            {feature.title}
                                        </Typography>
                                    </Box>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            color: 'text.secondary',
                                            lineHeight: 1.8,
                                            pl: 7
                                        }}
                                    >
                                        {feature.description}
                                    </Typography>
                                </MotionBox>
                            </Grid>
                        ))}
                    </Grid>
                </MotionBox>

                {/* Key Objectives Section */}
                <Typography
                    variant="h4"
                    sx={{
                        mb: 5,
                        fontWeight: "bold",
                        color: "#4CAF50",
                        position: "relative",
                        "&::after": {
                            content: '""',
                            position: "absolute",
                            bottom: "-5px",
                            left: 0,
                            width: "70px",
                            height: "3px",
                            background: "#2196F3",
                        },
                    }}
                >
                    What This App Aims to Achieve
                </Typography>

                <Grid container spacing={4}>
                    {/* Empowerment Through Education */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <MotionBox
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            sx={{
                                p: 3,
                                background: "rgba(255, 255, 255, 0.9)",
                                borderRadius: 4,
                                boxShadow: "0 8px 20px rgba(31, 38, 135, 0.1)",
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                                Empowerment Through Education
                            </Typography>
                            <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
                                Equip users with detailed insights into their appliances, energy consumption
                                patterns, and potential savings strategies. Provide interactive tools and resources
                                that demystify energy efficiency, helping users make informed decisions.
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => router.push("/energy-literacy-unit")}
                                sx={{
                                    textTransform: "none",
                                    px: 3,
                                    py: 1,
                                    borderRadius: 2,
                                    background: "linear-gradient(45deg, #2196F3 30%, #4CAF50 90%)",
                                    "&:hover": {
                                        background: "linear-gradient(45deg, #4CAF50 30%, #2196F3 90%)",
                                    },
                                }}
                            >
                                Explore Energy Literacy
                            </Button>
                        </MotionBox>
                    </Grid>

                    {/* Cost-Effective Energy Management */}
                    <Grid size={{ xs: 12, md: 6 }}>

                        <MotionBox
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            sx={{
                                p: 3,
                                background: "rgba(255, 255, 255, 0.9)",
                                borderRadius: 4,
                                boxShadow: "0 8px 20px rgba(31, 38, 135, 0.1)",
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                                Cost-Effective Energy Management
                            </Typography>
                            <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
                                Offer personalized recommendations for optimizing energy use based on individual
                                consumption habits. Allow users to calculate and forecast their energy costs and
                                savings, enabling better financial planning.
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => router.push("/analysis-center")}
                                sx={{
                                    textTransform: "none",
                                    px: 3,
                                    py: 1,
                                    borderRadius: 2,
                                    background: "linear-gradient(45deg, #FFC107 30%, #FF9800 90%)",
                                    "&:hover": {
                                        background: "linear-gradient(45deg, #FF9800 30%, #FFC107 90%)",
                                    },
                                }}
                            >
                                Visit Analysis Center
                            </Button>
                        </MotionBox>
                    </Grid>
                    {[
                        {
                            title: "Convenience and Accessibility",
                            description:
                                "Eliminate the need for expert consultations by providing a user-friendly platform that delivers expert-grade insights. Ensure that users can access valuable information and strategies at their fingertips, anytime and anywhere.",
                        },
                        {
                            title: "Support Economic Stability",
                            description:
                                "Help households and businesses reduce unnecessary energy expenses while maintaining their operational needs. Promote sustainable practices that align with economic constraints, fostering long-term financial resilience.",
                        },
                    ].map((item, index) => (
                        <Grid size={{ xs: 12, md: 6 }} key={index}>
                            <MotionBox
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                sx={{
                                    p: 3,
                                    background: "rgba(255, 255, 255, 0.9)",
                                    borderRadius: 4,
                                    boxShadow: "0 8px 20px rgba(31, 38, 135, 0.1)",
                                }}
                            >
                                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                                    {item.title}
                                </Typography>
                                <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
                                    {item.description}
                                </Typography>
                            </MotionBox>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}

export default About;