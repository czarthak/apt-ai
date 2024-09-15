import Axios from "axios";
import { useNavigate } from "react-router-dom";
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
import React, { useState, useEffect } from "react";

const SearchAllListings = () => {
  const listingData = [
    {
      email: "john.doe@example.com",
      description:
        "A cozy apartment near the campus with a large living room and modern kitchen.",
      people: 2,
      bathrooms: 1,
      price: 800.0,
      pets: "NO",
      sex: "EITHER",
      id: "listing001",
      db_id: 18,
    },
    {
      email: "jane.smith@example.com",
      description:
        "Spacious 3-bedroom house with a backyard. Perfect for pet lovers.",
      people: 3,
      bathrooms: 2,
      price: 1200.0,
      pets: "YES",
      sex: "FEMALE",
      id: "listing002",
      db_id: 22,
    },
    {
      email: "alice.brown@example.com",
      description:
        "Modern apartment with 1 bedroom and 1 bathroom, ideal for a single person or a couple.",
      people: 1,
      bathrooms: 1,
      price: 950.0,
      pets: "SERVICE",
      sex: "EITHER",
      id: "listing003",
      db_id: 23,
    },
    {
      email: "mark.jones@example.com",
      description:
        "2-bedroom apartment, walking distance to public transport and grocery stores.",
      people: 2,
      bathrooms: 1,
      price: 700.0,
      pets: "NO",
      sex: "MALE",
      id: "listing004",
      db_id: 24,
    },
    {
      email: "emily.watson@example.com",
      description:
        "Luxury apartment with 3 bedrooms, 2 bathrooms, and a pet-friendly policy.",
      people: 3,
      bathrooms: 2,
      price: 1500.0,
      pets: "YES",
      sex: "EITHER",
      id: "listing005",
      db_id: 25,
    },
  ];

  const navigate = useNavigate();

  const [filterPeople, setFilterPeople] = useState("");
  const [filterBathrooms, setFilterBathrooms] = useState("");
  const [filterPrice, setFilterPrice] = useState("");
  const [filterPets, setFilterPets] = useState("");
  const [filterSex, setFilterSex] = useState("");

  const [listings, setListings] = useState(listingData);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await Axios.get("http://localhost:8080/listing/all");
        setListings(response.data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };
    fetchListings();
  }, []);

  const filteredListings = listings.filter((listing) => {
    const listingPrice = parseFloat(listing.price);
    const selectedPrice = parseFloat(filterPrice);
    const priceCondition = filterPrice ? listingPrice <= selectedPrice : true;
    const petsCondition = filterPets ? listing.pets === filterPets : true;
    const sexCondition = filterSex ? listing.sex === filterSex : true;

    return (
      (filterPeople ? listing.people === parseInt(filterPeople) : true) &&
      (filterBathrooms
        ? listing.bathrooms === parseInt(filterBathrooms)
        : true) &&
      priceCondition &&
      petsCondition &&
      sexCondition
    );
  });

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <FormControl sx={{ mb: 2, minWidth: 120 }}>
        <InputLabel id="people-select-label">People</InputLabel>
        <Select
          labelId="people-select-label"
          id="people-select"
          value={filterPeople}
          label="People"
          onChange={(e) => setFilterPeople(e.target.value)}
          size="small">
          <MenuItem value="">All</MenuItem>
          <MenuItem value="1">1 Person</MenuItem>
          <MenuItem value="2">2 People</MenuItem>
          <MenuItem value="3">3 People</MenuItem>
          <MenuItem value="4">4 People</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ mb: 2, minWidth: 120 }}>
        <InputLabel id="bathrooms-select-label">Bathrooms</InputLabel>
        <Select
          labelId="bathrooms-select-label"
          id="bathrooms-select"
          value={filterBathrooms}
          label="Bathrooms"
          onChange={(e) => setFilterBathrooms(e.target.value)}
          size="small">
          <MenuItem value="">All</MenuItem>
          <MenuItem value="1">1 Bathroom</MenuItem>
          <MenuItem value="2">2 Bathrooms</MenuItem>
          <MenuItem value="3">3 Bathrooms</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ mb: 2, minWidth: 120 }}>
        <InputLabel id="price-select-label">Price</InputLabel>
        <Select
          labelId="price-select-label"
          id="price-select"
          value={filterPrice}
          label="Price"
          onChange={(e) => setFilterPrice(e.target.value)}
          size="small">
          <MenuItem value="">All</MenuItem>
          <MenuItem value="500">Less than $500</MenuItem>
          <MenuItem value="800">Less than $800</MenuItem>
          <MenuItem value="1000">Less than $1000</MenuItem>
          <MenuItem value="1500">Less than $1500</MenuItem>
          <MenuItem value="2000">Less than $2000</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ mb: 2, minWidth: 120 }}>
        <InputLabel id="pets-select-label">Pets</InputLabel>
        <Select
          labelId="pets-select-label"
          id="pets-select"
          value={filterPets}
          label="Pets"
          onChange={(e) => setFilterPets(e.target.value)}
          size="small">
          <MenuItem value="">All</MenuItem>
          <MenuItem value="YES">Yes</MenuItem>
          <MenuItem value="SERVICE">Service Animals Only</MenuItem>
          <MenuItem value="NO">No Pets</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ mb: 4, minWidth: 120 }}>
        <InputLabel id="sex-select-label">Sex</InputLabel>
        <Select
          labelId="sex-select-label"
          id="sex-select"
          value={filterSex}
          label="Sex"
          onChange={(e) => setFilterSex(e.target.value)}
          size="small">
          <MenuItem value="">All</MenuItem>
          <MenuItem value="MALE">Male</MenuItem>
          <MenuItem value="FEMALE">Female</MenuItem>
          <MenuItem value="EITHER">Either</MenuItem>
        </Select>
      </FormControl>

      <Grid container spacing={2}>
        {filteredListings.map((listing, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Listing {listing.id}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Email: {listing.email}
                </Typography>
                <Typography variant="body2">
                  Description: {listing.description}
                </Typography>
                <Typography variant="body2">
                  People: {listing.people}
                </Typography>
                <Typography variant="body2">
                  Bathrooms: {listing.bathrooms}
                </Typography>
                <Typography variant="body2">Price: ${listing.price}</Typography>
                <Typography variant="body2">
                  Pets Allowed: {listing.pets}
                </Typography>
                <Typography variant="body2">
                  Gender Preference: {listing.sex}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => navigate(`/listing/${listing.db_id}`)}>
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export { SearchAllListings };
