import { createContext, useState, useEffect } from 'react';
import { getCollectionOwner } from '@/utils/getters/getCollectionOwner';
import { getCollection } from '@/utils/getters/getCollection';
import { useAccount } from 'wagmi';
import { getTokenIdList } from '@/utils/getters/getTokenIdList';
import { getLatestTokenNumber } from '@/utils/getters/getLatestTokenNumber';
export const TokenListContext = createContext();

export function TokenListContextProvider({ children }) {
  const [tokenIdArray, setTokenIdArray] = useState([]);
  const [latestTokenNumber, setLatestTokenNumber] = useState(0);

  const fetchLatestTokenNumber = async (_collectionAddr) => {
    const data = await getLatestTokenNumber(_collectionAddr);
    console.log('DATA ====', data);
    setLatestTokenNumber(data);
  };

  const generateTokenNumberArray = () => {
    for (let i = 0; i < latestTokenNumber; i++) {
      console.log(i);
      setTokenIdArray((prev) => [...prev, i]);
    }
    setLatestTokenNumber(data);
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
      }}>
      {children}
    </TokenListContext.Provider>
  );
}
