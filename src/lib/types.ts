
export interface SessionData {
  mnemonic: string
  seed: string;
  pathIndex: number
}
export interface NewWallet {
  address: string //public address to recieve funds
  xpriv: "hidden" | string //will be sent hidden unless user requests to see it
  xprivSealed: string //sealed version of xpriv decrypted on server
}
export type GenerateMasterKey = { setUpSuccess: true; failureReason: null } | { setUpSuccess: false; failureReason: string }
