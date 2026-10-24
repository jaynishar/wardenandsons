'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import * as Dialog from '@radix-ui/react-dialog';
import { IconClose, IconCheck, IconWhatsApp } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { useListStore } from '@/lib/list-store';
import { getListUrl } from '@/lib/whatsapp-list';
import { getSessionAttribution } from '@/lib/attribution';
import { trackCallbackLead } from '@/lib/analytics';
import {
  validatePhone,
  buildLeadPayload,
  submitLead,
  checkHoneypot,
  checkSubmissionSpeed,
  canSubmitLead,
  recordLeadSubmission,
} from '@/lib/leads';
import { COPY_DECK } from '@/content/copy';

interface CallbackFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PREFERRED_TIMES = ['Morning', 'Afternoon', 'Evening'] as const;

export function CallbackForm({ open, onOpenChange }: CallbackFormProps) {
  const lines = useListStore((state) => state.lines);

  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [preferredTime, setPreferredTime] = useState<string | undefined>(undefined);
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const [openedAt, setOpenedAt] = useState<number>(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'fail'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Record timestamp whenever dialog opens and reset form states
  useEffect(() => {
    if (open) {
      setOpenedAt(Date.now());
      setStatus('idle');
      setErrorMessage(null);
      setConsent(false);
      setHoneypot('');
    }
  }, [open]);

  const isPhoneValid = validatePhone(phone);
  const isSubmitDisabled = !isPhoneValid || !consent || isSubmitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // 1. Spam protection: Honeypot check
    if (!checkHoneypot(honeypot)) {
      setStatus('fail');
      setErrorMessage(COPY_DECK.call.fail);
      return;
    }

    // 2. Spam protection: Submission speed rule (< 2 seconds)
    if (!checkSubmissionSpeed(openedAt)) {
      setErrorMessage('Please take a moment to review before submitting.');
      return;
    }

    // 3. Spam protection: Client daily submission rate limit (max 3/day)
    const rateCheck = canSubmitLead();
    if (!rateCheck.allowed) {
      setErrorMessage('Daily callback request limit reached. Please message us on WhatsApp.');
      return;
    }

    // 4. Validate phone & consent
    if (!isPhoneValid) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!consent) {
      setErrorMessage('Please check the consent box to receive a callback.');
      return;
    }

    setIsSubmitting(true);

    try {
      const attr = getSessionAttribution();
      const payload = buildLeadPayload({
        phone,
        name: name.trim() || undefined,
        preferredTime,
        lines,
        sourcePath: typeof window !== 'undefined' ? window.location.pathname : '/list/',
        utmSource: attr?.utmSource,
        utmMedium: attr?.utmMedium,
        utmCampaign: attr?.utmCampaign,
      });

      const res = await submitLead(payload);

      if (res.ok) {
        // Record rate limit submission count in localStorage
        recordLeadSubmission();

        // Send analytics lead event with zero PII
        trackCallbackLead({ itemCount: lines.length });

        setStatus('success');
      } else {
        setStatus('fail');
        setErrorMessage(COPY_DECK.call.fail);
      }
    } catch {
      setStatus('fail');
      setErrorMessage(COPY_DECK.call.fail);
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappUrl = getListUrl(lines);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-none dialog-overlay" />

        <Dialog.Content
          aria-describedby="callback-dialog-description"
          className="fixed inset-x-0 bottom-0 z-50 rounded-t-[12px] bg-[var(--ivory)] border-t border-[var(--line)] p-6 shadow-2xl max-h-[90vh] overflow-y-auto focus:outline-none sheet-bottom md:sheet-none md:dialog-scale md:fixed md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:inset-auto md:w-full md:max-w-md md:rounded-[8px] md:border md:border-[var(--line)]"
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-[var(--line)]">
            <div>
              <Dialog.Title className="font-display font-semibold text-xl text-[var(--ink)]">
                {COPY_DECK.call.title}
              </Dialog.Title>
              <p id="callback-dialog-description" className="text-sm text-[var(--ink-soft)] mt-1">
                {COPY_DECK.call.sub}
              </p>
            </div>

            <Dialog.Close
              aria-label="Close callback form"
              className="p-2 -mr-2 text-[var(--ink-soft)] hover:text-[var(--ink)] rounded-[4px] cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--blue)]"
            >
              <IconClose size={20} />
            </Dialog.Close>
          </div>

          {/* Success State */}
          {status === 'success' ? (
            <div className="py-8 space-y-6 text-center">
              <div className="w-12 h-12 rounded-full bg-[var(--paper)] border border-[var(--line)] flex items-center justify-center mx-auto text-[var(--wa)]">
                <IconCheck size={24} />
              </div>

              <div className="space-y-1">
                <h3 className="font-display font-medium text-lg text-[var(--ink)]">
                  {COPY_DECK.call.success}
                </h3>
                <p className="text-xs text-[var(--ink-soft)]">
                  Our shop team at Kemps Corner will ring you during store hours (9am – 9pm).
                </p>
              </div>

              <Button
                variant="primary"
                fullWidth
                onClick={() => onOpenChange(false)}
              >
                Close
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {/* Honeypot field (hidden from real users) */}
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="ws_website_hp">Leave empty</label>
                <input
                  id="ws_website_hp"
                  type="text"
                  name="website_hp"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Mobile Phone Field (Required, 48px tall) */}
              <div>
                <label
                  htmlFor="cb-phone"
                  className="block text-xs font-medium uppercase tracking-wider text-[var(--ink)] mb-1.5"
                >
                  Mobile Number <span className="text-[var(--red)]">*</span>
                </label>
                <input
                  id="cb-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  placeholder="+91 99207 51567"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  className="w-full h-12 min-h-[48px] px-3.5 rounded-[4px] border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] text-base placeholder:text-[var(--ink-soft)]/50 focus:border-[var(--ink)] focus:outline-2 focus:outline-[var(--blue)] focus:outline-offset-1 transition-colors"
                />
                {phone.trim().length > 0 && !isPhoneValid && (
                  <p className="mt-1 text-xs text-[var(--red)]">
                    Please enter a valid 10-digit Indian mobile number.
                  </p>
                )}
              </div>

              {/* Optional Name Field */}
              <div>
                <label
                  htmlFor="cb-name"
                  className="block text-xs font-medium uppercase tracking-wider text-[var(--ink)] mb-1.5"
                >
                  Your Name <span className="text-[var(--ink-soft)] font-normal">(optional)</span>
                </label>
                <input
                  id="cb-name"
                  type="text"
                  autoComplete="name"
                  placeholder="e.g. Priya Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-12 min-h-[48px] px-3.5 rounded-[4px] border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] text-base placeholder:text-[var(--ink-soft)]/50 focus:border-[var(--ink)] focus:outline-2 focus:outline-[var(--blue)] focus:outline-offset-1 transition-colors"
                />
              </div>

              {/* Preferred Time Chips */}
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[var(--ink)] mb-2">
                  Preferred Time <span className="text-[var(--ink-soft)] font-normal">(optional)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {PREFERRED_TIMES.map((time) => {
                    const isSelected = preferredTime === time;
                    return (
                      <Chip
                        key={time}
                        selected={isSelected}
                        onClick={() => setPreferredTime(isSelected ? undefined : time)}
                        className="text-xs h-9 min-h-[36px]"
                      >
                        {time}
                      </Chip>
                    );
                  })}
                </div>
              </div>

              {/* Consent Checkbox (UNTICKED by default) */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => {
                      setConsent(e.target.checked);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    className="mt-0.5 h-4 w-4 rounded-[2px] border-[var(--line)] text-[var(--ink)] focus:ring-[var(--blue)] cursor-pointer"
                  />
                  <span className="text-xs text-[var(--ink)] leading-snug">
                    {COPY_DECK.call.consent}{' '}
                    <Link
                      href="/privacy-policy/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-[var(--blue)] hover:text-[var(--ink)]"
                    >
                      Privacy Policy
                    </Link>
                  </span>
                </label>
              </div>

              {/* Inline Error Message */}
              {errorMessage && (
                <div className="p-3 rounded-[4px] bg-[#fdf2f2] border border-[#f8b4b4] text-xs text-[var(--red)] leading-relaxed">
                  {errorMessage}
                </div>
              )}

              {/* Failure State WhatsApp Fallback */}
              {status === 'fail' && (
                <div className="pt-1">
                  <Button
                    variant="whatsapp"
                    fullWidth
                    href={whatsappUrl}
                    data-track="whatsapp_click"
                    data-track-location="callback_fallback"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <IconWhatsApp size={18} />
                      <span>Chat on WhatsApp instead</span>
                    </span>
                  </Button>
                </div>
              )}

              {/* Submit CTA Button (Disabled until phone is valid and consent is ticked) */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  disabled={isSubmitDisabled}
                >
                  {isSubmitting ? 'Submitting...' : 'Request a call'}
                </Button>
              </div>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default CallbackForm;
