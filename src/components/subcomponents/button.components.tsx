import React from "react";

type ButtonProps = {
  title: string;
  color: string;
  size: string;
  onClick(): void;
};

const sizes = {
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
  xl: "text-xl",
  xl2: "text-2xl",
  xl3: "text-3xl",
};

function getFillColor(color: string) {
  if (color === "blue") return "bg-accent-blue dark:text-accent-blue";
  if (color === "red") return "bg-accent-red dark:text-accent-red";
  if (color === "yellow") return "bg-accent-yellow dark:text-accent-yellow";
  if (color === "green") return "bg-accent-green dark:text-accent-green";
  if (color === "orange") return "bg-accent-orange dark:text-accent-orange";
  if (color === "neutral") return "bg-text-primary dark:text-text-primary";
}

function getTextColor(color: string) {
  if (color === "blue") return "text-accent-blue bg-accent-blue";
  if (color === "red") return "text-accent-red bg-accent-red";
  if (color === "yellow") return "text-accent-yellow bg-accent-yellow";
  if (color === "green") return "text-accent-green bg-accent-green";
  if (color === "orange") return "text-accent-orange bg-accent-orange";
  if (color === "neutral") return "text-text-primary bg-text-secondary";
}

function FillButton({ color, size, title, onClick }: ButtonProps) {
  return (
    <button
      className={`rounded-md px-3 py-3 font-semibold text-white ${getFillColor(
        color
      )} ${
        sizes[size as keyof typeof sizes]
      } hover:bg-opacity-90 dark:bg-opacity-25 dark:hover:bg-opacity-40`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

function TextButton({ color, size, title, onClick }: ButtonProps) {
  return (
    <button
      className={`rounded-md px-3 py-3 font-semibold ${getTextColor(color)} ${
        sizes[size as keyof typeof sizes]
      } bg-opacity-0 hover:bg-opacity-25 `}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export { FillButton, TextButton };
