import { createContext, useState } from 'react';
import { getMarketplaceOwner } from '@/utils/getMarketplaceOwner';

// this context handles the states for the current logged in user and the marketplace admin/owner
export const UserContext = createContext();
export const UserContextProvider = ({ children }) => {
  const [marketplaceOwner, setMarketplaceOwner] = useState(''); // NOTE - maybe owner doesn't need to be a state var? should it be a constant?
  const [user, setUser] = useState(''); // current logged in user of the app

  async function fetchMarketplaceOwner() {
    const _owner = await getMarketplaceOwner();
    setMarketplaceOwner(_owner);
    return _owner;
  }

  fetchMarketplaceOwner();

  const userIsMarketplaceOwner = (_user, _admin) => {
    if (_user !== '' && _user === _admin) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, marketplaceOwner, userIsMarketplaceOwner }}>
      {children}
    </UserContext.Provider>
  );
};
