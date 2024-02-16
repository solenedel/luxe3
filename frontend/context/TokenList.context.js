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

  useEffect(() => {
    console.log('TOKEN ID ARRAY:', tokenIdArray);
    console.log('METADATA ARRAY:', metadataArray);
  }, [tokenIdArray, metadataArray]);

  const fetchLatestTokenNumber = async (_collectionAddr) => {
    const data = await getLatestTokenNumber(_collectionAddr);
    setLatestTokenNumber(Number(data));
  };

  // todo- remove doubles from here (prevent showing same token twice)
  const generateTokenNumberArray = async (_collectionAddr) => {
    for (let i = 1; i < latestTokenNumber + 1; i++) {
      if (!tokenIdArray.includes(i)) {
        setTokenIdArray((prev) => [...prev, i]);

        let metadata = await getMetadata(_collectionAddr, i);

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

      // console.log('⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐');
    }
  };

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
