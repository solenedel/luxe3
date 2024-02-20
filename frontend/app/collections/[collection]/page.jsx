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
import { UserContext } from '@/context/User.context';
import { contractAddress } from '@/constants/marketplace';
export default function CollectionPage() {
  const [owner, setOwner] = useState('');
  const { address, isConnected } = useAccount();
  const [metadataArray, setMetadataArray] = useState([]);
  const [currentCollectionData, setCurrentCollectionData] = useState([]);
  const [tokensArray, setTokensArray] = useState([]);
  const router = useRouter();
  const [latestTokenNum, setLatestTokenNum] = useState(0);

  const { newFetchMetadataForAllTokens } = useGetTokenMetadata(
    metadataArray,
    setMetadataArray
  );

  const { userInfo, collectionInfo } = useContext(UserContext);

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
  }, [latestTokenNum, router]);

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
      <main className="flex min-h-screen flex-col items-center p-24">
        <section className="bg-gray-900/[0.8]  rounded-md p-8 px-10 mx-20 w-2/3 text-pink-50">
          <h2 className="font-semibold text-2xl flex gap-x-5 mb-4 text-emerald-400 tracking-wide">
            {collectionInfo.name}&nbsp;({collectionInfo.symbol})
            {collectionInfo.contractAddress ? (
              <p className="tracking-wide">
                {' '}
                {collectionInfo.contractAddress.slice(0, 4)}…
                {collectionInfo.contractAddress.slice(
                  collectionInfo.contractAddress.length - 4
                )}
              </p>
            ) : (
              ''
            )}
          </h2>
          {owner != address ? (
            <p className="text-lg">
              Owned by: &nbsp;{owner.slice(0, 4)}…
              {owner.slice(owner.length - 4)}
            </p>
          ) : (
            <p className="text-lg">Owned by you</p>
          )}

          <button
            onClick={showTokensHandler}
            className="text-xl hover:cursor-pointer shadow-lg mt-10
           bg-gradient-to-br from-blue-600 to-blue-300 w-fit rounded-lg p-2 shadow-lg text-gray-950 hover:translate-y-1">
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
        </section>
        <a
          href="/dashboard"
          className="mt-10 w-2/3 text-xl italic hover:underline hover:cursor-pointer">
          ⬅ &nbsp;Back to your dashboard
        </a>
      </main>
    );
  } else {
    <div>You must be connected to view this page</div>;
  }
}
