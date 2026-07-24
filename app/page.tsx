"use client";

import NextImage from "next/image";
import type { ComponentProps } from "react";
import { useEffect, useMemo, useState } from "react";

function Image(props: ComponentProps<typeof NextImage>) {
  return <NextImage {...props} unoptimized />;
}

const instagramUrl =
  "https://www.instagram.com/selam_wedding_planner_decor/";
const telegramUrl = "https://t.me/selamdecoranddesign";
const whatsappUrl = "https://wa.me/251913400839";
const phoneUrl = "tel:+251913400839";
const mapUrl =
  "https://www.google.com/maps/search/?api=1&query=Bole+Atlas%2C+Addis+Ababa%2C+Ethiopia";

const gallery = [
  {
    src: "/assets/wedding-stage-white-gold.webp",
    alt: "White and gold congratulations backdrop with floral side frames",
    category: "events",
    label: "Congratulations Backdrop",
  },
  {
    src: "/assets/floral-frame-showcase.webp",
    alt: "Green and ivory custom floral display frame",
    category: "florals",
    label: "Green & Ivory Floral Frame",
  },
  {
    src: "/assets/wedding-stage-grand.webp",
    alt: "Large gold and floral wedding stage",
    category: "events",
    label: "Grand Reception Stage",
  },
  {
    src: "/assets/arrangement-red.webp",
    alt: "Handmade red flower arrangement in a gold vase",
    category: "florals",
    label: "Crimson Arrangement",
  },
  {
    src: "/assets/wedding-stage-olive.webp",
    alt: "Olive green and ivory reception head-table stage",
    category: "events",
    label: "Olive Reception Stage",
  },
  {
    src: "/assets/floral-wall-blush.webp",
    alt: "Blush pink and ivory handmade flower wall",
    category: "florals",
    label: "Blush Flower Wall",
  },
  {
    src: "/assets/floral-frame-ivory.webp",
    alt: "Warm illuminated ivory custom floral display",
    category: "florals",
    label: "Illuminated Ivory Florals",
  },
  {
    src: "/assets/arrangement-yellow.webp",
    alt: "Handmade yellow floral arrangement beside Selam Decor branding",
    category: "florals",
    label: "Golden Bloom",
  },
  {
    src: "/assets/floral-wall-ivory.webp",
    alt: "Dense ivory custom flower wall",
    category: "florals",
    label: "Ivory Flower Wall",
  },
];

const services = [
  {
    number: "01",
    title: "Wedding & Ceremony Styling",
    text: "Stage focal points, ceremonial backdrops, entrances and reception details composed as one graceful setting.",
    image: "/assets/wedding-stage-grand.webp",
    alt: "Grand wedding ceremony stage",
  },
  {
    number: "02",
    title: "Engagements & Celebrations",
    text: "Romantic settings for engagements, birthdays, bridal moments and private celebrations—tailored to the occasion.",
    image: "/assets/wedding-stage-olive.webp",
    alt: "Olive and ivory celebration backdrop",
  },
  {
    number: "03",
    title: "Custom Floral Design",
    text: "Hand-shaped arrangements, statement flower walls and floral features made in your chosen palette and style.",
    image: "/assets/floral-wall-pink.webp",
    alt: "Pink and ivory custom flower wall",
  },
  {
    number: "04",
    title: "Flower Walls & Floral Features",
    text: "Handmade flower walls, illuminated floral frames and statement features prepared in coordinated colors and forms.",
    image: "/assets/floral-frame-green.webp",
    alt: "Green and ivory custom floral display setup",
  },
];

