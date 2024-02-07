'use client';
import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';
// import { useAccount } from 'wagmi';
import { useContext, useEffect } from 'react';
import { UserContext } from '@/context/User.context';
import { WalletContext } from '@/context/Wallet.context';

function Header() {
  const { marketplaceOwner, userIsMarketplaceOwner } = useContext(UserContext);
  const { account, connected } = useContext(WalletContext);

  // useEffect(() => {
  //   setUser(address);
  // }, []);

  // const links = ['Buy', 'Sell', 'Profile', 'Sign in'];

  return (
    <header className="flex text-xl items-center justify-between px-20 py-8">
      <h1 className=" font-bold tracking-wider text-transparent  z-10 ">
        {' '}
        <a href="/" className="text-5xl text-black">
          Luxe²
        </a>
        {console.log(account)}
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
