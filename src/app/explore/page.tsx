"use client";

import Explore from "@/components/Explore/Explore";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore | Edupad",
  description: "Token launchpad",
  icons: "/edupad.png",
};

export default function ExplorePage() {
  return <Explore />;
}
