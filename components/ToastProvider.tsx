"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { Check, X } from "lucide-react";

type ToastContextValue = { showToast: (message: string) => void };
const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState("");

  const showToast = useCallback((next: string) => {
    setMessage(next);
    window.setTimeout(() => setMessage(""), 2200);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {message && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 border border-acid/30 bg-panel px-4 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-glow">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-acid text-black"><Check size={16} /></span>
          {message}
          <button onClick={() => setMessage("")} aria-label="Close notification"><X size={15} /></button>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside ToastProvider");
  return context;
}
