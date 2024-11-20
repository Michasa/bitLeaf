import React from "react";
import { Icon } from "@iconify-icon/react";

const SelectedWalletEmpty = () => {
  return (
    <div className="address flex size-full flex-col items-center justify-center gap-y-2 bg-brand-olive-100 p-4 text-white">
      <Icon icon="icomoon-free:leaf" className="text-6xl" />
      <div className="whitespace-normal break-words text-center text-2xl">
        Select a Wallet for more Infomation
      </div>
    </div>
  );
};

export default SelectedWalletEmpty;
