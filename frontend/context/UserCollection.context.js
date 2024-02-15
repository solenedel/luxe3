import { createContext, useState, useEffect, useContext } from 'react';
import { getCollectionOwner } from '@/utils/getters/getCollectionOwner';
import { getCollection } from '@/utils/getters/getCollection';
import { useAccount } from 'wagmi';
import { UserContext } from './User.context';

export const UserCollectionContext = createContext();

export function UserCollectionContextProvider({ children }) {
  const [collectionAddr, setCollectionAddr] = useState('');
  const [collectionOwner, setCollectionOwner] = useState('');
  const { address, isConnected } = useAccount();
  const [collectionInfo, setCollectionInfo] = useState('');
  const { userInfo } = useContext(UserContext);

  async function fetchCollectionOwner(_collectionAddr) {
    const _owner = await getCollectionOwner(_collectionAddr);
    setCollectionOwner(_owner);
    // console.log('COLLECTION OWNER: ', collectionOwner, _owner);
    return _owner;
  }

  // fetch user's collection
  async function getUserCollection() {
    if (isConnected && userInfo.hasCollection) {
      const _collectionInfo = await getCollection(address);
      setCollectionInfo(_collectionInfo);
    }
  }

  useEffect(() => {
    if (isConnected && userInfo.hasCollection) {
      fetchCollectionOwner();
      getUserCollection();
      // also check for hasCollection
      // fetchCollectionOwner(); // todo- persist in statecheck
    }
  }, [isConnected, address, userInfo.hasCollection]);

  return (
    <UserCollectionContext.Provider
      value={{
        collectionAddr,
        setCollectionAddr,
        collectionOwner,
        setCollectionOwner,
        collectionInfo,
        setCollectionInfo,
      }}>
      {children}
    </UserCollectionContext.Provider>
  );
}
