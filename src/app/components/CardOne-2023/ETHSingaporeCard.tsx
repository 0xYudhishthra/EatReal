"use client";
import React, { useState, useRef } from "react";
import Cards from "../Cards";
import PersonCard from "../PersonCard";
import {
  useStorageUpload,
  useContractRead,
  useContractWrite,
  MediaRenderer,
  Web3Button,
} from "@thirdweb-dev/react";
import {
  connectToERC6551Account,
  useERC6551Account,
} from "../ContractInteractions";

const ETHSingaporeCard: React.FC<{
  onNavigate: (
    page: "LandingPage" | "CardOne" | "CardTwo" | "ETHSingaporeCard"
  ) => void;
}> = ({ onNavigate }) => {
  const { contract: ERC6551Account } = connectToERC6551Account(
    "0x1801C13fB7291BD8Ba793f786C75EC2bDbd4f635"
  );

  const { data, isLoading, error } = useContractRead(
    ERC6551Account,
    "getEventPictures"
  );

  console.log(data);

  const { mutateAsync: uploadToBlockchain } = useContractWrite(
    ERC6551Account,
    "createEventPicture"
  );

  const [uploadedImageUri, setUploadedImageUri] = useState("");
  const [isUploading, setIsUploading] = useState(false); // State to indicate if the image is being uploaded
  const [imagePreview, setImagePreview] = useState(""); // State for the image preview URL

  // Create a ref for the file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync: uploadToIPFS } = useStorageUpload({
    uploadWithoutDirectory: true,
    onProgress: (progress) => {
      console.log(progress);
    },
  });

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true); // Indicate that upload is in progress

    try {
      const uris = await uploadToIPFS({ data: [file] });
      console.log("Uploaded file URI:", uris[0]);
      setUploadedImageUri(uris[0]);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsUploading(false); // Reset upload state
    }
  };

  return (
    <div>
      <div>
        <button
          className="bg-[#4681f4] p-1 pr-3 rounded-2xl mt-5 ml-5 mb-5 flex items-center hover:bg-[#5659ff] ease-in-out duration-300"
          onClick={() => onNavigate("CardOne")}
        >
          <img src="/back.png" alt="Back" className="h-10 w-10" />
          Back
        </button>
      </div>
      <div className="flex items-center justify-center mt-10 z-1">
        <Cards
          year={2023}
          eventsCount={0}
          title="ETH Singapore"
          poweredBy="powered by ERC-6551"
          onNavigate={() => onNavigate("CardOne")}
          image="/hello.jpg" // Update with the path to your first image
        />
      </div>
      <div className="flex items-center justify-center mt-36 ">
        <div className="text-3xl text-white font-bold">Connections</div>
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
              <div className="border-2 border-white rounded-full w-[400px] h-[400px] flex items-center justify-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
                <span className="text-white text-lg">My Connections</span>
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
      <div className="grid grid-cols-5 gap-10 mx-20 mt-10 mb-10">
        {/* Render the event pictures */}
        {data &&
          data.map(
            (
              uri: string | null | undefined,
              index: React.Key | null | undefined
            ) => (
              <div key={index} className="flex flex-col items-center">
                <MediaRenderer
                  src={"ipfs://" + uri}
                  className="rounded-full"
                  height="40"
                  width="40"
                />
              </div>
            )
          )}

        {/* Section to upload picture */}
        <div className="flex flex-col items-center">
          {isUploading && imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover"
            />
          )}
          {!uploadedImageUri && (
            <>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-white font-semibold mt-2"
              >
                Upload Picture
              </button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </>
          )}
          {uploadedImageUri && (
            <Web3Button
              contractAddress={ERC6551Account?.getAddress() || ""}
              contractAbi={ERC6551Account?.abi}
              action={() => uploadToBlockchain({ args: [uploadedImageUri] })}
              className="text-white font-semibold mt-2"
              onSubmit={() => console.log("Transaction submitted")}
              onSuccess={(result) => console.log(result)}
              onError={(error) => console.log(error)}
            >
              Submit to Blockchain
            </Web3Button>
          )}
          {isUploading && <p>Uploading...</p>}
        </div>
      </div>
    </div>
  );
};

export default ETHSingaporeCard;
