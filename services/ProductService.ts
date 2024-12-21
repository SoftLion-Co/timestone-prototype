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
  let attempts = 0; 

  while (attempts < 3) {
    try {
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
      }
    } catch (error) {
      console.error(`Attempt ${attempts + 1}: Failed to fetch products`, error);
    }
    attempts++;
    await delay(1000); 
  }
const result = {products: [],count: 0, pageInfo: ""}
  return result;
};


export const getProductByHandle = async (handle: string): Promise<any> => {
  try {
    let attempts = 0;
    while (attempts < 3) {
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
  let attempts = 0;

  while (attempts < 3) {
    try {
      const response = await axios.get(`${BASE_URL}/filter`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(`Attempt ${attempts + 1} failed:`, error);
    }

    attempts++;
    await delay(1000);
  }
  
  const filter = {
    search: {
      title: "Search",
    },
    buttons: {
      title: "Types",
      value: ["Wathes", "Other"],
    },
    priceRange: {
      title: "Price",
      value: [0, 10],
    },
    checkboxes: [
      {
        title: "example",
        value: ["1", "2", "3"],
      },
      {
        title: "example2",
        value: ["1", "2", "3"],
      },
    ],
  };
  
  return filter;
};

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