const process = [
  {
    number: "01",
    title: "Share your vision",
    text: "Tell us about the occasion, venue, feeling, colors and details that matter to you.",
  },
  {
    number: "02",
    title: "Shape the concept",
    text: "The setting, floral direction and key focal moments are brought into one cohesive idea.",
  },
  {
    number: "03",
    title: "Bring it to life",
    text: "Each element is prepared and styled so the finished space feels effortless, personal and memorable.",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "events" | "florals">("all");
  const [selected, setSelected] = useState<number | null>(null);

  const visibleGallery = useMemo(
    () =>
      filter === "all"
        ? gallery
        : gallery.filter((item) => item.category === filter),
    [filter],
  );

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    document
      .querySelectorAll<HTMLElement>("[data-reveal]")
      .forEach((element) => revealObserver.observe(element));

    return () => revealObserver.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      menuOpen || selected !== null ? "hidden" : "";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSelected(null);
      }

      if (selected !== null && event.key === "ArrowRight") {
        setSelected((selected + 1) % visibleGallery.length);
      }

      if (selected !== null && event.key === "ArrowLeft") {
        setSelected(
          (selected - 1 + visibleGallery.length) % visibleGallery.length,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen, selected, visibleGallery.length]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Selam Decor home">
          <Image
            src="/assets/selam-logo.webp"
            alt="Selam Decor"
            width={144}
            height={144}
            priority
          />
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <a className="active" href="#home">
            Home
          </a>
          <a href="#services">Services</a>
          <a href="#florals">Florals</a>
          <a href="#gallery">Gallery</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <a
          className="button button-small header-cta"
          href={instagramUrl}
          target="_blank"
          rel="noreferrer"
        >
          Book consultation <span aria-hidden="true">→</span>
        </a>

        <button
          className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <div
        className={`mobile-menu ${menuOpen ? "is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          {[
            ["Home", "#home"],
            ["Services", "#services"],
            ["Florals", "#florals"],
            ["Gallery", "#gallery"],
            ["About", "#about"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <a href={href} key={href} onClick={closeMenu}>
              {label}
            </a>
          ))}
        </nav>
        <a
          className="button"
          href={instagramUrl}
          target="_blank"
          rel="noreferrer"
          onClick={closeMenu}
        >
          Start a conversation <span aria-hidden="true">→</span>
        </a>
      </div>

      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow">Wedding planning · event styling · florals</p>
          <h1>
            <span>Beautiful</span>
            <em>Moments</em>
          </h1>
          <div className="title-ornament" aria-hidden="true">
            <span />
            <b>✦</b>
            <span />
          </div>
          <p className="hero-tagline">
            Crafted with elegance. Created for you.
          </p>
          <div className="hero-actions">
            <a
              className="button"
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
            >
              Book consultation <span aria-hidden="true">→</span>
            </a>
            <a className="text-link" href="#gallery">
              Explore our work
            </a>
          </div>
        </div>

        <div className="hero-image">
          <Image
            src="/assets/hero-stage.webp"
            alt="Elegant ivory wedding stage with draping, chandeliers and floral arrangements"
            fill
            priority
            sizes="(max-width: 760px) 100vw, 62vw"
          />
          <div className="hero-image-wash" />
        </div>

        <Image
          className="hero-foliage hero-foliage-left"
          src="/assets/foliage.webp"
          alt=""
          width={410}
          height={560}
          aria-hidden="true"
        />
        <Image
          className="hero-foliage hero-foliage-right"
          src="/assets/foliage.webp"
          alt=""
          width={360}
          height={500}
          aria-hidden="true"
        />

        <div className="hero-rule" aria-hidden="true">
          <span />
          <i>❦</i>
          <span />
        </div>
      </section>

      <section className="dual-craft" aria-labelledby="dual-craft-title">
        <div className="dual-craft-heading section-shell reveal" data-reveal>
          <p className="section-kicker">Two sides of the Selam story</p>
          <h2 id="dual-craft-title">
            Event décor and floral craft,
            <em> designed together.</em>
          </h2>
          <p>
            Selam combines full celebration styling with handmade floral work.
            The setting shapes the room; the flowers give it its character.
          </p>
        </div>

        <div className="craft-grid section-shell">
          <article className="craft-card craft-card-decor reveal" data-reveal>
            <div className="craft-art decor-art" aria-hidden="true">
              <div className="decor-arch decor-arch-left" />
              <div className="decor-arch decor-arch-center" />
              <div className="decor-arch decor-arch-right" />
              <div className="decor-drape decor-drape-one" />
              <div className="decor-drape decor-drape-two" />
              <div className="decor-table" />
              <div className="decor-bloom decor-bloom-left" />
              <div className="decor-bloom decor-bloom-right" />
            </div>
            <div className="craft-card-copy">
              <span>01 · The setting</span>
              <h3>Event Decoration</h3>
              <p>
                Stages, backdrops, entrances, tables and focal moments composed
                into one complete celebration.
              </p>
            </div>
          </article>

          <article className="craft-card craft-card-floral reveal" data-reveal>
            <div className="craft-art flower-art" aria-hidden="true">
              <div className="flower-stem flower-stem-one" />
              <div className="flower-stem flower-stem-two" />
              <div className="flower-stem flower-stem-three" />
              <span className="graphic-bloom graphic-bloom-one" />
              <span className="graphic-bloom graphic-bloom-two" />
              <span className="graphic-bloom graphic-bloom-three" />
              <span className="graphic-bloom graphic-bloom-four" />
              <span className="graphic-leaf graphic-leaf-one" />
              <span className="graphic-leaf graphic-leaf-two" />
              <span className="graphic-leaf graphic-leaf-three" />
              <div className="graphic-vase" />
            </div>
            <div className="craft-card-copy">
              <span>02 · The signature</span>
              <h3>Custom Flower Design</h3>
              <p>
                Handmade arrangements, flower walls and floral features shaped
                in the colors and style chosen for the occasion.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="intro section-shell" id="about">
        <div className="intro-visual reveal" data-reveal>
          <div className="intro-image intro-image-main">
            <Image
              src="/assets/floral-vase.webp"
              alt="Sculptural handmade floral arrangement in a white vase"
              fill
              sizes="(max-width: 760px) 80vw, 35vw"
            />
          </div>
          <div className="intro-image intro-image-small">
            <Image
              src="/assets/wedding-stage-white-gold.webp"
              alt="White and gold congratulations backdrop"
              fill
              sizes="(max-width: 760px) 45vw, 18vw"
            />
          </div>
          <div className="round-mark" aria-hidden="true">
            SD
          </div>
        </div>

        <div className="intro-copy reveal" data-reveal>
          <p className="section-kicker">The Selam touch</p>
          <h2>
            One vision, styled
            <em> beautifully.</em>
          </h2>
          <p className="lead">
            Selam Wedding Planner & Decor brings event decoration and custom
            floral work together—so every stage, entrance, table and bloom feels
            connected.
          </p>
          <p>
            From weddings and engagements to birthdays, ceremonies and private
            celebrations, each setting begins with the mood you want your guests
            to feel. Then color, form, flowers and finishing details are layered
            into a space that is unmistakably yours.
          </p>
          <a className="text-link with-arrow" href="#services">
            Discover what we create <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section className="services" id="services">
        <div className="section-heading section-shell reveal" data-reveal>
          <div>
            <p className="section-kicker">Designed around your occasion</p>
            <h2>Celebrations, considered from every angle.</h2>
          </div>
          <p>
            A calm, cohesive approach to spaces that should feel as special as
            the people gathering inside them.
          </p>
        </div>

        <div className="service-grid section-shell">
          {services.map((service) => (
            <article className="service-card reveal" data-reveal key={service.title}>
              <div className="service-image">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  sizes="(max-width: 760px) 100vw, 25vw"
                />
                <span>{service.number}</span>
              </div>
              <div className="service-content">
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="floral-story section-shell" id="florals">
        <div className="floral-copy reveal" data-reveal>
          <p className="section-kicker">Made petal by petal</p>
          <h2>
            Floral design with
            <em> a signature of its own.</em>
          </h2>
          <p className="lead">
            Flowers can frame a whole room or become the smallest detail a guest
            remembers.
          </p>
          <p>
            Choose from soft ivory, romantic blush, vibrant color or botanical
            green. Custom flower walls, sculptural vase arrangements and floral
            frames can be coordinated with your wider event palette.
          </p>
          <ul className="floral-list">
            <li>
              <span>01</span> Statement flower walls
            </li>
            <li>
              <span>02</span> Sculptural vase arrangements
            </li>
            <li>
              <span>03</span> Floral frames and focal features
            </li>
            <li>
              <span>04</span> Custom colors and themes
            </li>
          </ul>
        </div>

        <div className="floral-collage reveal" data-reveal>
          <div className="floral-photo floral-photo-tall">
            <Image
              src="/assets/floral-wall-full.webp"
              alt="Ivory custom flower wall with green leaves"
              fill
              sizes="(max-width: 760px) 70vw, 31vw"
            />
          </div>
          <div className="floral-photo floral-photo-detail">
            <Image
              src="/assets/arrangement-white-gold.webp"
              alt="White handmade floral arrangement in a gold vase"
              fill
              sizes="(max-width: 760px) 48vw, 20vw"
            />
          </div>
          <div className="floral-note">
            <span>Custom</span>
            <strong>Florals</strong>
            <small>designed for your story</small>
          </div>
        </div>
      </section>

      <section className="location-section" id="location">
        <div className="location-shell section-shell">
          <div className="location-copy reveal" data-reveal>
            <p className="section-kicker">Visit Selam</p>
            <h2>
              Find us in
              <em> Addis Ababa.</em>
            </h2>
            <p>
              Selam Wedding Planner & Decor is publicly listed in the Bole Atlas
              area. Open the map for directions or contact the team before your
              visit.
            </p>
            <div className="location-details">
              <span>Location</span>
              <strong>Bole Atlas, Addis Ababa</strong>
              <small>Please confirm the exact building before visiting.</small>
            </div>
            <a
              className="button"
              href={mapUrl}
              target="_blank"
              rel="noreferrer"
            >
              Open in Google Maps <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="map-frame reveal" data-reveal>
            <iframe
              title="Map showing Bole Atlas, Addis Ababa"
              src="https://www.google.com/maps?q=Bole+Atlas,+Addis+Ababa,+Ethiopia&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="map-caption">
              <span className="map-pin" aria-hidden="true">
                ●
              </span>
              <div>
                <strong>Selam Wedding Planner & Decor</strong>
                <small>Bole Atlas · Addis Ababa</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="portfolio" id="gallery">
        <div className="section-heading section-shell reveal" data-reveal>
          <div>
            <p className="section-kicker">Selected work</p>
            <h2>Scenes made to be remembered.</h2>
          </div>
          <div className="gallery-filters" aria-label="Filter gallery">
            {[
              ["all", "All"],
              ["events", "Event styling"],
              ["florals", "Floral craft"],
            ].map(([value, label]) => (
              <button
                className={filter === value ? "active" : ""}
                key={value}
                type="button"
                onClick={() => {
                  setFilter(value as "all" | "events" | "florals");
                  setSelected(null);
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="gallery-grid section-shell">
          {visibleGallery.map((item, index) => (
            <button
              className="gallery-item reveal"
              data-reveal
              type="button"
              key={item.src}
              onClick={() => setSelected(index)}
              aria-label={`Open ${item.label} image`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 760px) 100vw, 34vw"
              />
              <span>
                <small>View project</small>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="process section-shell" id="process">
        <div className="process-heading reveal" data-reveal>
          <p className="section-kicker">A thoughtful process</p>
          <h2>
            From first idea to
            <em> final flourish.</em>
          </h2>
          <p>
            Clear conversations first. A coherent design next. Then a setting
            ready to welcome the people who matter most.
          </p>
        </div>
        <div className="process-steps">
          {process.map((step) => (
            <article className="process-step reveal" data-reveal key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <Image
          className="contact-foliage contact-foliage-left"
          src="/assets/foliage.webp"
          alt=""
          width={310}
          height={450}
          aria-hidden="true"
        />
        <Image
          className="contact-foliage contact-foliage-right"
          src="/assets/foliage.webp"
          alt=""
          width={310}
          height={450}
          aria-hidden="true"
        />
        <div className="contact-inner reveal" data-reveal>
          <p className="section-kicker">Begin your celebration</p>
          <h2>
            Let&apos;s create something
            <em> beautiful.</em>
          </h2>
          <p>
            Share your event, preferred date and design ideas to begin the
            conversation.
          </p>
          <div className="contact-channels" aria-label="Ways to contact Selam">
            <a
              className="contact-channel"
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span className="channel-mark" aria-hidden="true">
                IG
              </span>
              <span className="channel-copy">
                <strong>Instagram</strong>
                <small>@selam_wedding_planner_decor</small>
              </span>
              <i aria-hidden="true">↗</i>
            </a>
            <a
              className="contact-channel"
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span className="channel-mark" aria-hidden="true">
                WA
              </span>
              <span className="channel-copy">
                <strong>WhatsApp</strong>
                <small>Chat with Selam</small>
              </span>
              <i aria-hidden="true">↗</i>
            </a>
            <a
              className="contact-channel"
              href={telegramUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span className="channel-mark" aria-hidden="true">
                TG
              </span>
              <span className="channel-copy">
                <strong>Telegram</strong>
                <small>@selamdecoranddesign</small>
              </span>
              <i aria-hidden="true">↗</i>
            </a>
            <a className="contact-channel" href={phoneUrl}>
              <span className="channel-mark channel-mark-phone" aria-hidden="true">
                TEL
              </span>
              <span className="channel-copy">
                <strong>Call Selam</strong>
                <small>0913 400 839</small>
              </span>
              <i aria-hidden="true">→</i>
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-main section-shell">
          <a className="footer-brand" href="#home">
            <Image
              src="/assets/selam-logo.webp"
              alt="Selam Wedding Planner & Decor"
              width={170}
              height={170}
            />
          </a>
          <p>
            Elegant wedding planning, event decoration and custom floral design
            for meaningful celebrations.
          </p>
          <nav aria-label="Footer navigation">
            <a href="#services">Services</a>
            <a href="#florals">Custom florals</a>
            <a href="#gallery">Gallery</a>
            <a href="#about">About</a>
          </nav>
          <div className="footer-contact">
            <a href={phoneUrl}>+251 913 400 839</a>
            <span>Bole Atlas, Addis Ababa</span>
            <a href={instagramUrl} target="_blank" rel="noreferrer">
              Instagram ↗
            </a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              WhatsApp ↗
            </a>
            <a href={telegramUrl} target="_blank" rel="noreferrer">
              Telegram ↗
            </a>
          </div>
        </div>
        <div className="footer-bottom section-shell">
          <span>
            © {new Date().getFullYear()} Selam Wedding Planner & Decor
          </span>
          <span>Beautiful moments, thoughtfully made.</span>
        </div>
      </footer>

      {selected !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${visibleGallery[selected].label} image preview`}
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
                (selected - 1 + visibleGallery.length) %
                  visibleGallery.length,
              );
            }}
          >
            ‹
          </button>
          <div className="lightbox-content" onClick={(event) => event.stopPropagation()}>
            <Image
              src={visibleGallery[selected].src}
              alt={visibleGallery[selected].alt}
              fill
              sizes="92vw"
            />
            <span>{visibleGallery[selected].label}</span>
          </div>
          <button
            className="lightbox-arrow lightbox-next"
            type="button"
            aria-label="Next image"
            onClick={(event) => {
              event.stopPropagation();
              setSelected((selected + 1) % visibleGallery.length);
            }}
          >
            ›
          </button>
        </div>
      )}
    </main>
  );
}
