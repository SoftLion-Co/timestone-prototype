import axios from "axios";
import { BASE_URL } from "@/config/config";

export const getProducts = async (
  filters?: object,
  options?: object,
  limit?: number,
  pageCursor?: string,
  sortKey?:string,
  reverse?: boolean,
) => {
  try {
    const res = await fetch(`${BASE_URL}/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filters: filters, options: options, pageCursor }),
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(`Error: ${res.status} - ${errorMessage}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
};

export const getProductByHandle = async (handle: string) => {
  try {
    const res = await fetch(`${BASE_URL}/product/${handle}`);

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(`Error: ${res.status} - ${errorMessage}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch product by ID:", error);
    throw error;
  }
};
