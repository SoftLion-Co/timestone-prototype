import axios from "axios";
import { BASE_URL } from "@/config/config";

export const getProducts = async (
  filters?: object,
  optionsString?: string,
  limit?: number,
  pageCursor?: string,
  sortKey?: string,
  reverse?: boolean,
  pagination?: boolean
): Promise<any> => {
  try {
    let attempts = 0;
    while (attempts < 3) {
      console.log(attempts);
      const response = await axios.get(`${BASE_URL}/product`, {
        params: {
          filters,
          optionsString,
          pageCursor,
          limit,
          sortKey,
          reverse,
          pagination,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        return response.data;
      }}
    await delay(1000);
    attempts++;
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
};

export const getProductByHandle = async (handle: string): Promise<any> => {
  try {
    let attempts = 0;
    while (attempts < 3) {
      console.log(attempts);
      const response = await axios.get(`${BASE_URL}/product/${handle}`);
      if (response.status === 200) {
        return response.data;
      }
    }
    await delay(1000);
    attempts++;
  } catch (error) {
    console.error("Failed to fetch product by handle:", error);
  }
};

export const getFilters = async (): Promise<any> => {
  try {
    let attempts = 0;
    while (attempts < 3) {
      console.log(attempts);
      const response = await axios.get(`${BASE_URL}/filter`);
      if (response.status === 200) {
        return response.data;
      }
    }
    await delay(1000);
    attempts++;
  } catch (error) {
    console.error("Failed to fetch product by handle:", error);
  }
};

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
