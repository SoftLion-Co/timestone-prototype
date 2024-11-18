import axios from "axios";
import { BASE_URL } from "@/config/config";

export const getProducts = async (
  filters?: object,
  options?: object,
  limit?: number,
  pageCursor?: string,
  sortKey?: string,
  reverse?: boolean
): Promise<any> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/product`,
      {
        filters,
        options,
        pageCursor,
        limit,
        sortKey,
        reverse,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
};

export const getProductByHandle = async (handle: string): Promise<any> => {
  try {
    const response = await axios.get(`${BASE_URL}/product/${handle}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch product by handle:", error);
  }
};
