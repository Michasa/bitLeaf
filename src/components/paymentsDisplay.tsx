import { cn } from "@/lib/utils";
import React from "react";

const PaymentFigures = ({
  number,
  label,
}: {
  number: number;
  label: string;
}) => (
  <div
    className={cn(
      "flex flex-col items-center justify-center rounded-md border-2 border-brand-dark bg-brand-dark/70 p-2 font-orbitron text-white",
    )}
  >
    <span className="block text-lg">{number} </span>
    <span className="block text-xs">{label}</span>
  </div>
);

const PaymentsDisplay = ({
  pending,
  completed,
}: {
  pending: number;
  completed: number;
}) => {
  return (
    <div className="grid auto-cols-fr grid-flow-col justify-evenly gap-x-2 font-semibold">
      <PaymentFigures number={pending} label="Pending" />
      <PaymentFigures number={completed} label="Completed" />
    </div>
  );
};

export default PaymentsDisplay;
