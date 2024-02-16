import { useState, useEffect, useContext } from 'react';
import { NFTStorage, Token } from 'nft.storage';
import { mintNFT } from '@/utils/mintNFT';
import { useAccount, useContractEvent } from 'wagmi';
import { ABI } from '@/constants/NFTCollection';
import { TokenListContext } from '@/context/TokenList.context';
import { UserContext } from '@/context/User.context';

function AddNFTModal({ showModalB, setShowModalB }) {
  const [titleInput, setTitleInput] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const { address, isConnected } = useAccount();
  const [URIState, setURIState] = useState('');
  const { tokenIdArray, setTokenIdArray, fetchTokenIdList } =
    useContext(TokenListContext);
  const { collectionAddr, userAddr, setUserAddr } = useContext(UserContext);

  // const clientStatusFunc = async () => {
  //   const status = await client.status(
  //     'zdj7Wn9FQAURCP6MbwcWuzi7u65kAsXCdjNTkhbJcoaXBusq9'
  //   );
  //   console.log('Status ====', status);
  // };

  const eventName = 'MintedNFT';

  useContractEvent({
    address: collectionAddr,
    abi: ABI,
    eventName,
    listener(log) {
      const { collectionAddress, to, URI } = log[0].args;
      console.log(log[0].args);
      console.log(
        `🔵 ${eventName} event received. New NFT minted by ${to} in ${collectionAddress}. NFT URI: ${URI}`
      );
    },
  });

  const client = new NFTStorage({
    token: process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN,
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // todo- prevent submit if file not uploaded
    if (URIState !== '') {
      const data = await mintNFT(address, URIState, collectionAddr);
    }

    // set the price of the NFT (+ mark as for sale) LATER
  };

  useEffect(() => {
    console.log('==== URI STATE  ====', URIState);
  }, [URIState]);

  // upload to NFT storage
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const metadata = await client.store({
      name: file.name,
      description: 'description',
      image: file,
    });
    setURIState(metadata.url);
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
          {/* <div className="flex flex-col gap-y-2">
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
          </div> */}
          <input
            type="file"
            onChange={handleFileUpload}
            className="text-green-400"
          />
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
