import axios from "axios";
import i18n from "i18n/i18n";
import {
  setTokenToLocalStorage,
  getRefreshTokenFromLocalStorage,
  getTokenFromLocalStorage,
  removeRefreshTokenFromLocalStorage,
  removeTokenFromLocalStorage,
} from "utils/localStorage/localStorage";
import { refreshAccessToken } from "features/auth/authSlice";
const BASE_URL = process.env.REACT_APP_API_KEY;
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  function (config) {
    config.headers = {
      "Accept-Language": i18n.language,
    };
    return config;
  },
  function (error) {
    return Promise.reject(error.response.data);
  }
);

export const axiosPrivateInstance = axios.create({
  baseURL: BASE_URL,
});

axiosPrivateInstance.interceptors.request.use(
  function (config) {
    const accessToken = getTokenFromLocalStorage();
    config.headers = {
      Authorization: `Bearer ${accessToken}`,
      "Accept-Language": i18n.language,
      "Content-Type": "application/json",
    };
    return config;
  },
  function (error) {
    return Promise.reject(error.response.data);
  }
);
axiosPrivateInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const prevRequest = error?.config;
    if (error.response?.status === 401 && !prevRequest?.sent) {
      prevRequest.sent = true;

      try {
        const refreshToken = getRefreshTokenFromLocalStorage();
        const newAccessToken = await refreshAccessToken(refreshToken);
        setTokenToLocalStorage(newAccessToken);
        return axiosPrivateInstance(prevRequest);
      } catch (error) {
        removeTokenFromLocalStorage();
        removeRefreshTokenFromLocalStorage();

        window.location.href = "/login?token-expired";
      }
    } else {
      return Promise.reject(error.response.data);
    }
  }
);
