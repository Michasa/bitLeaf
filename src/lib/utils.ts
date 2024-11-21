import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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
