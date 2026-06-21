import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import Navbar from './Navbar';
import HomeRightImage from '../assets/HomeRightImage.png';
import PsychologyIcon from '@mui/icons-material/Psychology';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const FeaturesPage = () => {
    const features = [
        {
            icon: <PsychologyIcon sx={{ fontSize: 28, color: '#ea580c' }} />,
            title: "AI-Powered Analysis",
            description: "Advanced machine learning models analyze content deeply to detect misinformation patterns and hidden signals.",
            points: ["NLP & Deep Learning Models", "Pattern & Anomaly Detection", "Continuous Model Improvement"]
        },
        {
            icon: <VerifiedUserOutlinedIcon sx={{ fontSize: 28, color: '#ea580c' }} />,
            title: "Source Credibility Check",
            description: "Evaluate the reliability of sources, authors, domains, and references using our multi-layer verification system.",
            points: ["Domain & Authority Scoring", "Author Reputation Check", "Reference Validation"]
        },
        {
            icon: <TrackChangesIcon sx={{ fontSize: 28, color: '#ea580c' }} />,
            title: "Clickbait Detection",
            description: "Identify sensational headlines, misleading claims, and attention-grabbing patterns that distort the truth.",
            points: ["Headline Analysis", "Language Pattern Detection", "Clickbait Risk Scoring"]
        },
        {
            icon: <ManageSearchIcon sx={{ fontSize: 28, color: '#ea580c' }} />,
            title: "Keyword Intelligence",
            description: "Extract meaningful keywords and topics to understand what an article is really about and how it's framed.",
            points: ["Topic Extraction", "Keyword Relevance Scoring", "Contextual Understanding"]
        },
        {
            icon: <LightbulbOutlinedIcon sx={{ fontSize: 28, color: '#ea580c' }} />,
            title: "Explainable Results",
            description: "We don't just give a score — we explain why. Understand the factors behind every prediction with clarity.",
            points: ["Factor Breakdown", "Highlighting Key Evidence", "Transparent Reasoning"]
        },
        {
            icon: <AssessmentOutlinedIcon sx={{ fontSize: 28, color: '#ea580c' }} />,
            title: "Detailed Reports",
            description: "Generate comprehensive reports with credibility scores, insights, and actionable recommendations.",
            points: ["Full Analysis Report", "Shareable PDF Reports", "Export & Download"]
        }
    ];

    return (
        <Box sx={{ 
            bgcolor: '#050A14', 
            color: '#fff',
            display: 'flex',
            mb: "10px",
            flexDirection: 'column',
            overflowX: 'hidden',
            fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
            height: '100vh',
            overflowY: 'auto',
            overflowX: 'hidden',
            pb: 10,
            '&::-webkit-scrollbar': {
                display: 'none'
            },
            msOverflowStyle: 'none',  // IE and Edge
            scrollbarWidth: 'none'    // Firefox
        }}>
            <Navbar />

            {/* Top Section */}
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                px: 8,
                py: 8,
                width: '100%',
                boxSizing: 'border-box'
            }}>
                {/* Center Content */}
                <Box sx={{ width: '100%', maxWidth: '800px' }}>
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
                            POWERFUL FEATURES
                        </Typography>
                    </Box>

                    {/* Heading */}
                    <Typography sx={{ 
                        fontSize: { xs: '36px', md: '48px' }, 
                        fontWeight: 800, 
                        lineHeight: 1.2,
                        mb: 3
                    }}>
                        Powerful Features For <br />
                        Smarter <Box component="span" sx={{
                            background: 'linear-gradient(90deg, #e11d48 0%, #ea580c 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>
                            Verification
                        </Box>
                    </Typography>

                    {/* Subtitle */}
                    <Typography sx={{ 
                        fontSize: '16px', 
                        color: '#9ca3af', 
                        lineHeight: 1.6,
                        maxWidth: '90%'
                    }}>
                        Credly combines advanced AI models with reliable data sources to deliver accurate, explainable, and actionable credibility insights.
                    </Typography>
                </Box>
            </Box>

            {/* Features Grid Section */}
            <Box sx={{ 
                px: 1.5, 
                // mt: 2,
                mb:4,
                display: 'flex',
                flexWrap: 'wrap',
                gap: '15px',
                width: '100%',
                boxSizing: 'border-box'
            }}>
                {features.map((feature, index) => (
                    <Box key={index} sx={{ width: 'calc(33.333% - 16px)', display: 'flex' }}>
                        <Box sx={{
                            bgcolor: '#0B0F19', // Slightly lighter than background
                            border: '1px solid #1E293B',
                            borderRadius: '16px',
                            p: 2,
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            boxSizing: 'border-box',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                borderColor: 'rgba(225, 29, 72, 0.4)',
                                boxShadow: '0 8px 30px rgba(225, 29, 72, 0.1)'
                            }
                        }}>
                            {/* Icon */}
                            <Box sx={{ 
                                width: 50, 
                                height: 50, 
                                borderRadius: '50%', 
                                bgcolor: 'rgba(225, 29, 72, 0.1)', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                mb: 1,
                                mx: 'auto'
                            }}>
                                {feature.icon}
                            </Box>

                            {/* Title */}
                            <Typography sx={{ 
                                fontSize: '18px', 
                                fontWeight: 700, 
                                mb: 2,
                                textAlign: 'center'
                            }}>
                                {feature.title}
                            </Typography>

                            {/* Description */}
                            <Typography sx={{ 
                                fontSize: '14px', 
                                color: '#9ca3af', 
                                lineHeight: 1.6,
                                mb: 4,
                                textAlign: 'center',
                                flexGrow: 1
                            }}>
                                {feature.description}
                            </Typography>

                            {/* Checklist */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 4 }}>
                                {feature.points.map((point, idx) => (
                                    <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <CheckCircleOutlineIcon sx={{ color: '#ea580c', fontSize: 18 }} />
                                        <Typography sx={{ fontSize: '13px', color: '#d1d5db' }}>
                                            {point}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default FeaturesPage;
