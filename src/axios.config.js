import axios from "axios";

const http = axios.create();

http.defaults.baseURL = "https://server.dery.uz/api/v1/";

export default http;
