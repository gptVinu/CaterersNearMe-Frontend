import React from "react";

function Filter({ price, setPrice }) {
  return (
    <input
      type="number"
      placeholder="Max Price"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
    />
  );
}

export default Filter;