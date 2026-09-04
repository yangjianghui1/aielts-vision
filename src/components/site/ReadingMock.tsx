import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, SquarePen, Timer } from "lucide-react";
import { cn } from "@/lib/utils";

type Part = { id: number; label: string; count: number; from: number };

const PARTS: Part[] = [
  { id: 1, label: "Part 1", count: 13, from: 1 },
  { id: 2, label: "Part 2", count: 13, from: 14 },
  { id: 3, label: "Part 3", count: 14, from: 27 },
];

const OPTIONS = ["TRUE", "FALSE", "NOT GIVEN"] as const;

const QUESTIONS: Record<number, string[]> = {
  1: [
    "Dogme 95 aimed to show that good films could be made without spending large sums of money.",
    "The Dogme 95 manifesto was launched in Copenhagen in 1995.",
    "The films Melancholia and Far From the Madding Crowd were made in accordance with the principles of Dogme 95.",
    "According to the principles of Dogme 95, it is better for a film to tell a true story than a fictional one.",
  ],
  2: [
    "The research team collected samples from more than one continent.",
    "Urban noise was found to affect birdsong patterns at night.",
    "The author believes further funding is unlikely to be approved.",
    "Earlier studies reached the same conclusion as this project.",
  ],
  3: [
    "The writer argues that automation will reduce total employment.",
    "Retraining programmes were more effective in smaller firms.",
    "Most participants had previous experience of remote work.",
    "The findings can be generalised to other industries.",
  ],
};

const PASSAGE: Record<number, { title: string; paras: string[] }> = {
  1: {
    title: "DOGME 95",
    paras: [
      "Since its inception in the 1890s, cinema has seen many technical changes and advances. In 1995, a collective of Danish film directors wished to change the direction of filmmaking and reinforce the importance of cinematic truth.",
      "The avant-garde movement was publicly launched at a film conference by two directors from Copenhagen. The two directors created a manifesto which outlined certain rules for filmmakers, later jokingly dubbed the ‘vow of chastity’.",
      "The first rule stated that all shooting must be done on location. Furthermore, no props and sets could be brought in — if a specific prop was needed, a location already containing it had to be selected.",
      "The third rule stated that all filming should be done with a hand-held camera, while the fourth and fifth rules permitted only colour film and natural lighting in Dogme films.",
    ],
  },
  2: {
    title: "CITY BIRDSONG",
    paras: [
      "Researchers recorded thousands of hours of birdsong across twelve cities in order to understand how urban noise reshapes acoustic behaviour.",
      "The team found that several species shifted the pitch of their calls upwards, apparently to remain audible above low-frequency traffic noise.",
      "Whether these adaptations are permanent, or simply short-term adjustments, remains an open question for the field.",
    ],
  },
  3: {
    title: "THE FUTURE OF WORK",
    paras: [
      "Automation has long been described as a threat to employment, yet the historical record suggests a more complicated relationship between technology and jobs.",
      "A three-year study of manufacturing firms found that retraining programmes, rather than headcount reduction, accounted for most of the observed productivity gains.",
      "The authors caution that their sample was drawn from a single sector, and that generalisation should be treated carefully.",
    ],
  },
};

function fmt(t: number) {
  const m = Math.floor(t / 60);
  const s = t % 60;
  return `${String(m).padStart(2, "0")} : ${String(s).padStart(2, "0")}`;
}

