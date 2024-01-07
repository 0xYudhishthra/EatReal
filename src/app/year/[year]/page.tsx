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
import {
  useNomad3,
  useNomad3Drops,
} from "../../components/ContractInteractions";
import { ethers, BigNumber } from "ethers";
import { QrReader } from "react-qr-reader";

const ExpendCard: React.FC<{
  params: { year: string };
}> = ({ params }) => {
  const address = useAddress();
  const [isAnimationEnabled, setAnimationEnabled] = useState(false);
  const router = useRouter();
  const [eventId, setEventId] = useState<BigNumber>(BigNumber.from(0));
  const [eventsData, setEventsData] = useState<[]>([]);
  const [showScanner, setShowScanner] = useState(false);
  const [buttonText, setButtonText] = useState(
    "Scan QR Code to fetch Event ID"
  );

  const { contract: Nomad3 } = useNomad3();
  const { contract: Nomad3Drops } = useNomad3Drops();

  const {
    mutateAsync: mutateAsyncMintNFT,
    isLoading: isMintingNFT,
    error: mintNFTError,
  } = useContractWrite(Nomad3Drops, "mintNFT");

  const { data, isLoading, error } = useContractRead(
    Nomad3,
    "getEvents",
    [params.year],
    {
      from: address,
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setEventsData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    if (data) {
      console.log(data);
    }
  }, [data]);

  useEffect(() => {
    // Enable animation after component is mounted
    setAnimationEnabled(true);

    if (videoRef.current) {
      videoRef.current.playbackRate = 0.85;
    }

    if (!address) {
      router.push("/"); // Redirect to the homepage if not connected
    }
  }, [address, router]);

  const videoRef = useRef<HTMLVideoElement>(null);

  // This function is now responsible for starting the QR scan process.
  const handleStartScan = () => {
    setShowScanner(true); // Open the QR code scanner
  };

  // Combine handleQrResult and sendTransaction into one function
  const processEventAndSendTransaction = async (scannedResult: any) => {
    if (scannedResult) {
      // Parse the result
      const scannedEventId = ethers.BigNumber.from(
        parseInt(scannedResult.getText())
      );
      setEventId(scannedEventId);

      try {
        // Start transaction immediately after scanning
        const tx = await mutateAsyncMintNFT({ args: [scannedEventId] });
        setButtonText(
          "Transaction successful - check your console for tx hash"
        );
      } catch (error) {
        setButtonText(
          "Transaction failed - check your console for error message"
        );
      } finally {
        setShowScanner(false); // Close scanner after attempting transaction
      }
    }
  };

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
        <header className="header">
          <h1>Nomad3</h1>
          <p>Click here to see what&apos;s AFI is in your NFT</p>
          <ConnectWallet />
        </header>
        {showScanner && (
          <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50 bg-black bg-opacity-75">
            <div className="flex flex-col items-center">
              <p className="text-lg font-semibold mb-4 text-white">
                {isMintingNFT
                  ? "Processing..."
                  : "Show your unique Nomad3 Drops Event ID"}
              </p>
              <div className="bg-white p-2 rounded-lg shadow-lg">
                <QrReader
                  onResult={(result, error) => {
                    if (result != undefined) {
                      processEventAndSendTransaction(result);
                    }

                    if (error) {
                      console.error(error);
                    }
                  }}
                  constraints={{ facingMode: "user" }}
                  containerStyle={{ width: "300px", height: "300px" }}
                  videoStyle={{ width: "100%", height: "100%" }}
                />
              </div>
              {/* cancel button */}
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => setShowScanner(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4">
          <div className="md:col-span-4 md:col-start-3 lg:col-start-3 xl:col-start-3">
            <Cards
              year={params.year}
              eventsCount={32}
              title="The 'Degen'"
              poweredBy="powered by ERC-6551"
              onNavigate={() => router.push("/")}
              image="/hello.jpg"
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
        action={() => handleStartScan()}
        onSubmit={() => console.log("Transaction submitted")}
        isDisabled={isMintingNFT}
        className="ml-8"
      >
        {buttonText}
      </Web3Button>
    </div>
  );
};

export default ExpendCard;
