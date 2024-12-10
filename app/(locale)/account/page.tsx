import AccountSection from "@/app/sections/account-page/AccountSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TIMESTONE - Ваш акаунт",
  description: "Акаунт користувача",
  icons: { icon: "@/app/favicon.ico" },
  viewport: { initialScale: 1.0, width: "device-width" },
};

const Page = () => {

  return (
    <>
      <AccountSection />
    </>
  );
};

export default Page;
