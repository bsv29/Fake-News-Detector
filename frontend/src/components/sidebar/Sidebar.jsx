import React, { useState } from 'react';
import {
    Box,
    List,
    ListItemIcon,
    ListItemText,
    ListItemButton,
    IconButton,
} from '@mui/material';

import { NavLink, useLocation } from 'react-router-dom';
import { GoSidebarExpand } from "react-icons/go";
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import ViewKanbanOutlinedIcon from '@mui/icons-material/ViewKanbanOutlined';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeMode } from '../../hooks/useThemeMode';

export default function Sidebar({ open, setOpen }) {
    const location = useLocation();
    const fromOnboarding = location.state?.fromOnboarding;
    const { isDarkMode } = useThemeMode();

    const colors = {
        bg: isDarkMode ? '#0B0F19' : '#fff',
        border: isDarkMode ? '#1E293B' : '#CFD7E7',
        itemBg: isDarkMode ? 'transparent' : 'transparent',
        itemHoverBg: isDarkMode ? '#1F2937' : '#DCE3F0',
        itemColor: isDarkMode ? '#9CA3AF' : '#596080',
        itemHoverColor: isDarkMode ? '#F9FAFB' : '#3F3D8C',
        
        activeBg: 'linear-gradient(90deg, #8A1538 0%, #A65612 100%)',
        activeColor: '#ffffff',
        iconColor: isDarkMode ? '#6B7280' : '#7B839D',
        expandBtnColor: isDarkMode ? '#38BDF8' : '#148EC3',
        expandBtnBorder: isDarkMode ? '#334155' : '#C4CBD9',
        expandBtnBg: isDarkMode ? '#1E293B' : '#D5DAE6',
        expandBtnHover: isDarkMode ? '#334155' : '#C4CBD9',
    };

    const filterItems = [
        // {
        //     id: 'dashboard', label: 'Dashboard', icon: <Category fontSize="small" />,
        //     path: '/dashboard'
        // },
        {
            id: 'analytics-page', label: 'Analytics', icon: <FactCheckOutlinedIcon fontSize="small" />,
            path: '/analytics-page',
        },
        {
            id: 'history-page', label: 'History', icon: <ViewKanbanOutlinedIcon fontSize="small" />,
            path: '/history-page'
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0, x: -30 },
        show: {
            opacity: 1,
            x: 0,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.1,
                ease: "easeOut",
                duration: 0.4
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    return (
        <Box
            sx={{
                width: '100%',
                bgcolor: colors.bg,
                border: `2px solid ${colors.border}`,
                mt: '5px',
                borderRadius: '16px',
                height: "calc(100vh - 72px)",
                transition: "width 0.3s ease",
                boxSizing: 'border-box',
                overflow: 'hidden'
            }}
        >
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                px: open ? '16px' : '4px',
                pt: '20px',
                pb: '16px',
                boxSizing: 'border-box'
            }}>
                {/* Navigation Items List */}
                <motion.div
                    variants={fromOnboarding ? containerVariants : {}}
                    initial={fromOnboarding ? "hidden" : "show"}
                    animate="show"
                    style={{ flexGrow: 1, overflowY: 'auto', overflowX: 'hidden', marginBottom: 16 }}
                >
                    <List sx={{
                        py: 0,
                        '&::-webkit-scrollbar': { display: 'none' }
                    }}>
                        {filterItems.map((item) => {
                            const isLearning = item.id === 'learning';
                            const shouldHighlight = isLearning && fromOnboarding;
                            const isCurrentActive = location.pathname === item.path || (item.id === 'analytics-page' && location.pathname === '/results-page');

                            return (
                                <motion.div key={item.id} variants={fromOnboarding ? itemVariants : {}}>
                                    <Box sx={{ position: 'relative' }}>
                                        <ListItemButton
                                            component={NavLink}
                                            to={item.path}
                                            className={isCurrentActive ? 'active' : ''}
                                            sx={{
                                                borderRadius: '8px',
                                                mb: 0.8,
                                                py: open ? 1.2 : 0,
                                                px: open ? 1.5 : 0,
                                                width: open ? '100%' : '38px',
                                                height: open ? 'auto' : '38px',
                                                mx: open ? 0 : 'auto',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                color: colors.itemColor,
                                                transition: 'all 0.2s ease',
                                                // Pulse effect for highlighted item
                                                animation: shouldHighlight ? 'pulseGlow 2s infinite' : 'none',
                                                '@keyframes pulseGlow': {
                                                    '0%': { boxShadow: '0 0 0 0 rgba(79, 70, 229, 0.4)' },
                                                    '70%': { boxShadow: '0 0 0 6px rgba(79, 70, 229, 0)' },
                                                    '100%': { boxShadow: '0 0 0 0 rgba(79, 70, 229, 0)' }
                                                },
                                                '&:hover': {
                                                    backgroundColor: colors.itemHoverBg,
                                                    color: colors.itemHoverColor,
                                                    '& .MuiListItemIcon-root': { color: colors.itemHoverColor }
                                                },
                                                '&.active': {
                                                    background: `${colors.activeBg} !important`,
                                                    color: colors.activeColor,
                                                    '& .MuiListItemIcon-root': { color: colors.activeColor },
                                                    '&:hover': { background: `${colors.activeBg} !important` }
                                                },
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: open ? 1.8 : 0,
                                                    justifyContent: 'center',
                                                    color: colors.iconColor,
                                                    transition: 'color 0.2s ease',
                                                    '& svg': { fontSize: '20px' }
                                                }}
                                            >
                                                {item.icon}
                                            </ListItemIcon>

                                            {open && (
                                                <ListItemText
                                                    primary={item.label}
                                                    primaryTypographyProps={{
                                                        fontSize: '13.5px',
                                                        fontWeight: 600,
                                                        noWrap: true,
                                                        letterSpacing: '0.01em'
                                                    }}
                                                />
                                            )}
                                        </ListItemButton>

                                        {/* Floating Tooltip for Learning */}
                                        {shouldHighlight && open && (
                                            <motion.div
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 1.5, duration: 0.5, type: 'spring' }}
                                                style={{
                                                    position: 'absolute',
                                                    right: '-180px',
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    backgroundColor: '#111827',
                                                    color: '#fff',
                                                    padding: '8px 12px',
                                                    borderRadius: '8px',
                                                    fontSize: '12px',
                                                    fontWeight: 'bold',
                                                    zIndex: 50,
                                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                                    pointerEvents: 'none',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                Start your learning journey here 🚀
                                                {/* Tooltip Arrow */}
                                                <Box sx={{
                                                    position: 'absolute',
                                                    left: '-4px',
                                                    top: '50%',
                                                    transform: 'translateY(-50%) rotate(45deg)',
                                                    width: '8px',
                                                    height: '8px',
                                                    backgroundColor: '#111827'
                                                }} />
                                            </motion.div>
                                        )}
                                    </Box>
                                </motion.div>
                            );
                        })}
                    </List>
                </motion.div>

                {/* Footer Section */}
                {!open && (
                    <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'center', pb: 1 }}>
                        <IconButton
                            sx={{
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '8px',
                                width: 34,
                                height: 34,
                                background: 'linear-gradient(90deg, #8A1538 0%, #A65612 100%)',
                                transition: 'all 0.2s',
                                '&:hover': { opacity: 0.9 }
                            }}
                            onClick={() => setOpen(true)}
                        >
                            <GoSidebarExpand style={{ fontSize: '18px' }} />
                        </IconButton>
                    </Box>
                )}
            </Box>
        </Box>
    );
}

