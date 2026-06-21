import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../assets/Logo.png';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navLinks = [
        { label: 'Home', path: '/' },
        { label: 'Features', path: '/features' },
        { label: 'How It Works', path: '/how-it-works' },
        { label: 'About', path: '/about' },
        { label: 'FAQ', path: '/faq' },
        { label: 'Contact', path: '/contact' },
    ];

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: { xs: 4, md: 8 },
            py: 3,
            bgcolor: 'transparent',
            width: '100%',
            boxSizing: 'border-box'
        }}>
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
                <Box sx={{ width: 40, height: 40, mr: 1.5 }}>
                    <img src={Logo} alt="Credly Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </Box>
                <Typography sx={{ 
                    fontSize: '24px', 
                    fontWeight: 800, 
                    color: '#fff',
                    letterSpacing: '0.5px'
                }}>
                    Credly
                </Typography>
            </Box>

            {/* Links */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
                {navLinks.map((link, index) => {
                    const isActive = location.pathname === link.path || (link.path === '/' && location.pathname === '/home');
                    return (
                        <Box key={index} onClick={() => navigate(link.path)} sx={{ position: 'relative', cursor: 'pointer', '&:hover .underline': { width: '100%' } }}>
                            <Typography sx={{ 
                                color: isActive ? '#fff' : '#9ca3af', 
                                fontSize: '15px', 
                                fontWeight: isActive ? 600 : 500,
                                transition: 'color 0.3s'
                            }}>
                                {link.label}
                            </Typography>
                            {isActive && (
                                <Box sx={{
                                    position: 'absolute',
                                    bottom: -6,
                                    left: 0,
                                    width: '100%',
                                    height: '2px',
                                    background: 'linear-gradient(90deg, #e11d48 0%, #ea580c 100%)',
                                    borderRadius: '2px'
                                }} />
                            )}
                            {!isActive && (
                                <Box className="underline" sx={{
                                    position: 'absolute',
                                    bottom: -6,
                                    left: 0,
                                    width: '0%',
                                    height: '2px',
                                    background: 'linear-gradient(90deg, #e11d48 0%, #ea580c 100%)',
                                    borderRadius: '2px',
                                    transition: 'width 0.3s ease'
                                }} />
                            )}
                        </Box>
                    );
                })}
            </Box>

            {/* Actions */}
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                    variant="outlined" 
                    onClick={() => navigate('/login')}
                    sx={{ 
                        color: '#fff', 
                        borderColor: '#374151', 
                        textTransform: 'none', 
                        borderRadius: '8px',
                        px: 3,
                        fontWeight: 600,
                        '&:hover': { borderColor: '#4b5563', bgcolor: 'rgba(255,255,255,0.05)' }
                    }}
                >
                    Login
                </Button>
                <Button 
                    variant="contained" 
                    onClick={() => navigate('/signup')}
                    sx={{ 
                        background: 'linear-gradient(90deg, #8A1538 0%, #A65612 100%)',
                        color: '#fff', 
                        textTransform: 'none', 
                        borderRadius: '8px',
                        px: 3,
                        fontWeight: 600,
                        boxShadow: 'none',
                        '&:hover': { opacity: 0.9, boxShadow: 'none' }
                    }}
                >
                    Get Started
                </Button>
            </Box>
        </Box>
    );
};

export default Navbar;
