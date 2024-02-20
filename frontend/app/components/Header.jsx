'use client';
import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';
// import { useAccount } from 'wagmi';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/context/User.context';
import { WalletContext } from '@/context/Wallet.context';

function Header() {
  const { marketplaceOwner, userIsMarketplaceOwner } = useContext(UserContext);
  const { address, isConnected, user, setUser } = useContext(WalletContext);

  useEffect(() => {
    setUser(address);
  }, [address, isConnected]);

  const links = ['dashboard'];

  return (
    <header className="flex text-xl items-end justify-between px-20 py-4  bg-gray-900 pt-6">
      <h1 className=" font-bold tracking-wider z-10 ">
        {' '}
        <a href="/" className="text-5xl text-pink-200">
          Luxe³
        </a>
      </h1>
      <span className="flex self-center justify-between gap-x-20 text-2xl ">
        <a
          href={`/dashboard`}
          className=" font-semibold text-cyan-200 hover:text-cyan-500 ">
          Dashboard
        </a>
      </span>
      <div>
        <ConnectButton />
      </div>
      {/* 
      <nav className="w-full  tracking-wide  flex gap-x-20 text-2xl ">
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
