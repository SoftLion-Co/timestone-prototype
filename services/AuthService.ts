import axios, { AxiosError } from "axios";
import { BASE_URL } from "@/config/config";

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
    const result = await axios.post(`${BASE_URL}/auth/registration`, {
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      password,
      receiveUpdates, 
    });
    console.log(result);
    if (result.status === 201) {
      return "created";
    }
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      
      if (axiosError.response.status === 406) {
        return "email";
      } else if (axiosError.response.status === 405) {
        return "phone";
      } else {
        return "error";  //тут ще не активований
      }
    } else {
      console.error("Failed to register user:", error);
      // throw error;
    }
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<any> => {
  try {
    console.log("login333");
    const response = await axios.post(`${BASE_URL}/auth/login`, {
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
    // throw error;
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

export const updateUser = async (
  userId: string,
  userData: any
): Promise<any> => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/update/${userId}`, userData);
    return res.data;
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

export const updatePassword = async (
  userId: string,
  newPassword: string
): Promise<any> => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/update-password/${userId}`, {
      password: newPassword,
    });
    return res.data;
  } catch (error) {
    console.error("Error updating password:", error);
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
    const res = await axios.post(`${BASE_URL}/auth/google`, {
      token: googleToken,
    });
    return res.data;
  } catch (error) {
    console.error("Error during Google login:", error);
  }
};

export const facebookLogin = async (facebookToken: string): Promise<any> => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/facebook`, {
      token: facebookToken,
    });
    return res.data;
  } catch (error) {
    console.error("Error during Facebook login:", error);
  }
};

/* const api = axios.create({
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
 );*/
