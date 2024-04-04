import { type ClassValue, clsx } from "clsx";
import currency from "currency.js";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const root = document.querySelector(":root");

export function toggleDarkMode() {
  root!.classList.toggle("dark");
}

export const BRL = (value: number) =>
  currency(value, {
    symbol: "R$ ",
    precision: 2,
    decimal: ",",
    separator: ".",
  }).format();
