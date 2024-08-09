import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
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

const chains = [
  arbitrumSepolia,
  morphSepolia,
  neonDevnet,
  sepolia,
  filecoinCalibration,
] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
});
