import { createContext, useState, useEffect } from 'react';
import { getMarketplaceOwner } from '@/utils/getMarketplaceOwner';
import { useAccount } from 'wagmi';
import { getUser } from '@/utils/getters/getUser';
import { getCollection } from '@/utils/getters/getCollection';
import { getCollectionOwner } from '@/utils/getters/getCollectionOwner';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const { address, isConnected } = useAccount();
  const [marketplaceOwner, setMarketplaceOwner] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [collectionAddr, setCollectionAddr] = useState('');
  const [collectionOwner, setCollectionOwner] = useState('');
  const [collectionInfo, setCollectionInfo] = useState('');
  //const [user, setUser] = useState(''); // no need since already have address from useAccount?

  async function fetchUserInfo() {
    const _userInfo = await getUser(address);
    setUserInfo(_userInfo);
    return _userInfo;
  }

  async function ownerIsUser(_owner, _user) {
    if (_owner == _user) {
      return true;
    } else {
      return false;
    }
  }

  // todo- rename marketplace owner to admin
  async function fetchMarketplaceOwner() {
    const _owner = await getMarketplaceOwner();
    setMarketplaceOwner(_owner);
  }

  // fetch user's collection
  async function getUserCollection() {
    if (isConnected && userInfo.hasCollection) {
      const _collectionInfo = await getCollection(address);
      setCollectionInfo(_collectionInfo);
    }
  }

  // fetches the owner of a specific collection
  // note this is not necessarily the marketplace admin
  async function fetchCollectionOwner(_collectionAddr) {
    const _owner = await getCollectionOwner(_collectionAddr);
    setCollectionOwner(_owner);
    return _owner;
  }

  // checks if current user is the owner of a collection
  async function isCollectionOwner(_collectionOwner, _user) {
    if (fetchCollectionOwner(_collectionOwner) == _user) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    fetchMarketplaceOwner(); // get marketplace owner
    if (address && fetchUserInfo().hasCollection == true) {
      getUserCollection(); // should trigger for admin too
    }

    if (ownerIsUser(marketplaceOwner, address)) {
      console.log(' YOU ARE LOGGED IN AS THE MARKETPLACE ADMIN');
    }
  }, [address, isConnected, userInfo.hasCollection]);

  return (
    <UserContext.Provider
      value={{
        marketplaceOwner,
        setMarketplaceOwner,
        userInfo,
        setUserInfo,
        collectionAddr,
        setCollectionAddr,
        collectionOwner,
        setCollectionOwner,
        collectionInfo,
        setCollectionInfo,
        fetchUserInfo,
        ownerIsUser,
        fetchMarketplaceOwner,
        getUserCollection,
        fetchCollectionOwner,
        isCollectionOwner,
      }}>
      {children}
    </UserContext.Provider>
  );
};
