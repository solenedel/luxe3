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
    <header className="flex text-xl items-end justify-between px-20 py-4 mb-10 bg-gray-900 ">
      <h1 className=" font-bold tracking-wider z-10 ">
        {' '}
        <a
          href="/"
          className="text-5xl px-1 tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-pink-300 to-pink-800">
          𝓛𝓾𝔁𝓮³
        </a>
      </h1>
      <span className=" justify-between gap-x-20 text-xl tracking-wider ">
        <a
          href={`/dashboard`}
          className="text-gray-100 hover:text-emerald-400 ">
          Dashboard
        </a>
      </span>
      <span className=" justify-between gap-x-20 text-xl tracking-wider ">
        <a href={`/`} className="text-gray-100 hover:text-emerald-400 ">
          About
        </a>
      </span>
      <ConnectButton />
    </header>
  );
}

export default Header;
