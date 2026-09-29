"use client";

import Link from "next/link";
import { ArrowLeft, Bookmark, Check, Clock3, Dumbbell, Flame, ListChecks, Plus, Star } from "lucide-react";
import type { Workout } from "@/types/workout";
import { useFitLog } from "@/context/FitLogContext";
import { useToast } from "@/components/ToastProvider";

export function WorkoutDetailClient({ workout }: { workout: Workout }) {
  const { plan, saved, addToPlan, saveForLater } = useFitLog();
  const { showToast } = useToast();
  const inPlan = plan.some((item) => item.id === workout.id);
  const isSaved = saved.some((item) => item.id === workout.id);
  const planFull = plan.length >= 5 && !inPlan;

  const add = () => {
    if (inPlan) return showToast("Already in today&apos;s plan");
    if (planFull) return showToast("Today&apos;s plan is full");
    addToPlan(workout);
    showToast("Added to today&apos;s plan");
  };

  const save = () => {
    if (isSaved) return showToast("Already saved for later");
    saveForLater(workout);
    showToast("Saved for later");
  };

  return (
    <main className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
      <Link href="/#library" className="mb-8 inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-muted hover:text-white"><ArrowLeft size={15} /> Back to library</Link>
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="relative aspect-[4/3] overflow-hidden bg-panel2 lg:aspect-auto lg:min-h-[680px]">
          <img src={workout.image} alt={workout.name} className="h-full w-full object-cover grayscale-[20%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-5 left-5 flex flex-wrap gap-2">{workout.muscleGroups.map((group) => <span key={group} className="bg-acid px-3 py-2 text-xs font-black uppercase text-black">{group}</span>)}</div>
        </div>
        <div className="py-2 lg:py-6">
          <p className="mb-4 text-xs font-black uppercase tracking-[.2em] text-acid">Workout details</p>
          <h1 className="font-display text-6xl font-black uppercase leading-[.88] tracking-tight sm:text-7xl">{workout.name}</h1>
          <p className="mt-6 max-w-2xl leading-7 text-muted">{workout.description}</p>
          <div className="mt-8 grid grid-cols-2 border-y border-line sm:grid-cols-3">
            <Spec icon={<Dumbbell size={15} />} label="Equipment" value={workout.equipment} />
            <Spec label="Difficulty" value={workout.difficulty} />
            <Spec label="Sets" value={String(workout.sets)} />
            <Spec label="Reps" value={workout.reps} />
            <Spec icon={<Clock3 size={15} />} label="Duration" value={`${workout.duration} min`} />
            <Spec icon={<Flame size={15} />} label="Calories" value={`${workout.caloriesBurned} kcal`} />
            <Spec icon={<Star size={15} />} label="Rating" value={String(workout.rating)} />
          </div>
          <div className="mt-8">
            <div className="mb-5 flex items-center gap-2"><ListChecks size={18} className="text-acid" /><h2 className="font-display text-2xl font-black uppercase">Instructions</h2></div>
            <ol className="space-y-3">{workout.instructions.map((instruction, index) => <li key={instruction} className="flex gap-4 border-b border-line pb-3 text-sm leading-6 text-muted"><span className="font-black text-acid">0{index + 1}</span><span>{instruction}</span></li>)}</ol>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button onClick={add} disabled={inPlan || planFull} className="flex flex-1 items-center justify-center gap-2 bg-acid px-5 py-4 text-sm font-black uppercase text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"><Plus size={18} />{inPlan ? "In today&apos;s plan" : planFull ? "Plan is full" : "Add to today&apos;s plan"}</button>
            <button onClick={save} disabled={isSaved} className="flex flex-1 items-center justify-center gap-2 border border-line px-5 py-4 text-sm font-black uppercase transition hover:border-white disabled:cursor-not-allowed disabled:opacity-50"><Bookmark size={18} />{isSaved ? "Saved" : "Save for later"}</button>
          </div>
        </div>
      </div>
    </main>
  );
}

function Spec({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return <div className="border-b border-line p-4 sm:p-5"><p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-muted">{icon}{label}</p><p className="mt-2 break-words text-sm font-bold text-white">{value}</p></div>;
}
