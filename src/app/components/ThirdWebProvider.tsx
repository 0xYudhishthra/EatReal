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
  factoryAddress: "0x1665b4b7047a76ac42b4cf9453120dd9a16583ba",
  gasless: true,
  bundlerUrl: "https://bundler.particle.network?chainId=89",
  paymasterUrl: `https://paymaster.particle.network?chainId=89&projectUuid=${process.env.NEXT_PUBLIC_PROJECT_ID}&projectKey=${process.env.NEXT_PUBLIC_CLIENT_KEY}`,
});

const localWalletConfig = localWallet();

//export this
export { smartWalletConfig, localWalletConfig };
