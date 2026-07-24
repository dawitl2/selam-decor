"use client";

import NextImage from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const instagramUrl =
  "https://www.instagram.com/selam_wedding_planner_decor/";

const projects = [
  ["wedding-stage-grand.webp", "Grand Reception Stage", "events"],
  ["hero-stage.webp", "Ivory Ceremony Stage", "events"],
  ["wedding-stage-olive.webp", "Olive Reception Setting", "events"],
  ["wedding-stage-white-gold.webp", "White & Gold Celebration", "events"],
  ["floral-frame-showcase.webp", "Green & Ivory Floral Frame", "florals"],
  ["floral-frame-ivory.webp", "Illuminated Ivory Florals", "florals"],
  ["floral-frame-green.webp", "Botanical Welcome Feature", "florals"],
  ["floral-wall-full.webp", "Full Ivory Flower Wall", "florals"],
  ["floral-wall-pink.webp", "Pink Statement Wall", "florals"],
  ["floral-wall-blush.webp", "Blush Flower Wall", "florals"],
  ["floral-wall-ivory.webp", "Ivory Flower Wall", "florals"],
  ["floral-panel-white.webp", "White Floral Panel", "florals"],
  ["arrangement-white-gold.webp", "White & Gold Arrangement", "florals"],
  ["arrangement-white.webp", "Sculptural White Florals", "florals"],
  ["arrangement-yellow.webp", "Golden Bloom", "florals"],
  ["arrangement-red.webp", "Crimson Arrangement", "florals"],
  ["arrangement-green.webp", "Botanical Arrangement", "florals"],
  ["floral-vase.webp", "Signature Floral Vase", "florals"],
] as const;

type Filter = "all" | "events" | "florals";

export default function GalleryPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<number | null>(null);

  const visibleProjects = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((project) => project[2] === filter),
    [filter],
  );

  useEffect(() => {
    document.body.style.overflow = selected === null ? "" : "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (selected !== null && event.key === "ArrowRight") {
        setSelected((selected + 1) % visibleProjects.length);
      }
      if (selected !== null && event.key === "ArrowLeft") {
        setSelected(
          (selected - 1 + visibleProjects.length) % visibleProjects.length,
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selected, visibleProjects.length]);

  return (
    <main className="gallery-page">
      <header className="subpage-header section-shell">
        <Link className="subpage-brand" href="/" aria-label="Selam Decor home">
          <NextImage
            src="/assets/selam-logo.webp"
            alt="Selam Decor"
            width={96}
            height={96}
            priority
            unoptimized
          />
        </Link>
        <Link className="text-link" href="/">
          ← Back home
        </Link>
        <a
          className="button button-small"
          href={instagramUrl}
          target="_blank"
          rel="noreferrer"
        >
          Book consultation <span aria-hidden="true">→</span>
        </a>
      </header>

      <section className="gallery-page-intro section-shell">
        <p className="section-kicker">Selam portfolio</p>
        <h1>
          Celebrations made <em>beautiful.</em>
        </h1>
        <p>
          Explore wedding stages, birthday settings, custom flower walls and
          handmade floral details created for events across Addis Ababa.
        </p>
      </section>

      <section className="gallery-page-content section-shell">
        <div className="gallery-filters" aria-label="Filter full gallery">
          {([
            ["all", "All work"],
            ["events", "Event décor"],
            ["florals", "Floral craft"],
          ] as const).map(([value, label]) => (
            <button
              className={filter === value ? "active" : ""}
              key={value}
              type="button"
              onClick={() => {
                setFilter(value);
                setSelected(null);
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="full-gallery-grid">
          {visibleProjects.map(([src, label], index) => (
            <button
              className="full-gallery-item"
              key={src}
              type="button"
              aria-label={`Open ${label} image`}
              onClick={() => setSelected(index)}
            >
              <NextImage
                src={`/assets/${src}`}
                alt={label}
                fill
                sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 25vw"
                unoptimized
              />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </section>

      <footer className="gallery-page-footer">
        <div className="section-shell">
          <span>© {new Date().getFullYear()} Selam Wedding Planner & Decor</span>
          <span>
            Designed & developed by{" "}
            <a href="https://dawit.et" target="_blank" rel="noreferrer">
              Dawit Enku
            </a>{" "}
            ·{" "}
            <a
              href="https://github.com/dawitl2"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </span>
        </div>
      </footer>

      {selected !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${visibleProjects[selected][1]} image preview`}
          onClick={() => setSelected(null)}
        >
          <button
            className="lightbox-close"
            type="button"
            aria-label="Close image preview"
            onClick={() => setSelected(null)}
          >
            ×
          </button>
          <button
            className="lightbox-arrow lightbox-prev"
            type="button"
            aria-label="Previous image"
            onClick={(event) => {
              event.stopPropagation();
              setSelected(
                (selected - 1 + visibleProjects.length) %
                  visibleProjects.length,
              );
            }}
          >
            ‹
          </button>
          <div
            className="lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >
            <NextImage
              src={`/assets/${visibleProjects[selected][0]}`}
              alt={visibleProjects[selected][1]}
              fill
              sizes="94vw"
              unoptimized
            />
            <span>{visibleProjects[selected][1]}</span>
          </div>
          <button
            className="lightbox-arrow lightbox-next"
            type="button"
            aria-label="Next image"
            onClick={(event) => {
              event.stopPropagation();
              setSelected((selected + 1) % visibleProjects.length);
            }}
          >
            ›
          </button>
        </div>
      )}
    </main>
  );
}
