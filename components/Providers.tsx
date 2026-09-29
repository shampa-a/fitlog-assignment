"use client";

import { FitLogProvider } from "@/context/FitLogContext";
import { ToastProvider } from "@/components/ToastProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <FitLogProvider><ToastProvider>{children}</ToastProvider></FitLogProvider>;
}
