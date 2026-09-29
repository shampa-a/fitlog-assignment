import type { Workout } from "@/types/workout";

const API_URLS = [
  "https://api.abcz.workers.dev/api/fitlog",
  "https://api.api-store.workers.dev/api/fitlog",
];

export async function getWorkouts(): Promise<Workout[]> {
  for (const url of API_URLS) {
    try {
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) continue;
      const data = (await response.json()) as Workout[];
      if (Array.isArray(data) && data.length) return data;
    } catch {
      // Try the fallback endpoint.
    }
  }
  throw new Error("Unable to load workout data.");
}

export async function getWorkout(id: string | number): Promise<Workout | undefined> {
  const numericId = Number(id);
  const workouts = await getWorkouts();
  return workouts.find((workout) => workout.id === numericId);
}
