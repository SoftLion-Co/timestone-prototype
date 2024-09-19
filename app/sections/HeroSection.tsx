import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import Watch from "@/images/test_watch.png";
import Pinterest from "@/images/social-networks/pinterest.svg";
import Instagram from "@/images/social-networks/instagram.svg";
import Twitter from "@/images/social-networks/twitter.svg";
import Facebook from "@/images/social-networks/facebook.svg";
import Button from "@/components/ButtonComponent";

interface HeroProps {
  className?: string;
}

const SocialObject = [
  {
    href: "/",
    title: "Pinterst",
    image: Pinterest,
  },
  {
    href: "/",
    title: "Instagram",
    image: Instagram,
  },
  {
    href: "/",
    title: "Twitter",
    image: Twitter,
  },
  {
    href: "/",
    title: "Facebook",
    image: Facebook,
  },
];

const Links: FC<HeroProps> = ({ className }) => {
  return (
    <div className={`${className} grid gap-[60px] w-max `}>
      <div className="flex gap-[10px] lg:flex-col">
        {SocialObject.map((item, index) => (
          <Link key={index} href={item.href}>
            <Image src={item.image} alt={item.title} />
          </Link>
        ))}
      </div>

      <p className="text-gray-500 mb-6">FOLLOW US</p>
    </div>
  );
};

const HeroSection: FC = () => {
  return (
    <section className="relative  z-10">
      <div className="flex flex-col lg:flex-col-reverse">
        <div className=" z-10 top-1/4 z-20 w-1/2 mx-auto flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl text-black mb-4">FIND YOUR DREAM WATCH</h1>

          <p className="text-gray-500 mb-6">
            Lorem ipsum bjaksa dsfd fdjk esdckjl kfdjgdfv.
          </p>

          <Button text="Your Watch" />
        </div>
        <Links />
      </div>

      <Image className="absolute w-[100%]" src={Watch} alt="Watch" />
    </section>
  );
};

export default HeroSection;
