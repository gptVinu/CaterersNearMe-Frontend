import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080/api"
});

export const getCaterers = () => API.get("/caterers");
export const deleteCaterer = (id) => API.delete(`/caterers/${id}`);
export const addCaterer = (caterer) => API.post("/caterers", caterer);