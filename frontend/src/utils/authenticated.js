import { api } from "../services/baseApi";

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
