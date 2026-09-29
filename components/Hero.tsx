import Link from "next/link";
import { ArrowDownRight } from "lucide-react";

export function Hero() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-[1.1fr_.9fr]">
        <div className="flex min-h-[620px] flex-col justify-center px-5 py-16 lg:px-8">
          <p className="mb-5 text-xs font-black uppercase tracking-[.25em] text-acid">Workout Library</p>
          <h1 className="max-w-4xl font-display text-[clamp(4rem,9vw,8.7rem)] font-black uppercase leading-[.82] tracking-[-.05em]">Train with intent. Log every set.</h1>
          <p className="mt-8 max-w-2xl text-base leading-7 text-muted sm:text-lg">FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.</p>
          <div className="mt-9">
            <Link href="#library" className="inline-flex items-center gap-3 bg-acid px-6 py-4 text-sm font-black uppercase tracking-wider text-black transition hover:translate-y-[-2px]">Browse workouts <ArrowDownRight size={18} /></Link>
          </div>
        </div>
        <div className="relative min-h-[380px] overflow-hidden border-l border-line bg-panel2 lg:min-h-full">
          <img src="https://img.magnific.com/free-photo/3d-cartoon-fitness-man_23-2151691401.jpg?w=740" alt="Athlete training" className="absolute inset-0 h-full w-full object-cover grayscale contrast-125" />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-transparent to-acid/10" />
          <div className="absolute bottom-7 right-7 border border-white/20 bg-black/60 px-4 py-3 text-right backdrop-blur">
            <p className="text-[10px] font-black uppercase tracking-[.2em] text-acid">01 / 12</p>
            <p className="mt-1 font-display text-xl font-black uppercase">Build the habit.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
