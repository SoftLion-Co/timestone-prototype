import Link from "next/link";
import Image from "next/image";
import Logo from "@/images/vectors/logo.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col items-center gap-[60px] pt-[80px]">
      <Link href="/">
        <Image
          src={Logo}
          alt="Logo"
          width={380}
          height={80}
          className="w-[380px] h-[80px]"
          loading="lazy"
        />

      </Link>

      <p className="bg-pearl w-[100%] py-[20px] text-center text-silver min-h-[60px] leading-[25px]">
        © Copyright {currentYear} TIMESTONE - All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
