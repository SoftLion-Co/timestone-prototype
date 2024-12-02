import { MetadataRoute } from "next";
import { CardProps } from "@/config/types";
import { getProducts } from "@/services/ProductService";

export default async function sitemap() {
  const products = await getProducts();
  const getTitle = products.map((product: CardProps) => ({
    url: `https://timestone.com/catalog/${product.handle}`,
    lastModified: new Date(),
  }));
  return [
    { url: "https://timestone.com", lastModified: new Date() },
    { url: "https://timestone.com/catalog", lastModified: new Date() },
    { url: "https://timestone.com/legal", lastModified: new Date() },
    { url: "https://timestone.com/contact-us", lastModified: new Date() },
    { url: "https://timestone.com/auth", lastModified: new Date() },
    { url: "https://timestone.com/", lastModified: new Date() },
    ...getTitle,

    //зробити функція, яка витягагає хендл назви продукту
  ];
}
