import { createXWallet, revealXPriv } from "@/app/actions";
import { NewWallet } from "@/lib/types";
import React, { useState } from "react";
import { Card } from "../ui/card";
import { useToast } from "@/hooks/use-toast";
import { MAX_WALLETS_ALLOWED } from "@/lib/constants";
import WalletSelector from "./WalletSelector";
import WalletInfo from "./WalletInfo";
import WalletEmpty from "./emptyUI/wallet";

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
      if (error instanceof Error) {
        toast({
          title: `Could not create new wallet`,
          description: error.message as string,
        });
      }
    }
  };

  const onSelectWallet = (choice: NewWallet["address"] | null) => {
    if (choice === null) {
      setSelectedWallet(null);
      return;
    }

    const selectedWallet = wallets.find((wallet) => wallet.address === choice);

    if (!selectedWallet) {
      return toast({
        title: `Wallet not found!`,
      });
    }

    setSelectedWallet(selectedWallet);
  };

  const onDeleteWallet = (address: NewWallet["address"]) => {
    //TODO add warning diaglog
    if (address === selectedWallet?.address) {
      setSelectedWallet(null);
    }

    const updatedWallets = wallets.filter(
      (wallet) => wallet.address !== address,
    );

    setWallets(updatedWallets);
  };

  const onRevealXPriv = async (hiddenXPriv: NewWallet["xprivSealed"]) => {
    if (selectedWallet?.xpriv === "hidden") {
      try {
        const response = await revealXPriv(hiddenXPriv);

        if (response) {
          const xpriv = (selectedWallet.xpriv = response);
          const updatedWallet = { ...selectedWallet, xpriv };

          setSelectedWallet(updatedWallet);
        }
      } catch (error) {
        if (error instanceof Error) {
          toast({
            title: `Could reveal wallet private key`,
            description: error.message as string,
          });
        }
      }
    } else {
      const updatedWallet = { ...selectedWallet!, xpriv: "hidden" };
      setSelectedWallet(updatedWallet);
    }
  };

  if (wallets.length === 0) {
    return (
      <Card className="flex size-full h-fit flex-col items-center justify-center border-0 bg-brand-olive-200/20 p-4">
        <WalletEmpty onCreateNewWallet={onCreateNewWallet} />
      </Card>
    );
  }

  return (
    <div className="w-full">
      <h2 className="font-bold">
        Your Wallets ({`${wallets.length}/${MAX_WALLETS_ALLOWED}`})
      </h2>
      <Card className="flex size-full h-fit flex-col items-center justify-center border-0 bg-brand-olive-200/20 p-4">
        <div className="grid size-full grid-cols-1 gap-4 md:gap-y-8 lg:grid-flow-col lg:grid-cols-5">
          <div className="col-span-1 flex flex-col justify-center lg:col-span-3">
            <WalletSelector
              wallets={wallets}
              selectedWallet={selectedWallet}
              onSelectWallet={onSelectWallet}
              onCreateNewWallet={onCreateNewWallet}
            />
          </div>
          <div className="col-span-1 lg:col-span-2">
            <WalletInfo
              onSelectWallet={onSelectWallet}
              onDeleteWallet={onDeleteWallet}
              selectedWallet={selectedWallet}
              onRevealXPriv={onRevealXPriv}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WalletGenerator;
