import { createContext, ReactNode, useContext, useState } from "react";
import { SavedPayment, Wallet } from "@/lib/types";
import { createXWallet, revealXPriv } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

export interface StateHandler {
  wallets: Wallet[];
  selectedWallet: Wallet | null;
  loadingNewWallet: boolean;
  loadingRevealXPriv: boolean;
  onSelectWallet: (arg: Wallet["address"] | null) => void;
  onCreateNewWallet: () => Promise<Wallet | undefined>;
  onDeleteWallet: (arg: Wallet["address"]) => void;
  onRevealXPriv: (arg: Wallet["xprivSealed"]) => void;
  onAddPayment: (arg: SavedPayment) => void;
}

const StateHandler = createContext<StateHandler | undefined>(undefined);

export const StateHandlerProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const { toast } = useToast();

  const [wallets, setWallets] = useState<[] | Wallet[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [loadingNewWallet, setLoadingNewWallet] = useState<boolean>(false);
  const [loadingRevealXPriv, setLoadingRevealXPriv] = useState<boolean>(false);

  const onCreateNewWallet = async () => {
    try {
      setLoadingNewWallet(true);
      const newWallet = await createXWallet();

      if (newWallet) {
        setWallets([...wallets, newWallet]);

        toast({
          title: `New Wallet Created: ${newWallet.address.slice(0, 15)}...`,
          description: "Select it for more options",
          duration: 2500,
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
    } finally {
      setLoadingNewWallet(false);
    }
  };

  const onSelectWallet = (choice: Wallet["address"] | null) => {
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

  const onDeleteWallet = (address: Wallet["address"]) => {
    //TODO add warning diaglog
    if (address === selectedWallet?.address) {
      setSelectedWallet(null);
    }

    const updatedWallets = wallets.filter(
      (wallet) => wallet.address !== address,
    );

    if (updatedWallets) {
      setWallets(updatedWallets);
      toast({
        title: `Wallet ${address.slice(0, 15)}... deleted!`,
      });
    } else {
      toast({
        title: "Deletion failed",
        description: `${address.slice(0, 15)}... wasn't found!`,
      });
    }
  };

  const onRevealXPriv = async (hiddenXPriv: Wallet["xprivSealed"]) => {
    if (selectedWallet?.xpriv === "hidden") {
      try {
        setLoadingRevealXPriv(true);
        const response = await revealXPriv(hiddenXPriv);

        if (response) {
          const updatedWallet = { ...selectedWallet, xpriv: response };
          setSelectedWallet(updatedWallet);
        }
      } catch (error) {
        if (error instanceof Error) {
          toast({
            title: `Couldn't reveal wallet private key.`,
            description: error.message as string,
          });
        }
      } finally {
        setLoadingRevealXPriv(false);
      }
    } else {
      const updatedWallet = { ...selectedWallet!, xpriv: "hidden" };
      setSelectedWallet(updatedWallet);
    }
  };

  const onAddPayment = (newPayment: SavedPayment) => {
    const walletCopy: Wallet[] = [...wallets];

    const index = walletCopy.findIndex(
      (wallet) => wallet.address === newPayment.recipientAddress,
    );

    if (index === -1) {
      toast({
        title: "Payment Error",
        description: "Could not find the recipient wallet",
      });
      return;
    }

    walletCopy[index] = {
      ...walletCopy[index],
      payments: [...walletCopy[index].payments, newPayment],
    };

    setWallets(walletCopy);

    if (selectedWallet?.address === newPayment.recipientAddress) {
      setSelectedWallet(walletCopy[index]);
    }
  };

  return (
    <StateHandler.Provider
      value={{
        wallets,
        selectedWallet,
        loadingNewWallet,
        loadingRevealXPriv,
        onCreateNewWallet,
        onSelectWallet,
        onDeleteWallet,
        onRevealXPriv,
        onAddPayment,
      }}
    >
      {children}
    </StateHandler.Provider>
  );
};

export const useStateContext = (): StateHandler => {
  const context = useContext(StateHandler);

  return context!;
};
