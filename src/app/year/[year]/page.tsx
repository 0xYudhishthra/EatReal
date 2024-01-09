"use client";

import React, { useState, useEffect, useRef } from "react";
import Cards from "../../components/Cards";
import EventCard from "../../components/EventCard";
import { useRouter } from "next/navigation";
import {
  ConnectWallet,
  useAddress,
  useContractRead,
  useContractWrite,
  Web3Button,
} from "@thirdweb-dev/react";
import {
  useNomad3,
  useNomad3Drops,
  useERC6551Account,
} from "../../components/ContractInteractions";
import { ethers, BigNumber } from "ethers";
import { QrReader } from "react-qr-reader";


const ExpendCard: React.FC<{
  params: { year: string };
}> = ({ params }) => {
  const address = useAddress();
  const router = useRouter();
  const [showScanner, setShowScanner] = useState(false);
  const [tokenboundAddress, setTokenboundAddress] = useState("");
  const [tokenId, setTokenId] = useState<BigNumber>(BigNumber.from(0));
  const [metadata, setMetadata] = useState<any>();
  const [eventId, setEventId] = useState<BigNumber>(BigNumber.from(0));

  const { contract: Nomad3 } = useNomad3();
  const { contract: Nomad3Drops } = useNomad3Drops();
  const { contract: ERC6551Account } = useERC6551Account(tokenboundAddress);

  const {
    mutateAsync: mutateAsyncMintNFT,
    isLoading: isMintingNFT,
    error: mintNFTError,
  } = useContractWrite(Nomad3Drops, "mintNFT");

  const {
    mutateAsync: mutateAsyncCreateEvent,
    isLoading: isCreatingEvent,
    error: createEventError,
  } = useContractWrite(ERC6551Account, "callCreateEventOnNomad3");

  const {
    data: eventData,
    isLoading: isEventLoading,
    error: eventError,
  } = useContractRead(Nomad3, "getEvents", [params.year], { from: address });

  const { data: eventCount } = useContractRead(
    Nomad3,
    "getEventCount",
    [params.year],
    { from: address }
  );

  const {
    data: tokenURIData,
    isLoading: isTokenURILoading,
    error: tokenURIError,
  } = useContractRead(Nomad3Drops, "tokenURI", [tokenId]);

  const videoRef = useRef<HTMLVideoElement>(null);

  const fetchEventMetadata = async () => {
    try {
      const ipfsHash = tokenURIData?.slice(0, -3);
      if (ipfsHash) {
        const response = await fetch(
          `https://${process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}.ipfscdn.io/ipfs/${ipfsHash}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        return json;
      }
    } catch (error) {
      console.error("Error fetching metadata:", error);
      return null;
    }
  };

  useEffect(() => {
    if (tokenURIData) {
      fetchEventMetadata().then((metadata) => {
        if (metadata) {
          setMetadata(metadata);
        }
      });
    }
  }, [tokenURIData]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.85;
    }
    if (!address) {
      router.push("/");
    }
  }, [address, router]);

  const handleStartScan = () => {
    setShowScanner(true);
  };

  const cardHeight = 120; // The height of one EventCard (in pixels)
  const containerHeight = cardHeight * 3; // Show 3 cards at a time

  // Combine handleQrResult and sendTransaction into one function
  const processEventAndSendTransaction = async (scannedResult: any) => {
    if (scannedResult) {
      setShowScanner(false); // Close scanner after attempting transaction

      // Parse the result
      const scannedEventId = ethers.BigNumber.from(
        parseInt(scannedResult.getText())
      );
      setEventId(scannedEventId);

      try {
        // first, get the tokenbound address after minting the nft
        const mintTx = await mutateAsyncMintNFT({
          args: [ethers.BigNumber.from(scannedEventId)],
        });

        //first log the fact that the nft was minted
        //open the transaction in a new tab
        if (mintTx.receipt.transactionHash) {
          alert(`NFT minted and Tokenbound Account deployed!`);

          const targetData = mintTx.receipt.logs[2].data;

          const tbaAddress = targetData.slice(-40); // Extract the last 40 characters
          const tokenId = targetData.substring(0, 66);
          setTokenboundAddress(`0x${tbaAddress}`);
          setTokenId(ethers.BigNumber.from(tokenId));
          setMetadata(metadata);

          window.open(
            `https://testnet.vicscan.xyz/tx/${mintTx.receipt.transactionHash}`,
            "_blank"
          );
        }
      } catch (error) {}
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
    <div className="relative flex min-h-screen flex-col">
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
    <div className="app">
      <div>
        <div className="flex justify-between ">
          <header className="header">
            <h1>Nomad3</h1>
            <p>Chaining your memories together.</p>
          </header>
          <div>
            <ConnectWallet />
          </div>
        </div>
        {showScanner && (
          <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50 bg-black bg-opacity-75">
            <div className="flex flex-col items-center">
              <p className="text-lg font-semibold mb-4 text-white">
                {isMintingNFT
                  ? status
                  : "Show your unique Nomad3 Drops Event ID"}
              </p>
              <div className="bg-white p- rounded-lg shadow-lg">
                <QrReader
                  onResult={(result, error) => {
                    if (result != undefined) {
                      processEventAndSendTransaction(result);
                      return;
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

        <div className="md:flex md:flex-row gap-4 p-4">
          {/* Main Card on the Left */}
          <div className="md:flex-grow md:mr-4">
            {/* Adjust the margin-right to bring it closer */}
            <Cards
              year={params.year}
              eventsCount={eventCount?.toNumber()}
              title="The 'Degen'"
              poweredBy="powered by ERC-6551"
              onNavigate={() => router.push("/")}
              image="/PlaceA.jpg"
            />
          </div>

          {/* Scrollable Event Cards Container on the Right */}
          <div
            className="md:flex-grow"
            style={{ height: `${containerHeight}px`, overflowY: "auto" }}
          >
            {/* Map through your EventCard data here */}
            {eventData?.map((event: any, index: number) => {
              const eventName = event[1];
              const eventDate = new Date(
                BigNumber.from(event[2]).toNumber() * 1000
              ).toLocaleDateString();
              const tokenboundAddress = event[5];

              return (
                <div className="mb-4 " key={index}>
                  <EventCard
                    EventName={eventName}
                    EventDate={eventDate}
                    TokenboundAccount={tokenboundAddress}
                    onNavigate={() =>
                      router.push(`/year/${params.year}/${tokenboundAddress}`)
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {!tokenboundAddress && (
        <Web3Button
          contractAddress={Nomad3Drops?.getAddress() || ""}
          contractAbi={Nomad3Drops?.abi}
          action={() => handleStartScan()}
          onError={(error) => console.log(error)}
          isDisabled={isMintingNFT}
          className="ml-8"
        >
          {isMintingNFT
            ? "Minting NFT and Deploying TBA..."
            : "Claim Nomad3 Drops Event NFT"}
        </Web3Button>
      )}
      {tokenboundAddress && (
        <Web3Button
          contractAddress={ERC6551Account?.getAddress() || ""}
          contractAbi={ERC6551Account?.abi}
          action={() =>
            mutateAsyncCreateEvent({
              args: [
                Nomad3?.getAddress(),
                params.year,
                metadata?.eventName,
                metadata?.eventDate,
                tokenId,
              ],
            })
          }
          onSuccess={(result) => {
            alert("Event created successfully with TBA!");
            window.open(
              `https://testnet.vicscan.xyz/tx/${result.receipt.transactionHash}`,
              "_blank"
            );
            router.push(`/year/${params.year}/${tokenboundAddress}`);
          }}
          onError={(error) => console.log(error)}
          isDisabled={isCreatingEvent}
          className="ml-8"
        >
          {isCreatingEvent
            ? "Creating Event..."
            : `Create Event with TBA ${tokenboundAddress}`}
        </Web3Button>
      )}
    </div>
    </div>
  );
};

export default ExpendCard;
