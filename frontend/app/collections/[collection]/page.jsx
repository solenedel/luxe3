'use client';
import { useState, useEffect, useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { TokenListContext } from '@/context/TokenList.context';
import { getContract } from '@wagmi/core';
import { ABI } from '@/constants/NFTCollection';
import { getCollectionOwner } from '@/utils/getters/getCollectionOwner';
export default function CollectionPage() {
  const [owner, setOwner] = useState('');
  // get collection address from pathname
  const pathname = usePathname();
  const lastIndex = pathname.lastIndexOf('/');
  const collectionAddr = pathname.slice(lastIndex + 1);

  const getOwner = async () => {
    const owner = await getCollectionOwner(collectionAddr);
    setOwner(owner);
  };

  useEffect(() => {
    getOwner();
  }, []);

  // check if connected!!
  return (
    <main className="flex min-h-screen flex-col p-24">
      COLLECTION PAGE
      <h2>{collectionAddr}</h2>
      owner: {owner}
    </main>
  );
}
