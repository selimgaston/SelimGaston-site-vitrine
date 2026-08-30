"use client";

export function TopLink() {
  return (
    <a
      className="homeMark"
      href="#top"
      aria-label="Back to top"
      onClick={(event) => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search
        );
      }}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M12 3.6 21 12l-2.1 2.1L13.5 8.7V21h-3V8.7L5.1 14.1 3 12z" />
      </svg>
      <span>Top</span>
    </a>
  );
}
