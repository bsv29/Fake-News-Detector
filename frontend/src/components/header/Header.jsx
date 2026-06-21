import React, { useState } from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    IconButton,
    TextField,
    Avatar,
    Menu,
    MenuItem,
    Divider,
    InputAdornment,
    Breadcrumbs,
    Link
} from '@mui/material';
import {
    Search,
    Notifications,
    Logout,
    LockReset,
    DarkModeOutlined,
    LightModeOutlined
} from '@mui/icons-material';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import { useLocation, useNavigate, Link as RouterLink } from 'react-router-dom';
import { useThemeMode } from '../../hooks/useThemeMode';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../assets/Logo.png';
import DarkLogo from '../../assets/DarkLogo.png';

export default function Header({ sidebarOpen, setSidebarOpen }) {
    const [anchorEl, setAnchorEl] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const { theme: themeMode, toggleTheme, isDarkMode } = useThemeMode()
    const { user, logout } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    const avatarInitial = user?.username ? user.username.charAt(0).toUpperCase() : 'U';
    const displayUsername = user?.username || 'User';

    const shellColors = {
        panel: isDarkMode ? '#0B0F19' : '#ffffff',
        border: isDarkMode ? '#1E293B' : '#CFD7E7',
        text: isDarkMode ? '#F9FAFB' : '#111827',
        muted: isDarkMode ? '#9CA3AF' : '#7B839D',
        input: isDarkMode ? '#111827' : '#f8fafc',
        inputBorder: isDarkMode ? '#1E293B' : '#e2e8f0',
        accent: isDarkMode ? '#148EC3' : '#148EC3',
        hover: isDarkMode ? '#1F2937' : '#f1f5f9',
        subtle: isDarkMode ? '#111827' : '#f8fafc'
    };

    const routeTitles = {
        '/dashboard': 'Dashboard',
        '/analytics-page': 'Analytics',
        '/history-page': 'History',
        '/results-page': 'Results',
    }

    const breadcrumbs = [
        { label: 'Home', path: '/dashboard' },
        ...(routeTitles[location.pathname] ? [{ label: routeTitles[location.pathname], path: location.pathname }] : []),
    ]

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleNavigate = (path) => {
        navigate(path)
    }

    const handleThemeToggle = () => {
        toggleTheme();
    }

    const handleSearchSubmit = (event) => {
        if (event.key === 'Enter' && searchTerm.trim()) {
            event.preventDefault()
        }
    }


    return (
        <Box
            sx={{
                width: '100%',
                height: '60px',
                flexShrink: 0,
                display: "flex",
                py: 0.5,
                boxSizing: 'border-box',
            }}
        >
            <Box sx={{
                display: 'flex',
                borderRadius: "16px", // matches sidebar
                alignItems: 'center',
                pl: sidebarOpen ? "14px" : 0,
                transition: "width 0.3s ease",
                width: sidebarOpen ? "310px" : "60px",
                ml: "7px",
                justifyContent: sidebarOpen ? "flex-start" : "center",
                bgcolor: shellColors.panel,
                border: `2px solid ${shellColors.border}`,
                boxSizing: 'border-box',
                overflow: 'hidden',
                height: '56px' // standard height
            }}>
                {/* 1. Circular Logo Container */}
                <Box sx={{
                    width: '38px',
                    height: '38px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    flexShrink: 0,
                    ml: 0.5
                }}>
                    <img src={isDarkMode ? DarkLogo : Logo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </Box>

                {/* 3. Text Section / App Name */}
                {sidebarOpen && (
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', ml: 1 }}>
                        <Typography sx={{ 
                            fontSize: '20px', 
                            fontWeight: 800, 
                            letterSpacing: '0.5px',
                            background: 'linear-gradient(90deg, #8A1538 0%, #A65612 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>
                            Credly
                        </Typography>
                    </Box>
                )}

                {/* 4. Decorative Dots Grid (Far Right) */}
                {sidebarOpen && (
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 3px)',
                        gap: '3.5px',
                        mr: '25px',
                        opacity: 0.45,
                        flexShrink: 0
                    }}>
                        <IconButton
                            onClick={() => setSidebarOpen && setSidebarOpen(false)}
                            sx={{
                                width: 34,
                                height: 34,
                                position: 'relative',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    inset: 0,
                                    borderRadius: '8px',
                                    padding: '1.5px',
                                    background: 'linear-gradient(90deg, #8A1538 0%, #A65612 100%)',
                                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                    WebkitMaskComposite: 'xor',
                                    maskComposite: 'exclude',
                                },
                                borderRadius: '8px',
                                p: 0,
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 3px)',
                                gap: '3px',
                                justifyContent: 'center',
                                alignContent: 'center',
                                transition: 'all 0.2s',
                                '&:hover': { bgcolor: isDarkMode ? '#1f2937' : '#D5DAE6' }
                            }}
                        >
                            {[...Array(9)].map((_, i) => (
                                <Box key={i} sx={{ width: 3, height: 3, background: isDarkMode ? '#9db9e8ff' : 'linear-gradient(90deg, #8A1538 0%, #A65612 100%)', borderRadius: '50%' }} />
                            ))}
                        </IconButton>
                    </Box>
                )}
            </Box>

            <Box sx={{
                bgcolor: shellColors.panel,
                border: `2px solid ${shellColors.border}`,
                display: "flex",
                alignItems: 'center',
                flexGrow: 1,
                borderRadius: "16px",
                px: '16px',
                ml: "7px",
                mr: "7px",
                boxSizing: 'border-box',
                height: '56px',
                overflow: 'hidden'
            }}>
                
                {/* Welcome Message */}
                <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'column', whiteSpace: 'nowrap' }}>
                    <Typography sx={{ fontSize: '18px', fontWeight: 600, color: shellColors.text, letterSpacing: '0.2px' }}>
                        Welcome back, <Box component="span" sx={{ 
                            fontWeight: 800,
                            textTransform: 'capitalize',
                            background: 'linear-gradient(90deg, #8A1538 0%, #A65612 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>{displayUsername}</Box> 👋
                    </Typography>
                </Box>

                <Box sx={{ flexGrow: 1 }} />

                {/* Right Side Tools */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, width: '100%', justifyContent: 'flex-end' }}>
                    <TextField
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        onKeyDown={handleSearchSubmit}
                        size="small"
                        placeholder="Search"
                        sx={{
                            width: {
                                xs: 160,
                                md: 'clamp(320px, 68%, 560px)',
                            },
                            maxWidth: '68%',
                            minWidth: 160,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '999px',
                                height: 38,
                                bgcolor: shellColors.input,
                                color: shellColors.text,
                                '& fieldset': {
                                    borderColor: shellColors.inputBorder,
                                },
                                '&:hover fieldset': {
                                    borderColor: shellColors.accent,
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: shellColors.accent,
                                },
                            },
                            '& .MuiInputBase-input': {
                                fontSize: '13px',
                                py: '9px',
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search sx={{ fontSize: 18, color: shellColors.muted }} />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <IconButton
                        onClick={handleThemeToggle}
                        sx={{
                            border: `1.5px solid ${shellColors.inputBorder}`,
                            bgcolor: shellColors.input,
                            width: 38,
                            height: 38,
                            borderRadius: '10px',
                            transition: 'all 0.2s ease',
                            '&:hover': { bgcolor: shellColors.hover },
                        }}
                    >
                        <svg width="0" height="0" style={{ position: 'absolute' }}>
                            <linearGradient id="theme-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#8A1538" />
                                <stop offset="100%" stopColor="#A65612" />
                            </linearGradient>
                        </svg>
                        {themeMode === 'dark' ? (
                            <LightModeOutlined sx={{ fontSize: 20, '& path': { fill: 'url(#theme-gradient)' } }} />
                        ) : (
                            <DarkModeOutlined sx={{ fontSize: 20, '& path': { fill: 'url(#theme-gradient)' } }} />
                        )}
                    </IconButton>


                    {/* User Avatar */}
                    <Avatar
                        onClick={handleOpen}
                        sx={{
                            background: 'linear-gradient(90deg, #8A1538 0%, #A65612 100%)',
                            fontWeight: 700,
                            width: 34,
                            height: 34,
                            fontSize: '14.5px',
                            cursor: "pointer",
                            transition: 'all 0.2s',
                            '&:hover': { transform: 'scale(1.06)' }
                        }}
                    >
                        {avatarInitial}
                    </Avatar>
                </Box>
            </Box>
            {/* </Toolbar> */}
            {/* Dropdown menu */}
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={Boolean(anchorEl)}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            minWidth: 210,
                            borderRadius: '12px',
                            border: `1px solid ${shellColors.border}`,
                            mt: 5.5,
                            overflow: 'hidden',
                            bgcolor: shellColors.panel,
                            color: shellColors.text,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
                {/* User profile header */}
                <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: shellColors.subtle }}>
                    <Avatar sx={{ background: 'linear-gradient(90deg, #8A1538 0%, #A65612 100%)', width: 34, height: 34, fontSize: '14px', fontWeight: 700, }}>
                        {avatarInitial}
                    </Avatar>
                    <Box>
                        <Typography sx={{ fontSize: '13px', fontWeight: 700, color: shellColors.text, lineHeight: 1.3, cursor: "default" }}>
                            {displayUsername}
                        </Typography>
                        <Typography sx={{ fontSize: '11px', color: shellColors.muted, cursor: "default" }}>Logged in</Typography>
                    </Box>
                </Box>

                <Divider sx={{ borderColor: shellColors.border }} />

                <Box sx={{ p: 0.8 }}>
                    <MenuItem
                        onClick={() => handleNavigate('/reset-password')}
                        sx={{ gap: 1.5, py: 0.9, px: 1.5, borderRadius: '8px', color: shellColors.text, '&:hover': { bgcolor: shellColors.hover } }}
                    >
                        <LockReset sx={{ color: '#148EC3', fontSize: 17 }} />
                        <Typography sx={{ fontSize: '13px', color: shellColors.text, fontWeight: 500 }}>Reset password</Typography>
                    </MenuItem>
                    <MenuItem
                        onClick={logout}
                        sx={{ gap: 1.5, py: 0.9, px: 1.5, borderRadius: '8px', color: '#EF4444', '&:hover': '#FFF1F2' }}
                    >
                        <Logout sx={{ color: '#EF4444', fontSize: 17 }} />
                        <Typography sx={{ fontSize: '13px', color: '#EF4444', fontWeight: 500 }}>Sign out</Typography>
                    </MenuItem>
                </Box>
            </Menu>
        </Box >
    );
}