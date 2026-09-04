import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
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
    <svg viewBox="0 0 200 200" className="h-44 w-44 -rotate-90">
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

export function SpeakingLab() {
  const [open, setOpen] = useState(0);

  return (
    <section id="speaking" className="bg-secondary/40 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="eyebrow">Speaking Lab · AI 口语评分报告</div>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] font-extrabold">
            说完，立刻知道考官会怎么打分。
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            从 Part 1 到 Part 3 全流程录音模考，AI 考官按官方四项评分标准逐条反馈 —— 上面「AI 口语评分」里可以亲自走一遍录音流程。
          </p>
        </Reveal>

        <div className="mt-12 mx-auto max-w-3xl">
          {/* 评分报告 */}
          <Reveal>
            <div className="surface-card flex h-full flex-col p-6 md:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <div className="eyebrow">AI 预测分数</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    目标：<span className="font-display font-bold text-foreground">7.0</span>
                  </div>
                </div>
                <span className="rounded-full bg-accent/15 px-3 py-1.5 text-xs font-bold text-ink">
                  四项评分标准
                </span>
              </div>

              <div className="mt-6 flex items-center gap-7">
                <div className="relative shrink-0">
                  <ScoreRing value={6.5} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[10px] font-bold tracking-wider text-muted-foreground">您的分数</span>
                    <span className="font-display text-5xl font-extrabold text-foreground">6.5</span>
                  </div>
                </div>
                <ul className="flex-1 space-y-3">
                  {DIMS.map((d, i) => (
                    <li key={d.l} className="flex items-center gap-3">
                      <span
                        className="font-display w-8 shrink-0 text-sm font-extrabold tabular-nums text-foreground"
                      >
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
                      <span className="w-24 shrink-0 text-xs text-muted-foreground">{d.l}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 手风琴反馈 */}
              <div className="mt-7 divide-y divide-border border-y border-border">
                {FEEDBACK.map((f, i) => (
                  <div key={f.t}>
                    <button
                      onClick={() => setOpen(open === i ? -1 : i)}
                      className="flex w-full items-center justify-between py-3.5 text-left"
                    >
                      <span className="font-display text-sm font-bold text-primary">{f.t}</span>
                      <span className="flex items-center gap-3 text-sm">
                        <span className="text-xs text-muted-foreground">得分</span>
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
                        <p className="pb-4 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-5">
                <button
                  className="w-full rounded-xl py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
                  style={{ background: "var(--gradient-brand)" }}
                >
                  免费测一次我的口语 →
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
