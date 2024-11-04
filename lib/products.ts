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
