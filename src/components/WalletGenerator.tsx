import { createXWallet, revealXPriv } from "@/app/actions"
import { NewWallet } from "@/lib/types"
import React, { useState } from "react"

const MAX_WALLETS_ALLOWED = 5

const WalletGenerator = () => {
  const [wallets, setWallets] = useState<[] | NewWallet[]>([])

  const onCreateNewWallet = async () => {
    if (wallets.length < MAX_WALLETS_ALLOWED) {
      const newWallet = await createXWallet()

      if (newWallet) {
        setWallets([...wallets, newWallet])
      }
    } else {
      //TODO TOAST about too many wallets
      console.error("too many wallets plz delete one")
    }
  }

  const onRevealXPriv = async (index: number, hiddenXPriv: string) => {
    const updatingWallet = Array.from(wallets)
    console.log("hello")
    if (updatingWallet[index].xpriv === "hidden") {
      const response = await revealXPriv(hiddenXPriv)

      //TODO mutate object properly, its causing duplications
      if (response) {
        updatingWallet[index].xpriv = response
        console.log(updatingWallet)
        setWallets(updatingWallet)
      }
    } else {
      updatingWallet[index].xpriv = "hidden"
      setWallets(updatingWallet)
    }
  }

  return (
    <div>
      <h2>New Wallets</h2>
      <button onClick={onCreateNewWallet}>Create a New Wallet</button>
      <ol>
        {wallets.map((wallet, index) => {
          return (
            <li key={index} className="border-2 border-blue-500 m-4">
              <div>
                <p className="address">Public Key: {wallet.address}</p>
                <span>
                  Private Key:
                  <p className="address">{wallet.xpriv}</p>
                  <button
                    className="mt-4"
                    onClick={() => onRevealXPriv(index, wallet.xprivSealed)}
                  >
                    {wallet.xpriv === "hidden" ? "Click to Reveal" : "Hide"}
                  </button>
                </span>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default WalletGenerator
