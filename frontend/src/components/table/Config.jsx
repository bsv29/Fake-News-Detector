import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MoodOutlinedIcon from '@mui/icons-material/MoodOutlined';
import MoodBadOutlinedIcon from '@mui/icons-material/MoodBadOutlined';
import SentimentNeutralOutlinedIcon from '@mui/icons-material/SentimentNeutralOutlined';

const getStatusColor = (status, isDarkMode) => {
    switch (status) {
        case 'Credible':
            return { bg: isDarkMode ? 'rgba(46, 125, 50, 0.2)' : '#e8f5e9', text: isDarkMode ? '#81c784' : '#2e7d32' };
        case 'Potentially Misleading':
            return { bg: isDarkMode ? 'rgba(237, 108, 2, 0.2)' : '#fff3e0', text: isDarkMode ? '#ffb74d' : '#ed6c02' };
        case 'Not Credible':
            return { bg: isDarkMode ? 'rgba(211, 47, 47, 0.2)' : '#ffebee', text: isDarkMode ? '#e57373' : '#d32f2f' };
        default:
            return { bg: isDarkMode ? 'rgba(117, 117, 117, 0.2)' : '#e0e0e0', text: isDarkMode ? '#bdbdbd' : '#757575' };
    }
};

const getScoreColor = (score) => {
    if (score >= 80) return '#4caf50'; // Green
    if (score >= 50) return '#ff9800'; // Orange
    return '#f44336'; // Red
};

// Utility to format bytes to MB
const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

// Utility to format ISO date string
const formatDate = (isoString) => {
    if (!isoString) return '';
    // Ensure the string is treated as UTC if it lacks a timezone indicator
    let dateStr = String(isoString);
    if (!dateStr.endsWith('Z') && !dateStr.match(/[+-]\d{2}:\d{2}$/)) {
        // If it's a space-separated format from SQLite, replace space with 'T'
        dateStr = dateStr.replace(' ', 'T') + 'Z';
    }
    const date = new Date(dateStr);
    const options = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('en-GB', options).replace(',', '');
};

