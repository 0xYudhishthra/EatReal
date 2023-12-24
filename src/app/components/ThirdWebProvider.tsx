"use client";

export { ThirdwebProvider } from "@thirdweb-dev/react";

// export {
// ThirdwebStorage,
// StorageDownloader,
// IpfsUploader,
// } from "@thirdweb-dev/storage";

import { embeddedWallet, smartWallet, localWallet } from "@thirdweb-dev/react";

// Configure the embedded wallet
const walletConfig = embeddedWallet({
  auth: {
    options: ["email", "google", "apple", "facebook"],
  },
  recommended: true,
});

// // override metadata
walletConfig.meta.name = "Nomad3 Smart Account"; // change the name of the wallet

const smartWalletConfig = smartWallet(walletConfig, {
  factoryAddress: "0x1665b4B7047a76aC42B4cf9453120DD9a16583Ba",
  gasless: true,
});

const localWalletConfig = localWallet();

//export this
export { smartWalletConfig, localWalletConfig };
