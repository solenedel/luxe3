import { createContext, useState } from 'react';

export const UserCollectionContext = createContext();

export function UserCollectionContextProvider({ children }) {
  const [collectionAddr, setCollectionAddr] = useState('');

  return (
    <UserCollectionContext.Provider
      value={{ collectionAddr, setCollectionAddr }}>
      {children}
    </UserCollectionContext.Provider>
  );
}
