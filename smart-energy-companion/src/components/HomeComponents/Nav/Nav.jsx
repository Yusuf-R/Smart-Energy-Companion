'use client';
import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import BoltIcon from '@mui/icons-material/Bolt';
import AssessmentIcon from '@mui/icons-material/Assessment';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import {useRouter} from 'next/navigation';
import {alpha} from "@mui/material";

function Nav() {
    const router = useRouter();
    const theme = useTheme();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    const xSmall = useMediaQuery(theme.breakpoints.down('xs'));
    const small = useMediaQuery(theme.breakpoints.down('sm'));
    const medium = useMediaQuery(theme.breakpoints.down('md'));
    const large = useMediaQuery(theme.breakpoints.down('lg'));
    const xLarge = useMediaQuery(theme.breakpoints.down('xl'));

    const toggleDrawer = (open) => {
        setIsDrawerOpen(open);
    };

    const navigationLinks = [
        {
            text: 'Home',
            icon: HomeIcon,
            gradient: 'linear-gradient(45deg, #FF6B6B, #FFE66D)'
        },
        {
            text: 'About',
            icon: InfoIcon,
            gradient: 'linear-gradient(45deg, #4ECDC4, #45B7AF)'
        },
        {
            text: 'Literacy',
            icon: BoltIcon,
            gradient: 'linear-gradient(45deg, #FFD93D, #FF6B6B)'
        },
        {
            text: 'Analysis',
            icon: AssessmentIcon,
            gradient: 'linear-gradient(45deg, #6C63FF, #4ECDC4)'
        }
    ];

    const GetStarted = () => {
        router.push('/get-started');
    }

    return (
        <AppBar
            position="sticky"
            sx={{
                bgcolor: alpha("#000",1),
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: 'none',
                m:0,
                p : 0,
            }}
        >
            <Container maxWidth="xl" sx={{m:0, p : 0}}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        py: { xs: 1, sm: 1.2, md: 1.5 },
                        px: { xs: 0, sm: 1, md: 1 },
                    }}
                >
                    {/* Logo Section */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flex: { xs: '1 1 auto', md: '0 0 auto' },
                        }}
                    >
                        <Box
                            component="img"
                            src='/logo-1.png'
                            alt='Smart Energy Companion Logo'
                            sx={{
                                width: {
                                    xs: '30px',
                                    sm: '35px',
                                    md: '40px',
                                    lg: '50px',
                                    xl: '60px'
                                },
                                height: 'auto',
                                transition: 'transform 0.3s ease-in-out',
                                '&:hover': {
                                    transform: 'scale(1.1)'
                                }
                            }}
                        />
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: {
                                    xs: '1.1rem',
                                    sm: '1.2rem',
                                    md: '1.4rem',
                                    lg: '1.5rem'
                                },
                                fontWeight: 700,
                                letterSpacing: '0.02em',
                                color: 'white',
                                textDecoration: 'none',
                                ml: 0.5,
                                '& span': {
                                    display: 'inline-block',
                                    animation: 'colorFlow 4s infinite',
                                    '&:nth-of-type(1)': { animationDelay: '0.0s' },
                                    '&:nth-of-type(2)': { animationDelay: '0.2s' },
                                    '&:nth-of-type(3)': { animationDelay: '0.4s' },
                                    '&:nth-of-type(4)': { animationDelay: '0.6s' },
                                    '&:nth-of-type(5)': { animationDelay: '0.8s' },
                                    '&:nth-of-type(6)': { animationDelay: '1.0s' },
                                    '&:nth-of-type(7)': { animationDelay: '1.2s' },
                                    '&:nth-of-type(8)': { animationDelay: '1.4s' },
                                    '&:nth-of-type(9)': { animationDelay: '1.6s' },
                                    '&:nth-of-type(10)': { animationDelay: '1.8s' },
                                    '&:nth-of-type(11)': { animationDelay: '2.0s' },
                                    '&:nth-of-type(12)': { animationDelay: '2.2s' },
                                    '&:nth-of-type(13)': { animationDelay: '2.4s' },
                                    '&:nth-of-type(14)': { animationDelay: '2.6s' },
                                    '&:nth-of-type(15)': { animationDelay: '2.8s' },
                                    '&:nth-of-type(16)': { animationDelay: '3.0s' },
                                    '&:nth-of-type(17)': { animationDelay: '3.2s' },
                                    '&:nth-of-type(18)': { animationDelay: '3.4s' },
                                    '&:nth-of-type(19)': { animationDelay: '3.6s' },
                                    '&:nth-of-type(20)': { animationDelay: '3.8s' },
                                },
                                '@keyframes colorFlow': {
                                    '0%, 100%': {
                                        color: '#ffffff',
                                        textShadow: '2px 2px 4px rgba(0,0,0,0.2), 0 0 15px rgba(255,255,255,0.3)',
                                    },
                                    '25%': {
                                        color: '#46F0F9',
                                        textShadow: '2px 2px 4px rgba(0,0,0,0.3), 0 0 20px rgba(70,240,249,0.7)',
                                    },
                                    '50%': {
                                        color: '#7B61FF',
                                        textShadow: '2px 2px 4px rgba(0,0,0,0.3), 0 0 20px rgba(123,97,255,0.7)',
                                    },
                                    '75%': {
                                        color: '#00E676',
                                        textShadow: '2px 2px 4px rgba(0,0,0,0.3), 0 0 20px rgba(0,230,118,0.7)',
                                    }
                                }
                            }}
                        >
                            {'Smart Energy Companion'.split().map((letter, index) => (
                                <span key={index}>{letter}</span>
                            ))}
                        </Typography>
                    </Box>

                    {/* Navigation Links - Desktop */}
                    {!isMobile && (
                        <Stack
                            direction="row"
                            spacing={{ sm: 1, md: 2 }}
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                alignItems: 'center',
                                flex: '1 1 auto',
                                justifyContent: 'center',
                                mx: { md: 2, lg: 4 },
                                color: '#FFF'
                            }}
                        >
                            {navigationLinks.map((link) => (
                                <Button
                                    key={link.text}
                                    sx={{
                                        fontWeight: '600',
                                        fontSize: {
                                            xs: '0.9rem',
                                            sm: '1rem',
                                            md: '1.1rem',
                                            lg: '1.2rem'
                                        },
                                        color: 'white',
                                        padding: '8px 16px',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        background: 'transparent',
                                        borderRadius: '4px',
                                        mx: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        '& .MuiSvgIcon-root': {
                                            fontSize: {
                                                xs: '1.2rem',
                                                sm: '1.3rem',
                                                md: '1.4rem',
                                                lg: '1.5rem'
                                            },
                                            transition: 'all 0.3s ease',
                                            background: link.gradient,
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.3))',
                                        },
                                        '& span': {
                                            transition: 'all 0.3s ease',
                                            position: 'relative',
                                            zIndex: 2,
                                            background: link.gradient,
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            textShadow: '0 0 1px rgba(255,255,255,0.5)',
                                        },
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            background: 'linear-gradient(120deg, transparent, rgba(255,255,255,0.2), transparent)',
                                            transform: 'translateX(-100%)',
                                            transition: 'transform 0.6s ease',
                                        },
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '2px',
                                            background: link.gradient,
                                            transform: 'scaleX(0)',
                                            transformOrigin: 'center',
                                            transition: 'transform 0.4s ease',
                                        },
                                        '&:hover': {
                                            backgroundColor: 'transparent',
                                            '& .MuiSvgIcon-root': {
                                                transform: 'translateY(-2px) scale(1.1)',
                                                filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.5))',
                                            },
                                            '& span': {
                                                transform: 'translateY(-2px)',
                                                filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.5))',
                                            },
                                            '&::before': {
                                                transform: 'translateX(100%)',
                                            },
                                            '&::after': {
                                                transform: 'scaleX(1)',
                                            }
                                        }
                                    }}
                                    onClick={() => window.location = `/${link.text.toLowerCase().replace(' ', '-')}`}
                                >
                                    <link.icon />
                                    {link.text.split('').map((letter, index) => (
                                        <span key={index} style={{
                                            animationDelay: `${index * 0.1}s`,
                                            opacity: 0.99,
                                        }}>
                                            {letter}
                                        </span>
                                    ))}
                                </Button>
                            ))}
                        </Stack>
                    )}

                    {/* Get Started Button */}
                    {!isMobile && (
                        <Box
                            sx={{
                                display: { xs: 'none', md: 'block' },
                                flex: '0 0 auto',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            <Button
                                sx={{
                                    backgroundColor: '#46F0F9',
                                    color: '#0E1E1E',
                                    fontWeight: 'bold',
                                    size: 'small',
                                    fontSize: xSmall ? '14px' : small ? '16px' : '18px',
                                    padding: xSmall ? '6px 12px' : small ? '8px 14px' : medium ? '10px 16px' : '12px 20px',
                                    borderRadius: '15px',
                                    textTransform: 'none',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 15px rgba(70, 240, 249, 0.2)',
                                    '&:hover': {
                                        backgroundColor: '#34C0D9',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 6px 20px rgba(70, 240, 249, 0.3)'
                                    }
                                }}
                                onClick={GetStarted}
                            >
                                Get Started
                            </Button>
                        </Box>
                    )}

                    {/* Mobile Menu Button */}
                    {isMobile && (
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={() => toggleDrawer(true)}
                            sx={{
                                ml: 'auto',
                                color: '#46F0F9',
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}

                    {/* Mobile Drawer */}
                    <Drawer
                        anchor="right"
                        open={isDrawerOpen}
                        onClose={() => toggleDrawer(false)}
                        sx={{
                            '& .MuiDrawer-paper': {
                                background: 'rgba(17, 25, 40, 0.1)',
                                backdropFilter: 'blur(12px)',
                            },
                        }}
                    >
                        <Box
                            sx={{
                                width: { xs: 150, sm: 200 },
                                pt: { xs: 2, sm: 3 },
                            }}
                        >
                            <List>
                                {navigationLinks.map((link) => (
                                    <ListItemButton
                                        key={link.text}
                                        onClick={() => {
                                            toggleDrawer(false);
                                            window.location = `/${link.text.toLowerCase().replace(' ', '-')}`;
                                        }}
                                        sx={{
                                            py: { xs: 1.5, sm: 2 },
                                            px: { xs: 2, sm: 3 },
                                        }}
                                    >
                                        <link.icon sx={{
                                            mr: 2,
                                            color: '#46F0F9',
                                            fontSize: { xs: '1.2rem', sm: '1.4rem' }
                                        }} />
                                        <ListItemText
                                            primary={link.text}
                                            sx={{
                                                '& .MuiTypography-root': {
                                                    fontSize: { xs: '0.9rem', sm: '1rem' }
                                                },
                                                color: '#FFF',
                                            }}
                                        />
                                    </ListItemButton>
                                ))}
                            </List>
                            <Divider sx={{ my: { xs: 1, sm: 2 } }} />
                            <List>
                                <ListItemButton
                                    onClick={() => {
                                        toggleDrawer(false);
                                        router.push('/get-started');
                                    }}
                                    sx={{
                                        py: { xs: 1.5, sm: 2 },
                                        px: { xs: 2, sm: 3 },
                                    }}
                                >
                                    <ListItemText
                                        primary='Explore'
                                        onClick={GetStarted}
                                        sx={{
                                            '& .MuiTypography-root': {
                                                fontSize: { xs: '0.9rem', sm: '1rem' }
                                            },
                                            color: '#FFF',
                                        }}
                                    />
                                </ListItemButton>
                            </List>
                        </Box>
                    </Drawer>

                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Nav;
