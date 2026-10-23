import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="container not-found">
      <span className="eyebrow">404 · A PATH LESS TRAVELLED</span>
      <h1>
        Let’s find our
        <br />
        <em>way home.</em>
      </h1>
      <p>
        This page could not be found. There’s still plenty to discover in
        Malistan.
      </p>
      <Link className="button green" href="/">
        Back to Malistan ↗
      </Link>
    </main>
  );
}
