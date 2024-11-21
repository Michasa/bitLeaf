import React, { useRef } from "react";
import WalletMobile from "./walletSelectorMobile";
import WalletDesktop from "./walletSelectorDesktop";
import { Button } from "../ui/button";
import { useMediaQuery } from "react-responsive";
import { Icon } from "@iconify-icon/react";
import { MAX_WALLETS_ALLOWED } from "@/lib/constants";
import { StateHandler } from "../context/StateHandler";

export type WalletSelector = Pick<
  StateHandler,
  | "wallets"
  | "selectedWallet"
  | "onCreateNewWallet"
  | "onSelectWallet"
  | "loadingNewWallet"
>;

const WalletSelector = ({
  wallets,
  selectedWallet,
  onSelectWallet,
  onCreateNewWallet,
  loadingNewWallet,
}: WalletSelector) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const ref = useRef<HTMLUListElement>(null);

  const TOO_MANY_WALLETS = wallets.length === MAX_WALLETS_ALLOWED;

  return (
    <>
      {" "}
      {isMobile ? (
        <WalletMobile
          wallets={wallets}
          selectedWallet={selectedWallet}
          onSelectWallet={onSelectWallet}
        />
      ) : (
        <WalletDesktop
          ref={ref}
          wallets={wallets}
          selectedWallet={selectedWallet}
          onSelectWallet={onSelectWallet}
        />
      )}
      <Button
        className="my-4 self-center justify-self-center disabled:bg-gray-100 disabled:text-black"
        disabled={TOO_MANY_WALLETS || loadingNewWallet}
        onClick={async () => {
          const wallet = await onCreateNewWallet();
          if (wallet && ref.current !== null) {
            setTimeout(() => {
              (ref.current as HTMLElement).scrollLeft = ref.current
                ?.scrollWidth as number;
            }, 50);
          }
        }}
      >
        {loadingNewWallet ? (
          <>
            <Icon className="animate-spin" icon="ri:loader-fill" />
            Loading
          </>
        ) : (
          <>
            <Icon icon="fa6-solid:seedling" className="text-xl" />
            Create a New Wallet
          </>
        )}
      </Button>
      {TOO_MANY_WALLETS && (
        <div className="flex items-center gap-x-2 self-center rounded-md bg-white p-2">
          <Icon icon="si:warning-duotone" className="text-xl text-amber-500" />
          <span className="text-base">
            Max wallets created! Delete an existing wallet in-order to create a
            new one
          </span>
        </div>
      )}
    </>
  );
};

export default WalletSelector;
