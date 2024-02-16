import { createContext, useState, useEffect } from 'react';
import { getCollectionOwner } from '@/utils/getters/getCollectionOwner';
import { getCollection } from '@/utils/getters/getCollection';
import { useAccount } from 'wagmi';
import { getTokenIdList } from '@/utils/getters/getTokenIdList';
import { getLatestTokenNumber } from '@/utils/getters/getLatestTokenNumber';
import { getMetadata } from '@/utils/getMetadata';
export const TokenListContext = createContext();

export function TokenListContextProvider({ children }) {
  const [latestTokenNumber, setLatestTokenNumber] = useState(0);
  const [tokenIdArray, setTokenIdArray] = useState([]);
  const [metadataArray, setMetadataArray] = useState([]);

  const fetchLatestTokenNumber = async (_collectionAddr) => {
    const data = await getLatestTokenNumber(_collectionAddr);
    console.log('DATA ====', data);
    setLatestTokenNumber(data);
  };

  const generateTokenNumberArray = async (_collectionAddr) => {
    for (let i = 1; i < latestTokenNumber + 1; i++) {
      console.log(i);
      setTokenIdArray((prev) => [...prev, i]);

      const metadata = await getMetadata(_collectionAddr, _tokenID);

      const imgLink = `https://gateway.pinata.cloud/ipfs/${
        metadata.image.split('ipfs://')[1]
      }`;

      setMetadataArray((prev) => [
        ...prev,
        {
          imgLink: imgLink,
          ...metadata,
        },
      ]);
    }
  };

  // const fetchMetadata = async (_tokenID) => {
  //   const metadata = await getMetadata(
  //     collectionInfo.contractAddress,
  //     _tokenID
  //   );

  //   const imgLink = `https://gateway.pinata.cloud/ipfs/${
  //     metadata.image.split('ipfs://')[1]
  //   }`;

  //   setMetadataArray((prev) => [
  //     ...prev,
  //     {
  //       imgLink: imgLink,
  //       ...metadata,
  //     },
  //   ]);
  //   return metadata;
  // };

  // const fetchMetadataForToken = async (_tokenId) => {
  //   await getMetadata(_tokenId);
  // };

  return (
    <TokenListContext.Provider
      value={{
        tokenIdArray,
        setTokenIdArray,
        fetchLatestTokenNumber,
        latestTokenNumber,
        setLatestTokenNumber,
        generateTokenNumberArray,
        metadataArray,
        setMetadataArray,
      }}>
      {children}
    </TokenListContext.Provider>
  );
}
