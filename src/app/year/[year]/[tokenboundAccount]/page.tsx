"use client";
import React, { useState, useEffect } from "react";
import Cards from "../../../components/Cards";
import PersonCard from "../../../components/PersonCard";
import { useRouter } from "next/navigation";
import { useAddress } from "@thirdweb-dev/react";
import { useStorageUpload } from '@thirdweb-dev/react';
import { QrReader } from 'react-qr-reader';
import { ethers, BigNumber } from "ethers";


const EventExtendCard: React.FC<{
  params: { tokenboundAccount: string };
}> = ({ params }) => {
  const router = useRouter();
  const address = useAddress();
  const [imageUri, setImageUri] = useState("");
  const { mutateAsync: upload } = useStorageUpload();
  const [ scanqrcode, setScanqrcode ] = useState(false);
  const [buttonText, setButtonText] = useState(
    "Scan QR Code to get Connection Address"
  );
const { mutateAsync: uploadToIpfs } = useStorageUpload();

  
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


  const handleImageUpload = async (event) => {
    const file = event.target.files[0]; // Get the file from the event
    if (file) {
      try {
        // Upload the file to IPFS
        console.log(file)
        const uris = await uploadToIpfs({ data: [file] });
        setImageUri(uris[0]); // Set the IPFS URI in state to display the image
        alert('Image uploaded to IPFS successfully!');
      } catch (error) {
        console.error('Error uploading image to IPFS:', error);
        alert('Error uploading image to IPFS.');
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
          <img src="/back.png" alt="Back" className="h-10 w-10" />
          Back
        </button>
      </div>
      <div className="flex justify-center items-center mt-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={scanqrcode} // Disable during QR code scan
          className="file:mr-4 file:py-2 file:px-4
                     file:rounded file:border-0
                     file:text-sm file:font-semibold
                     file:bg-violet-50 file:text-violet-700
                     hover:file:bg-violet-100
                     "
        />
        {imageUri && (
          <div className="mt-4">
            <p>Image uploaded to IPFS:</p>
            <img src={imageUri} alt="Uploaded to IPFS" className="h-40 w-40 rounded-full" />
          </div>
        )}
      </div>
      <div className="flex items-center justify-center mt-10 z-1">
        <Cards
          year={"2023"}
          eventsCount={0}
          title={params.tokenboundAccount}
          poweredBy="powered by ERC-6551"
          onNavigate={() => router.back()}
          image="/PlaceA.jpg" // Update with the path to your first image
        />
      </div>
      <div className="flex items-center justify-center mt-36 ">
        <div className="text-3xl text-white font-bold">Connections</div>
      </div>
      {/* Scan connection qr  */}
      <div className="flex items-center justify-center mt-12">
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-lg  "
          onClick={handleScanConnection}>
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
      <div className="flex justify-between mt-28 mx-40 z-20">
        <PersonCard
          name={"Cody"}
          title="ETH Singapore"
          image="/hello.jpg" // Update with the path to your first image
          notes="Notes: I met him at the Viction event. He's the Project Manager of the Viction team."
        />
        <PersonCard
          name={"Victoria Mitchell"}
          title="ETH Singapore"
          image="/hello.jpg" // Update with the path to your first image
          notes="Notes: I met Victoria at the Viction event. He's the Project Manager of the Viction team."
        />
      </div>
      <div className="flex justify-center items-center h-screen bg-black z-10">
        <div className="absolute border-2 border-white rounded-full w-[1000px] h-[1000px] flex items-center justify-center">
          {/* Outermost Circle */}
          <div className="absolute border-2 border-white rounded-full w-[800px] h-[800px] flex items-center justify-center">
            {/* Middle Circle */}
            <div className="absolute border-2 border-white rounded-full w-[600px] h-[600px] flex items-center justify-center">
              {/* Innermost Circle */}
              <div className="border-2 border-white rounded-full w-[400px] h-[400px] flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
                <span className="text-white text-lg mb-4">My Connections</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between mx-40">
        <PersonCard
          name={"Cody"}
          title="ETH Singapore"
          image="/hello.jpg" // Update with the path to your first image
          notes="Notes: I met him at the Viction event. He's the Project Manager of the Viction team."
        />
        <PersonCard
          name={"Victoria Mitchell"}
          title="ETH Singapore"
          image="/hello.jpg" // Update with the path to your first image
          notes="Notes: I met Victoria at the Viction event. He's the Project Manager of the Viction team."
        />
      </div>
    
     
      <div className="mt-20 flex justify-center font-semibold text-2xl">
        Momentos
      </div>
      <div className="grid grid-cols-5 gap-10 mx-20 mt-10">
        <div className="flex flex-col items-center">
          <img src="/hello.jpg" alt="Back" className="h-40 w-40 rounded-full" />
          <div className="text-white font-semibold mt-2">Viction Event</div>
        </div>
        <div className="flex flex-col items-center">
          <img src="/hello.jpg" alt="Back" className="h-40 w-40 rounded-full" />
          <div className="text-white font-semibold mt-2">Viction Event</div>
        </div>
        <div className="flex flex-col items-center">
          <img src="/hello.jpg" alt="Back" className="h-40 w-40 rounded-full" />
          <div className="text-white font-semibold mt-2">Viction Event</div>
        </div>
        <div className="flex flex-col items-center">
          <img src="/hello.jpg" alt="Back" className="h-40 w-40 rounded-full" />
          <div className="text-white font-semibold mt-2">Viction Event</div>
        </div>
        <div className="flex flex-col items-center">
          <img src="/hello.jpg" alt="Back" className="h-40 w-40 rounded-full" />
          <div className="text-white font-semibold mt-2">Viction Event</div>
        </div>
        <div className="flex flex-col items-center">
          <img src="/hello.jpg" alt="Back" className="h-40 w-40 rounded-full" />
          <div className="text-white font-semibold mt-2">Viction Event</div>
        </div>
        <div className="flex flex-col items-center">
          <img src="/hello.jpg" alt="Back" className="h-40 w-40 rounded-full" />
          <div className="text-white font-semibold mt-2">Viction Event</div>
        </div>
        <div className="flex flex-col items-center">
          <img src="/hello.jpg" alt="Back" className="h-40 w-40 rounded-full" />
          <div className="text-white font-semibold mt-2">Viction Event</div>
        </div>
        <div className="flex flex-col items-center">
          <img src="/hello.jpg" alt="Back" className="h-40 w-40 rounded-full" />
          <div className="text-white font-semibold mt-2">Viction Event</div>
        </div>
        <div className="flex flex-col items-center">
          <img src="/hello.jpg" alt="Back" className="h-40 w-40 rounded-full" />
          <div className="text-white font-semibold mt-2">Viction Event</div>
        </div>
      </div>
    </div>
  );
};

export default EventExtendCard;
