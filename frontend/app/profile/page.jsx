'use client';
import { useState, useEffect, useContext } from 'react';
import NewCollectionModal from '../components/modals/NewCollectionModal';
import AddNFTModal from '../components/modals/AddNFTModal';
import { getAllCollections } from '@/utils/getters/getAllCollections';
import { UserCollectionContext } from '@/context/UserCollection.context';
import { getCollectionNFTs } from '@/utils/getters/getCollectionNFTs';
import { useAccount } from 'wagmi';

function ProfilePage() {
  const { collectionAddr, setCollectionAddr } = useContext(
    UserCollectionContext
  );
  const { address, isConnected } = useAccount();
  const [showModal, setShowModal] = useState(false);
  const [showModalB, setShowModalB] = useState(false);

  // const testGetCollections = async () => {
  //   const data = await getAllCollections();
  //   // console.log('GET ALL CO FRONT END🔥🔥🔥🔥🔥🔥🔥', data);
  // };
  const getCollection = async () => {
    const data = await getCollectionNFTs(address);
    // console.log('GET ALL CO FRONT END🔥🔥🔥🔥🔥🔥🔥', data);
  };

  return (
    <main className="flex flex-col items-center pt-10  min-h-screen">
      <h1 className="text-3xl w-full text-center tracking-wider py-3 text-pink-100 bg-gray-900/[0.7] font-semibold mb-10">
        Your dashboard
      </h1>
      {collectionAddr === '' ? (
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
          <p>
            Your collection addr: {collectionAddr}
            <button
              type="submit"
              className="text-xl text-gray-900 hover:underline ml-20 hover:text-violet-500">
              ✏ Edit
            </button>
            {/* <button
            onClick={testGetCollections}
            className="text-xl text-gray-900 hover:underline ml-20 hover:text-violet-500">
            GetAllCollections
          </button> */}
            <button
              onClick={getCollection}
              className="text-xl text-gray-900 hover:underline ml-20 hover:text-violet-500">
              GetCollection
            </button>
          </p>
          <span className="flex gap-x-10">
            <button
              onClick={() => setShowModalB(!showModalB)}
              type="submit"
              className="text-xl shadow-lg border-emerald-900 font-semibold mt-10 bg-gradient-to-br from-emerald-800 to-emerald-500 rounded-lg p-2 shadow-lg text-gray-950 hover:translate-y-1">
              Add NFT
            </button>
            <button
              type="submit"
              className="text-xl shadow-lg border-emerald-900 font-semibold mt-10 bg-gradient-to-br from-emerald-800 to-emerald-500 rounded-lg p-2 shadow-lg text-gray-950 hover:translate-y-1">
              Edit NFTs
            </button>
          </span>
        </section>
      )}
    </main>
  );
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
