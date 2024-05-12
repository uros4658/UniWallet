// WalletProvider.tsx
import React, { useState, ReactNode } from 'react';
import WalletManager from './WalletsContext';

interface WalletProviderProps {
  children: ReactNode;
}

let setWallet = (wallet: any) => {};
const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [wallet, setWallet] = useState(null);

  return (
    <WalletManager.Provider value={{ wallet, }}>
      {children}
    </WalletManager.Provider>
  );
};

export default WalletProvider;