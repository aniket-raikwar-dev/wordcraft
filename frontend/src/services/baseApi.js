import axios from "axios";

const BASE_URL = "https://wordcraft-qfou.onrender.com/api/v1";
// const BASE_URL = "http://localhost:8000/api/v1";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token")
      ? `Bearer ${localStorage.getItem("token")}`
      : null,
  },
});
