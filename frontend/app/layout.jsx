'use client';
import { Inter, DM_Serif_Display, Golos_Text } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { hardhat, sepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { UserContextProvider } from '@/context/User.context';
import Footer from './components/Footer';
import { WalletContextProvider } from '@/context/Wallet.context';
import { UserCollectionContextProvider } from '@/context/UserCollection.context';
import { TokenListContextProvider } from '@/context/TokenList.context';
const inter = Inter({ subsets: ['latin'] });
const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
});
const golosText = Golos_Text({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

// export const metadata = {
//   title: 'Luxe2',
//   description: 'Your second-hand luxury NFT marketplace',
// };

const { chains, publicClient } = configureChains(
  [hardhat, sepolia],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId: 'a6d238c29c51161f7167d79c737e8e19',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors,
  publicClient,
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={golosText.className}>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
            <WalletContextProvider>
              <UserContextProvider>
                <UserCollectionContextProvider>
                  <TokenListContextProvider>
                    <Header />
                    {children}
                    <Footer />
                  </TokenListContextProvider>
                </UserCollectionContextProvider>
              </UserContextProvider>
            </WalletContextProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
