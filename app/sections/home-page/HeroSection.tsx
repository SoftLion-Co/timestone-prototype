import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import Watch from "@/images/test_watch.png";

import Pinterest from "@/images/social-networks/pinterest.svg";
import Instagram from "@/images/social-networks/instagram.svg";
import Twitter from "@/images/social-networks/twitter.svg";
import Facebook from "@/images/social-networks/facebook.svg";
import FollowUs from "@/images/social-networks/follow-us.svg";

import Button from "@/components/ButtonComponent";

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

const HeroSection: FC = () => {
  return (
    <section className="relative py-[40px] lg:py-[80px]">
      <div className="flex flex-col items-center mx-[20px] lg:mx-[60px] gap-[40px] lg:flex-row lg:gap-[90px] lg:items-start xl:items-end">
        <Links className="hidden lg:grid" />

        <div className="text-center lg:flex lg:flex-col lg:text-left mini:w-[400px] lg:w-[550px]">
          <h1 className="text-[40px] xl:text-[60px] text-onyx mb-[30px]">
            FIND YOUR DREAM WATCH
          </h1>

          <p className="text-silver lg:text-left mb-[30px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim
            facilisi elementum commodo ipsum. Aenean aenean adipiscing lect
          </p>

          <Button text="Your Watch" />
        </div>

        <Links className="grid lg:hidden" />
      </div>

      <Image
        className="object-contain right-0 sm:hidden lg:absolute lg:block lg:-z-10 lg:top-[15%] lg:h-[520px]"
        src={Watch}
        alt="Watch"
      />
    </section>
  );
};

export default HeroSection;
