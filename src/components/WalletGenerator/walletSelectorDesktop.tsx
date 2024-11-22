import React, { forwardRef } from "react";
import { Card, CardContent, CardTitle, CardFooter } from "../ui/card";
import { Icon } from "@iconify-icon/react";
import { calculatePayments, cn, TimestampTemplate } from "@/lib/utils";
import { StateHandler } from "../context/StateHandler";
import { Button } from "../ui/button";
import PaymentsDisplay from "../paymentsDisplay";

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

const WalletDesktop = forwardRef<HTMLUListElement, WalletDesktop>(
  ({ onSelectWallet, selectedWallet, wallets }, ref) => {
    return (
      <ul ref={ref} className="flex gap-x-4 overflow-auto md:py-8">
        {wallets.map(({ address, payments, created }, index) => {
          const isSelected = selectedWallet?.address === address;

          const { completed, pending } = calculatePayments(payments);

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
                    <PaymentsDisplay pending={pending} completed={completed} />
                  </div>
                </CardContent>
                <CardFooter className="group flex w-full justify-between gap-x-2 p-0">
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
                    <Icon
                      icon="material-symbols:check-box"
                      className={cn(
                        "text-xl text-white",
                        isSelected ? "" : "hidden scale-110 group-hover:block",
                      )}
                    />
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
