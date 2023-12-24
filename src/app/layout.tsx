import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  ThirdwebProvider,
  // smartWallet,
  smartWalletConfig,
  localWalletConfig,
  // ThirdwebStorage,
  // StorageDownloader,
  // IpfsUploader,
} from "./components/ThirdWebProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nomad3",
  description: "Powered by ERC-6551",
};

// // Configure a custom ThirdwebStorage instance
// const gatewayUrls = {
//   "ipfs://": [
//     "https://gateway.ipfscdn.io/ipfs/",
//     "https://cloudflare-ipfs.com/ipfs/",
//     "https://ipfs.io/ipfs/",
//   ],
// };

// const downloader = new StorageDownloader();
// const uploader = new IpfsUploader();
// const storage = new ThirdwebStorage({ uploader, downloader, gatewayUrls });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThirdwebProvider
      supportedWallets={[smartWalletConfig, localWalletConfig]}
      activeChain={{
        // === Required information for connecting to the network === \\
        chainId: 89, // Chain ID of the network
        // Array of RPC URLs to use
        rpc: ["https://rpc-testnet.viction.xyz"],

        // === Information for adding the network to your wallet (how it will appear for first time users) === \\
        // Information about the chain's native currency (i.e. the currency that is used to pay for gas)
        nativeCurrency: {
          decimals: 18,
          name: "Viction",
          symbol: "VIC",
        },
        shortName: "vic", // Display value shown in the wallet UI
        slug: "vic", // Display value shown in the wallet UI
        testnet: true, // Boolean indicating whether the chain is a testnet or mainnet
        chain: "Viction Testnet", // Name of the network
        name: "Viction Testnet", // Name of the network
      }}
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      autoConnect={true}
      dAppMeta={{
        name: "Nomad3",
        description: "Built with ❤️ on Viction.",
        logoUrl: "https://example.com/logo.png",
        url: "https://example.com",
        isDarkMode: true,
      }}
      // storageInterface={storage}
    >
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ThirdwebProvider>
  );
}
