import axios from "axios";

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_SERVER,
    withCredentials: true,
})

// API.interceptors()

export default API;