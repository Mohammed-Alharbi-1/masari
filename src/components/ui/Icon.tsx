import type { CSSProperties } from "react";

export type IconName =
  | "arrow"
  | "path"
  | "code"
  | "shield"
  | "network"
  | "cloud"
  | "spark"
  | "book"
  | "check"
  | "target"
  | "menu"
  | "close";

const paths: Record<IconName, string> = {
  arrow: "M19 12H5m6-6-6 6 6 6",
  path: "M5 20v-7a6 6 0 0 1 6-6h9m-5-5 5 5-5 5M5 16h7a5 5 0 0 0 5-5",
  code: "m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 18",
  shield: "M12 3 3 7v5c0 5 9 9 9 9s9-4 9-9V7l-9-4Zm-4 9 3 3 5-6",
  network: "M9 3h6v6H9zM2 16h6v6H2zm14 0h6v6h-6zM12 9v4m-7 3v-3h14v3",
  cloud: "M7 18a5 5 0 1 1 0-10 6 6 0 0 1 11-1 5.5 5.5 0 0 1 0 11H7Z",
  spark: "m12 2 2.7 7.3L22 12l-7.3 2.7L12 22l-2.7-7.3L2 12l7.3-2.7L12 2Z",
  book: "M12 6C8 3 4 4 2 5v15c3-2 7-2 10 0m0-14c4-3 8-2 10-1v15c-3-2-7-2-10 0V6Z",
  check: "m5 12 4 4L19 6",
  target: "M20 12a8 8 0 1 1-8-8m0 4a4 4 0 1 0 4 4m-4 0L22 2m-6 0h6v6",
  menu: "M4 6h16M4 12h16M4 18h16",
  close: "m6 6 12 12M6 18 18 6",
};

export function Icon({
  name,
  className = "",
  style,
}: {
  name: IconName;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      className={`icon ${className}`}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
