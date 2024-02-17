'use client';
import { useState, useEffect, useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { TokenListContext } from '@/context/TokenList.context';
import { getContract } from '@wagmi/core';
import { ABI } from '@/constants/NFTCollection';
import { getCollectionOwner } from '@/utils/getters/getCollectionOwner';
export default function CollectionPage() {
  const [owner, setOwner] = useState('');
  const [currentCollectionData, setCurrentCollectionData] = useState([]);
  const { fetchLatestTokenNumber, generateTokenNumberArray } =
    useContext(TokenListContext);

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
    fetchLatestTokenNumber(collectionAddr);
    generateTokenNumberArray(collectionAddr);
  }, []);

  // get nft info:
  // loop thru tokenNumberArray
  // forEach, getNFTInfo (need to implement)
  // getMetadata from CID

  // check if connected!!
  return (
    <main className="flex min-h-screen flex-col p-24">
      <h2 className="font-semibold text-xl">COLLECTION: {collectionAddr}</h2>
      <p>Owned by: {owner}</p>
      <section>List NFTs here</section>
    </main>
  );
}
