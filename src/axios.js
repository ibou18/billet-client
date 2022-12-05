import axios from "axios";
axios.defaults.baseURL = `${process.env.REACT_APP_API}/api`;
axios.defaults.withCredentials = true;
// axios.defaults.headers["x-access-token"] = TOKEN;
