import axios from "axios";
import { BASE_URL } from "@/config/config";

const api = axios.create({
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
	  const originalRequest = error.config;
 
	  if (error.response?.status === 401 && !originalRequest._retry) {
		 originalRequest._retry = true;
 
		 try {
			const refreshedToken = await refreshToken();
			if (refreshedToken?.accessToken) {
			  localStorage.setItem("accessToken", refreshedToken.accessToken);
			  originalRequest.headers["Authorization"] = `Bearer ${refreshedToken.accessToken}`;
			  return api(originalRequest);
			}
		 } catch (refreshError) {
			console.error("Failed to refresh token", refreshError);
		 }
	  }
 
	  console.error("API Error:", error.response?.data || error.message);
	  return Promise.reject(error);
	}
 );

 export const registrateNewUser = async (
	firstName: string,
	lastName: string,
	email: string,
	phone: string,
	dateOfBirth: string,
	password: string,
	receiveUpdates: boolean
 ): Promise<any> => {
	try {
	  const response = await api.post(`/auth/registration`, {
		 firstName,
		 lastName,
		 email,
		 phone,
		 dateOfBirth,
		 password,
		 receiveUpdates,
	  });
	  return response.data; 
	} catch (error) {
	  console.error("Failed to register user:", error);
	  throw error;
	}
 };
 
 export const loginUser = async (
	email: string,
	password: string
 ): Promise<any> => {
	try {
	  const response = await api.post(`/auth/login`, {
		 email,
		 password,
	  });
 
	  if (response?.data?.accessToken && response?.data?.refreshToken) {
		 const { accessToken, refreshToken } = response.data;
		 localStorage.setItem("accessToken", accessToken);
		 localStorage.setItem("refreshToken", refreshToken);
		 return "";
	  }
	} catch (error) {
	  console.error("Failed to login user:", error);
	  throw error;
	}
 };
 
 export const activateAccount = async (token: string): Promise<any> => {
	try {
	  const res = await api.get(`/auth/activate/${token}`);
	  return res.data;
	} catch (error) {
	  console.error("Error during account activation:", error);
	  throw error;
	}
 };
 
 export const updateUser = async (userId: string, userData: any): Promise<any> => {
	try {
	  const res = await api.post(`/auth/update/${userId}`, userData);
	  return res.data;
	} catch (error) {
	  console.error("Error updating user:", error);
	  throw error;
	}
 };
 
 export const updatePassword = async (userId: string, newPassword: string): Promise<any> => {
	try {
	  const res = await api.post(`/auth/update-password/${userId}`, { password: newPassword });
	  return res.data;
	} catch (error) {
	  console.error("Error updating password:", error);
	  throw error;
	}
 };
 
 export const refreshToken = async (): Promise<any> => {
	try {
	  const res = await api.get(`/auth/refresh`);
	  return res.data;
	} catch (error) {
	  console.error("Error refreshing token:", error);
	  throw error;
	}
 };
 
 export const getUser = async (accessToken: string): Promise<any> => {
	try {
	  const res = await api.get(`/auth/user`);
	  return res.data;
	} catch (error) {
	  console.error("Error fetching user data:", error);
	  throw error;
	}
 };
 
 export const googleLogin = async (googleToken: string): Promise<any> => {
	try {
	  const res = await api.post(`/auth/google`, { token: googleToken });
	  return res.data;
	} catch (error) {
	  console.error("Error during Google login:", error);
	  throw error;
	}
 };
 
 export const facebookLogin = async (facebookToken: string): Promise<any> => {
	try {
	  const res = await api.post(`/auth/facebook`, { token: facebookToken });
	  return res.data;
	} catch (error) {
	  console.error("Error during Facebook login:", error);
	  throw error;
	}
 };


