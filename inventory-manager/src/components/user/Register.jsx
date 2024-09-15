import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
} from '@mui/material';
import backgroundImage from '../../images/pic4.jpg';

export const Register = (props) => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:8080/user/add', {
      email: email,
      lname: lname,
      fname: fname,
      phoneNumber: phoneNumber,
      password: pass,
    }).then((response) => {
      navigate('/login');
      console.log(response);
    });
  };

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
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
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
          Create Account
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            sx={{ fontFamily: 'Quicksand, sans-serif' }}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            sx={{ fontFamily: 'Quicksand, sans-serif' }}
          />
          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ fontFamily: 'Quicksand, sans-serif' }}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            sx={{ fontFamily: 'Quicksand, sans-serif' }}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            sx={{ fontFamily: 'Quicksand, sans-serif' }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              padding: (theme) => theme.spacing(1.5),
              fontWeight: 'bold',
              fontSize: '1rem',
              textTransform: 'none',
              fontFamily: 'Quicksand, sans-serif',
              mt: 2,
            }}
          >
            Register
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;
