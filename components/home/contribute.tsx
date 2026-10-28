import { ArrowUpRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

export function Contribute() {
  return (
    <section className="section--tight" aria-labelledby="cta-title">
      <div className="container">
        <Reveal>
          <div className="cta">
            <span className="topo" aria-hidden="true" />
            <span className="cta__orb cta__orb--a" aria-hidden="true" />
            <span className="cta__orb cta__orb--b" aria-hidden="true" />
            <Eyebrow light>Grow the archive</Eyebrow>
            <h2 id="cta-title" className="cta__title">
              Have a memory of Malistan <em>to share?</em>
            </h2>
            <p>
              A photograph, a family story, a voice recording, or someone whose contribution deserves to
              be remembered — every addition makes the archive richer for everyone who comes after.
            </p>
            <div className="cta__actions">
              <Button href="/about#contribute-to-a-future-edition" variant="light" size="lg">
                How to contribute <ArrowUpRight aria-hidden="true" />
              </Button>
              <Button href="/contact" variant="glass" size="lg">
                <Mail aria-hidden="true" /> Get in touch
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
