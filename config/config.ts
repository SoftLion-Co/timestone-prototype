import axios from "axios";
import { updateRefreshToken } from "@/services/AuthService";

export const BASE_URL = "http://localhost:4001";
// export const BASE_URL ="https://wellness.markets";
export const CLIENT_URL = "https://timestone.com";

export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(1);
    const originalRequest = error.config;
    console.log(originalRequest);
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const tokens = await updateRefreshToken();
        if (tokens?.accessToken) {
          localStorage.setItem("accessToken", tokens.accessToken);
          localStorage.setItem("refreshToken", tokens.refreshToken);
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${tokens.accessToken}`;
          return api(originalRequest);
        } else {
          localStorage.setItem("accessToken", "");
          localStorage.setItem("refreshToken", "");
        }
      } catch (refreshError) {
        console.error("Failed to refresh token", refreshError);
      }
    }

    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);
