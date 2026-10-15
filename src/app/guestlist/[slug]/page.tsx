import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { guestlistEvent } from "@/data/guestlist";
import { GuestlistForm } from "../GuestlistForm";

type Params = Promise<{ slug: string }>;

// Une seule page générée : celle de l'événement en cours (src/data/guestlist.ts).
// Toute autre URL /guestlist/... renvoie une 404.
export function generateStaticParams() {
  return [{ slug: guestlistEvent.slug }];
}

// Page partagée au cas par cas avant chaque soirée (lien Instagram, story…) :
// pas d'intérêt à l'indexer, et son contenu (l'événement du moment) devient
// obsolète dès la soirée passée.
export const metadata: Metadata = guestlistEvent.active
  ? {
      title: `Guestlist — ${guestlistEvent.venue} | Selim Gaston`,
      description: `Request to be added to the guestlist for Selim Gaston at ${guestlistEvent.venue}, ${guestlistEvent.city}.`,
      robots: { index: false, follow: false }
    }
  : {
      title: "Guestlist | Selim Gaston",
      description: "Guestlist requests are not open right now.",
      robots: { index: false, follow: false }
    };

export default async function GuestlistEventPage({ params }: { params: Params }) {
  const { slug } = await params;
  if (slug !== guestlistEvent.slug) notFound();

  return (
    <main className="guestlistPage">
      <a className="miniHome miniHomeBadge" href="/" aria-label="Visit my website — Selim Gaston">
        {/* Texte « VISIT MY WEBSITE » qui tourne en cercle autour du logo. */}
        <svg className="miniHomeRing" viewBox="0 0 100 100" aria-hidden="true">
          <defs>
            <path id="miniHomeCircle" d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0" />
          </defs>
          <text>
            <textPath href="#miniHomeCircle" textLength="251" lengthAdjust="spacing">
              VISIT MY WEBSITE • VISIT MY WEBSITE •
            </textPath>
          </text>
        </svg>
        <img src="/logo-sg.svg" alt="" />
      </a>

      <div className="guestlistCard">
        {guestlistEvent.active && guestlistEvent.video ? (
          <video
            className="guestlistVideo"
            src={guestlistEvent.video}
            poster={guestlistEvent.videoPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        ) : null}

        <div className="guestlistCardContent">
          <a className="guestlistLogoLink" href="/" aria-label="Selim Gaston — home">
            <img className="guestlistLogo" src="/logo-sg.svg" alt="Selim Gaston" />
          </a>

          {guestlistEvent.active ? (
            <>
              <p className="eyebrow">Guestlist</p>
              <h1>{guestlistEvent.venue}</h1>
              {guestlistEvent.address ? (
                <p className="guestlistAddress">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      guestlistEvent.address
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {guestlistEvent.address}
                  </a>
                </p>
              ) : null}
              <p className="guestlistMeta">
                {guestlistEvent.date} &middot; {guestlistEvent.city}, {guestlistEvent.country}
              </p>
              <GuestlistForm />
            </>
          ) : (
            <>
              <p className="eyebrow">Guestlist</p>
              <h1>Guestlist closed.</h1>
              <p className="guestlistCopy">Check back closer to the next event.</p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
