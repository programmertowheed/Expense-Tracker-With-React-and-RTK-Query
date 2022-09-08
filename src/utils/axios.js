import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://ptjsonserver.herokuapp.com",
});

export default axiosInstance;
