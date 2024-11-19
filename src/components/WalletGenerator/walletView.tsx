import React from "react";
import { Button } from "../ui/button";
import { Icon } from "@iconify-icon/react";
import { ContainerWallets } from "./containerWallets";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../ui/card";

const WalletView = ({
  onDeleteWallet,
  onRevealXPriv,
  selectedWallet,
}: Pick<
  ContainerWallets,
  "onRevealXPriv" | "selectedWallet" | "onDeleteWallet"
>) => {
  if (selectedWallet === null) {
    return;
  }
  return (
    <Card className="flex size-full flex-col gap-y-2 border-brand-olive-500/50 bg-white p-4">
      <CardTitle className="text-center font-bold uppercase">
        Wallet Details
      </CardTitle>
      <CardDescription className="flex items-center gap-x-2">
        <Icon icon="majesticons:clock" className="text-brand-olive-500" />
        <span>Date Created</span>
      </CardDescription>
      <CardContent className="flex flex-col gap-2 p-0">
        <div className="flex items-baseline justify-between">
          <span className="font-bold">Public Key</span>
          <Button variant="outline">
            <Icon
              icon="mingcute:copy-line"
              className="w-full text-brand-olive-500"
            />
          </Button>
        </div>
        <span className="rounded-md border border-brand-olive-400 bg-white p-2">
          {selectedWallet!.address}
        </span>
        <div className="address flex w-full flex-col gap-y-2">
          <div className="flex items-baseline justify-between">
            <span className="font-bold">Private Key (xpriv)</span>
            <div className="flex gap-x-2">
              {selectedWallet.xpriv !== "hidden" && (
                <Button
                  variant="outline"
                  // FIXME needs to copy thingg
                  // onClick={() => onRevealXPriv(index, wallet.xprivSealed)}
                >
                  <Icon
                    icon="mingcute:copy-line"
                    className="w-full text-brand-olive-500"
                  />
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => onRevealXPriv(selectedWallet.xprivSealed)}
              >
                <Icon
                  icon={
                    selectedWallet.xpriv === "hidden"
                      ? "mingcute:eye-close-line"
                      : "mingcute:eye-2-line"
                  }
                  className="w-full text-brand-olive-500"
                />
              </Button>
            </div>
          </div>
          <span
            className={cn(
              "w-full rounded-md border bg-white p-2 align-middle",
              selectedWallet.xpriv === "hidden"
                ? "italics border-slate-500 text-black"
                : "border-brand-olive-400",
            )}
          >
            {selectedWallet.xpriv === "hidden"
              ? "xxxxxxxxxxxxxx"
              : selectedWallet.xpriv}
          </span>
        </div>
      </CardContent>
      <CardFooter className="mt-8 flex w-full flex-col justify-center gap-y-2 p-0 *:w-1/2 *:md:w-4/6 *:lg:w-5/6">
        <Button>Request Payment</Button>
        <Button>See Payment Requests</Button>
        <Button
          variant="destructive"
          onClick={() => onDeleteWallet(selectedWallet.address)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WalletView;
