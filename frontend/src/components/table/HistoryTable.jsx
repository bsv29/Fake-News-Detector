import React, { useState } from 'react';
import { Box, TextField, InputAdornment, Select, MenuItem, Button, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import DataTable, { createTheme } from 'react-data-table-component';
import { getColumns, getCustomStyles } from './Config';
import { useThemeMode } from '../../hooks/useThemeMode';

// Create a dark theme for the internal datatable components like pagination icons
createTheme('dark', {
  text: {
    primary: '#e5e7eb',
    secondary: '#9ca3af',
  },
  background: {
    default: '#1e1e1e',
  },
  context: {
    background: '#cb4b16',
    text: '#FFFFFF',
  },
  divider: {
    default: '#374151',
  },
  action: {
    button: 'rgba(255,255,255,.54)',
    hover: 'rgba(255,255,255,.08)',
    disabled: 'rgba(255,255,255,.12)',
  },
}, 'dark');

const HistoryTable = ({ data = [] }) => {
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [scoreFilter, setScoreFilter] = useState('All Scores');
    const { isDarkMode } = useThemeMode();

    // Filter logic based on passed data
    const filteredItems = data.filter(
        item => {
            const title = item.document_title || item.documentTitle || '';
            const matchesSearch = title.toLowerCase().includes(searchText.toLowerCase());
            const matchesStatus = statusFilter === 'All Status' || item.status === statusFilter;
            
            // Score filtering logic
            const score = item.credibility_score || item.credibilityScore || 0;
            let matchesScore = true;
            if (scoreFilter === 'High (80-100%)') matchesScore = score >= 80;
            else if (scoreFilter === 'Medium (50-79%)') matchesScore = score >= 50 && score < 80;
            else if (scoreFilter === 'Low (0-49%)') matchesScore = score < 50;

            return matchesSearch && matchesStatus && matchesScore;
        }
    );

    const handleDownload = async (row) => {
        try {
            const token = localStorage.getItem('token');
            // We pass the basic params available in the history row to generate the PDF
            const url = `http://127.0.0.1:8000/api/v1/report/${row.id}`;
            const reportResp = await fetch(url, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!reportResp.ok) throw new Error('Failed to download report');
            
            const blob = await reportResp.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = `credly_report_${row.id}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.error('Download error:', error);
            alert('An error occurred while downloading the report.');
        }
    };

    return (
        <Box sx={{ 
            bgcolor: isDarkMode ? '#1e1e1e' : '#ffffff', 
            borderRadius: '16px', 
            border: isDarkMode ? '1px solid #374151' : '1px solid #E5E7EB',
            overflow: 'hidden'
        }}>
            {/* Filter Bar */}
            <Box sx={{ 
                p: 2, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                borderBottom: isDarkMode ? '1px solid #374151' : '1px solid #E5E7EB',
                flexWrap: 'wrap',
                // gap: 2
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1, flexWrap: 'wrap' }}>
                    {/* Search */}
                    <TextField
                        placeholder="Search by title or keyword..."
                        variant="outlined"
                        size="small"
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                                bgcolor: isDarkMode ? '#2d2d2d' : '#F9FAFB',
                                '& fieldset': { borderColor: isDarkMode ? '#4b5563' : '#E5E7EB' },
                                '&:hover fieldset': { borderColor: isDarkMode ? '#6b7280' : '#D1D5DB' },
                                '&.Mui-focused fieldset': { borderColor: '#148EC3' },
                                fontSize: '13px',
                                color: isDarkMode ? '#e5e7eb' : 'inherit'
                            },
                            '& .MuiInputBase-input::placeholder': {
                                color: isDarkMode ? '#9ca3af' : '#9ca3af',
                                opacity: 1
                            }
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: isDarkMode ? '#9ca3af' : '#9CA3AF', fontSize: 20 }} />
                                </InputAdornment>
                            )
                        }}
                    />

                    {/* Status Filter */}
                    <Select
                        size="small"
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                        displayEmpty
                        sx={{
                            borderRadius: '8px',
                            minWidth: '140px',
                            bgcolor: isDarkMode ? '#2d2d2d' : '#F9FAFB',
                            '& fieldset': { borderColor: isDarkMode ? '#4b5563' : '#E5E7EB' },
                            fontSize: '13px',
                            color: isDarkMode ? '#e5e7eb' : '#4B5563',
                            fontWeight: 500,
                            '.MuiSvgIcon-root': { color: isDarkMode ? '#9ca3af' : 'inherit' }
                        }}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    bgcolor: isDarkMode ? '#2d2d2d' : '#ffffff',
                                    color: isDarkMode ? '#e5e7eb' : 'inherit'
                                }
                            }
                        }}
                    >
                        <MenuItem value="All Status" sx={{ fontSize: '13px' }}>All Status</MenuItem>
                        <MenuItem value="Credible" sx={{ fontSize: '13px' }}>Credible</MenuItem>
                        <MenuItem value="Potentially Misleading" sx={{ fontSize: '13px' }}>Potentially Misleading</MenuItem>
                        <MenuItem value="Not Credible" sx={{ fontSize: '13px' }}>Not Credible</MenuItem>
                    </Select>

                    {/* Scores Filter */}
                    <Select
                        size="small"
                        value={scoreFilter}
                        onChange={e => setScoreFilter(e.target.value)}
                        displayEmpty
                        sx={{
                            borderRadius: '8px',
                            minWidth: '140px',
                            bgcolor: isDarkMode ? '#2d2d2d' : '#F9FAFB',
                            '& fieldset': { borderColor: isDarkMode ? '#4b5563' : '#E5E7EB' },
                            fontSize: '13px',
                            color: isDarkMode ? '#e5e7eb' : '#4B5563',
                            fontWeight: 500,
                            '.MuiSvgIcon-root': { color: isDarkMode ? '#9ca3af' : 'inherit' }
                        }}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    bgcolor: isDarkMode ? '#2d2d2d' : '#ffffff',
                                    color: isDarkMode ? '#e5e7eb' : 'inherit'
                                }
                            }
                        }}
                    >
                        <MenuItem value="All Scores" sx={{ fontSize: '13px' }}>All Scores</MenuItem>
                        <MenuItem value="High (80-100%)" sx={{ fontSize: '13px' }}>High (80-100%)</MenuItem>
                        <MenuItem value="Medium (50-79%)" sx={{ fontSize: '13px' }}>Medium (50-79%)</MenuItem>
                        <MenuItem value="Low (0-49%)" sx={{ fontSize: '13px' }}>Low (0-49%)</MenuItem>
                    </Select>

                    {/* Date Range (Placeholder) */}
                    <Button
                        variant="outlined"
                        startIcon={<CalendarTodayOutlinedIcon sx={{ fontSize: 16 }} />}
                        sx={{
                            borderColor: isDarkMode ? '#4b5563' : '#E5E7EB',
                            color: isDarkMode ? '#9ca3af' : '#6B7280',
                            bgcolor: isDarkMode ? '#2d2d2d' : '#F9FAFB',
                            textTransform: 'none',
                            fontWeight: 500,
                            borderRadius: '8px',
                            px: 2,
                            fontSize: '13px',
                            '&:hover': {
                                borderColor: isDarkMode ? '#6b7280' : '#D1D5DB',
                                bgcolor: isDarkMode ? '#374151' : '#F3F4F6'
                            }
                        }}
                    >
                        Select Date Range
                    </Button>
                </Box>

            </Box>

            {/* Data Table */}
            <Box sx={{ width: '100%' }}>
                <DataTable
                    theme={isDarkMode ? 'dark' : 'default'}
                    columns={getColumns(isDarkMode, handleDownload)}
                    data={filteredItems}
                    customStyles={getCustomStyles(isDarkMode)}
                    pagination
                    paginationPerPage={7}
                    paginationRowsPerPageOptions={[7, 15, 30]}
                    highlightOnHover
                    pointerOnHover
                    selectableRows
                />
            </Box>
        </Box>
    );
};

export default HistoryTable;
