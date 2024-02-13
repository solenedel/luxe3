import { createContext, useState, useEffect } from 'react';
import { getCollectionOwner } from '@/utils/getters/getCollectionOwner';
import { getCollection } from '@/utils/getters/getCollection';
import { useAccount } from 'wagmi';
import { getTokenIdList } from '@/utils/getters/getTokenIdList';

export const TokenListContext = createContext();

export function TokenListContextProvider({ children }) {
  const [tokenIdArray, setTokenIdArray] = useState([]);
  const { address, isConnected } = useAccount();

  const fetchTokenIdList = async (_collectionAddr) => {
    const data = await getTokenIdList(_collectionAddr);

    // turn bigint array in to regular number array
    const numberArray = Array.from(data, (n) => Number(n));
    setTokenIdArray(numberArray);
    return numberArray;
  };

  // useEffect(() => {
  //   if (isConnected) {
  //     // fetchTokenIdList();
  //     // console.log('TOKEN ID ARRAY ====', tokenIdArray);
  //   }
  // }, []);

  useEffect(() => {
    console.log('TOKEN ID ARRAY:', tokenIdArray);
  }, [tokenIdArray]);

  return (
    <TokenListContext.Provider
      value={{ tokenIdArray, setTokenIdArray, fetchTokenIdList }}>
      {children}
    </TokenListContext.Provider>
  );
}
