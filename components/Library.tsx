"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { SortOption, Workout } from "@/types/workout";
import { WorkoutCard } from "@/components/WorkoutCard";

export function Library({ workouts }: { workouts: Workout[] }) {
  const [sort, setSort] = useState<SortOption>("duration");
  const sorted = useMemo(() => [...workouts].sort((a, b) => b[sort === "calories" ? "caloriesBurned" : sort] - a[sort === "calories" ? "caloriesBurned" : sort]), [workouts, sort]);

  return (
    <section id="library" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-20 lg:px-8">
      <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="mb-3 text-xs font-black uppercase tracking-[.2em] text-acid">12 movements</p>
          <h2 className="font-display text-5xl font-black uppercase tracking-tight sm:text-6xl">The Library</h2>
          <p className="mt-3 text-sm text-muted">Twelve lifts covering every major muscle group.</p>
        </div>
        <label className="flex items-center gap-3 border border-line bg-panel px-4 py-3 text-xs font-black uppercase tracking-wider">
          <span className="text-muted">Sort By</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as SortOption)} className="cursor-pointer appearance-none bg-transparent text-white outline-none">
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
          <ChevronDown size={15} className="pointer-events-none" />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sorted.map((workout) => <WorkoutCard key={workout.id} workout={workout} />)}
      </div>
    </section>
  );
}
