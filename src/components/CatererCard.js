import React from "react";
import "./CatererCard.css";

function CatererCard({ caterer, onDelete }) {
  return (
    <div className="caterer-card">
      <div className="caterer-header">
        <h2 className="caterer-name">{caterer.name}</h2>
        <button className="delete-btn" title="Delete" onClick={() => onDelete(caterer.id)}>
          &times;
        </button>
      </div>
      <div className="caterer-info">
        <div className="caterer-location">📍 {caterer.location}</div>
        <div className="caterer-price">₹{caterer.pricePerPlate} per plate</div>
        <div className="caterer-rating">⭐ {caterer.rating}</div>
      </div>
      <div className="caterer-cuisines">
        {caterer.cuisines.map((cuisine, idx) => (
          <span className="cuisine-chip" key={idx}>{cuisine}</span>
        ))}
      </div>
    </div>
  );
}

export default CatererCard;