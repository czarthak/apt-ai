import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import PropTypes from "prop-types";
import Places from "../map/places";

const MyListings = ({ token }) => {
  const [userInfo, setUserInfo] = useState({
    email: "",
  });
  const [newListingData, setNewListingData] = useState({
    people: 2,
    bathrooms: 2,
    price: "750", // Store price as a string
    description: "",
    id: "",
    pets: "NO",
    sex: "MALE",
  });
  const [userListings, setUserListings] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await Axios.post("http://localhost:8080/user/user", {
          jwt: token.jwt,
        });
        if (response.data.result === "success") {
          setUserInfo(response.data.user);
        } else {
          console.error("Error fetching user info:", response.data);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    const fetchUserListings = async () => {
      try {
        const response = await Axios.post(
          "http://localhost:8080/listing/my-listings",
          {
            jwt: token.jwt,
          }
        );
        if (response.data.result === "success") {
          setUserListings(response.data.listings || []); // Ensure it's an array
        } else {
          console.error("Error fetching listings:", response.data);
        }
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchUserInfo();
    fetchUserListings();
  }, [token.jwt]);

  const handleCreateListing = async () => {
    const requiredFields = [
      "price",
      "description",
      "id",
      "people",
      "bathrooms",
    ];
    const missingFields = requiredFields.filter(
      (field) => !newListingData[field] || newListingData[field] === ""
    );

    if (missingFields.length > 0) {
      alert(
        `Please fill out the following fields: ${missingFields.join(", ")}`
      );
      return;
    }

    const requestBody = {
      jwt: token.jwt,
      email: userInfo.email,
      people: newListingData.people,
      bathrooms: newListingData.bathrooms,
      price: newListingData.price, // Price is sent as a string
      description: newListingData.description,
      id: newListingData.id,
      pets: newListingData.pets,
      sex: newListingData.sex,
    };

    try {
      const response = await Axios.post(
        "http://localhost:8080/listing/user/add",
        requestBody
      );
      console.log("Create Listing Response:", response.data);

      if (response.data.result === "success") {
        setUserListings((prevListings) => [
          ...prevListings,
          response.data.listing || {}, // Ensure listing is not undefined
        ]);
      } else {
        console.error("Error creating listing:", response.data);
      }
    } catch (error) {
      console.error("Error creating listing:", error);
    }
  };

  // Delete listing function
  const handleDeleteListing = async (id) => {
    try {
      await Axios.delete(`http://localhost:8080/listing/${id}`);
      // After successfully deleting, remove the listing from the UI
      setUserListings((userListings) =>
        userListings.filter((listing) => listing.db_id !== id)
      );
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  const handleNewListingChange = (e) => {
    const { name, value } = e.target;
    setNewListingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create a Listing
        </Typography>
        <TextField
          fullWidth
          id="description"
          name="description"
          label="Description"
          multiline
          rows={4}
          variant="outlined"
          value={newListingData.description}
          onChange={handleNewListingChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          id="people"
          name="people"
          label="Number of People"
          type="number"
          variant="outlined"
          value={newListingData.people}
          onChange={handleNewListingChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          id="bathrooms"
          name="bathrooms"
          label="Number of Bathrooms"
          type="number"
          variant="outlined"
          value={newListingData.bathrooms}
          onChange={handleNewListingChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          id="price"
          name="price"
          label="Price"
          type="text"
          variant="outlined"
          value={newListingData.price}
          onChange={handleNewListingChange}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
          <InputLabel id="pets-select-label">Pets</InputLabel>
          <Select
            labelId="pets-select-label"
            id="pets"
            name="pets"
            value={newListingData.pets}
            onChange={handleNewListingChange}
            label="Pets">
            <MenuItem value="NO">No</MenuItem>
            <MenuItem value="YES">Yes</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
          <InputLabel id="sex-select-label">Sex</InputLabel>
          <Select
            labelId="sex-select-label"
            id="sex"
            name="sex"
            value={newListingData.sex}
            onChange={handleNewListingChange}
            label="Sex">
            <MenuItem value="MALE">Male</MenuItem>
            <MenuItem value="FEMALE">Female</MenuItem>
            <MenuItem value="ANY">Any</MenuItem>
          </Select>
        </FormControl>
        <Places
          handleLocationSelect={(location) =>
            setNewListingData((prevData) => ({
              ...prevData,
              id: location.reference,
            }))
          }
        />
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button variant="contained" onClick={handleCreateListing}>
            Create Listing
          </Button>
        </Box>
      </Box>

      <Typography variant="h4" gutterBottom>
        Your Listings
      </Typography>
      <Grid container spacing={2}>
        {userListings.map((listing) => (
          <Grid item xs={12} sm={6} md={4} key={listing.id}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 2,
              }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  Listing {listing.id}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Email: {listing.email}
                </Typography>
                <Typography variant="body2">
                  Description:{" "}
                  {listing.description || "No description provided"}
                </Typography>
                <Typography variant="body2">
                  People: {listing.people || "N/A"}
                </Typography>
                <Typography variant="body2">
                  Bathrooms: {listing.bathrooms || "N/A"}
                </Typography>
                <Typography variant="body2">
                  Price: ${listing.price || "N/A"}
                </Typography>
                <Typography variant="body2">
                  Pets Allowed: {listing.pets || "N/A"}
                </Typography>
                <Typography variant="body2">
                  Gender Preference: {listing.sex || "N/A"}
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  width: "100%", // Makes the CardActions span the full width of the card
                  justifyContent: "space-between", // Ensures buttons are spaced apart
                  p: 1, // Adds some padding to the buttons for spacing
                }}>
                <Button
                  size="small"
                  onClick={() => navigate(`/listing/${listing.db_id}`)}>
                  View Details
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleDeleteListing(listing.db_id)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

MyListings.propTypes = {
  token: PropTypes.shape({
    jwt: PropTypes.string.isRequired,
  }).isRequired,
};

export default MyListings;
