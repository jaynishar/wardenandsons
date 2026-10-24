import React from 'react';
import { getSchoolsServed } from '@/lib/owner-inputs';

export default function SchoolsServedSection() {
  const schools = getSchoolsServed();

  if (!schools || schools.length === 0) {
    return (
      /* TODO: Add schools and academies we have supplied once confirmed by store owner in owner-inputs.json */
      null
    );
  }

  return (
    <section className="mt-16 font-sans">
      <div className="bg-[var(--surface)] p-8 sm:p-12 space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold text-[var(--ink)]/60">
            Institutional Trust &amp; Uniforms
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--ink)] tracking-tight">
            Schools and academies we have supplied
          </h2>
          <p className="text-sm text-[var(--ink)]/75 leading-relaxed max-w-2xl">
            Warden &amp; Sons has provided uniform sets, sports jerseys, and event wear for educational institutions and sports academies across Mumbai.
          </p>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
          {schools.map((school, index) => (
            <li
              key={index}
              className="p-4 bg-white border border-[var(--line)] rounded-sm text-sm font-medium text-[var(--ink)] flex items-center gap-3 shadow-xs"
            >
              <span className="w-2.5 h-2.5 bg-[var(--blue)] shrink-0" />
              <span>{school}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
