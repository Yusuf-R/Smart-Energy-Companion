"use client";

import React, {useEffect, useState} from "react";
import {alpha, Box, Button, Card, CardContent, Container, Stack, Tab, Tabs, Typography, useTheme,} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
    Bolt as EnergyIcon,
    Devices as DevicesIcon,
    Info as InfoIcon,
    Savings as SavingsIcon,
} from "@mui/icons-material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {usePathname, useRouter} from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";

const categories = [
    {
        title: "Appliances & Ratings",
        description: "Learn how to interpret appliance ratings and their energy usage.",
        icon: <DevicesIcon/>,
        route: "/literacy/appliances-ratings",
        btnColor: "#4CAF50",
    },
    {
        title: "Energy Terminologies",
        description: "Understand essential terms like kWh and energy efficiency.",
        icon: <InfoIcon/>,
        route: "/literacy/terminologies",
        btnColor: "#00BCD4",
    },
    // {
    //     title: "Metering Equipment",
    //     description: "Explore the features of prepaid and postpaid meters.",
    //     icon: <EnergyIcon/>,
    //     route: "/literacy/metering-equipment",
    //     btnColor: "#cc8500",
    // },
    {
        title: "Optimization",
        description: "Practical tips for saving energy at home and in the office.",
        icon: <SavingsIcon/>,
        route: "/literacy/optimization",
        btnColor: "#9C27B0",
    },
];

function Literacy() {
    const [selectedTab, setSelectedTab] = useState("ALL");
    const [loadingKeys, setLoadingKeys] = useState({}); // Independent loading states for each button
    const router = useRouter();
    const pathname = usePathname();
    const theme = useTheme();

    // Reset loading states after navigation
    useEffect(() => {
        setLoadingKeys({});
    }, [pathname]);


    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const filteredCategories =
        selectedTab === "ALL"
            ? categories
            : categories.filter((cat) => cat.title === selectedTab);

    return (
        <>
            <Box
                sx={{
                    py: 6,
                    backgroundImage: "url(/bg-6.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "100vh",
                    color: theme.palette.mode === "dark" ? "#FFF" : "#000",
                }}
            >
                {/* Tabs Section */}
                <Container maxWidth="xl">
                    <Stack
                        direction="row"
                        sx={{
                            mb: 1,
                            p: 1,
                            bgcolor: alpha("#000", 1.0),
                            "&.MuiTab-root": {
                                minHeight: 60,
                                textTransform: "none",
                                fontSize: "1rem",
                                fontWeight: 500,
                                color: "#FFF",
                                "&.Mui-selected": {color: "#46F0F9"},
                            },

                        }}
                    >
                        <Tabs
                            value={selectedTab}
                            onChange={handleTabChange}
                            variant="fullWidth" // Ensures each Tab takes an equal width
                            sx={{
                                width: '100%', // Occupies the full width of the Stack
                                "& .MuiTabs-indicator": {backgroundColor: "#46F0F9"},
                                "& .MuiTab-root": {
                                    flexGrow: 1, // Ensures all tabs grow equally
                                    minHeight: 60,
                                    textTransform: "none",
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    color: "#FFF",
                                    "&.Mui-selected": {color: "#46F0F9"},
                                },
                            }}
                        >
                            <Tab
                                label="ALL"
                                value="ALL"
                                icon={<ArrowForwardIcon sx={{color: "#46F0F9"}}/>}
                                iconPosition="start"
                            />
                            {categories.map((category) => (
                                <Tab
                                    key={category.title}
                                    label={category.title.toUpperCase()}
                                    value={category.title}
                                    icon={React.cloneElement(category.icon, {
                                        sx: {color: category.btnColor},
                                    })}
                                    iconPosition="start"
                                />
                            ))}
                        </Tabs>
                    </Stack>
                </Container>

                {/* Description Section */}
                <Container maxWidth="xl">
                    <Grid container spacing={4}>
                        {filteredCategories.map((category, index) => (
                            <Grid size={{xs: 12, sm: 6, md: 4}} key={index}>
                                <Card
                                    elevation={3}
                                    sx={{
                                        height: "100%",
                                        bgcolor: alpha(theme.palette.background.paper, 0.8),
                                        borderRadius: 2,
                                        transition: "transform 0.3s",
                                        "&:hover": {transform: "translateY(-8px)"},
                                        cursor: "pointer",
                                    }}
                                    onClick={() => router.push(category.route)}
                                >
                                    <CardContent>
                                        <Stack spacing={3} sx={{height: "100%"}}>
                                            {/* Icon */}
                                            <Box
                                                sx={{
                                                    display: "inline-flex",
                                                    p: 2,
                                                    borderRadius: 2,
                                                    bgcolor: alpha(category.btnColor, 0.1),
                                                }}
                                            >
                                                {React.cloneElement(category.icon, {
                                                    sx: {fontSize: 40, color: category.btnColor},
                                                })}
                                            </Box>

                                            {/* Title */}
                                            <Typography variant="h5" sx={{fontWeight: 600}}>
                                                {category.title}
                                            </Typography>

                                            {/* Description */}
                                            <Typography sx={{color: alpha("#000", 0.7)}}>
                                                {category.description}
                                            </Typography>

                                            {/* Button */}
                                            <Button
                                                variant="text"
                                                endIcon={
                                                    loadingKeys[category.title] ? (
                                                        <CircularProgress size={20} sx={{color: category.btnColor}}/>
                                                    ) : (
                                                        <ArrowForwardIcon/>
                                                    )
                                                }
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setLoadingKeys((prev) => ({
                                                        ...prev,
                                                        [category.title]: true, // Set loading state
                                                    }));
                                                    router.push(category.route); // Navigate to the route
                                                }}
                                                sx={{
                                                    color: category.btnColor,
                                                    mt: "auto",
                                                    "&:hover": {bgcolor: alpha(category.btnColor, 0.1)},
                                                }}
                                                disabled={loadingKeys[category.title]} // Disable if loading
                                            >
                                                {loadingKeys[category.title] ? "Loading..." : "Learn More"}
                                            </Button>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </>
    );
}

export default Literacy;
