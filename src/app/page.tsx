import Link from "next/link";
import { getStatus } from "@/lib/status";

export default async function HomePage() {
  const status = getStatus();
  const lastRun = status.lastSuccess ?? "pending deployment";
  const lastError = status.lastError;

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "4rem 1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <section
        style={{
          maxWidth: "720px",
          width: "100%",
          background: "rgba(15, 23, 42, 0.75)",
          border: "1px solid rgba(148, 163, 184, 0.2)",
          borderRadius: "1.5rem",
          padding: "2.5rem",
          boxShadow: "0 10px 40px rgba(15, 23, 42, 0.3)",
        }}
      >
        <h1
          style={{
            margin: "0 0 1.5rem",
            fontSize: "2.5rem",
            fontWeight: 700,
            letterSpacing: "-0.05em",
          }}
        >
          Litecoin INR Daily Agent
        </h1>
        <p
          style={{
            margin: "0 0 1.25rem",
            fontSize: "1.05rem",
            lineHeight: "1.7",
            color: "rgba(226, 232, 240, 0.85)",
          }}
        >
          Automated service that fetches the latest Litecoin (LTC) market price
          in Indian Rupees and emails a daily digest to{" "}
          <strong>sweyjotdhillon@gmail.com</strong>.
        </p>
        <div
          style={{
            background: "rgba(30, 64, 175, 0.3)",
            border: "1px solid rgba(59, 130, 246, 0.4)",
            borderRadius: "1rem",
            padding: "1.5rem",
            marginTop: "1.5rem",
          }}
        >
          <h2
            style={{
              margin: "0 0 0.75rem",
              fontSize: "1.25rem",
              fontWeight: 600,
            }}
          >
            Deployment Notes
          </h2>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "grid",
              gap: "0.75rem",
            }}
          >
            <li>
              GitHub scheduled workflow runs daily at 09:00 IST and executes the
              reporting script.
            </li>
            <li>
              Ensure the <code>RESEND_API_KEY</code> environment variable is set
              for transactional delivery.
            </li>
            <li>
              Manual retries are available via{" "}
              <Link
                href="/api/daily-email"
                style={{ color: "#60a5fa", textDecoration: "underline" }}
              >
                on-demand endpoint
              </Link>
              .
            </li>
          </ul>
        </div>
        <footer
          style={{
            marginTop: "2rem",
            fontSize: "0.95rem",
            color: "rgba(148, 163, 184, 0.75)",
            display: "grid",
            gap: "0.35rem",
          }}
        >
          <span>
            Last successful delivery: <strong>{lastRun}</strong>
          </span>
          {lastError ? (
            <span style={{ color: "#fca5a5" }}>
              Most recent error: <strong>{lastError}</strong>
            </span>
          ) : null}
        </footer>
      </section>
    </main>
  );
}
