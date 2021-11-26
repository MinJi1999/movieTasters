import axios from "axios";

const { NODE_ENV } = process.env;
const PRODUCTION_BASE_URL = "https://movie-tasters.herokuapp.com/";
const DEVELOPMENT_BASE_URL = "http://localhost:3000";

export const baseURL =
  NODE_ENV === "production" ? PRODUCTION_BASE_URL : DEVELOPMENT_BASE_URL;

const apiClient = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 3000,
});

export default apiClient;
