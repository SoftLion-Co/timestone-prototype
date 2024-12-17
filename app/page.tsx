import SliderSection from "@/app/sections/home-page/WatchesSliderSection";
import OurMissionSection from "@/app/sections/home-page/OurMissionSection";
import NewsSection from "./sections/home-page/NewsSection";
import HeroSection from "./sections/home-page/HeroSection";
import AboutUsSection from "./sections/home-page/AboutUsSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timestone - головна сторінка",
  description: "Дізнайтесь про нас більше",
  keywords: ["Годинники", "Чернівці", "онлайн-магазин"],
  authors: { name: "Timestone" },
  viewport: { initialScale: 1.0, width: "device-width" },
  icons: { icon: "@/app/favicon.ico" },
  openGraph: {
    title: "Timestone - онлайн-магазин годинників",
    description: "Найкращі годинники за доступною ціною",
    url: "https://timestone.com",
    siteName: "Timestone",
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

export default function Home() {
  return (
    <>
      <HeroSection />
      <SliderSection />
      <OurMissionSection />
      <AboutUsSection />
      <NewsSection />
    </>
  );
}
