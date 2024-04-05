import { type ClassValue, clsx } from "clsx";
import currency from "currency.js";
import { Ban, Check, Clock, CookingPot, Truck } from "lucide-react";
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

export function getOrderStatus(
  status: "CANCELED" | "WAITING" | "IN_PRODUCTION" | "IN_TRANSIT" | "DELIVERED"
) {
  if (status === "CANCELED")
    return { status, color: "bg-red-400", display: "Cancelado", icon: Ban };
  if (status === "DELIVERED")
    return { status, color: "bg-green-400", display: "Entregue", icon: Check };
  if (status === "IN_PRODUCTION")
    return {
      status,
      color: "bg-amber-400",
      display: "Em preparo",
      icon: CookingPot,
    };
  if (status === "IN_TRANSIT")
    return {
      status,
      color: "bg-lime-400",
      display: "Saiu para entrega",
      icon: Truck,
    };
  return { status, color: "bg-zinc-400", display: "Pendente", icon: Clock };
}
