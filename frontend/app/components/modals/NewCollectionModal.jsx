import { useState, useEffect, useContext } from 'react';
import { deployNewNFTCollection } from '@/utils/deployNewNFTCollection';
import { useContractEvent } from 'wagmi';
import { contractAddress, ABI } from '@/constants/marketplace';
import { UserContext } from '@/context/User.context';
// import { useAccount } from 'wagmi';

// Listen for NFTCollection contract deployment event
const eventName = 'NFTCollectionCreated';

function NewCollectionModal({ showModal, setShowModal }) {
  const [nameInput, setNameInput] = useState('');
  const [symbolInput, setSymbolInput] = useState('');

  const { userInfo, setUserInfo, fetchUserInfo } = useContext(UserContext);
  // const { account, isConnected } = useAccount();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // call func from contract
    const data = await deployNewNFTCollection(nameInput, symbolInput);

    if (data.status == 'success') {
      //close modal
      setUserInfo({ hasCollection: true });
      // fetch new collection to display on front
    }
  };

  useContractEvent({
    address: contractAddress,
    abi: ABI,
    eventName,
    listener(log) {
      const { contractAddress, name, symbol } = log[0].args;

      // fetchUserInfo(); // why is this here?
      // Check if the transaction has been confirmed
      console.log(
        `🔵 ${eventName} event received. New collection ${name} (${symbol}) was deployed to contract address: ${contractAddress}`
      );
      setCollectionAddr(contractAddress);
    },
  });

  return (
    <section className="flex flex-col items-center justify-center fixed inset-0 z-50 bg-black/[0.8] text-white w-full h-full overflow-auto">
      <div className=" rounded-sm  flex flex-col items-center bg-gray-100 text-gray-900 p-12 w-3/5">
        {' '}
        <header className="flex w-full px-10 justify-between">
          <h3 className="font-semibold self-center text-2xl">
            Create your NFT collection
          </h3>{' '}
          <button
            className="text-3xl  hover:text-emerald-700 hover:scale-110"
            onClick={() => setShowModal(!showModal)}>
            ⓧ
          </button>
        </header>
        <aside className="my-5 mt-8 text-lg text-pink-600">
          Note: there is a limit of one collection per user. All your NFTs will
          be posted in this collection. After clicking on "create", you can
          start adding NFTs.
        </aside>
        <form
          action="submit"
          className="mt-10 text-xl flex items-end"
          onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="name" className="font-semibold tracking-wide">
              Name{' '}
            </label>
            <input
              id="name"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              type="text"
              placeholder="ex. Alice Collection"
              className="mt-2 p-2 bg-pink-100 rounded-sm border-2 border-pink-300"
            />
          </div>

          <div>
            <label htmlFor="symbol" className="font-semibold tracking-wide">
              Symbol{' '}
            </label>
            <input
              id="symbol"
              value={symbolInput}
              onChange={(e) => setSymbolInput(e.target.value)}
              type="text"
              placeholder="ex. ALICE"
              className="mt-2 p-2 bg-pink-100 rounded-sm border-2 border-pink-300"
            />
          </div>

          <button
            onClick={handleFormSubmit}
            type="submit"
            className="text-xl shadow-lg border-emerald-900 font-semibold mt-10 bg-gradient-to-br from-emerald-700 to-emerald-400 rounded-lg p-2 shadow-lg text-gray-950 hover:translate-y-1">
            Create
          </button>
        </form>
      </div>
    </section>
  );
}

export default NewCollectionModal;
