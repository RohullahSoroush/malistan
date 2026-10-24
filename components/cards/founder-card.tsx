import { ArrowUpRight, BookOpen } from "lucide-react";
import { LogoMark } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/section";

export function FounderCard({ id, showStoryLink = true }: { id?: string; showStoryLink?: boolean }) {
  return (
    <article id={id} className="founder" data-spotlight aria-label="About the founder, Rohullah Mohammadi">
      <span className="founder__halo" aria-hidden="true" />

      <div className="founder__aside">
        <div className="founder__portrait" aria-hidden="true">
          <span className="topo" />
          <span className="founder__monogram">RM</span>
          <LogoMark className="founder__mark" />
        </div>
        <div className="founder__name">
          <strong>Rohullah Mohammadi</strong>
          <small>Software developer · Founder of the Malistan Archive</small>
        </div>
        <div className="founder__links">
          {showStoryLink && (
            <Button href="/about" variant="secondary">
              <BookOpen aria-hidden="true" /> Our story
            </Button>
          )}
          <Button href="https://rohullah.me" variant="ghost" target="_blank" rel="noopener noreferrer">
            rohullah.me <ArrowUpRight aria-hidden="true" />
          </Button>
        </div>
      </div>

      <div className="founder__body">
        <Eyebrow>Meet the founder</Eyebrow>
        <blockquote className="founder__quote">
          Malistan is more than a district in Ghazni. It is the place we carry with us wherever
          we go — I built this archive so that feeling has somewhere to live.
        </blockquote>
        <p>
          Rohullah Mohammadi is a software developer from Malistan who built this archive from the
          ground up — researching, writing and engineering every part of it — so his home district
          could have a thoughtful, lasting place on the internet, and an open invitation for the
          Malistan community worldwide to add, correct and grow it.
        </p>
        <div className="chip-row">
          <span className="chip">Software developer</span>
          <span className="chip">Built the Malistan Archive</span>
          <span className="chip">From Malistan, Ghazni</span>
        </div>
      </div>
    </article>
  );
}
