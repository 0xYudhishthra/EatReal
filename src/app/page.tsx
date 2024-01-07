"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ConnectWallet,
  contractType,
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
  Web3Button,
} from "@thirdweb-dev/react";
import Cards from "./components/Cards";
import { useNomad3 } from "./components/ContractInteractions"; //1. identify what hook you wanna use from ContractInteractions.tsx
import { ethers, BigNumber } from "ethers";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const address = useAddress();
  const [inputValue, setInputValue] = useState<number | string>("");
  const [yearsData, setYearsData] = useState<BigNumber[]>([]);
  const router = useRouter();

  /**
   * 2. by default, a `contract` object is returned, best practice is to rename this accordingly to the target contract you are interacting with
   * can do something like this:
   * const { contract: 'THE_CONTRACT_NAME_TO_USE' } = useNomad3();
   */
  const { contract: Nomad3 } = useNomad3();

  /**
   * The `useContractRead` hook is used to read data from the blockchain
   * useContractRead(contract, functionName, args, options)
   * data: the data returned from the contract function
   * isLoading: boolean to indicate if the data is loading
   * error: error message if there is an error
   */
  const { data, isLoading, error } = useContractRead(Nomad3, "getYears", [], {
    from: address,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setYearsData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [data]);

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
              <p>Click here to see what&apos;s AFI is in your NFT</p>
            </header>
            <div>
              <ConnectWallet />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4">
            {yearsData &&
              yearsData.map((year, index) => (
                <div key={index} className="md:col-span-4 col-start-3 p-8 hover:shadow-2xl hover:scale-110 transition-transform duration-300 ease-in-out">
                  <Cards
                    year={parseInt(year._hex, 16).toString()}
                    eventsCount={32}
                    title={`The 'Degen' - Year ${parseInt(
                      year._hex,
                      16
                    ).toString()}`}
                    poweredBy="powered by ERC-6551"
                    onNavigate={() => router.push("/year/" + year)}
                    image={`PlaceA.jpg`}
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
              Send Transaction
            </Web3Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center flex-1 text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-800 dark:text-white mb-15">
          <img
            src="/Logo.png"
            alt="Descriptive Text"
            style={{ width: "200px", height: "auto" }}
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
