const networks = [
  {
    chain: "EduChain",
    logo: "/logos/educhain.jpeg",
  },
];

const integrations = [
  {
    name: "IPFS",
    logo: "/logos/ipfs.png",
  },
];

const walletIntegrations = [
  {
    name: "MetaMask",
    logo: "/logos/metamask.jpeg",
  },
  {
    name: "Rainbow",
    logo: "/logos/rainbow.png",
  },
];

import { launchPadABI, launchPadNFTABI } from "../../contracts/abi";
import { CampaignData, Campaigns } from "./types";

const contractAddress = "0xA879BD8bEa033f31d363490f6fe5E709Ff986B3a"; // TODO: Educhain Contract Address

export {
  networks,
  integrations,
  walletIntegrations,
  contractAddress,
  launchPadABI,
  launchPadNFTABI,
  type CampaignData,
  type Campaigns,
};
