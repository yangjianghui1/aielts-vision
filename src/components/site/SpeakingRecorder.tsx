import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const DIMS = [
  { l: "流利度与连贯性", v: 6.5, c: "var(--primary)" },
  { l: "词汇资源", v: 7.0, c: "var(--primary-bright)" },
  { l: "语法范围与准确性", v: 6.0, c: "var(--magenta)" },
  { l: "发音", v: 7.0, c: "var(--accent)" },
];

const FEEDBACK = [
  {
    t: "整体评价",
    body: "表达自然、观点展开充分，已具备 6.5 分段的稳定输出能力。发音清晰，偶发的自我纠正不影响理解。",
  },
  {
    t: "流利度与连贯性",
    body: "优势：语流顺畅，连接词使用自然。弱点：长句前偶有 1–2 秒停顿。建议：用 well / you know 等话语标记承接思考时间。",
  },
  {
    t: "词汇资源",
    body: "优势：能使用 less common 词汇（如 pick up a hobby）。建议：将 good / nice 替换为 rewarding / enjoyable 等同义表达。",
  },
  {
    t: "发音",
    body: "单词重音与语调整体准确，易于理解。个别辅音连缀（如 -ths）可再打磨。",
  },
];

function ScoreRing({ value }: { value: number }) {
  const R = 84;
  const C = 2 * Math.PI * R;
  const pct = value / 9;
  return (
    <svg viewBox="0 0 200 200" className="h-36 w-36 -rotate-90">
      <circle cx="100" cy="100" r={R} fill="none" stroke="var(--border)" strokeWidth="14" />
      <circle
        cx="100"
        cy="100"
        r={R}
        fill="none"
        stroke="var(--primary)"
        strokeWidth="14"
        strokeLinecap="round"
        strokeDasharray={C}
        strokeDashoffset={C * (1 - pct)}
        style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1) 0.2s" }}
      />
    </svg>
  );
}

