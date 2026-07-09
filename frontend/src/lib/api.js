import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
});

export const submitDemoRequest = (payload) => api.post("/demo", payload);
export const fetchDashboardStats = () => api.get("/dashboard/stats");
export const fetchDocuments = () => api.get("/documents");
export const fetchVerifications = () => api.get("/verifications");
