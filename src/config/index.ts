import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { defineChain } from "viem";
import {
  arbitrumSepolia,
  filecoinCalibration,
  morphSepolia,
  neonDevnet,
  sepolia,
} from "viem/chains";

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "Educast",
  description: "ERC1155 Launchpad",
  url: "https://educast.vercel.app",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const eduChain = defineChain({
  id: 656_476,
  name: "EduChain",
  nativeCurrency: {
    name: "EDU ETHER",
    symbol: "EDU",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.open-campus-codex.gelato.digital"],
    },
  },
  blockExplorers: {
    default: {
      name: "OpenCampus",
      url: "https://opencampus-codex.blockscout.com/",
    },
  },
  testnet: true,
});

const chains = [eduChain] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
});
