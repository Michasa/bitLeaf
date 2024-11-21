
export interface SessionData {
  mnemonic: string
  seed: string;
  pathIndex: number
}
export interface NewWallet {
  created: Date
  address: string
  xpriv: "hidden" | string
  xprivSealed: string
}


export interface UseMnemonic {
  revealLoading: boolean;
  mnemonicPhrase: string | null;
  onRevealMasterKey: () => void;
  handleCopy: (
    copyItem: string,
    toastMessage: { title: string; description?: string }
  ) => void
}
