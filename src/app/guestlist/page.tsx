import type { Metadata } from "next";
import { guestlistEvent } from "@/data/guestlist";
import { GuestlistForm } from "./GuestlistForm";

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

export default function GuestlistPage() {
  return (
    <main className="guestlistPage">
      <a className="miniHome" href="/">
        <img src="/logo-sg.svg" alt="Selim Gaston" />
      </a>

      <div className="guestlistCard">
        <img className="guestlistLogo" src="/logo-sg.svg" alt="Selim Gaston" />

        {guestlistEvent.active ? (
          <>
            <p className="eyebrow">Guestlist</p>
            <h1>{guestlistEvent.venue}</h1>
            <p className="guestlistMeta">
              {guestlistEvent.date} &middot; {guestlistEvent.city}, {guestlistEvent.country}
            </p>
            <GuestlistForm />
          </>
        ) : (
          <>
            <p className="eyebrow">Guestlist</p>
            <h1>Not open yet.</h1>
            <p className="guestlistCopy">Check back closer to the next event.</p>
          </>
        )}
      </div>
    </main>
  );
}
