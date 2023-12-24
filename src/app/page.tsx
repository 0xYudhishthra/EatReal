// // Home Component
"use client";
import React, { useState } from "react";
import MainPage from "./components/MainPage";
import CardOne from "./components/CardOne";
import CardTwo from "./components/CardTwo";
import ETHSingaporeCard from "./components/CardOne-2023/ETHSingaporeCard";
import ETHDenverCard from "./components/CardOne-2023/ETHDenverCard";
import ETHCC from "./components/CardOne-2023/ETHCC";
import ETHLondon from "./components/CardTwo-2024/ETHLondon";
import ETHSydney from "./components/CardTwo-2024/ETHSydney";
import ETHTaipei from "./components/CardTwo-2024/ETHTaipei";
import { useConnect } from "@thirdweb-dev/react";
import { smartWalletConfig } from "./components/ThirdWebProvider";
import { ConnectWallet } from "@thirdweb-dev/react";

const Home: React.FC = () => {
  // const [currentPage, setCurrentPage] = useState<
  //   "MainPage" | "CardOne" | "CardTwo" | "ETHSingaporeCard" | "ETHDenverCard"
  // >("MainPage");

  // const onNavigate = (
  //   page: "MainPage" | "CardOne" | "CardTwo" | "ETHSingaporeCard"
  // ) => {
  //   setCurrentPage(page);
  // };

  // const connect = useConnect();

  // // const handleConnect = async () => {
  // //   await connect({
  // //     strategy: "google",
  // //   });
  // // };

  // const handleConnect = async () => {
  //   // 1. connect the personal wallet first on the network that the smart wallet is deployed to
  //   const personalWallet = await connect(embeddedWalletConfig);

  //   // 2. connect to smart wallet
  //   const smartWallet = await connect(smartWalletConfig);

  //   console.log("connected to", smartWallet);
  // };

  return (
    // <div className="flex min-h-screen flex-col">
    //   <main>
    //     {currentPage === "MainPage" && <MainPage onNavigate={onNavigate} />}
    //     {currentPage === "CardOne" && <CardOne onNavigate={onNavigate} />}
    //     {currentPage === "CardTwo" && <CardTwo onNavigate={onNavigate} />}
    //     {currentPage === "ETHSingaporeCard" && (
    //       <ETHSingaporeCard onNavigate={onNavigate} />
    //     )}
    //     {currentPage === "ETHDenverCard" && (
    //       <ETHDenverCard onNavigate={onNavigate} />
    //     )}
    //     {currentPage === "ETHCC" && <ETHCC onNavigate={onNavigate} />}
    //     {currentPage === "ETHLondon" && <ETHLondon onNavigate={onNavigate} />}
    //     {currentPage === "ETHSydney" && <ETHSydney onNavigate={onNavigate} />}
    //     {currentPage === "ETHTaipei" && <ETHTaipei onNavigate={onNavigate} />}
    //   </main>
    // </div>
    // handle connect
    <div className="flex min-h-screen flex-col">
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
  );
};

export default Home;
