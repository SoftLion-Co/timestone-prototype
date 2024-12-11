import Auth from "@/app/sections/authorization-page/AuthorizationSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TIMESTONE - Авторизація",
  description: "Сторінка авторизації і реєстрації",
  icons: { icon: "@/app/favicon.ico" },
  viewport: { initialScale: 1.0, width: "device-width" },
};

const Page = () => {
  return (
    <>
      <Auth />
    </>
  );
};

export default Page;
