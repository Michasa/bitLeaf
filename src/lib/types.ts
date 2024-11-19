
export interface SessionData {
  mnemonic: string
  seed: string;
  pathIndex: number
}
export interface NewWallet {
  created: number
  address: string //public address to recieve funds
  xpriv: "hidden" | string //will be sent hidden unless user requests to see it
  xprivSealed: string //sealed version of xpriv decrypted on server
}
