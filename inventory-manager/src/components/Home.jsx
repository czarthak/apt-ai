import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';

import Image1 from '../images/pic1.jpg'; // Replace with your image
import FeatureImage1 from '../images/pic2.jpg'; // Replace with your image
import FeatureImage2 from '../images/pic3.jpg'; // Replace with your image

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `url(${Image1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {/* Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        />
        <Container
          sx={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            width: '100%',
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontFamily: 'Quicksand, sans-serif' }} // Apply the font here
          >
            Find a Place To Call Home
          </Typography>
          <Typography
            variant="h5"
            component="p"
            gutterBottom
            sx={{ fontFamily: 'Quicksand, sans-serif' }} // Apply the font here
          >
            Connecting students to create lasting roommate relationships.
          </Typography>
          <Button variant="contained" color="secondary" size="large" href="/register">
            Get Started
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ padding: (theme) => theme.spacing(8, 0) }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          align="center"
          sx={{ fontFamily: 'Quicksand, sans-serif' }} // Apply the font here
        >
          Why Choose Roomie Match?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345, margin: 'auto' }}>
              <CardMedia
                component="img"
                alt="Personalized Matches"
                height="200"
                image={FeatureImage1}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ fontFamily: 'Quicksand, sans-serif' }} // Apply the font here
                >
                  Personalized Matches
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ fontFamily: 'Quicksand, sans-serif' }} // Apply the font here
                >
                  Our algorithm connects you with roommates that share your interests and lifestyle.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Second Feature */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345, margin: 'auto' }}>
              <CardMedia
                component="img"
                alt="Easy Filtering"
                height="200"
                image={FeatureImage2}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ fontFamily: 'Quicksand, sans-serif' }} // Apply the font here
                >
                  Easy Filtering
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ fontFamily: 'Quicksand, sans-serif' }} // Apply the font here
                >
                  Filter potential roommates by college, major, hobbies, and more.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Call to Action Section */}
      <Box
        sx={{
          backgroundColor: '#0f172a',
          color: 'white',
          padding: (theme) => theme.spacing(6, 0),
        }}
      >
        <Container>
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{ fontFamily: 'Quicksand, sans-serif' }} // Apply the font here
          >
            Start Your Search Today
          </Typography>
          <Box textAlign="center">
            <Button variant="contained" color="secondary" size="large" href="/register">
              Join Now
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Home;
