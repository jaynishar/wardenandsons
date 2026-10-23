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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 font-sans">
      <div className="bg-white rounded-3xl border border-border-soft p-8 sm:p-12 shadow-xs space-y-6">
        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-gold block">
            Institutional Trust &amp; Uniforms
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
            Schools and academies we have supplied
          </h2>
          <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-2xl">
            Warden &amp; Sons has provided uniform sets, sports jerseys, and event wear for educational institutions and sports academies across Mumbai.
          </p>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
          {schools.map((school, index) => (
            <li
              key={index}
              className="p-3.5 rounded-xl bg-bg-cream border border-border-soft text-xs sm:text-sm font-semibold text-forest flex items-center gap-2.5"
            >
              <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
              <span>{school}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
