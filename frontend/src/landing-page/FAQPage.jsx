import React, { useState } from 'react';
import { Box, Typography, InputBase } from '@mui/material';
import Navbar from './Navbar';
import AboutImage from '../assets/AboutImage.png';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import HelpOutlineIcon from '@mui/icons-material/HelpOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutlined';

const categories = [
    "All", "General", "Features", "How It Works", "Reports & Data", "Privacy & Security", "Account & Billing"
];

const faqs = [
    {
        question: "What is Credly?",
        answer: "Credly is an AI-powered news credibility analysis platform that helps you identify fake news, analyze content, and make informed decisions. It uses advanced machine learning models and trusted data sources to deliver accurate credibility insights."
    },
    { question: "How does Credly detect fake news?", answer: "Credly analyzes content, source reliability, language patterns, and cross-references facts with trusted databases." },
    { question: "What kind of content can I analyze?", answer: "You can analyze news articles, blog posts, and opinion pieces by pasting text or providing a URL." },
    { question: "How accurate is Credly?", answer: "Our models achieve over 95% accuracy, continuously learning and adapting to new misinformation trends." },
    { question: "How long does it take to get results?", answer: "Most analyses are completed in under 3 seconds." },
    { question: "Can I download or share reports?", answer: "Yes, detailed reports can be downloaded as PDFs or shared via direct links." },
    { question: "Is my data safe with Credly?", answer: "Absolutely. We prioritize your privacy and do not store or share your personal analysis data." },
    { question: "Do you offer an API for developers?", answer: "Yes, we offer a robust API for integrating Credly's analysis engine into your own platforms." },
    { question: "How do I get started with Credly?", answer: "Simply sign up for a free account and start analyzing URLs or text immediately." },
    { question: "What are the pricing plans?", answer: "We offer a free tier for basic users and premium plans for heavy users and enterprise clients." }
];

const popularTopics = [
    "Understanding Credibility Scores",
    "How AI Analysis Works",
    "Interpreting Reports",
    "Data Sources & Reliability",
    "Privacy & Data Security"
];

