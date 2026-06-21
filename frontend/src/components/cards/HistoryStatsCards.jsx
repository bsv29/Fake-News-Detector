import React from 'react';
import { Box, Typography } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import FlagIcon from '@mui/icons-material/Flag';
import GppBadIcon from '@mui/icons-material/GppBad';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useThemeMode } from '../../hooks/useThemeMode';

const StatCard = ({ stat, isDarkMode }) => {
    // For this simple integration, we'll keep the static "+24%" change placeholders
    // as calculating historical diffs requires more complex backend time-series logic
    const isPositive = stat.changeType === 'positive';

    return (
        <Box sx={{ 
            p: 2, 
            borderRadius: '16px', 
            border: isDarkMode ? '1px solid #374151' : '1px solid #E5E7EB',
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            bgcolor: isDarkMode ? '#1e1e1e' : '#ffffff',
            flex: 1,
            minWidth: '220px'
        }}>
            <Box sx={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                bgcolor: stat.iconBg,
                color: stat.iconColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                '& svg': { fontSize: 28 }
            }}>
                {stat.icon}
            </Box>
            <Box>
                <Typography sx={{ color: isDarkMode ? '#9ca3af' : '#6B7280', fontSize: '13px', fontWeight: 600, mb: 0.5 }}>
                    {stat.title}
                </Typography>
                <Typography sx={{ color: isDarkMode ? '#e5e7eb' : '#111827', fontSize: '28px', fontWeight: 700, lineHeight: 1.2, mb: 0.5 }}>
                    {stat.value}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {isPositive ? (
                        <ArrowUpwardIcon sx={{ fontSize: 14, color: '#15803D' }} />
                    ) : (
                        <ArrowDownwardIcon sx={{ fontSize: 14, color: '#B91C1C' }} />
                    )}
                    <Typography sx={{ 
                        fontSize: '12px', 
                        fontWeight: 600, 
                        color: isPositive ? (isDarkMode ? '#4ade80' : '#15803D') : (isDarkMode ? '#f87171' : '#B91C1C') 
                    }}>
                        {stat.change}
                    </Typography>
                    <Typography sx={{ fontSize: '12px', color: isDarkMode ? '#9ca3af' : '#6B7280', fontWeight: 500 }}>
                        vs last month
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

const HistoryStatsCards = ({ stats }) => {
    const { isDarkMode } = useThemeMode();
    // Default to 0 if stats is undefined while loading
    const s = stats || { totalAnalyses: 0, credibleCount: 0, misleadingCount: 0, notCredibleCount: 0 };

    const dynamicStatsData = [
        {
            title: "Total Analyses",
            value: s.totalAnalyses.toString(),
            change: "+24%",
            changeType: "positive",
            icon: <InsertDriveFileIcon />,
            iconBg: '#EDE9FE',
            iconColor: '#6D28D9'
        },
        {
            title: "Credible",
            value: s.credibleCount.toString(),
            change: "+18%",
            changeType: "positive",
            icon: <VerifiedUserIcon />,
            iconBg: '#DCFCE7',
            iconColor: '#15803D'
        },
        {
            title: "Potentially Misleading",
            value: s.misleadingCount.toString(),
            change: "-8%",
            changeType: "negative",
            icon: <FlagIcon />,
            iconBg: isDarkMode ? 'rgba(194, 65, 12, 0.2)' : '#FFEDD5',
            iconColor: isDarkMode ? '#ffb74d' : '#C2410C'
        },
        {
            title: "Not Credible",
            value: s.notCredibleCount.toString(),
            change: "-3%",
            changeType: "negative",
            icon: <GppBadIcon />,
            iconBg: isDarkMode ? 'rgba(185, 28, 28, 0.2)' : '#FEE2E2',
            iconColor: isDarkMode ? '#f87171' : '#B91C1C'
        }
    ];

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {dynamicStatsData.map((stat, index) => (
                <StatCard key={index} stat={stat} isDarkMode={isDarkMode} />
            ))}
        </Box>
    );
};

export default HistoryStatsCards;
