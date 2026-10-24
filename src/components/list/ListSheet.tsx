'use client';

import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { IconClose, IconPlus, IconMinus, IconWhatsApp, IconCheck } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { Photo } from '@/components/ui/Photo';
import { useListStore } from '@/lib/list-store';
import { getCategory, getSub, ageOptionsFor } from '@/data/catalogue';
import { getListUrl } from '@/lib/whatsapp-list';
import { trackWhatsAppClick } from '@/lib/analytics';
import { COPY_DECK } from '@/content/copy';
import { CallbackForm } from './CallbackForm';

export function ListSheet() {
  const isListOpen = useListStore((state) => state.isListOpen);
  const setListOpen = useListStore((state) => state.setListOpen);
  const lines = useListStore((state) => state.lines);
  const remove = useListStore((state) => state.remove);
  const setQty = useListStore((state) => state.setQty);
  const setAge = useListStore((state) => state.setAge);
  const clear = useListStore((state) => state.clear);

  const [hasSent, setHasSent] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);
  const leadsEndpoint =
    process.env.NEXT_PUBLIC_LEADS_ENDPOINT ||
    (typeof window !== 'undefined'
      ? (window as unknown as { __LEADS_ENDPOINT_OVERRIDE__?: string }).__LEADS_ENDPOINT_OVERRIDE__
      : undefined);

  const handleSendClick = () => {
    trackWhatsAppClick({
      button_location: 'request_list',
      category: 'request_list',
      items_count: lines.length,
    });
    setHasSent(true);
  };

  const handleClear = () => {
    clear();
    setHasSent(false);
  };

  const whatsappUrl = getListUrl(lines);

  return (
    <Dialog.Root open={isListOpen} onOpenChange={setListOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-none dialog-overlay" />

        <Dialog.Content
          aria-describedby="list-sheet-description"
          className="fixed inset-y-0 right-0 z-50 w-full max-w-[420px] bg-[var(--ivory)] border-l border-[var(--line)] shadow-2xl flex flex-col justify-between focus:outline-none sheet-right"
        >
          {/* Header */}
          <div className="p-6 border-b border-[var(--line)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Dialog.Title className="font-display font-semibold text-xl text-[var(--ink)]">
                {COPY_DECK.list.title}
              </Dialog.Title>
              {lines.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[var(--paper)] border border-[var(--line)] text-xs font-medium text-[var(--ink)]">
                  {lines.length} {lines.length === 1 ? 'item' : 'items'}
                </span>
              )}
            </div>

            <Dialog.Close
              aria-label="Close my list"
              className="p-2 -mr-2 text-[var(--ink-soft)] hover:text-[var(--ink)] rounded-[4px] cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--blue)]"
            >
              <IconClose size={20} />
            </Dialog.Close>
          </div>

          <p id="list-sheet-description" className="sr-only">
            Your WhatsApp inquiry list containing selected children and family garments.
          </p>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {lines.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <p className="font-display text-base text-[var(--ink-soft)] max-w-xs mx-auto">
                  {COPY_DECK.list.empty}
                </p>
                <div className="pt-2">
                  <Button
                    variant="secondary"
                    href="/shop/"
                    onClick={() => setListOpen(false)}
                  >
                    Browse Catalogue
                  </Button>
                </div>
              </div>
            ) : (
              <ul className="space-y-4">
                {lines.map((line) => {
                  const cat = getCategory(line.categorySlug);
                  const sub = getSub(line.categorySlug, line.subSlug);
                  const catLabel = cat?.label || line.categorySlug;
                  const subLabel = sub?.label || line.subSlug;
                  const availableAges = [
                    ...ageOptionsFor(line.categorySlug, line.subSlug),
                    'Not sure',
                  ];

                  const cycleAge = () => {
                    const currentIndex = availableAges.indexOf(line.age || 'Not sure');
                    const nextIndex = (currentIndex + 1) % availableAges.length;
                    setAge(line.id, availableAges[nextIndex]);
                  };

                  return (
                    <li
                      key={line.id}
                      className="p-3.5 rounded-[6px] border border-[var(--line)] bg-[var(--paper)] flex gap-3.5 items-start relative group"
                    >
                      {/* Photo Thumbnail */}
                      <div className="w-14 h-18 shrink-0 rounded-[4px] overflow-hidden bg-[var(--ivory)] border border-[var(--line)]">
                        <Photo
                          src={null}
                          alt={subLabel}
                          ratio="4/5"
                          placeholderLabel={subLabel.slice(0, 10)}
                        />
                      </div>

                      {/* Line Details */}
                      <div className="flex-1 min-w-0 pr-6">
                        <p className="text-[10px] label-upper text-[var(--ink-soft)] truncate">
                          {catLabel}
                        </p>
                        <p className="font-display font-medium text-sm text-[var(--ink)] leading-snug truncate">
                          {subLabel}
                        </p>

                        {/* Age Chip (Click to cycle / edit) */}
                        <div className="mt-1.5 flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={cycleAge}
                            title="Click to change age/size"
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-[var(--ivory)] border border-[var(--line)] text-[var(--ink)] hover:border-[var(--ink)] transition-colors cursor-pointer"
                          >
                            <span>{line.age || 'Not sure'}</span>
                            <span className="ml-1 text-[9px] text-[var(--ink-soft)]">✎</span>
                          </button>
                        </div>

                        {/* Optional Note Display */}
                        {line.note && (
                          <p className="text-xs text-[var(--ink-soft)] italic mt-1 truncate">
                            Note: {line.note}
                          </p>
                        )}

                        {/* Stepper */}
                        <div className="mt-2.5 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setQty(line.id, line.qty - 1)}
                            disabled={line.qty <= 1}
                            aria-label="Decrease quantity"
                            className="w-7 h-7 rounded-[3px] border border-[var(--line)] bg-[var(--ivory)] text-[var(--ink)] flex items-center justify-center hover:bg-[#eae3d6] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                          >
                            <IconMinus size={12} />
                          </button>

                          <span className="w-6 text-center text-xs font-semibold text-[var(--ink)]">
                            {line.qty}
                          </span>

                          <button
                            type="button"
                            onClick={() => setQty(line.id, line.qty + 1)}
                            disabled={line.qty >= 20}
                            aria-label="Increase quantity"
                            className="w-7 h-7 rounded-[3px] border border-[var(--line)] bg-[var(--ivory)] text-[var(--ink)] flex items-center justify-center hover:bg-[#eae3d6] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                          >
                            <IconPlus size={12} />
                          </button>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => remove(line.id)}
                        aria-label={`Remove ${subLabel} from list`}
                        className="absolute top-2.5 right-2.5 p-1 text-[var(--ink-soft)] hover:text-[var(--red)] transition-colors cursor-pointer"
                      >
                        <IconClose size={16} />
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Footer Actions */}
          {lines.length > 0 && (
            <div className="p-6 border-t border-[var(--line)] bg-[var(--paper)] space-y-3">
              {/* WhatsApp Action Button */}
              <Button
                variant="whatsapp"
                fullWidth
                href={whatsappUrl}
                onClick={handleSendClick}
                data-track="whatsapp_click"
                data-track-location="request_list"
              >
                <span className="flex items-center gap-2">
                  <IconWhatsApp size={18} />
                  <span>{COPY_DECK.list.send}</span>
                </span>
              </Button>

              {/* Sent Confirmation Note & Clear Button */}
              {hasSent && (
                <div className="p-3 rounded-[4px] border border-[var(--line)] bg-[var(--ivory)] space-y-2">
                  <div className="flex items-start gap-2 text-xs text-[var(--wa)] font-medium">
                    <IconCheck size={16} className="shrink-0 mt-0.5" />
                    <p>{COPY_DECK.list.sentNote}</p>
                  </div>
                  <Button
                    variant="secondary"
                    fullWidth
                    onClick={handleClear}
                    className="h-10 min-h-[40px] text-xs"
                  >
                    {COPY_DECK.list.clear}
                  </Button>
                </div>
              )}

              {/* Prefer a call (hidden unless NEXT_PUBLIC_LEADS_ENDPOINT is set) */}
              {leadsEndpoint && (
                <button
                  type="button"
                  onClick={() => setCallbackOpen(true)}
                  className="w-full text-center text-xs text-[var(--ink-soft)] hover:text-[var(--ink)] underline pt-1 cursor-pointer"
                >
                  {COPY_DECK.list.call}
                </button>
              )}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>

      <CallbackForm open={callbackOpen} onOpenChange={setCallbackOpen} />
    </Dialog.Root>
  );
}

export default ListSheet;
