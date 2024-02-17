import { useState, useEffect, useContext } from 'react';
import { deployNewNFTCollection } from '@/utils/deployNewNFTCollection';
import { useContractEvent } from 'wagmi';
import { contractAddress, ABI } from '@/constants/marketplace';
import { UserContext } from '@/context/User.context';
import { useAccount } from 'wagmi';

// Listen for NFTCollection contract deployment event
const eventName = 'NFTCollectionCreated';

function BuyNFTModal({ showModal, setShowModal }) {
  const { address } = useAccount();
  const [nameInput, setNameInput] = useState('');
  const [symbolInput, setSymbolInput] = useState('');
  const [temp, setTemp] = useState({});
  const [adminEventFired, setAdminEventFired] = useState(false);

  const {
    userInfo,
    setUserInfo,
    fetchUserInfo,
    collectionInfo,
    setCollectionInfo,
    setCollectionAddr,
    marketplaceOwner,
  } = useContext(UserContext);
  // const { account, isConnected } = useAccount();

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();
  //   // call func from contract
  //   const data = await deployNewNFTCollection(nameInput, symbolInput);

  //   if (data.status == 'success') {
  //     //close modal
  //     console.log('ADMIN IS NOT USER');
  //     setCollectionInfo(temp);
  //     setUserInfo({ hasCollection: true });
  //     setCollectionAddr(contractAddress);
  //     // fetch new collection to display on front
  //   }
  // };

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
        <aside>Buy this NFT?</aside>
        <button
          onClick={handleFormSubmit}
          type="submit"
          className="text-xl shadow-lg border-emerald-900 font-semibold mt-10 bg-gradient-to-br from-emerald-700 to-emerald-400 rounded-lg p-2 shadow-lg text-gray-950 hover:translate-y-1">
          Buy
        </button>
      </div>
    </section>
  );
}

export default BuyNFTModal;
