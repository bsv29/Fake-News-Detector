import React from 'react';
import { Box, Typography } from '@mui/material';
import Navbar from './Navbar';
import AboutImage from '../assets/AboutImage.png';

// Icons for Mission/Vision
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import TrackChangesOutlinedIcon from '@mui/icons-material/TrackChangesOutlined';

// Icons for Why We Built Credly
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import GppBadOutlinedIcon from '@mui/icons-material/GppBadOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

// Icons for Credly By The Numbers
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import AdjustOutlinedIcon from '@mui/icons-material/AdjustOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';

// Icons for Our Values
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';

const whyWeBuilt = [
    {
        icon: <PublicOutlinedIcon sx={{ fontSize: 32, color: '#e11d48' }} />,
        title: "Information Overload",
        desc: "Every day, millions of articles and posts are shared online. Not all of them are true."
    },
    {
        icon: <GppBadOutlinedIcon sx={{ fontSize: 32, color: '#e11d48' }} />,
        title: "Misinformation Risk",
        desc: "Fake news can influence opinions, cause confusion, and even create real-world harm."
    },
    {
        icon: <PsychologyOutlinedIcon sx={{ fontSize: 32, color: '#e11d48' }} />,
        title: "AI-Powered Solution",
        desc: "We combine advanced machine learning with trusted sources to identify misleading content."
    },
    {
        icon: <PersonOutlineOutlinedIcon sx={{ fontSize: 32, color: '#e11d48' }} />,
        title: "Human-Centered",
        desc: "We make complex analysis simple and explainable so everyone can understand and trust the results."
    }
];

const byTheNumbers = [
    {
        icon: <GroupsOutlinedIcon sx={{ fontSize: 32, color: '#e11d48' }} />,
        value: "10K+",
        title: "Active Users",
        desc: "Join thousands of users fighting misinformation every day."
    },
    {
        icon: <DescriptionOutlinedIcon sx={{ fontSize: 32, color: '#e11d48' }} />,
        value: "25K+",
        title: "Articles Analyzed",
        desc: "Trusted by individuals, students, researchers, and professionals."
    },
    {
        icon: <AdjustOutlinedIcon sx={{ fontSize: 32, color: '#e11d48' }} />,
        value: "95.6%",
        title: "Accuracy Rate",
        desc: "High accuracy through advanced AI models and continuous learning."
    },
    {
        icon: <TimerOutlinedIcon sx={{ fontSize: 32, color: '#e11d48' }} />,
        value: "2.3s",
        title: "Avg. Analysis Time",
        desc: "Get results in seconds with real-time AI processing."
    },
    {
        icon: <GppGoodOutlinedIcon sx={{ fontSize: 32, color: '#e11d48' }} />,
        value: "100%",
        title: "Privacy First",
        desc: "We respect your privacy. Your data is secure and never shared."
    }
];

const values = [
    {
        icon: <VerifiedOutlinedIcon sx={{ fontSize: 20, color: '#e11d48' }} />,
        title: "Truth First",
        desc: "We prioritize accuracy, fairness, and truth in everything we do."
    },
    {
        icon: <SearchOutlinedIcon sx={{ fontSize: 20, color: '#e11d48' }} />,
        title: "Transparency",
        desc: "We believe in clear, explainable, and open AI-driven insights."
    },
    {
        icon: <LockOutlinedIcon sx={{ fontSize: 20, color: '#e11d48' }} />,
        title: "Privacy & Security",
        desc: "Your data is yours. We keep it private and secure."
    },
    {
        icon: <TrendingUpOutlinedIcon sx={{ fontSize: 20, color: '#e11d48' }} />,
        title: "Continuous Improvement",
        desc: "We learn, adapt, and improve to stay ahead of misinformation."
    }
];

