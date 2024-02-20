import { useState, useEffect, useContext } from 'react';
import { NFTStorage, Token } from 'nft.storage';
import { mintNFT } from '@/utils/mintNFT';
import { useAccount, useContractEvent } from 'wagmi';
import { ABI } from '@/constants/NFTCollection';
import { TokenListContext } from '@/context/TokenList.context';
import { UserContext } from '@/context/User.context';
import { getMetadata } from '@/utils/getMetadata';
import { getLatestTokenNumber } from '@/utils/getters/getLatestTokenNumber';

function AddNFTModal({
  showModalB,
  setShowModalB,
  latestTokenNum,
  setLatestTokenNum,
}) {
  const [titleInput, setTitleInput] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const { address } = useAccount();
  const [URIState, setURIState] = useState('');
  const { collectionAddr } = useContext(UserContext);

  const eventName = 'MintedNFT';

  useContractEvent({
    address: collectionAddr,
    abi: ABI,
    eventName,
    listener(log) {
      const { collectionAddress, to, URI } = log[0].args;
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

    if (URIState !== '') {
      await mintNFT(address, URIState, collectionAddr);
      const _tokenId = await getLatestTokenNumber(collectionAddr);
      setLatestTokenNum(Number(_tokenId));
    }
    setShowModalB(false);
  };

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
      <div className=" rounded-sm flex flex-col bg-pink-50 text-gray-900 p-12 w-5/12">
        {' '}
        <header className="flex w-full justify-between">
          <h3 className="font-semibold text-2xl">
            Add an NFT to your collection
          </h3>{' '}
          <button
            className="text-3xl hover:text-pink-700 hover:scale-105"
            onClick={() => setShowModalB(!showModalB)}>
            ⓧ
          </button>
        </header>
        <form
          action="submit"
          className="mt-10 text-xl w-full"
          onSubmit={handleFormSubmit}>
          <input
            type="file"
            onChange={handleFileUpload}
            className="text-pink-500"
          />
          <button
            disabled={!URIState}
            onClick={handleFormSubmit}
            type="submit"
            className="text-xl disabled:grayscale shadow-lg border-emerald-900 font-semibold mt-10 bg-gradient-to-br tracking-wide from-emerald-600 to-emerald-300 rounded-lg p-2 shadow-lg text-gray-950 hover:cursor-pointer hover:translate-y-1">
            Mint
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddNFTModal;
