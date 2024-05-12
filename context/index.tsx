'use client'

import React, { ReactNode } from 'react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { State, WagmiProvider } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { cookieStorage, createStorage } from 'wagmi'
// Setup queryClient
const queryClient = new QueryClient()
export const projectId = '58285468e8924fcbb4590fa95967cbd9';
if (!projectId) throw new Error('Project ID is not defined')
const chains = [mainnet, sepolia] as const;

const metadata = {
    name: 'Web3Modal',
    description: 'Web3Modal Example',
    url: 'http://localhost:3000/', // origin must match your domain & subdomain
    icons: ['https://avatars.githubusercontent.com/u/37784886']
  }

export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
})
// Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true // Optional - false as default
})

export default function Web3ModalProvider({
  children,
  initialState
}: {
  children: ReactNode
  initialState?: State
}) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}