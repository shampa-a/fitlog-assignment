"use client";

import { useEffect, useState } from "react";
import { Hero } from "@/components/Hero";
import { Library } from "@/components/Library";
import { Loading } from "@/components/Loading";
import type { Workout } from "@/types/workout";

const API_URLS = ["https://api.abcz.workers.dev/api/fitlog", "https://api.api-store.workers.dev/api/fitlog"];

export function HomeClient() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      for (const url of API_URLS) {
        try {
          const response = await fetch(url);
          if (!response.ok) continue;
          const data = (await response.json()) as Workout[];
          if (Array.isArray(data) && data.length) {
            if (!cancelled) setWorkouts(data);
            if (!cancelled) setLoading(false);
            return;
          }
        } catch { /* fallback */ }
      }
      if (!cancelled) {
        setError("We could not load the workout library. Please refresh and try again.");
        setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return <><Hero />{loading ? <Loading /> : error ? <div className="mx-auto max-w-7xl px-5 py-24 text-center text-sm text-red-300">{error}</div> : <Library workouts={workouts} />}</>;
}
