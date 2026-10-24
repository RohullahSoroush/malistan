export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="20.2" cy="7.6" r="2.5" fill="var(--mark-sun, currentColor)" />
      <path d="M2.6 22.4 10.4 10.6l4.3 6.4 3.3-4.6 7.4 10Z" fill="currentColor" />
      <path
        d="m8.1 14.1 1.6 1.1 1.2-1.2 1.1 1.1 1.2-.7"
        stroke="var(--mark-cut, transparent)"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M5.5 25.4h17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

export function MountainMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="44" height="36" viewBox="0 0 44 36" fill="none" aria-hidden="true">
      <path d="M2 30 17 7l8 13 5-8 12 18H2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="m11 16 6 5 5-5M25 20l5 4 5-4M9 34h26" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}
