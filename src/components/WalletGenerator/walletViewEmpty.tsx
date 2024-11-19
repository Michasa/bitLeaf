import React from "react";
import { Icon } from "@iconify-icon/react";

const WalletViewEmpty = () => {
  return (
    <>
      <Icon icon="icomoon-free:leaf" className="text-6xl" />
      <div className="whitespace-normal break-words text-center text-2xl">
        Select a Wallet for more Infomation
      </div>
    </>
  );
};

export default WalletViewEmpty;
