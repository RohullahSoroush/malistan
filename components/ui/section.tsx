import type { ReactNode } from "react";

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <span className={light ? "eyebrow eyebrow--light" : "eyebrow"}>{children}</span>;
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  action,
  center = false,
  id,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
  center?: boolean;
  id?: string;
}) {
  return (
    <div className={center ? "section-header section-header--center" : "section-header"}>
      <div className="section-header__text">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="section-title" id={id}>{title}</h2>
        {intro && <p className="section-intro">{intro}</p>}
      </div>
      {action}
    </div>
  );
}

export function PageHero({ eyebrow, title, intro }: { eyebrow: ReactNode; title: ReactNode; intro?: ReactNode }) {
  return (
    <header className="page-hero">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="page-hero__title">{title}</h1>
      {intro && <p className="page-hero__intro">{intro}</p>}
    </header>
  );
}
