import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0C0E10",
          border: "1px solid rgba(197, 168, 128, 0.4)",
          borderRadius: 4,
          color: "#C5A880",
          fontFamily: "serif",
          fontSize: 20,
          fontWeight: 600,
          letterSpacing: "-0.02em",
        }}
      >
        A
      </div>
    ),
    {
      ...size,
    }
  );
}
