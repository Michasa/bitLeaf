import React from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PaymentsFlow from "../Payments";
import { useStateContext } from "../context/StateHandler";

const PaymentDialog = () => {
  const { selectedWallet, wallets } = useStateContext();

  return (
    <DialogContent
      className="w-11/12 rounded-md lg:w-8/12"
      onInteractOutside={(e) => e.preventDefault()}
    >
      <DialogHeader>
        <DialogTitle className="!mb-0">Payment Request</DialogTitle>
        <DialogDescription className="!mb-4">
          Create a payment request and share it as a QR Code to recieve it!
        </DialogDescription>
      </DialogHeader>
      <PaymentsFlow selectedWallet={selectedWallet} wallets={wallets} />
    </DialogContent>
  );
};

export default PaymentDialog;
