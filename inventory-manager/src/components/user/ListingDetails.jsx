import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ListingDetails.css";
import Axios from "axios";

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
  }, [listing]);

  if (!listing) {
    return <p>Loading...</p>;
  }

  return (
    <div className="listing-container">
      <div className="listing-header">
        <h1>{listing.address}</h1> {/* Using the 'id' field */}
        <p className="listing-email">
          <strong>Contact:</strong> {listing.email}
        </p>
        <p className="listing-price">
          <strong>Price:</strong> ${listing.price}
        </p>
      </div>

      <div className="listing-details">
        <h2>Description</h2>
        <p>{listing.description}</p>
      </div>

      <div className="listing-info">
        <h2>Details</h2>
        <ul>
          <li>
            <strong>People:</strong> {listing.people}
          </li>
          <li>
            <strong>Bathrooms:</strong> {listing.bathrooms}
          </li>
        </ul>
      </div>

      <div className="listing-footer">
        <button className="contact-button">Contact Seller</button>
      </div>
    </div>
  );
}

export default ListingDetails;
