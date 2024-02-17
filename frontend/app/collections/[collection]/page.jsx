'use client';
import { useState, useEffect, useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { TokenListContext } from '@/context/TokenList.context';
import { getContract } from '@wagmi/core';
import { ABI } from '@/constants/NFTCollection';
import { getCollectionOwner } from '@/utils/getters/getCollectionOwner';
import { getNFTInfo } from '@/utils/getters/getNFTInfo';
export default function CollectionPage() {
  const [owner, setOwner] = useState('');
  const [currentCollectionData, setCurrentCollectionData] = useState([]);
  const [tokensArray, setTokensArray] = useState([]);
  const [metadata, setMetadata] = useState([]);
  const {
    fetchLatestTokenNumber,
    latestTokenNumber,
    generateTokenNumberArray,
  } = useContext(TokenListContext);

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

    for (let i = 1; i < latestTokenNumber + 1; i++) {
      if (!tokensArray.includes(i)) {
        setTokensArray((prev) => [...prev, i]);

        let { metadata } = await getMetadata(collectionAddr, i);

        const imgLink = `https://gateway.pinata.cloud/ipfs/${
          metadata.image.split('ipfs://')[1]
        }`;

        setMetadata((prev) => [
          ...prev,
          {
            imgLink: imgLink,
            ...metadata,
          },
        ]);
      }
    }
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
      {metadataArray.map((token) => {
        console.log(token)
      })}
    </main>
  );
}
