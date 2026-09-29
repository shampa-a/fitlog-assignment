import { notFound } from "next/navigation";
import { getWorkout } from "@/lib/api";
import { WorkoutDetailClient } from "@/components/WorkoutDetailClient";

export const dynamic = "force-dynamic";

export default async function WorkoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const workout = await getWorkout(id);
  if (!workout) notFound();
  return <WorkoutDetailClient workout={workout} />;
}
