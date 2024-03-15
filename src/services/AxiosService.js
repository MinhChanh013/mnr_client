import axios from "axios";
import { UNAUTHORIZED_ERROR } from "../constants/errors";

const http = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

http.interceptors.request.use(async (config) => {
  const auth = localStorage.getItem("auth");
  const header = {
    Accept: "application/json",
    Authorization: `Bearer ${auth ? JSON.parse(auth)["jwt"] : ""}`,
  };

  config.headers = header;
  return config;
});

http.interceptors.response.use(undefined, function (error) {
  if (
    error &&
    error.response &&
    error.response.status === UNAUTHORIZED_ERROR.status
  ) {
    window.location.href = "/login";
  }
});

export default http;
