"use client";
import {useRouter} from "next/navigation";
import {useState, useEffect} from "react";
import {useMutation} from "@tanstack/react-query";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import Typography from "@mui/material/Typography";
import PlaceIcon from '@mui/icons-material/Place';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import {toast} from "sonner";
import AdminUtils from "@/utils/AdminUtils";
import {signOut} from 'next-auth/react';
import {CircularProgress, Badge} from "@mui/material";
import ArticleIcon from '@mui/icons-material/Article';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import SpaIcon from '@mui/icons-material/Spa';
import QuickreplyIcon from '@mui/icons-material/Quickreply';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import { db } from '@/server/db/fireStore';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import BoltIcon from '@mui/icons-material/Bolt';
import SolarPowerIcon from '@mui/icons-material/SolarPower';

function SideNav({navState, activeRoute, userProfile, activeChatId}) {
    const router = useRouter();
    const [confirmExit, setConfirmExit] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);


    const mutation = useMutation({
        mutationKey: ['Logout'],
        mutationFn: AdminUtils.userLogout,
        onSuccess: () => {
            signOut({callbackUrl: '/authorization/user'}); // Redirects after logout
            toast.success('Logged out successfully');
            setLoggingOut(false);
            setConfirmExit(false); // Close dialog
        },
        onError: (error) => {
            console.error('Logout error:', error);
            toast.error('Logout failed. Please try again.');
            setLoggingOut(false);
        },
    });

    const handleLogout = () => {
        try {
            setLoggingOut(true);
            mutation.mutate();
        } catch (err) {
            console.error('Logout error:', err);
            setLoggingOut(false);
            toast.error('Logout failed. Please try again.');
        }
    };

    const handleNavigation = (route) => {
        router.push(route);
    };

    const navWidth = navState === "full" ? 250 : navState === "icon" ? 80 : 0;
    const showText = navState === "full";
    const showIcons = navState !== "hidden";

    const activeStyle = {
        backgroundColor: "#374151",
        borderRadius: "8px",
    };

    const hoverStyle = {
        "&:hover": {
            background: " linear-gradient(to right, #000428, #004e92)",
            borderRadius: "8px",
            cursor: "pointer",
        },
    };

    return (
        <Box
            sx={{
                width: navWidth,
                transition: "width 0.3s",
                color: "white",
                display: navState === "hidden" ? "none" : "flex",
                flexDirection: "column",
                padding: showIcons ? "10px" : 0,
                borderRight: "1px solid grey",
                height: '100vh',
            }}
        >
            {/* Dashboard */}
            {showText && (
                <Typography variant="overline" sx={{mb: 0, ml: 1}}>
                    Dashboard
                </Typography>
            )}
            <List>
                <ListItem
                    onClick={() => handleNavigation("/user/dashboard")}
                    sx={{...hoverStyle, ...(activeRoute === "/user/dashboard" ? activeStyle : {})}}
                >
                    {showIcons && (
                        <ListItemIcon sx={{color: "white"}}>
                            <DashboardIcon/>
                        </ListItemIcon>
                    )}
                    {showText && <ListItemText primary="Overview"/>}
                </ListItem>
            </List>

            {/* Information Hub */}
            {showText && (
                <Typography variant="overline" sx={{mb: 0, ml: 1}}>
                    Literacy
                </Typography>
            )}
            <List>
                <ListItem
                    onClick={() => handleNavigation("/user/literacy/appliances-ratings")}
                    sx={{...hoverStyle, ...(activeRoute === "/user/literacy/appliances-ratings" ? activeStyle : {})}}
                >
                    {showIcons && (
                        <ListItemIcon sx={{color: "Gold"}}>
                            <BoltIcon/>
                        </ListItemIcon>
                    )}
                    {showText && <ListItemText primary="Energy Guide"/>}
                </ListItem>

                <ListItem
                    onClick={() => handleNavigation("/user/literacy/alt-energy")}
                    sx={{...hoverStyle, ...(activeRoute === "/user/literacy/alt-energy" ? activeStyle : {})}}
                >
                    {showIcons && (
                        <ListItemIcon sx={{color: "orange"}}>
                            <SolarPowerIcon/>
                        </ListItemIcon>
                    )}
                    {showText && <ListItemText primary="Alternative Energy"/>}
                </ListItem>

                <ListItem
                    onClick={() => handleNavigation("/user/literacy/tips-guides")}
                    sx={{...hoverStyle, ...(activeRoute === "/user/literacy/tips-guides" ? activeStyle : {})}}
                >
                    {showIcons && (
                        <ListItemIcon sx={{color: "violet"}}>
                            <TipsAndUpdatesIcon/>
                        </ListItemIcon>
                    )}
                    {showText && <ListItemText primary="Tips & Guides"/>}
                </ListItem>
            </List>

            {/* Health Tools */}
            {showText && (
                <Typography variant="overline" sx={{mb: 0, ml: 1}}>
                    Personalization
                </Typography>
            )}
            <List>
                <ListItem
                    onClick={() => handleNavigation("/user/personalized")}
                    sx={{...hoverStyle, ...(activeRoute === "/user/personalized" ? activeStyle : {})}}
                >
                    {showIcons && (
                        <ListItemIcon sx={{color: "white"}}>
                            <DashboardIcon/>
                        </ListItemIcon>
                    )}
                    {showText && <ListItemText primary="Overview"/>}
                </ListItem>
                <ListItem
                    onClick={() => handleNavigation("/user/personalization/home")}
                    sx={{...hoverStyle, ...(activeRoute === "/user/personalization/home" ? activeStyle : {})}}
                >
                    {showIcons && (
                        <ListItemIcon sx={{color: "limegreen"}}>
                            <HomeIcon/>
                        </ListItemIcon>
                    )}
                    {showText && <ListItemText primary="Home"/>}
                </ListItem>

                <ListItem
                    onClick={() => handleNavigation("/user/personalization/business")}
                    sx={{...hoverStyle, ...(activeRoute === "/user/personalization/business" ? activeStyle : {})}}
                >
                    {showIcons && (
                        <ListItemIcon sx={{color: "gold"}}>
                            <BusinessIcon/>
                        </ListItemIcon>
                    )}
                    {showText && <ListItemText primary="Business"/>}
                </ListItem>
            </List>


            {/* Management */}
            {showText && (
                <Typography variant="overline" sx={{mb: 0, ml: 1}}>
                    Management
                </Typography>
            )}
            <List>

                <ListItem
                    onClick={() => handleNavigation("/user/settings")}
                    sx={{...hoverStyle, ...(activeRoute === "/user/settings" ? activeStyle : {})}}
                >
                    {showIcons && (
                        <ListItemIcon sx={{color: "white"}}>
                            <SettingsIcon/>
                        </ListItemIcon>
                    )}
                    {showText && <ListItemText primary="Settings"/>}
                </ListItem>

                <ListItem
                    onClick={() => setConfirmExit(true)} // Show confirmation dialog before logout
                    sx={hoverStyle}
                >
                    {showIcons && (
                        <ListItemIcon sx={{color: "white"}}>
                            <LogoutIcon/>
                        </ListItemIcon>
                    )}
                    {showText && <ListItemText primary="Logout"/>}
                </ListItem>
            </List>

            {/* Confirmation Dialog for Logout */}
            <Dialog open={confirmExit} onClose={() => setConfirmExit(false)}>
                <DialogTitle>Confirm Logout</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to logout?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmExit(false)} variant="contained" color="success">
                        No
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={(e) => {
                            if (loggingOut) e.preventDefault();
                            else handleLogout();
                        }}
                        endIcon={loggingOut && <CircularProgress size={20} color="inherit"/>}
                        sx={{
                            ...(loggingOut && {
                                pointerEvents: "none", // Disable interaction while maintaining appearance
                                opacity: 1,
                            }),
                        }}
                    >
                        {loggingOut ? "Logging out..." : "Yes"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default SideNav;
