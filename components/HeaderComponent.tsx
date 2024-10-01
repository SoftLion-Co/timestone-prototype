'use client';
import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/images/vectors/logo.svg';
import Basket from '@/images/vectors/basket.svg';
import Profile from '@/images/vectors/profile.svg';

import MainButton from '@/components/ButtonComponent';

import { Modal, Button, ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Close from '@/images/vectors/close.svg';
import Burger from '@/images/vectors/burger.svg';

const navData = [
  { link: '/ua/category-page', text: 'Watches' },
  { link: '/', text: 'Accessories' },
  { link: '/', text: 'Jewelry' },
  { link: '/', text: 'Brand' },
  { link: '/', text: 'Watches' },
];

const Header = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const HeaderNavigation: FC<{ className?: string }> = ({ className }) => {
    return (
      <div
        className={`${className} flex flex-col gap-[25px] items-center xl:flex-row`}>
        <div className="flex flex-col xl:flex-row gap-[40px] items-center">
          <nav className="flex flex-col text-silver gap-[50px] text-center xl:flex-row xl:gap-[35px]">
            {navData.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="hover:text-onyx hover:font-bold transition-all duration-300 transform hover:scale-105">
                {item.text}
              </Link>
            ))}
          </nav>

          <MainButton text="Your watch" />
        </div>

        <div className="flex gap-[25px]">
          <Link href="/">
            <Image src={Basket} alt="Basket" />
          </Link>
          <Link href="/">
            <Image src={Profile} alt="Profile" />
          </Link>
        </div>
      </div>
    );
  };

  const HeaderLogo = () => {
    return (
      <Link href="/">
        <Image src={Logo} alt="Logo" />
      </Link>
    );
  };

  return (
    <header className="container">
      <div className="flex justify-between items-center py-[20px]">
        <HeaderLogo />

        <Button onClick={open} className="xl:hidden px-0 hover:bg-transparent">
          <Image src={Burger} alt="Burger" />
        </Button>

        <HeaderNavigation className="hidden xl:flex" />

        <Modal
          opened={opened}
          onClose={close}
          title=""
          fullScreen
          withCloseButton={false}
          radius={0}
          transitionProps={{ transition: 'scale-x', duration: 200 }}
          className="xl:hidden"
          styles={{
            body: {
              padding: '0',
            },
            content: {
              backgroundColor: '#ffffff',
              zIndex: 9999,
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            },
            header: {
              backgroundColor: '#ffffff',
            },
          }}>
          <div className="container flex justify-between items-center py-[20px] mb-[40px]">
            <HeaderLogo />

            <ActionIcon
              variant="transparent"
              onClick={close}
              className="w-[24px] h-[24px]">
              <Image src={Close} alt="Close" />
            </ActionIcon>
          </div>

          <HeaderNavigation />
        </Modal>
      </div>
    </header>
  );
};

export default Header;