const About = () => {
    return (
        <Box sx={{ 
            bgcolor: '#050A14', 
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
            minHeight: '100vh',
            height: '100vh',
            overflowY: 'auto',
            overflowX: 'hidden',
            pb: 10,
            '&::-webkit-scrollbar': { display: 'none' },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none'
        }}>
            <Navbar />

            {/* Header Section */}
            <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'space-between',
                px: { xs: 4, md: 8 }, 
                py: 6, 
                width: '100%', 
                boxSizing: 'border-box' 
            }}>
                {/* Left Content */}
                <Box sx={{ width: '50%', pr: 4 }}>
                    <Box sx={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        border: '1px solid #1f2937', 
                        borderRadius: '20px', 
                        px: 2, 
                        py: 0.75,
                        mb: 4
                    }}>
                        <Typography sx={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1px', color: '#9ca3af' }}>
                            ABOUT CREDLY
                        </Typography>
                    </Box>

                    <Typography sx={{ fontSize: { xs: '36px', md: '48px' }, fontWeight: 800, mb: 3, lineHeight: 1.2 }}>
                        Building Trust In The <br />
                        Digital Information <Box component="span" sx={{
                            background: 'linear-gradient(90deg, #e11d48 0%, #ea580c 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>
                            Age
                        </Box>
                    </Typography>

                    <Typography sx={{ fontSize: '16px', color: '#9ca3af', mb: 6, maxWidth: '600px', lineHeight: 1.6 }}>
                        Credly was created with a simple mission: to help people separate fact from fiction in a world overflowing with information. We use advanced AI and trusted data sources to deliver credibility insights you can rely on.
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: 'rgba(225, 29, 72, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <VerifiedUserOutlinedIcon sx={{ color: '#e11d48' }} />
                            </Box>
                            <Box>
                                <Typography sx={{ fontSize: '14px', fontWeight: 700, mb: 0.5 }}>Our Mission</Typography>
                                <Typography sx={{ fontSize: '12px', color: '#9ca3af', lineHeight: 1.5, maxWidth: '200px' }}>
                                    Empower everyone to make informed decisions with trustworthy information.
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: 'rgba(225, 29, 72, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <TrackChangesOutlinedIcon sx={{ color: '#e11d48' }} />
                            </Box>
                            <Box>
                                <Typography sx={{ fontSize: '14px', fontWeight: 700, mb: 0.5 }}>Our Vision</Typography>
                                <Typography sx={{ fontSize: '12px', color: '#9ca3af', lineHeight: 1.5, maxWidth: '200px' }}>
                                    A world where truth is easy to find, understand, and trust.
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* Right Content - Mockup Image */}
                <Box sx={{ width: '50%', display: 'flex', justifyContent: 'flex-end', position: 'relative' }}>
                    <img 
                        src={AboutImage} 
                        alt="About Credly Graphic" 
                        style={{ 
                            width: '100%', 
                            maxWidth: '550px',
                            height: 'auto',
                            objectFit: 'contain',
                            filter: 'drop-shadow(0 20px 40px rgba(225,29,72,0.15))'
                        }} 
                    />
                </Box>
            </Box>

            {/* Why We Built Credly */}
            <Box sx={{ px: { xs: 4, md: 8 }, py: 6, width: '100%', boxSizing: 'border-box' }}>
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography sx={{ fontSize: '24px', fontWeight: 700, mb: 2 }}>
                        Why We Built <Box component="span" sx={{ color: '#e11d48' }}>Credly</Box>
                    </Typography>
                    <Typography sx={{ fontSize: '14px', color: '#9ca3af' }}>
                        Misinformation spreads fast. Its impact is real. Credly helps you slow it down.
                    </Typography>
                </Box>

                <Box sx={{ 
                    display: 'flex', 
                    flexWrap: 'nowrap',
                    gap: '24px',
                    width: '100%',
                    boxSizing: 'border-box'
                }}>
                    {whyWeBuilt.map((item, index) => (
                        <Box key={index} sx={{ 
                            width: 'calc(25% - 18px)', // 3 gaps of 24px = 72px. 72 / 4 = 18px
                            display: 'flex'
                        }}>
                            <Box sx={{
                                bgcolor: '#0B0F19',
                                border: '1px solid #1E293B',
                                borderRadius: '16px',
                                p: 4,
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                boxSizing: 'border-box'
                            }}>
                                <Box sx={{ 
                                    width: 60, height: 60, borderRadius: '50%', 
                                    bgcolor: 'rgba(225, 29, 72, 0.05)', 
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    mb: 3
                                }}>
                                    {item.icon}
                                </Box>
                                <Typography sx={{ fontSize: '16px', fontWeight: 700, mb: 2 }}>
                                    {item.title}
                                </Typography>
                                <Typography sx={{ fontSize: '13px', color: '#9ca3af', lineHeight: 1.6, flexGrow: 1 }}>
                                    {item.desc}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Credly By The Numbers */}
            <Box sx={{ px: { xs: 4, md: 8 }, py: 6, width: '100%', boxSizing: 'border-box' }}>
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography sx={{ fontSize: '24px', fontWeight: 700 }}>
                        Credly <Box component="span" sx={{ color: '#ea580c' }}>By The Numbers</Box>
                    </Typography>
                </Box>

                <Box sx={{ 
                    display: 'flex', 
                    flexWrap: 'nowrap',
                    gap: '24px',
                    width: '100%',
                    boxSizing: 'border-box'
                }}>
                    {byTheNumbers.map((stat, index) => (
                        <Box key={index} sx={{ 
                            width: 'calc(20% - 19.2px)', // 4 gaps of 24px = 96px. 96 / 5 = 19.2px
                            display: 'flex'
                        }}>
                            <Box sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                px: 2,
                                borderRight: index !== byTheNumbers.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                                boxSizing: 'border-box'
                            }}>
                                <Box sx={{ mb: 2 }}>
                                    {stat.icon}
                                </Box>
                                <Typography sx={{ fontSize: '32px', fontWeight: 800, mb: 1, color: '#fff' }}>
                                    {stat.value}
                                </Typography>
                                <Typography sx={{ fontSize: '14px', fontWeight: 700, mb: 2, color: '#d1d5db' }}>
                                    {stat.title}
                                </Typography>
                                <Typography sx={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.6, flexGrow: 1 }}>
                                    {stat.desc}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>

        </Box>
    );
};

export default About;
