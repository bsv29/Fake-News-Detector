import React from 'react';
import { Box, Typography, Button, InputBase } from '@mui/material';
import Navbar from './Navbar';

// Icons
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import SendIcon from '@mui/icons-material/Send';
import HelpOutlineIcon from '@mui/icons-material/HelpOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutlined';

const contactMethods = [
    {
        icon: <EmailOutlinedIcon sx={{ color: '#e11d48' }} />,
        title: "Email Us",
        detail: "support@credly.ai",
        subtext: "We reply within 24 hours"
    },
    {
        icon: <PhoneInTalkOutlinedIcon sx={{ color: '#e11d48' }} />,
        title: "Call Us",
        detail: "+91 98765 43210",
        subtext: "Mon - Fri, 9:00 AM - 6:00 PM IST"
    },
    {
        icon: <LocationOnOutlinedIcon sx={{ color: '#e11d48' }} />,
        title: "Our Location",
        detail: "Bengaluru, Karnataka, India",
        subtext: "We're a remote-first team"
    }
];

const helpTopics = [
    { icon: <HelpOutlineIcon sx={{ fontSize: 32, color: '#e11d48' }} />, title: "General Inquiries", desc: "Have a question about Credly? We're happy to help." },
    { icon: <HandshakeOutlinedIcon sx={{ fontSize: 32, color: '#e11d48' }} />, title: "Partnerships", desc: "Explore partnership and collaboration opportunities." },
    { icon: <BusinessCenterOutlinedIcon sx={{ fontSize: 32, color: '#e11d48' }} />, title: "Business Solutions", desc: "Looking for solutions for your organization? Let's talk." },
    { icon: <SupportAgentOutlinedIcon sx={{ fontSize: 32, color: '#e11d48' }} />, title: "Technical Support", desc: "Need help with our platform? Our support team is here." },
    { icon: <CampaignOutlinedIcon sx={{ fontSize: 32, color: '#e11d48' }} />, title: "Press & Media", desc: "For media inquiries and press related requests." },
    { icon: <LightbulbOutlinedIcon sx={{ fontSize: 32, color: '#e11d48' }} />, title: "Feedback", desc: "We value your feedback to improve and serve you better." }
];

const CustomInput = ({ label, placeholder, multiline = false }) => (
    <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#d1d5db', mb: 1 }}>{label}</Typography>
        <Box sx={{
            bgcolor: 'rgba(255,255,255,0.02)',
            border: '1px solid #1f2937',
            borderRadius: '8px',
            px: 2,
            py: multiline ? 2 : 1.5,
            height: multiline ? '120px' : 'auto',
            display: 'flex',
            alignItems: multiline ? 'flex-start' : 'center',
            '&:focus-within': {
                borderColor: 'rgba(225, 29, 72, 0.5)'
            }
        }}>
            <InputBase 
                placeholder={placeholder}
                multiline={multiline}
                sx={{ color: '#fff', width: '100%', fontSize: '14px', alignItems: 'flex-start' }}
            />
        </Box>
    </Box>
);

