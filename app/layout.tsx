import type { Metadata } from "next";
import { Anton, IBM_Plex_Mono, Merriweather } from "next/font/google";
import "./globals.css";

const anton = Anton({
  subsets: ["latin"],
  variable: "--font-anton",
  weight: "400",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://uncle-sam.vercel.app"),
  title: "Uncle Sam",
  description:
    "School taught you a lot. Uncle Sam teaches you the rest. Pull a card, take the quiz, get your prescription.",
  openGraph: {
    title: "Uncle Sam",
    description: "School taught you a lot. Uncle Sam teaches you the rest.",
    siteName: "Uncle Sam",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Uncle Sam",
    description: "School taught you a lot. Uncle Sam teaches you the rest.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${ibmPlexMono.variable} ${merriweather.variable}`}
    >
      <body>
        <div className="grain-overlay" aria-hidden="true" />
        {children}

        {/* Global footer */}
        <footer
          className="w-full px-6 py-6 text-center"
          style={{ backgroundColor: "var(--paper)", borderTop: "1px solid rgba(10,10,10,0.1)" }}
        >
          <p
            className="text-[0.55rem] tracking-wider leading-relaxed"
            style={{ fontFamily: "var(--type)", color: "var(--ink-ghost)" }}
          >
            Fan-made project inspired by Sam Parr / My First Million.
            Not affiliated with or endorsed by Sam Parr.
          </p>
          <a
            href="https://uncle-shaan.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-[0.55rem] tracking-[0.2em] uppercase transition-colors hover:underline"
            style={{ fontFamily: "var(--type)", color: "var(--gold)" }}
          >
            See also: Uncle Shaan →
          </a>
        </footer>
      </body>
    </html>
  );
}
