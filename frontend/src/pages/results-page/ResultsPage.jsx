
import React from 'react';
import { Box, Typography, Button, CircularProgress, LinearProgress, Chip } from "@mui/material";
import {
    ErrorOutlined,
    Download,
    BusinessCenterOutlined,
    Description,
    WbSunnyOutlined,
    Mood,
    AccessTime,
    Tag,
    Psychology,
    LocalOfferOutlined,
    LightbulbOutlined,
    CheckCircleOutlined,
    GppGoodOutlined,
    Autorenew,
    ArticleOutlined
} from "@mui/icons-material";
import HeaderContainer from '../../components/custom-header/HeaderContainer';
import { useThemeMode } from '../../hooks/useThemeMode';
import { useLocation, useNavigate } from 'react-router-dom';

const ResultsPage = () => {
    const { isDarkMode } = useThemeMode();
    const location = useLocation();
    const navigate = useNavigate();

    const resultData = location.state?.resultData;

    React.useEffect(() => {
        if (!resultData) {
            navigate('/analytics-page');
        }
    }, [resultData, navigate]);

    if (!resultData) return null;

    const sentimentLabel = resultData.sentiment;
    const isFake = resultData.prediction === "FAKE";
    const confidenceScore = resultData.confidence;
    const clickbaitScore = resultData.clickbait_score;
    const wordCount = resultData.word_count;
    const readingTime = resultData.reading_time;
    const keywords = resultData.keywords || [];
    const summaryText = resultData.summary;
    const suspiciousWords = resultData.clickbait_terms || [];
    const predictionFactors = resultData.prediction_factors || [];
    const fakeProbability = resultData.fake_probability || 0;
    const realProbability = resultData.real_probability || 0;
    const actualFileName = location.state?.fileName || "Uploaded Document";
    const fileInfo = { filename: actualFileName, num_pages: 1 }; // Backend does not return num_pages yet

    const colors = {
        bg: 'transparent',
        cardBg: isDarkMode ? '#1e1e1e' : '#fff',
        cardBorder: isDarkMode ? '#374151' : '#E5E7EB',
        textPrimary: isDarkMode ? '#F9FAFB' : '#111827',
        textSecondary: isDarkMode ? '#9CA3AF' : '#6B7280',

        // Fake News Alert
        fakeBg: isDarkMode ? '#450a0a' : '#FEF2F2',
        fakeBorder: isDarkMode ? '#7f1d1d' : '#FECACA',
        fakeText: isDarkMode ? '#f87171' : '#DC2626',
        
        // Real News Alert
        realBg: isDarkMode ? '#064e3b' : '#ECFDF5',
        realBorder: isDarkMode ? '#047857' : '#A7F3D0',
        realText: isDarkMode ? '#34d399' : '#059669',

        // Progress Circular
        progressTrack: isDarkMode ? '#7f1d1d' : '#FECACA',
        progressFill: isDarkMode ? '#ef4444' : '#DC2626',

        // Metrics Icons
        blueBubble: isDarkMode ? '#1e3a8a' : '#DBEAFE',
        blueIcon: isDarkMode ? '#60a5fa' : '#2563EB',
        orangeBubble: isDarkMode ? '#7c2d12' : '#FFEDD5',
        orangeIcon: isDarkMode ? '#fb923c' : '#EA580C',
        greenBubble: isDarkMode ? '#064e3b' : '#D1FAE5',
        greenIcon: isDarkMode ? '#34d399' : '#059669',
        purpleBubble: isDarkMode ? '#4c1d95' : '#EDE9FE',
        purpleIcon: isDarkMode ? '#a78bfa' : '#7C3AED',
        pinkBubble: isDarkMode ? '#831843' : '#FCE7F3',
        pinkIcon: isDarkMode ? '#f472b6' : '#DB2777',

        // Lists & Chips
        checkGreen: isDarkMode ? '#34d399' : '#16A34A',
        chipBg: isDarkMode ? '#064e3b' : '#ECFDF5',
        chipText: isDarkMode ? '#34d399' : '#059669',
        chipBorder: isDarkMode ? '#047857' : '#A7F3D0',

        // Progress Linear
        linearTrack: isDarkMode ? '#312e81' : '#E0E7FF',
        linearFill: isDarkMode ? '#818cf8' : '#4F46E5',

        // Footer
        footerBg: isDarkMode ? '#1e293b' : '#F3F4F6',
        footerBorder: isDarkMode ? '#334155' : '#E5E7EB',
    };

    const metrics = [
        { title: "Words Count", value: wordCount.toString(), sub: "Total Words", icon: <Description sx={{ color: colors.blueIcon }} />, bg: colors.blueBubble },
        { title: "Clickbait Score", value: `${clickbaitScore}%`, sub: clickbaitScore > 50 ? "High Probability" : "Low Probability", icon: <WbSunnyOutlined sx={{ color: colors.orangeIcon }} />, bg: colors.orangeBubble },
        { title: "Sentiment", value: sentimentLabel, sub: "Overall Sentiment", icon: <Mood sx={{ color: colors.greenIcon }} />, bg: colors.greenBubble, valColor: colors.greenIcon },
        { title: "Estimated Reading Time", value: `${readingTime} min`, sub: "Approx. Time", icon: <AccessTime sx={{ color: colors.purpleIcon }} />, bg: colors.purpleBubble },
        { title: "Keywords Found", value: keywords.length.toString(), sub: "Total Keywords", icon: <Tag sx={{ color: colors.pinkIcon }} />, bg: colors.pinkBubble }
    ];

    return (
        <Box sx={{ p: 2, bgcolor: colors.bg, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            
            <HeaderContainer
                heading='Analysis Result'
                subheading='Your article has been analyzed successfully.'
                btnText='Download Report'
                onBtnClick={async () => {
                    try {
                        const token = localStorage.getItem('token');
                        const historyResp = await fetch('http://127.0.0.1:8000/api/v1/history', {
                            headers: { 'Authorization': `Bearer ${token}` }
                        });
                        const historyData = await historyResp.json();
                        const latestId = historyData.length > 0 ? historyData[0].id : 0;
                        
                        if (latestId === 0) {
                            alert('No history record found to generate report.');
                            return;
                        }

                        const params = new URLSearchParams({
                            word_count: resultData.word_count || 0,
                            clickbait_score: resultData.clickbait_score || 0,
                            reading_time: resultData.reading_time || 0,
                            summary: resultData.summary || "N/A",
                            keywords: (resultData.keywords || []).join(",")
                        });

                        const url = `http://127.0.0.1:8000/api/v1/report/${latestId}?${params.toString()}`;
                        const reportResp = await fetch(url, {
                            headers: { 'Authorization': `Bearer ${token}` }
                        });
                        if (!reportResp.ok) throw new Error('Failed');
                        
                        const blob = await reportResp.blob();
                        const downloadUrl = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = downloadUrl;
                        a.download = `credly_report_${latestId}.pdf`;
                        document.body.appendChild(a);
                        a.click();
                        a.remove();
                    } catch (error) {
                        console.error('Download error:', error);
                        alert('An error occurred while downloading the report.');
                    }
                }}
                Icon={ArticleOutlined}
            />

            {/* Alert Banner */}
            <Box sx={{
                bgcolor: isFake ? colors.fakeBg : colors.realBg,
                border: `1px solid ${isFake ? colors.fakeBorder : colors.realBorder}`,
                borderRadius: '16px',
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 1
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{
                        width: 70, height: 70, borderRadius: '50%',
                        bgcolor: isFake ? colors.progressFill : colors.greenIcon, display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                        boxShadow: `0 0 0 8px ${isFake ? colors.progressTrack : colors.greenBubble}`
                    }}>
                         {isFake ? <ErrorOutlined sx={{ color: '#fff', fontSize: 40 }} /> : <CheckCircleOutlined sx={{ color: '#fff', fontSize: 40 }} />}
                    </Box>
                    <Box>
                        <Typography sx={{ color: isFake ? colors.fakeText : colors.realText, fontSize: '24px', fontWeight: 800, letterSpacing: '0.5px' }}>
                            {isFake ? '"FAKE NEWS"' : '"TRUE NEWS"'}
                        </Typography>
                        <Typography sx={{ color: colors.textPrimary, fontSize: '15px', fontWeight: 500, mt: 0.5 }}>
                            {isFake ? '"This article is most likely to be Fake."' : '"This article is most likely to be True."'}
                        </Typography>
                    </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                        <CircularProgress variant="determinate" value={100} size={80} thickness={4} sx={{ color: isFake ? colors.progressTrack : colors.greenBubble }} />
                        <CircularProgress variant="determinate" value={confidenceScore} size={80} thickness={4} sx={{ color: isFake ? colors.progressFill : colors.greenIcon, position: 'absolute', left: 0 }} />
                        <Box sx={{ top: 0, left: 0, bottom: 0, right: 0, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography sx={{ fontSize: '18px', fontWeight: 700, color: colors.textPrimary }}>{confidenceScore}%</Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Typography sx={{ fontSize: '15px', fontWeight: 700, color: colors.textPrimary }}>Confidence Score</Typography>
                        <Typography sx={{ fontSize: '13px', color: colors.textSecondary, mt: 0.5, maxWidth: '200px' }}>
                            Our model is {confidenceScore}% confident about this prediction.
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* NLP Insights Panel */}
            <Box>
                <Typography sx={{ fontSize: '16px', fontWeight: 700, color: colors.textPrimary, mb: 1.5 }}>
                    NLP Insights Panel
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {metrics.map((m, i) => (
                        <Box key={i} sx={{
                            flex: '1 1 150px',
                            bgcolor: colors.cardBg,
                            border: `1px solid ${colors.cardBorder}`,
                            borderRadius: '12px',
                            p: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center'
                        }}>
                            <Box sx={{ width: 35, height: 35, borderRadius: '50%', bgcolor: m.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                                {m.icon}
                            </Box>
                            <Typography sx={{ fontSize: '12px', fontWeight: 600, color: colors.textPrimary, mb: 1 }}>{m.title}</Typography>
                            <Typography sx={{ fontSize: '16px', fontWeight: 600, color: m.valColor || colors.textPrimary, mb: 0.5 }}>{m.value}</Typography>
                            <Typography sx={{ fontSize: '12px', color: colors.textSecondary }}>{m.sub}</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Middle 2 Columns */}
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Box sx={{ flex: '1 1 400px', bgcolor: colors.cardBg, border: `1px solid ${colors.cardBorder}`, borderRadius: '12px', p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Psychology sx={{ color: colors.greenIcon }} />
                        <Typography sx={{ fontSize: '14px', fontWeight: 700, color: colors.textPrimary }}>AI Generated Summary</Typography>
                    </Box>
                    <Typography sx={{ fontSize: '14px', color: colors.textSecondary, lineHeight: 1.6 }}>
                        {summaryText}
                    </Typography>
                </Box>
                <Box sx={{ flex: '1 1 400px', bgcolor: colors.cardBg, border: `1px solid ${colors.cardBorder}`, borderRadius: '12px', p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <LocalOfferOutlined sx={{ color: colors.greenIcon }} />
                        <Typography sx={{ fontSize: '14px', fontWeight: 700, color: colors.textPrimary }}>Important Keywords</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {keywords.map((kw, i) => (
                            <Chip key={i} label={kw} sx={{
                                bgcolor: colors.chipBg,
                                color: colors.chipText,
                                border: `1px solid ${colors.chipBorder}`,
                                fontWeight: 500,
                                fontSize: '12px',
                                borderRadius: '16px'
                            }} />
                        ))}
                    </Box>
                </Box>
            </Box>

            {/* Lower Middle 2 Columns */}
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {/* Prediction Factors */}
                <Box sx={{ flex: '1 1 400px', bgcolor: colors.cardBg, border: `1px solid ${colors.cardBorder}`, borderRadius: '12px', p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <LightbulbOutlined sx={{ color: colors.purpleIcon }} />
                        <Typography sx={{ fontSize: '14px', fontWeight: 700, color: colors.textPrimary }}>Prediction Factors</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        {predictionFactors.map((text, i) => (
                            <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                                <CheckCircleOutlined sx={{ color: colors.checkGreen, fontSize: 18, mt: 0.2 }} />
                                <Typography sx={{ fontSize: '13px', color: colors.textSecondary }}>{text}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
                
                {/* Detected Clickbait Terms */}
                <Box sx={{ flex: '1 1 400px', bgcolor: colors.cardBg, border: `1px solid ${colors.cardBorder}`, borderRadius: '12px', p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Psychology sx={{ color: colors.purpleIcon }} />
                        <Typography sx={{ fontSize: '14px', fontWeight: 700, color: colors.textPrimary }}>Detected Clickbait Terms</Typography>
                    </Box>
                    {suspiciousWords.length > 0 ? (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {suspiciousWords.map((word, i) => (
                                <Chip key={i} label={word} sx={{ 
                                    bgcolor: colors.fakeBg, 
                                    color: colors.fakeText, 
                                    fontWeight: 600, 
                                    fontSize: '12px',
                                    borderRadius: '16px',
                                    textTransform: 'capitalize'
                                }} />
                            ))}
                        </Box>
                    ) : (
                        <Typography sx={{ fontSize: '13px', color: colors.textSecondary }}>No clickbait patterns detected.</Typography>
                    )}
                </Box>
            </Box>

            {/* Bottom 2 Columns */}
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {/* Prediction Distribution */}
                <Box sx={{ flex: '1 1 400px', bgcolor: colors.cardBg, border: `1px solid ${colors.cardBorder}`, borderRadius: '12px', p: 3 }}>
                    <Typography sx={{ fontSize: '14px', fontWeight: 700, color: colors.textPrimary, mb: 2 }}>Prediction Distribution</Typography>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: colors.textPrimary }}>Fake News</Typography>
                                <Typography sx={{ fontSize: '13px', fontWeight: 700, color: colors.fakeText }}>{fakeProbability}%</Typography>
                            </Box>
                            <LinearProgress variant="determinate" value={fakeProbability} sx={{ 
                                height: 8, 
                                borderRadius: 4, 
                                bgcolor: colors.fakeBg,
                                '& .MuiLinearProgress-bar': { bgcolor: colors.fakeText, borderRadius: 4 }
                            }} />
                        </Box>

                        <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: colors.textPrimary }}>Real News</Typography>
                                <Typography sx={{ fontSize: '13px', fontWeight: 700, color: colors.realText }}>{realProbability}%</Typography>
                            </Box>
                            <LinearProgress variant="determinate" value={realProbability} sx={{ 
                                height: 8, 
                                borderRadius: 4, 
                                bgcolor: colors.realBg,
                                '& .MuiLinearProgress-bar': { bgcolor: colors.realText, borderRadius: 4 }
                            }} />
                        </Box>
                    </Box>
                </Box>

                {/* Confidence Level */}
                <Box sx={{ flex: '1 1 400px', bgcolor: colors.cardBg, border: `1px solid ${colors.cardBorder}`, borderRadius: '12px', p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <GppGoodOutlined sx={{ color: colors.purpleIcon }} />
                        <Typography sx={{ fontSize: '14px', fontWeight: 700, color: colors.textPrimary }}>Confidence Level</Typography>
                    </Box>
                    
                    <Typography sx={{ fontSize: '16px', fontWeight: 800, color: colors.textPrimary, mb: 0.5 }}>
                        {confidenceScore >= 80 ? "High Confidence" : confidenceScore >= 50 ? "Medium Confidence" : "Low Confidence"}
                    </Typography>
                    <Typography sx={{ fontSize: '13px', color: colors.textSecondary, mb: 3, lineHeight: 1.6 }}>
                        The classifier is {confidenceScore >= 80 ? "highly" : confidenceScore >= 50 ? "moderately" : "not"} confident that this article belongs to the {isFake ? "Fake News" : "Real News"} category.
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <LinearProgress variant="determinate" value={confidenceScore} sx={{ 
                            flexGrow: 1, 
                            height: 12, 
                            borderRadius: 6, 
                            bgcolor: colors.linearTrack,
                            '& .MuiLinearProgress-bar': { bgcolor: colors.linearFill, borderRadius: 6 }
                        }} />
                        <Typography sx={{ fontSize: '18px', fontWeight: 800, color: colors.textPrimary }}>{confidenceScore}%</Typography>
                    </Box>
                </Box>
            </Box>

            {/* Analysis Details */}
            <Box sx={{ bgcolor: colors.cardBg, border: `1px solid ${colors.cardBorder}`, borderRadius: '12px', p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                    <Box sx={{ width: 28, height: 28, borderRadius: '50%', bgcolor: colors.blueBubble, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <BusinessCenterOutlined sx={{ color: colors.blueIcon, fontSize: 16 }} />
                    </Box>
                    <Typography sx={{ fontSize: '13px', fontWeight: 800, color: colors.textPrimary }}>Analysis Details</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                    {[
                        { l: "File Name", v: fileInfo.filename },
                        { l: "Number of Pages", v: fileInfo.num_pages },
                        { l: "Model Used", v: "Logistic Regression" },
                        { l: "Vectorizer", v: "TF-IDF" },
                        { l: "Analysis Date", v: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString() }
                    ].map((d, i) => (
                        <Box key={i}>
                            <Typography sx={{ fontSize: '11px', color: colors.textSecondary, mb: 1 }}>{d.l}</Typography>
                            <Typography sx={{ fontSize: '12px', fontWeight: 700, color: colors.textPrimary }}>{d.v}</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Footer */}
            <Box sx={{ 
                bgcolor: colors.footerBg, 
                border: `1px solid ${colors.footerBorder}`, 
                borderRadius: '12px', 
                p: 2, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 2
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <GppGoodOutlined sx={{ color: colors.blueIcon }} />
                    <Typography sx={{ fontSize: '14px', color: colors.textPrimary, fontWeight: 500 }}>
                        Always verify important news from official and trusted sources.
                    </Typography>
                </Box>
                <Button 
                    variant="outlined" 
                    onClick={() => navigate('/analytics-page')}
                    startIcon={<Autorenew />}
                    sx={{ 
                        color: colors.checkGreen, 
                        borderColor: colors.checkGreen, 
                        textTransform: 'none', 
                        fontWeight: 600,
                        '&:hover': { borderColor: colors.checkGreen, bgcolor: 'rgba(22, 163, 74, 0.04)' }
                    }}
                >
                    Analyze Another Article
                </Button>
            </Box>

        </Box>
    );
};

export default ResultsPage;