export function ReadingMock() {
  const [part, setPart] = useState(1);
  const [current, setCurrent] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [left, setLeft] = useState(58 * 60 + 31);
  const [notes, setNotes] = useState(false);
  const paneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = window.setInterval(() => setLeft((v) => (v > 0 ? v - 1 : 0)), 1000);
    return () => window.clearInterval(id);
  }, []);

  const active = PARTS.find((p) => p.id === part)!;
  const answeredInPart = useMemo(
    () =>
      Array.from({ length: active.count }).filter(
        (_, i) => answers[`${part}-${i + 1}`],
      ).length,
    [answers, active.count, part],
  );

  const list = QUESTIONS[part]!;
  const passage = PASSAGE[part]!;

  const go = (n: number) => {
    const next = Math.min(Math.max(n, 1), active.count);
    setCurrent(next);
    paneRef.current?.scrollTo({ top: (next - 1) * 40, behavior: "smooth" });
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_18px_50px_-30px_rgba(0,0,102,0.45)]">
      {/* title bar */}
      <div className="border-b border-border py-2.5 text-center font-display text-sm font-bold">
        Reading
      </div>

      {/* top toolbar */}
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <Timer className="h-5 w-5 text-primary-bright" strokeWidth={1.6} />
          <span className="font-display text-sm font-extrabold tabular-nums text-primary-bright">
            {fmt(left)}
          </span>
        </div>
        <div className="text-center">
          <div className="font-display text-sm font-bold">{active.label}</div>
          <div className="text-[11px] text-muted-foreground">阅读文本并回答问题</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right leading-tight">
            <div className="text-[11px] text-muted-foreground">问题</div>
            <div className="font-display text-xs font-bold">
              {active.from} - {active.from + active.count - 1}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setNotes((v) => !v)}
            aria-label="笔记"
            className={cn(
              "grid h-8 w-8 place-items-center rounded-md border transition-colors",
              notes
                ? "border-primary bg-primary text-primary-foreground"
                : "border-primary/50 text-primary hover:bg-primary/10",
            )}
          >
            <SquarePen className="h-4 w-4" strokeWidth={1.8} />
          </button>
        </div>
      </div>

      {/* body */}
      <div className="grid gap-px bg-border md:grid-cols-2">
        <div className="max-h-[360px] overflow-y-auto bg-card p-5">
          <h4 className="text-center font-display text-base font-extrabold tracking-wide">
            {passage.title}
          </h4>
          <div className="mt-4 space-y-3 text-[13px] leading-relaxed text-muted-foreground">
            {passage.paras.map((p, i) => (
              <p key={i}>
                {i === 0 ? (
                  <>
                    {p.slice(0, 96)}
                    <mark className="bg-accent/35 text-ink">{p.slice(96, 168)}</mark>
                    {p.slice(168)}
                  </>
                ) : (
                  p
                )}
              </p>
            ))}
          </div>
        </div>

        <div ref={paneRef} className="max-h-[360px] overflow-y-auto bg-card p-5">
          <div className="font-display text-sm font-bold">
            Questions {active.from} - {active.from + 7}
          </div>
          <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">
            Choose <strong className="text-ink">TRUE</strong> if the statement agrees with the text,{" "}
            <strong className="text-ink">FALSE</strong> if it contradicts it, or{" "}
            <strong className="text-ink">NOT GIVEN</strong> if there is no information on this.
          </p>
          <div className="mt-5 space-y-5">
            {list.map((q, i) => {
              const n = i + 1;
              const key = `${part}-${n}`;
              return (
                <div
                  key={key}
                  className={cn(
                    "rounded-lg p-2 transition-colors",
                    current === n && "bg-secondary/70",
                  )}
                >
                  <p className="text-[13px] leading-relaxed">
                    <span className="mr-1.5 font-display font-bold">{active.from + i}</span>
                    {q}
                  </p>
                  <div className="mt-2 space-y-1.5">
                    {OPTIONS.map((o) => (
                      <button
                        key={o}
                        type="button"
                        onClick={() => {
                          setAnswers((a) => ({ ...a, [key]: o }));
                          setCurrent(n);
                        }}
                        className="flex w-full items-center gap-2.5 rounded-md px-1 py-1 text-left text-[13px] transition-colors hover:text-primary"
                      >
                        <span
                          className={cn(
                            "grid h-4 w-4 shrink-0 place-items-center rounded-full border transition-colors",
                            answers[key] === o ? "border-primary" : "border-muted-foreground/40",
                          )}
                        >
                          {answers[key] === o && (
                            <span className="h-2 w-2 rounded-full bg-primary" />
                          )}
                        </span>
                        <span className={cn(answers[key] === o && "font-semibold text-primary")}>
                          {o}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* bottom nav */}
      <div className="flex flex-wrap items-center gap-2 border-t border-border px-3 py-3">
        <div className="rounded-md border border-border px-2.5 py-1 text-center leading-tight">
          <div className="font-display text-[11px] font-bold">{active.label}</div>
          <div className="text-[10px] text-muted-foreground">
            ({answeredInPart} 的 {active.count})
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-1">
          {Array.from({ length: active.count }).map((_, i) => {
            const n = i + 1;
            const answered = !!answers[`${part}-${n}`];
            return (
              <button
                key={n}
                type="button"
                onClick={() => go(n)}
                className={cn(
                  "h-7 w-7 rounded-md border text-[11px] font-medium transition-colors",
                  current === n
                    ? "border-primary text-primary"
                    : answered
                      ? "border-transparent bg-primary/12 text-primary"
                      : "border-transparent bg-secondary text-muted-foreground hover:text-foreground",
                )}
              >
                {n}
              </button>
            );
          })}
        </div>
        {PARTS.filter((p) => p.id !== part).map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => {
              setPart(p.id);
              setCurrent(1);
            }}
            className="rounded-md border border-border px-2.5 py-1 text-center leading-tight transition-colors hover:border-primary hover:text-primary"
          >
            <div className="font-display text-[11px] font-bold">{p.label}</div>
            <div className="text-[10px] text-muted-foreground">
              (
              {Array.from({ length: p.count }).filter((_, i) => answers[`${p.id}-${i + 1}`]).length}{" "}
              的 {p.count})
            </div>
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            className="rounded-md border border-border px-4 py-2 font-display text-xs font-bold transition-colors hover:border-primary hover:text-primary"
          >
            完成测试
          </button>
          <button
            type="button"
            onClick={() => go(current - 1)}
            disabled={current === 1}
            aria-label="上一题"
            className="grid h-8 w-8 place-items-center rounded-md border border-border text-muted-foreground transition-colors disabled:opacity-40 hover:enabled:border-primary hover:enabled:text-primary"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => go(current + 1)}
            disabled={current === active.count}
            aria-label="下一题"
            className="grid h-8 w-8 place-items-center rounded-md bg-ink text-white transition-opacity disabled:opacity-40 hover:enabled:opacity-85"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
