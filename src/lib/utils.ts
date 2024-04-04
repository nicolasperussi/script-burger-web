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

export function getOrderStatus(
  status: "CANCELED" | "WAITING" | "IN_PRODUCTION" | "IN_TRANSIT" | "DELIVERED"
) {
  if (status === "CANCELED")
    return { status, color: "bg-red-400", display: "Cancelado" };
  if (status === "DELIVERED")
    return { status, color: "bg-green-400", display: "Entregue" };
  if (status === "IN_PRODUCTION")
    return { status, color: "bg-amber-400", display: "Em preparo" };
  if (status === "IN_TRANSIT")
    return { status, color: "bg-lime-400", display: "Em rota de entrega" };
  return { status, color: "bg-zinc-400", display: "Pendente" };
}
