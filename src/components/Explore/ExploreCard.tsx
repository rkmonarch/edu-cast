/* eslint-disable @next/next/no-img-element -- To avoid img element warning */
import { launchPadNFTABI, type Campaigns } from "@/lib/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { parseEther } from "viem";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

const Card = ({ name, price, image, nftAddress }: Campaigns) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { address } = useAccount();
  const { data, writeContract, status, isError } = useWriteContract();
  const { isSuccess, status: isValid } = useWaitForTransactionReceipt({
    hash: data,
  });

  const handleMint = async () => {
    setIsLoading(true);
    if (address) {
      writeContract({
        account: address,
        address: nftAddress as `0x${string}`,
        abi: launchPadNFTABI,
        functionName: "nftMint",
        value: parseEther(price),
      });
    } else {
      setIsLoading(false);
      toast.error("Please connect the wallet", {
        style: {
          borderRadius: "10px",
        },
      });
    }
  };

  useEffect(() => {
    if (status === "success" && isSuccess && isValid === "success") {
      setIsLoading(false);
      toast.success("Purchase Successful", {
        style: {
          borderRadius: "10px",
        },
      });
    } else if (isError) {
      setIsLoading(false);
      toast.error("Something went wrong", {
        style: {
          borderRadius: "10px",
        },
      });
    }
  }, [status, isSuccess, isError, isValid]);

  return (
    <div className="flex flex-col w-fit bg-[#141414] dark:bg-blue-700 bg-opacity-10 dark:bg-opacity-10 border border-neutral-300 dark:border-neutral-700 backdrop-filter backdrop-blur-sm rounded-xl shadow-md p-6">
      <img
        src={image}
        alt={name}
        width={300}
        height={300}
        className="object-fill bg-cyan-400 w-[15rem] h-[15rem] rounded-xl"
      />
      <div className="flex flex-row mt-3 justify-between items-center">
        <h2 className="w-[85%] text-xl font-medium truncate">{name}</h2>
        <Image
          src="/logos/educhain.png"
          alt="chain"
          width={30}
          height={30}
          className="object-fit bg-cyan-100 w-6 h-6 rounded-full"
        />
      </div>
      <div className="flex flex-row mt-2 justify-between items-center">
        <p className="text-neutral-700 dark:text-cyan-200 font-normal">
          {price} ETH
        </p>
        <button
          onClick={() => {
            router.push(`${nftAddress}`);
          }}
          className="bg-gradient-to-br from-[#ffd84b] from-[20%] to-[#e6b366] hover:from-[#ffd643] hover:from-[20%] hover:to-[#d0a564] text-neutral-800 font-medium items-center rounded-lg px-5 py-1.5 disabled:opacity-70 disabled:cursor-progress"
          disabled={isLoading}
        >
          Mint
        </button>
      </div>
    </div>
  );
};

export default Card;
