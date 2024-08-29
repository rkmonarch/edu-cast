import PinataClient from "@pinata/sdk";
import { NextRequest, NextResponse } from "next/server";

const pinata = new PinataClient({ pinataJWTKey: process.env.PINATA_JWT });

export async function POST(request: NextRequest) {
  const json = await request.json();
  try {
    const options = {
      pinataMetadata: {
        name: "json",
      },
    };
    const response = await pinata.pinJSONToIPFS(json, options);
    const { IpfsHash } = response;
    return NextResponse.json({ IpfsHash }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
