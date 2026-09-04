import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0C0E10",
          border: "4px solid rgba(197, 168, 128, 0.4)",
          borderRadius: 36,
          color: "#C5A880",
          fontFamily: "serif",
          fontSize: 104,
          fontWeight: 600,
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
