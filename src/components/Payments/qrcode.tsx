import React from "react";
import { Button } from "../ui/button";
import { PageType, SavedPayment } from "@/lib/types";
import QRCode from "react-qr-code";
import { PAGES } from ".";
import { formatForDisplay } from "@/lib/utils";

type QRCodeShareProps = {
  createdPayment: SavedPayment | null;
  setOpenPaymentDialog: (arg: boolean) => void;
  setPage: (arg: PageType) => void;
};

const QRCodeShare = ({
  createdPayment,
  setOpenPaymentDialog,
  setPage,
}: QRCodeShareProps) => {
  if (!createdPayment) {
    setPage(PAGES[0]);
    return null;
  }

  const displayInfo = formatForDisplay({ ...createdPayment });
  const { uri, ...otherDetails } = displayInfo;

  return (
    <div className="flex size-full flex-col gap-y-2 p-2">
      <div className="flex flex-col *:flex-1 lg:flex-row">
        <div className="flex justify-center bg-white p-4 *:size-60">
          <QRCode value={uri as string} />
        </div>
        <div className="flex items-center justify-center">
          <p className="text-center text-2xl font-bold text-brand-olive-600">
            Send this QR Code to your friends
          </p>
        </div>
      </div>
      <div className="">
        <p className="text-center text-2xl font-bold text-brand-olive-600">
          Request Details
        </p>
        <div className="h-44 overflow-y-auto p-4">
          {Object.entries(otherDetails).map(([key, value], index) => {
            return (
              value && (
                <div key={index} className="flex flex-col">
                  <b>{key}</b>
                  <span className="text-wrap rounded-md border border-brand-olive-400 bg-white p-2">
                    {value}
                  </span>
                </div>
              )
            );
          })}
        </div>
      </div>
      <Button
        className="flex w-1/2 self-center"
        onClick={() => setOpenPaymentDialog(false)}
      >
        Close
      </Button>
    </div>
  );
};

export default QRCodeShare;
