import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";
import type { Workout } from "@/types/workout";

export function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link href={`/workout/${workout.id}`} className="group block overflow-hidden border border-line bg-panel transition hover:-translate-y-1 hover:border-acid/50 hover:shadow-glow">
      <div className="relative aspect-[4/3] overflow-hidden bg-panel2">
        <img src={workout.image} alt={workout.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((group) => <span key={group} className="bg-acid px-2 py-1 text-[10px] font-black uppercase text-black">{group}</span>)}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display text-2xl font-black uppercase leading-none tracking-tight">{workout.name}</h3>
        <p className="mt-2 truncate text-xs font-semibold text-muted">{workout.equipment}</p>
        <div className="mt-5 grid grid-cols-3 border-t border-line pt-4 text-xs font-bold text-muted">
          <span className="flex items-center gap-1.5"><Clock3 size={14} />{workout.duration} min</span>
          <span className="flex items-center gap-1.5"><Flame size={14} />{workout.caloriesBurned} kcal</span>
          <span className="flex items-center justify-end gap-1.5 text-white"><Star size={14} fill="currentColor" />{workout.rating}</span>
        </div>
      </div>
    </Link>
  );
}
