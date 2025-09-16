import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(rawDate: string) {
  const formatted = format(new Date(rawDate), "MMM dd, yyyy @ HH:mm");
  return formatted;
}
