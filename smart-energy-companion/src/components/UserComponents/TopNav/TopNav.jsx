"use client";
import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import {useMutation} from "@tanstack/react-query";
import {toast} from "sonner";
import AdminUtils from "@/utils/AdminUtils";
import {signOut} from 'next-auth/react';
import {CircularProgress} from "@mui/material";
import {collection, doc, onSnapshot, updateDoc, query, where, orderBy, serverTimestamp} from "firebase/firestore";
import {db} from "@/server/db/fireStore";
import Badge from "@mui/material/Badge";
import Drawer from "@mui/material/Drawer";
import {Circle as UnreadIcon, Close as CloseIcon, Notifications as NotificationsIcon,} from "@mui/icons-material";
import {usePathname, useRouter} from "next/navigation";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import { format } from 'date-fns';

function TopNav({onToggleSideNav, userProfile}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [confirmExit, setConfirmExit] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);
    const [notificationsEl, setNotificationsEl] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [userStatus, setUserStatus] = useState('offline');
    const router = useRouter();
    const pathname = usePathname();

      // Status color mapping
    const statusColors = {
        online: '#4CAF50',  // Green
        offline: '#f44336', // Red
        busy: '#ff9800'     // Yellow
    };

    // Listen to user's online status
    useEffect(() => {
        if (!userProfile?._id) return;

        setUserStatus(userProfile.status);

    }, [userProfile?._id]);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSettings = () => {
        setAnchorEl(null); // Close the dropdown menu when logout is clicked
        router.push('/user/settings');
    }

    const handleProfile = () => {
        router.push('/user/settings/profile');
        setAnchorEl(null); // Close the dropdown menu when logout is clicked
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogoutClick = async () => {
        setConfirmExit(true);
        setAnchorEl(null); // Close the dropdown menu when logout is clicked
    };

    const declinedLogoutClick = async () => {
        setConfirmExit(false);
        setAnchorEl(null); // Close the dropdown menu when logout is clicked
    };

    const mutation = useMutation({
        mutationKey: ['Logout'],
        mutationFn: AdminUtils.userLogout,
        onSuccess: async () => {
            await signOut({callbackUrl: '/authorization/user'}); // Redirects after logout
            toast.success('Logged out successfully');
            setConfirmExit(false); // Close dialog
            setLoggingOut(false);
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
            toast.error('Logout failed. Please try again.');
            setLoggingOut(false);
        }
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 1,
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    background: "linear-gradient(to right, #1e3c72, #2a5298)",
                    color: "#FFF",
                }}
            >
                {/* Left Section */}
                <Box sx={{display: "flex", alignItems: "center", gap: 2}}>
                    <Avatar src="/logo-1.png" alt="SEC" sx={{width: 50, height: 50}}/>
                    <Typography variant="button" sx={{color: "#FFF"}}>
                        Smart <br/> Energy Companion
                    </Typography>
                    <IconButton
                        aria-label="Toggle sidebar"
                        onClick={onToggleSideNav}
                        sx={{color: "#FFF"}}
                    >
                        <MenuIcon/>
                    </IconButton>
                </Box>

                {/* Right Section */}
                <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                    {/* Notifications */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mr: 2,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '20px',
                        padding: '4px 12px'
                    }}>
                        <Box
                            sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                backgroundColor: userStatus === 'online' ? '#4CAF50' : '#757575',
                                mr: 1
                            }}
                        />
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'white',
                                textTransform: 'capitalize'
                            }}
                        >
                            {userStatus}
                        </Typography>
                    </Box>
                    <Avatar
                        src={userProfile?.avatar ? userProfile.avatar :  "/av-1.svg"}
                        alt="User Avatar"
                        sx={{width: 50, height: 50}}
                    />
                    <Box sx={{textAlign: "left"}}>
                        <Typography variant="body1" sx={{fontWeight: "bold", color: '#FFF'}}>
                            {userProfile?.firstName || "User Name"}
                        </Typography>
                    </Box>
                    <IconButton aria-label="Open profile menu" onClick={handleMenuOpen}>
                        <ArrowDropDownIcon sx={{color: '#FFF'}}/>
                    </IconButton>

                    {/* Dropdown Menu */}
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        PaperProps={{
                            elevation: 3,
                            sx: {mt: 1.5, overflow: "visible"},
                        }}
                    >
                        <MenuItem onClick={handleProfile}>
                            <ListItemIcon>
                                <PersonIcon fontSize="small"/>
                            </ListItemIcon>
                            Profile
                        </MenuItem>
                        <MenuItem onClick={handleSettings}>
                            <ListItemIcon>
                                <SettingsIcon fontSize="small"/>
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                        <Divider/>
                        <MenuItem onClick={() => setConfirmExit(true)}>
                            <ListItemIcon>
                                <LogoutIcon fontSize="small"/>
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </Box>

                {/* Logout Confirmation Dialog */}
                <Dialog open={confirmExit} onClose={() => setConfirmExit(false)}>
                    <DialogTitle>Confirm Logout</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Are you sure you want to logout?</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={declinedLogoutClick} variant="contained" color="success">
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
                                    pointerEvents: 'none',
                                    opacity: 1,
                                }),
                            }}
                        >
                            {loggingOut ? 'Logging out...' : 'Yes'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </>
    )
        ;
}

export default TopNav;
