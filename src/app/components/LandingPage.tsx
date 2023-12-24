import React, { useState, useEffect } from "react";
import {
  ConnectWallet,
  contractType,
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
  Web3Button,
} from "@thirdweb-dev/react";
import Cards from "../components/Cards";
import { useNomad3 } from "./ContractInteractions";
import { ethers } from "ethers";
import { BigNumber } from 'ethers';

const LandingPage: React.FC<{
  onNavigate: (
    page:
      | "MainPage"
      | "CardOne"
      | "CardTwo"
      | "ETHSingaporeCard"
      | "ETHDenverCard"
  ) => void;
}> = ({ onNavigate }) => {
  const address = useAddress();
  const [inputValue, setInputValue] = useState<number | string>("");
  const [yearsData, setYearsData] = useState<BigNumber[]>([]);
  const { contract: Nomad3 } = useNomad3();
  

  const { data, isLoading, error } = useContractRead(
    Nomad3,
    "eventMinterContractAddress"
  );

  console.log(data);

  const {
    mutateAsync,
    isLoading: createYearLoading,
    error: createYearError,
  } = useContractWrite(Nomad3, "createYear");

  return (
    <div className="flex min-h-screen flex-col">
      {address ? (
        <div className="app">
          <div className="flex justify-between">
            <header className="header">
              <h1>Nomad3</h1>
              <p>Click here to see what's AFI is in your NFT</p>
            </header>
            <div>
              <ConnectWallet />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4">
            {yearsData && yearsData.map((year, index) => (
              <div key={index} className="md:col-span-4 col-start-3 p-8">
                <Cards
                  year={parseInt(year._hex, 16).toString()}   // Access the value from the _hex property
                  eventsCount={32}
                  title={`The 'Degen' - Year ${parseInt(year._hex, 16).toString()}`} // Convert here as well                  
                  poweredBy="powered by ERC-6551"
                  onNavigate={() => onNavigate("CardOne")}
                  image={`1.jpeg`}// to fetch later using react hook
                />
              </div>
            ))}
          </div>
          <Web3Button
            contractAddress={Nomad3?.getAddress() || ""}
            contractAbi={Nomad3?.abi}
            // Calls the "setName" function on your smart contract with "My Name" as the first argument
            action={() => mutateAsync({ args: [2019] })}
            onSubmit={() => console.log("Transaction submitted")}
            onSuccess={(result) => console.log(result)}
            onError={(error) => console.log(error)}
          >
            Send Transaction
          </Web3Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center flex-1">
          <h2>Connect a personal wallet to view your owned NFTs</h2>
          <ConnectWallet
            hideTestnetFaucet={false}
            theme={"dark"}
            btnTitle={"Start Nomading 🚀"}
            modalTitle={"Nomad3"}
            switchToActiveChain={true}
            modalSize={"wide"}
            welcomeScreen={{
              title: "Welcome to Nomad3",
              subtitle:
                "Are you ready to forge meaningful, memorable connections?",
              img: {
                src: "",
                width: 150,
                height: 150,
              },
            }}
            modalTitleIconUrl={""}
          />
        </div>
      )}
    </div>
  );
};

export default LandingPage;