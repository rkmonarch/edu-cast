"use client";
import { Layout, Table } from "@/components";
import { contractAddress, launchPadABI } from "@/constants";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { useAccount, useReadContract } from "wagmi";

export const metadata: Metadata = {
  title: "Dashboard | Edupad",
  description: "Token launchpad",
  icons: "/edupad.png",
};

type CardProps = {
  heading: string;
  title: string;
  img: string;
  link: string;
  color: string;
  style: string;
};

const headers = ["Name", "Total Mints", "Reward Amount (in ETH)", ""];

const Card = ({ heading, title, img, link, color, style }: CardProps) => {
  return (
    <div className="w-[90%] md:w-1/3 flex flex-col">
      <h1 className="text-neutral-600 font-bold text-sm pl-5 pb-3 dark:text-sky-100">
        {heading}
      </h1>
      <Link
        href={link}
        className={`flex items-center rounded-[30px] overflow-hidden shadow-lg  min-h-[100px] md:min-h-[150px] ${color}`}
      >
        <div className="px-6 py-4">
          <div className={`font-extrabold text-xl mb-2 text-center ${style}`}>
            {title}
          </div>
        </div>
        <div className="flex mx-auto justify-center w-[100%]">
          <Image
            src={img}
            width="100"
            height="100"
            alt="Icon"
            className=" transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-150 duration-300"
          />
        </div>
      </Link>
    </div>
  );
};

const Dashboard = () => {
  const [NFTAddresses, setNFTAddresses] = useState<`0x${string}`[]>([]);
  const { address } = useAccount();

  const { data } = useReadContract({
    address: contractAddress,
    abi: launchPadABI,
    functionName: "getNFTsWithMetadataCreatedByCreator",
    args: [address],
  });

  const fetchData = async () => {
    let nfts = [];
    for (let nft of data as any) {
      nfts.push(nft.nftAddress);
      console.log(nft.nftAddress);
    }
    setNFTAddresses(nfts);
  };

  useEffect(() => {
    if (data) {
      fetchData();
    }
  }, [data]);

  return (
    <Layout>
      <div className="flex flex-col w-full pl-[80px] lg:pl-0 pb-10 md:pr-5">
        <div className="flex space-x-2 items-center mb-10 justify-center md:justify-start">
          <MdSpaceDashboard size={20} className="dark:text-sky-300" />
          <h1 className="text-[#1e1e1e] font-semibold text-xl dark:text-sky-300">
            DASHBOARD
          </h1>
        </div>
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-x-4 md:space-y-0 md:items-start md:justify-start">
          <Card
            heading="CREATE A NFT MEMBERSHIPS"
            link="/launchpad"
            title="NFT COLLECTION"
            img="/images/nft.png"
            style="text-neutral-800"
            color="bg-gradient-to-r from-[#FFDC9A]/80 to-[#FFBFAB]/80"
          />
          <Card
            heading="SHIP ERC1155 TO ATTENDEES"
            link="/airdrop"
            title="AIRDROP NFTs"
            img="/images/airdrop.png"
            style="text-neutral-800"
            color="bg-gradient-to-r from-sky-300/90 to-[#FFE5E8]/90"
          />
        </div>
        <div className="mt-12">
          <table className="min-w-full divide-gray-200 dark:divide-gray-700">
            <thead className="bg-neutral-200 dark:bg-blue-900">
              <tr>
                {headers.map((header, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="capitalize px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-neutral-800 dark:text-neutral-200"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            {NFTAddresses.map((nftAddress, index) => (
              <Table key={index} headers={headers} NFTAddress={nftAddress} />
            ))}
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
