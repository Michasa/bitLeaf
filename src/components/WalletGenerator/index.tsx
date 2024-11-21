import React from "react";
import { Card } from "../ui/card";
import { MAX_WALLETS_ALLOWED } from "@/lib/constants";
import WalletSelector from "./WalletSelector";
import WalletInfo from "./WalletInfo";
import WalletEmpty from "./emptyUI/Wallet";
import { useStateContext } from "../context/StateHandler";

const WalletGenerator = () => {
  const {
    wallets,
    selectedWallet,
    loadingNewWallet,
    loadingRevealXPriv,
    onCreateNewWallet,
    onSelectWallet,
    onDeleteWallet,
    onRevealXPriv,
    handleCopy,
  } = useStateContext();

  if (wallets.length === 0) {
    return (
      <Card className="flex size-full h-fit flex-col items-center justify-center border-0 bg-brand-olive-200/20 p-4">
        <WalletEmpty
          onCreateNewWallet={onCreateNewWallet}
          loadingNewWallet={loadingNewWallet}
        />
      </Card>
    );
  }

  return (
    <div className="w-full">
      <h2 className="font-bold">
        Your Wallets ({`${wallets.length}/${MAX_WALLETS_ALLOWED}`})
      </h2>
      <Card className="flex size-full h-fit flex-col items-center justify-center border-0 bg-brand-olive-300/20 p-4">
        <div className="grid size-full grid-cols-1 gap-4 md:gap-y-8 lg:grid-flow-col lg:grid-cols-5">
          <div className="col-span-1 flex flex-col justify-center lg:col-span-3">
            <WalletSelector
              wallets={wallets}
              selectedWallet={selectedWallet}
              onSelectWallet={onSelectWallet}
              onCreateNewWallet={onCreateNewWallet}
              loadingNewWallet={loadingNewWallet}
            />
          </div>
          <div className="col-span-1 lg:col-span-2">
            <WalletInfo
              onSelectWallet={onSelectWallet}
              onDeleteWallet={onDeleteWallet}
              selectedWallet={selectedWallet}
              onRevealXPriv={onRevealXPriv}
              loadingRevealXPriv={loadingRevealXPriv}
              handleCopy={handleCopy}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WalletGenerator;