export function SpeakingReport() {
  const [open, setOpen] = useState(0);

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="eyebrow">AI 预测分数</div>
          <div className="mt-1 text-xs text-muted-foreground">
            目标：<span className="font-display font-bold text-foreground">7.0</span>
          </div>
        </div>
        <span className="rounded-full bg-accent/15 px-3 py-1.5 text-[11px] font-bold text-ink">
          四项评分标准
        </span>
      </div>

      <div className="mt-5 flex items-center gap-6">
        <div className="relative shrink-0">
          <ScoreRing value={6.5} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[9px] font-bold tracking-wider text-muted-foreground">您的分数</span>
            <span className="font-display text-4xl font-extrabold text-foreground">6.5</span>
          </div>
        </div>
        <ul className="flex-1 space-y-2.5">
          {DIMS.map((d, i) => (
            <li key={d.l} className="flex items-center gap-3">
              <span className="font-display w-8 shrink-0 text-sm font-extrabold tabular-nums text-foreground">
                {d.v.toFixed(1)}
              </span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full"
                  style={{
                    background: d.c,
                    width: `${(d.v / 9) * 100}%`,
                    transition: `width 1s cubic-bezier(0.16,1,0.3,1) ${300 + i * 120}ms`,
                  }}
                />
              </div>
              <span className="w-24 shrink-0 text-[11px] text-muted-foreground">{d.l}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 手风琴反馈 */}
      <div className="mt-5 divide-y divide-border border-y border-border">
        {FEEDBACK.map((f, i) => (
          <div key={f.t}>
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              className="flex w-full items-center justify-between py-3 text-left"
            >
              <span className="font-display text-sm font-bold text-primary">{f.t}</span>
              <span className="flex items-center gap-3 text-sm">
                <span className="text-[11px] text-muted-foreground">得分</span>
                <span className="font-display font-extrabold">{i === 3 ? "7.0" : i === 2 ? "6.0" : "6.5"}</span>
                <svg
                  width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                  className={cn("transition-transform", open === i && "rotate-180")}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </button>
            <div
              className="grid transition-all duration-300"
              style={{ gridTemplateRows: open === i ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="pb-3.5 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4">
        <button
          className="w-full rounded-xl py-2.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
          style={{ background: "var(--gradient-brand)" }}
        >
          免费测一次我的口语 →
        </button>
      </div>
    </div>
  );
}

type Phase = "idle" | "recording" | "scored";

const PARTS = [
  {
    id: 1,
    label: "Part 1",
    sub: "日常问答",
    question: "Do you prefer studying in the morning or at night?",
    hint: "4–5 分钟 · 熟悉话题",
  },
  {
    id: 2,
    label: "Part 2",
    sub: "个人陈述",
    question: "Describe a skill you would like to learn.",
    hint: "1 分钟准备 + 2 分钟陈述",
  },
  {
    id: 3,
    label: "Part 3",
    sub: "深入讨论",
    question: "Why do some people find it hard to keep learning new skills?",
    hint: "4–5 分钟 · 抽象讨论",
  },
];

export function SpeakingRecorder({ compact = false }: { compact?: boolean }) {
  const [part, setPart] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    setPhase("recording");
    setSeconds(0);
  };
  const stop = () => setPhase("scored");

  useEffect(() => {
    if (phase === "recording") {
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const p = PARTS[part]!;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="font-display text-xs font-bold">雅思口语 · 模考</span>
        <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              phase === "recording" ? "breathe bg-magenta" : "bg-border",
            )}
          />
          {phase === "recording" ? "REC" : phase === "scored" ? "已完成" : "待开始"}
        </span>
      </div>

      {/* Part 切换 */}
      <div className="flex flex-wrap gap-2 px-4 pt-4">
        {PARTS.map((pt, i) => (
          <button
            key={pt.id}
            onClick={() => {
              setPart(i);
              setPhase("idle");
              setSeconds(0);
            }}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-[11px] font-bold transition-colors",
              part === i
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground",
            )}
          >
            {pt.label} · {pt.sub}
          </button>
        ))}
      </div>

      <div className="px-4 pt-4 pb-5">
        <div className="text-[11px] text-muted-foreground">{p.hint}</div>
        <div className="mt-1.5 font-display text-base font-bold leading-snug">“{p.question}”</div>

        {/* 录音区 */}
        <div className="mt-4 flex flex-col items-center">
          <div className={cn("relative grid place-items-center", compact ? "h-32 w-32" : "h-40 w-40")}>
            {phase === "recording" && (
              <>
                <span
                  className="absolute inset-0 animate-ping rounded-full bg-primary/15"
                  style={{ animationDuration: "2s" }}
                />
                <span
                  className="absolute inset-4 animate-ping rounded-full bg-primary/20"
                  style={{ animationDuration: "2s", animationDelay: "0.4s" }}
                />
              </>
            )}
            <button
              onClick={phase === "recording" ? stop : start}
              aria-label={phase === "recording" ? "停止作答" : "开始作答"}
              className={cn(
                "relative grid place-items-center rounded-full border-2 transition-all",
                compact ? "h-16 w-16" : "h-20 w-20",
                phase === "recording"
                  ? "border-dashed border-primary bg-primary text-primary-foreground"
                  : "border-border bg-secondary text-primary hover:border-primary/50",
              )}
            >
              {phase === "recording" ? (
                <span className="h-5 w-5 rounded-md bg-primary-foreground" />
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <rect x="9" y="2" width="6" height="12" rx="3" />
                  <path d="M5 10a7 7 0 0 0 14 0M12 17v5" />
                </svg>
              )}
            </button>
          </div>
          <div className="mt-2 font-display text-xl font-extrabold tabular-nums text-primary">
            {mm}:{ss}
          </div>
          <div className="mt-0.5 text-[11px] text-muted-foreground">
            {phase === "recording"
              ? "Recording your answer"
              : phase === "scored"
                ? "作答完成，已生成评分"
                : "点击麦克风开始作答"}
          </div>

          {/* 波形 */}
          <div className="mt-4 flex h-9 items-center gap-1">
            {Array.from({ length: 48 }).map((_, i) => (
              <span
                key={i}
                className="w-1 rounded-full bg-magenta/60"
                style={{
                  height: `${6 + Math.abs(Math.sin(i * 1.7)) * 24}px`,
                  animation:
                    phase === "recording"
                      ? `breathe ${0.8 + (i % 5) * 0.12}s ease-in-out ${i * 0.05}s infinite`
                      : "none",
                  opacity: phase === "idle" ? 0.35 : 1,
                }}
              />
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-3.5">
          <button className="rounded-lg border border-border px-3 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground">
            抱歉，你能再说一遍问题吗？
          </button>
          <button
            onClick={phase === "recording" ? stop : start}
            className="rounded-lg bg-ink px-4 py-1.5 text-[11px] font-bold text-background transition-opacity hover:opacity-85"
          >
            {phase === "recording" ? "停下" : "开始作答"}
          </button>
        </div>
      </div>
    </div>
  );
}
