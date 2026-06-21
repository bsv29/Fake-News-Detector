import { Box, TextField, Button, Typography, InputAdornment, IconButton, Paper, Checkbox, FormControlLabel, Divider } from '@mui/material';
import { Visibility, VisibilityOff, EmailOutlined, LockOutlined, ShieldOutlined, Person } from '@mui/icons-material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import GoogleIcon from '@mui/icons-material/Google';
import MicrosoftIcon from '@mui/icons-material/Window';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStyles } from './Styles';
import axios from 'axios';
import toast from 'react-hot-toast';
import AuthLayout from '../Layout/AuthLayout';
import { useThemeMode } from '../../../hooks/useThemeMode';

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { isDarkMode } = useThemeMode();
  const Styles = getStyles(isDarkMode);
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', confirmPassword: '', agreeToTerms: false });

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const passwordsMatch = formData.password && formData.confirmPassword === formData.password;
  const canSubmit = formData.fullName && formData.email && formData.password && passwordsMatch && formData.agreeToTerms;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    
    try {
      await axios.post('http://localhost:8000/api/v1/auth/register', {
        username: formData.fullName,
        email: formData.email,
        password: formData.password
      });
      
      toast.success("Account created successfully! Please login.");
      navigate(`/login`);
    } catch (error) {
      toast.error(error.response?.data?.detail || "Failed to create account.");
    }
  };

  return (
    <AuthLayout>
      <Paper elevation={0} sx={Styles.Paper}>
        <Box sx={Styles.HeaderContainer}>
          <Box sx={Styles.ShieldIconWrapper}>
            <ShieldOutlined sx={Styles.ShieldIcon} />
          </Box>
          <Typography sx={Styles.Title}>Create Your Account</Typography>
          <Typography sx={Styles.Subtitle}>Secure Enterprise Compliance Portal</Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <Box sx={Styles.FormBox}>
            <Typography sx={Styles.FieldLabel}>Full Name</Typography>
            <TextField
              fullWidth
              placeholder="Enter your full name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              variant="outlined"
              slotProps={{ input: { startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={Styles.InputIcon} />
                  </InputAdornment>
                ) } }}
              sx={Styles.TextField}
            />
          </Box>

          {/* Email */}
          <Box sx={Styles.FormBox}>
            <Typography sx={Styles.FieldLabel}>Email Address</Typography>
            <TextField
              fullWidth
              placeholder="Enter your work email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              type="email"
              slotProps={{ input: { startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlined sx={Styles.InputIcon} />
                  </InputAdornment>
                ) } }}
              sx={Styles.TextField}
            />
          </Box>

          {/* Password */}
          <Box sx={{ mb: 1 }}>
            <Typography sx={Styles.FieldLabel}>Password</Typography>
            <TextField
              fullWidth
              placeholder="Create a strong password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
              slotProps={{ input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined sx={Styles.InputIcon} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff sx={Styles.InputIcon} /> : <Visibility sx={Styles.InputIcon} />}
                    </IconButton>
                  </InputAdornment>
                ) } }}
              sx={Styles.TextField}
            />
          </Box>

          {/* Confirm Password */}
          <Box sx={Styles.ConfirmPasswordBox}>
            <Typography sx={Styles.FieldLabel}>Confirm Password</Typography>
            <TextField
              fullWidth
              placeholder="Confirm your password"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              variant="outlined"
              error={!!formData.confirmPassword && !passwordsMatch}
              helperText={
                formData.confirmPassword && !passwordsMatch
                  ? 'Passwords do not match'
                  : ''
              }
              slotProps={{ input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined sx={Styles.InputIcon} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowConfirmPassword} edge="end">
                      {showConfirmPassword ? <VisibilityOff sx={Styles.InputIcon} /> : <Visibility sx={Styles.InputIcon} />}
                    </IconButton>
                  </InputAdornment>
                ) } }}
              sx={Styles.TextField}
            />
          </Box>

          <Box sx={Styles.TermsBox}>
            <FormControlLabel
              control={
                <Checkbox 
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  size="small"
                  sx={{ color: isDarkMode ? '#6B7280' : '#D1D5DB', '&.Mui-checked': { color: '#BE185D' } }}
                />
              }
              label={
                <Typography sx={Styles.TermsText}>
                  I agree to the <span style={Styles.TermsHighlight}>Terms of Service</span> and <span style={Styles.TermsHighlight}>Privacy Policy</span>
                </Typography>
              }
            />
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={!canSubmit}
            sx={Styles.SubmitButton}
          >
            Create Account <ArrowRightAltIcon sx={Styles.ArrowIcon} />
          </Button>

          <Box sx={Styles.LinksContainer}>
            <Typography sx={Styles.SignInText}>
              Already have an account?{' '}
              <span onClick={() => navigate(`/login`)} style={Styles.SignInLink}>
                Sign In
              </span>
            </Typography>
          </Box>
        </form>
      </Paper>
    </AuthLayout>
  );
};

export default Signup;
