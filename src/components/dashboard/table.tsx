"use client";
import { launchPadNFTABI } from "@/constants";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { formatEther } from "viem";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

interface TableProps {
  headers: string[];
  NFTAddress: `0x${string}`;
}

const Table: React.FC<TableProps> = ({ headers, NFTAddress }) => {
  const [NFTName, setNFTName] = useState("");
  const [NFTTotalMints, setNFTTotalMints] = useState("");
  const [NFTBalance, setNFTBalance] = useState("");
  const [NFTBalanceInWei, setNFTBalanceInWei] = useState(BigInt(0));
  const { address } = useAccount();

  const { data: uriData } = useReadContract({
    address: NFTAddress,
    abi: launchPadNFTABI,
    functionName: "uri",
    args: [0],
  });

  const { data: contractBalance } = useReadContract({
    address: NFTAddress,
    abi: launchPadNFTABI,
    functionName: "getContractBalance",
  });

  const { data: contractMints } = useReadContract({
    address: NFTAddress,
    abi: launchPadNFTABI,
    functionName: "counter",
  });

  const { data, writeContractAsync, status, isError } = useWriteContract();
  const {
    isSuccess,
    status: isValid,
    isError: isTxError,
  } = useWaitForTransactionReceipt({
    hash: data,
  });

  useEffect(() => {
    if (status === "success" && isSuccess && isValid === "success") {
      toast.success("Claimed Successfully", {
        style: {
          borderRadius: "10px",
        },
      });
    } else if (isError && isTxError) {
      toast.error("Something went wrong", {
        style: {
          borderRadius: "10px",
        },
      });
    }
  }, [status, isSuccess, isTxError, isError, isValid]);

  useEffect(() => {
    if (uriData) {
      fetch(uriData as string)
        .then((response) => response.json())
        .then((data) => {
          setNFTName(data.name);
        });
    }
  }, [uriData]);

  useEffect(() => {
    if (contractMints) {
      setNFTTotalMints(contractMints.toString());
    }
  }, [contractMints]);

  useEffect(() => {
    if (contractBalance) {
      setNFTBalanceInWei(contractBalance as any);
      setNFTBalance(formatEther(contractBalance as any));
    }
  }, [contractBalance]);

  return (
    <tbody className="capitalize divide-gray-200 dark:divide-gray-700 bg-sky-100 dark:bg-gray-900">
      <tr>
        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
          <div className="font-medium text-gray-800 dark:text-white">
            {NFTName}
          </div>
        </td>
        <td className="px-4 py-4 text-sm whitespace-nowrap">
          <div className="text-gray-700 dark:text-gray-200">
            {NFTTotalMints ? NFTTotalMints : "0"}
          </div>
        </td>
        <td className="px-4 py-4 text-sm whitespace-nowrap">
          <div className="text-gray-700 dark:text-gray-200">
            {NFTBalance ? NFTBalance : "0"}
          </div>
        </td>
        <td className="px-1 py-4 text-sm whitespace-nowrap">
          <div className="text-gray-700 dark:text-gray-200">
            <button
              className="bg-[#9FF3FF] hover:bg-[#94e2ee] text-gray-700 font-bold py-2 px-4 rounded-full drop-shadow-lg inline-flex items-center"
              onClick={async () => {
                await writeContractAsync({
                  account: address,
                  address: NFTAddress,
                  abi: launchPadNFTABI,
                  functionName: "withdraw",
                  args: [NFTBalanceInWei, address],
                });
              }}
            >
              Claim
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default Table;
