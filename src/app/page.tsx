import { profile } from "@/data/profile";

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
    return (
      <svg aria-hidden="true" viewBox="0 0 88 88">
        <path d="M44 0C19.7 0 0 19.7 0 44s19.7 44 44 44 44-19.7 44-44S68.3 0 44 0Zm-4.2 64.5H24.4v-41h15.3c8.4 0 13.6 4.4 13.6 11 0 3.8-1.8 6.8-5.1 8.5 4.2 1.5 6.4 4.9 6.4 9.5 0 7.2-5.6 12-14.8 12Zm-4-25.3c4 0 6.3-1.8 6.3-5s-2.3-4.9-6.3-4.9h-1.1v9.9h1.1Zm1.1 18.8c4.4 0 6.8-2.1 6.8-5.9 0-3.6-2.5-5.7-6.9-5.7h-2.1V58h2.2Zm27.8 6.5h-9.9v-41h9.9v41Z" />
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

  return <span aria-hidden="true">b</span>;
}

export default function Home() {
  const platforms = [
    { name: "spotify", url: profile.spotifyUrl },
    { name: "soundcloud", url: profile.soundcloudUrl },
    { name: "youtube", url: profile.youtubeUrl },
    { name: "beatport", url: profile.beatportUrl },
    { name: "facebook", url: profile.facebookUrl },
    { name: "booking", url: `mailto:${profile.email}` }
  ];

  return (
    <main>
      <div className="topBar">
        <p>Official booking channel: {profile.email}</p>
        <a href={`mailto:${profile.email}`}>Contact</a>
      </div>

      <section className="hero heroWithPhoto" style={{ backgroundImage: `url(${profile.heroBackgroundImage})` }}>
        <nav className="nav" aria-label="Navigation principale">
          <a className="homeMark" href="#top" aria-label="Back to top">
            <span />
            <span />
          </a>
          <details className="menuShell">
            <summary className="menuButton">
              <span className="menuIcon">
                <span />
                <span />
              </span>
              Menu
            </summary>
            <div className="menuPanel">
              <div className="menuPanelInner">
                <p>Navigation</p>
                <a href="#bio">Bio</a>
                <a href="#music">Music</a>
                <a href="#gigs">Gigs</a>
                <a href="#contact">Booking</a>
                <a href={profile.spotifyUrl} target="_blank" rel="noreferrer">
                  Spotify
                </a>
                <a href={profile.soundcloudUrl} target="_blank" rel="noreferrer">
                  SoundCloud
                </a>
              </div>
            </div>
          </details>
        </nav>

        <div className="heroContent" id="top">
          <p className="location">{profile.location} / Electronic music</p>
          <h1>{profile.artistName}</h1>
          <p className="tagline">{profile.tagline}</p>
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

      <section className="statement" id="bio">
        <div>
          <p className="eyebrow">Bio</p>
        </div>
        <div className="copyBlock">
          {profile.bio.split("\n\n").map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="serviceGrid" aria-label="Sound directions">
            {profile.services.map((service) => (
              <span key={service}>{service}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="latest" id="music">
        <div className="latestVisual" style={{ backgroundImage: `url(${profile.heroImage})` }} />
        <div className="latestCopy">
          <p className="eyebrow">Latest Sound</p>
          <h2>{profile.latestTitle}</h2>
          <p>{profile.latestDescription}</p>
          <div className="releaseActions">
            <a href={profile.spotifyUrl} target="_blank" rel="noreferrer">
              Listen on Spotify
            </a>
            <a href={profile.soundcloudUrl} target="_blank" rel="noreferrer">
              Listen on SoundCloud
            </a>
          </div>
        </div>
      </section>

      <section className="gigsSection" id="gigs">
        <div className="gigsImage" style={{ backgroundImage: `url(${profile.gigsImage})` }} />
        <div className="gigsContent">
          <p className="eyebrow">Gigs</p>
          <h2>Upcoming dates.</h2>
          <div className="gigList">
            {profile.gigs.map((gig) => (
              <article className="gigItem" key={`${gig.date}-${gig.venue}`}>
                <span>{gig.date}</span>
                <strong>{gig.venue}</strong>
                <em>{gig.city}</em>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="musicPlayers" aria-label="Music players">
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

      <section className="socialCta" aria-label="Follow Selim Gaston">
        <div className="socialCover">
          <h2>Follow Me</h2>
        </div>
        <ul>
          {platforms.map((platform) => (
            <li key={platform.name}>
              <a href={platform.url} target={platform.url.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer">
                <span className="platformIcon">
                  <PlatformLogo name={platform.name} />
                </span>
                <span>{platform.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <footer className="footer" id="footer">
        <section>
          <h3>Music</h3>
          <a href={profile.spotifyUrl} target="_blank" rel="noreferrer">
            Spotify
          </a>
          <a href={profile.soundcloudUrl} target="_blank" rel="noreferrer">
            SoundCloud
          </a>
        </section>
        <section>
          <h3>Gigs</h3>
          {profile.gigs.map((gig) => (
            <span key={`${gig.date}-${gig.venue}`}>
              {gig.date} — {gig.venue}
            </span>
          ))}
        </section>
        <section>
          <h3>Sound</h3>
          {profile.services.map((service) => (
            <span key={service}>{service}</span>
          ))}
        </section>
        <section id="contact">
          <h3>Contact</h3>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <p>Bookings for clubs, brands and private events.</p>
        </section>
      </footer>
    </main>
  );
}
