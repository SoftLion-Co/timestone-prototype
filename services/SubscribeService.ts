import axios from "axios";
import { BASE_URL } from "@/config/config";

export const addNewReceiver = async (
  name: string,
  email: string
): Promise<any> => {
  try {
    console.log(name, email);

    const response = await axios.post(`${BASE_URL}/newsletter/receiver`, {
      name,
      email,
    });

    return response.status;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.status;
    }
  }
};

export const sendEmailToUs = async (
  fullName: string,
  email: string,
  text: string
): Promise<any> => {
  try {
    console.log(fullName, email, text);
    const response = await axios.post(`${BASE_URL}/newsletter/contact-us`, {
      fullName,
      email,
      text,
    });

    return response.status;
  } catch (error) {
    console.error("Error sending email to us:", error);
    // throw error;
  }
};

export const sendEmailNewsletter = async (
  subject: string,
  text: string,
  html: string
): Promise<any> => {
  try {
    const response = await axios.post(`${BASE_URL}/newsletter/send`, {
      subject,
      text,
      html,
    });
    return response.status;
  } catch (error) {
    console.error("Error sending email newsletter:", error);
    // throw error;
  }
};

export const removeReceiver = async (email: string): Promise<any> => {
  try {
    const response = await axios.delete(`${BASE_URL}/newsletter/unsubscribe`, {
      params: { email },
    });
    return response.status;
  } catch (error) {
    console.error("Error removing receiver:", error);
    // throw error;
  }
};
