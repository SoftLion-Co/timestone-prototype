import AccountSection from "@/app/sections/account-page/AccountSection";

const Page = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (!accessToken || !refreshToken) {
    return <div>Not authorized. Please log in.</div>;
  }
  // button log in(a:/auth)
  return (
    <>
      <AccountSection />
    </>
  );
};

export default Page;
