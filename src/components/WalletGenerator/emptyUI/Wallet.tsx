"use client";

import React from "react";
import { Icon } from "@iconify-icon/react";
import { Button } from "../../ui/button";
import { StateHandler } from "@/components/context/StateHandler";

export type WalletEmpty = Pick<
  StateHandler,
  "onCreateWallet" | "loadingNewWallet"
>;

const WalletEmpty = ({ onCreateWallet, loadingNewWallet }: WalletEmpty) => {
  return (
    <div className="flex w-fit flex-col place-items-center rounded-lg p-4">
      <Icon
        icon="fa6-solid:seedling"
        className="text-7xl text-brand-olive-300"
      />
      <p className="text-center text-xl italic text-slate-500">
        You don't have any wallets yet.
        <br /> Create your first one!
      </p>
      <Button className="mt-8" onClick={async () => onCreateWallet()}>
        {loadingNewWallet ? (
          <>
            <Icon className="animate-spin" icon="ri:loader-fill" />
            Loading
          </>
        ) : (
          "Create a New Wallet"
        )}{" "}
      </Button>
    </div>
  );
};

export default WalletEmpty;
