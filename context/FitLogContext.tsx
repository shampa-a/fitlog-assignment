"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Workout } from "@/types/workout";

type FitLogContextValue = {
  plan: Workout[];
  saved: Workout[];
  done: number[];
  hydrated: boolean;
  addToPlan: (workout: Workout) => boolean;
  saveForLater: (workout: Workout) => boolean;
  removeFromPlan: (id: number) => void;
  removeSaved: (id: number) => void;
  toggleDone: (id: number) => void;
};

const FitLogContext = createContext<FitLogContextValue | null>(null);

const PLAN_KEY = "fitlog-plan";
const SAVED_KEY = "fitlog-saved";
const DONE_KEY = "fitlog-done";

export function FitLogProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [done, setDone] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem(PLAN_KEY);
      const storedSaved = localStorage.getItem(SAVED_KEY);
      const storedDone = localStorage.getItem(DONE_KEY);
      if (storedPlan) setPlan(JSON.parse(storedPlan));
      if (storedSaved) setSaved(JSON.parse(storedSaved));
      if (storedDone) setDone(JSON.parse(storedDone));
    } catch {
      // Ignore malformed localStorage and start clean.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  }, [plan, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  }, [saved, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem(DONE_KEY, JSON.stringify(done));
  }, [done, hydrated]);

  const value = useMemo<FitLogContextValue>(() => ({
    plan,
    saved,
    done,
    hydrated,
    addToPlan: (workout) => {
      if (plan.length >= 5 || plan.some((item) => item.id === workout.id)) return false;
      setPlan((current) => [...current, workout]);
      return true;
    },
    saveForLater: (workout) => {
      if (saved.some((item) => item.id === workout.id)) return false;
      setSaved((current) => [...current, workout]);
      return true;
    },
    removeFromPlan: (id) => {
      setPlan((current) => current.filter((item) => item.id !== id));
      setDone((current) => current.filter((item) => item !== id));
    },
    removeSaved: (id) => setSaved((current) => current.filter((item) => item.id !== id)),
    toggleDone: (id) => setDone((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]),
  }), [plan, saved, done, hydrated]);

  return <FitLogContext.Provider value={value}>{children}</FitLogContext.Provider>;
}

export function useFitLog() {
  const context = useContext(FitLogContext);
  if (!context) throw new Error("useFitLog must be used inside FitLogProvider");
  return context;
}
