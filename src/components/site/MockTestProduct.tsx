import { Check, Clock, Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const FEATURES = ["对标雅思题型的全真模考", "全维度 AI 评分", "复盘建议与学习报告"];

const HIGHLIGHTS = [
  { title: "完整还原机考流程", desc: "熟悉真实页面操作、时间节奏与作答方式。" },
  { title: "AI 预估分与针对性建议", desc: "分项呈现四维表现，快速找到需要加强的环节。" },
  { title: "多分段参考答案", desc: "对照不同目标分数范文，明确下一档提升标准。" },
];

const SCORES = [
  ["任务完成度", "9.0"],
  ["连贯与衔接", "9.0"],
  ["词汇资源", "9.0"],
  ["语法准确性", "9.0"],
];

function Bar() {
  return (
    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
      <div className="h-full w-full rounded-full" style={{ background: "var(--gradient-brand)" }} />
    </div>
  );
}

export function MockTestProduct() {
  return (
    <section id="mocktest" className="mx-auto max-w-6xl scroll-mt-24 px-5 pt-24 md:pt-32">
      <Reveal>
        <div className="eyebrow">IELTS Mock Test</div>
        <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] font-extrabold">
          一次模考，预估考分并定位薄弱环节
        </h2>
      </Reveal>

      <Reveal>
        <div className="surface-card mt-12 grid gap-10 p-7 md:p-10 lg:grid-cols-[0.72fr_1.28fr]">
          {/* 左：产品信息 */}
          <div className="lg:border-r lg:border-border lg:pr-10">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10">
                <Sparkles className="h-6 w-6 text-primary" />
              </span>
              <div>
                <h3 className="font-display text-2xl font-extrabold md:text-3xl">全真模考</h3>
              </div>
            </div>

            <span className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5 text-primary" />3 小时
            </span>

            <div className="mt-6 flex items-end gap-2">
              <span className="pb-2 font-display text-xl font-extrabold">¥</span>
              <span className="font-display text-6xl leading-none font-extrabold tracking-tight">299</span>
              <span className="pb-2 text-sm text-muted-foreground">/ 次</span>
              <span className="pb-2 text-sm text-muted-foreground line-through">原价 ¥699</span>
            </div>

            <ul className="mt-7 space-y-3">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm font-medium">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/10">
                    <Check className="h-3 w-3 text-primary" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <a
              href="#cta"
              className="mt-8 block rounded-xl bg-primary px-6 py-3.5 text-center text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              立即报名
            </a>
          </div>

          {/* 右：说明与预览 */}
          <div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              不仅完成一套题，还能熟悉真实考试路径、定位分数短板，并看懂不同目标分数之间的答案差异。
            </p>


            <div className="mt-7 grid gap-5 md:grid-cols-3">
              {/* 预览 1：机考界面 */}
              <div className="rounded-2xl border border-border bg-secondary/40 p-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[11px] font-bold">
                    <span className="grid h-4 w-4 place-items-center rounded bg-primary text-[9px] text-white">R</span>
                    Reading · Part 1
                  </span>
                  <span className="font-display text-[10px] font-bold tabular-nums text-primary">01:58:22</span>
                </div>
                <div className="mt-2.5 grid grid-cols-2 gap-2">
                  <div className="rounded-xl bg-card p-2.5">
                    <div className="text-[9px] font-bold">Reading passage</div>
                    <div className="mt-2 space-y-1.5">
                      {[100, 88, 94, 70, 90].map((w, i) => (
                        <div key={i} className="h-1 rounded-full bg-secondary" style={{ width: `${w}%` }} />
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl bg-card p-2.5">
                    <div className="text-[9px] font-bold">Questions 1–6</div>
                    <div className="mt-2 space-y-1.5 text-[9px] text-muted-foreground">
                      {["Option A", "Option B", "Option C"].map((o, i) => (
                        <div key={o} className="flex items-center gap-1.5">
                          <span
                            className={`h-2 w-2 rounded-full border ${i === 1 ? "border-primary bg-primary" : "border-border"}`}
                          />
                          {o}
                        </div>
                      ))}
                    </div>
                    <div className="mt-2.5 rounded-lg bg-primary/10 p-1.5 text-[8px] leading-tight font-semibold text-primary">
                      AI 反馈
                      <br />
                      自动定位易错点
                    </div>
                  </div>
                </div>
              </div>

              {/* 预览 2：AI 评分报告 */}
              <div className="rounded-2xl border border-border bg-secondary/40 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold">AI 评分报告</span>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold text-primary">
                    分析完成
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-3 rounded-xl bg-card p-2.5">
                  <div className="shrink-0 text-center">
                    <div
                      className="grid h-16 w-16 place-items-center rounded-full"
                      style={{
                        background: `conic-gradient(var(--primary) 0 82%, var(--secondary) 82% 100%)`,
                      }}
                    >
                      <span className="grid h-12 w-12 place-items-center rounded-full bg-card font-display text-sm font-extrabold">
                        9.0
                      </span>
                    </div>
                    <div className="mt-1 text-[9px] text-muted-foreground">综合表现</div>
                  </div>
                  <div className="min-w-0 flex-1 space-y-1.5">
                    {SCORES.map(([k, v]) => (
                      <div key={k}>
                        <div className="flex items-center justify-between text-[9px]">
                          <span className="font-semibold">{k}</span>
                          <span className="tabular-nums text-muted-foreground">{v}</span>
                        </div>
                        <Bar />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 预览 3：多分段参考答案 */}
              <div className="rounded-2xl border border-border bg-secondary/40 p-3">
                <div className="flex items-center gap-1.5">
                  {["5/6", "6/7", "7/8", "8/9"].map((s) => (
                    <span
                      key={s}
                      className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                        s === "7/8" ? "text-white" : "text-muted-foreground"
                      }`}
                      style={s === "7/8" ? { background: "var(--gradient-brand)" } : undefined}
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-2.5 grid grid-cols-2 gap-2">
                  <div className="rounded-xl border-l-2 border-magenta bg-card p-2.5">
                    <div className="text-[9px] font-bold text-magenta">分数段：7</div>
                    <p className="mt-1.5 text-[8px] leading-relaxed text-muted-foreground">
                      结构清晰，观点完整；继续加强词汇变化和句式准确性。
                    </p>
                  </div>
                  <div className="rounded-xl bg-card p-2.5">
                    <div className="text-[9px] font-bold">参考答案</div>
                    <div className="mt-2 space-y-1.5">
                      {[100, 92, 86, 96, 74].map((w, i) => (
                        <div key={i} className="h-1 rounded-full bg-secondary" style={{ width: `${w}%` }} />
                      ))}
                    </div>
                    <div className="mt-2.5 rounded-lg bg-magenta/10 p-1.5 text-[8px] font-semibold text-magenta">
                      重点表达与句型已标注
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {HIGHLIGHTS.map((h) => (
                <div key={h.title}>
                  <div className="font-display text-sm font-bold">{h.title}</div>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{h.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
