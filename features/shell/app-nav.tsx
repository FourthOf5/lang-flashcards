"use client";

import { BookOpen, Layers3, Settings2 } from "lucide-react";

export type AppSection = "learn" | "library" | "admin";

interface AppNavProps {
  current: AppSection;
  onChange: (section: AppSection) => void;
}

const navItems = [
  { id: "learn" as const, label: "Learn", icon: Layers3 },
  { id: "library" as const, label: "Library", icon: BookOpen },
  { id: "admin" as const, label: "Admin", icon: Settings2 },
];

export const AppNav = ({ current, onChange }: AppNavProps) => (
  <nav
    aria-label="Main navigation"
    className="fixed inset-x-3 bottom-3 z-40 mx-auto flex max-w-md items-center justify-around rounded-[24px] border border-[var(--ink)]/10 bg-[var(--ink)] p-1.5 shadow-[0_18px_50px_rgba(20,35,45,.28)] md:static md:w-full md:max-w-none md:flex-col md:items-stretch md:justify-start md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none"
  >
    {navItems.map(({ id, label, icon: Icon }) => {
      const active = current === id;

      return (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          aria-current={active ? "page" : undefined}
          className={`flex min-w-[84px] items-center justify-center gap-2 rounded-[18px] px-3 py-3 text-sm font-bold transition md:min-w-0 md:justify-start md:px-4 ${
            active
              ? "bg-[var(--cream)] text-[var(--ink)]"
              : "text-white/60 hover:bg-white/10 hover:text-white"
          }`}
        >
          <Icon aria-hidden="true" size={18} strokeWidth={2.2} />
          <span>{label}</span>
        </button>
      );
    })}
  </nav>
);
