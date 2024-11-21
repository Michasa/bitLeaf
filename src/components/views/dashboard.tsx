"use client";
import React, { useState } from "react";
import MnemonicCard from "../MnemonicCard";
import WalletGenerator from "../WalletGenerator/index";
import Title from "../Title";
import { ErrorHandlerProvider } from "../context/ErrorHandler";
import { StateHandlerProvider } from "../context/StateHandler";
import PaymentDialog from "./payment-dialog";

const StartDashboard = () => {
  const [openPaymentDialog, setOpenPaymentDialog] = useState<boolean>(false);

  return (
    <>
      <Title />
      <ErrorHandlerProvider>
        <StateHandlerProvider>
          <div className="flex w-full flex-col items-center gap-y-4">
            <MnemonicCard />
            <WalletGenerator setOpenPaymentDialog={setOpenPaymentDialog} />
            <PaymentDialog
              openPaymentDialog={openPaymentDialog}
              setOpenPaymentDialog={setOpenPaymentDialog}
            />
          </div>
        </StateHandlerProvider>
      </ErrorHandlerProvider>
    </>
  );
};

export default StartDashboard;
