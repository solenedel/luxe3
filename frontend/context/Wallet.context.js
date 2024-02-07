import { createContext, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

export const WalletContext = createContext();

export function WalletContextProvider({ children }) {
  const [connected, setConnected] = useState(false);
  const { account } = useAccount();

  useEffect(() => {
    if (account) {
      setConnected(true);
    } else {
      setConnected(false);
    }
  }, [account]);

  return (
    <WalletContext.Provider value={{ connected, account }}>
      {children}
    </WalletContext.Provider>
  );
}
