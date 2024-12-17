import Link from "next/link";
import Image from "next/image";
import Logo from "@/images/1.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col items-center gap-[40px] pt-[40px] ">
      <Link href="/" className="px-[20px]">
        <Image
          src={Logo}
          alt="Logo"
          width={380}
          height={80}
          className="w-[380px] h-[80px]"
          loading="lazy"
        />

      </Link>

      <p className="bg-pearl w-[100%] py-[20px] text-center text-silver min-h-[60px] px-[20px] leading-[25px]">
        © Copyright {currentYear} TIMESTONE - All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
