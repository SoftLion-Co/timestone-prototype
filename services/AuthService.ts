import axios from "axios";
import { BASE_URL } from "@/config/config";

export const registration = async (userData: any): Promise<any> => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/registration`, userData);
    console.log(res.data);
	 return res.data;
  } catch (error) {
    console.error("Error during registration:", error);
  }
};

export const activateAccount = async (token: string): Promise<any> => {
  try {
    const res = await axios.get(`${BASE_URL}/auth/activate/${token}`);
	 console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error during account activation:", error);
  }
};

export const updateUser = async (userId: string, userData: any): Promise<any> => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/update/${userId}`, userData);
    return res.data;
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

export const updatePassword = async (userId: string, newPassword: string): Promise<any> => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/update-password/${userId}`, { password: newPassword });
    return res.data;
  } catch (error) {
    console.error("Error updating password:", error);
  }
};

export const login = async (loginData: any): Promise<any> => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, loginData);
    return res.data;
  } catch (error) {
    console.error("Error during login:", error);
  }
};

export const refreshToken = async (): Promise<any> => {
  try {
    const res = await axios.get(`${BASE_URL}/auth/refresh`);
    return res.data;
  } catch (error) {
    console.error("Error refreshing token:", error);
  }
};

export const getUser = async (accessToken: string): Promise<any> => {
  try {
    const res = await axios.get(`${BASE_URL}/auth/user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const googleLogin = async (googleToken: string): Promise<any> => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/google`, { token: googleToken });
    return res.data;
  } catch (error) {
    console.error("Error during Google login:", error);
  }
};

export const facebookLogin = async (facebookToken: string): Promise<any> => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/facebook`, { token: facebookToken });
    return res.data;
  } catch (error) {
    console.error("Error during Facebook login:", error);
  }
};
