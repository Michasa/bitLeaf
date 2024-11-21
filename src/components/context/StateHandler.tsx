import { createContext, ReactNode, useContext, useState } from "react";
import { NewWallet } from "@/lib/types";
import { createXWallet, revealXPriv } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

export interface StateHandler {
  wallets: NewWallet[];
  selectedWallet: NewWallet | null;
  loadingNewWallet: boolean;
  loadingRevealXPriv: boolean;
  onSelectWallet: (arg: NewWallet["address"] | null) => void;
  onCreateNewWallet: () => Promise<NewWallet | undefined>;
  onDeleteWallet: (arg: NewWallet["address"]) => void;
  onRevealXPriv: (arg: NewWallet["xprivSealed"]) => void;
}

const StateHandler = createContext<StateHandler | undefined>(undefined);

export const StateHandlerProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const { toast } = useToast();

  const [wallets, setWallets] = useState<[] | NewWallet[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<NewWallet | null>(null);
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

  const onRevealXPriv = async (hiddenXPriv: NewWallet["xprivSealed"]) => {
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

  // const onUpdateWallet = () => {};

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