export const getColumns = (isDarkMode, handleDownload) => [
    {
        name: 'Document Title',
        selector: row => row.document_title || row.documentTitle,
        sortable: true,
        minWidth: '400px',
        cell: row => (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ 
                    bgcolor: isDarkMode ? 'rgba(211, 47, 47, 0.2)' : '#ffebee', 
                    color: isDarkMode ? '#e57373' : '#d32f2f', 
                    borderRadius: '8px',
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <PictureAsPdfIcon sx={{ fontSize: 18 }} />
                </Box>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: isDarkMode ? '#e5e7eb' : '#111827' }}>
                    {row.document_title || row.documentTitle}
                </Typography>
            </Box>
        ),
    },
    {
        name: 'Date Analyzed',
        selector: row => row.uploaded_at || row.dateAnalyzed,
        sortable: true,
        minWidth: '200px',
        cell: row => (
            <Typography sx={{ fontSize: '13px', color: isDarkMode ? '#9ca3af' : '#4B5563', fontWeight: 500 }}>
                {row.uploaded_at ? formatDate(row.uploaded_at) : row.dateAnalyzed}
            </Typography>
        ),
    },
    {
        name: 'Credibility Score',
        selector: row => row.credibility_score || row.credibilityScore,
        sortable: true,
        minWidth: '200px',
        cell: row => {
            const score = row.credibility_score !== undefined ? row.credibility_score : row.credibilityScore;
            return (
                <Box sx={{ width: '100%' }}>
                    <Typography sx={{ fontSize: '13px', fontWeight: 600, mb: 0.5, color: isDarkMode ? '#e5e7eb' : '#111827' }}>
                        {Math.round(score)}%
                    </Typography>
                    <Box sx={{ width: '100px', height: '4px', bgcolor: isDarkMode ? '#374151' : '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
                        <Box sx={{ 
                            width: `${score}%`, 
                            height: '100%', 
                            bgcolor: getScoreColor(score),
                            borderRadius: '4px'
                        }} />
                    </Box>
                </Box>
            );
        },
    },
    {
        name: 'Sentiment',
        selector: row => row.sentiment,
        sortable: true,
        minWidth: '150px',
        cell: row => {
            const sentimentStr = row.sentiment ? row.sentiment.toLowerCase() : 'neutral';
            let icon, color, bg;
            
            if (sentimentStr === 'positive') {
                icon = <MoodOutlinedIcon sx={{ fontSize: 16 }} />;
                color = isDarkMode ? '#81c784' : '#2e7d32';
                bg = isDarkMode ? 'rgba(46, 125, 50, 0.2)' : '#e8f5e9';
            } else if (sentimentStr === 'negative') {
                icon = <MoodBadOutlinedIcon sx={{ fontSize: 16 }} />;
                color = isDarkMode ? '#e57373' : '#d32f2f';
                bg = isDarkMode ? 'rgba(211, 47, 47, 0.2)' : '#ffebee';
            } else {
                icon = <SentimentNeutralOutlinedIcon sx={{ fontSize: 16 }} />;
                color = isDarkMode ? '#ffb74d' : '#ed6c02';
                bg = isDarkMode ? 'rgba(237, 108, 2, 0.2)' : '#fff3e0';
            }

            return (
                <Box sx={{ 
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.5,
                    bgcolor: bg, 
                    color: color,
                    px: 1.5,
                    py: 0.5,
                    borderRadius: '16px',
                    fontSize: '12px',
                    fontWeight: 600
                }}>
                    {icon}
                    {row.sentiment || 'Neutral'}
                </Box>
            );
        },
    },
    {
        name: 'Status',
        selector: row => row.status,
        sortable: true,
        minWidth: '180px',
        cell: row => {
            const colors = getStatusColor(row.status, isDarkMode);
            return (
                <Box sx={{ 
                    bgcolor: colors.bg, 
                    color: colors.text,
                    px: 1.5,
                    py: 0.5,
                    borderRadius: '16px',
                    fontSize: '12px',
                    fontWeight: 600
                }}>
                    {row.status}
                </Box>
            );
        },
    },
    {
        name: 'File Size',
        selector: row => row.file_size || row.fileSize,
        sortable: true,
        minWidth: '120px',
        cell: row => (
            <Typography sx={{ fontSize: '13px', color: isDarkMode ? '#9ca3af' : '#4B5563', fontWeight: 500 }}>
                {row.file_size !== undefined ? formatBytes(row.file_size) : row.fileSize}
            </Typography>
        ),
    },
    {
        name: 'Actions',
        minWidth: '150px',
        cell: (row) => (
            <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton size="small" onClick={() => handleDownload(row)} sx={{ border: isDarkMode ? '1px solid #374151' : '1px solid #E5E7EB', borderRadius: '8px' }}>
                    <DownloadOutlinedIcon sx={{ fontSize: 16, color: isDarkMode ? '#9ca3af' : '#4B5563' }} />
                </IconButton>
            </Box>
        ),
    },
];

export const getCustomStyles = (isDarkMode) => ({
    tableWrapper: {
        style: {
            borderRadius: '16px',
            backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
        }
    },
    table: {
        style: {
            backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
        }
    },
    headRow: {
        style: {
            backgroundColor: isDarkMode ? '#1e1e1e' : 'transparent',
            borderBottom: isDarkMode ? '1px solid #374151' : '1px solid #E5E7EB',
            minHeight: '48px',
        },
    },
    headCells: {
        style: {
            fontSize: '12px',
            fontWeight: 600,
            color: isDarkMode ? '#9ca3af' : '#6B7280',
            textTransform: 'none',
        },
    },
    rows: {
        style: {
            backgroundColor: isDarkMode ? '#1e1e1e' : 'transparent',
            minHeight: '64px',
            color: isDarkMode ? '#e5e7eb' : 'inherit',
            borderBottomColor: isDarkMode ? '#374151' : '#E5E7EB',
            '&:hover': {
                backgroundColor: isDarkMode ? '#2d2d2d' : '#F9FAFB',
            },
        },
    },
    cells: {
        style: {
            paddingTop: '8px',
            paddingBottom: '8px',
        },
    },
    pagination: {
        style: {
            borderTop: isDarkMode ? '1px solid #374151' : '1px solid #E5E7EB',
            backgroundColor: isDarkMode ? '#1e1e1e' : 'transparent',
            color: isDarkMode ? '#9ca3af' : 'inherit',
        },
    },
});
