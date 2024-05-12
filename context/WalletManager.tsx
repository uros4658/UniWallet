// WalletManager.tsx
import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import WalletProvider from './WalletProvider';

const WalletManager: React.FC = () => {
  return (
    <div>
      <WalletProvider>
        <ConnectButton />
      </WalletProvider>
      <WalletProvider>
        <ConnectButton />
      </WalletProvider>
      <WalletProvider>
        <ConnectButton />
      </WalletProvider>
    </div>
  );
};

export default WalletManager;