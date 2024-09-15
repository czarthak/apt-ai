import React, { useState } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import backgroundImage from '../../images/pic4.jpg'; // Corrected image path

export const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [myToken, setMyToken] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    Axios.post('http://localhost:8080/auth/login', {
      email: email,
      password: pass,
    })
      .then((response) => {
        if (response.data.result === 'success') {
          setToken(response);
          setLoggedIn(true);
          setMyToken(response.data);
        } else {
          setError('Invalid email or password. Please try again.');
        }
      })
      .catch((error) => {
        setError('An error occurred. Please try again later.');
        console.error('Login error:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loggedIn) {
    return <Navigate to="/accountinfo" token={myToken} />;
  }

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.85)', // Semi-transparent background for the login box
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          sx={{ fontFamily: 'Quicksand, sans-serif' }}
        >
          Welcome Back!
        </Typography>

        {/* Start of the form */}
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ fontFamily: 'Quicksand, sans-serif' }}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            type={showPassword ? 'text' : 'password'}
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            sx={{ fontFamily: 'Quicksand, sans-serif' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          <Box sx={{ position: 'relative', mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{
                padding: (theme) => theme.spacing(1.5),
                fontWeight: 'bold',
                fontSize: '1rem',
                textTransform: 'none',
                fontFamily: 'Quicksand, sans-serif',
              }}
            >
              Log In
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  color: 'primary.main',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            )}
          </Box>
        </Box>
        {/* End of the form */}

        {/* "Don't have an account?" message */}
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 2, fontFamily: 'Quicksand, sans-serif' }}
        >
          Don't have an account?{' '}
          <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>
            Register here
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
