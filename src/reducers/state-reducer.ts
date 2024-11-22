import { Wallet } from "@/lib/types";

export enum Actions {
  ADD_WALLET = "ADD_WALLET",
  UPDATE_WALLET = "UPDATE_WALLET",
  DELETE_WALLET = "DELETE_WALLET",
  SELECTED_WALLET = 'SELECTED_WALLET'
}

export type ReducerState = {
  wallets: Wallet[];
  selectedWallet: Wallet | null;
};

export const initialState: ReducerState = {
  wallets: [],
  selectedWallet: null,
};

type Action =
  | { type: Actions.ADD_WALLET; payload: Wallet }
  | { type: Actions.UPDATE_WALLET; payload: Wallet }
  | { type: Actions.DELETE_WALLET; payload: Wallet }
  | { type: Actions.SELECTED_WALLET; payload: Wallet | null };

export const stateReducer = (state: ReducerState, action: Action): ReducerState => {
  switch (action.type) {
    case Actions.ADD_WALLET:
      return { ...state, wallets: [...state.wallets, action.payload] };

    case Actions.UPDATE_WALLET:
      if (!action.payload) return state;
      return {
        ...state,
        wallets: state.wallets.map(wallet =>
          wallet.address === action.payload.address ? { ...wallet, ...action.payload } : wallet
        ),
      };

    case Actions.DELETE_WALLET:
      return {
        ...state,
        wallets: state.wallets.filter(wallet => wallet.address !== action.payload.address),
      };

    case Actions.SELECTED_WALLET:
      return {
        ...state,
        selectedWallet: action.payload,
      };

    default:
      throw new Error("Unknown Action");
  }
};
