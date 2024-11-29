import { MetadataRoute } from "next";

export default function sitemap() {
  return [
    { url: "https://timestone.com", lastModified: new Date() },
    { url: "https://timestone.com/catalog", lastModified: new Date() },
    { url: "https://timestone.com/legal", lastModified: new Date() },
    { url: "https://timestone.com/contact-us", lastModified: new Date() },
    { url: "https://timestone.com/auth", lastModified: new Date() },
    { url: "https://timestone.com/", lastModified: new Date() },
    //зробити функція, яка витягагає хендл назви продукту
  ];
}
