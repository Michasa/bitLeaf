import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WalletSelector } from "./WalletSelector";
import { toast } from "@/hooks/use-toast";

const WalletMobile = ({
  wallets,
  onSelectWallet,
  selectedWallet,
}: Pick<WalletSelector, "wallets" | "onSelectWallet" | "selectedWallet">) => {
  const onChooseWallet = (address: string) => {
    const wallet = wallets.find((_wallet) => _wallet.address === address);

    if (!wallet) {
      toast({
        title: `Wallet not found!`,
      });
      return;
    }

    onSelectWallet(wallet);
  };
  return (
    <Select
      value={selectedWallet?.address ? selectedWallet?.address : undefined}
      onValueChange={(value) => {
        onChooseWallet(value);
      }}
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
