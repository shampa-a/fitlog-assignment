import { Suspense } from "react";
import { MyPlanClient } from "@/components/MyPlanClient";
import { Loading } from "@/components/Loading";

export default function MyPlanPage() {
  return <Suspense fallback={<Loading text="Loading workouts…" />}><MyPlanClient /></Suspense>;
}
