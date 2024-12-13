"use client";
import React from "react";
import {
    Box,
    Typography,
    Paper,
    Grid,
    Button,
    Card,
    CardContent,
    useTheme,
    Avatar,
    IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import {
    Bolt,
    Assessment,
    Insights,
    BatteryChargingFull,
    ArrowForward,
    PlayArrow,
    Power,
    Lightbulb,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

const FeatureCard = ({ icon, title, description, delay }) => {
    const theme = useTheme();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
        >
            <Card
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.3s ease",
                    "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: theme.shadows[8],
                        "& .feature-icon": {
                            transform: "scale(1.1)",
                        },
                    },
                }}
            >
                <CardContent>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 2,
                        }}
                    >
                        <Avatar
                            className="feature-icon"
                            sx={{
                                bgcolor: theme.palette.secondary.main,
                                width: 56,
                                height: 56,
                                transition: "transform 0.3s ease",
                            }}
                        >
                            {icon}
                        </Avatar>
                    </Box>
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                            fontWeight: 600,
                            color: theme.palette.primary.main,
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ lineHeight: 1.6 }}
                    >
                        {description}
                    </Typography>
                </CardContent>
            </Card>
        </motion.div>
    );
};

const GetStarted = () => {
    const theme = useTheme();
    const router = useRouter();

    const handleGetStarted = () => {
        router.push("/user/settings/profile/update");
    };

    const features = [
        {
            icon: <Bolt sx={{ fontSize: 32 }} />,
            title: "Track Energy Usage",
            description:
                "Monitor your household or business energy consumption with detailed insights.",
        },
        {
            icon: <Assessment sx={{ fontSize: 32 }} />,
            title: "Optimize Energy Usage",
            description:
                "Gain valuable insights into energy usage patterns to optimize efficiency.",
        },
        {
            icon: <Insights sx={{ fontSize: 32 }} />,
            title: "Cost Estimation",
            description:
                "Estimate energy costs based on usage and plan ahead for budget management.",
        },
        {
            icon: <BatteryChargingFull sx={{ fontSize: 32 }} />,
            title: "Sustainable Solutions",
            description:
                "Explore alternative power sources to reduce energy costs and environmental impact.",
        },
    ];

    return (
        <Box sx={{ py: 5, px: 3 }}>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Box sx={{ textAlign: "center", mb: 8 }}>
                    <Typography
                        variant="h3"
                        component="h1"
                        gutterBottom
                        sx={{
                            fontWeight: 700,
                            background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                            backgroundClip: "text",
                            textFillColor: "transparent",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Empower Your Energy Decisions
                    </Typography>
                    <Typography
                        variant="h6"
                        color="#FFF"
                        sx={{
                            mb: 4,
                            maxWidth: "800px",
                            mx: "auto",
                            lineHeight: 1.6,
                        }}
                    >
                        Take control of your energy usage, optimize efficiency, and save on costs with our Smart Energy Companion.
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        endIcon={<PlayArrow />}
                        sx={{
                            borderRadius: "28px",
                            px: 4,
                            py: 1.5,
                            textTransform: "none",
                            fontSize: "1.1rem",
                            background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                            "&:hover": {
                                background: `linear-gradient(45deg, ${theme.palette.secondary.dark}, ${theme.palette.primary.dark})`,
                            },
                        }}
                    >
                        Watch How It Works
                    </Button>
                </Box>
            </motion.div>

            <Grid container spacing={4}>
                {features.map((feature, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <FeatureCard {...feature} delay={index * 0.1} />
                    </Grid>
                ))}
            </Grid>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <Paper
                    sx={{
                        mt: 8,
                        p: 4,
                        background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                        color: "white",
                        borderRadius: 4,
                        overflow: "hidden",
                        position: "relative",
                    }}
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            width: "150px",
                            height: "150px",
                            background: "rgba(255,255,255,0.1)",
                            borderRadius: "0 0 0 150px",
                        }}
                    />
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={8}>
                            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                                Ready to Optimize Your Energy?
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                                Join our platform to access advanced tools for monitoring, analyzing, and reducing your energy costs.
                            </Typography>
                            <Button
                                variant="contained"
                                color="secondary"
                                endIcon={<ArrowForward />}
                                onClick={handleGetStarted}
                                sx={{
                                    borderRadius: "28px",
                                    px: 4,
                                    py: 1.5,
                                    textTransform: "none",
                                    bgcolor: "white",
                                    color: theme.palette.secondary.main,
                                    "&:hover": {
                                        bgcolor: "rgba(255,255,255,0.9)",
                                    },
                                }}
                            >
                                Get Started Now
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: 2,
                                }}
                            >
                                <IconButton
                                    sx={{
                                        bgcolor: "rgba(255,255,255,0.15)",
                                        "&:hover": {
                                            bgcolor: "rgba(255,255,255,0.25)",
                                            transform: "scale(1.1)",
                                        },
                                        transition: "all 0.3s ease",
                                    }}
                                >
                                    <Power sx={{ fontSize: 32, color: "white" }} />
                                </IconButton>
                                <IconButton
                                    sx={{
                                        bgcolor: "rgba(255,255,255,0.15)",
                                        "&:hover": {
                                            bgcolor: "rgba(255,255,255,0.25)",
                                            transform: "scale(1.1)",
                                        },
                                        transition: "all 0.3s ease",
                                    }}
                                >
                                    <Lightbulb sx={{ fontSize: 32, color: "white" }} />
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </motion.div>
        </Box>
    );
};

export default GetStarted;