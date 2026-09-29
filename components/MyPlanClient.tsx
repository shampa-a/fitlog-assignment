"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Flame, ListChecks, Timer } from "lucide-react";
import { useFitLog } from "@/context/FitLogContext";
import { PlanCard } from "@/components/PlanCard";
import { Loading } from "@/components/Loading";

export function MyPlanClient() {
  const { plan, saved, hydrated } = useFitLog();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<"plan" | "saved">("plan");

  useEffect(() => {
    if (searchParams.get("tab") === "saved") setTab("saved");
  }, [searchParams]);

  const activeList = tab === "plan" ? plan : saved;
  const minutes = useMemo(() => plan.reduce((sum, item) => sum + item.duration, 0), [plan]);
  const calories = useMemo(() => plan.reduce((sum, item) => sum + item.caloriesBurned, 0), [plan]);

  if (!hydrated) return <Loading text="Loading workouts…" />;

  return (
    <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      <div className="flex flex-col justify-between gap-8 border-b border-line pb-8 md:flex-row md:items-end">
        <div><p className="mb-3 text-xs font-black uppercase tracking-[.2em] text-acid">Your training log</p><h1 className="font-display text-6xl font-black uppercase leading-none tracking-tight">My Plan</h1><p className="mt-4 text-sm text-muted">Cap of five lifts for today. Finish them, then load more.</p></div>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <Metric icon={<ListChecks />} label="Exercises" value={plan.length} />
          <Metric icon={<Timer />} label="Minutes" value={minutes} />
          <Metric icon={<Flame />} label="Calories" value={calories} />
        </div>
      </div>
      <div className="mt-8 flex gap-1 border-b border-line">
        <button onClick={() => setTab("plan")} className={`px-5 py-3 text-xs font-black uppercase tracking-wider ${tab === "plan" ? "bg-acid text-black" : "text-muted hover:text-white"}`}>Today&apos;s Plan ({plan.length})</button>
        <button onClick={() => setTab("saved")} className={`px-5 py-3 text-xs font-black uppercase tracking-wider ${tab === "saved" ? "bg-acid text-black" : "text-muted hover:text-white"}`}>Saved ({saved.length})</button>
      </div>
      <div className="mt-6 space-y-3">
        {activeList.length ? activeList.map((workout) => <PlanCard key={workout.id} workout={workout} savedTab={tab === "saved"} />) : <EmptyState saved={tab === "saved"} />}
      </div>
    </main>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return <div className="min-w-[95px] border border-line bg-panel p-3 sm:min-w-[115px]"><div className="mb-2 text-acid">{icon}</div><p className="font-display text-3xl font-black">{value}</p><p className="text-[9px] font-black uppercase tracking-wider text-muted">{label}</p></div>;
}

function EmptyState({ saved }: { saved: boolean }) {
  return <div className="border border-dashed border-line py-24 text-center"><p className="font-display text-4xl font-black uppercase">Nothing here yet</p><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">{saved ? "Save workouts from the library and they will appear here for later." : "Browse the library and add a lift to get today moving."}</p><Link href="/" className="mt-6 inline-block bg-acid px-5 py-3 text-xs font-black uppercase text-black">Go to workouts</Link></div>;
}
