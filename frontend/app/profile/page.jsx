'use client';
import { useState, useEffect } from 'react';
import Modal from '../components/Modal';

function ProfilePage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <main className="flex flex-col items-center pt-16">
      <h1 className="text-2xl font-semibold mb-10">Connected as: [ADDRESS]</h1>

      <section>
        <aside>You have not created your NFT collection yet. </aside>
        <button
          onClick={() => setShowModal(!showModal)}
          className="text-xl font-semibold mt-8 bg-gradient-to-br from-orange-400 to-violet-400 rounded-sm p-4 shadow-lg text-gray-900 hover:translate-y-1">
          Start collection
        </button>
        {showModal ? (
          <Modal showModal={showModal} setShowModal={setShowModal} />
        ) : (
          ''
        )}
      </section>
      {/* <section>
        <h2>Your collection</h2>
        <button className="text-xl font-semibold mt-8 bg-gradient-to-br from-orange-400 to-violet-400 rounded-sm p-4 shadow-lg text-gray-900 hover:translate-y-1">
          Add item
        </button>
      </section> */}
      {/* <aside className="bg-sky-200 border-2 border-sky-300 p-3 w-2/3 rounded-md">
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
      </section> */}
    </main>
  );
}

export default ProfilePage;
