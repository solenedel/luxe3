'use client';
import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useContext, useEffect } from 'react';

function Header() {
  const links = ['Buy', 'Sell', 'Profile', 'Sign in'];

  return (
    <header className="flex text-xl items-center justify-between px-20 bg-gray-900 py-8 shadow-lg">
      <h1 className=" font-bold tracking-wider text-transparent  z-10 ">
        {' '}
        <a href="/" className="text-5xl text-sky-500">
          {' '}
          Luxe²
        </a>
      </h1>
      <div>
        {' '}
        <ConnectButton />
      </div>

      {/* <nav className="w-full  tracking-wide  flex gap-x-20 text-2xl py-4 justify-center bg-violet-950">
        {links.map((link) => (
          <a
            key={link}
            href={`/${link.toLowerCase().replace(/\s/g, '')}`}
            className="text-orange-200 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-br hover:from-blue-400 hover:to-pink-400 hover:scale-105 ">
            {link}
          </a>
        ))}
      </nav> */}
    </header>
  );
}

export default Header;
