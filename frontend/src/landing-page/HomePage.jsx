import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import Navbar from './Navbar';
import HomeRightImage from '../assets/HomeRightImage.png';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ 
            minHeight: '100vh', 
            bgcolor: '#050A14', // Very dark background like screenshot
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif'
        }}>
            <Navbar />

            <Box sx={{ 
                flex: 1, 
                display: 'flex', 
                flexDirection: { xs: 'column', lg: 'row' },
                alignItems: 'center',
                justifyContent: 'space-between',
                px: { xs: 4, md: 8 },
                py: { xs: 6, md: 4 },
                width: '100%',
                boxSizing: 'border-box',
                gap: { xs: 6, lg: 0 }
            }}>
                {/* Left Content */}
                <Box sx={{ width: { xs: '100%', lg: '45%' }, pr: { xs: 0, lg: 4 } }}>
                    
                    {/* Badge */}
                    <Box sx={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        border: '1px solid #1f2937', 
                        borderRadius: '20px', 
                        px: 2, 
                        py: 0.75,
                        mb: 4
                    }}>
                        <Typography sx={{ 
                            fontSize: '12px', 
                            fontWeight: 600, 
                            letterSpacing: '1px',
                            color: '#9ca3af'
                        }}>
                            AI POWERED • TRUSTED ANALYSIS
                        </Typography>
                    </Box>

                    {/* Heading */}
                    <Typography sx={{ 
                        fontSize: { xs: '40px', md: '56px' }, 
                        fontWeight: 800, 
                        lineHeight: 1.1,
                        mb: 3
                    }}>
                        Detect Fake News <br />
                        Before It Shapes <br />
                        <Box component="span" sx={{
                            background: 'linear-gradient(90deg, #e11d48 0%, #ea580c 100%)', // Brighter gradient for heading
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>
                            Your Opinion.
                        </Box>
                    </Typography>

                    {/* Subtitle */}
                    <Typography sx={{ 
                        fontSize: '16px', 
                        color: '#9ca3af', 
                        lineHeight: 1.6,
                        mb: 5,
                        maxWidth: '90%'
                    }}>
                        Advanced AI-powered credibility analysis that helps you identify misinformation, evaluate source reliability, detect clickbait, and understand why content can be trusted or questioned.
                    </Typography>

                    {/* Buttons */}
                    <Box sx={{ display: 'flex', gap: 2, mb: 6 }}>
                        <Button 
                            variant="contained"
                            startIcon={<UploadFileOutlinedIcon />}
                            onClick={() => navigate('/login')}
                            sx={{
                                background: 'linear-gradient(90deg, #e11d48 0%, #ea580c 100%)',
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontWeight: 600,
                                px: 4,
                                py: 1.5,
                                fontSize: '15px',
                                boxShadow: '0 4px 14px rgba(225, 29, 72, 0.4)',
                                '&:hover': {
                                    boxShadow: '0 6px 20px rgba(225, 29, 72, 0.6)',
                                }
                            }}
                        >
                            Analyze Article
                        </Button>
                        
                        <Button 
                            variant="outlined"
                            startIcon={<PlayCircleOutlineIcon />}
                            sx={{
                                color: '#fff',
                                borderColor: '#374151',
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontWeight: 600,
                                px: 4,
                                py: 1.5,
                                fontSize: '15px',
                                '&:hover': {
                                    borderColor: '#4b5563',
                                    bgcolor: 'rgba(255,255,255,0.05)'
                                }
                            }}
                        >
                            Explore Features
                        </Button>
                    </Box>

                    {/* Feature List Below Buttons */}
                    <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Box sx={{ width: 40, height: 40, borderRadius: '10px', bgcolor: 'rgba(225, 29, 72, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <VerifiedUserOutlinedIcon sx={{ color: '#ea580c', fontSize: 20 }} />
                            </Box>
                            <Typography sx={{ fontSize: '13px', fontWeight: 500, color: '#d1d5db', maxWidth: '100px', lineHeight: 1.3 }}>
                                Trusted Source Verification
                            </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Box sx={{ width: 40, height: 40, borderRadius: '10px', bgcolor: 'rgba(225, 29, 72, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <SmartToyOutlinedIcon sx={{ color: '#ea580c', fontSize: 20 }} />
                            </Box>
                            <Typography sx={{ fontSize: '13px', fontWeight: 500, color: '#d1d5db', maxWidth: '100px', lineHeight: 1.3 }}>
                                AI Credibility Analysis
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Box sx={{ width: 40, height: 40, borderRadius: '10px', bgcolor: 'rgba(225, 29, 72, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <BarChartOutlinedIcon sx={{ color: '#ea580c', fontSize: 20 }} />
                            </Box>
                            <Typography sx={{ fontSize: '13px', fontWeight: 500, color: '#d1d5db', maxWidth: '100px', lineHeight: 1.3 }}>
                                Explainable Predictions
                            </Typography>
                        </Box>
                    </Box>

                </Box>

                {/* Right Content - Mockup Image */}
                <Box sx={{ width: { xs: '100%', lg: '55%' }, display: 'flex', justifyContent: { xs: 'center', lg: 'flex-end' }, position: 'relative' }}>
                    {/* Add a subtle glow behind the image */}
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '80%',
                        height: '80%',
                        background: 'radial-gradient(circle, rgba(225,29,72,0.15) 0%, rgba(0,0,0,0) 70%)',
                        zIndex: 0,
                        filter: 'blur(40px)'
                    }} />
                    <img 
                        src={HomeRightImage} 
                        alt="Credly Dashboard Analytics" 
                        style={{ 
                            width: '100%', 
                            height: 'auto',
                            objectFit: 'contain',
                            position: 'relative',
                            zIndex: 1,
                            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))'
                        }} 
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default HomePage;
