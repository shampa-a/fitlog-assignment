import Link from "next/link";
import { Dumbbell } from "lucide-react";

export function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2" aria-label="FitLog home">
      <span className="grid h-9 w-9 rotate-3 place-items-center bg-acid text-black transition-transform group-hover:rotate-0">
        <Dumbbell size={20} strokeWidth={3} />
      </span>
      <span className="font-display text-2xl font-black tracking-tight">FITLOG</span>
    </Link>
  );
}
