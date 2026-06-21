import { Box, TextField, Button, Typography, InputAdornment, IconButton, Paper } from '@mui/material';
import { Visibility, VisibilityOff, EmailOutlined, LockOutlined, ShieldOutlined } from '@mui/icons-material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../../context/AuthContext';
import { getStyles } from './Styles';
import { useFormik } from 'formik';
import AuthLayout from '../Layout/AuthLayout';
import { useThemeMode } from '../../../hooks/useThemeMode';

const Login = () => {
  const initialValues = {
    email_id: "",
    password: ""
  }
  
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { isDarkMode } = useThemeMode();
  const Styles = getStyles(isDarkMode);

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"}/api/v1/auth/login`, {
          email: values.email_id,
          password: values.password
        });
        
        if (response.data && response.data.access_token) {
          login(response.data.access_token);
          toast.success("Successfully logged in!");
          navigate('/analytics-page');
        }
      } catch (error) {
        toast.error(error.response?.data?.detail || "Invalid email or password.");
      }
    }
  })

  return (
    <AuthLayout>
      <Paper elevation={0} sx={Styles.Paper}>
        <Box sx={Styles.HeaderContainer}>
          <Box sx={Styles.ShieldIconWrapper}>
            <ShieldOutlined sx={Styles.ShieldIcon} />
          </Box>
          <Typography sx={Styles.Title}>
            Welcome Back
          </Typography>
          <Typography sx={Styles.Subtitle}>
            Secure Enterprise Compliance Portal
          </Typography>
        </Box>

        <form onSubmit={handleSubmit} onKeyDown={(e) => { if(e.key === 'Enter') {
          handleSubmit}}}>
          <Box sx={Styles.FormBox}>
            <Typography sx={Styles.FieldLabel}>
              Email ID
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter your Email ID"
              name="email_id"
              value={values.email_id}
              onChange={(e) => { e.target.value = e.target.value.replace(/\s/g, ''); handleChange(e); }} 
              onBlur={handleBlur}
              error={touched.email_id && Boolean(errors.email_id)}
              helperText={touched.email_id && errors.email_id}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlined sx={Styles.InputIcon} />
                  </InputAdornment>
                ),
              }}
              sx={Styles.TextField}
            />
          </Box>

          <Box sx={Styles.PasswordBox}>
            <Typography sx={Styles.PasswordLabel}>
              Password
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={(e) => { e.target.value = e.target.value.replace(/\s/g, ''); handleChange(e); }} 
              onBlur={handleBlur}
              onPaste={(e) => e.preventDefault()}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              variant="outlined"
              InputProps={{
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
                ),
              }}
              sx={Styles.TextField}
            />
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{...Styles.SignInButton, background: (values?.email_id?.trim() === '' || values?.password?.trim()==='') ? '#747E8F' : 'linear-gradient(90deg, #A82859 0%, #C9721B 100%)',}}
            disabled={values?.email_id?.trim() === '' || values?.password?.trim()===''}
          >
            Sign In to Verify <ArrowRightAltIcon sx={Styles.ArrowIcon} />
          </Button>

          <Box sx={Styles.LinksContainer}>
            <Typography
              onClick={() => navigate('/forgot-password')}
              sx={Styles.ForgotLink}
            >
              Forgot Credentials?
            </Typography>
            <Typography sx={{ fontSize: '12px', color: '#6B7280' }}>
              Don&apos;t have an account?{' '}
              <span onClick={() => navigate(`/signup`)} style={{ color: '#BE185D', cursor: 'pointer', fontWeight: 500 }}>
                Sign Up
              </span>
            </Typography>
          </Box>

          {/* <Box sx={Styles.ComplianceBox}>
            <LockOutlined sx={Styles.GavelIcon} />
            <Typography sx={Styles.ComplianceText}>
              <span style={Styles.ComplianceTitle}>
                LOGIN AUDIT & COMPLIANCE NOTICE
              </span>
              <br />
              ALL LOGIN ACTIVITIES ARE LOGGED AND AUDITABLE. SYSTEM ACCESS IS RESTRICTED TO AUTHORIZED
              PERSONNEL. ELECTRONIC RECORDS AND SIGNATURES COMPLY WITH IT ACT & FDA 21 CFR PART 11.
            </Typography>
          </Box> */}
        </form>
      </Paper>
    </AuthLayout>
  );
};

export default Login;
