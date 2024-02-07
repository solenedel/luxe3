import { createContext, useState, useEffect } from 'react';
import { getMarketplaceOwner } from '@/utils/getMarketplaceOwner';
// import { useAccount } from 'wagmi';

// this context handles the states for the current logged in user and the marketplace admin/owner
export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  // const { address, isConnected } = useAccount();
  const [marketplaceOwner, setMarketplaceOwner] = useState(''); // NOTE - maybe owner doesn't need to be a state var? should it be a constant?
  //const [user, setUser] = useState(''); // current logged in user of the app

  // useEffect(() => {
  //   console.log('ADDRESS: ', address);
  //   setUser(isConnected ? address : '');
  // }, [address, isConnected]);

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
        // IsMarketplaceOwner,
      }}>
      {children}
    </UserContext.Provider>
  );
};
