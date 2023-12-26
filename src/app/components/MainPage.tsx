"use client";
import React, { useState } from "react";
import Cards from "../components/Cards";
import { useNomad3 } from "./ContractInteractions";
import { useContractRead } from "@thirdweb-dev/react";

const MainPage: React.FC<{
  onNavigate: (
    page:
      | "MainPage"
      | "CardOne"
      | "CardTwo"
      | "ETHSingaporeCard"
      | "ETHDenverCard"
  ) => void;
}> = ({ onNavigate }) => {
  return (
    <div className="app">
      <div className="flex justify-between">
        <header className="header">
          <h1>Nomad3</h1>
          <p>Click here to see what&apos;s AFI is in your NFT</p>
        </header>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4">
        <div className="md:col-span-4 md:col-start-3 lg:col-start-3 xl:col-start-3">
          <Cards
            year={"2023"}
            eventsCount={32}
            title="The 'Degen'"
            poweredBy="powered by ERC-6551"
            onNavigate={() => onNavigate("CardOne")}
            image="/hello.jpg"
          />
        </div>
        <div className="md:col-span-4 md:col-start-8 lg:col-start-8 xl:col-start-8">
          <Cards
            year={"2024"}
            eventsCount={32}
            title="The 'Degen'"
            poweredBy="powered by ERC-6551"
            onNavigate={() => onNavigate("CardTwo")}
            image="/3.jpeg"
          />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
