import React from "react";
import { Button } from "../ui/button";
import { SavedPayment } from "@/lib/types";

type QRCodeShare = {
  createdPayment: SavedPayment | null;
  setOpenPaymentDialog: (arg: boolean) => void;
};

const QRCodeShare = ({ createdPayment, setOpenPaymentDialog }: QRCodeShare) => {
  return (
    <div>
      <div className="flex">
        {JSON.stringify(createdPayment)}
        <Button onClick={() => setOpenPaymentDialog(false)}>Close</Button>
      </div>
    </div>
  );
};

export default QRCodeShare;
