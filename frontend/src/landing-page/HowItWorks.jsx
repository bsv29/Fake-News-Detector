import React from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import Navbar from './Navbar';

// Icons
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import MemoryOutlinedIcon from '@mui/icons-material/MemoryOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import TrackChangesOutlinedIcon from '@mui/icons-material/TrackChangesOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';

import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import DownloadIcon from '@mui/icons-material/Download';

const steps = [
    {
        num: 1,
        icon: <CloudUploadOutlinedIcon sx={{ fontSize: 32, color: '#e11d48' }} />,
        title: "Upload Article",
        desc: "Upload your news article or paste the URL. We support multiple formats for your convenience."
    },
    {
        num: 2,
        icon: <MemoryOutlinedIcon sx={{ fontSize: 32, color: '#e11d48' }} />,
        title: "AI Processing",
        desc: "Our AI analyzes the content, source, language patterns, keywords, and credibility signals in real-time."
    },
    {
        num: 3,
        icon: <VerifiedUserOutlinedIcon sx={{ fontSize: 32, color: '#e11d48' }} />,
        title: "Credibility Assessment",
        desc: "We evaluate multiple factors including source reliability, sentiment, clickbait score, and factual consistency."
    },
    {
        num: 4,
        icon: <DescriptionOutlinedIcon sx={{ fontSize: 32, color: '#e11d48' }} />,
        title: "View Results",
        desc: "Get a comprehensive credibility report with scores, insights, and explainable reasoning."
    },
    {
        num: 5,
        icon: <FileDownloadOutlinedIcon sx={{ fontSize: 32, color: '#e11d48' }} />,
        title: "Download Report",
        desc: "Download or share your detailed report and make informed decisions with confidence."
    }
];

const features = [
    {
        icon: <PsychologyOutlinedIcon sx={{ fontSize: 28, color: '#e11d48' }} />,
        title: "Advanced AI Models",
        desc: "State-of-the-art machine learning models trained on millions of news articles and credible sources."
    },
    {
        icon: <StorageOutlinedIcon sx={{ fontSize: 28, color: '#e11d48' }} />,
        title: "Trusted Data Sources",
        desc: "We use reliable databases, fact-checking websites, and authoritative sources for accurate analysis."
    },
    {
        icon: <TrackChangesOutlinedIcon sx={{ fontSize: 28, color: '#e11d48' }} />,
        title: "Multi-Layer Analysis",
        desc: "Deep analysis of content, source, context, sentiment, and patterns for thorough evaluation."
    },
    {
        icon: <LightbulbOutlinedIcon sx={{ fontSize: 28, color: '#e11d48' }} />,
        title: "Explainable Results",
        desc: "Every score comes with clear reasoning and insights you can understand and trust."
    },
    {
        icon: <GppGoodOutlinedIcon sx={{ fontSize: 28, color: '#e11d48' }} />,
        title: "Privacy Focused",
        desc: "Your data is secure and private. We do not store your articles or personal information."
    },
    {
        icon: <TimerOutlinedIcon sx={{ fontSize: 28, color: '#e11d48' }} />,
        title: "Real-Time Results",
        desc: "Get instant credibility insights in seconds, not hours or days."
    }
];

const pdfPoints = [
    "Step-by-step process explanation",
    "AI models and data sources overview",
    "Scoring methodology details",
    "Sample reports and use cases",
    "Best practices for accurate results"
];

