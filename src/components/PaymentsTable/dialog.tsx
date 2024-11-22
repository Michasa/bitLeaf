import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import QRCode from "react-qr-code";
import { QRCodeDialogData } from "@/lib/types";

const QRCodeDialog = ({
  open,
  onOpenChange,
  selectedQRCode,
}: {
  selectedQRCode: QRCodeDialogData;
  open: boolean;
  onOpenChange: (arg: boolean) => void;
}) => {
  if (selectedQRCode === null) {
    return;
  }
  const { uri, ...rest } = selectedQRCode;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex h-fit w-11/12 flex-col overflow-hidden rounded-md lg:w-8/12 xl:h-fit"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="!mb-0">Payment QR Code!</DialogTitle>
          <DialogDescription>Share this to recieve payment </DialogDescription>
        </DialogHeader>{" "}
        <div className="flex flex-col items-center justify-center gap-y-2 bg-white p-4">
          <QRCode className="size-60" value={uri as string} />
          {Object.entries(rest).map(([key, value]) => (
            <div key={key} className="flex w-full flex-col">
              <b>{key}</b>
              <span className="text-wrap rounded-md border border-brand-olive-400 bg-white p-2">
                {value ? value : <i> None added</i>}
              </span>
            </div>
          ))}{" "}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeDialog;
