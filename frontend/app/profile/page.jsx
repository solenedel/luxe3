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

function ProfilePage() {
  const { address, isConnected } = useAccount();
  const [showModal, setShowModal] = useState(false);
  const [showModalB, setShowModalB] = useState(false);
  const [metadataArray, setMetadataArray] = useState([]);
  const { userInfo, collectionInfo, fetchUserInfo, userAddr, setUserAddr } =
    useContext(UserContext);

  const { tokenIdArray, setTokenIdArray, fetchTokenIdList } =
    useContext(TokenListContext);

  useEffect(() => {
    console.log('METADATA RRAY===', metadataArray);
  }, [metadataArray]);

  const fetchMetadata = async (_tokenID) => {
    const metadata = await getMetadata(
      collectionInfo.contractAddress,
      _tokenID
    );

    const imgLink = `https://gateway.pinata.cloud/ipfs/${
      metadata.image.split('ipfs://')[1]
    }`;

    setMetadataArray((prev) => [
      ...prev,
      {
        imgLink: imgLink,
        ...metadata,
      },
    ]);
    return metadata;
  };

  const buttonHandler = async () => {
    const data = await fetchTokenIdList(collectionInfo.contractAddress);
    setTokenIdArray(data);
  };

  if (isConnected) {
    return (
      <main className="flex flex-col items-center pt-10  min-h-screen">
        <h1 className="text-3xl w-full text-center tracking-wider py-3 text-pink-100 bg-gray-900/[0.7] font-semibold mb-10">
          Your dashboard
        </h1>
        {userInfo.hasCollection == false ? (
          <section className="flex items-baseline gap-x-10">
            <aside className="text-xl backdrop-blur-sm">
              You have not created your NFT collection yet.{' '}
            </aside>
            <button
              onClick={() => setShowModal(!showModal)}
              className="text-2xl shadow-lg border-emerald-900 font-semibold bg-gradient-to-br from-emerald-800 to-emerald-500 rounded-lg p-2 shadow-lg text-gray-950 hover:translate-y-1">
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
          <section className="mt-12 text-xl">
            {showModalB ? (
              <AddNFTModal
                showModalB={showModalB}
                setShowModalB={setShowModalB}
              />
            ) : (
              ''
            )}

            <div>
              <h2 className="text-xl font-semibold">
                Your collection: {collectionInfo.name} ({collectionInfo.symbol}){' '}
              </h2>
              <p>Collection address: {collectionInfo.contractAddress}</p>
            </div>

            <span className="flex gap-x-10">
              <button
                onClick={() => setShowModalB(!showModalB)}
                type="submit"
                className="text-xl shadow-lg border-emerald-900 font-semibold mt-10 bg-gradient-to-br from-emerald-800 to-emerald-500 rounded-lg p-2 shadow-lg text-gray-950 hover:translate-y-1">
                Add NFT
              </button>
            </span>
            <div className="mt-8 flex flex-col gap-x-5 font-semibold">
              <h3>NFTs in your collection:</h3>
              {/* <button onClick={buttonHandler}>get token id list</button> */}
              {metadataArray.length ? (
                <NFTList
                  metadataArray={metadataArray}
                  contractAddr={collectionInfo.contractAddress}
                />
              ) : (
                ''
              )}
            </div>
          </section>
        )}
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
