import axios from "axios";
import { BASE_URL } from "@/config/config";
import { City, Street, Postomat, Department } from "@/config/types";

export const getCities = async (city: string): Promise<City[]> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/cities`, {
      params: { city },
    });
    return data?.[0]?.Addresses || [];
  } catch (error) {
    console.error("Error fetching cities name:", error);
    throw error;
  }
};

export const getStreets = async (
  street: string,
  settlementRef: string
): Promise<Street[]> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/streets`, {
      params: { street, settlementRef },
    });
    return data?.[0]?.Addresses || [];
  } catch (error) {
    console.error("Error fetching steets:", error);
    throw error;
  }
};

export const getPostomates = async (
  findByString: string,
  cityName: string
): Promise<Postomat[]> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/postomates`, {
      params: { findByString, cityName },
    });
    return data || [];
  } catch (error) {
    console.error("Error fetching postomats:", error);
    throw error;
  }
};

export const getDepartments = async (
  findByString: string,
  cityName: string
): Promise<Department[]> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/departments`, {
      params: { findByString, cityName },
    });
    return data || [];
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
};
