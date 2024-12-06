import CategoryMain from '@/app/sections/category-page/CategoryMain';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timestone - каталог",
  description: "Пропонуємо найбільший вибір годиннників",
  keywords: ["Годинники", "Чернівці", "онлайн-магазин", "каталог", "пошук", "фільтрація", "онлайн шопінг"],
  icons: { icon: "@/app/favicon.ico" },
  viewport: { initialScale: 1.0, width: "device-width"},
  openGraph: {
    title: "Timestone - каталог",
    description: "Ознайомтесь з широким асортиментом годинників",
    url: "https://timestone.com/catalog",
    images: [
      {
        url: "",
        width: 800,
        height: 600,
      },
    ],
    locale: "ua",
    type: "website",
  },
};

export default function CategoryPage() {

  return (
    <>
      <CategoryMain />
    </>
  );
}
