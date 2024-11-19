"use client";

import React from "react";
import { Icon } from "@iconify-icon/react";
import { Button } from "../ui/button";

const ContainerEmpty = ({
  onCreateNewWallet,
}: {
  onCreateNewWallet: () => void;
}) => {
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
      <Button className="mt-8" onClick={onCreateNewWallet}>
        Create a New Wallet
      </Button>
    </div>
  );
};

export default ContainerEmpty;
