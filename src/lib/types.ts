
export interface SessionData {
  mnemonic: string
  seed: string;
  pathIndex: number
}
export interface NewWallet {
  created: Date
  address: string //public address to recieve funds
  xpriv: "hidden" | string //will be sent hidden unless user requests to see it
  xprivSealed: string //sealed version of xpriv decrypted on server
  payments: Payment[] | []
}

export interface Payment {
  recipientAddress: string
  amount: number
  label: string
  date: Date
  isPaid: boolean
}

export interface UseMnemonic {
  revealLoading: boolean;
  mnemonicPhrase: string | null;
  onRevealMasterKey: () => void;
}

