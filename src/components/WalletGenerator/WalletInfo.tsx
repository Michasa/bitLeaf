import React from "react";
import { Button } from "../ui/button";
import { Icon } from "@iconify-icon/react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../ui/card";
import SelectedWalletEmpty from "./emptyUI/SelectedWallet";
import { NewWallet } from "@/lib/types";
import tinydate from "tinydate";

export type WalletInfo = {
  selectedWallet: NewWallet | null;
  onRevealXPriv: (xprivSealed: string) => void;
  onDeleteWallet: (address: NewWallet["address"]) => void;
  onSelectWallet: (choice: NewWallet["address"] | null) => void;
};

const WalletInfo = ({
  onDeleteWallet,
  onRevealXPriv,
  selectedWallet,
  onSelectWallet,
}: WalletInfo) => {
  const XPRIV_HIDDEN = selectedWallet?.xpriv === "hidden";

  if (selectedWallet === null) {
    return <SelectedWalletEmpty />;
  }

  const TimestampTemplate = tinydate("{DD}/{MM}/{YY} at {HH}:{mm}:{ss}");
  console.log(selectedWallet.created);
  return (
    <div className="address flex size-full flex-col items-center gap-y-2 rounded-md">
      <Card className="flex size-full flex-col gap-y-2 border-brand-olive-500/50 bg-white p-4">
        <CardTitle className="flex justify-between font-bold uppercase">
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
                {!XPRIV_HIDDEN && (
                  <Button
                    variant="outline"
                    // FIXME needs to get copy function from context
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
                      XPRIV_HIDDEN
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
                XPRIV_HIDDEN
                  ? "italics border-slate-500 text-black"
                  : "border-brand-olive-400",
              )}
            >
              {XPRIV_HIDDEN ? "xxxxxxxxxxxxxx" : selectedWallet.xpriv}
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
    </div>
  );
};

export default WalletInfo;
