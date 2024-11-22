import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
} from "@/components/ui/table";
import { Icon } from "@iconify-icon/react";
import { useStateContext } from "../context/StateHandler";
import { DetailLabels as Headers, formatForTable } from "@/lib/utils";
import QRCodeDialog from "./dialog";
import { PaymentTableData, QRCodeDialogData } from "@/lib/types";
import TableContent from "./content";

const EmptyUI = () => (
  <div className="my-8 flex w-full flex-col items-center rounded-md border bg-slate-300/80 p-4 text-slate-700/80">
    <Icon icon="mynaui:sad-square-solid" className="text-6xl" />
    <p className="text-center text-xl italic">
      You don't have any payment requests.
      <br /> Select a wallet and create your first one!
    </p>
  </div>
);

const PaymentsTable = () => {
  const { wallets } = useStateContext();
  const [openQRCodeDialog, setOpenQRCodeDialog] = useState(false);
  const [selectedQRCode, setSelectedQRCode] = useState<QRCodeDialogData>(null);

  const tableData = formatForTable(wallets);

  const onShowQR = (dialogInfo: PaymentTableData[number]["dialogData"]) => {
    setSelectedQRCode(dialogInfo);
    setOpenQRCodeDialog(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { label, message, uri, ...TableHeaders } = Headers;

  return (
    <>
      <div className="w-full 2xl:w-9/12">
        <h2 className="font-bold">Your Payment Requests</h2>
        {tableData.length ? (
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
            <TableBody>
              <TableContent tableData={tableData} onShowQR={onShowQR} />
            </TableBody>
          </Table>
        ) : (
          <EmptyUI />
        )}
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
