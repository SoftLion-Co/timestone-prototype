import axios from "axios";
import { api } from "@/config/config";
import { BASE_URL } from "@/config/config";

export const registrateNewUser = async (
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  dateOfBirth: string,
  password: string,
  address: string
): Promise<any> => {
  try {
    const result = await axios.post(`${BASE_URL}/auth/registration`, {
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      password,
      address,
    });
    console.log(result.data);
    return "created";
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      if (error.status === 400 || error.status === 409) {
        return error.response?.data;
      } else {
        return "server error";
      }
    }
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<any> => {
  try {
    // console.log("login333");
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });
    if (response?.data?.accessToken && response?.data?.refreshToken) {
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      return "logged";
    }
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      if (error.status === 406) {
        return error.response?.data;
      } else {
        return "server error";
      }
    }
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
  userData: any
): Promise<any> => {
  try {
    const res = await api.post(`/auth/update`, userData);
    return res.data;
  } catch (error) {
    console.error("Error updating user:", error);
  }
};


export const updatePassword = async (
  newPassword: string
): Promise<any> => {
  try {
    const res = await api.post(`/auth/update-password`, {
      password: newPassword,
    });
    return res.data;
  } catch (error) {
    console.error("Error updating password:", error);
  }
};


export const updateRefreshToken = async (): Promise<any> => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const res = await axios.post(`${BASE_URL}/auth/refresh`,  refreshToken);
    return res.data;
  } catch (error) {
    console.error("Error refreshing token:", error);
  }
};

export const getUser = async (): Promise<any> => {
  try {
    const res = await api.get(`/auth/user`);
    return res.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};


// export const googleLogin = async (googleToken: string): Promise<any> => {
//   try {
//     const res = await axios.post(`${BASE_URL}/auth/google`, {
//       token: googleToken,
//     });
//     return res.data;
//   } catch (error) {
//     console.error("Error during Google login:", error);
//   }
// };

// export const facebookLogin = async (facebookToken: string): Promise<any> => {
//   try {
//     const res = await axios.post(`${BASE_URL}/auth/facebook`, {
//       token: facebookToken,
//     });
//     return res.data;
//   } catch (error) {
//     console.error("Error during Facebook login:", error);
//   }
// };
