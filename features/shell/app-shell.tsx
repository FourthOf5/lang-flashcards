"use client";

import { useState } from "react";
import { AdminPage } from "@/features/admin/admin-page";
import { LibraryPage } from "@/features/library/library-page";
import { useCardLibrary } from "@/features/library/use-card-library";
import { LearnPage } from "@/features/quiz/learn-page";
import { AppHeader } from "@/features/shell/app-header";
import { AppNav, type AppSection } from "@/features/shell/app-nav";
import { LoadingState } from "@/features/shell/loading-state";

export const AppShell = () => {
  const [section, setSection] = useState<AppSection>("learn");
  const library = useCardLibrary();

  const changeSection = (nextSection: AppSection): void => {
    setSection(nextSection);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)]">
      <AppHeader cardCount={library.cards.length} />
      <div className="mx-auto grid w-full max-w-[1500px] md:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="hidden min-h-[calc(100vh-81px)] border-r border-[var(--ink)]/10 px-5 py-8 md:block">
          <AppNav current={section} onChange={changeSection} />
          <div className="mt-10 rounded-[24px] bg-[var(--yellow)] p-5">
            <p className="text-[10px] font-black uppercase tracking-[0.16em]">Tiny habit</p>
            <p className="font-display mt-2 text-2xl leading-[1.05]">Ten cards beat zero cards.</p>
            <p className="mt-3 text-xs leading-relaxed text-[var(--ink)]/65">
              Keep sessions short. Come back tomorrow.
            </p>
          </div>
        </aside>

        <main className="min-w-0 pb-28 md:pb-8">
          {library.isLoading ? (
            <LoadingState />
          ) : (
            <>
              {library.error ? (
                <div role="alert" className="mx-5 mt-5 rounded-2xl bg-red-100 px-4 py-3 text-sm font-semibold text-red-900 md:mx-8">
                  {library.error}
                </div>
              ) : null}
              {section === "learn" ? (
                <LearnPage groups={library.groups} cards={library.cards} />
              ) : null}
              {section === "library" ? (
                <LibraryPage groups={library.groups} cards={library.cards} />
              ) : null}
              {section === "admin" ? <AdminPage library={library} /> : null}
            </>
          )}
        </main>
      </div>
      <div className="md:hidden">
        <AppNav current={section} onChange={changeSection} />
      </div>
    </div>
  );
};
