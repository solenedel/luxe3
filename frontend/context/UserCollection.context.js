import { createContext, useState } from 'react';
import { getCollectionOwner } from '@/utils/getters/getCollectionOwner';

export const UserCollectionContext = createContext();

export function UserCollectionContextProvider({ children }) {
  const [collectionAddr, setCollectionAddr] = useState('');
  const [collectionOwner, setCollectionOwner] = useState('');

  async function fetchCollectionOwner() {
    const _owner = await getCollectionOwner(collectionAddr);
    setCollectionOwner(_owner);
    // console.log('COLLECTION OWNER: ', collectionOwner, _owner);
    return _owner;
  }

  if (collectionAddr !== '') {
    fetchCollectionOwner();
  }

  return (
    <UserCollectionContext.Provider
      value={{
        collectionAddr,
        setCollectionAddr,
        collectionOwner,
        setCollectionOwner,
      }}>
      {children}
    </UserCollectionContext.Provider>
  );
}
