import { Box } from "@mui/material";
import React, { useState } from "react";
import { Styles } from "./Styles";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import { useThemeMode } from "../../hooks/useThemeMode";

const PageLayout = ({ children }) => {
  const [open, setOpen] = useState(true);
  const { isDarkMode } = useThemeMode();

  return (
    <Box sx={{ 
        ...Styles.container, 
        bgcolor: isDarkMode ? '#0A0A0A' : Styles.container.bgcolor 
    }}>
      {/* Header - full width, in flex flow (not fixed) */}
      <Header sidebarOpen={open} setSidebarOpen={setOpen} />

      {/* Content Row: Sidebar + Main Content */}
      <Box sx={Styles.contentBox}>
        {/* Sidebar */}
        <Box
          sx={{
            width: open ? 310 : 57,
            transition: "width 0.3s ease",
            flexShrink: 0,
            ml: "7px",
            mb: "7px",
            height: "100%",
          }}
        >
          <Sidebar open={open} setOpen={setOpen} />
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            ...Styles.InnerContainer,
            background: isDarkMode ? '#0B0F19' : Styles.InnerContainer.background,
            bgcolor: isDarkMode ? '#0B0F19' : Styles.InnerContainer.bgcolor,
            border: isDarkMode ? '2px solid #1E293B' : '2px solid #CFD7E7',
            borderRadius: '16px',
            boxShadow: isDarkMode ? 'none' : Styles.InnerContainer.boxShadow,
            flex: 1,
            transition: "all 0.3s ease",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              flex: 1,
              overflowY: "scroll",
              scrollbarWidth: "none",

              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PageLayout;