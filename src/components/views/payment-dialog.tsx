import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PaymentsFlow from "../Payments";
import { useStateContext } from "../context/StateHandler";

type PaymentDialog = {
  openPaymentDialog: boolean;
  setOpenPaymentDialog: (arg: boolean) => void;
};

const PaymentDialog = ({
  openPaymentDialog,
  setOpenPaymentDialog,
}: PaymentDialog) => {
  const { selectedWallet, wallets, onUpdateWallet } = useStateContext();

  return (
    <Dialog open={openPaymentDialog} onOpenChange={setOpenPaymentDialog}>
      <DialogContent
        className="flex h-full max-h-[80%] w-11/12 flex-col overflow-hidden rounded-md lg:w-8/12 xl:h-fit"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="!mb-0">Payment Request Creator</DialogTitle>
          <DialogDescription className="!mb-4">
            Create a payment request and share it as a QR Code with your
            friends!
          </DialogDescription>
        </DialogHeader>{" "}
        <PaymentsFlow
          onUpdateWallet={onUpdateWallet}
          setOpenPaymentDialog={setOpenPaymentDialog}
          selectedWallet={selectedWallet}
          wallets={wallets}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
