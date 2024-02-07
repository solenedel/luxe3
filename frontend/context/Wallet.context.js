import { createContext, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

export const WalletContext = createContext();

export function WalletContextProvider({ children }) {
  const [user, setUser] = useState('');
  const { address, isConnected } = useAccount();

  useEffect(() => {
    setUser(address);
  }, [address, isConnected]);

  // useEffect(() => {
  //   setUser(address);
  // }, []);

  return (
    <WalletContext.Provider value={{ address, isConnected, user, setUser }}>
      {children}
    </WalletContext.Provider>
  );
}
