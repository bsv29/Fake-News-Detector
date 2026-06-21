export const getStyles = (isDarkMode) => ({
  Container: {
    display: 'flex',
    height: '100vh',
    background: isDarkMode ? '#0B0F19' : '#f5f5f5',
    overflow: 'hidden',
  },

  LeftPanel: {
    width: '50%',
    backgroundColor: '#0a0512',
    backgroundImage: `
      radial-gradient(circle at top left, rgba(179, 87, 53, 0.5) 0%, transparent 40%),
      radial-gradient(circle at bottom right, rgba(121, 40, 153, 0.4) 0%, transparent 50%),
      linear-gradient(135deg, #0f0a1f 0%, #0a0512 100%)
    `,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '48px',
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
  },

  LogoWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
    mb: 1,
    ml: '30px',
  },

  LogoImg: {
    width: '40px',
    position: 'absolute',
    top: 52,
    left: 60,
  },

  LogoText: {
    fontSize: '24px',
    fontWeight: 700,
    ml: '30px',
  },

  LogoSpan: {
    fontSize: '24px',
    fontWeight: 700,
    marginRight: '6px',
  },

  ContentBox: {
    mb: 30,
    ml: '30px',
  },

  Heading: {
    fontSize: '32px',
    fontWeight: 700,
    lineHeight: 1.2,
    mb: 3,
  },

  SubText: {
    fontSize: '14px',
    opacity: 0.9,
    lineHeight: 1.6,
  },

  Footer: {
    display: 'flex',
    gap: 3,
    alignItems: 'center',
    ml: '30px',
  },

  FooterItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },

  LockIcon: {
    fontSize: '14px',
  },

  FooterText: {
    fontSize: '12px',
    fontWeight: 400,
    color: '#f6f6f8',
  },

  CheckCircle: {
    width: '14px',
    height: '14px',
    borderRadius: '50%',
    border: '2px solid white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  CheckText: {
    fontSize: '10px',
    fontWeight: 700,
  },

  RightPanel: {
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px',
    py: '20px',
  },
});
