import { toast } from "@/hooks/use-toast";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { SavedPayment, SubmittedForm, Wallet } from "./types";
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
  values: SubmittedForm,
): SubmittedForm => {
  return Object.keys(values).reduce((acc, key) => {
    const value = values[key as keyof SubmittedForm];
    let sanitizedValue = value;

    if (typeof value === "string") {
      sanitizedValue = DOMPurify.sanitize(value);

      if (key !== "recipientAddress") {
        sanitizedValue = encodeURIComponent(sanitizedValue);
      }
    }

    return { ...acc, [key]: sanitizedValue };
  }, {} as SubmittedForm);
};

export const createPaymentURI = (values: SubmittedForm) => {
  const main = `bitcoin:${values.recipientAddress}?amount=${values.amount}`
  const label = values.label ? `&label=${values.label}` : ''
  const message = values.message ? `&message=${values.message}` : ''

  return main + label + message
}

export const TimestampTemplate = tinydate("{DD}/{MM}/{YY} at {HH}:{mm}:{ss}");

type PaymentValue = string | number | boolean | Date;
type ValueHandler = (value: PaymentValue) => string;

const DisplayedInformationLabels: Record<keyof SavedPayment, string> = {
  recipientAddress: "Receiving Wallet Address",
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

export const parseInfo = (paymentInfo: SavedPayment): Record<string, string> => {
  return Object.entries(paymentInfo).reduce<Record<string, string>>((acc, [key, value]) => {
    const typedKey = key as keyof SavedPayment;
    const displayLabel = DisplayedInformationLabels[typedKey];

    const handler = valueHandlers[typedKey] || defaultHandler;

    acc[displayLabel] = handler(value);

    return acc;
  }, {});
};

export const calculatePayments = (payments: Wallet['payments']) => {
  const completed = payments.filter(({ paid }) => paid).length;
  const pending = payments.length - completed;

  return {
    completed: Number(completed),
    pending: Number(pending),
  };
};




