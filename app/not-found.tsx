import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/section";

export default function NotFound() {
  return (
    <main id="main" className="container not-found">
      <div className="not-found__inner">
        <span className="not-found__code" aria-hidden="true">404</span>
        <Eyebrow>A path less travelled</Eyebrow>
        <h1 className="display">Let&apos;s find our way home.</h1>
        <p>This page could not be found — but there is still plenty of Malistan to discover.</p>
        <Button href="/" size="lg"><ArrowLeft aria-hidden="true" /> Back to Malistan</Button>
      </div>
    </main>
  );
}
