"use client";
import React, { useState, useEffect } from "react";
import Cards from "../../../components/Cards";
import PersonCard from "../../../components/PersonCard";
import { useRouter } from "next/navigation";
import { useAddress } from "@thirdweb-dev/react";
import { useStorageUpload } from "@thirdweb-dev/react";

const EventExtendCard: React.FC<{
  params: { tokenboundAccount: string };
}> = ({ params }) => {
  const router = useRouter();
  const address = useAddress();
  const [imageUri, setImageUri] = useState("");
  const { mutateAsync: upload } = useStorageUpload();

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

  const uploadData = async (file: any) => {
    try {
      // This uploads the file and returns the URI
      const uris = await upload({ data: file });
      console.log("File uploaded:", uris);
      setImageUri(uris[0]); // Assuming the API returns an array of URIs
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  // Function to handle the file input change event
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      await uploadData(file);
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
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="text-white"
                />
                {imageUri && <img src={imageUri} alt="Uploaded" />}
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
