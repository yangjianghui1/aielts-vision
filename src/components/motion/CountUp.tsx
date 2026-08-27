import { useEffect, useState } from "react";
import { useInView } from "./Reveal";

export function CountUp({
  to,
  duration = 1400,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: {
  to: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function GrowBar({
  value,
  color = "var(--primary)",
  delay = 0,
}: {
  value: number;
  color?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
      <div
        className="h-full rounded-full"
        style={{
          width: inView ? `${value}%` : "0%",
          background: color,
          transition: `width 900ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        }}
      />
    </div>
  );
}
