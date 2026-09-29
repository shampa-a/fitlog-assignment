"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, Menu, Bookmark, X } from "lucide-react";
import { useState } from "react";
import { useFitLog } from "@/context/FitLogContext";
import { Logo } from "@/components/Logo";

export function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useFitLog();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Workout", active: pathname === "/" },
    { href: "/my-plan", label: "My Plan", active: pathname === "/my-plan" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={`px-5 py-2 text-xs font-black uppercase tracking-[.16em] transition ${link.active ? "bg-white text-black" : "text-muted hover:text-white"}`}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 sm:flex">
          <Link href="/my-plan" className="flex items-center gap-2 rounded-full bg-acid px-3 py-2 text-xs font-black uppercase text-black">
            <ClipboardList size={14} /> Plan <span className="rounded-full bg-black/10 px-2 py-0.5">{plan.length}</span>
          </Link>
          <Link href="/my-plan?tab=saved" className="flex items-center gap-2 rounded-full border border-line px-3 py-2 text-xs font-black uppercase text-white hover:border-white">
            <Bookmark size={14} /> Saved <span className="rounded-full bg-white/10 px-2 py-0.5">{saved.length}</span>
          </Link>
        </div>
        <button className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="border-t border-line px-5 py-4 md:hidden">
          <div className="grid gap-2">
            {links.map((link) => <Link onClick={() => setOpen(false)} key={link.href} href={link.href} className={`px-4 py-3 text-sm font-black uppercase tracking-wider ${link.active ? "bg-white text-black" : "bg-panel text-white"}`}>{link.label}</Link>)}
            <Link onClick={() => setOpen(false)} href="/my-plan" className="flex justify-between bg-acid px-4 py-3 text-sm font-black uppercase text-black">Plan <span>{plan.length}</span></Link>
            <Link onClick={() => setOpen(false)} href="/my-plan?tab=saved" className="flex justify-between border border-line px-4 py-3 text-sm font-black uppercase text-white">Saved <span>{saved.length}</span></Link>
          </div>
        </div>
      )}
    </header>
  );
}
