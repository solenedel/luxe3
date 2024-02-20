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
    <header className="flex text-xl items-end justify-between px-20 py-4 pt-6 mb-10 border-b-2 backdrop-blur-sm border-gray-900 ">
      <h1 className=" font-bold tracking-wider z-10 ">
        {' '}
        <a
          href="/"
          className="text-5xl text-transparent bg-clip-text bg-gradient-to-br from-pink-800 to-pink-300">
          Luxe³
        </a>
      </h1>
      <span className=" justify-between gap-x-20 text-xl tracking-wider ">
        <a href={`/dashboard`} className="text-gray-900 hover:text-pink-600 ">
          Dashboard
        </a>
      </span>
      <span className=" justify-between gap-x-20 text-xl tracking-wider ">
        <a href={`/`} className="text-gray-900 hover:text-pink-600 ">
          About
        </a>
      </span>
      <ConnectButton />
    </header>
  );
}

export default Header;
