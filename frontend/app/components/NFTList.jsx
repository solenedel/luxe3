import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { transferOwnership } from '@/utils/transferOwnership';
import { useAccount, useContractEvent } from 'wagmi';
import { ABI } from '@/constants/NFTCollection';
import { getNFTInfo } from '@/utils/getters/getNFTInfo';

function NFTList({ metadataArray, address, owner, collectionAddr }) {
  const [boughtNFTs, setBoughtNFTs] = useState([]);

  // --------------- EVENT LISTENER ------------------------

  const eventName = 'NFTOwnershipTransferred';

  useContractEvent({
    address: collectionAddr,
    abi: ABI,
    eventName,
    listener(log) {
      const { from, to, tokenId } = log[0].args;
      console.log(
        `🔵 ${eventName} event received. Token ${tokenId} transferred from ${from} to ${to}.`
      );
    },
  });

  const buyNFTHandler = async (_tokenId) => {
    const data = await transferOwnership(
      owner,
      address,
      _tokenId,
      collectionAddr
    );

    if (data.status == 'success') {
      setBoughtNFTs((prev) => [...prev, _tokenId]);
    }
  };

  return (
    <section className="flex gap-x-20 mt-8 flex-wrap">
      {metadataArray.map((nft, id) => (
        <div key={uuidv4()}>
          <h4 className="text-2xl text-emerald-400 tracking-wide mb-3">
            {nft.name.slice(0, -4)}
          </h4>
          <img
            src={`${nft.imgLink}`}
            width="150"
            height="150"
            className="rounded-md"
          />
          {address != owner ? (
            <div className="flex gap-x-4 items-end mt-4">
              <span className="text-lg">0.25 ETH</span>
              <button
                onClick={() => buyNFTHandler(id + 1)}
                className="text-xl mt-2 shadow-lg border-pink-800 bg-gradient-to-br from-pink-700 to-pink-400 rounded-lg p-1 shadow-lg text-gray-950 hover:translate-y-1">
                {boughtNFTs.includes(id + 1) ? 'yours' : 'buy'}
              </button>
              {/* <button onClick={() => checkIfOwner(id + 1)}>yours?</button> */}
            </div>
          ) : (
            ''
          )}
        </div>
      ))}
    </section>
  );
}

export default NFTList;
