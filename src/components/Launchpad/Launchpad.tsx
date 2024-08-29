"use client";

import { contractAddress, launchPadABI } from "@/lib/constants";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { parseEther } from "viem";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import Layout from "../Shared/Layout";
import Checkbox from "../form/checkbox";
import Input from "../form/input";
import Upload from "../form/upload";

const Launchpad = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [maxSupplyFlag, setMaxSupplyFlag] = useState(false);
  const [supply, setSupply] = useState("0");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
  const { address } = useAccount();

  const { data, writeContractAsync, status, isError } = useWriteContract();
  const {
    isSuccess,
    status: isValid,
    isError: isTxError,
  } = useWaitForTransactionReceipt({
    hash: data,
  });

  const uploadFile = async (fileToUpload: File) => {
    try {
      setIsImageUploading(true);
      const data = new FormData();
      data.append("file", fileToUpload);
      const response = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const resData = await response.json();
      console.log("img", resData);

      setImageUrl(
        `${process.env.NEXT_PUBLIC_GATEWAY_URL}${resData.IpfsHash}?pinataGatewayToken=${process.env.NEXT_PUBLIC_GATEWAY_TOKEN}`,
      );
    } catch (e) {
      console.log(e);
      toast.error("Failed to upload image, please try again later.", {
        icon: "🚧",
        style: {
          borderRadius: "10px",
        },
      });
    } finally {
      setIsImageUploading(false);
    }
  };

  const handleCreateMembership = async () => {
    setIsLoading(true);
    try {
      const metadata = {
        name: name,
        description: description,
        image: imageUrl,
      };

      const apiResponse = await fetch("/api/json", {
        method: "POST",
        body: JSON.stringify(metadata),
      });

      const resData = await apiResponse.json();

      console.log("resData", resData);

      await writeContractAsync({
        account: address,
        address: contractAddress,
        abi: launchPadABI,
        functionName: "createNFT",
        args: [
          `${process.env.NEXT_PUBLIC_GATEWAY_URL}${resData.IpfsHash}?pinataGatewayToken=${process.env.NEXT_PUBLIC_GATEWAY_TOKEN}`,
          supply,
          maxSupplyFlag,
          parseEther(price.toString()),
          address,
        ],
      });
    } catch (e) {
      toast.error("Failed to upload image, please try again later.", {
        icon: "🚧",
        style: {
          borderRadius: "10px",
        },
      });
    }
  };

  useEffect(() => {
    if (status === "success" && isSuccess && isValid === "success") {
      setIsLoading(false);
      toast.success("Membership Created Successfully", {
        style: {
          borderRadius: "10px",
        },
      });
    } else if (isError && isTxError) {
      setIsLoading(false);
      toast.error("Something went wrong", {
        style: {
          borderRadius: "10px",
        },
      });
    }
  }, [status, isSuccess, isTxError, isError, isValid]);

  return (
    <Layout>
      <div className="flex flex-col space-y-8 justify-center items-center max-w-[800px] mx-auto pb-10 lg:pl-0">
        <div className="flex items-center w-[90%] md:w-full bg-gradient-to-r from-[#FFDC9A] to-[#FFBFAB] rounded-[30px] overflow-hidden shadow-lg">
          <div className="hidden md:flex mx-auto justify-center ml-5">
            <Image src="/images/nft.png" width="150" height="150" alt="Icon" />
          </div>
          <div className="px-10 py-8 text-[#131619] text-right">
            <div className="font-bold text-xl mb-2">NFT Memberships</div>
            <div className="font-bold text-md mb-2 text-gray-800">
              Monetize your community memberships to grant access and benefits.
              Specially designed for DAOs and guilds.
            </div>
          </div>
        </div>
        <form className="flex flex-col space-y-4 w-[90%] md:max-w-[600px] mx-auto">
          <Image
            className="mx-auto w-[14rem] h-[14rem] bg-gradient-to-tr from-[#ADE1FF] to-sky-400 rounded-lg object-fill"
            src={image ? image : "/images/preview.png"}
            alt="preview"
            width={200}
            height={200}
          />
          <div className="mx-auto">
            <Upload
              id="image"
              name="image"
              type="file"
              label="Upload Image"
              accept="image/*"
              onChange={async (e) => {
                const image = URL.createObjectURL(e.target.files[0]);
                setImage(image);
                await uploadFile(e.target.files[0]);
              }}
            />
          </div>
          <Input
            id="name"
            name="name"
            label="Name"
            type="text"
            placeholder="Azuki Elemental"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            value={name}
            helper="This Can Be Your DAO Name or Special Access Collection"
          />
          <Input
            id="description"
            name="description"
            label="Description"
            type="text"
            placeholder="Azuki Elemental is a collection of 10,000 unique NFTs."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDescription(e.target.value)
            }
            value={description}
            helper="Write Something About This NFT or Features"
          />
          <Checkbox
            name="supply"
            id="supply"
            label="Set Max Supply"
            onChange={() => {
              setMaxSupplyFlag(!maxSupplyFlag);
            }}
          />
          {maxSupplyFlag && (
            <Input
              id="supply"
              name="supply"
              label="Max Supply"
              type="number"
              value={supply}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSupply(e.target.value)
              }
              helper="Recommended Max Supply - 100 Tokens."
            />
          )}
          <Input
            id="price"
            name="price"
            label="Price"
            type="number"
            value={price}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPrice(e.target.value)
            }
            helper="Recommend initial NFT Price - 0.01 ETH, No 'ETH' Symbol Required."
          />
          <button
            onClick={async (e) => {
              e.preventDefault();
              if (!address) {
                toast.error("Please connect your wallet", {
                  icon: "🔗",
                  style: {
                    borderRadius: "10px",
                  },
                });
                return;
              }
              if (name && description && price && imageUrl) {
                await handleCreateMembership();
              } else {
                toast("Please fill all the fields", {
                  icon: "🚧",
                  style: {
                    borderRadius: "10px",
                  },
                });
              }
            }}
            className="mx-auto min-w-[50%] max-w-[90%] bg-cyan-400 dark:text-neutral-800 items-center justify-center focus:ring-1 focus:outline-none focus:ring-[#cfcfcf] font-medium rounded-lg px-5 py-2.5 text-center disabled:opacity-75 disabled:cursor-progress"
            disabled={isImageUploading || isLoading}
          >
            {isImageUploading
              ? "Uploading Image..."
              : isLoading
                ? "Drafting membership..."
                : "Create Membership 🚀"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Launchpad;
