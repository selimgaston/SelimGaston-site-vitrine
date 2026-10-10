import type { Metadata } from "next";
import { guestlistEvent } from "@/data/guestlist";

// /guestlist tout court (lien déjà partagé, bio Instagram…) : renvoie vers la
// page de l'événement en cours, /guestlist/<slug>. Le site est exporté en
// statique (pas de redirection serveur) — d'où le meta refresh, avec un lien
// visible en secours.
const eventUrl = `/guestlist/${guestlistEvent.slug}`;

export const metadata: Metadata = {
  title: "Guestlist | Selim Gaston",
  description: guestlistEvent.active
    ? `Request to be added to the guestlist for Selim Gaston at ${guestlistEvent.venue}, ${guestlistEvent.city}.`
    : "Guestlist requests are not open right now.",
  robots: { index: false, follow: false }
};

export default function GuestlistPage() {
  return (
    <main className="guestlistPage">
      {guestlistEvent.active ? <meta httpEquiv="refresh" content={`0; url=${eventUrl}`} /> : null}

      <div className="guestlistCard">
        <div className="guestlistCardContent">
          <a className="guestlistLogoLink" href="/" aria-label="Selim Gaston — home">
            <img className="guestlistLogo" src="/logo-sg.svg" alt="Selim Gaston" />
          </a>
          <p className="eyebrow">Guestlist</p>
          {guestlistEvent.active ? (
            <>
              <h1>{guestlistEvent.venue}</h1>
              <p className="guestlistCopy">
                <a href={eventUrl}>Continue to the guestlist &rarr;</a>
              </p>
            </>
          ) : (
            <>
              <h1>Not open yet.</h1>
              <p className="guestlistCopy">Check back closer to the next event.</p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
