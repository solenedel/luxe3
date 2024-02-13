import { createContext, useState, useEffect } from 'react';
import { getCollectionOwner } from '@/utils/getters/getCollectionOwner';
import { getCollection } from '@/utils/getters/getCollection';
import { useAccount } from 'wagmi';
import { getTokenIdList } from '@/utils/getters/getTokenIdList';

export const TokenListContext = createContext();

export function TokenListContextProvider({ children }) {
  const [tokenIdArray, setTokenIdArray] = useState([]);
  const { address, isConnected } = useAccount();

  const fetchTokenIdList = async () => {
    const data = await getTokenIdList();
    setTokenIdArray(data);
  };

  useEffect(() => {
    if (isConnected) {
      fetchTokenIdList();
      console.log('TOKEN ID ARRAY ====', tokenIdArray);
    }
  }, []);

  useEffect(() => {
    console.log('TOKEN ID ARRAY ====', tokenIdArray);
  }, [tokenIdArray]);

  return (
    <TokenListContext.Provider
      value={{ tokenIdArray, setTokenIdArray, fetchTokenIdList }}>
      {children}
    </TokenListContext.Provider>
  );
}
