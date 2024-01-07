"use client";

import React, { useState, useEffect, useRef } from "react";
import Cards from "../../components/Cards";
import EventCard from "../../components/EventCard";
import { useRouter } from "next/navigation";
import {
  ConnectWallet,
  contractType,
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
  Web3Button,
} from "@thirdweb-dev/react";
import { useNomad3Drops } from "../../components/ContractInteractions";
import { ethers, BigNumber } from "ethers";

const ExpendCard: React.FC<{
  params: { year: string };
}> = ({ params }) => {
  const address = useAddress();
  const [isAnimationEnabled, setAnimationEnabled] = useState(false);
  const router = useRouter();
  const [inputValue, setInputValue] = useState<BigNumber>(BigNumber.from(0));

  useEffect(() => {
    // Enable animation after component is mounted
    setAnimationEnabled(true);
  }, []);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.85;
    }
  }, []);

  useEffect(() => {
    if (!address) {
      router.push("/"); // Redirect to the homepage if not connected
    }
  }, [address, router]);

  const { contract: Nomad3Drops } = useNomad3Drops();

  const {
    mutateAsync: mutateAsyncMintNFT,
    isLoading: isMintingNFT,
    error: mintNFTError,
  } = useContractWrite(Nomad3Drops, "mintNFT");

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = event.target.value;
  //   const intValue = /^\d+$/.test(value) ? parseInt(value, 10) : "";
  //   setInputValue(
  // };

  if (!address) {
    // Return null or a loading component if you want to show nothing or a loader while redirecting
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-3xl text-white font-bold">
          Wallet not connected, redirecting...
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          top: 0,
          left: 0,
          zIndex: "-1",
        }}
      >
        <source src="/Background.mp4" type="video/mp4" />
      </video>
      <div>
      <div className="flex justify-between">
            <header className="header">
              <h1>Nomad3</h1>
              <p>Click here to see what&apos;s AFI is in your NFT</p>
            </header>
            <div>
              <ConnectWallet />
            </div>
          </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4">
          <div className="md:col-span-4 md:col-start-3 lg:col-start-3 xl:col-start-3">
            <Cards
              year={params.year}
              eventsCount={32}
              title="The 'Degen'"
              poweredBy="powered by ERC-6551"
              onNavigate={() => router.push("/")}
              image="/PlaceA.jpg"
            />
          </div>

          <div className="relative pl-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 ">
              {/* First card */}
              <div
                className={`md:col-span-3 md:col-start-1 relative z-0 right-0 transform hover:right-20 duration-500 ease-in-out ${
                  isAnimationEnabled ? "opacity-100" : "opacity-0"
                }`}
              >
                <EventCard
                  title="ETH Singapore"
                  connection="Connetions: 5"
                  onNavigate={() =>
                    router.push(
                      `/year/${params.year}/0x75dFC61417A32224196ccE4e0CB2081CCFa843A2`
                    )
                  }
                  image="/1.jpeg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Web3Button
        contractAddress={Nomad3Drops?.getAddress() || ""}
        contractAbi={Nomad3Drops?.abi}
        action={() =>
          mutateAsyncMintNFT({
            args: [ethers.BigNumber.from(inputValue)],
          })
        }
        onSubmit={() => console.log("Transaction submitted")}
        onSuccess={(result) => console.log(result)}
        onError={(error) => console.log(error)}
        className="ml-8"
      >
        Send Transaction
      </Web3Button>
    </div>
  );
};

export default ExpendCard;
