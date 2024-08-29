import { launchPadNFTABI } from "@/lib/constants";
import { ethers } from "ethers";

const airdrop = async (contractAddress: string, walletAddresses: string[]) => {
  let txs: string[] = [];
  const provider = new ethers.providers.JsonRpcProvider(
    "https://rpc.open-campus-codex.gelato.digital",
  );
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);
  console.log("wallet:", wallet);
  try {
    const contract = new ethers.Contract(
      contractAddress,
      launchPadNFTABI,
      wallet,
    );

    const nftPrice = await contract.nftPrice();

    console.log("nftPrice:", nftPrice);

    let baseNonce = provider.getTransactionCount(wallet.getAddress());
    let nonceOffset = 0;
    const getNonce = () => {
      return baseNonce.then((nonce) => nonce + nonceOffset++);
    };

    const airdropPromises = walletAddresses.map(async (addr: string) => {
      const nonce = getNonce();
      const tx = await contract.airdropNft(addr, { nonce }); // Await the airdropNft transaction

      console.log("tx:", tx);
      await tx.wait();
      txs.push(tx);
      console.log("tx hash:", tx.hash);
    });

    await Promise.all(airdropPromises);

    console.log("Airdrop successful");
    return txs;
  } catch (e) {
    console.log(e);
  }
};

export default airdrop;
