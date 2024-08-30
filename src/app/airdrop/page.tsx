import Airdrop from "@/components/Airdrop/Airdrop";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Airdrop | Edupad",
  description: "Token launchpad",
  icons: "/edupad.png",
};

export default function AirdropToken() {
  return <Airdrop />;
}
