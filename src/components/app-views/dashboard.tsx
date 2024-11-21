"use client";
import React, { useEffect, useState } from "react";
import MnemonicCard from "../MnemonicCard";
import WalletGenerator from "../WalletGenerator/index";
import Title from "../Title";
import { ErrorHandlerProvider } from "../context/ErrorHandler";
import { StateHandlerProvider } from "../context/StateHandler";
import { Dialog } from "../ui/dialog";
import PaymentDialog from "./payment-dialog";

const StartDashboard = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Title />
      <ErrorHandlerProvider>
        <StateHandlerProvider>
          <div className="flex w-full flex-col items-center gap-y-4">
            <Dialog>
              <MnemonicCard />
              <WalletGenerator />
              <PaymentDialog />
            </Dialog>
          </div>
        </StateHandlerProvider>
      </ErrorHandlerProvider>
    </>
  );
};

export default StartDashboard;
