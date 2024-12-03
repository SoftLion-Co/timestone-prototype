import CategoryMain from '@/app/sections/category-page/CategoryMain';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timestone - каталог",
  description: "Пропонуємо найбільший вибір годиннників",
  keywords: ["Годинники", "Чернівці", "онлайн-магазин", "каталог", "пошук", "фільтрація", "онлайн шопінг"],
  openGraph: {
    title: "Timestone - каталог",
    description: "Ознайомтесь з широким асортиментом годинників",
    url: "https://timestone.com/catalog",
    // images: [
    //   {
    //     url: "",
    //     width: 800,
    //     height: 600,
    //   },
    // ],
  },
};

export default function CategoryPage() {

  return (
    <>
      <CategoryMain />
    </>
  );
}
