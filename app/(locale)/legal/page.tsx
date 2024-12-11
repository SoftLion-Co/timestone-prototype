import LegalSection from "@/app/sections/legal-page/LegalSection ";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TIMESTONE - Угода користувача",
  description: "Інформація",
  icons: { icon: "@/app/favicon.ico" },
  viewport: { initialScale: 1.0, width: "device-width" },
};

const Page = () => {
  return (
    <>
      <LegalSection />
    </>
  );
};

export default Page;
