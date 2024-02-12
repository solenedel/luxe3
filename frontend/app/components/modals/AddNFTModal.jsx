import { useState, useEffect, useContext } from 'react';
import { NFTStorage } from 'nft.storage';
import { mintNFT } from '@/utils/mintNFT';
import { useAccount, useContractEvent } from 'wagmi';
import { UserCollectionContext } from '@/context/UserCollection.context';
import { ABI } from '@constants/NFTCollection';

const client = new NFTStorage({
  token: process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN,
});

function AddNFTModal({ showModalB, setShowModalB }) {
  const [titleInput, setTitleInput] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const { address, isConnected } = useAccount();
  const [URI, setURI] = useState('');
  const { collectionAddr, setCollectionAddr } = useContext(
    UserCollectionContext
  );

  const eventName = 'MintedNFT';

  useContractEvent({
    address: collectionAddr,
    abi: ABI,
    eventName,
    listener(log) {
      const { contractAddress, NFTOwner, URI } = log[0].args;
      // setCollectionAddr(contractAddress);
      console.log(
        `🔵 ${eventName} event received. New NFT minted by ${NFTOwner} to collection: ${contractAddress}. NFT URI: ${URI}`
      );
    },
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // todo- prevent submit if file not uploaded
    const data = await mintNFT(address, URI, collectionAddr);

    // set the price of the NFT (+ mark as for sale) LATER
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const metadata = await client.store({
      name: file.name,
      description: 'description',
      image: file,
    });
    setURI(metadata.url);
  };

  return (
    <section className="flex flex-col items-center justify-center fixed inset-0 z-50 bg-black/[0.8] text-white w-full h-full overflow-auto">
      <div className=" rounded-sm  flex flex-col items-center bg-gray-100 text-gray-900 p-12 w-3/5">
        {' '}
        <header className="flex w-full px-10 justify-between">
          <h3 className="font-semibold self-center text-2xl">
            Add an NFT to your collection
          </h3>{' '}
          <button
            className="text-3xl hover:text-emerald-700 hover:scale-110"
            onClick={() => setShowModalB(!showModalB)}>
            ⓧ
          </button>
        </header>
        <form
          action="submit"
          className="mt-10 text-xl w-full"
          onSubmit={handleFormSubmit}>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="title" className="font-semibold tracking-wide">
              Title
            </label>
            <input
              id="title"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              type="text"
              placeholder="A red bag"
              className="mt-2 p-2 bg-pink-100 rounded-sm border-2 border-pink-300 w-2/5"
            />
          </div>

          {/* <div className="flex flex-col gap-y-2">
            <label htmlFor="price" className="font-semibold tracking-wide">
              Price
            </label>
            <input
              id="price"
              value={priceInput}
              onChange={(e) => setPriceInput(e.target.value)}
              type="text"
              placeholder="0.005 ETH"
              className="mt-2 p-2 bg-pink-100 rounded-sm border-2 border-pink-300 w-2/5"
            />
          </div> */}
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="description"
              className="font-semibold tracking-wide">
              Description
            </label>
            <input
              id="description"
              value={descriptionInput}
              onChange={(e) => setDescriptionInput(e.target.value)}
              type="text"
              placeholder="Black genuine leather crossbody bag"
              className="mt-2 p-2 bg-pink-100 rounded-sm border-2 border-pink-300 w-4/5"
            />
          </div>
          {/* <button
            onClick={handleFormSubmit}
            type="submit"
            className="text-xl text-pink-600 hover:underline mr-10">
            Upload NFT image
          </button> */}
          <input type="file" onChange={handleFileUpload} />
          <button
            onClick={handleFormSubmit}
            type="submit"
            className="text-xl shadow-lg border-emerald-900 font-semibold mt-10 bg-gradient-to-br from-emerald-700 to-emerald-400 rounded-lg p-2 shadow-lg text-gray-950 hover:translate-y-1">
            Mint
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddNFTModal;
