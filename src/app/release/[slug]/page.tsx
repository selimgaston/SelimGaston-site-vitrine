import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { profile } from "@/data/profile";
import { releases } from "@/data/releases";
import { PlatformIcon, platformColor } from "../PlatformIcon";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return releases.map((release) => ({ slug: release.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const release = releases.find((r) => r.slug === slug);
  if (!release) return {};

  return {
    title: `${release.title} | ${profile.artistName}`,
    description: `${release.title} by ${profile.artistName} — ${release.description}`,
    robots: { index: false, follow: false }
  };
}

export default async function ReleasePage({ params }: { params: Params }) {
  const { slug } = await params;
  const release = releases.find((r) => r.slug === slug);
  if (!release) notFound();

  return (
    <main
      className="releasePage"
      style={{ "--release-bg": `url(${release.coverImage})` } as React.CSSProperties}
    >
      <a className="miniHome" href="/">
        <img src="/logo-sg.svg" alt={profile.artistName} />
      </a>

      <div className="releaseCard">
        <img className="releaseCover" src={release.coverImage} alt={`${release.title} — cover art`} />

        <div className="releaseInfo">
          <p className="eyebrow">Out now</p>
          <h1>{release.title}</h1>
          <p className="releaseMeta">
            {profile.artistName} &middot; {release.label}
          </p>
          <p className="releaseCopy">{release.description}</p>

          <div className="releaseLinks">
            {release.platforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noreferrer"
                className="releaseLink"
                style={{ "--platform-color": platformColor(platform.name) } as React.CSSProperties}
              >
                <span className="releaseLinkAction">{platform.action}</span>
                <span className="releaseLinkPlatform">
                  {platform.label}
                  <PlatformIcon name={platform.name} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
