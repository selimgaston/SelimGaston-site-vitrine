import { Fragment, type CSSProperties } from "react";
import { profile } from "@/data/profile";
import { MenuNav } from "./MenuNav";
import { TopLink } from "./TopLink";
import { ScrollReveal } from "./ScrollReveal";
import { WhatsAppTheme } from "./WhatsAppTheme";

function getSpotifyEmbedUrl(url: string) {
  const cleanUrl = url.split("?")[0].replace("/intl-fr/", "/");
  return cleanUrl.replace("open.spotify.com/", "open.spotify.com/embed/");
}

function getSoundCloudEmbedUrl(url: string) {
  return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23e7ff3b&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`;
}

function PlatformLogo({ name }: { name: string }) {
  if (name === "spotify") {
    return (
      <svg aria-hidden="true" viewBox="0 0 88 88">
        <path d="M44 0C19.7 0 0 19.7 0 44s19.7 44 44 44 44-19.7 44-44S68.3 0 44 0Zm20.2 63.4c-.7 1.2-2.2 1.6-3.4.9-9.2-5.6-20.8-6.9-34.4-3.8-1.3.3-2.7-.5-3-1.9-.3-1.3.5-2.7 1.9-3 14.9-3.4 27.8-1.9 38 4.4 1.2.7 1.6 2.2.9 3.4Zm5.4-12c-.9 1.5-2.9 2-4.4 1.1-10.5-6.5-26.6-8.4-39-4.6-1.7.5-3.5-.5-4-2.1-.5-1.7.5-3.5 2.1-4 14.3-4.3 32.1-2.2 44.2 5.2 1.5.9 2 2.9 1.1 4.4Zm.5-12.5c-12.6-7.5-33.5-8.2-45.6-4.5-2 .6-4.2-.5-4.8-2.6-.6-2 .5-4.2 2.6-4.8 13.9-4.2 37.1-3.3 51.8 5.4 1.8 1.1 2.4 3.5 1.3 5.3-1.1 1.8-3.4 2.4-5.3 1.2Z" />
      </svg>
    );
  }

  if (name === "soundcloud") {
    return (
      <svg aria-hidden="true" viewBox="0 0 96 54">
        <path d="M78.6 21.5c-1.7 0-3.3.3-4.8.9C72.8 9.9 62.4 0 49.7 0c-5.7 0-10.9 1.9-15.1 5.2-.9.7-1.1 1.3-1.1 2.7v40.6c0 1.5 1.2 2.7 2.7 2.7h42.4c8.2 0 14.9-6.6 14.9-14.8s-6.7-14.9-14.9-14.9ZM.8 32.7c-.4 0-.8.4-.8.8v14.6c0 .5.4.8.8.8s.8-.4.8-.8V33.5c0-.4-.3-.8-.8-.8Zm6.6-5.8c-.5 0-.9.4-.9.9v20.3c0 .5.4.9.9.9s.9-.4.9-.9V27.8c0-.5-.4-.9-.9-.9Zm6.8 1.1c-.6 0-1 .5-1 1v19.1c0 .6.5 1 1 1 .6 0 1-.5 1-1V29c0-.5-.4-1-1-1Zm6.8-7.4c-.7 0-1.2.5-1.2 1.2v26.3c0 .7.5 1.2 1.2 1.2s1.2-.5 1.2-1.2V21.8c0-.7-.5-1.2-1.2-1.2Zm6.9-6c-.8 0-1.4.6-1.4 1.4v32.1c0 .8.6 1.4 1.4 1.4.7 0 1.3-.6 1.3-1.4V16c0-.8-.6-1.4-1.3-1.4Z" />
      </svg>
    );
  }

  if (name === "youtube") {
    return (
      <svg aria-hidden="true" viewBox="0 0 96 68">
        <path d="M94 14.2s-.9-6.7-3.8-9.6C86.6.8 82.5.8 80.6.6 67.2-.4 48-.4 48-.4h-.1S28.8-.4 15.4.6c-1.9.2-6 .2-9.6 4C2.9 7.5 2 14.2 2 14.2S1 22.1 1 29.9v7.4c0 7.9 1 15.7 1 15.7s.9 6.7 3.8 9.6c3.6 3.8 8.4 3.7 10.6 4.1 7.7.7 31.6 1 31.6 1s19.2 0 32.6-1c1.9-.2 6-.2 9.6-4.1C93.1 59.7 94 53 94 53s1-7.9 1-15.7v-7.4c0-7.8-1-15.7-1-15.7ZM39.1 47.1V19.8l25.9 13.7-25.9 13.6Z" />
      </svg>
    );
  }

  if (name === "beatport") {
    // Official Beatport primary icon (support.beatport.com — TBG-PrimaryIcon-Black.svg)
    return (
      <svg aria-hidden="true" viewBox="205 220 610 770">
        <path d="M817.7,763.3c0,120-95.8,217-217,217c-120,0-215.8-94.6-215.8-217c0-57.6,21.8-108.5,56.4-146.7L294.6,763.3l-77-77l165.5-163.7c22.4-22.4,33.9-51.5,33.9-83.6V233.6h108.5V439c0,63-22.4,116.4-66.1,160l-4.9,4.8c38.2-35.2,90.3-56.4,146.1-56.4C723.8,547.5,817.7,645.1,817.7,763.3z M719.5,763.3c0-64.3-53.3-116.4-118.8-116.4c-66.1,0-117.6,54.6-117.6,116.4c0,63.6,52.1,117.6,117.6,117.6C668.6,880.9,719.5,825.8,719.5,763.3z" />
      </svg>
    );
  }

  if (name === "facebook") {
    return (
      <svg aria-hidden="true" viewBox="0 0 56 88">
        <path d="M36.7 14.6H52V0H34.4C17.7 0 8.6 9.7 8.6 27.3v11.5H0v16.3h8.6V88h18.1V55.1h15.1l2.9-16.3h-18V29c0-9.1 2.5-14.4 10-14.4Z" />
      </svg>
    );
  }

  if (name === "booking") {
    return (
      <svg aria-hidden="true" viewBox="0 0 64 48">
        <path d="M6 0h52a6 6 0 0 1 6 6v36a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V6a6 6 0 0 1 6-6Zm2.9 6 21.3 18.4a2.8 2.8 0 0 0 3.6 0L58 6H8.9ZM58 13.8 37.6 31.4a8.8 8.8 0 0 1-11.2 0L6 13.8V42h52V13.8Z" />
      </svg>
    );
  }

  return <span aria-hidden="true">b</span>;
}

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24Zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885a9.827 9.827 0 0 0-2.885-6.99A9.83 9.83 0 0 0 12.05 1.98c-5.452 0-9.887 4.434-9.889 9.884a9.82 9.82 0 0 0 1.746 5.634l-.999 3.648 3.746-.953Zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475a8.96 8.96 0 0 1-1.653-2.059c-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51-.173-.008-.371-.01-.57-.01a1.09 1.09 0 0 0-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413Z" />
    </svg>
  );
}

export default function Home() {
  const platforms = [
    { name: "spotify", url: profile.spotifyUrl, bg: "#1DB954", fg: "#ffffff" },
    { name: "soundcloud", url: profile.soundcloudUrl, bg: "#FF5500", fg: "#ffffff" },
    { name: "youtube", url: profile.youtubeUrl, bg: "#FF0000", fg: "#ffffff" },
    { name: "beatport", url: profile.beatportUrl, bg: "#000000", fg: "#01FF95" },
    { name: "facebook", url: profile.facebookUrl, bg: "#1877F2", fg: "#ffffff" },
    { name: "booking", url: `mailto:${profile.email}`, bg: "#E7FF3B", fg: "#050505" }
  ];

  const bioParagraphs = profile.bio.split("\n\n").map((paragraph) => paragraph.split(" "));
  const bioWordCount = bioParagraphs.flat().length;
  const bioOffsets = bioParagraphs.map((_, p) => bioParagraphs.slice(0, p).flat().length);

  return (
    <main>
      <span id="top" aria-hidden="true" />
      <div className="scrollProgress" aria-hidden="true" />

      <nav className="nav" aria-label="Navigation principale">
        <TopLink />
        <MenuNav />
      </nav>

      <section className="hero heroWithPhoto">
        <div className="heroPhoto" aria-hidden="true" />
        <img className="heroLogo" src="/logo-sg.svg" alt="" aria-hidden="true" />

        <div className="heroContent">
          <h1>
            <span className="visuallyHidden">{profile.artistName}</span>
            <span className="heroTitle" aria-hidden="true">
              {profile.artistName.split(" ").map((word, w, words) => (
                <Fragment key={word}>
                  <span className="heroWord">
                    {word.split("").map((char, c) => (
                      <span
                        className="heroChar"
                        key={c}
                        style={{ "--i": words.slice(0, w).join("").length + c } as CSSProperties}
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                  {w < words.length - 1 ? " " : null}
                </Fragment>
              ))}
            </span>
          </h1>
          <div className="actions">
            <a className="primaryButton" href={`mailto:${profile.email}`}>
              Booking
            </a>
            <a className="secondaryButton" href={profile.spotifyUrl} target="_blank" rel="noreferrer">
              Spotify
            </a>
          </div>
        </div>
      </section>

      <a className="marquee" href="#gigs" aria-label="Voir les dates">
        {[0, 1].map((copy) => (
          <div className="marqueeTrack" key={copy} aria-hidden="true">
            {profile.gigs.map((gig) => (
              <span className="marqueeItem" key={`${gig.date}-${gig.venue}`}>
                {gig.date}
                <em>{gig.venue === "TBA" ? gig.city : `${gig.venue} · ${gig.city}`}</em>
              </span>
            ))}
          </div>
        ))}
      </a>

      <section className="statement" id="bio" data-fab-theme="light">
        <div>
          <p className="eyebrow">Bio</p>
          <div className="bioLogo">
            <img src="/logo-sg-black.svg" alt={`${profile.artistName} logo`} />
          </div>
        </div>
        <div className="copyBlock">
          {bioParagraphs.map((words, p) => (
            <p key={p}>
              {words.map((word, w) => (
                <span
                  className="bioWord"
                  key={w}
                  style={{ "--p": (bioOffsets[p] + w) / bioWordCount } as CSSProperties}
                >
                  {word}{" "}
                </span>
              ))}
            </p>
          ))}
        </div>
      </section>

      <section className="latest" id="music">
        <div className="latestVisual" style={{ backgroundImage: `url(${profile.latestImage})` }}>
          <svg className="spinBadge" viewBox="0 0 200 200" aria-hidden="true">
            <defs>
              <path id="badgeCircle" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
            </defs>
            <circle cx="100" cy="100" r="99" />
            <g className="spinBadgeText">
              <text>
                <textPath href="#badgeCircle" textLength="462" lengthAdjust="spacing">
                  {`Out now • ${profile.latestTitle} • ${profile.latestLabel} •`}
                </textPath>
              </text>
            </g>
            <path className="spinBadgePlay" d="M90 82 L118 100 L90 118 Z" />
          </svg>
        </div>
        <div className="latestCopy">
          <p className="eyebrow">Latest Release</p>
          <h2>{profile.latestTitle}</h2>
          <p>{profile.latestDescription}</p>
          <iframe
            className="latestPlayer"
            title={`${profile.latestTitle} — Spotify player`}
            src={getSpotifyEmbedUrl(profile.latestSpotifyUrl)}
            width="100%"
            height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
          <div className="releaseActions">
            <a href={profile.latestBeatportUrl} target="_blank" rel="noreferrer">
              Buy on Beatport
            </a>
            <a href={profile.soundcloudUrl} target="_blank" rel="noreferrer">
              Listen on SoundCloud
            </a>
          </div>
        </div>
      </section>

      <section className="gigsSection" id="gigs" data-fab-theme="light">
        <div className="gigsImage" style={{ backgroundImage: `url(${profile.gigsImage})` }} />
        <div className="gigsContent">
          <p className="eyebrow">Gigs</p>
          <h2>Upcoming dates.</h2>
          <div className="gigList">
            {profile.gigs.map((gig) => (
              <article
                className={gig.past ? "gigItem isPast" : "gigItem"}
                key={`${gig.date}-${gig.venue}`}
              >
                <span>
                  {gig.past ? null : <i className="liveDot" aria-hidden="true" />}
                  {gig.date}
                  {gig.past ? <b className="gigTag">Played</b> : null}
                </span>
                <strong>{gig.venue}</strong>
                <em>
                  {gig.city}
                  <b className="gigCountry">{gig.country}</b>
                </em>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="musicPlayers" id="players" aria-label="Music players">
        <h2 className="playersTitle">
          Listen to my music
          <span className="equalizer" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
          </span>
        </h2>
        <div className="players">
          <article className="player">
            <div className="playerHeader">
              <span>Spotify</span>
              <a href={profile.spotifyUrl} target="_blank" rel="noreferrer">
                Open
              </a>
            </div>
            <iframe
              title="Spotify player"
              src={getSpotifyEmbedUrl(profile.spotifyUrl)}
              width="100%"
              height="352"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </article>

          <article className="player">
            <div className="playerHeader">
              <span>SoundCloud</span>
              <a href={profile.soundcloudUrl} target="_blank" rel="noreferrer">
                Open
              </a>
            </div>
            <iframe
              title="SoundCloud player"
              src={getSoundCloudEmbedUrl(profile.soundcloudUrl)}
              width="100%"
              height="352"
              allow="autoplay"
              loading="lazy"
            />
          </article>
        </div>
      </section>

      <section className="socialCta" id="links" aria-label="Selim Gaston links">
        <div className="socialCover">
          <h2>
            Links
            <span className="linksArrow" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M6 18 18 6M8 6h10v10" />
              </svg>
            </span>
          </h2>
        </div>
        <ul data-fab-theme="light">
          {platforms.map((platform) => (
            <li
              key={platform.name}
              style={{ "--brand-bg": platform.bg, "--brand-fg": platform.fg } as CSSProperties}
            >
              <a href={platform.url} target={platform.url.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer">
                <span className="platformIcon">
                  <PlatformLogo name={platform.name} />
                </span>
                <span>{platform.name}</span>
                <svg className="linkArrow" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 18 18 6M8 6h10v10" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <footer className="footer" id="contact">
        <span className="footerLabel">Contact</span>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </footer>

      <a
        className="whatsappFab"
        href={profile.whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Book me on WhatsApp"
      >
        <svg className="whatsappRing" viewBox="0 0 100 100" aria-hidden="true">
          <defs>
            <path id="waRing" d="M50,50 m-36.5,0 a36.5,36.5 0 1,1 73,0 a36.5,36.5 0 1,1 -73,0" />
          </defs>
          <circle cx="50" cy="50" r="49" />
          <g className="whatsappRingText">
            <text>
              <textPath href="#waRing" textLength="229" lengthAdjust="spacing">
                Book me on WhatsApp • Book me on WhatsApp •
              </textPath>
            </text>
          </g>
        </svg>
        <span className="whatsappCore">
          <WhatsAppIcon />
        </span>
      </a>

      <ScrollReveal />
      <WhatsAppTheme />
    </main>
  );
}
