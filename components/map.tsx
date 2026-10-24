"use client";

import { useState } from "react";
import { ArrowUpRight, Map as MapIcon } from "lucide-react";

export function DistrictMap({ lat = 33.2953, lon = 67.1689 }: { lat?: number; lon?: number }) {
  const [requested, setRequested] = useState(false);
  const [ready, setReady] = useState(false);

  const bbox = `${lon - 0.38}%2C${lat - 0.3}%2C${lon + 0.38}%2C${lat + 0.3}`;
  const embed = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lon}`;
  const external = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=11/${lat}/${lon}`;

  return (
    <div className="map-card">
      {requested && (
        <iframe
          title="OpenStreetMap showing Malistan, Ghazni, Afghanistan"
          src={embed}
          loading="lazy"
          onLoad={() => setReady(true)}
          style={{ opacity: ready ? 1 : 0 }}
        />
      )}

      {!ready && (
        <div className="map-art">
          <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
              <pattern id="map-topo" width="240" height="180" patternUnits="userSpaceOnUse">
                <path
                  d="M-40 110C40-20 140 180 280 30M-40 132C40 2 140 202 280 52M-40 154C40 24 140 224 280 74M-40 176C40 46 140 246 280 96"
                  fill="none"
                  stroke="var(--border-strong)"
                  strokeWidth="1"
                />
              </pattern>
              <radialGradient id="map-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.22" />
                <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="800" height="600" fill="var(--surface-muted)" />
            <rect width="800" height="600" fill="url(#map-topo)" />
            <circle cx="400" cy="300" r="230" fill="url(#map-glow)" />
            <path d="M-20 470Q200 180 400 330T820 140" fill="none" stroke="var(--brand)" strokeWidth="4" strokeLinecap="round" opacity="0.28" />
            <path d="M60 600 260 380 400 300 540 230 820 170" fill="none" stroke="var(--accent)" strokeWidth="3" strokeDasharray="10 8" strokeLinecap="round" opacity="0.8" />
            <text x="400" y="70" textAnchor="middle">AJRISTAN ↑</text>
            <text x="700" y="110" textAnchor="end">NAWUR ↗</text>
            <text x="420" y="560" textAnchor="middle">JAGHORI ↓</text>
            <text x="70" y="500">↙ URUZGAN</text>
          </svg>

          <div className="map-pin">
            <span className="map-pin__label">
              <strong>Malistan</strong>
              <small>Mir Adina · Ghazni</small>
            </span>
            <span className="map-pin__dot">
              <span className="map-pin__ring" />
              <span className="map-pin__ring" />
            </span>
          </div>

          <div className="map-actions">
            <button type="button" className="btn btn--primary" onClick={() => setRequested(true)} disabled={requested}>
              {requested ? "Loading map…" : <>Load interactive map <MapIcon aria-hidden="true" /></>}
            </button>
            <span className="map-note">Illustration · not a boundary map</span>
          </div>
        </div>
      )}

      <a className="map-credit" href={external} target="_blank" rel="noopener noreferrer">
        OpenStreetMap <ArrowUpRight size={13} aria-hidden="true" />
      </a>
    </div>
  );
}
