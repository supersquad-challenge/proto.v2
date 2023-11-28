"use client";
import Layout from "@/layout/Layout";
import GlobalStyle from "@/styles/global";
import Providers from "@/redux/provider";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import StyledComponentsRegistry from "@/styles/registry/registry";
import { createWeb3Modal, useWeb3ModalState } from "@web3modal/wagmi/react";
import { Chain, WagmiConfig, configureChains, createConfig } from "wagmi";
import { walletConnectProvider } from "@web3modal/wagmi";
import { publicProvider } from "wagmi/providers/public";
import { klaytn, polygon } from "wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { alchemyProvider } from "wagmi/providers/alchemy";
// import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import dotenv from "dotenv";
import { useEffect, useRef } from "react";
import colors from "@/styles/color";
dotenv.config();

// 1. Get PROJECT_ID
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "";

const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY || "";

const klaytnRpcConfig = {
  rpc: (chain: Chain) => {
    if (chain === klaytn) {
      return { http: "https://public-en-cypress.klaytn.net" };
    }
    return null; // 또는 다른 체인에 대한 처리
  },
};

// 2. Create wagmiConfig
const { chains, publicClient } = configureChains(
  [polygon, klaytn],
  [
    walletConnectProvider({ projectId }),
    publicProvider(),
    alchemyProvider({ apiKey: alchemyKey }),
    // jsonRpcProvider(klaytnRpcConfig),
  ]
);

const metadata = {
  name: "SuperSquad v2",
  description: "supersqaud challenge",
  url: "https://v2.supersquad.store",
  icons: "/src/app/favicon.ico",
};

const Chains = [polygon, klaytn];

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({
      chains: Chains,
      options: { projectId, showQrModal: false, metadata },
    }),
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
  ],
  publicClient,
});

// 3. Create modal
createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  themeMode: "light",
  themeVariables: {
    "--w3m-accent": `${colors.primary}`,
    "--w3m-font-family": "Poppin",
    "--w3m-font-size-master": "8px",
  },
  featuredWalletIds: [
    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
    "ef333840daf915aafdc4a004525502d6d49d77bd9c65e0642dbaefb3c2893bef",
    "3c2c985c0adff6f46a0d0e466b3924ed8a059043882cd1944ad7f2adf697ed54",
  ],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = new QueryClient();
  return (
    <html lang="en">
      <body style={{ margin: "0px" }}>
        <QueryClientProvider client={client}>
          <StyledComponentsRegistry>
            <GlobalStyle />
            <WagmiConfig config={wagmiConfig}>
              <Providers>
                <Layout>{children}</Layout>
              </Providers>
            </WagmiConfig>
          </StyledComponentsRegistry>
        </QueryClientProvider>
      </body>
    </html>
  );
}
