'use client';
import "./globals.css";
import Script from "next/script";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { UserProvider } from '@/context/UserContext';
import ClientNav from "./components/ClientNav";
import Ticker from "./components/Ticker";
import StarField from "./components/StarField";
import Bar from "./components/Bar";
import { MiningProvider } from '@/context/MiningContext';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <head>
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      </head>
      <body className="antialiased min-h-screen">
        {/* Background Image */}
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/background.png')", zIndex: -2 }}
        ></div>

        {/* StarField (Dynamic Background) */}
        <div className="fixed inset-0 z-[-1]">
          <StarField />
        </div>

        {/* Main Content */}
        <TonConnectUIProvider manifestUrl="https://moccasin-implicit-eel-888.mypinata.cloud/ipfs/bafkreifrznbmai6mnl3lse3lw5evmcll6ekh2vyjpfozewuxbj2f677mva">
          <UserProvider>
            <div className="flex flex-col min-h-screen">
              {/* Ticker */}
              <Ticker />
              <Bar />

              {/* Main Content */}
              <div className="flex-grow overflow-y-auto pb-20 relative z-10">
                <MiningProvider>
                 {children}
                </MiningProvider>
              </div>

              {/* Fixed Navbar */}
              <ClientNav />
            </div>
          </UserProvider>
        </TonConnectUIProvider>
      </body>
    </html>
  );
}