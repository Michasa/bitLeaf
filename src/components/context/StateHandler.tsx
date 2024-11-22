import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  useState,
} from "react";
import { Wallet } from "@/lib/types";
import { createXWallet, revealXPriv } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import {
  Actions,
  initialState,
  ReducerState,
  stateReducer,
} from "@/reducers/state-reducer";

export interface StateHandler extends ReducerState {
  loadingNewWallet: boolean;
  loadingRevealXPriv: boolean;
  onCreateWallet: () => Promise<Wallet | undefined>;
  onSelectWallet: (arg: Wallet | null) => void;
  onDeleteWallet: (arg: Wallet) => void;
  onRevealXPriv: (arg: Wallet) => void;
  onUpdateWallet: (arg: Wallet) => void;
}

const StateHandler = createContext<StateHandler | undefined>(undefined);

export const StateHandlerProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const { toast } = useToast();

  const [state, dispatch] = useReducer(stateReducer, initialState);

  //Just Loaders
  const [loadingNewWallet, setLoadingNewWallet] = useState<boolean>(false);
  const [loadingRevealXPriv, setLoadingRevealXPriv] = useState<boolean>(false);

  const onCreateWallet = async () => {
    try {
      setLoadingNewWallet(true);
      const newWallet = await createXWallet();

      if (newWallet) {
        // setWallets([...wallets, newWallet]);
        dispatch({ type: Actions.ADD_WALLET, payload: newWallet });

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
  const onUpdateWallet = (wallet: Wallet) => {
    dispatch({ type: Actions.UPDATE_WALLET, payload: wallet });
  };
  const onDeleteWallet = (wallet: Wallet) => {
    if (wallet.address === state.selectedWallet?.address) {
      dispatch({ type: Actions.SELECTED_WALLET, payload: null });
    }

    const toDeleteWallet = state.wallets.filter(
      (_wallet) => _wallet.address !== wallet.address,
    );

    if (toDeleteWallet) {
      //TODO add warning diaglog about deleting wallet
      dispatch({ type: Actions.DELETE_WALLET, payload: wallet });
      toast({
        title: `Wallet ${wallet.address.slice(0, 15)}... deleted!`,
      });
    } else {
      toast({
        title: "Deletion failed",
        description: `${wallet.address.slice(0, 15)}... wasn't found!`,
      });
    }
  };
  const onSelectWallet = (wallet: Wallet | null) => {
    if (wallet === null) {
      dispatch({
        type: Actions.SELECTED_WALLET,
        payload: null,
      });
      return;
    }

    const selectedWallet = state.wallets.find(
      (_wallet) => _wallet.address === wallet.address,
    );

    if (!selectedWallet) {
      return toast({
        title: `Wallet not found!`,
      });
    }
    dispatch({
      type: Actions.SELECTED_WALLET,
      payload: selectedWallet,
    });
  };

  const onRevealXPriv = async (wallet: Wallet) => {
    if (state.selectedWallet?.xpriv === "hidden") {
      try {
        setLoadingRevealXPriv(true);
        const response = await revealXPriv(wallet.xprivSealed);

        if (response) {
          const wallet = { ...state.selectedWallet, xpriv: response };
          dispatch({
            type: Actions.SELECTED_WALLET,
            payload: wallet,
          });
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
      const wallet = { ...state.selectedWallet!, xpriv: "hidden" };
      dispatch({
        type: Actions.SELECTED_WALLET,
        payload: wallet,
      });
    }
  };

  return (
    <StateHandler.Provider
      value={{
        wallets: state.wallets,
        selectedWallet: state.selectedWallet,
        loadingNewWallet,
        loadingRevealXPriv,
        onCreateWallet,
        onSelectWallet,
        onDeleteWallet,
        onRevealXPriv,
        onUpdateWallet,
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
