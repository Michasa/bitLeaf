import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icon } from "@iconify-icon/react";
import { useStateContext } from "../context/StateHandler";
import { DetailLabels, formatForDisplay } from "@/lib/utils";
import { Button } from "../ui/button";
import QRCodeDialog from "./dialog";
import { QRCodeDialogData, SavedPayment } from "@/lib/types";
import useWebSocket from "@/hooks/use-websocket";

const EmptyUI = () => (
  <>
    <Icon icon="fa6-solid:seedling" className="text-6xl text-brand-olive-300" />
    <p className="text-center text-xl italic text-slate-500">
      You don't have any payment requests.
      <br /> Select a wallet and create your first one!
    </p>
  </>
);

const PaymentsTable = () => {
  useWebSocket();
  const { wallets } = useStateContext();
  const [openQRCodeDialog, setOpenQRCodeDialog] = useState(false);
  const [selectedQRCode, setSelectedQRCode] = useState<QRCodeDialogData>(null);

  const totalPayments = wallets.length
    ? wallets.map((wallet) =>
        wallet.payments.map((payment) => {
          const { label, message, uri, recipientAddress, amount, ...rest } =
            payment;
          const dialogInfo = formatForDisplay({
            recipientAddress,
            amount,
            label,
            message,
            uri,
          });
          const tableInfo = formatForDisplay({
            recipientAddress,
            amount,
            ...rest,
          });

          return {
            tableInfo,
            dialogInfo,
          };
        }),
      )
    : 0;

  const onShowQR = (
    dialogInfo: Pick<SavedPayment, "uri" | "label" | "message">,
  ) => {
    setSelectedQRCode(dialogInfo);
    setOpenQRCodeDialog(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { label, message, uri, ...TableHeaders } = DetailLabels;

  return (
    <>
      <div className="w-full 2xl:w-9/12">
        <h2 className="font-bold">Your Payment Requests</h2>
        <Table className="w-full border-separate border-spacing-x-1 bg-brand-olive-100/30">
          <TableHeader>
            <TableRow className="*:bg-brand-olive-400 *:text-white">
              {Object.values(TableHeaders).map((header) => (
                <TableHead key={header}>{header}</TableHead>
              ))}
              <TableHead className="bg-brand-olive-600 text-center text-white">
                Request QRCode
              </TableHead>
            </TableRow>
          </TableHeader>
          {totalPayments === 0 ? (
            <TableCaption className="my-8 w-full grayscale">
              <EmptyUI />
            </TableCaption>
          ) : (
            <TableBody>
              {totalPayments.map((walletPayments, walletIndex) =>
                walletPayments.map(
                  ({ tableInfo, dialogInfo }, paymentIndex) => (
                    <TableRow key={`${walletIndex}-${paymentIndex}`}>
                      {Object.values(tableInfo).map(
                        (detail, index) =>
                          detail && (
                            <TableCell key={index} className="font-medium">
                              {detail}
                            </TableCell>
                          ),
                      )}
                      <TableCell className="font-medium">
                        <Button onClick={() => onShowQR(dialogInfo)}>
                          See Code
                        </Button>
                      </TableCell>
                    </TableRow>
                  ),
                ),
              )}
            </TableBody>
          )}
        </Table>
      </div>
      <QRCodeDialog
        selectedQRCode={selectedQRCode}
        open={openQRCodeDialog}
        onOpenChange={setOpenQRCodeDialog}
      />
    </>
  );
};

export default PaymentsTable;
