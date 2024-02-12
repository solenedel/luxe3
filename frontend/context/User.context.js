import { createContext, useState, useEffect } from 'react';
import { getMarketplaceOwner } from '@/utils/getMarketplaceOwner';
import { useAccount } from 'wagmi';
import { getUser } from '@/utils/getters/getUser';

// this context handles the states for the current logged in user and the marketplace admin/owner
export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const { address, isConnected } = useAccount();
  const [userInfo, setUserInfo] = useState('');
  const [marketplaceOwner, setMarketplaceOwner] = useState(''); // NOTE - maybe owner doesn't need to be a state var? should it be a constant?
  //const [user, setUser] = useState(''); // current logged in user of the app

  async function fetchUserInfo() {
    const _userInfo = await getUser(address);
    setUserInfo(_userInfo);
    // console.log('USER INFO =======', _userInfo);
  }

  useEffect(() => {
    if (address) {
      fetchUserInfo();
    }
  }, [address, isConnected]);

  async function fetchMarketplaceOwner() {
    const _owner = await getMarketplaceOwner();
    setMarketplaceOwner(_owner);
    return _owner;
  }

  fetchMarketplaceOwner();

  // const userIsMarketplaceOwner = (_user, _admin) => {
  //   if (_user !== '' && _user === _admin) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  return (
    <UserContext.Provider
      value={{
        marketplaceOwner,
        fetchUserInfo,
        // IsMarketplaceOwner,
        userInfo,
      }}>
      {children}
    </UserContext.Provider>
  );
};
