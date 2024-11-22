import { toast } from "@/hooks/use-toast";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { SavedPayment, SubmittedPaymentForm, Wallet, PaymentTableData } from "./types";
import DOMPurify from "isomorphic-dompurify";
import tinydate from "tinydate";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function handleCopy(
  copyItem: string,
  toastMessage: { title: string; description?: string },
) {
  try {
    await navigator.clipboard?.writeText(copyItem);
    return toast(toastMessage);
  } catch (error) {
    if (error)
      return toast({
        title: "Could not copy",
      });
  }
};

export const sanitizeAndEncodeValues = (
  values: SubmittedPaymentForm,
): SubmittedPaymentForm => {
  return Object.keys(values).reduce((acc, key) => {
    const value = values[key as keyof SubmittedPaymentForm];
    let sanitizedValue = value;

    if (typeof value === "string") {
      sanitizedValue = DOMPurify.sanitize(value);

      if (key !== "address") {
        sanitizedValue = encodeURIComponent(sanitizedValue);
      }
    }

    return { ...acc, [key]: sanitizedValue };
  }, {} as SubmittedPaymentForm);
};

export const createPaymentURI = (values: SubmittedPaymentForm) => {
  const main = `bitcoin:${values.address}?amount=${values.amount}`
  const label = values.label ? `&label=${values.label}` : ''
  const message = values.message ? `&message=${values.message}` : ''

  return main + label + message
}

export const TimestampTemplate = tinydate("{DD}/{MM}/{YY} at {HH}:{mm}:{ss}");

type PaymentValue = string | number | boolean | Date;
type ValueHandler = (value: PaymentValue) => string;

export const DetailLabels: Record<keyof SavedPayment, string> = {
  address: "Receiving Wallet Address",
  amount: "Amount (BTC)",
  label: "Payment Request Label",
  message: "Payment Message",
  created: "Created",
  paid: "Payment Received?",
  uri: "uri",
}

const valueHandlers: Partial<Record<keyof SavedPayment, ValueHandler>> = {
  label: (value) => decodeURIComponent(value as string),
  message: (value) => decodeURIComponent(value as string),
  created: (value) => TimestampTemplate(value as Date),
  paid: (value) => String(value).toUpperCase(),
};

const defaultHandler: ValueHandler = (value) => String(value);

export const formatForDisplay = (paymentInfo: Partial<SavedPayment>): Record<keyof typeof DetailLabels, string> => {
  return Object.entries(paymentInfo).reduce<Record<string, string>>((acc, [key, value]) => {
    const typedKey = key as keyof SavedPayment;
    const displayLabel = DetailLabels[typedKey];

    const handler = valueHandlers[typedKey] || defaultHandler;

    acc[displayLabel] = handler(value);
    return acc;
  }, {});
};

export const calculatePayments = (payments: Wallet['payments']): { completed: number; pending: number } => {
  const completed = payments.filter(({ paid }) => paid).length;
  const pending = payments.length - completed;

  return {
    completed: Number(completed),
    pending: Number(pending),
  };
};

export const formatForTable = (wallets: Wallet[]): [] | PaymentTableData => {
  if (wallets.length === 0) {
    return [];
  }

  const allPayments = wallets.reduce(
    (acc, wallet) => {
      return [...acc, ...wallet.payments];
    },
    [] as Wallet["payments"],
  );

  if (allPayments.length === 0) {
    return [];
  }

  return allPayments.map((payment) => {
    const { address, amount, created, paid, ...dialogData } = payment;

    return {
      cellData: formatForDisplay({ address, amount, created, paid }),
      dialogData: formatForDisplay({ address, amount, ...dialogData }),
    };
  });
};




