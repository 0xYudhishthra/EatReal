import React, { use } from "react";
import {
  ConnectWallet,
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
  Web3Button,
} from "@thirdweb-dev/react";
import Cards from "../components/Cards";
import { useNomad3 } from "./ContractInteractions";
import { ethers } from "ethers";

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

  const {
    contract: Nomad3,
    isLoading: isNomad3Loading,
    error: nomad3Error,
  } = useNomad3();

  const { data, isLoading, error } = useContractRead(Nomad3, "getYears", [], {
    from: address,
  });

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
            <div className="md:col-span-4 col-start-3">
              <Cards
                year={2023}
                eventsCount={32}
                title="The 'Degen'"
                poweredBy="powered by ERC-6551"
                onNavigate={() => onNavigate("CardOne")}
                image="/hello.jpg"
              />
            </div>

            <div className="md:col-span-4 col-start-8">
              <Cards
                year={2024}
                eventsCount={32}
                title="The 'Degen'"
                poweredBy="powered by ERC-6551"
                onNavigate={() => onNavigate("CardTwo")}
                image="/3.jpeg"
              />
            </div>
          </div>
          <Web3Button
            contractAddress={Nomad3?.getAddress() || ""}
            contractAbi={Nomad3?.abi}
            // Calls the "setName" function on your smart contract with "My Name" as the first argument
            action={() => mutateAsync({ args: [2018] })}
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
            btnTitle={"Nomad3 Connect"}
            modalTitle={"Nomad3"}
            switchToActiveChain={true}
            modalSize={"wide"}
            welcomeScreen={{
              title: "gm",
              subtitle: "gm",
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
