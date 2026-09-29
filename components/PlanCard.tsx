"use client";

import Link from "next/link";
import { Check, Clock3, Eye, Flame, Star, X } from "lucide-react";
import type { Workout } from "@/types/workout";
import { useFitLog } from "@/context/FitLogContext";
import { useToast } from "@/components/ToastProvider";

export function PlanCard({ workout, savedTab = false }: { workout: Workout; savedTab?: boolean }) {
  const { done, toggleDone, removeFromPlan, removeSaved } = useFitLog();
  const { showToast } = useToast();
  const isDone = done.includes(workout.id);

  return (
    <article className={`grid gap-4 border border-line bg-panel p-3 sm:grid-cols-[160px_1fr_auto] sm:items-center ${isDone ? "opacity-60" : ""}`}>
      <Link href={`/workout/${workout.id}`} className="aspect-[4/3] overflow-hidden bg-panel2 sm:aspect-square"><img src={workout.image} alt={workout.name} className="h-full w-full object-cover" /></Link>
      <div className="px-1 py-2">
        <div className="mb-2 flex flex-wrap gap-1.5">{workout.muscleGroups.map((group) => <span key={group} className="bg-white/10 px-2 py-1 text-[9px] font-black uppercase text-muted">{group}</span>)}</div>
        <h3 className={`font-display text-2xl font-black uppercase ${isDone ? "line-through" : ""}`}>{workout.name}</h3>
        <p className="mt-1 text-xs text-muted">{workout.equipment}</p>
        <div className="mt-4 flex flex-wrap gap-4 text-xs font-bold text-muted"><span className="flex items-center gap-1"><Clock3 size={13} />{workout.duration}m</span><span className="flex items-center gap-1"><Flame size={13} />{workout.caloriesBurned} kcal</span><span className="flex items-center gap-1"><Star size={13} fill="currentColor" />{workout.rating}</span></div>
      </div>
      <div className="flex flex-wrap gap-2 sm:flex-col sm:min-w-[145px]">
        <Link href={`/workout/${workout.id}`} className="flex flex-1 items-center justify-center gap-2 border border-line px-3 py-2.5 text-[10px] font-black uppercase hover:border-white sm:flex-none"><Eye size={13} /> View Details</Link>
        {!savedTab && <button onClick={() => { toggleDone(workout.id); showToast(isDone ? "Marked as not done" : "Workout marked as done"); }} className="flex flex-1 items-center justify-center gap-2 bg-acid px-3 py-2.5 text-[10px] font-black uppercase text-black sm:flex-none"><Check size={13} /> {isDone ? "Done" : "Mark as Done"}</button>}
        <button onClick={() => { savedTab ? removeSaved(workout.id) : removeFromPlan(workout.id); showToast(savedTab ? "Removed from saved" : "Removed from today&apos;s plan"); }} className="flex items-center justify-center gap-2 border border-line px-3 py-2.5 text-[10px] font-black uppercase text-muted hover:border-red-400 hover:text-red-300"><X size={13} /> Remove</button>
      </div>
    </article>
  );
}
