"use client";

import { contractAddress, launchPadABI } from "@/lib/constants";
import Head from "next/head";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiCopy } from "react-icons/fi";
import { useAccount, useReadContract } from "wagmi";
import Layout from "../Common/Layout";
import Input from "../FormComp/Input";
import Select from "../FormComp/Select";
import Upload from "../FormComp/Upload";
import Checkbox from "../FormComp/checkBoxUI";

export default function Airdrop() {
  const { address } = useAccount();
  const [network, setNetwork] = useState("");
  const [isOwned, setIsOwned] = useState(true);
  const [addressList, setAddressList] = useState("");
  const [nftAddresses, setNftAddresses] = useState([{}]);
  const [nftAddress, setNftAddress] = useState("");
  const [isAirdrop, setIsAirdrop] = useState(false);
  const [responseData, setResponseData] = useState({});

  const { data } = useReadContract({
    address: contractAddress,
    abi: launchPadABI,
    functionName: "getNFTsWithMetadataCreatedByCreator",
    args: [address],
  });
  console.log(data);
  const fetchData = async () => {
    try {
      let nfts = [{}];
      for (let nft of data as any) {
        const response = await fetch(nft.uri);
        const json = await response.json();

        console.log(json);
        nfts.push({
          name: json.name,
          value: nft.nftAddress,
        });
      }
      setNftAddresses(nfts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data) {
      setNftAddresses([]);
      fetchData();
    }
  }, [data]);

  return (
    <Layout>
      <Head>
        <title>Airdrop</title>
        <meta name="description" content="airdrop" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center justify-center space-y-5">
        <h2 className="text-3xl font-bold mb-5">Airdrop</h2>
        <div className="flex flex-col w-[100%] md:max-w-[600px] mx-auto p-5  items-center justify-center border border-gray-300 rounded-xl">
          <div className="flex flex-row w-[100%] space-x-5 items-center mt-3">
            <p className="flex w-[100px] font-semibold">Contract address</p>
            {isOwned ? (
              <Select
                id="contractAddress"
                name="contract"
                label="Contract Address"
                placeholder="Select Your NFT"
                options={nftAddresses as any}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNftAddress(e.target.value)
                }
              />
            ) : (
              <Input
                type="text"
                id="contractAddress"
                name="contract"
                label="Contract Address"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNftAddress(e.target.value)
                }
                value={nftAddress}
              />
            )}
          </div>
          <div className="flex flex-row w-[100%] items-center">
            <p className="flex w-[100px] font-semibold"></p>
            <Checkbox
              id="owned"
              name="owned"
              label="Do you want to use your existing NFT?"
              checked={isOwned}
              onChange={() => {
                setIsOwned(!isOwned);
              }}
            />
          </div>
          <div className="flex flex-row w-[100%] mb-4 space-x-5 items-center">
            <p className="flex w-[100px] font-semibold">List of recipient</p>
            <Upload
              id="image"
              name="image"
              label="Upload JSON"
              type="file"
              accept="application/JSON"
              onChange={async (e: any) => {
                const file = e.target.files[0];
                console.log(file);
                const contents = await file.text();
                const json = JSON.parse(contents);
                console.log(json.address);
                setAddressList(json.address);
              }}
            />
          </div>
          <div className="flex flex-row w-[100%] items-center">
            <p className="flex w-[100px] font-semibold"></p>
            <div className="text-sm text-[#858585]">
              Follow this json format for addresses{" "}
              <a href="" className="text-[#3cb6c8] dark:text-[#9FF3FF]">
                here
              </a>
            </div>
          </div>
          <div className="flex w-[100%] bg-[#1e1e1e] drop-shadow-lg text-gray-300 md:max-w-[600px] mx-auto p-5 mt-2 justify-center border border-gray-600 rounded-xl">
            {`curl  -X POST \
  'https://edupad.vercel.app/api/airdrop' \
  --header 'Accept: */*' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "address": [
    "${addressList}"
  ],
  "contractAddress": "${nftAddress}"
}'`}
            <FiCopy
              size={50}
              className="relative mt-[-1rem] cursor-pointer text-[#a13bf7]"
              onClick={() => {}}
            />
          </div>
        </div>
        <button
          className="mx-auto text-[#9FF3FF] dark:text-[#131619] hover:bg-black bg-white items-center justify-center dark:hover:bg-[#95e5f2] focus:ring-1 focus:outline-none focus:ring-[#cfcfcf] font-medium rounded-xl text-sm px-5 py-2.5 text-center shadow-none drop-shadow-xl"
          onClick={() => {
            setIsAirdrop(true);
            setTimeout(() => {
              toast.success("Airdrop successful", {
                icon: "🚀",
                style: {
                  borderRadius: "10px",
                },
              });
              setResponseData({
                status: "success",
                message: "Airdrop successful",
              });
              setIsAirdrop(false);
            }, 2000);
          }}
        >
          {isAirdrop ? "Airdropping..." : "Airdrop Now"}
        </button>
        <div className="flex w-[100%] bg-[#1e1e1e] drop-shadow-lg text-gray-300 md:max-w-[600px] mx-auto p-3 mt-2 justify-center border border-gray-600 rounded-xl">
          <h5>{responseData ? JSON.stringify(responseData) : "No response"}</h5>
        </div>
      </div>
    </Layout>
  );
}