const FAQPage = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [expandedIndex, setExpandedIndex] = useState(0); // First one open by default

    const toggleFaq = (index) => {
        setExpandedIndex(expandedIndex === index ? -1 : index);
    };

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
                            FREQUENTLY ASKED QUESTIONS
                        </Typography>
                    </Box>

                    <Typography sx={{ fontSize: { xs: '36px', md: '48px' }, fontWeight: 800, mb: 3, lineHeight: 1.2 }}>
                        Everything You Need <br />
                        To Know <Box component="span" sx={{
                            color: '#e11d48'
                        }}>
                            About Credly
                        </Box>
                    </Typography>

                    <Typography sx={{ fontSize: '15px', color: '#9ca3af', mb: 5, maxWidth: '450px', lineHeight: 1.6 }}>
                        Find answers to the most common questions about Credly and how it helps you identify fake news and stay informed.
                    </Typography>

                    {/* Search Bar */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        bgcolor: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid #1f2937',
                        borderRadius: '12px',
                        px: 2,
                        py: 1.5,
                        width: '100%',
                        maxWidth: '500px'
                    }}>
                        <SearchIcon sx={{ color: '#6b7280', mr: 1.5 }} />
                        <InputBase 
                            placeholder="Search your question..."
                            sx={{ color: '#fff', width: '100%', fontSize: '14px' }}
                        />
                    </Box>
                </Box>

                {/* Right Content - Mockup Image */}
                <Box sx={{ width: '50%', display: 'flex', justifyContent: 'flex-end', position: 'relative' }}>
                    <img 
                        src={AboutImage} 
                        alt="FAQ Graphic" 
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

            {/* Categories */}
            <Box sx={{ 
                px: { xs: 4, md: 8 }, 
                mb: 6,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                width: '100%',
                boxSizing: 'border-box'
            }}>
                {categories.map((cat, index) => (
                    <Box 
                        key={index} 
                        onClick={() => setActiveCategory(cat)}
                        sx={{
                            border: '1px solid',
                            borderColor: activeCategory === cat ? 'rgba(225, 29, 72, 0.5)' : '#1f2937',
                            bgcolor: activeCategory === cat ? 'rgba(225, 29, 72, 0.1)' : 'transparent',
                            borderRadius: '20px',
                            px: 3,
                            py: 1,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                borderColor: 'rgba(225, 29, 72, 0.3)'
                            }
                        }}
                    >
                        <Typography sx={{ 
                            fontSize: '13px', 
                            fontWeight: activeCategory === cat ? 600 : 500,
                            color: activeCategory === cat ? '#fff' : '#9ca3af'
                        }}>
                            {cat}
                        </Typography>
                    </Box>
                ))}
            </Box>

            {/* Main Content Split */}
            <Box sx={{ 
                px: { xs: 4, md: 8 }, 
                display: 'flex',
                gap: 6,
                width: '100%',
                boxSizing: 'border-box'
            }}>
                {/* Left Side: FAQs */}
                <Box sx={{ width: '65%', display: 'flex', flexDirection: 'column', gap: 2,mb:5 }}>
                    {faqs.map((faq, index) => {
                        const isOpen = expandedIndex === index;
                        return (
                            <Box 
                                key={index} 
                                onClick={() => toggleFaq(index)}
                                sx={{
                                    border: '1px solid #1f2937',
                                    borderRadius: '12px',
                                    bgcolor: isOpen ? 'rgba(255,255,255,0.02)' : 'transparent',
                                    cursor: 'pointer',
                                    overflow: 'hidden',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        borderColor: 'rgba(255,255,255,0.2)'
                                    }
                                }}
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3 }}>
                                    <Typography sx={{ fontSize: '15px', fontWeight: 600, color: isOpen ? '#fff' : '#d1d5db' }}>
                                        {faq.question}
                                    </Typography>
                                    {isOpen ? 
                                        <ExpandLessIcon sx={{ color: '#e11d48' }} /> : 
                                        <ExpandMoreIcon sx={{ color: '#6b7280' }} />
                                    }
                                </Box>
                                
                                {isOpen && (
                                    <Box sx={{ px: 3, pb: 3 }}>
                                        <Typography sx={{ fontSize: '14px', color: '#9ca3af', lineHeight: 1.6 }}>
                                            {faq.answer}
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        );
                    })}
                </Box>

                {/* Right Side: Side Panels */}
                <Box sx={{ width: '35%', display: 'flex', flexDirection: 'column', gap: 3 }}>
                    
                    {/* Still Have Questions */}
                    <Box sx={{
                        border: '1px solid #1f2937',
                        borderRadius: '16px',
                        p: 4,
                        bgcolor: 'rgba(255,255,255,0.01)'
                    }}>
                        <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
                            <HelpOutlineIcon sx={{ fontSize: 36, color: '#e11d48' }} />
                            <Box>
                                <Typography sx={{ fontSize: '16px', fontWeight: 700, mb: 1 }}>Still Have Questions?</Typography>
                                <Typography sx={{ fontSize: '13px', color: '#9ca3af', lineHeight: 1.5 }}>
                                    Can't find the answer you're looking for? Our support team is here to help.
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', pl: 7.5 }}>
                            <Box sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 1,
                                border: '1px solid rgba(225, 29, 72, 0.3)',
                                borderRadius: '8px',
                                px: 2, py: 1,
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                '&:hover': { bgcolor: 'rgba(225, 29, 72, 0.1)' }
                            }}>
                                <EmailOutlinedIcon sx={{ fontSize: 16, color: '#e11d48' }} />
                                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#d1d5db' }}>Contact Support</Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Popular Topics */}
                    <Box sx={{
                        border: '1px solid #1f2937',
                        borderRadius: '16px',
                        p: 4,
                        bgcolor: 'rgba(255,255,255,0.01)'
                    }}>
                        <Typography sx={{ fontSize: '16px', fontWeight: 700, mb: 3 }}>Popular Topics</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                            {popularTopics.map((topic, idx) => (
                                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer', '&:hover p': { color: '#e11d48' } }}>
                                    <ArticleOutlinedIcon sx={{ fontSize: 18, color: '#ea580c' }} />
                                    <Typography sx={{ fontSize: '13px', color: '#9ca3af', transition: 'color 0.2s' }}>{topic}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    {/* Need Help Urgently */}
                    <Box sx={{
                        border: '1px solid #1f2937',
                        borderRadius: '16px',
                        p: 4,
                        bgcolor: 'rgba(255,255,255,0.01)'
                    }}>
                        <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
                            <SupportAgentIcon sx={{ fontSize: 36, color: '#e11d48' }} />
                            <Box>
                                <Typography sx={{ fontSize: '16px', fontWeight: 700, mb: 1 }}>Need Help Urgently?</Typography>
                                <Typography sx={{ fontSize: '13px', color: '#9ca3af', lineHeight: 1.5 }}>
                                    Our support team is available 24/7 to assist you.
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', pl: 7.5 }}>
                            <Box sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 1,
                                border: '1px solid rgba(225, 29, 72, 0.3)',
                                borderRadius: '8px',
                                px: 2, py: 1,
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                '&:hover': { bgcolor: 'rgba(225, 29, 72, 0.1)' }
                            }}>
                                <ChatBubbleOutlineIcon sx={{ fontSize: 16, color: '#e11d48' }} />
                                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#d1d5db' }}>Chat With Us</Typography>
                            </Box>
                        </Box>
                    </Box>

                </Box>
            </Box>

        </Box>
    );
};

export default FAQPage;
