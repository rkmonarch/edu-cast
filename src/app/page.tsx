import GradientButton from "@/components/Shared/GradientButton";
import { integrations, networks, walletIntegrations } from "@/lib/constants";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Edupad",
  description: "Token launchpad",
  icons: "/edupad.png",
};

export default function Home() {
  return (
    <main className="bg-[#060d30] opacity-90">
      <div className="bg-[url('/svgs/grid.svg')] bg-no-repeat bg-cover bg-center">
        <div className="px-4 lg:px-0 mx-auto max-w-[1080px] flex justify-center flex-col min-h-[100vh]">
          <div className="flex justify-center flex-row">
            <div className="flex flex-col justify-between text-center h-[90vh] py-10 md:py-32">
              <div className="flex flex-col gap-10">
                <span className="flex items-center gap-6 mx-auto">
                  <Image
                    src="/edupad.svg"
                    width="60"
                    height="60"
                    className=""
                    alt="Edupad"
                  />
                  <h1 className="text-7xl sm:text-[5.5rem] font-bold">
                    Edupad
                  </h1>
                </span>
                <span className="text-2xl italic font-medium text-cyan-300">
                  powered by EDUCHAIN
                </span>
              </div>
              <div className="text-4xl tracking-tight font-semibold text-amber-200 mt-[2rem] sm:text-5xl md:text-6xl lg:px-4 space-y-5">
                <h2>Supercharge Community</h2>
                <h2>Growth & Engagement</h2>
                <h3 className="block tracking-wide text-neutral-200 font-medium text-2xl lg:px-32">
                  Leading protocols trust our no-code tools for Airdrop and
                  ERC1155
                </h3>
              </div>
              <div className="mt-10">
                <GradientButton href="/dashboard" label="Get started" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 lg:px-0 mx-auto max-w-[1080px] flex justify-center flex-col min-h-[80vh] bg-[url('/images/arc.png')] bg-no-repeat bg-contain bg-center">
        <div className="flex justify-center flex-row">
          <div className="flex flex-col justify-center text-center h-[80vh] py-32 lg:px-32 space-y-20">
            <h2 className="text-4xl font-semibold text-white sm:text-5xl md:text-6xl mb-5">
              Empower your Community <br /> with Superpowers
            </h2>
            <h3 className="text-sky-200 leading-relaxed font-medium text-2xl lg:px-32">
              Share claimable link to whitelisted address and track your mint
              counts on dashboard
            </h3>
          </div>
        </div>
      </div>
      <div className="lg:px-0 mx-auto flex justify-center flex-col min-h-[60vh] space-y-4">
        <div className="flex justify-center text-[#E4E4ED] space-y-4 md:space-y-0 md:space-x-4 flex-col md:flex-row">
          <div className="bg-black/50 w-full md:w-2/3 rounded-r-xl p-r-10 flex flex-col items-center justify-center text-center lg:text-left">
            <div className="flex flex-col space-y-3 lg:space-y-0 lg:flex-row items-center space-x-5 md:space-x-2 lg:space-x-5 max-w-[720px]">
              {networks.map((network, index) => (
                <div
                  key={index}
                  className="bg-sky-100 w-[60px] h-[60px] flex items-center justify-center object-fit rounded-full"
                >
                  <Image
                    src={network.logo}
                    width="60"
                    height="60"
                    alt={network.chain}
                  />
                </div>
              ))}
              <div>
                <p className="text-sm text-teal-400">COMPATIBLE</p>
                <p className="text-4xl font-medium">Network</p>
              </div>
            </div>
          </div>
          <div className="bg-black/50 w-full md:w-1/3 rounded-l-xl p-12 flex flex-col items-center md:items-start justify-center text-center lg:text-left">
            <div className="flex flex-col space-y-3 lg:space-y-0 lg:flex-row items-center space-x-5 md:space-x-2 lg:space-x-5 max-w-[720px]">
              <div className="bg-neutral-100 w-[60px] h-[60px] flex items-center justify-center p-[4px] overflow-hidden rounded-full">
                <Image
                  src="/svgs/battleTested.svg"
                  width="60"
                  height="60"
                  alt="icon"
                />
              </div>
              <div>
                <p className="text-sm text-teal-400">BATTLE TESTED</p>
                <p className="text-4xl font-medium">Smart Contracts</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center text-[#E4E4ED] space-y-4 md:space-y-0 md:space-x-4 flex-col md:flex-row">
          <div className="bg-black/50 w-full md:w-1/3 rounded-r-xl p-r-10 p-12 flex flex-col justify-center items-center text-center space-y-4">
            <div className="flex items-center space-x-3 max-w-[360px] w-full">
              <div className="w-full">
                <p className="text-sm text-teal-400">POWERFUL</p>
                <p className="text-4xl font-medium">Integrations</p>
              </div>
            </div>
            <div className="flex space-x-2">
              {integrations.map((integration, index) => (
                <div
                  key={index}
                  className="bg-sky-100 w-[60px] h-[60px] flex items-center justify-center object-fit rounded-full"
                >
                  <Image
                    src={integration.logo}
                    width="60"
                    height="60"
                    alt={integration.name}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="bg-black/50 w-full md:w-2/3 rounded-l-xl p-l-10 p-12 flex flex-col items-start justify-center">
            <div className="flex items-center space-x-5 max-w-[720px]">
              <div>
                <p className="text-sm text-teal-400">COMPATIBLE WITH YOUR</p>
                <p className="text-4xl font-medium">Trusted Wallets</p>
              </div>
              <div className="flex space-x-4">
                {walletIntegrations.map((walletIntegration, index) => (
                  <div
                    key={index}
                    className="bg-sky-100 w-[60px] h-[60px] flex items-center justify-center object-fit overflow-hidden rounded-full"
                  >
                    <Image
                      src={walletIntegration.logo}
                      width="60"
                      height="60"
                      alt={walletIntegration.name}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[url('/images/boxgrid.png')] bg-top bg-cover bg-fixed">
        <div className="px-4 lg:px-0 mx-auto max-w-[1080px] flex justify-center flex-col min-h-[70vh]">
          <div className="flex justify-center flex-row">
            <div className="flex flex-col justify-center items-center text-center h-[70vh] py-32 lg:px-32 space-y-20">
              <h2 className="text-4xl font-semibold text-amber-50 sm:text-5xl">
                Grow Your Community <br /> Today With Us
              </h2>
              <GradientButton label="Try now!" href="/dashboard" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
