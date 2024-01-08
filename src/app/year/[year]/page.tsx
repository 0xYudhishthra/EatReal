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
  useERC6551Account,
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
  const [tokenboundAddress, setTokenboundAddress] = useState("");
  const [tokenId, setTokenId] = useState<BigNumber>(BigNumber.from(0));
  const [metadata, setMetadata] = useState<any>();

  const { contract: Nomad3 } = useNomad3();
  const { contract: Nomad3Drops } = useNomad3Drops();
  const { contract: ERC6551Account } = useERC6551Account(tokenboundAddress);

  let {
    mutateAsync: mutateAsyncMintNFT,
    isLoading: isMintingNFT,
    error: mintNFTError,
  } = useContractWrite(Nomad3Drops, "mintNFT");

  const cardHeight = 120; // The height of one EventCard (in pixels)
  const containerHeight = cardHeight * 3; // Show 3 cards at a time
  const {
    mutateAsync: mutateAsyncCreateEvent,
    isLoading: isCreatingEvent,
    error: createEventError,
  } = useContractWrite(ERC6551Account, "callCreateEventOnNomad3");

  const {
    data: eventData,
    isLoading: isEventLoading,
    error: eventError,
  } = useContractRead(Nomad3, "getEvents", [params.year], {
    from: address,
  });

  //iterate through each event and get the event name and date
  for (let i = 0; i < eventData?.length; i++) {
    const event = eventData[i];
    const eventName = event[1];
    const eventDate = event[2];
    const tokenboundAddress = event[5];
    console.log(
      eventName,
      BigNumber.from(eventDate).toString(),
      tokenboundAddress
    );
  }

  const {
    data: tokenIdData,
    isLoading: isTokenIdLoading,
    error: tokenIdError,
  } = useContractRead(ERC6551Account, "token");

  const {
    data: tokenURIData,
    isLoading: isTokenURILoading,
    error: tokenURIError,
  } = useContractRead(Nomad3Drops, "tokenURI", [tokenId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setEventsData(eventData);
        setTokenboundAddress(tokenboundAddress);
        setTokenId(tokenId);
        setMetadata(metadata);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [eventData, tokenboundAddress, tokenId, metadata]);

  // Call the function in an effect or another async function
  useEffect(() => {
    if (tokenURIData) {
      fetchEventMetadata().then((metadata) => {
        setMetadata(metadata); // Update the state with the fetched metadata
      });
    }
  }, [tokenURIData]); // Depend on tokenURIData

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

  //Function that fetches the event metadata based on the event id
  //currently its, Qmdm2jUV9odWZtCj5hsS2pbpGz7ZuDAhEZWWC1ninagDxc/VictionHackathon.json/26, im only interested in everythng but "/26"
  const fetchEventMetadata = async () => {
    try {
      const ipfsHash = tokenURIData?.slice(0, -3);
      if (ipfsHash) {
        const data = await fetch(`https://ipfs.io/ipfs/${ipfsHash}`);
        const json = await data.json();
        console.log("Metadata:", json); // Log the metadata
        return json; // Return the JSON data
      }
    } catch (error) {
      console.error("Error fetching metadata:", error);
    }
  };

  // This function is now responsible for starting the QR scan process.
  const handleStartScan = () => {
    setShowScanner(true); // Open the QR code scanner
  };

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
          args: [scannedEventId],
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
            {" "}
            {/* Adjust the margin-right to bring it closer */}
            <Cards
              year={params.year}
              eventsCount={32}
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
            {Array.from({ length: 10 }).map((_, index) => (
              <div className="mb-4 last:mb-0" key={index}>
                {" "}
                {/* This adds a bottom margin to each card except the last one */}
                <EventCard
                  title={`Event ${index}`}
                  connection={`Connections: ${index * 3}`} // Example data
                  onNavigate={() =>
                    router.push(
                      `/year/${params.year}/0x75dFC61417A32224196ccE4e0CB2081CCFa843A2`
                    )
                  }
                  image={`/event_${index}.jpeg`}
                />
              </div>
            ))}
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
                metadata.eventName,
                metadata.eventDate,
                tokenIdData[2].toString(),
              ],
            })
          }
          onSuccess={(result) => {
            alert("Event created successfully with TBA!");
            window.open(
              `https://testnet.vicscan.xyz/tx/${result.receipt.transactionHash}`,
              "_blank"
            );
            isMintingNFT = false;
            setTokenboundAddress("");
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
  );
};

export default ExpendCard;
