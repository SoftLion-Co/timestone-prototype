import UnsubscribeSection from "@/app/sections/execution-sections/UnsubscribeSection";

const UnsubscribePage = ({ params }: { params: any }) => {
  const email = params.email || "";
  console.log(email)
  return <UnsubscribeSection email={email} />;
};

export default UnsubscribePage;