import React, { useState, useEffect } from "react";
import Axios from "axios";
import PropTypes from "prop-types";
import "./AccountInformation.css";
import Places from "../map/places";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Snackbar,
  Alert,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import backgroundImage from "../../images/pic30.webp";

const AccountInformation = ({ token }) => {
  const [userInfo, setUserInfo] = useState({
    fname: "",
    lname: "",
    password: "",
    phoneNumber: "",
    email: "",
    year: "",
    major: "",
    bio: "",
    preferApart: "",
    budget: "",
    personalTrait: "",
  });

  const [selectedApts, setSelectedApts] = useState([]);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    // Fetch user information when the component mounts
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const response = await Axios.post("http://localhost:8080/user/user", {
        jwt: token.jwt,
      });
      if (response.data.result === "success") {
        setUserInfo(response.data.user);
        setSelectedApts(response.data.apt);
      } else {
        console.error("Error fetching user information");
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      await Axios.put("http://localhost:8080/user/update", {
        ...userInfo,
        jwt: token.jwt,
      });
      setUpdateSuccess(true);
      console.log("User information updated successfully");
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const handleLocationSelect = async (location) => {
    try {
      const response = await Axios.post("http://localhost:8080/apt/user/add", {
        jwt: token.jwt,
        description: location.description,
        id: location.reference,
      });
      setSelectedApts((prevApts) => [
        ...prevApts,
        [location.description, location.reference],
      ]);
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };

  const removeApartment = async (id) => {
    try {
      const response = await Axios.post(
        "http://localhost:8080/apt/user/delete",
        {
          jwt: token.jwt,
          id: id,
        }
      );

      if (response.data.result === "success") {
        setSelectedApts(selectedApts.filter((apt) => apt[1] !== id));
      }
    } catch (error) {
      console.error("Error removing apartment:", error);
    }
  };

  const getImageUrl = (email) => {
    const imageName = email.replace(/[@.]/g, "") + ".jpeg";
    const imageUrl = `${process.env.PUBLIC_URL}/${imageName}`;
    return imageUrl;
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          mt: 4,
          mb: 4,
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          borderRadius: 2,
          padding: 4,
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar
            src={getImageUrl(userInfo.email)}
            sx={{ width: 80, height: 80, m: 2 }}
            alt={`${userInfo.fname} ${userInfo.lname}`}
          />
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontFamily: "Quicksand, sans-serif" }}
          >
            Profile Information
          </Typography>

          {/* Success message Snackbar */}
          <Snackbar
            open={updateSuccess}
            autoHideDuration={3000}
            onClose={() => setUpdateSuccess(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={() => setUpdateSuccess(false)}
              severity="success"
              sx={{ width: "100%" }}
            >
              Information updated successfully!
            </Alert>
          </Snackbar>

          <Box
            component="form"
            onSubmit={handleUpdate}
            sx={{ mt: 3, width: "100%" }}
          >
            <Grid container spacing={2}>
              {/* First Name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="fname"
                  label="First Name"
                  name="fname"
                  autoComplete="given-name"
                  value={userInfo.fname}
                  onChange={handleChange}
                  sx={{ fontFamily: "Quicksand, sans-serif" }}
                />
              </Grid>
              {/* Last Name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lname"
                  label="Last Name"
                  name="lname"
                  autoComplete="family-name"
                  value={userInfo.lname}
                  onChange={handleChange}
                  sx={{ fontFamily: "Quicksand, sans-serif" }}
                />
              </Grid>
              {/* Password */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={userInfo.password}
                  onChange={handleChange}
                  sx={{ fontFamily: "Quicksand, sans-serif" }}
                />
              </Grid>
              {/* Phone Number */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  value={userInfo.phoneNumber || ""}
                  onChange={handleChange}
                  sx={{ fontFamily: "Quicksand, sans-serif" }}
                />
              </Grid>
              {/* Email */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={userInfo.email}
                  onChange={handleChange}
                  sx={{ fontFamily: "Quicksand, sans-serif" }}
                />
              </Grid>
              {/* Year */}
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  id="year"
                  label="Year"
                  name="year"
                  value={userInfo.year}
                  onChange={handleChange}
                  SelectProps={{
                    native: true,
                  }}
                  sx={{ fontFamily: "Quicksand, sans-serif" }}
                >
                  <option value="">Select Year</option>
                  <option value="Freshman">Freshman</option>
                  <option value="Sophomore">Sophomore</option>
                  <option value="Junior">Junior</option>
                  <option value="Senior">Senior</option>
                  <option value="Grad">Grad</option>
                </TextField>
              </Grid>
              {/* Major */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="major"
                  label="Major"
                  name="major"
                  value={userInfo.major}
                  onChange={handleChange}
                  sx={{ fontFamily: "Quicksand, sans-serif" }}
                />
              </Grid>
              {/* Bio */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="bio"
                  label="Biography (A little about yourself)"
                  name="bio"
                  multiline
                  rows={4}
                  value={userInfo.bio}
                  onChange={handleChange}
                  sx={{ fontFamily: "Quicksand, sans-serif" }}
                />
              </Grid>
              {/* Budget */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="budget"
                  label="Budget (Per Month)"
                  name="budget"
                  value={userInfo.budget}
                  onChange={handleChange}
                  sx={{ fontFamily: "Quicksand, sans-serif" }}
                />
              </Grid>
              {/* Add Places */}
              <Grid item xs={12}>
                <Typography
                  variant="subtitle1"
                  sx={{ mt: 2, fontFamily: "Quicksand, sans-serif" }}
                >
                  Add some places you'd want to live at here
                </Typography>
                <Places handleLocationSelect={handleLocationSelect} />
              </Grid>
              {/* Selected Apartments */}
              {selectedApts.length > 0 && (
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle1"
                    sx={{ mt: 2, fontFamily: "Quicksand, sans-serif" }}
                  >
                    Apartments shortlisted
                  </Typography>
                  {selectedApts.map((apt, index) => (
                    <Box
                      key={index}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      p={1}
                      my={1}
                      border={1}
                      borderColor="grey.300"
                      borderRadius={2}
                    >
                      <Typography
                        sx={{ fontFamily: "Quicksand, sans-serif" }}
                      >
                        {apt[0]}
                      </Typography>
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        onClick={() => removeApartment(apt[1])}
                      >
                        Remove
                      </Button>
                    </Box>
                  ))}
                </Grid>
              )}
            </Grid>
            {/* Update Information Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                mt: 3,
                mb: 2,
                fontFamily: "Quicksand, sans-serif",
              }}
            >
              Update Information
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

AccountInformation.propTypes = {
  token: PropTypes.shape({
    jwt: PropTypes.string.isRequired,
  }).isRequired,
};

export default AccountInformation;
