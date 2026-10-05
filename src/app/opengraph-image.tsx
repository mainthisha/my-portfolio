import { ImageResponse } from "next/og";

export const alt = "Mainthisha S — AI & Data Science";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0d0c0b",
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(216,190,140,0.18), transparent 50%)",
          color: "#f1ebe0",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 8, color: "#d8be8c" }}>
          AI & DATA SCIENCE
        </div>
        <div style={{ display: "flex", fontSize: 128, marginTop: 28, lineHeight: 1 }}>
          MAINTHISHA&nbsp;<span style={{ color: "#d8be8c" }}>S</span>
        </div>
        <div style={{ display: "flex", fontSize: 36, marginTop: 36, color: "#d8be8c" }}>
          AI • DATA • WEB • CLOUD
        </div>
        <div style={{ display: "flex", fontSize: 30, marginTop: 14, opacity: 0.7 }}>
          Building thoughtful technology with purpose.
        </div>
      </div>
    ),
    size
  );
}
