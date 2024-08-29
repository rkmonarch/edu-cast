import Launchpad from "@/components/Launch/Launchpad";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Membership",
  description: "Token launchpad",
  icons: "/edupad.png",
};

export default function TokenLaunchpad() {
  return <Launchpad />;
}
