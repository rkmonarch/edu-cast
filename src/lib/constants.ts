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

export const contractAddress = "0x88C2fBD9e18acC2e034b7B0456B16e7626768C42";

export { launchPadABI, launchPadNFTABI, type CampaignData, type Campaigns };

export const tableHeaders = [
  "Name",
  "Total Mints",
  "Reward Amount (in ETH)",
  "",
];
