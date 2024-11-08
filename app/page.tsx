import Auth from "@/app/sections/authorization-page/AuthorizationSection";
import SliderSection from "@/app/sections/home-page/WatchesSliderSection";
import OurMissionSection from "@/app/sections/home-page/OurMissionSection";
import NewsSection from "./sections/home-page/NewsSection";

export default function Home() {
  return (
    <>
      <Auth />
      <SliderSection />
      <OurMissionSection />
      <NewsSection/>
    </>
  );
}
