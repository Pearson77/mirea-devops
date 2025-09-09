import axios from "axios";

const client = axios.create({
    baseURL: "https://spasdenny.ru/api",
});

export default client;
