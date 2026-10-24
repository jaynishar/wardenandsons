'use client';

import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { IconClose, IconPlus, IconMinus } from '@/components/icons';
import { Chip } from '@/components/ui/Chip';
import { useListStore } from '@/lib/list-store';
import { useAgeStore } from '@/lib/age-store';
import { getCategory, getSub, ageOptionsFor } from '@/data/catalogue';
import { COPY_DECK } from '@/content/copy';

export function AddSheet() {
  const target = useListStore((state) => state.addSheetTarget);
  const closeAddSheet = useListStore((state) => state.closeAddSheet);
  const add = useListStore((state) => state.add);
  const ageBand = useAgeStore((state) => state.ageBand);

  const [selectedAge, setSelectedAge] = useState<string>('Not sure');
  const [qty, setQty] = useState<number>(1);
  const [note, setNote] = useState<string>('');
  const [announcement, setAnnouncement] = useState<string>('');

  const isOpen = Boolean(target);

  // When target changes, reset form with appropriate age options
  useEffect(() => {
    if (target) {
      const options = ageOptionsFor(target.categorySlug, target.subSlug);
      if (target.age && (options.includes(target.age) || target.age === 'Not sure')) {
        setSelectedAge(target.age);
      } else if (ageBand && options.includes(ageBand)) {
        setSelectedAge(ageBand);
      } else if (ageBand === 'newborn' && target.categorySlug === 'newborn' && options.length > 0) {
        setSelectedAge(options[0]);
      } else if (options.length > 0) {
        setSelectedAge(options[0]);
      } else {
        setSelectedAge('Not sure');
      }
      setQty(1);
      setNote('');
    }
  }, [target, ageBand]);

  if (!target) {
    return (
      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>
    );
  }

  const category = getCategory(target.categorySlug);
  const sub = getSub(target.categorySlug, target.subSlug);

  const categoryLabel = category?.label || target.categorySlug;
  const subLabel = sub?.label || target.subSlug;
  const availableAgeOptions = ageOptionsFor(target.categorySlug, target.subSlug);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    add({
      categorySlug: target.categorySlug,
      subSlug: target.subSlug,
      age: selectedAge,
      qty,
      note,
      styleId: target.styleId,
    });

    setAnnouncement(`${subLabel} added to your list`);
    closeAddSheet();
  };

  return (
    <>
      {/* Live region for accessibility announcements */}
      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>

      <Dialog.Root open={isOpen} onOpenChange={(open) => !open && closeAddSheet()}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-none dialog-overlay" />

          <Dialog.Content
            data-ui="add-sheet"
            aria-describedby="add-sheet-description"
            className="fixed inset-x-0 bottom-0 z-50 rounded-none bg-white border-t-2 border-[var(--ink)] p-6 sm:p-8  max-h-[90vh] overflow-y-auto focus:outline-none sheet-bottom md:sheet-none md:dialog-scale md:fixed md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:inset-auto md:w-full md:max-w-md md:border-2 md:border-[var(--ink)] font-sans"
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[var(--surface)]">
              <div>
                <p className="text-xs text-[var(--muted)] font-bold">
                  {categoryLabel}
                </p>
                <Dialog.Title className="font-sans font-medium text-xl sm:text-2xl text-[var(--ink)] mt-0.5">
                  {subLabel}
                </Dialog.Title>
              </div>

              <Dialog.Close
                aria-label="Close add sheet"
                className="p-2 -mr-2 text-[var(--ink)] hover:text-[var(--muted)] rounded-none cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--blue)]"
              >
                <IconClose size={20} />
              </Dialog.Close>
            </div>

            <p id="add-sheet-description" className="sr-only">
              Select size or age, quantity, and optional note to add {subLabel} to your inquiry list.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              {/* Age / Size Selector */}
              <div>
                <label className="block text-xs text-[var(--ink)] mb-2 font-bold">
                  {COPY_DECK.add.age}
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableAgeOptions.map((age) => (
                    <Chip
                      key={age}
                      type="button"
                      selected={selectedAge === age}
                      onClick={() => setSelectedAge(age)}
                      className="rounded-none font-medium"
                    >
                      {age}
                    </Chip>
                  ))}
                  <Chip
                    type="button"
                    selected={selectedAge === 'Not sure'}
                    onClick={() => setSelectedAge('Not sure')}
                    className="rounded-none font-medium"
                  >
                    {COPY_DECK.add.notSure}
                  </Chip>
                </div>
              </div>

              {/* Quantity Stepper */}
              <div>
                <label className="block text-xs text-[var(--ink)] mb-2 font-bold">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                    disabled={qty <= 1}
                    aria-label="Decrease quantity"
                    className="w-11 h-11 rounded-none border border-[var(--ink)] bg-white text-[var(--ink)] flex items-center justify-center hover:bg-[var(--surface)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--blue)]"
                  >
                    <IconMinus size={16} />
                  </button>

                  <span className="w-12 text-center font-sans font-medium text-lg text-[var(--ink)]">
                    {qty}
                  </span>

                  <button
                    type="button"
                    onClick={() => setQty((prev) => Math.min(20, prev + 1))}
                    disabled={qty >= 20}
                    aria-label="Increase quantity"
                    className="w-11 h-11 rounded-none border border-[var(--ink)] bg-white text-[var(--ink)] flex items-center justify-center hover:bg-[var(--surface)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--blue)]"
                  >
                    <IconPlus size={16} />
                  </button>
                </div>
              </div>

              {/* Optional Note */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="list-item-note" className="text-xs text-[var(--ink)] font-bold">
                    {COPY_DECK.add.note}
                  </label>
                  <span className="text-xs text-[var(--muted)]">
                    {note.length}/140
                  </span>
                </div>
                <input
                  id="list-item-note"
                  type="text"
                  maxLength={140}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. prefer pastel shades, softest cotton"
                  className="w-full h-12 px-3.5 rounded-none border border-[var(--ink)] bg-white text-[var(--ink)] placeholder:text-[var(--muted)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
                />
                <p className="text-xs text-[var(--muted)] mt-1.5">
                  {COPY_DECK.add.noteHelp}
                </p>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full h-[52px] px-8 inline-flex items-center justify-center font-sans font-medium text-[15px] bg-[var(--ink)] text-white hover:bg-[var(--blue)] active:scale-[0.98] transition-all cursor-pointer rounded-none focus-visible:outline-3 focus-visible:outline-[var(--blue)]"
                >
                  {COPY_DECK.add.cta}
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

export default AddSheet;
