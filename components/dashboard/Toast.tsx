"use client";

import { useEffect } from "react";
import { Icons } from "./icons";

type ToastProps = {
  message: string;
  onClose: () => void;
  duration?: number;
  variant?: "success" | "error";
};

export default function Toast({ message, onClose, duration = 3000, variant = "success" }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [onClose, duration]);

  const isError = variant === "error";
  return (
    <div
      className={`fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl font-medium shadow-lg transition-all max-w-full ${
        isError
          ? "bg-rose-500/95 text-white shadow-rose-500/25"
          : "bg-emerald-500/95 text-white shadow-emerald-500/25"
      }`}
      style={{ animation: "toastIn 0.3s ease-out" }}
      role="alert"
    >
      {isError ? (
        <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-lg leading-none">!</span>
      ) : (
        <span className="flex-shrink-0 [&_svg]:w-5 [&_svg]:h-5"><Icons.Check /></span>
      )}
      {message}
    </div>
  );
}
