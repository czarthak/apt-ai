import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
} from "@mui/material";

function ListingDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(() => {
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

    const fetchListing = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/listing/onelisting",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ dbId: id }),
          }
        );

        const data = await response.json();
        if (data.result === "success") {
          const listingReceived = data.data;

          const address = await getAddressFromPlaceId(listingReceived.id);
          const updatedListing = { ...listingReceived, address };

          setListing(updatedListing);
        } else {
          console.error("Error fetching listing:", data.result);
        }
      } catch (error) {
        console.error("Error fetching listing:", error);
      }
    };

    fetchListing();
  }, [id]);

  if (!listing) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ paddingY: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            {listing.address}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Contact: {listing.email}
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            ${listing.price}
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            Description
          </Typography>
          <Typography paragraph>{listing.description}</Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            Details
          </Typography>
          <Typography paragraph>
            <strong>People:</strong> {listing.people}
          </Typography>
          <Typography paragraph>
            <strong>Bathrooms:</strong> {listing.bathrooms}
          </Typography>
          <Button variant="contained" color="primary" fullWidth>
            Contact Seller
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ListingDetails;
