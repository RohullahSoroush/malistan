import Link from "next/link";
import { LogoMark } from "@/components/icons";

export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Malistan, مالستان — home">
      <span className="brand__mark"><LogoMark /></span>
      <span className="brand__text" aria-hidden="true">
        <span className="brand__name">Malistan</span>
        <span className="brand__native" lang="fa" dir="rtl">مالستان</span>
      </span>
    </Link>
  );
}
