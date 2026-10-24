"use client";

import { useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";

interface DistrictMapProps {
  lat?: number;
  lon?: number;
}

export function DistrictMap({ lat = 33.2953, lon = 67.1689 }: DistrictMapProps) {
  const [loaded, setLoaded] = useState(false);
  const [ready,  setReady]  = useState(false);

  const bbox = `${lon - 0.38}%2C${lat - 0.60}%2C${lon + 0.38}%2C${lat + 0.23}`;
  const osmEmbed = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lon}`;
  const osmLink  = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=11/${lat}/${lon}`;

  return (
    <div className={ready ? "map-frame map-interactive" : "map-frame"}>
      {loaded && (
        <iframe
          title="Interactive OpenStreetMap showing Malistan, Ghazni, Afghanistan"
          src={osmEmbed}
          onLoad={() => setReady(true)}
          style={{
            position: "absolute", inset: 0, zIndex: 1,
            visibility: ready ? "visible" : "hidden",
            border: 0,
          }}
        />
      )}

      {!ready && (
        <div className="map-art">
          <svg
            viewBox="0 0 800 440"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
            style={{ width: "100%", height: "100%", display: "block" }}
          >
            <defs>
              <pattern id="topo" width="200" height="160" patternUnits="userSpaceOnUse">
                <path
                  d="M-30 100C40-30 130 160 230 20M-30 120C40-10 130 180 230 40M-30 140C40 10 130 200 230 60M-30 160C40 30 130 220 230 80M-30 180C40 50 130 240 230 100"
                  fill="none" stroke="var(--bark, #D2CCBE)" strokeWidth=".7" opacity=".9"
                />
              </pattern>
            </defs>
            <rect width="800" height="440" fill="var(--clay, #EBE8DF)" />
            <rect width="800" height="440" fill="url(#topo)" />
            {/* River */}
            <path d="M0 360Q200 80 380 280T800 80" fill="none" stroke="var(--moss, #5B7868)" strokeWidth="4" opacity=".3" />
            {/* Road */}
            <path d="m60 430 200-200 130 40 130-120 240-60" fill="none" stroke="var(--stone, #F6F4EC)" strokeWidth="7" />
            <path d="m60 430 200-200 130 40 130-120 240-60" fill="none" stroke="var(--bark, #D2CCBE)" strokeWidth="1.5" strokeDasharray="7 5" />
            {/* Labels */}
            <text x="90"  y="96"  fill="var(--moss, #5B7868)" fontSize="13" fontFamily="Manrope, system-ui, sans-serif" fontWeight="600" letterSpacing="0.06em">AJRISTAN</text>
            <text x="620" y="96"  fill="var(--moss, #5B7868)" fontSize="13" fontFamily="Manrope, system-ui, sans-serif" fontWeight="600" letterSpacing="0.06em">NAWUR</text>
            <text x="590" y="360" fill="var(--moss, #5B7868)" fontSize="13" fontFamily="Manrope, system-ui, sans-serif" fontWeight="600" letterSpacing="0.06em">JAGHORI</text>
          </svg>

          <div className="map-location">
            <MapPin size={26} />
            <strong>Malistan</strong>
            <span>Mir Adina · Ghazni</span>
          </div>

          {loaded ? (
            <a className="map-load" href={osmLink} target="_blank" rel="noreferrer">
              Map loading · open full map <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          ) : (
            <button className="map-load" onClick={() => setLoaded(true)}>
              Explore interactive map <ArrowUpRight size={16} aria-hidden="true" />
            </button>
          )}

          <small className="map-note">Illustrative landscape · not a boundary map</small>
        </div>
      )}

      <a className="map-external" href={osmLink} target="_blank" rel="noreferrer">
        OpenStreetMap <ArrowUpRight size={11} aria-hidden="true" />
      </a>
    </div>
  );
}
