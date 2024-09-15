import React from 'react';
import { useParams } from 'react-router-dom';

function ListingDetails() {
  const { id } = useParams(); // Get the listing ID from the URL

  return (
    <div>
      <h1>Listing Details</h1>
      <p>Details for listing ID: {id}</p>
      {/* Fetch and display listing details using the id */}
    </div>
  );
}

export default ListingDetails;
