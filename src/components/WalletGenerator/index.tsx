import { createXWallet, revealXPriv } from "@/app/actions";
import { NewWallet } from "@/lib/types";
import React, { useState } from "react";
import { Card } from "../ui/card";
import { useToast } from "@/hooks/use-toast";
import ContainerWallets from "./containerWallets";
import ContainerEmpty from "./containerEmpty";

const MAX_WALLETS_ALLOWED = 5;

const WalletGenerator = () => {
  const [wallets, setWallets] = useState<[] | NewWallet[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<NewWallet | null>(null);

  const { toast } = useToast();

  const onCreateNewWallet = async () => {
    if (wallets.length < MAX_WALLETS_ALLOWED) {
      //TODO set a  loading property?
      const newWallet = await createXWallet();

      if (newWallet) {
        setWallets([...wallets, newWallet]);
        return { success: true };
      }
    } else {
      //TODO TOAST about too many wallets
      toast({
        title: "Maximum Wallets Created!",
        description: "Too many wallets created, please delete one.",
      });
    }
  };

  const onSelectWallet = (address: string) => {
    //TODO select by wallet address
    const selectedWallet = wallets.find((wallet) => wallet.address === address);
    if (!selectedWallet) {
      //TODO error message about missing wallet
      return;
    }

    setSelectedWallet(selectedWallet);
  };

  const onDeleteWallet = (address: string) => {
    //TODO delete by wallet address instead, check all function using still work
    //TODO add warning diaglog
    if (address === selectedWallet?.address) {
      setSelectedWallet(null);
    }

    const updatedWallets = wallets.filter(
      (wallet) => wallet.address !== address,
    );

    setWallets(updatedWallets);
  };

  const onRevealXPriv = async (hiddenXPriv: string) => {
    if (selectedWallet === null) {
      return;
    }

    if (selectedWallet.xpriv === "hidden") {
      const response = await revealXPriv(hiddenXPriv);

      if (response) {
        const xpriv = (selectedWallet.xpriv = response);
        const updatedWallet = { ...selectedWallet, xpriv };

        setSelectedWallet(updatedWallet);
      }
    } else {
      const xpriv = (selectedWallet.xpriv = "hidden");
      const updatedWallet = { ...selectedWallet, xpriv };
      setSelectedWallet(updatedWallet);
    }
  };

  return (
    <div className="w-full">
      <h2 className="font-bold">
        Your Wallets ({`${wallets.length}/${MAX_WALLETS_ALLOWED}`})
      </h2>
      <Card className="flex size-full h-fit flex-col items-center justify-center border-0 bg-brand-olive-200/20 p-4">
        {wallets.length ? (
          <ContainerWallets
            wallets={wallets}
            onRevealXPriv={onRevealXPriv}
            onCreateNewWallet={onCreateNewWallet}
            onDeleteWallet={onDeleteWallet}
            selectedWallet={selectedWallet}
            onSelectWallet={onSelectWallet}
          />
        ) : (
          <ContainerEmpty onCreateNewWallet={onCreateNewWallet} />
        )}
      </Card>
    </div>
  );
};

export default WalletGenerator;
