import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ListingDetails.css';


function ListingDetails() {
  const { id } = useParams(); 
  const [listing, setListing] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch('http://localhost:8080/listing/onelisting', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ dbId: id }), 
        });

        const data = await response.json();
        if (data.result === 'success') {
          setListing(data.data); 
        } else {
          console.error('Error fetching listing:', data.result);
        }
      } catch (error) {
        console.error('Error fetching listing:', error);
      }
    };

    fetchListing();
  }, [id]);

  if (!listing) {
    return <p>Loading...</p>;
  }

  return (
    <div className="listing-container">
      <div className="listing-header">
        <h1>Listing ID: {listing.id}</h1> {/* Using the 'id' field */}
        <p className="listing-email"><strong>Contact:</strong> {listing.email}</p>
        <p className="listing-price"><strong>Price:</strong> ${listing.price}</p>
      </div>

      <div className="listing-details">
        <h2>Description</h2>
        <p>{listing.description}</p>
      </div>

      <div className="listing-info">
        <h2>Details</h2>
        <ul>
          <li><strong>People:</strong> {listing.people}</li>
          <li><strong>Bathrooms:</strong> {listing.bathrooms}</li>
        </ul>
      </div>

      <div className="listing-footer">
        <button className="contact-button">Contact Seller</button>
      </div>
    </div>
  );
}

export default ListingDetails;
