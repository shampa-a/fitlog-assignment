import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return <main className="grid min-h-[70vh] place-items-center px-5 py-20 text-center"><div><p className="text-xs font-black uppercase tracking-[.25em] text-acid">404 / Lost Rep</p><h1 className="mt-4 font-display text-8xl font-black uppercase leading-none">Not Found</h1><p className="mx-auto mt-5 max-w-md text-sm leading-6 text-muted">That route does not exist. Head back to the workout library and keep moving.</p><Link href="/" className="mt-8 inline-flex items-center gap-2 bg-acid px-5 py-3 text-xs font-black uppercase text-black"><ArrowLeft size={15} /> Back to workouts</Link></div></main>;
}
