import type { ReactNode } from "react";

export function Marquee({
  items,
  reverse = false,
}: {
  items: ReactNode[];
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="group relative overflow-hidden">
      <div className={reverse ? "marquee-track-reverse" : "marquee-track"}>
        {doubled.map((item, i) => (
          <div key={i} className="shrink-0">
            {item}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}
