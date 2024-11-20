import React, { forwardRef } from "react";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";
import { Icon } from "@iconify-icon/react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { WalletSelector } from "./WalletSelector";

type WalletDesktop = Pick<
  WalletSelector,
  "onSelectWallet" | "selectedWallet" | "wallets"
>;

const WalletDesktop = forwardRef<HTMLUListElement, WalletDesktop>(
  ({ onSelectWallet, selectedWallet, wallets }, ref) => {
    return (
      <ul ref={ref} className="flex flex-row gap-x-4 overflow-auto md:py-8">
        {wallets.map(({ address }, index) => {
          const isSelected = selectedWallet?.address === address;

          return (
            <li key={index} className="w-72 shrink-0">
              <Card
                className={cn(
                  "flex size-full animate-jump-in flex-col items-center gap-y-4 p-4 text-start animate-once animate-ease-linear hover:shadow-md",
                  isSelected
                    ? "border-amber-300 bg-amber-100 hover:shadow-amber-600/50"
                    : "border border-brand-olive-100/50 bg-brand-olive-100/80 hover:shadow-brand-green-600/50",
                )}
                onClick={() => onSelectWallet(address)}
              >
                <CardTitle className="flex size-full items-center justify-between self-end">
                  <Icon
                    icon="wpf:sim-card-chip"
                    className="text-4xl text-brand-dark"
                  />
                  <div className="flex items-center gap-x-2 text-brand-dark">
                    <span>BitLeaf</span>
                  </div>
                </CardTitle>
                <CardContent className="flex size-full min-h-20 flex-col p-0">
                  <div className="truncate font-orbitron font-bold text-gray-700">
                    {address}
                  </div>
                  <div>Payments:</div>
                </CardContent>
                <CardFooter className="flex justify-center gap-x-2 p-0">
                  <Button onClick={() => onSelectWallet(address)}>
                    Select Wallet
                  </Button>
                </CardFooter>
              </Card>
            </li>
          );
        })}
      </ul>
    );
  },
);

WalletDesktop.displayName = "WalletDesktop";

export default WalletDesktop;
