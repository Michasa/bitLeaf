import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ContainerWallets } from "./containerWallets";

const WalletMobile = ({
  wallets,
  onSelectWallet,
  selectedWallet,
}: Pick<ContainerWallets, "wallets" | "onSelectWallet" | "selectedWallet">) => {
  return (
    <Select
      value={selectedWallet?.address ? selectedWallet?.address : undefined}
      onValueChange={(value) => onSelectWallet(value)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a Wallet" />
      </SelectTrigger>
      <SelectContent>
        {wallets.map((wallet, index) => (
          <SelectItem key={index} value={wallet.address}>
            {wallet.address}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default WalletMobile;
