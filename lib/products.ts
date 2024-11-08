const PRODUCT_API = 'http://localhost:4001/product';

export const getProducts = async (
  filters?: object,
  options?: object,
  pageCursor?: string
) => {
  try {
    const res = await fetch(PRODUCT_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filters: filters, options: options, pageCursor }),
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(`Error: ${res.status} - ${errorMessage}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
};

export const getProductById = async (id: string) => {
  try {
    const res = await fetch(`${PRODUCT_API}/id?id=${id}`);

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(`Error: ${res.status} - ${errorMessage}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Failed to fetch product by ID:', error);
    throw error;
  }
};
