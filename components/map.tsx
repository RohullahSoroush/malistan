"use client";
import { useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
export function DistrictMap() {
  const [loaded, setLoaded] = useState(false);
  const [ready, setReady] = useState(false);
  return (
    <div className={ready ? "map-frame map-interactive" : "map-frame"}>
      {loaded && (
        <iframe
          title="Interactive OpenStreetMap showing Malistan near Mir Adina, Ghazni, Afghanistan"
          src="https://www.openstreetmap.org/export/embed.html?bbox=66.80%2C33.10%2C67.56%2C33.56&layer=mapnik&marker=33.2953%2C67.1689"
          onLoad={() => setReady(true)}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            visibility: ready ? "visible" : "hidden",
          }}
        />
      )}
      {!ready && (
        <div className="map-art">
          <svg
            viewBox="0 0 800 440"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="contours"
                width="200"
                height="160"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M-30 100C40-30 130 160 230 20M-30 120C40-10 130 180 230 40M-30 140C40 10 130 200 230 60M-30 160C40 30 130 220 230 80M-30 180C40 50 130 240 230 100"
                  fill="none"
                  stroke="#b6baa2"
                  strokeWidth=".8"
                />
              </pattern>
            </defs>
            <rect width="800" height="440" fill="#e9e8db" />
            <rect width="800" height="440" fill="url(#contours)" />
            <path
              d="M0 360Q200 80 380 280T800 80"
              fill="none"
              stroke="#b8d2d0"
              strokeWidth="6"
            />
            <path
              d="m60 430 200-200 130 40 130-120 240-60"
              fill="none"
              stroke="#fffdf5"
              strokeWidth="8"
            />
            <path
              d="m60 430 200-200 130 40 130-120 240-60"
              fill="none"
              stroke="#cbbfa4"
              strokeWidth="2"
              strokeDasharray="7 5"
            />
            <text x="100" y="100" fill="#757d6b" fontSize="15">
              AJRISTAN
            </text>
            <text x="620" y="100" fill="#757d6b" fontSize="15">
              NAWUR
            </text>
            <text x="600" y="360" fill="#757d6b" fontSize="15">
              JAGHORI
            </text>
          </svg>
          <div className="map-location">
            <MapPin size={30} />
            <strong>Malistan</strong>
            <span>Mir Adina · Ghazni</span>
          </div>
          {loaded ? (
            <a
              className="button map-load"
              href="https://www.openstreetmap.org/?mlat=33.2953&mlon=67.1689#map=11/33.2953/67.1689"
              target="_blank"
              rel="noreferrer"
            >
              Map loading · open full map <ArrowUpRight size={17} />
            </a>
          ) : (
            <button className="button map-load" onClick={() => setLoaded(true)}>
              Explore interactive map <ArrowUpRight size={17} />
            </button>
          )}
          <small className="map-note">
            Illustrative landscape · not a boundary map
          </small>
        </div>
      )}
      <a
        className="map-external"
        style={{ zIndex: 2 }}
        href="https://www.openstreetmap.org/?mlat=33.2953&mlon=67.1689#map=11/33.2953/67.1689"
        target="_blank"
        rel="noreferrer"
      >
        OpenStreetMap <ArrowUpRight size={13} />
      </a>
    </div>
  );
}
