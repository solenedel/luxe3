'use client';
import { useState, useEffect, useContext } from 'react';
import NewCollectionModal from '../components/modals/NewCollectionModal';
import AddNFTModal from '../components/modals/AddNFTModal';
import { getAllCollections } from '@/utils/getters/getAllCollections';
import { UserCollectionContext } from '@/context/UserCollection.context';
import { getCollectionNFTs } from '@/utils/getters/getCollectionNFTs';
import { useAccount, useContractEvent } from 'wagmi';
import { UserContext } from '@/context/User.context';
import { getLatestTokenNumber } from '@/utils/getters/getLatestTokenNumber';
import { getTokenURI } from '@/utils/getTokenURI';

function ProfilePage() {
  const { collectionAddr, setCollectionAddr, collectionInfo } = useContext(
    UserCollectionContext
  );
  const { userInfo } = useContext(UserContext);
  const { address, isConnected } = useAccount();
  const [showModal, setShowModal] = useState(false);
  const [showModalB, setShowModalB] = useState(false);
  const [latestTokenNumber, setLatestTokenNumber] = useState(0);
  const [tokenIdArray, setTokenIdArray] = useState([]);
  // const testGetCollections = async () => {
  //   const data = await getAllCollections();
  //   // console.log('GET ALL CO FRONT END🔥🔥🔥🔥🔥🔥🔥', data);
  // };

  const getCollection = async () => {
    const data = await getCollectionNFTs(address);
    // console.log('GET COLLECTION🔥🔥🔥🔥🔥🔥🔥', data);
  };

  const getTokenURIData = async (_tokenID) => {
    const data = await getTokenURI(collectionInfo.contractAddress, _tokenID);
    return data;
  };

  const getTokenNumber = async () => {
    const _number = await getLatestTokenNumber(collectionInfo.contractAddress);
    setLatestTokenNumber(_number); // this should be set in useEffect
    let _tokenIdArray = [];
    for (let i = 0; i < _number; i++) {
      _tokenIdArray.push(i + 1);
    }
    setTokenIdArray(_tokenIdArray);
    console.log(
      'TOKEN I ARRAY =====',
      tokenIdArray,
      'latest token num',
      latestTokenNumber
    );
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
              <button
                onClick={getTokenNumber}
                type="submit"
                className="text-xl shadow-lg border-emerald-900 font-semibold mt-10 bg-gradient-to-br from-emerald-800 to-emerald-500 rounded-lg p-2 shadow-lg text-gray-950 hover:translate-y-1">
                list NFTs in my collection
              </button>
              {/* <button
                type="submit"
                className="text-xl shadow-lg border-emerald-900 font-semibold mt-10 bg-gradient-to-br from-emerald-800 to-emerald-500 rounded-lg p-2 shadow-lg text-gray-950 hover:translate-y-1">
                Edit NFTs
              </button> */}
            </span>
            <div className="mt-8 flex gap-x-5 font-semibold">
              <h3>NFTs in my collection:</h3>
              {tokenIdArray.map((tokenId) => (
                <p
                  className="text-xl hover:text-pink-600 font-semibold hover:cursor-pointer"
                  key={tokenId}
                  onClick={() => getTokenURIData(tokenId)}>
                  {tokenId}
                </p>
              ))}
            </div>
          </section>
        )}
      </main>
    );
  } else {
    return (
      <p className="flex flex-col text-xl items-center pt-10 min-h-screen">
        You must log in to view your dashboard.
      </p>
    );
  }
}

export default ProfilePage;
{
  /* <section>
        <h2>Your collection</h2>
        <button className="text-xl font-semibold mt-8 bg-gradient-to-br from-orange-400 to-violet-400 rounded-sm p-4 shadow-lg text-gray-900 hover:translate-y-1">
          Add item
        </button>
      </section> */
}
{
  /* <aside className="bg-sky-200 border-2 border-sky-300 p-3 w-2/3 rounded-md">
        <strong className="mr-2"> Pending:</strong>
        You have purchased ####. If you have received the physical item, please
        confirm reception so that the previous owner can receive their payment.
        <button className=" ml-2 text-xl underline font-semibold">
          Confirm received
        </button>
      </aside>
      <section className="mt-14 text-left">
        <h2 className="text-xl font-semibold mb-5">❏ My items / NFTs</h2>
        <p>You have not posted any NFTs for yet. </p>
      </section>
      <section className="mt-14 text-left">
        <h2 className="text-xl font-semibold mb-5">♥ My favourites</h2>
        <p>You have no favourites yet. </p>
      </section> */
}
