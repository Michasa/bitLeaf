import { toast } from "@/hooks/use-toast";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { SubmittedForm } from "./types";
import DOMPurify from "isomorphic-dompurify";

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
