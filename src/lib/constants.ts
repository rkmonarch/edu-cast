import { launchPadABI, launchPadNFTABI } from "../../contracts/abi";
import { CampaignData, Campaigns } from "./types";

export const networks = [
  {
    chain: "EduChain",
    logo: "/logos/educhain.png",
  },
];

export const integrations = [
  {
    name: "IPFS",
    logo: "/logos/ipfs.png",
  },
];

export const walletIntegrations = [
  {
    name: "MetaMask",
    logo: "/logos/metamask.jpeg",
  },
  {
    name: "Rainbow",
    logo: "/logos/rainbow.png",
  },
];

export const contractAddress = "0xA879BD8bEa033f31d363490f6fe5E709Ff986B3a";

export { launchPadABI, launchPadNFTABI, type CampaignData, type Campaigns };

export const tableHeaders = [
  "Name",
  "Total Mints",
  "Reward Amount (in ETH)",
  "",
];
