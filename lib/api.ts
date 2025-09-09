import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.88.28:8000/api",
    timeout: 5000,
})

export default api

// http://192.168.88.28:8000

// http://ihc.local/api/

