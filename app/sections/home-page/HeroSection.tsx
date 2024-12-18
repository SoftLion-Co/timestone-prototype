import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import Watch from "@/images/hero-section/watch.jpg";

import Pinterest from "@/images/social-networks/pinterest.svg";
import Instagram from "@/images/social-networks/instagram.svg";
import Twitter from "@/images/social-networks/twitter.svg";
import Facebook from "@/images/social-networks/facebook.svg";

import Button from "@/components/ButtonComponent";

interface HeroProps {
  className?: string;
}

const SocialObject = [
  { href: "https://www.pinterest.com/", title: "Pinterest", image: Pinterest },// tik tok
  { href: "https://www.instagram.com/", title: "Instagram", image: Instagram },
  // { href: "https://twitter.com/", title: "Twitter", image: Twitter }, 
  { href: "https://www.facebook.com/", title: "Facebook", image: Facebook },
];

const Links: FC<HeroProps> = ({ className }) => {
  return (
      <div
        className={`${className} flex gap-[10px] lg:gap-[90px] w-max justify-items-center`}
      >
        <div className="flex gap-[12px] lg:flex-col lg:items-center ">
          {SocialObject.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white shadow-lg rounded-[50%] p-[8px] transition-all duration-300 hover:bg-darkBurgundy group"
            >
              <Image
                src={item.image}
                alt={item.title}
                height={12}
                className="h-[18px] w-[18px] transition-all duration-300 group-hover:filter group-hover:brightness-0 group-hover:invert"
              />
            </Link>
          ))}
        </div>
        <p className="hidden lg:block font-frontrunner text-[15px] tracking-widest -rotate-90 ">
          Стеж за нами
        </p>
        <p className="lg:hidden font-frontrunner tracking-widest">Стеж за нами</p>
      </div>
  );
};

const HeroSection: FC = () => {
  return (
    <section className="flex flex-col relative py-[40px] lg:py-[45px] lg:px-[0px]">
      <div className="flex flex-col items-center mx-[20px] lg:mx-[0px] gap-[40px] lg:flex-row lg:gap-[0px] lg:items-center">
        <Links className="hidden lg:grid" />

        <div className="text-center flex flex-col items-center lg:flex-col lg:text-left lg:items-start lg:mt-[52px] mini:w-[500px] lg:w-[46%] xl:w-[40%] lg:pr-[40px] xl:pr-0">
          <h1 className="font-frontrunner text-black leading-[50px] mb-4 md:mb-[20px] text-[40px] lg:text-[45px] lg:mb-[25px] xl:text-[60px] ">
            Знайди свій годинник мрії
          </h1>

          <p className="text-silver font-poppins md:text-[14px] lg:text-left mb-[30px]">
            Відкрий для себе ідеальне поєднання стилю, точності та якості.
            Обирай серед вишуканих моделей, що підкреслять твій індивідуальний
            смак та доповнять будь-який образ. Твій час, твій стиль, твій
            годинник!
          </p>

          <Button text="Годинники" tag="a" href="/catalog" />
        </div>

        <Links className="grid lg:hidden" />
      </div>

      <div className="flex justify-end lg:hidden">
        <Image
          className="object-contain"
          src={Watch}
          alt="Watch"
          width={800}
          loading="lazy"
        />
      </div>
      <Image
        className="hidden object-contain right-0 lg:absolute lg:block lg:-z-10 lg:top-[5%] xl:top-[15%]  lg:h-[520px] w-[50%]"
        src={Watch}
        alt="Watch"
      />
    </section>
  );
};

export default HeroSection;
