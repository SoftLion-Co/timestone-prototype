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
    console.log(
      "f " + JSON.stringify(filters),
      "o " + optionsString,
      "l " + limit,
      "p " + pageCursor,
      "s " + sortKey,
      "r " + reverse,
      "pg " + pagination
    );
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
   if (response.status === 500){

   }

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

export const getFilters = async (): Promise<any> => {
  try {
    const response = await axios.get(`${BASE_URL}/filter`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch product by handle:", error);
  }
};