const HowItWorks = () => {
    return (
        <Box sx={{ 
            bgcolor: '#050A14', 
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
            height: '100vh',
            overflowY: 'auto',
            overflowX: 'hidden',
            '&::-webkit-scrollbar': { display: 'none' },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none'
        }}>
            <Navbar />

            {/* Header Section */}
            <Box sx={{ textAlign: 'center', py: 3, px: 4 }}>
                <Box sx={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    border: '1px solid #1f2937', 
                    borderRadius: '20px', 
                    px: 2, 
                }}>
                    <Typography sx={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1px', color: '#9ca3af' }}>
                        SIMPLE PROCESS. POWERFUL RESULTS
                    </Typography>
                </Box>

                <Typography sx={{ fontSize: { xs: '36px', md: '48px' }, fontWeight: 800, mb: 2 }}>
                    How It <Box component="span" sx={{
                        background: 'linear-gradient(90deg, #e11d48 0%, #ea580c 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>
                        Works
                    </Box>
                </Typography>

                <Typography sx={{ fontSize: '15px', color: '#9ca3af', maxWidth: '600px', mx: 'auto', lineHeight: 1.6 }}>
                    Credly uses advanced AI and trusted data sources to analyze news content and deliver clear, reliable credibility insights in just a few easy steps.
                </Typography>
            </Box>

            {/* 5 Steps Section */}
            <Box sx={{ px: { xs: 4, md: 3 }, mb: 2, position: 'relative' }}>
                {/* Dotted Line Background */}
                <Box sx={{
                    position: 'absolute',
                    top: '20px',
                    left: '10%',
                    right: '10%',
                    height: '2px',
                    borderTop: '2px dashed #e11d48',
                    opacity: 0.3,
                    zIndex: 0,
                    display: { xs: 'none', md: 'block' }
                }} />

                <Box sx={{ 
                    display: 'flex', 
                    flexWrap: 'nowrap',
                    gap: '10px',
                    width: '100%',
                    boxSizing: 'border-box'
                }}>
                    {steps.map((step, index) => (
                        <Box key={index} sx={{ 
                            width: 'calc(20% - 12.8px)', // 16px gap * 4 = 64px total gap. 64 / 5 = 12.8px to subtract per item.
                            position: 'relative', 
                            zIndex: 1, 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center' 
                        }}>
                            {/* Number Badge */}
                            <Box sx={{ 
                                width: 40, height: 40, borderRadius: '50%', 
                                bgcolor: '#e11d48', color: '#fff', 
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontWeight: 700, fontSize: '16px', mb: 3,
                                border: '4px solid #050A14' // to break the dotted line smoothly
                            }}>
                                {step.num}
                            </Box>
                            
                            {/* Card */}
                            <Box sx={{
                                bgcolor: '#0B0F19',
                                border: '1px solid #1E293B',
                                borderRadius: '16px',
                                p: 3,
                                height: '100%', // this will stretch because parent doesn't have display:flex on the card itself, wait we need flex parent
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                                width: '100%',
                                boxSizing: 'border-box',
                                '&:hover': {
                                    borderColor: 'rgba(225, 29, 72, 0.4)',
                                    boxShadow: '0 8px 30px rgba(225, 29, 72, 0.1)'
                                }
                            }}>
                                {step.icon}
                                <Typography sx={{ fontSize: '15px', fontWeight: 700, mt: 2, mb: 1.5, color: '#fff' }}>
                                    {step.title}
                                </Typography>
                                <Typography sx={{ fontSize: '12px', color: '#9ca3af', lineHeight: 1.6, flexGrow: 1 }}>
                                    {step.desc}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Powerful Process Section */}
            <Box sx={{ 
                mx: { xs: 4, md: 4 }, 
                mb: 2,
                bgcolor: '#080C16',
                border: '1px solid #1f2937',
                borderRadius: '24px',
                p: { xs: 4, md: 3 },
                textAlign: 'center'
            }}>
                <Typography sx={{ fontSize: '22px', fontWeight: 700, color: '#fff', mb: 3 }}>
                    What Makes Our Process Powerful?
                </Typography>

                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '15px',
                    width: '100%',
                    boxSizing: 'border-box'
                }}>
                    {features.map((feature, index) => (
                        <Box key={index} sx={{ 
                            width: 'calc(33.333% - 16px)', // 3 items, 2 gaps of 24px = 48px. 48 / 3 = 16px
                            display: 'flex'
                        }}>
                            <Box sx={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center', 
                                textAlign: 'center',
                                width: '100%',
                                height: '100%'
                            }}>
                                <Box sx={{ 
                                    width: 50, height: 50, borderRadius: '50%', 
                                    bgcolor: 'rgba(225, 29, 72, 0.05)', 
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    mb: 2
                                }}>
                                    {feature.icon}
                                </Box>
                                <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#d1d5db', mb: 1.5 }}>
                                    {feature.title}
                                </Typography>
                                <Typography sx={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.6, flexGrow: 1 }}>
                                    {feature.desc}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Download Guide Section */}
            <Box sx={{ 
                mx: { xs: 4, md: 4 }, 
                bgcolor: '#0B0F19', // Slightly lighter dark background
                border: '1px solid rgba(225, 29, 72, 0.15)', // subtle red border
                borderRadius: '16px',
                p: { xs: 4, md: 3 },
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                gap: 2,
                mb:2,
            }}>
                {/* PDF Icon Graphic */}
                <Box sx={{ 
                    position: 'relative',
                    width: 120, height: 140,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0
                }}>
                    <PictureAsPdfOutlinedIcon sx={{ fontSize: 110, color: '#e11d48', opacity: 0.9 }} />
                    <Box sx={{
                        position: 'absolute', bottom: -5, right: -15,
                        width: 45, height: 45, borderRadius: '50%',
                        bgcolor: '#0B0F19', border: '1px solid rgba(225, 29, 72, 0.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <DownloadIcon sx={{ fontSize: 24, color: '#e11d48' }} />
                    </Box>
                </Box>

                {/* Content */}
                <Box sx={{ flex: 1.5, pr: { md: 4 } }}>
                    <Box sx={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        border: '1px solid rgba(225, 29, 72, 0.3)', 
                        borderRadius: '20px', 
                        px: 1.5, py: 0.5, mb: 2
                    }}>
                        <Typography sx={{ fontSize: '10px', fontWeight: 600, color: '#9ca3af', letterSpacing: '0.5px' }}>DETAILED GUIDE</Typography>
                    </Box>
                    <Typography sx={{ fontSize: '28px', fontWeight: 700, color: '#fff', mb: 2 }}>
                        See The Full Process In Detail
                    </Typography>
                    <Typography sx={{ fontSize: '14px', color: '#9ca3af', mb: 4, maxWidth: '450px', lineHeight: 1.6 }}>
                        Download our comprehensive guide to understand how Credly analyzes news credibility and delivers reliable insights.
                    </Typography>
                    <Button 
                        component="a"
                        href="/Credly_Help_Documentation.pdf"
                        download="Credly_Help_Documentation.pdf"
                        variant="contained"
                        startIcon={<DownloadIcon />}
                        sx={{
                            background: 'linear-gradient(90deg, #8A1538 0%, #A65612 100%)',
                            color: 'white',
                            borderRadius: '8px',
                            textTransform: 'none',
                            fontWeight: 600,
                            px: 3, py: 1.5,
                            boxShadow: 'none',
                            '&:hover': {
                                opacity: 0.9,
                                boxShadow: '0 4px 15px rgba(225, 29, 72, 0.2)'
                            }
                        }}
                    >
                        Download How It Works Guide (PDF)
                    </Button>
                </Box>

                {/* Checklist */}
                <Box sx={{ 
                    flex: 1, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 2.5,
                    borderLeft: { md: '1px solid rgba(225, 29, 72, 0.15)' },
                    pl: { md: 6 },
                    py: { md: 2 }
                }}>
                    {pdfPoints.map((point, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <CheckCircleOutlineIcon sx={{ color: '#e11d48', fontSize: 20 }} />
                            <Typography sx={{ fontSize: '13px', color: '#9ca3af', fontWeight: 500 }}>
                                {point}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

        </Box>
    );
};

export default HowItWorks;
