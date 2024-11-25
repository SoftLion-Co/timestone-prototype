import SliderSection from "@/app/sections/home-page/WatchesSliderSection";
import OurMissionSection from "@/app/sections/home-page/OurMissionSection";
import NewsSection from "./sections/home-page/NewsSection";
import HeroSection from "./sections/home-page/HeroSection";
import AboutUsSection from "./sections/home-page/AboutUsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SliderSection />
      <OurMissionSection />
      <AboutUsSection/>
      <NewsSection />
    </>
  );
}
