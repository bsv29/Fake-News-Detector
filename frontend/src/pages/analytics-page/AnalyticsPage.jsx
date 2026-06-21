import React, { useState } from 'react';
import { Box, Typography, Button, CircularProgress, Backdrop } from "@mui/material";
import {
    CloudUploadOutlined,
    InsertDriveFile,
    Description,
    PictureAsPdf,
    CloudDownload,
    Subject,
    KeyboardArrowRight,
    CheckCircleOutlined,
    DeleteOutlined,
    AttachFile,
    Settings,
    AutoAwesome,
    ArrowForward,
    Security,
    BarChart,
    Feed,
    CrisisAlert,
    ShieldOutlined
} from "@mui/icons-material";
import HeaderContainer from '../../components/custom-header/HeaderContainer';
import { useThemeMode } from '../../hooks/useThemeMode';
import NewUploadFiles from '../../components/upload-files/NewUploadFiles';
import { useNavigate } from 'react-router-dom';

const AnalyticsPage = () => {
    const { isDarkMode } = useThemeMode();
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingStep, setLoadingStep] = useState(0);
    const navigate = useNavigate();

    const loadingTexts = [
        "Extracting textual features...",
        "Running NLP algorithms...",
        "Calculating sentiment and clickbait...",
        "Synthesizing prediction factors...",
        "Finalizing analysis report..."
    ];

    React.useEffect(() => {
        let interval;
        if (loading) {
            setLoadingStep(0);
            interval = setInterval(() => {
                setLoadingStep((prev) => (prev < loadingTexts.length - 1 ? prev + 1 : prev));
            }, 800);
        }
        return () => clearInterval(interval);
    }, [loading]);

    const handleAnalyze = async () => {
        if (!files || files.length === 0) return;
        setLoading(true);
        const formData = new FormData();
        const fileObj = files[0].file || files[0];
        formData.append('file', fileObj);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"}/api/v1/analyze`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData,
            });
            const data = await response.json();
            if (response.ok) {
                navigate('/results-page', { state: { resultData: data, fileName: fileObj.name } });
            } else {
                alert(data.detail || 'Failed to analyze article');
                setLoading(false);
            }
        } catch (error) {
            console.error('Error analyzing article:', error);
            alert('An error occurred while connecting to the server.');
            setLoading(false);
        }
    };

    const colors = {
        pageBg: isDarkMode ? 'transparent' : 'transparent',
        cardBg: isDarkMode ? '#1e1e1e' : '#fff', // Much darker card background like screenshot
        cardBorder: isDarkMode ? '#374151' : '#f3f4f6',
        textPrimary: isDarkMode ? '#F9FAFB' : '#111827',
        textSecondary: isDarkMode ? '#9CA3AF' : '#6B7280',
        iconBgGreen: isDarkMode ? '#2c101b' : '#fce8ec',
        iconColorGreen: '#8A1538',
        dashedBorder: isDarkMode ? '#4a1523' : '#e5b3c3',
        dashedBg: isDarkMode ? 'transparent' : 'transparent',
        buttonBg: 'linear-gradient(90deg, #8A1538 0%, #A65612 100%)',
        buttonHover: 'linear-gradient(90deg, #6d102b 0%, #87450e 100%)',
        iconBgPurple: isDarkMode ? '#2c101b' : '#fce8ec',
        iconColorPurple: isDarkMode ? '#8B5CF6' : '#7C3AED',
        listItemBg: isDarkMode ? '#1e1e1e' : '#FAFAFA',
        listItemBorder: isDarkMode ? '#374151' : '#F3F4F6',
        listItemIconBg: isDarkMode ? '#2c101b' : '#fce8ec', // Match the dark purple bubble in list items
    };

    return (
        <Box sx={{ p: 2, bgcolor: isDarkMode ? 'transparent' : 'transparent', minHeight: '100%', boxSizing: 'border-box' }}>
            {/* Header Area */}
            <HeaderContainer
                heading='Credibility Analyzer'
                subheading='Upload a news article (PDF) and let our AI analyze its credibility.'
            />

            {/* Main Content Area */}
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mt: "10px", border: "1px solid transparent", }}>

                {/* Left Card */}
                <Box sx={{
                    flex: '1 1 400px',
                    bgcolor: colors.cardBg,
                    borderRadius: '16px',
                    p: 4,
                    boxShadow: isDarkMode ? 'none' : '0 4px 12px rgba(0, 0, 0, 0.03)',
                    border: `1px solid ${colors.cardBorder}`,
                    boxSizing: 'border-box'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{
                                width: 56,
                                height: 56,
                                borderRadius: '50%',
                                bgcolor: colors.iconBgGreen,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                mr: 2.5
                            }}>
                                <InsertDriveFile sx={{ color: colors.iconColorGreen, fontSize: '30px' }} />
                            </Box>
                            <Box>
                                <Typography sx={{ fontWeight: 700, fontSize: '18px', color: colors.textPrimary }}>
                                    Upload Your File
                                </Typography>
                                <Typography sx={{ color: colors.textSecondary, fontSize: '14px', mt: 0.5 }}>
                                    Upload a PDF file of the news article <br /> you want to analyze.
                                </Typography>
                            </Box>
                        </Box>
                        {files.length > 0 && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, bgcolor: colors.iconBgGreen, px: 1.5, py: 0.5, borderRadius: '20px' }}>
                                <ShieldOutlined sx={{ color: colors.iconColorGreen, fontSize: 16 }} />
                                <Typography sx={{ color: colors.iconColorGreen, fontSize: '12px', fontWeight: 600 }}>Secure & Private</Typography>
                            </Box>
                        )}
                    </Box>

                    <Box sx={{ mt: 2, mb: 1 }}>
                        <NewUploadFiles
                            files={files}
                            setFiles={setFiles}
                            accept={{ 'application/pdf': ['.pdf'] }}
                            maxsize={10}
                            multiple={false}
                            maxFiles={1}
                            width="100%"
                            padding="0"
                            dropzoneSx={{
                                border: `2px dashed ${colors.dashedBorder}`,
                                bgcolor: colors.dashedBg,
                                '&:hover': {
                                    backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                                    borderColor: colors.iconColorGreen,
                                }
                            }}
                            customEmptyState={({ isDragActive }) => (
                                <Box sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    width: '100%'
                                }}>
                                    <CloudUploadOutlined sx={{ fontSize: 64, color: colors.iconColorGreen, mb: 2 }} />
                                    <Typography sx={{ fontWeight: 600, color: colors.textPrimary, fontSize: '16px', mb: 1 }}>
                                        {isDragActive ? "Drop your PDF here" : <>Drag & drop your <Box component="span" sx={{ 
                                            background: 'linear-gradient(90deg, #8A1538 0%, #A65612 100%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                        }}>PDF</Box> here</>}
                                    </Typography>
                                    <Typography sx={{ color: colors.textSecondary, fontSize: '14px', mb: 2 }}>
                                        or
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        startIcon={<InsertDriveFile />}
                                        sx={{
                                            background: colors.buttonBg,
                                            '&:hover': { background: colors.buttonHover },
                                            borderRadius: '8px',
                                            textTransform: 'none',
                                            fontWeight: 600,
                                            px: 3,
                                            py: 1.2,
                                            mb: 3,
                                            boxShadow: 'none',
                                            pointerEvents: 'none' // Let the parent dropzone handle the click
                                        }}
                                    >
                                        Choose PDF File
                                    </Button>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <InsertDriveFile sx={{ fontSize: 16, color: colors.textSecondary }} />
                                        <Typography sx={{ color: colors.textSecondary, fontSize: '13px' }}>
                                            Only PDF files are supported. Max file size: 10MB
                                        </Typography>
                                    </Box>
                                </Box>
                            )}
                            customFileList={({ files, handleRemoveFile, getRootProps, getInputProps, formatFileSize }) => (
                                <Box sx={{ width: '100%', p: 2, boxSizing: 'border-box' }}>
                                    {files.map((file, idx) => (
                                        <Box key={idx} sx={{ display: 'flex', alignItems: 'center', py: 1.5, mb: 2, border: 'none' }}>
                                            <Box sx={{ width: 42, height: 42, borderRadius: '6px', bgcolor: isDarkMode ? '#450a0a' : '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 2 }}>
                                                <Typography sx={{ color: '#ef4444', fontWeight: 800, fontSize: '11px' }}>PDF</Typography>
                                            </Box>
                                            <Box sx={{ flex: 1 }}>
                                                <Typography sx={{ fontWeight: 600, color: colors.textPrimary, fontSize: '14px' }}>{file.name}</Typography>
                                                <Typography sx={{ color: colors.textSecondary, fontSize: '13px', mt: 0.3 }}>{formatFileSize(file.size)}</Typography>
                                            </Box>
                                            <CheckCircleOutlined sx={{ color: colors.iconColorGreen, mr: 2, fontSize: 20 }} />
                                            <DeleteOutlined 
                                                onClick={(e) => { e.stopPropagation(); handleRemoveFile(idx); }}
                                                sx={{ color: '#ef4444', cursor: 'pointer', fontSize: 20, transition: '0.2s', '&:hover': { opacity: 0.7 } }} 
                                            />
                                        </Box>
                                    ))}
                                    
                                    {/* <Box 
                                        {...getRootProps()}
                                        sx={{ 
                                            bgcolor: isDarkMode ? '#022C22' : '#F0FDF4', 
                                            border: `1px solid ${colors.dashedBorder}`,
                                            borderRadius: '8px',
                                            p: 2,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            '&:hover': { bgcolor: isDarkMode ? '#064E3B' : '#DCFCE7' }
                                        }}
                                    >
                                        <input {...getInputProps()} />
                                        <CloudUploadOutlined sx={{ color: colors.iconColorGreen, mr: 1.5 }} />
                                        <Typography sx={{ color: colors.textSecondary, fontSize: '14px' }}>
                                            Drag & drop another file here<br/>or <span style={{ color: colors.iconColorGreen, fontWeight: 600 }}>click to browse</span>
                                        </Typography>
                                    </Box> */}
                                </Box>
                            )}
                        />
                    </Box>

                    {/* After Upload Specific Content */}
                    {files.length > 0 && (
                        <Box sx={{ mt: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                <AttachFile sx={{ color: colors.textSecondary, fontSize: 16 }} />
                                <Typography sx={{ color: colors.textSecondary, fontSize: '13px' }}>
                                    Supported format: PDF only (Max size: 10MB)
                                </Typography>
                            </Box>
                            
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={handleAnalyze}
                                disabled={loading}
                                sx={{
                                    background: colors.buttonBg,
                                    color: 'white',
                                    '&:hover': { background: colors.buttonHover },
                                    borderRadius: '8px',
                                    py: 1.5,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    fontSize: '16px',
                                    boxShadow: 'none'
                                }}
                            >
                                {loading ? "Analyzing..." : <><AutoAwesome sx={{ fontSize: 20, mr: 1 }} /> Analyze Article</>}
                            </Button>
                        </Box>
                    )}
                </Box>

                {/* Right Card */}
                <Box sx={{
                    flex: '1 1 400px',
                    bgcolor: colors.cardBg,
                        borderRadius: '16px',
                        p: 2,
                        border: `1px solid ${colors.cardBorder}`,
                        boxSizing: 'border-box',
                        boxShadow: isDarkMode ? 'none' : '0 4px 12px rgba(0, 0, 0, 0.03)',
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, px: 2, pt: 2 }}>
                            <Box sx={{
                                width: 56,
                                height: 56,
                                borderRadius: '50%',
                                bgcolor: colors.iconBgPurple,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                mr: 2.5
                            }}>
                                <Description sx={{ fill: 'url(#primary-gradient)', fontSize: '30px' }} />
                            </Box>
                            <Box>
                                <Typography sx={{ fontWeight: 700, fontSize: '18px', color: colors.textPrimary }}>
                                    Article Guidelines
                                </Typography>
                                <Typography sx={{ color: colors.textSecondary, fontSize: '14px', mt: 0.5 }}>
                                    Make sure your article is clear <br /> and readable for accurate results.
                                </Typography>
                            </Box>
                        </Box>

                        {/* Guideline List */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, px: 2, pb: 2 }}>
                            {[
                                {
                                    icon: <Description sx={{ fill: 'url(#primary-gradient)', fontSize: 22 }} />,
                                    title: "Upload only news articles",
                                    desc: "The article should be news content, not ads or promotions."
                                },
                                {
                                    icon: <PictureAsPdf sx={{ fill: 'url(#primary-gradient)', fontSize: 22 }} />,
                                    title: "PDF format only",
                                    desc: "Ensure your file is in PDF format."
                                },
                                {
                                    icon: <CloudDownload sx={{ fill: 'url(#primary-gradient)', fontSize: 22 }} />,
                                    title: "Max 10MB file size",
                                    desc: "For best performance, upload files under 10MB."
                                },
                                {
                                    icon: <Subject sx={{ fill: 'url(#primary-gradient)', fontSize: 22 }} />,
                                    title: "Readable content",
                                    desc: "Clear and text-based PDF gives better analysis."
                                }
                            ].map((item, index) => (
                                <Box key={index} sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    bgcolor: colors.listItemBg,
                                    p: 2,
                                    borderRadius: '12px',
                                    border: `1px solid ${colors.listItemBorder}`
                                }}>
                                    <Box sx={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: '10px',
                                        bgcolor: colors.listItemIconBg,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        mr: 2,
                                        flexShrink: 0
                                    }}>
                                        {item.icon}
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontWeight: 600, fontSize: '14px', color: colors.textPrimary }}>
                                            {item.title}
                                        </Typography>
                                        <Typography sx={{ fontSize: '13px', color: colors.textSecondary, mt: 0.2 }}>
                                            {item.desc}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>

            {/* Loading Overlay */}
            <Backdrop
                open={loading}
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    bgcolor: 'rgba(0,0,0,0.7)'
                }}
            >
                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 140, height: 140 }}>
                    <CircularProgress size={120} thickness={2} sx={{ color: colors.iconColorGreen, position: 'absolute', animationDuration: '1.5s' }} />
                    <CircularProgress size={140} thickness={1} variant="indeterminate" disableShrink sx={{ color: colors.iconColorPurple, position: 'absolute', animationDuration: '3s' }} />
                    <AutoAwesome sx={{ fontSize: 40, color: '#fff', animation: 'pulse 1.5s infinite ease-in-out' }} />
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontSize: '24px', fontWeight: 800, mb: 1, letterSpacing: '0.5px' }}>
                        Analyzing Article
                    </Typography>
                    <Typography sx={{ fontSize: '15px', color: '#cbd5e1', fontWeight: 500, minHeight: '24px', transition: 'all 0.3s ease' }}>
                        {loadingTexts[loadingStep]}
                    </Typography>
                </Box>
                <style>
                    {`
                    @keyframes pulse {
                        0% { transform: scale(0.9); opacity: 0.7; }
                        50% { transform: scale(1.1); opacity: 1; filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.8)); }
                        100% { transform: scale(0.9); opacity: 0.7; }
                    }
                    `}
                </style>
            </Backdrop>

        </Box>
    );
};

export default AnalyticsPage;