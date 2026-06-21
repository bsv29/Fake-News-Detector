export const getStyles = (isDarkMode) => ({
  Paper: {
    position: 'relative',
    width: '100%',
    maxWidth: '440px',
    padding: '30px',
    borderRadius: '12px',
    border: `1px solid ${isDarkMode ? '#1E293B' : '#E5E7EB'}`,
    background: isDarkMode ? 'transparent' : '#ffffff',
    boxShadow: isDarkMode ? 'none' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    maxHeight: '80vh',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    }
  },

  HeaderContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  ShieldIconWrapper: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    backgroundColor: isDarkMode ? 'rgba(157, 23, 77, 0.2)' : '#FDE8EE',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  ShieldIcon: {
    color: '#BE185D',
    fontSize: '28px'
  },
  
  Title: {
    fontSize: '22px',
    fontWeight: 700,
    color: isDarkMode ? '#F9FAFB' : '#0d121b',
    // mb: 0.5,
  },
  
  Subtitle: {
    fontSize: '14px',
    color: isDarkMode ? '#9CA3AF' : '#6B7280',
    mb: 2,
  },
  
  FormBox: {
    mb: 2,
  },
  
  ConfirmPasswordBox: {
    mb: 2,
  },
  
  FieldLabel: {
    fontSize: '12px',
    fontWeight: 700,
    color: isDarkMode ? '#E5E7EB' : '#1f2937',
    mb: 1,
  },
  
  TextField: {
    '& input': {
      padding: '4px 6px',
      fontSize: '12px',
      color: isDarkMode ? '#F9FAFB' : '#1f2937',
    },
    '& input::placeholder': {
      fontSize: '12px',
      color: isDarkMode ? '#6B7280' : '#9CA3AF',
    },
    '& .MuiOutlinedInput-root': {
      backgroundColor: isDarkMode ? '#111827' : 'transparent',
      height: '50px',
      '& fieldset': { borderColor: isDarkMode ? '#1E293B' : '#E5E7EB' },
      '&:hover fieldset': { borderColor: isDarkMode ? '#374151' : '#D1D5DB' },
      '&.Mui-focused fieldset': { borderColor: '#148EC3' },
      "& input:-webkit-autofill": {
        WebkitBoxShadow: `0 0 0 1000px ${isDarkMode ? '#111827' : '#ffffff'} inset`,
        WebkitTextFillColor: isDarkMode ? "#F9FAFB" : "#0c0c0c",
      },
    },
  },
  
  InputIcon: {
    color: isDarkMode ? '#6B7280' : '#9CA3AF',
    fontSize: '20px',
  },

  TermsBox: {
    mb: 2,
    ml: '-4px', // slight offset to align checkbox visually
  },

  TermsText: {
    fontSize: '11px',
    color: isDarkMode ? '#9CA3AF' : '#4B5563',
  },

  TermsHighlight: {
    color: '#BE185D',
    fontWeight: 600,
    cursor: 'pointer',
  },
  
  SubmitButton: {
    background: 'linear-gradient(90deg, #8A1538 0%, #A65612 100%)',
    color: 'white',
    padding: '10px',
    fontSize: '14px',
    fontWeight: 600,
    textTransform: 'none',
    borderRadius: '8px',
    mb: 2,
    gap: '10px',
    transition: 'all 0.2s ease',
    '&:hover': {
      opacity: 0.9,
    },
    '&.Mui-disabled': {
      background: 'linear-gradient(90deg, #8A1538 0%, #A65612 100%)',
      color: 'rgba(255, 255, 255, 0.5)',
      opacity: 0.6,
    }
  },
  
  ArrowIcon: {
    fontSize: '18px',
  },

  Divider: {
    fontSize: '12px',
    color: isDarkMode ? '#6B7280' : '#9CA3AF',
    fontWeight: 500,
    mb: 2,
    '&::before, &::after': {
      borderColor: isDarkMode ? '#1E293B' : '#E5E7EB',
    }
  },

  SocialBox: {
    display: 'flex',
    justifyContent: 'center',
    // gap: 2,
    mb: 2,
  },

  SocialButton: {
    border: `1px solid ${isDarkMode ? '#1E293B' : '#E5E7EB'}`,
    borderRadius: '8px',
    padding: '10px',
    width: '100px', // width matching the screenshot proportions
    height: '45px',
    backgroundColor: isDarkMode ? '#111827' : 'transparent',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: isDarkMode ? '#1F2937' : '#F9FAFB',
    }
  },
  
  LinksContainer: {
    textAlign: 'center',
  },
  
  SignInText: {
    fontSize: '12px',
    color: isDarkMode ? '#9CA3AF' : '#6B7280',
    fontWeight: 500,
  },
  
  SignInLink: {
    color: '#BE185D',
    cursor: 'pointer',
    fontWeight: 600,
  },
});