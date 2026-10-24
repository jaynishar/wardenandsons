'use client';

import React, { useState, useEffect } from 'react';
import { Chip } from '@/components/ui/Chip';
import { useAgeStore, AGE_BANDS, AgeBand } from '@/lib/age-store';
import { COPY_DECK } from '@/content/copy';

export function AgeCard() {
  const ageBand = useAgeStore((state) => state.ageBand);
  const setAgeBand = useAgeStore((state) => state.setAgeBand);
  const [isChanging, setIsChanging] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Format label for display
  const getDisplayLabel = (band: Exclude<AgeBand, null>) => {
    if (band === 'newborn') return 'Newborn';
    return band;
  };

  const currentLabel = ageBand ? (ageBand === 'newborn' ? 'Newborn' : ageBand) : '';
  const setLineText = COPY_DECK.age.set.replace('{age}', currentLabel);

  // If age is chosen and user is not currently in "Change" mode, show collapsed single line
  const isCollapsed = mounted && Boolean(ageBand) && !isChanging;

  return (
    <section
      aria-label="Filter catalogue by child age"
      className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-2"
    >
      <div className="min-h-[104px] p-4 sm:p-5 rounded-[6px] border border-[var(--line)] bg-[var(--paper)] flex flex-col justify-center transition-all duration-200">
        {isCollapsed ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--blue)] shrink-0" aria-hidden="true" />
              <p className="font-display font-medium text-sm sm:text-base text-[var(--ink)]">
                {setLineText}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsChanging(true)}
                className="text-xs uppercase tracking-wider text-[var(--blue)] hover:text-[var(--ink)] underline font-medium cursor-pointer"
              >
                {COPY_DECK.age.change}
              </button>
              <button
                type="button"
                onClick={() => {
                  setAgeBand(null);
                  setIsChanging(false);
                }}
                className="text-xs text-[var(--ink-soft)] hover:text-[var(--red)] cursor-pointer"
                title="Clear age filter"
              >
                Clear
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="label-upper text-[var(--ink)] font-semibold">
                {COPY_DECK.age.prompt}
              </h3>
              {ageBand && (
                <button
                  type="button"
                  onClick={() => setIsChanging(false)}
                  className="text-xs text-[var(--ink-soft)] hover:text-[var(--ink)] cursor-pointer"
                >
                  Done
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {AGE_BANDS.map((band) => {
                const isSelected = ageBand === band;
                return (
                  <Chip
                    key={band}
                    selected={isSelected}
                    onClick={() => {
                      if (isSelected) {
                        setAgeBand(null);
                      } else {
                        setAgeBand(band);
                        setIsChanging(false);
                      }
                    }}
                    className="text-xs sm:text-sm h-9 min-h-[36px] px-3.5"
                  >
                    {getDisplayLabel(band)}
                  </Chip>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default AgeCard;
