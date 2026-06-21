import { Box, Typography } from "@mui/material";
import GroupIcon from '@mui/icons-material/Group';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import CustomButton from "../custom-button/CustomButton";
import { useThemeMode } from "../../hooks/useThemeMode";

const HeaderContainer = ({
  heading,
  subheading,
  Icon,
  btnText,
  onBtnClick,
}) => {
  const { isDarkMode } = useThemeMode();
  const IconComponent = Icon || GroupIcon;

  const colors = {
    bg: isDarkMode ? '#1e1e1e' : '#fff',
    border: isDarkMode ? '#374151' : '#CFD7E7', // Match header and sidebar border
    iconBubbleBg: isDarkMode ? '#2c101b' : '#fce8ec',
    iconColor: isDarkMode ? '#38BDF8' : '#148ec3',
    textPrimary: isDarkMode ? '#F9FAFB' : '#111827',
    textSecondary: isDarkMode ? '#9CA3AF' : '#6B7280',
  };

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: colors.border,
        borderRadius: "16px",
        bgcolor: colors.bg,
      }}
    >
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <linearGradient id="primary-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8A1538" />
          <stop offset="100%" stopColor="#A65612" />
        </linearGradient>
      </svg>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 68,
          px: 1.5,
        }}
      >
        {/* Left: Icon + Text */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          {/* Icon bubble */}
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "10px",
              bgcolor: colors.iconBubbleBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <IconComponent
              size={20}
              sx={{ fill: 'url(#primary-gradient)' }}
            />
          </Box>

          {/* Heading + Subheading */}
          <Box>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                color: colors.textPrimary,
                lineHeight: 1.3,
              }}
            >
              {heading}
            </Typography>

            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: 600,
                color: colors.textSecondary,
                lineHeight: 1.4,
              }}
            >
              {subheading}
            </Typography>
          </Box>
        </Box>

        {/* Right: Button */}
        {onBtnClick && (
          <CustomButton
            title={btnText}
            icon={<PersonAddAltIcon size={16} />}
            onclick={onBtnClick}
            background="linear-gradient(90deg, #8A1538 0%, #A65612 100%)"
            color="#fff"
            fontWeight={600}
            fontSize="13px"
            borderRadius="8px"
            padding="8px 16px"
          />

        )}
      </Box>
    </Box>

  );

};

export default HeaderContainer;
