"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ConnectWallet,
  useAddress,
  useContractRead,
  useContractWrite,
  Web3Button,
} from "@thirdweb-dev/react";
import Cards from "./components/Cards";
import { useNomad3 } from "./components/ContractInteractions";
import { ethers } from "ethers";
import { useRouter } from "next/navigation";
import QRCode from "react-qr-code";
import Image from "next/image";

const LandingPage = () => {
  const address = useAddress();
  const [inputValue, setInputValue] = useState<number | string>("");
  const [yearsData, setYearsData] = useState<
    { year: number; eventCount: number }[]
  >([]);
  const [yearToFetchIndex, setYearToFetchIndex] = useState(0);
  const [fetchInProgress, setFetchInProgress] = useState(false);
  const [year, setYear] = useState<number>(0);

  const { contract: Nomad3 } = useNomad3();
  const router = useRouter();

  // Fetch years from the contract
  const { data: years } = useContractRead(Nomad3, "getYears", [], {
    from: address,
  });

  // Effect to initiate fetch of event count for each year
  useEffect(() => {
    if (!fetchInProgress && years && yearToFetchIndex < years.length) {
      const yearBN = years[yearToFetchIndex];
      const yearNumber = parseInt(yearBN._hex, 16);
      if (!yearsData.some((yd) => yd.year === yearNumber)) {
        setYear(yearNumber);
        setFetchInProgress(true);
      } else {
        setYearToFetchIndex(yearToFetchIndex + 1);
      }
    }
  }, [years, yearToFetchIndex, fetchInProgress, yearsData]);

  // Fetch event count for the current year
  const { data: eventCount } = useContractRead(
    Nomad3,
    "getEventCount",
    [year],
    { from: address }
  );

  // Update yearsData when eventCount is fetched
  useEffect(() => {
    if (fetchInProgress && eventCount !== undefined) {
      const count = parseInt(eventCount._hex, 16);
      setYearsData((prevYearsData) => [
        ...prevYearsData,
        { year, eventCount: count },
      ]);
      setFetchInProgress(false);
      setYearToFetchIndex(yearToFetchIndex + 1);
    }
  }, [eventCount, yearToFetchIndex, year]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const intValue = /^\d+$/.test(value) ? parseInt(value, 10) : "";
    setInputValue(intValue);
  };

  /**
   * 3. by default, a `mutateAsync` function is returned, best practice is to rename this accordingly to the target contract function you are interacting with
   * can do something like this:
   * const { mutateAsync: 'THE_CONTRACT_FUNCTION_NAME_TO_USE', isLoading: createYearLoading, error: createYearError, } = useContractWrite(Nomad3, "createYear");
   * 'isLoading' and 'error' are optional, but recommended to use
   * 'Nomad3' is the contract object returned from step 2
   * 'createYear' is the contract function you want to interact with
   */
  const {
    mutateAsync,
    isLoading: createYearLoading,
    error: createYearError,
  } = useContractWrite(Nomad3, "createYear");

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.85;
    }
  }, []);

  //Qr code
  const [back, setBack] = useState("#FFFFFF");
  const [fore, setFore] = useState("#000000");
  const [showQr, setShowQr] = useState(false);

  const handleProfileClick = () => {
    // when i click on the profile button, it will change the state of showQr to true
    setShowQr(!showQr);
  };

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

      {address ? (
        <div className="app">
          <div className="flex justify-between">
            <header className="header">
              <h1>Nomad3</h1>
              <p>Chaining your memories together.</p>
            </header>
            <div className="grid grid-flow-col space-x-4 ">
              <div className=" z-10 flex justify-center place-items-start top-0 bottom-6">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-lg"
                  onClick={handleProfileClick}
                >
                  {showQr ? "Hide My QR Code" : "Show My QR Code"}
                </button>
                {showQr && (
                  <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50 bg-black bg-opacity-75">
                    <div className="p-4 bg-white rounded-lg">
                      <QRCode
                        value={address}
                        size={256}
                        bgColor={"#ffffff"}
                        fgColor={"#000000"}
                        level={"L"}
                      />
                      <button
                        className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded-lg"
                        onClick={handleProfileClick}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <ConnectWallet />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4">
            {yearsData &&
              yearsData.map((item, index) => (
                <div
                  key={index}
                  className="md:col-span-4 col-start-3 p-8 hover:shadow-2xl hover:scale-110 transition-transform duration-300 ease-in-out"
                >
                  <Cards
                    year={item.year.toString()}
                    eventsCount={parseInt(item.eventCount.toString())}
                    title={`The 'Degen' - Year ${item.year}`}
                    poweredBy="powered by ERC-6551"
                    onNavigate={() => router.push("/year/" + item.year)}
                    image="/PlaceA.jpg"
                  />
                </div>
              ))}
          </div>
          <div className="p-5">
            <input
              type="text"
              pattern="\d*"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter Year"
              className="justify-center flex-1 text-black mr-8 p-2 rounded border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-200 ease-in-out "
            />
            {/* 
            4. Web3Button is a component that handles the transaction for you
            - contractAddress: the contract address you are interacting with, get this from the contract object returned from step 2 using getAddress()
            - contractAbi: the contract abi you are interacting with, get this from the contract object returned from step 2 using abi
            - action: the contract function you are interacting with, get this from the useContractWrite hook returned from step 3
            - onSubmit: optional function to run when transaction is submitted, can be used to show a loading indicator
            - onSuccess: optional function to run when transaction is successful, can be used to show a success message
            - onError: optional function to run when transaction fails, can be used to show an error message
            - className: optional className to style the button
            */}
            <Web3Button
              contractAddress={Nomad3?.getAddress() || ""}
              contractAbi={Nomad3?.abi}
              action={() =>
                mutateAsync({ args: [ethers.BigNumber.from(inputValue)] })
              }
              onSubmit={() => console.log("Transaction submitted")}
              onSuccess={(result) => console.log(result)}
              onError={(error) => console.log(error)}
              className="ml-8"
            >
              Create Year Album
            </Web3Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center flex-1 text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-800 dark:text-white mb-15">
          <Image
            src="/Logo.png"
            alt="Descriptive Text"
            style={{ width: "200px", height: "auto" }}
            width={200}
            height={200}
          />
          <div className="pt-7">
            <ConnectWallet
              hideTestnetFaucet={false}
              theme={"dark"}
              btnTitle={"Start Nomading 🚀"}
              modalTitle={"Nomad3"}
              switchToActiveChain={true}
              modalSize={"wide"}
              welcomeScreen={{
                title: "~No Private Keys and Seed Phrases~",
                subtitle:
                  "a seamless journey to meaningful memorable connections starts here",
                img: {
                  src: "Logo.png",
                  width: 250,
                  height: 250,
                },
              }}
              modalTitleIconUrl={""}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
