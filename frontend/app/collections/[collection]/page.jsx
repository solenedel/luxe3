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
import { getTokenMetadata } from '@/utils/getTokenMetadata';
import { useGetTokenMetadata } from '@/hooks/useGetTokenMetadata';
import { getLatestTokenNumber } from '@/utils/getters/getLatestTokenNumber';
export default function CollectionPage() {
  const [owner, setOwner] = useState('');
  const { address, isConnected } = useAccount();
  const [metadataArray, setMetadataArray] = useState([]);
  const [currentCollectionData, setCurrentCollectionData] = useState([]);
  const [tokensArray, setTokensArray] = useState([]);

  const [latestTokenNum, setLatestTokenNum] = useState(0);

  const { newFetchMetadataForAllTokens } = useGetTokenMetadata(
    metadataArray,
    setMetadataArray
  );

  // get collection address from pathname
  const pathname = usePathname();
  const lastIndex = pathname.lastIndexOf('/');
  const collectionAddr = pathname.slice(lastIndex + 1);

  // --------------- USE EFFECT ----------------------

  useEffect(() => {
    getOwner();

    async function fetchLatest() {
      try {
        const data = await getLatestTokenNumber(collectionAddr);
        const latest = Number(data);
        setLatestTokenNum(latest);
      } catch (error) {
        console.log('ERROR: ', error);
      }
    }

    if (isConnected) {
      fetchLatest();
    }
  }, [latestTokenNum]);

  useEffect(() => {
    console.log('METADATA ARRAY: ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐', metadataArray);
  }, [metadataArray]);

  // --------------- FUNCTIONS ------------------------
  const getOwner = async () => {
    const owner = await getCollectionOwner(collectionAddr);
    setOwner(owner);
  };

  // -------------- HANDLERS ---------------

  const showTokensHandler = async () => {
    await newFetchMetadataForAllTokens(collectionAddr);
  };

  // --------------- RENDER ------------------------

  if (isConnected) {
    return (
      <main className="flex min-h-screen flex-col p-24">
        <h2 className="font-semibold text-xl">
          COLLECTION: {collectionAddr} SHOW NAME HERE
        </h2>
        <p>Owned by: {owner}</p>
        <button
          onClick={showTokensHandler}
          className="text-xl w-fit mt-5 shadow-lg border-emerald-900 font-semibold bg-gradient-to-br from-emerald-800 to-emerald-500 rounded-lg p-1 shadow-lg text-gray-950 hover:translate-y-1">
          show tokens
        </button>
        <section>
          {metadataArray.length ? (
            <NFTList
              metadataArray={metadataArray}
              address={address}
              owner={owner}
              collectionAddr={collectionAddr}
            />
          ) : (
            ''
          )}
        </section>
        {/* <button
          // onClick={test}
          className="text-xl w-fit mt-2 shadow-lg border-emerald-900 font-semibold bg-gradient-to-br from-emerald-800 to-emerald-500 rounded-lg p-1 shadow-lg text-gray-950 hover:translate-y-1">
          test transfer ownership (token 1)
        </button> */}
      </main>
    );
  } else {
    <div>You must be connected to view this page</div>;
  }
}
