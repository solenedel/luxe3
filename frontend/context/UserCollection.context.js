import { createContext, useState } from 'react';
import { getCollectionOwner } from '@/utils/getters/getCollectionOwner';
import { getCollection } from '@/utils/getters/getCollection';
import { useAccount } from 'wagmi';

export const UserCollectionContext = createContext();

export function UserCollectionContextProvider({ children }) {
  const [collectionAddr, setCollectionAddr] = useState('');
  const [collectionOwner, setCollectionOwner] = useState('');
  const { address, isConnected } = useAccount();
  const [collectionInfo, setCollectionInfo] = useState('');

  async function fetchCollectionOwner() {
    const _owner = await getCollectionOwner(collectionAddr);
    setCollectionOwner(_owner);
    // console.log('COLLECTION OWNER: ', collectionOwner, _owner);
    return _owner;
  }

  if (isConnected && collectionAddr !== '') {
    fetchCollectionOwner(); // persist in state
  }

  // fetch user's collection
  async function getUserCollection() {
    const _collectionInfo = await getCollection(address);
    setCollectionInfo(_collectionInfo);
  }

  if (isConnected && address !== '') {
    // getUserCollection();
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
