"use client";
import React, { useRef } from "react";
import { Button } from "../ui/button";
import { NewWallet } from "@/lib/types";
import { useMediaQuery } from "react-responsive";
import { Icon } from "@iconify-icon/react";
import WalletView from "./walletView";
import { cn } from "@/lib/utils";

import WalletViewEmpty from "./walletViewEmpty";
import WalletDesktop from "./walletDesktop";
import WalletMobile from "./walletMobile";

export type ContainerWallets = {
  wallets: NewWallet[];
  selectedWallet: NewWallet | null;
  onRevealXPriv: (xprivSealed: string) => void;
  onCreateNewWallet: () => void;
  onDeleteWallet: (address: NewWallet["address"]) => void;
  onSelectWallet: (address: NewWallet["address"]) => void;
};

const ContainerWallets = ({
  wallets,
  selectedWallet,
  onRevealXPriv,
  onCreateNewWallet,
  onDeleteWallet,
  onSelectWallet,
}: ContainerWallets) => {
  const ref = useRef<HTMLUListElement>(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div className="grid size-full grid-cols-1 gap-4 md:gap-y-8 lg:grid-flow-col lg:grid-cols-5">
      <div className="col-span-1 flex flex-col justify-center lg:col-span-3">
        {isMobile ? (
          <WalletMobile
            wallets={wallets}
            selectedWallet={selectedWallet}
            onSelectWallet={onSelectWallet}
          />
        ) : (
          <WalletDesktop
            ref={ref}
            wallets={wallets}
            selectedWallet={selectedWallet}
            onSelectWallet={onSelectWallet}
          />
        )}
        <Button
          className="my-4 self-center justify-self-center disabled:bg-gray-100 disabled:text-black"
          disabled={wallets.length === 5}
          onClick={() => {
            onCreateNewWallet();
            // FIXME: Scroll to end. Also create variable for wallet comparison
            // ref.current?.scrollWidth;
          }}
        >
          Create a New Wallet
        </Button>
        {wallets.length === 5 && (
          <div className="flex items-center gap-x-2 self-center">
            <Icon
              icon="si:warning-duotone"
              className="text-xl text-amber-500"
            />
            <span className="text-base">
              Max wallets created! Delete one to create a new one
            </span>
          </div>
        )}
      </div>
      <div className="col-span-1 lg:col-span-2">
        <div
          className={cn(
            "address flex size-full flex-col items-center gap-y-2",
            selectedWallet
              ? "rounded-md"
              : "items-center justify-center bg-brand-olive-100 p-4 text-white",
          )}
        >
          {selectedWallet !== null ? (
            <WalletView
              onDeleteWallet={onDeleteWallet}
              selectedWallet={selectedWallet}
              onRevealXPriv={onRevealXPriv}
            />
          ) : (
            <WalletViewEmpty />
          )}
        </div>
      </div>
    </div>
  );
};

export default ContainerWallets;
