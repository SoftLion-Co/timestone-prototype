import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import Watch from "@/images/hero-section/watch.png";

import Pinterest from "@/images/social-networks/pinterest.svg";
import Instagram from "@/images/social-networks/instagram.svg";
import Twitter from "@/images/social-networks/twitter.svg";
import Facebook from "@/images/social-networks/facebook.svg";
import FollowUs from "@/images/social-networks/follow-us.svg";

import Button from "@/components/ButtonComponent";
import TitleComponents from "@/components/TitleComponents";

interface HeroProps {
  className?: string;
}

const SocialObject = [
  { href: "https://www.pinterest.com/", title: "Pinterest", image: Pinterest },
  { href: "https://www.instagram.com/", title: "Instagram", image: Instagram },
  { href: "https://twitter.com/", title: "Twitter", image: Twitter },
  { href: "https://www.facebook.com/", title: "Facebook", image: Facebook },
];

const Links: FC<HeroProps> = ({ className }) => {
  return (
    <div
      className={`${className} grid gap-[10px] lg:gap-[60px] w-max justify-items-center`}
    >
      <div className="flex gap-[12px] lg:flex-col lg:items-center">
        {SocialObject.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white shadow-lg rounded-[50%] p-[8px] transition-all duration-300 focus:bg-darkBurgundy hover:bg-darkBurgundy group"
          >
            <Image
              src={item.image}
              alt={item.title}
              height={12}
              className="h-[18px] w-[18px] transition-all duration-300 group-hover:filter group-hover:brightness-0 group-hover:invert focus: group-focus:invert"
            />
          </Link>
        ))}
      </div>

      <Image src={FollowUs} alt="Follow Us" className="hidden lg:block" />

      <p className="lg:hidden">FOLLOW US</p>
    </div>
  );
};

//! знайти шрифт для заголовків
const HeroSection: FC = () => {
  return (
    <section className="flex flex-col relative py-[40px] lg:py-[60px]">
      <div className="flex flex-col items-center mx-[20px] lg:mx-[60px] gap-[40px] lg:flex-row lg:gap-[90px] lg:items-start xl:items-center">
        <Links className="hidden lg:grid" />

        <div className="text-center flex flex-col items-center lg:flex-col lg:text-left lg:items-start mini:w-[400px] lg:w-[570px]">

          <h1 className="font-spaceage text-black leading-[50px] mb-4 md:mb-[20px] text-[40px] lg:text-[45px] lg:mb-[25px] xl:text-[60px] ">
            FIND YOUR DREAM WATCH
          </h1>

          <p className="text-silver md:text-[14px] lg:text-left mb-[30px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim
            facilisi elementum commodo ipsum. Aenean aenean adipiscing lect
          </p>

          <Button text="Your Watch" tag="a" href="/ua/catalog" />
        </div>

        <Links className="grid lg:hidden" />
      </div>

      <div className="flex justify-end lg:hidden">
        <Image className="object-contain" src={Watch} alt="Watch" width={800}/>
      </div>
      <Image
        className="hidden object-contain right-0 lg:absolute lg:block lg:-z-10 lg:top-[15%] lg:h-[520px] lg:w-[620px] xl:w-auto"
        src={Watch}
        alt="Watch"
      />
    </section>
  );
};

export default HeroSection;
