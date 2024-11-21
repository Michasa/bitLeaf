import React from "react";
import { Button } from "../ui/button";
import { Icon } from "@iconify-icon/react";
import { cn, handleCopy } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../ui/card";
import SelectedWalletEmpty from "./emptyUI/SelectedWallet";
import tinydate from "tinydate";
import { StateHandler } from "../context/StateHandler";

export type WalletInfo = Pick<
  StateHandler,
  | "onDeleteWallet"
  | "onRevealXPriv"
  | "selectedWallet"
  | "onSelectWallet"
  | "loadingRevealXPriv"
> & { setOpenPaymentDialog: (arg: boolean) => void };

const WalletInfo = ({
  onDeleteWallet,
  onRevealXPriv,
  selectedWallet,
  onSelectWallet,
  loadingRevealXPriv,
  setOpenPaymentDialog,
}: WalletInfo) => {
  const XPRIV_HIDDEN = selectedWallet?.xpriv === "hidden";

  if (selectedWallet === null) {
    return <SelectedWalletEmpty />;
  }

  const TimestampTemplate = tinydate("{DD}/{MM}/{YY} at {HH}:{mm}:{ss}");
  return (
    <div className="address flex size-full flex-col items-center gap-y-2 rounded-md">
      <Card className="flex size-full flex-col gap-y-2 border-brand-olive-500/50 bg-white p-4">
        <CardTitle className="flex items-center justify-between font-bold uppercase">
          Wallet Details
          <Button onClick={() => onSelectWallet(null)}>
            <Icon icon="mingcute:close-fill" className="text-xl" />
          </Button>
        </CardTitle>
        <CardDescription className="flex items-center gap-x-2">
          <Icon icon="majesticons:clock" className="text-brand-olive-500" />
          <p>
            <span className="font-bold">Created:</span>{" "}
            {TimestampTemplate(selectedWallet.created)}
          </p>
        </CardDescription>
        <CardContent className="flex flex-col gap-2 p-0">
          <div className="flex items-baseline justify-between">
            <span className="font-bold">Public Key</span>
            <Button
              variant="outline"
              onClick={() =>
                handleCopy(selectedWallet!.address, {
                  title: "Public Key Copied!",
                })
              }
            >
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
                {!XPRIV_HIDDEN && (
                  <Button
                    variant="outline"
                    onClick={() =>
                      handleCopy(selectedWallet!.address, {
                        title: "XPriv Key Copied!",
                        description: "Keep this somewhere safe!",
                      })
                    }
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
                  {loadingRevealXPriv ? (
                    <Icon className="animate-spin" icon="ri:loader-fill" />
                  ) : (
                    <Icon
                      icon={
                        XPRIV_HIDDEN
                          ? "mingcute:eye-close-line"
                          : "mingcute:eye-2-line"
                      }
                      className="w-full text-brand-olive-500"
                    />
                  )}
                </Button>
              </div>
            </div>
            <span
              className={cn(
                "w-full rounded-md border bg-white p-2 align-middle",
                XPRIV_HIDDEN
                  ? "italics border-slate-500 text-black"
                  : "border-brand-olive-400",
              )}
            >
              {XPRIV_HIDDEN ? "xxxxxxxxxxxxxx" : selectedWallet.xpriv}
            </span>
          </div>
        </CardContent>
        <CardFooter className="mt-8 flex w-full flex-col justify-center gap-y-2 p-0 *:w-full *:md:w-4/6 *:lg:w-5/6">
          <Button
            className="group text-center"
            onClick={() => setOpenPaymentDialog(true)}
          >
            <Icon
              icon="tabler:mood-bitcoin"
              className="-rotate-12 text-3xl text-white hover:scale-125"
            />{" "}
            Create Payment Request
          </Button>

          <Button className="group text-center">
            <Icon
              icon="hugeicons:bitcoin-receive"
              className="text-2xl text-white hover:scale-125"
            />
            See Payment Requests
          </Button>
          <Button
            variant="destructive"
            className="group text-center"
            onClick={() => onDeleteWallet(selectedWallet.address)}
          >
            <Icon
              icon="mingcute:delete-2-fill"
              className="text-xl text-white group-hover:scale-125"
            />
            Delete Wallet
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WalletInfo;
