import { createXWallet, revealXPriv } from "@/app/actions";
import { NewWallet } from "@/lib/types";
import React, { useState } from "react";
import { Card } from "../ui/card";
import { useToast } from "@/hooks/use-toast";
import ContainerWallets from "./containerWallets";
import ContainerEmpty from "./containerEmpty";
import { MAX_WALLETS_ALLOWED } from "@/lib/constants";

const WalletGenerator = () => {
  const [wallets, setWallets] = useState<[] | NewWallet[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<NewWallet | null>(null);

  const { toast } = useToast();

  const onCreateNewWallet = async () => {
    try {
      const newWallet = await createXWallet();

      if (newWallet) {
        setWallets([...wallets, newWallet]);

        toast({
          title: `New Wallet Created: ${newWallet.address.slice(0, 15)}...`,
          description: "Select it for more options",
        });

        return newWallet;
      }
    } catch (error) {
      console.error("YEAH NO...", error);
    }
  };

  const onSelectWallet = (address: string) => {
    const selectedWallet = wallets.find((wallet) => wallet.address === address);

    if (!selectedWallet) {
      return toast({
        title: `Wallet not found!`,
      });
    }

    setSelectedWallet(selectedWallet);
  };

  const onDeleteWallet = (address: string) => {
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
      try {
        const response = await revealXPriv(hiddenXPriv);

        if (response) {
          const xpriv = (selectedWallet.xpriv = response);
          const updatedWallet = { ...selectedWallet, xpriv };

          setSelectedWallet(updatedWallet);
        }
      } catch (error) {
        console.error("YEAH NO...", error);
      }
    } else {
      const updatedWallet = { ...selectedWallet, xpriv: "hidden" };
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
