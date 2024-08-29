"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { State, WagmiProvider } from "wagmi";
import { config, projectId } from "../config";

const queryClient = new QueryClient();

if (!projectId) throw new Error("Project ID is not defined");

createWeb3Modal({
  wagmiConfig: config,
  projectId,
});

export default function Web3ModalProvider({
  children,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  return (
    <ThemeProvider attribute="class">
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
}
