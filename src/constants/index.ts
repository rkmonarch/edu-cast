const networks = [
  {
    chain: "Sepolia",
    logo: "/logos/eth.png",
    contract: "0xccc8aFf496bCae6a05114dB4c27279d8b6D0942A",
  },
  {
    chain: "Arbitrum Sepolia",
    logo: "/logos/arbitrum.svg",
    contract: "0x6633589236aa3cc786c113a9b24d77cfb2ebf0b1",
  },
  {
    chain: "Neon EVM DevNet",
    logo: "/logos/neon.png",
    contract: "0x039A8561E235cF960bfed66AAD74441E3594aBb4",
  },
  {
    chain: "Morph Sepolia",
    logo: "/logos/morph.svg",
    contract: "0xA4CCEb9e84b9682ca559AA41DB57f4BECe586dc5",
  },
  {
    chain: "Filecoin Calibration",
    logo: "/logos/filecoin.png",
    contract: "0xA4CCEb9e84b9682ca559AA41DB57f4BECe586dc5",
  },
];

const integrations = [
  {
    name: "IPFS",
    logo: "/logos/ipfs.png",
  },
  {
    name: "Sign",
    logo: "/logos/sign.png",
  },
];

import { CampaignData, Campaigns } from "./types";
import { launchPadABI, launchPadNFTABI } from "../../contracts/abi";

const contractAddress = '0xA879BD8bEa033f31d363490f6fe5E709Ff986B3a';

export {
  networks,
  integrations,
  launchPadABI,
  launchPadNFTABI,
  type CampaignData,
  type Campaigns,
};
