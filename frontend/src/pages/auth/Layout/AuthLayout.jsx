import React from 'react';
import { Box, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { getStyles } from './Styles';
import { useThemeMode } from '../../../hooks/useThemeMode';

const AuthLayout = ({ children }) => {
  const { isDarkMode } = useThemeMode();
  const Styles = getStyles(isDarkMode);
  const LeftPanel = () => (
    <Box sx={Styles.LeftPanel}>
      <Box>
        {/* <Box sx={Styles.LogoWrapper}>
          <img src={LOGO_White} alt="Logo" style={Styles.LogoImg} />
          <Typography sx={Styles.LogoText}>
            <span style={Styles.LogoSpan}>AOTM</span>
            Trust
          </Typography>
        </Box> */}
      </Box>

      <Box sx={Styles.ContentBox}>
        <Typography sx={Styles.Heading}>
          Truth Starts With Verification.
                <br/>
         Regulated Software Compliance.     </Typography>
        <Typography sx={Styles.SubText}>
         AI-powered news verification platform designed to identify misinformation,
          <br />
          detect clickbait patterns and provide transparent credibility analysis.
        </Typography>
      </Box>
{/* 
      <Typography sx={{ position: 'absolute', bottom: '24px', left: '78px', fontSize: '12px', opacity: 0.7 }}>
        Version 1.0
      </Typography> */}

    </Box>
  );

  return (
    <Box sx={Styles.Container}>
      <LeftPanel />
      <Box sx={Styles.RightPanel}>{children}</Box>
    </Box>
  );
};

export default AuthLayout;
