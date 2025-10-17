import Axios from "axios";
import { API_SERVER } from "../config/constant";
import { getCookie } from "../utils/cookies";
import i18next from "i18next";

const languageMap = {
  en: "en-US",
  ar: "ar-SA",
};

const axios = Axios.create({
  baseURL: `${API_SERVER}/api`,
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": i18next.language || "en-US",
  },
});

axios.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["Accept-Language"] =
      languageMap[i18next.language] || "en-US";
    return config;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default axios;
