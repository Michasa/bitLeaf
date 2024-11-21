import React, { forwardRef } from "react";
import { Card, CardContent, CardTitle, CardFooter } from "../ui/card";
import { Icon } from "@iconify-icon/react";
import { cn } from "@/lib/utils";
import { StateHandler } from "../context/StateHandler";
import tinydate from "tinydate";
import { Button } from "../ui/button";

const ADDRESS_PREFIX = "tb1q";

type WalletDesktop = Pick<
  StateHandler,
  "onSelectWallet" | "wallets" | "selectedWallet"
>;

const StyledAddress = ({
  address,
  isSelected,
}: {
  address: string;
  isSelected: boolean;
}) => {
  return address.startsWith(ADDRESS_PREFIX) ? (
    <div title={address} className="flex overflow-hidden text-black">
      <span>{ADDRESS_PREFIX}</span>
      <div
        className={cn(
          "truncate",
          isSelected ? "text-shadow-active" : "text-shadow",
        )}
      >
        {address.replace(ADDRESS_PREFIX, "")}
      </div>
    </div>
  ) : (
    <p className="truncate text-white">{address}</p>
  );
};

const PaymentFigures = ({
  number,
  label,
  isSelected,
}: {
  number: number;
  label: string;
  isSelected: boolean;
}) => (
  <div
    className={cn(
      "flex flex-col items-center justify-center rounded-md border-2 p-2 font-orbitron text-white",
      isSelected
        ? "border-amber-700 bg-amber-600/70"
        : "border-brand-dark bg-brand-dark/70",
    )}
  >
    <span className="block text-lg">{number} </span>
    <span className="block text-xs">{label}</span>
  </div>
);

const WalletDesktop = forwardRef<HTMLUListElement, WalletDesktop>(
  ({ onSelectWallet, selectedWallet, wallets }, ref) => {
    const TimestampTemplate = tinydate("{DD}/{MM}/{YY} @ {HH}:{mm}:{ss}");

    return (
      <ul ref={ref} className="flex gap-x-4 overflow-auto md:py-8">
        {wallets.map(({ address, created }, index) => {
          const isSelected = selectedWallet?.address === address;

          return (
            <li key={index} className="h-full w-96 shrink-0">
              <Card
                className={cn(
                  "flex h-full animate-jump-in flex-col items-center gap-y-4 p-4 text-start animate-once animate-ease-linear hover:shadow-md",
                  isSelected
                    ? "border-amber-300 bg-amber-100 hover:shadow-amber-600/50"
                    : "border border-brand-olive-100/50 bg-brand-olive-100/80 hover:shadow-brand-olive-500",
                )}
                onClick={() => onSelectWallet(address)}
              >
                <CardTitle className="flex min-h-9 w-full items-center justify-between self-end">
                  <Icon
                    icon="wpf:sim-card-chip"
                    className="text-4xl text-brand-dark"
                  />
                  <div className="flex items-center gap-x-2 text-brand-dark">
                    <span>BitLeaf</span>
                  </div>
                </CardTitle>
                <CardContent className="flex min-h-20 w-full flex-col gap-y-2 p-0">
                  <div className="w-full font-orbitron font-bold text-white">
                    <StyledAddress
                      address={address}
                      isSelected={address === selectedWallet?.address}
                    />
                  </div>
                  <div className="mb-0 mt-4 flex w-full flex-col space-y-2 font-orbitron text-lg font-bold">
                    <p>Payments</p>
                    <div className="flex justify-evenly gap-x-2 font-semibold">
                      <PaymentFigures
                        number={0}
                        label="Pending"
                        isSelected={isSelected}
                      />
                      <PaymentFigures
                        number={0}
                        label="Completed"
                        isSelected={isSelected}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex w-full justify-between gap-x-2 p-0">
                  <div className="inline-block text-wrap font-orbitron">
                    <span className="text-sm font-bold"> Created At:</span>
                    <br />
                    <span className="font-sans">
                      {TimestampTemplate(created)}
                    </span>{" "}
                  </div>
                  <Button
                    onClick={() => {
                      onSelectWallet(address);
                    }}
                  >
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
