import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";

import { Button } from "../ui/button";
import { PaymentTableData } from "@/lib/types";

const TableContent = ({
  onShowQR,
  tableData,
}: {
  onShowQR: (arg: PaymentTableData[number]["dialogData"]) => void;
  tableData: PaymentTableData;
}) => (
  <>
    {tableData.map(({ cellData, dialogData }, rowIndex) => (
      <TableRow key={rowIndex}>
        {Object.values(cellData).map((data, cellIndex) => (
          <TableCell key={cellIndex} className="font-medium">
            {data || ""}
          </TableCell>
        ))}
        <TableCell className="text-right font-medium">
          <Button onClick={() => onShowQR(dialogData)}>See Code</Button>
        </TableCell>
      </TableRow>
    ))}
  </>
);

export default TableContent;
