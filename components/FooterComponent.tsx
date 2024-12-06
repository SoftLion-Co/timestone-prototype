import Link from "next/link";
import Image from "next/image";
import Logo from "@/images/vectors/logo.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col items-center gap-[50px] pt-[70px]">
      <Link href="/">
        <Image src={Logo} alt="Logo" width={380} className="w-[380px]" />
      </Link>

      <p className="bg-pearl w-[100%] py-[20px] text-center text-silver">
        © Copyright {currentYear} TIMESTONE - All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
