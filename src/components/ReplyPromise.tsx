import React from 'react';
import { getReplyPromise } from '@/lib/owner-inputs';

interface ReplyPromiseProps {
  className?: string;
}

export default function ReplyPromise({ className = '' }: ReplyPromiseProps) {
  const promise = getReplyPromise();
  if (!promise) return null;

  return (
    <p className={`text-[11px] text-muted flex items-center justify-center gap-1.5 ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 inline-block" />
      <span>{promise}</span>
    </p>
  );
}