const Contact = () => {
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

            {/* Top Section */}
            <Box sx={{ 
                px: { xs: 4, md: 8 }, 
                py: 6, 
                display: 'flex',
                gap: 8,
                width: '100%',
                boxSizing: 'border-box'
            }}>
                {/* Left Side */}
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
                            WE'D LOVE TO HEAR FROM YOU
                        </Typography>
                    </Box>

                    <Typography sx={{ fontSize: { xs: '36px', md: '48px' }, fontWeight: 800, mb: 3, lineHeight: 1.2 }}>
                        Let's Connect & <br />
                        Build A Smarter <br />
                        <Box component="span" sx={{ color: '#ea580c' }}>
                            Information World
                        </Box>
                    </Typography>

                    <Typography sx={{ fontSize: '15px', color: '#9ca3af', mb: 6, maxWidth: '450px', lineHeight: 1.6 }}>
                        Have questions, feedback, or partnership opportunities? Our team is here to help you with everything you need.
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {contactMethods.map((method, idx) => (
                            <Box key={idx} sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: 3,
                                p: 3,
                                borderRadius: '16px',
                                border: '1px solid #1f2937',
                                bgcolor: 'rgba(255,255,255,0.01)',
                                width: '100%',
                                maxWidth: '450px'
                            }}>
                                <Box sx={{ 
                                    width: 50, height: 50, borderRadius: '50%', 
                                    bgcolor: 'rgba(225, 29, 72, 0.05)', 
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    border: '1px solid rgba(225, 29, 72, 0.1)'
                                }}>
                                    {method.icon}
                                </Box>
                                <Box>
                                    <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#d1d5db', mb: 0.5 }}>{method.title}</Typography>
                                    <Typography sx={{ fontSize: '15px', fontWeight: 600, color: '#fff', mb: 0.5 }}>{method.detail}</Typography>
                                    <Typography sx={{ fontSize: '12px', color: '#6b7280' }}>{method.subtext}</Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>

                {/* Right Side - Form */}
                <Box sx={{ width: '50%', display: 'flex', justifyContent: 'flex-start' }}>
                    <Box sx={{
                        bgcolor: '#0B0F19',
                        border: '1px solid #1E293B',
                        borderRadius: '24px',
                        p: 5,
                        width: '100%',
                        maxWidth: '550px'
                    }}>
                        <Typography sx={{ fontSize: '24px', fontWeight: 700, mb: 1, color: '#fff' }}>Send Us A Message</Typography>
                        <Typography sx={{ fontSize: '13px', color: '#9ca3af', mb: 4 }}>Fill out the form below and our team will get back to you.</Typography>

                        <CustomInput label="Full Name" placeholder="Enter your full name" />
                        <CustomInput label="Email Address" placeholder="Enter your email address" />
                        <CustomInput label="Subject" placeholder="What is this regarding?" />
                        <CustomInput label="Message" placeholder="Type your message here..." multiline={true} />

                        <Button 
                            variant="contained"
                            endIcon={<SendIcon sx={{ fontSize: 18 }} />}
                            sx={{
                                width: '100%',
                                background: 'linear-gradient(90deg, #8A1538 0%, #A65612 100%)',
                                color: 'white',
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontWeight: 600,
                                py: 1.5,
                                mt: 2,
                                boxShadow: 'none',
                                '&:hover': {
                                    opacity: 0.9,
                                    boxShadow: '0 4px 15px rgba(225, 29, 72, 0.2)'
                                }
                            }}
                        >
                            Send Message
                        </Button>
                    </Box>
                </Box>
            </Box>

            {/* Middle Section - Help Topics */}
            <Box sx={{ px: { xs: 4, md: 8 }, py: 8, width: '100%', boxSizing: 'border-box' }}>
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography sx={{ fontSize: '24px', fontWeight: 700, mb: 1 }}>
                        We're Here To <Box component="span" sx={{ color: '#ea580c' }}>Help You</Box>
                    </Typography>
                    <Typography sx={{ fontSize: '14px', color: '#9ca3af' }}>
                        Reach out to us for any of the following or anything else you need.
                    </Typography>
                </Box>

                <Box sx={{ 
                    display: 'flex', 
                    flexWrap: 'nowrap',
                    gap: '20px',
                    width: '100%',
                    boxSizing: 'border-box'
                }}>
                    {helpTopics.map((topic, index) => (
                        <Box key={index} sx={{ 
                            width: 'calc(16.666% - 16.66px)', // 5 gaps of 20px = 100px. 100 / 6 = 16.66px
                            display: 'flex'
                        }}>
                            <Box sx={{
                                bgcolor: 'rgba(255,255,255,0.01)',
                                border: '1px solid #1f2937',
                                borderRadius: '16px',
                                p: 3,
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                boxSizing: 'border-box'
                            }}>
                                <Box sx={{ mb: 3 }}>
                                    {topic.icon}
                                </Box>
                                <Typography sx={{ fontSize: '14px', fontWeight: 700, mb: 1.5, color: '#d1d5db' }}>
                                    {topic.title}
                                </Typography>
                                <Typography sx={{ fontSize: '11px', color: '#6b7280', lineHeight: 1.6, flexGrow: 1 }}>
                                    {topic.desc}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Bottom Banner Section */}
            <Box sx={{ px: { xs: 4, md: 8 }, pb: 8, width: '100%', boxSizing: 'border-box' }}>
                <Box sx={{
                    bgcolor: '#0B0F19',
                    border: '1px solid rgba(225, 29, 72, 0.15)',
                    borderRadius: '24px',
                    p: 5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* Glow effect */}
                    <Box sx={{
                        position: 'absolute',
                        left: '-5%',
                        bottom: '-50%',
                        width: '30%',
                        height: '200%',
                        background: 'radial-gradient(circle, rgba(225,29,72,0.1) 0%, transparent 70%)',
                        zIndex: 0
                    }} />

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, zIndex: 1 }}>
                        <Box sx={{ 
                            width: 100, height: 70, borderRadius: '16px', 
                            border: '1px solid #e11d48', 
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 0 30px rgba(225,29,72,0.2)'
                        }}>
                            <MailOutlineIcon sx={{ fontSize: 40, color: '#e11d48' }} />
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: '24px', fontWeight: 700, mb: 1 }}>Stay In The Loop</Typography>
                            <Typography sx={{ fontSize: '13px', color: '#9ca3af', maxWidth: '350px', lineHeight: 1.5 }}>
                                Subscribe to our newsletter and get the latest updates, features, and insights directly in your inbox.
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ zIndex: 1, display: 'flex', width: '100%', maxWidth: '400px' }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            bgcolor: 'rgba(255,255,255,0.02)',
                            border: '1px solid #1f2937',
                            borderRadius: '8px',
                            p: 0.5,
                            width: '100%',
                            '&:focus-within': { borderColor: 'rgba(225, 29, 72, 0.5)' }
                        }}>
                            <InputBase 
                                placeholder="Enter your email address"
                                sx={{ color: '#fff', width: '100%', fontSize: '13px', px: 2 }}
                            />
                            <Button 
                                variant="contained"
                                sx={{
                                    minWidth: 'unset',
                                    p: 1.5,
                                    bgcolor: '#b91c1c',
                                    borderRadius: '6px',
                                    '&:hover': { bgcolor: '#991b1b' }
                                }}
                            >
                                <SendIcon sx={{ fontSize: 16 }} />
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>

        </Box>
    );
};

export default Contact;
