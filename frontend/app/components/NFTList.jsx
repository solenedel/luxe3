import { v4 as uuidv4 } from 'uuid';
import BuyNFTModal from './modals/BuyNFTModal';
import { useState } from 'react';
import { transferOwnership } from '@/utils/transferOwnership';
import { useAccount, useContractEvent } from 'wagmi';
import { ABI } from '@/constants/NFTCollection';

function NFTList({ metadataArray, address, owner, collectionAddr }) {
  // const [showModal, setShowModal] = useState(false);

  // --------------- EVENT LISTENER ------------------------

  const eventName = 'NFTOwnershipTransferred';

  useContractEvent({
    address: collectionAddr,
    abi: ABI,
    eventName,
    listener(log) {
      const { from, to, tokenId } = log[0].args;
      console.log('ARGS =====', log[0].args);
      console.log(
        `🔵 ${eventName} event received. Token ${tokenId} transferred from ${from} to ${to}.`
      );
    },
  });

  //  todo- remove the "buy" button once you own the NFT
  const buyNFTHandler = async (_tokenId) => {
    const data = await transferOwnership(
      owner,
      address,
      _tokenId,
      collectionAddr
    );
  };

  return (
    <section className="flex gap-x-20 mt-10">
      {/* {address != owner ? <BuyNFTModal /> : ''} */}
      {metadataArray.map((nft, id) => (
        <div key={uuidv4()}>
          <h4 className="text-xl font-semibold mb-2">
            {nft.name.slice(0, -4)}
          </h4>
          <img src={`${nft.imgLink}`} width="150" height="150" />
          {address != owner ? (
            <button
              onClick={() => buyNFTHandler(id + 1)}
              className="text-xl mt-2 shadow-lg border-emerald-900 font-semibold bg-gradient-to-br from-emerald-800 to-emerald-500 rounded-lg p-1 shadow-lg text-gray-950 hover:translate-y-1">
              Buy
            </button>
          ) : (
            ''
          )}
        </div>
      ))}
    </section>
  );
}

export default NFTList;
