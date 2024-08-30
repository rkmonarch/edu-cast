import Product from "@/components/Mint/Mint";
import { MintProps } from "@/lib/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mint | Edupad",
  description: "Token launchpad",
  icons: "/edupad.png",
};

export default function Mint({ params }: MintProps) {
  return <Product params={params} />;
}
