"use client";
import React, { useState, useEffect } from "react";
import Cards from "../../../components/Cards";
import PersonCard from "../../../components/PersonCard";
import { useRouter } from "next/navigation";
import {
  ConnectWallet,
  useAddress,
  useContractRead,
  useContractWrite,
  MediaRenderer,
} from "@thirdweb-dev/react";
import { useERC6551Account } from "../../../components/ContractInteractions";
import { useStorageUpload } from "@thirdweb-dev/react";
import { QrReader } from "react-qr-reader";
import { ethers, BigNumber } from "ethers";
import Image from "next/image";


const EventExtendCard: React.FC<{
  params: { tokenboundAccount: string };
}> = ({ params }) => {
  const router = useRouter();
  const address = useAddress();
  const [imageUri, setImageUri] = useState("");
  const { mutateAsync: upload } = useStorageUpload();
  const [scanqrcode, setScanqrcode] = useState(false);
  const [buttonText, setButtonText] = useState(
    "Scan QR Code to get Connection Address"
  );
  const { contract: ERC6551Account } = useERC6551Account(
    params.tokenboundAccount
  );
  const { mutateAsync: uploadToIpfs } = useStorageUpload();
  let {
    mutateAsync: createEventPicture,
    isLoading: isCreatingEventPicture,
    error: createEventPictureError,
  } = useContractWrite(ERC6551Account, "createEventPicture");

  let {
    mutateAsync: createConnection,
    isLoading: isCreatingConnection,
    error: createConnectionError,
  } = useContractWrite(ERC6551Account, "createConnection");

  const {
    data: connections,
    isLoading: isConnectionsLoading,
    error: connectionsError,
  } = useContractRead(ERC6551Account, "getConnections");

  console.log("connections", connections);

  const {
    data: eventPictures,
    isLoading: isEventPicturesLoading,
    error: eventPicturesError,
  } = useContractRead(ERC6551Account, "getEventPictures");

  console.log("eventpictures", eventPictures);

  useEffect(() => {
    if (!address) {
      router.push("/"); // Redirect to the homepage if not connected
    }
  }, [address, router]);

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

  // handle scan connection button
  const handleScanConnection = () => {
    setScanqrcode(true);
  };
  // Combine handleQrResult and sendTransaction into one function
  const processConnectionAndSendTransaction = async (scannedResult: any) => {
    if (scannedResult) {
      // Parse the result
      const scannedConnectionAdd = ethers.BigNumber.from(
        parseInt(scannedResult.getText())
      );
      setScanqrcode(scanqrcode);

      const tx = await createConnection({
        // args: [personName, personWalletAddress, personPP], //this is supposed to be the content of the qr code
      });
      console.log(tx.receipt.transactionHash); //if you get this, means the tx succedd

      try {
        // Start transaction immediately after scanning
        const tx = await scannedConnectionAdd;
        setButtonText(
          "Transaction successful - check your console for tx hash"
        );
      } catch (error) {
        setButtonText(
          "Transaction failed - check your console for error message"
        );
      } finally {
        setScanqrcode(false); // Close scanner after attempting transaction
      }
    }
  };

  const handleImageUpload = async (event: any) => {
    const file = event.target.files[0]; // Get the file from the event
    if (file) {
      try {
        // Upload the file to IPFS
        const uris = await uploadToIpfs({ data: [file] });
        setImageUri(uris[0]); // Set the IPFS URI in state to display the image

        alert("Image uploaded to IPFS successfully!");

        const tx = await createEventPicture({
          args: [uris[0]],
        });
        console.log(tx.receipt.transactionHash);
      } catch (error) {
        console.log("Error uploading image to IPFS:", error);
        alert("Error uploading image to IPFS.");
      }
    }
  };

  return (
    <div>
      <div>
        <button
          className="bg-[#4681f4] p-1 pr-3 rounded-2xl mt-5 ml-5 flex items-center hover:bg-[#5659ff] ease-in-out duration-300"
          onClick={() => router.back()}
        >
          <Image src="/back.png" alt="Back" height={10} width={10} />
          Back
        </button>
      </div>
      <div className="flex items-center justify-center mt-10">
        <Cards
          year={"2023"}
          eventsCount={0}
          title={params.tokenboundAccount}
          poweredBy="powered by ERC-6551"
          onNavigate={() => router.back()}
          image="/PlaceA.jpg" // Update with the path to your first image
        />
      </div>
      <div className="flex items-center justify-center mt-20 ">
        <div className="text-3xl text-white font-bold">Connections</div>
      </div>
      {/* Scan connection qr  */}

      <div className="flex justify-center items-center h-screen bg-black mt-80">
        <div className="relative flex items-center justify-center">
          {/* Outermost Circle */}
          <div className="border-2 border-white rounded-full absolute w-[1000px] h-[1000px]"></div>
          {/* Middle Circle */}
          <div className="border-2 border-white rounded-full absolute w-[800px] h-[800px]"></div>
          {/* Innermost Circle */}
          <div className="border-2 border-white rounded-full absolute w-[600px] h-[600px]"></div>
          {/* Center Content */}
          <div className="border-2 border-white rounded-full w-[400px] h-[400px] flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 to-emerald-500 z-10">
            <div className="flex items-center justify-center ">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-lg  "
                onClick={handleScanConnection}
              >
                Add Connection
              </button>
              {scanqrcode && (
                <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50 bg-black bg-opacity-75">
                  <QrReader
                    onResult={(result, error) => {
                      if (result != undefined) {
                        processConnectionAndSendTransaction(result);
                      }

                      if (error) {
                        console.error(error);
                      }
                    }}
                    constraints={{ facingMode: "user" }}
                    containerStyle={{ width: "300px", height: "300px" }}
                    videoStyle={{ width: "100%", height: "100%" }}
                  />

                  {/* cancel button */}
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                    onClick={() => setScanqrcode(false)}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* Person Cards */}
          <div className="absolute" style={{ top: "100%", left: "100%" }}>
          <div className="flex flex-col items-center justify-center p-6 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-96 h-96 relative hover:shadow-2xl hover:scale-110 transition-transform duration-300 ease-in-out">
              <div className="flex justify-center items-center">
                  <span className="block bg-gray-300 h-9 w-1"></span>
                  <span className="block bg-gray-300 w-9 h-1 absolute"></span>
              </div>
          </div>
          </div>
          <div className="absolute" style={{ top: "100%", right: "100%" }}>
          <div className="flex flex-col items-center justify-center p-6 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-96 h-96 relative hover:shadow-2xl hover:scale-110 transition-transform duration-300 ease-in-out">
              <div className="flex justify-center items-center">
                  <span className="block bg-gray-300 h-9 w-1"></span>
                  <span className="block bg-gray-300 w-9 h-1 absolute"></span>
              </div>
          </div>
          </div>
          <div className="relative">
            {/* {connections.map((person, index) => (
              <div key={index} className="absolute hover:shadow-2xl hover:scale-110 transition-transform duration-300 ease-in-out" style={{ bottom: "100%", [index % 2 === 0 ? 'left' : 'right']: "100%" }}>
                <PersonCard
                  name={person.name}
                  title={person.title}
                  image={person.image}
                  notes={person.notes}
                />
              </div>
            ))} */}
          </div>

        </div>
      </div>

      <div className="mt-60 flex justify-center font-bold text-2xl ">
        Momentos
      </div>

      <div className="grid grid-cols-5 gap-10 mx-20 mt-10">
        {eventPictures?.map((pictureHash: string, key: number) => (
          <div key={key}>
            <MediaRenderer
              className="h-40 w-40 rounded-full"
              src={pictureHash}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center w-full mt-20">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-black bg-opacity-50 hover:bg-opacity-60"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-white"
              aria-hidden="true"
              fill="none"
              viewBox="0 0 20 16"
            >
              {/* SVG content */}
            </svg>
            <p className="mb-2 text-sm text-white">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-white">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={scanqrcode}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
};

export default EventExtendCard;
