export const getStyles = (isDarkMode) => ({
  Paper: {
    position: 'relative',
    width: '100%',
    maxWidth: '440px',
    padding: '30px',
    borderRadius: '12px',
    border: `1px solid ${isDarkMode ? '#1E293B' : '#E5E7EB'}`,
    backgroundColor: isDarkMode ? 'transparent' : '#ffffff',
    boxShadow: isDarkMode ? 'none' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    maxHeight: '80vh',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    }
  },
  
  HeaderContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    mb: 2
  },
  
  ShieldIconWrapper: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    backgroundColor: isDarkMode ? 'rgba(157, 23, 77, 0.2)' : '#FDE8EE',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mb: 2,
    boxShadow: '0 0 15px rgba(157, 23, 77, 0.1)',
  },
  
  ShieldIcon: {
    color: '#9D174D',
    fontSize: '28px'
  },
  
  textFieldInputPropsSx: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '16px',
    lineHeight: '22px',
    boxShadow: 'none',
    height: '10%',
    '& .MuiInputBase-input': {
      color: isDarkMode ? 'white' : '#1f2937', 
      fontSize: "14px", 
      pl: "8px", 
    //   paddingLeft: "20px"
    },
    '& input::placeholder': {
      opacity: 1,
      fontSize: '13px',
    },
  },

  textFieldSx: {
    // mb: '5px',
  },
  
  Title: {
    fontSize: '22px',
    fontWeight: 700,
    color: isDarkMode ? '#F9FAFB' : '#0d121b',
    mb: 0.5,
  },
  
  Subtitle: {
    fontSize: '14px',
    color: isDarkMode ? '#9CA3AF' : '#6B7280',
    mb: 2,
  },
  
  FormBox: {
    mb: 2,
  },
  
  PasswordBox: {
    mb: 2,
  },
  
  FieldLabel: {
    fontSize: '12px',
    fontWeight: 600,
    color: isDarkMode ? '#9CA3AF' : '#374151',
    mb: 0.5,
  },
  
  PasswordLabel: {
    fontSize: '12px',
    fontWeight: 600,
    color: isDarkMode ? '#9CA3AF' : '#374151',
    mb: 1,
  },
  
  TextField: {
    '& input': {
      padding: '4px 6px',
      fontSize: '12px',
      color: isDarkMode ? '#F9FAFB' : '#000000',
    },
    '& input::placeholder': {
      fontSize: '11px',
      color: isDarkMode ? '#6B7280' : '#9CA3AF',
    },
    '& .MuiOutlinedInput-root': {
      backgroundColor: isDarkMode ? '#111827' : '#F9FAFB',
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
  
  Alert: {
    mb: 3,
    backgroundColor: isDarkMode ? '#064e3b' : '#EFF6FF',
    color: isDarkMode ? '#a7f3d0' : '#148EC3',
    '& .MuiAlert-icon': { color: isDarkMode ? '#a7f3d0' : '#148EC3' },
  },
  
  AlertTitle: {
    fontSize: '12px',
    fontWeight: 600,
    mb: 0.5,
  },
  
  AlertText: {
    fontSize: '12px',
    lineHeight: 1.5,
  },
  
  SignInButton: {
    background: '#148EC3',
    color: 'white',
    padding: '8px',
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'none',
    borderRadius: '8px',
    mb: 3,
    gap: '10px',
  },
  
  ArrowIcon: {
    fontSize: '16px',
  },
  
  LinksContainer: {
    textAlign: 'center',
  },
  
  ForgotLink: {
    fontSize: '12px',
    color: isDarkMode ? '#9CA3AF' : '#6B7280',
    cursor: 'pointer',
    mb: 2,
    display: 'inline-block',
    fontWeight: 500,
    '&:hover': { color: isDarkMode ? '#F9FAFB' : '#148EC3' },
  },
  
  SignInText: {
    fontSize: '12px',
    color: isDarkMode ? '#9CA3AF' : '#6B7280',
  },
  
  SignUpLink: {
    color: isDarkMode ? '#38BDF8' : '#148EC3',
    cursor: 'pointer',
    fontWeight: 500,
  },
  
  ComplianceBox: {
    display: 'flex',
    gap: 1.5,
    padding: '12px',
    backgroundColor: isDarkMode ? 'rgba(239, 68, 68, 0.1)' : '#FEF2F2',
    borderRadius: '8px',
    border: `1px solid ${isDarkMode ? 'rgba(239, 68, 68, 0.2)' : '#FEE2E2'}`,
  },
  
  GavelIcon: {
    color: isDarkMode ? '#F87171' : '#EF4444',
    fontSize: '18px',
    mt: 0.5,
  },
  
  ComplianceText: {
    fontSize: '9px',
    color: isDarkMode ? '#FCA5A5' : '#7F1D1D',
    lineHeight: 1.5,
    fontWeight: 500,
  },
  
  ComplianceTitle: {
    fontWeight: 700,
    display: 'block',
    marginBottom: '2px',
  },
});