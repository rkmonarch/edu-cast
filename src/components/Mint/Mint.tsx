/* eslint-disable @next/next/no-img-element */
"use client";

import { launchPadNFTABI } from "@/lib/constants";
import { MintProps } from "@/lib/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createPublicClient, getContract, http } from "viem";
import { arbitrumSepolia } from "viem/chains";
import { useAccount } from "wagmi";
import Layout from "../Common/Layout";

const Product = ({ params }: MintProps) => {
  const { address } = useAccount();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const publicClient = createPublicClient({
    chain: arbitrumSepolia,
    transport: http(),
  });

  const getMetadata = async () => {
    try {
      const nftContract = getContract({
        address: params.address as `0x${string}`,
        abi: launchPadNFTABI,
        client: publicClient,
      });

      const contractUri = await nftContract.read.uri([0]);
      const price = await nftContract.read.nftPrice([]);
      const metadata = await fetch(contractUri as string);

      const data = (await metadata.json()) as {
        name: string;
        description: string;
        image: string;
      };

      setName(data.name);
      setDescription(data.description);
      setImage(data.image);
      setPrice(Number(price));
    } catch (e) {
      toast.error("Failed to fetch metadata for this address");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (address) {
      getMetadata();
    }
  }, [address]);

  return (
    <Layout>
      <div className="w-full pt-20 pb-5 px-5">
        <div className="flex flex-col gap-3 text-sky-400 items-center justify-center">
          <h1 className="text-2xl md:text-3xl text-neutral-800 dark:text-gray-200 font-medium">
            Mint Membership ✨
          </h1>
          <div className="flex flex-col md:flex-row gap-5 bg-[#080808] bg-opacity-5 dark:bg-opacity-30 w-fit p-10 rounded-xl">
            {isLoading ? (
              <>
                <span className="mx-auto w-[20rem] h-[15rem] sm:h-[20rem] bg-gradient-to-tr from-teal-500 to-sky-400 rounded-lg animate-pulse" />
                <div className="flex flex-col gap-3 p-2 h-full animate-pulse">
                  <span className="bg-neutral-400 w-40 h-7 rounded-lg" />
                  <span className="bg-neutral-400 w-72 h-5 rounded-lg mt-2" />
                  <span className="bg-neutral-400 w-72 h-5 rounded-lg" />
                  <div className="flex flex-row gap-2 mt-3 items-center">
                    <span className="bg-sky-200 w-7 h-7 rounded-full" />
                    <span className="bg-neutral-400 w-20 h-6 rounded-lg" />
                  </div>
                  <span className="bg-gradient-to-r from-cyan-300 to-sky-400 w-[8rem] h-10 rounded-lg mt-4" />
                </div>
              </>
            ) : name && description && price ? (
              <>
                <img
                  className="mx-auto w-[20rem] h-[15rem] sm:h-[20rem] bg-gradient-to-tr from-teal-500 to-sky-400 rounded-lg object-fill"
                  src={image}
                  alt="product"
                  width={200}
                  height={200}
                />
                <div className="flex flex-col p-2 h-full">
                  <h1 className="text-3xl font-title text-neutral-700 dark:text-neutral-50">
                    {name}
                  </h1>
                  <p className="mt-2 text-neutral-500 dark:text-neutral-400 text-wrap">
                    {description}
                  </p>
                  <div className="flex flex-row gap-2 mt-4 items-center">
                    <Image
                      className="w-7 h-7 p-1 bg-white rounded-full"
                      src={"/logos/educhain.png"}
                      alt="product"
                      width={200}
                      height={200}
                    />
                    <p className="text-lg text-blue-500 dark:text-teal-400 font-medium">
                      {price.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => {}}
                    className="w-[8rem] h-10 bg-gradient-to-r from-cyan-300 to-sky-400 hover:shadow-lg text-neutral-800 font-semibold rounded-lg mt-4"
                  >
                    Mint
                  </button>
                </div>
              </>
            ) : (
              <h1 className="text-xl text-neutral-400 mx-auto">
                No record found.
              </h1>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
