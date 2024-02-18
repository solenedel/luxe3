'use client';
import { useState, useEffect, useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { TokenListContext } from '@/context/TokenList.context';
import { getContract } from '@wagmi/core';
import { ABI } from '@/constants/NFTCollection';
import { getCollectionOwner } from '@/utils/getters/getCollectionOwner';
import { getNFTInfo } from '@/utils/getters/getNFTInfo';
import { getMetadata } from '@/utils/getMetadata';
import NFTList from '@/app/components/NFTList';
import { useAccount, useContractEvent } from 'wagmi';
import { transferOwnership } from '@/utils/transferOwnership';
export default function CollectionPage() {
  const [owner, setOwner] = useState('');
  const { address, isConnected } = useAccount();
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

  const eventName = 'NFTOwnershipTransferred';

  useContractEvent({
    address: collectionAddr,
    abi: ABI,
    eventName,
    listener(log) {
      const { from, to, tokenId } = log[0].args;
      console.log('ARGS =====', log[0].args);
      console.log(
        `🔵 ${eventName} event received. Token ${tokenId} in transferred from ${from} to ${to}.`
      );
    },
  });

  const getOwner = async () => {
    const owner = await getCollectionOwner(collectionAddr);
    setOwner(owner);
  };

  const temp = async () => {
    await fetchLatestTokenNumber(collectionAddr);

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
  };

  const handler = async () => {
    // console.log('pppppp');
    await temp();
  };

  //  test transfer ownership
  const test = async () => {
    const data = await transferOwnership(owner, address, 1, collectionAddr);
    if (data.status == 'success') {
      console.log('TRANSFER OWNERSHIP SUCCES: ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐');
      // check for event
    }
  };

  useEffect(() => {
    getOwner();
  }, []);

  // useEffect(() => {
  //   console.log('METADATA =', metadata);
  // }, [metadata]);

  // todo - check if connected!!
  if (isConnected) {
    return (
      <main className="flex min-h-screen flex-col p-24">
        <h2 className="font-semibold text-xl">COLLECTION: {collectionAddr}</h2>
        <p>Owned by: {owner}</p>
        <button onClick={handler}>show tokens</button>
        <section>
          {metadata.length ? (
            <NFTList metadataArray={metadata} address={address} owner={owner} />
          ) : (
            ''
          )}
        </section>
        <button
          onClick={test}
          className="text-xl w-fit mt-2 shadow-lg border-emerald-900 font-semibold bg-gradient-to-br from-emerald-800 to-emerald-500 rounded-lg p-1 shadow-lg text-gray-950 hover:translate-y-1">
          test transfer ownership (token 1)
        </button>
      </main>
    );
  } else {
    <div>You must be connected to view this page</div>;
  }
}
