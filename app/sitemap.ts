import { Product } from "@/config/types";
import { getProducts } from "@/services/ProductService";

export default async function sitemap() {
  const data = await getProducts();
  let getTitle = [{}];

  if (data) {
    getTitle = data.products.map((product: Product) => ({
      url: `https://timestone.com/catalog/${product.handle}`,
      lastModified: new Date(),
    }));
  }
  return [
    { url: "https://timestone.com", lastModified: new Date() },
    { url: "https://timestone.com/catalog", lastModified: new Date() },
    { url: "https://timestone.com/legal", lastModified: new Date() },
    { url: "https://timestone.com/contact-us", lastModified: new Date() },
    { url: "https://timestone.com/auth", lastModified: new Date() },
    { url: "https://timestone.com/", lastModified: new Date() },
    ...getTitle,
  ];
}
