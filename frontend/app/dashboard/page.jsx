'use client';
import { useState, useEffect, useContext } from 'react';
import NewCollectionModal from '../components/modals/NewCollectionModal';
import AddNFTModal from '../components/modals/AddNFTModal';
import { getAllCollections } from '@/utils/getters/getAllCollections';
import { getCollectionNFTs } from '@/utils/getters/getCollectionNFTs';
import { useAccount, useContractEvent } from 'wagmi';
import { UserContext } from '@/context/User.context';
import { getLatestTokenNumber } from '@/utils/getters/getLatestTokenNumber';
import { getMetadata } from '@/utils/getMetadata';
import { getTokenIdList } from '@/utils/getters/getTokenIdList';
import { TokenListContext } from '@/context/TokenList.context';
import Image from 'next/image';
import NFTList from '../components/NFTList';
import { v4 as uuidv4 } from 'uuid';
import CollectionsList from '../components/CollectionsList';
import { useGetTokenMetadata } from '@/hooks/useGetTokenMetadata';

function ProfilePage() {
  const { address, isConnected } = useAccount();
  const [showModal, setShowModal] = useState(false);
  const [showModalB, setShowModalB] = useState(false);
  const [metadataArray, setMetadataArray] = useState([]);
  const [latestTokenNum, setLatestTokenNum] = useState(0);

  const {
    userInfo,
    collectionInfo,
    getUserCollection,
    fetchUserInfo,
    userAddr,
    setUserAddr,
  } = useContext(UserContext);

  const { newFetchMetadataForAllTokens, newFetchMetadata } =
    useGetTokenMetadata(metadataArray, setMetadataArray, latestTokenNum);

  const { allCollections, setAllCollections } = useContext(TokenListContext);

  useEffect(() => {
    async function fetchLatest() {
      try {
        const data = await getLatestTokenNumber(collectionInfo.contractAddress);
        const latest = Number(data);
        setLatestTokenNum(latest);

        await newFetchMetadata(collectionInfo.contractAddress, latest);
      } catch (error) {
        console.log('ERROR: ', error);
      }
    }

    if (isConnected) {
      fetchLatest();
    }
  }, [latestTokenNum]);

  const getCollections = async () => {
    const data = await getAllCollections();
    setAllCollections(data);
  };

  useEffect(() => {
    async function fetchCollection() {
      try {
        await getUserCollection(address);
      } catch (error) {
        console.log('ERROR: ', error);
      }
    }

    if (isConnected) {
      fetchCollection();
    }
  }, [showModal, isConnected]);

  useEffect(() => {
    if (isConnected) {
      setMetadataArray([]);
    }
  }, [address, isConnected]);

  if (isConnected) {
    return (
      <main className="flex flex-col items-center pt-10  min-h-screen">
        <h2 className="text-3xl w-fit backdrop-blur-sm italic text-center tracking-wider text-gray-900  font-semibold mb-10">
          Your dashboard
        </h2>
        {userInfo.hasCollection == false ? (
          <section className="flex items-baseline gap-x-10">
            <aside className="text-xl backdrop-blur-sm">
              You have not created your NFT collection yet.{' '}
            </aside>
            <button
              onClick={() => setShowModal(!showModal)}
              className="text-xl tracking-wide shadow-lg border-pink-900 font-semibold bg-gradient-to-br from-pink-700 to-pink-400 rounded-lg p-2 shadow-lg text-gray-950 hover:translate-y-1">
              Start collection
            </button>

            {showModal ? (
              <NewCollectionModal
                showModal={showModal}
                setShowModal={setShowModal}
              />
            ) : (
              ''
            )}
          </section>
        ) : (
          <section className="mt-12 text-xl bg-gray-900/[0.8] p-8 px-10 mx-20 w-2/3 rounded-md text-pink-50">
            {showModalB ? (
              <AddNFTModal
                setLatestTokenNum={setLatestTokenNum}
                latestTokenNum={latestTokenNum}
                showModalB={showModalB}
                setShowModalB={setShowModalB}
              />
            ) : (
              ''
            )}

            <div>
              <div className="flex justify-between items-start">
                <h2 className="text-xl ">
                  Your collection: &nbsp;&nbsp;
                  <span className="text-emerald-400 text-2xl font-semibold">
                    {collectionInfo.name} ({collectionInfo.symbol})
                  </span>{' '}
                </h2>
                <button
                  onClick={() => setShowModalB(!showModalB)}
                  type="submit"
                  className="text-xl shadow-lg border-pink-900 font-semibold bg-gradient-to-br from-pink-700 to-pink-400 rounded-lg p-2 shadow-lg text-gray-950 hover:translate-y-1">
                  + new NFT
                </button>
              </div>

              {collectionInfo.contractAddress ? (
                <p className="tracking-wide">
                  {collectionInfo.contractAddress.slice(0, 4)}…
                  {collectionInfo.contractAddress.slice(
                    collectionInfo.contractAddress.length - 4
                  )}
                </p>
              ) : (
                ''
              )}
            </div>

            <div className="mt-8 flex items-center gap-x-5">
              {metadataArray.length ? (
                <h3 className="test-pink-900">NFTs in your collection:</h3>
              ) : (
                <h3 className="test-pink-900">
                  No NFTs in this collection yet.
                </h3>
              )}
            </div>
            {metadataArray.length ? (
              <NFTList metadataArray={metadataArray} />
            ) : (
              ''
            )}
          </section>
        )}
        <section className="mt-10 w-2/3 text-xl bg-gray-900/[0.8] p-8 px-10 mx-20 w-2/3 rounded-md mt-20 text-pink-50">
          <div className="flex items-baseline gap-x-10">
            <h3 className="text-2xl font-semibold tracking-wider">
              All collections
            </h3>
            <button
              onClick={getCollections}
              className="text-2xl tracking-wide text-emerald-400 hover:cursor-pointer italic hover:scale-105">
              Refresh <span className="text-4xl font-light">⟳</span>
            </button>
          </div>

          {allCollections.length ? (
            <CollectionsList allCollections={allCollections} />
          ) : (
            ''
          )}
        </section>
      </main>
    );
  } else {
    return (
      <p className="flex flex-col text-xl items-center pt-10 min-h-screen">
        You must log in to view your dashboard.{address}
      </p>
    );
  }
}

export default ProfilePage;
