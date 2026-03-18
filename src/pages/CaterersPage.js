import React, { useEffect, useState } from "react";
import { getCaterers, deleteCaterer, addCaterer } from "../services/api";
import CatererCard from "../components/CatererCard";
import SearchBar from "../components/Searchbar";
import Filter from "../components/Filter";
import "./CaterersPage.css";


function CaterersPage() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState("");
  const [page, setPage] = useState("home"); // 'home' or 'add'

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    getCaterers().then((res) => setData(res.data));
  };

  const handleDelete = async (id) => {
    await deleteCaterer(id);
    fetchData();
  };

  const filtered = data.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) &&
    (price ? c.pricePerPlate <= price : true)
  );

  //post
  const [newCaterer, setNewCaterer] = useState({
    name: "",
    location: "",
    pricePerPlate: "",
    cuisines: "",
    rating: ""
  });

  const handleAdd = async (e) => {
    e.preventDefault();
    const catererToAdd = {
      ...newCaterer,
      pricePerPlate: Number(newCaterer.pricePerPlate),
      cuisines: newCaterer.cuisines.split(",").map(c => c.trim()),
      rating: Number(newCaterer.rating)
    };
    await addCaterer(catererToAdd);
    setNewCaterer({ name: "", location: "", pricePerPlate: "", cuisines: "", rating: "" });
    fetchData();
    setPage("home");
  };

  return (
    <div className="caterers-container">
      <nav className="navbar">
        <div className="nav-title">CaterersNearMe</div>
        <div className="nav-links">
          <button className={page === "home" ? "nav-btn active" : "nav-btn"} onClick={() => setPage("home")}>Home</button>
          <button className={page === "add" ? "nav-btn active" : "nav-btn"} onClick={() => setPage("add")}>Add Caterer</button>
        </div>
      </nav>

      {page === "add" && (
        <section className="add-section">
          <h2>Add a New Caterer</h2>
          <form className="add-form" onSubmit={handleAdd}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                value={newCaterer.name}
                onChange={e => setNewCaterer({ ...newCaterer, name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Location"
                value={newCaterer.location}
                onChange={e => setNewCaterer({ ...newCaterer, location: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                placeholder="Price Per Plate"
                value={newCaterer.pricePerPlate}
                onChange={e => setNewCaterer({ ...newCaterer, pricePerPlate: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Cuisines (e.g. Indian, Chinese)"
                value={newCaterer.cuisines}
                onChange={e => setNewCaterer({ ...newCaterer, cuisines: e.target.value })}
                required
              />
              <select
                value={newCaterer.rating}
                onChange={e => setNewCaterer({ ...newCaterer, rating: e.target.value })}
                required
              >
                <option value="">Rating</option>
                {[...Array(9)].map((_, i) => {
                  const val = (i + 1) * 0.5 + 0.5;
                  return (
                    <option key={val} value={val.toFixed(1)}>{val.toFixed(1)}</option>
                  );
                })}
              </select>
            </div>
            <button className="add-btn" type="submit">Add Caterer</button>
          </form>
        </section>
      )}

      {page === "home" && (
        <>
          <section className="search-filter-section">
            <SearchBar search={search} setSearch={setSearch} />
            <Filter price={price} setPrice={setPrice} />
          </section>
          <section className="list-section">
            <h2>Available Caterers</h2>
            {filtered.length === 0 ? (
              <p className="no-caterers">No caterers found.</p>
            ) : (
              filtered.map((c) => (
                <CatererCard key={c.id} caterer={c} onDelete={handleDelete} />
              ))
            )}
          </section>
        </>
      )}
    </div>
  );
}

export default CaterersPage;