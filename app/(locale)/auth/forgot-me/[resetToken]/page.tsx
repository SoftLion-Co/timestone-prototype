import ResetPasswordFormSection from "@/app/sections/authorization-page/ResetPasswordFormSection";

const Page = ({ params }: { params: any }) => {
	const resetPasswordToken = params.resetToken;
  return (
    <>
    <ResetPasswordFormSection resetPasswordToken={resetPasswordToken}/>
    </>
  );
};

export default Page;