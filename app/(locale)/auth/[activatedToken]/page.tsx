import ActivatingSection from "@/app/sections/execution-sections/ActivetedSection";

const Page = ({ params }: { params: any }) => {
	const activatedToken = params.activatedToken;
  return (
    <>
	<ActivatingSection activatedToken={activatedToken} />
    </>
  );
};

export default Page;