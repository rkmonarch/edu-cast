import airdrop from "@/app/_actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { walletAddresses, contractAddress } = await req.json();

  console.log("walletAddresses:", walletAddresses);
  console.log("contractAddress:", contractAddress);

  const txs = await airdrop(contractAddress, walletAddresses);

  console.log("txs:", txs);

  return NextResponse.json({ txs });
}
