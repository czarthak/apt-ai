import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Navbar = ({ token }) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const menuItems = token
    ? [
        { text: 'Profile', link: '/accountinfo' },
        { text: 'Listings', link: '/searchListings' },
        { text: 'Find Roommates', link: '/listallorganizations' },
        { text: 'Chatbot', link: '/bot' },
        {
          text: 'Sign Out',
          link: '/',
          action: () => {
            sessionStorage.removeItem('token');
            window.location.reload(false);
          },
        },
      ]
    : [{ text: 'Login', link: '/login' }];

  const drawer = (
    <Drawer
      anchor="left"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            component={NavLink}
            to={item.link}
            onClick={() => {
              setDrawerOpen(false);
              if (item.action) item.action();
            }}
          >
            <ListItemText
              primary={item.text}
              sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: '#0f172a' }}>
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'white',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 600,
            }}
          >
            Home
          </Typography>
          {isMobile ? (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
              <IconButton
                color="inherit"
                edge="end"
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
              {drawer}
            </>
          ) : (
            menuItems.map((item, index) => (
              <Button
                key={index}
                component={NavLink}
                to={item.link}
                color="inherit"
                onClick={item.action}
                sx={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 500,
                  marginLeft: 2,
                }}
              >
                {item.text}
              </Button>
            ))
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
