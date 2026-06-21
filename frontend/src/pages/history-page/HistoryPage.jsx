import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from "@mui/material";
import HistoryIcon from '@mui/icons-material/History';
import axios from 'axios';
import HeaderContainer from "../../components/custom-header/HeaderContainer";
import HistoryStatsCards from "../../components/cards/HistoryStatsCards";
import HistoryTable from "../../components/table/HistoryTable";

const HistoryPage = () => {
    const [historyData, setHistoryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://127.0.0.1:8000/api/v1/history', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setHistoryData(response.data);
            } catch (err) {
                console.error("Error fetching history:", err);
                setError("Failed to load history.");
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    // Compute stats dynamically
    const totalAnalyses = historyData.length;
    const credibleCount = historyData.filter(item => item.status === "Credible").length;
    const misleadingCount = historyData.filter(item => item.status === "Potentially Misleading").length;
    const notCredibleCount = historyData.filter(item => item.status === "Not Credible").length;

    const computedStats = {
        totalAnalyses,
        credibleCount,
        misleadingCount,
        notCredibleCount
    };

    return (
        <Box sx={{ p: 2, minHeight: '100%', boxSizing: 'border-box' }}>
            <Box sx={{ mb: 2 }}>
                <HeaderContainer 
                    heading="Analysis History" 
                    subheading="View and manage all your analyzed news articles and their credibility results."
                    Icon={HistoryIcon}
                />
            </Box>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                    <CircularProgress sx={{ color: '#148EC3' }} />
                </Box>
            ) : error ? (
                <Box sx={{ p: 4, textAlign: 'center' }}>
                    <Typography color="error">{error}</Typography>
                </Box>
            ) : (
                <>
                    <HistoryStatsCards stats={computedStats} />
                    <HistoryTable data={historyData} />
                </>
            )}
        </Box>
    );
};
   
export default HistoryPage;