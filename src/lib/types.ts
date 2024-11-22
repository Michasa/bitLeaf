import { DetailLabels } from "./utils";

export interface SessionData {
  mnemonic: string
  seed: string;
  pathIndex: number
}
export interface Wallet {
  created: Date
  address: string //public address to recieve funds
  xpriv: "hidden" | string //will be sent hidden unless user requests to see it
  xprivSealed: string //sealed version of xpriv decrypted on server
  payments: SavedPayment[] | []
}

export interface UseMnemonic {
  revealLoading: boolean;
  mnemonicPhrase: string | null;
  onRevealMasterKey: () => void;
}

export interface SubmittedForm {
  recipientAddress: string;
  amount: number;
  label?: string | undefined;
  message?: string | undefined;
};

export enum PageType {
  ERROR = "ERROR",
  FORM = "FORM",
  QR_CODE = "QR_CODE",
}

export enum ReducerAction {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE'
}

export interface SavedPayment extends SubmittedForm {
  created: Date;
  paid: false;
  uri: string;
}

export type QRCodeDialogData = Partial<
  Record<
    Extract<(typeof DetailLabels)[keyof typeof DetailLabels], string>,
    string
  >
> | null;
