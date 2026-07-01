import axios from "axios";

const API_KEY = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
    baseURL : API_KEY,
    withCredentials : true,
})

export default axiosInstance