import axios from "axios"
// import {BASE_URL} from "./constants"

const axiosInstance = axios.create({
    baseURL : "https://backend-handala.onrender.com/api",
    timeout : 100000,
    headers : {
        "Content-Type" : "application/json"
    }
})


axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default axiosInstance
