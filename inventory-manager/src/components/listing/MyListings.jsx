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
  Divider,
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
    sex: "EITHER",
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

    const getAddressFromPlaceId = async (placeId) => {
      const apiKey = "AIzaSyB5XqqsxtwR_QCPE8nNwXuAg8EU2EwsoiA"; // Replace with your API key
      const url = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${apiKey}`;

      try {
        const response = await Axios.get(url);
        if (response.data.status === "OK") {
          const address = response.data.results[0].formatted_address;
          return address;
        } else {
          throw new Error("Geocoding failed");
        }
      } catch (error) {
        console.error("Error fetching address:", error);
        return null;
      }
    };

    const fetchUserListings = async () => {
      try {
        const response = await Axios.post(
          "http://localhost:8080/listing/user/all",
          {
            jwt: token.jwt,
          }
        );
        if (response.data.result === "success") {
          const listingsData = response.data.data;

          // Fetch addresses for each listing
          const updatedListings = await Promise.all(
            listingsData.map(async (listing) => {
              const address = await getAddressFromPlaceId(listing.id);
              return { ...listing, address };
            })
          );
          console.log(updatedListings);
          setUserListings(updatedListings || []); // Ensure it's an array
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
    const getAddressFromPlaceId = async (placeId) => {
      const apiKey = "AIzaSyB5XqqsxtwR_QCPE8nNwXuAg8EU2EwsoiA"; // Replace with your API key
      const url = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${apiKey}`;
      try {
        const response = await Axios.get(url);
        if (response.data.status === "OK") {
          const address = response.data.results[0].formatted_address;
          return address;
        } else {
          throw new Error("Geocoding failed");
        }
      } catch (error) {
        console.error("Error fetching address:", error);
        return null;
      }
    };

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
        const thisListing = response.data.data;
        const address = await getAddressFromPlaceId(thisListing.id);

        const updatedListing = { ...thisListing, address };

        setUserListings((prevListings) => [
          ...prevListings,
          updatedListing || {}, // Ensure listing is not undefined
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
      const requestBody = { dbId: id, jwt: token.jwt };
      console.log(requestBody);
      await Axios.post(
        `http://localhost:8080/listing/onelisting/delete`,
        requestBody
      );
      // After successfully deleting, remove the listing from the UI
      setUserListings((userListings) =>
        userListings.filter((listing) => listing.dbid !== id)
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
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gap: 2,
        p: 2,
        height: "100vh",
        backgroundColor: "#f5f5f5", // Light gray background for the entire container
      }}>
      {/* Form Control */}
      <Box
        sx={{
          gridColumn: "1 / 2",
          gridRow: "1 / 3",
          p: 2,
          overflowY: "auto",
          maxWidth: "100%",
          backgroundColor: "#ffffff", // White background for the form area
          borderRadius: 2,
          boxShadow: 3, // Shadow to make the form pop out
        }}>
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
            <MenuItem value="EITHER">Any</MenuItem>
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

      {/* Grid Container for Listings */}
      <Box
        sx={{
          gridColumn: "2 / 4",
          gridRow: "1 / 3",
          p: 2,
          overflowY: "auto",
        }}>
        <Typography variant="h4" gutterBottom>
          Your Listings
        </Typography>
        <Grid container spacing={3}>
          {userListings.map((listing) => (
            <Grid item xs={12} sm={6} md={4} key={listing.id}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 2,
                  borderRadius: 2,
                  boxShadow: 6, // Enhanced shadow for card elevation
                  transition: "transform 0.3s ease", // Smooth hover effect
                  "&:hover": {
                    transform: "translateY(-10px)", // Card lift on hover
                    boxShadow: 8, // Increased shadow on hover
                  },
                }}>
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    {listing.address}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Email: {listing.email}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2">
                    <strong>Description:</strong>{" "}
                    {listing.description || "No description provided"}
                  </Typography>
                  <Typography variant="body2">
                    <strong>People:</strong> {listing.people || "N/A"}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Bathrooms:</strong> {listing.bathrooms || "N/A"}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Price:</strong> ${listing.price || "N/A"}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Pets Allowed:</strong> {listing.pets || "N/A"}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Gender Preference:</strong> {listing.sex || "N/A"}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    width: "100%",
                    justifyContent: "space-between",
                    p: 1,
                  }}>
                  <Button
                    size="small"
                    onClick={() => navigate(`/listing/${listing.dbid}`)}>
                    View Details
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDeleteListing(listing.dbid)}>
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

MyListings.propTypes = {
  token: PropTypes.shape({
    jwt: PropTypes.string.isRequired,
  }).isRequired,
};

export default MyListings;
