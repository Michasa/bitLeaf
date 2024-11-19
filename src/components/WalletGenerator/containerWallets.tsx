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
import { MAX_WALLETS_ALLOWED } from "@/lib/constants";

export type ContainerWallets = {
  wallets: NewWallet[];
  selectedWallet: NewWallet | null;
  onRevealXPriv: (xprivSealed: string) => void;
  onCreateNewWallet: () => NewWallet | void;
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

  const TOO_MANY_WALLETS = wallets.length === MAX_WALLETS_ALLOWED;

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
          disabled={TOO_MANY_WALLETS}
          onClick={async () => {
            await onCreateNewWallet();
            if (ref.current?.lastElementChild) {
              ref.current.lastElementChild.scrollIntoView({
                behavior: "smooth",
              });
            }
          }}
        >
          Create a New Wallet
        </Button>
        {TOO_MANY_WALLETS && (
          <div className="flex items-center gap-x-2 self-center">
            <Icon
              icon="si:warning-duotone"
              className="text-xl text-amber-500"
            />
            <span className="text-base">
              Max wallets created! Delete an existing wallet in-order to create
              a new one
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
