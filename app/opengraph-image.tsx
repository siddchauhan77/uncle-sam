import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Uncle Sam — School taught you a lot. He teaches you the rest.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#F5F0E8",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Inset borders */}
        <div
          style={{
            position: "absolute",
            inset: "24px",
            border: "1.5px solid rgba(10,10,10,0.12)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: "32px",
            border: "1px solid rgba(10,10,10,0.06)",
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            zIndex: 1,
          }}
        >
          {/* BREAKING stamp */}
          <div
            style={{
              backgroundColor: "#C0392B",
              color: "#F5F0E8",
              fontSize: "18px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              padding: "6px 16px",
              fontFamily: "monospace",
            }}
          >
            Breaking
          </div>

          {/* Double rule */}
          <div
            style={{
              width: "120px",
              borderTop: "2px solid rgba(10,10,10,0.18)",
              borderBottom: "2px solid rgba(10,10,10,0.18)",
              height: "6px",
              display: "flex",
            }}
          />

          {/* Title */}
          <div
            style={{
              color: "#0A0A0A",
              fontSize: "120px",
              fontWeight: 900,
              lineHeight: 0.88,
              fontFamily: "Impact, Arial Narrow, sans-serif",
              textAlign: "center",
              textTransform: "uppercase",
              letterSpacing: "0.02em",
            }}
          >
            Uncle
            <br />
            Sam
          </div>

          {/* Double rule */}
          <div
            style={{
              width: "120px",
              borderTop: "2px solid rgba(10,10,10,0.18)",
              borderBottom: "2px solid rgba(10,10,10,0.18)",
              height: "6px",
              display: "flex",
            }}
          />

          <div
            style={{
              color: "#6B6B6B",
              fontSize: "18px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontFamily: "monospace",
            }}
          >
            School taught you a lot. He teaches you the rest.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
