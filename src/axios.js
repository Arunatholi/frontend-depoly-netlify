import axios from "axios";

const instance = axios.create({
    baseURL : "https://deploy-back-bsxa.onrender.com/"
});

export default instance;