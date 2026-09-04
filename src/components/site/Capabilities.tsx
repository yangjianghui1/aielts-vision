import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { GrowBar } from "@/components/motion/CountUp";
import { SpeakingRecorder, SpeakingReport } from "@/components/site/SpeakingRecorder";
import { SampleEssays } from "@/components/site/SampleEssays";
import { cn } from "@/lib/utils";

type Cap = {
  id: string;
  no: string;
  name: string;
  tag: string;
  desc: string;
  meta: string;
  panel: "score" | "speak" | "vocab" | "path" | "essay";
};

const CAPS: Cap[] = [
  {
    id: "mock",
    no: "01",
    name: "全真模考",
    tag: "完整还原机考流程",
    desc: "40 套全真模考，真实页面操作、时间节奏与作答方式，考前把陌生感全部消耗掉。",
    meta: "3 小时 · 四科连考",
    panel: "score",
  },
  {
    id: "writing",
    no: "02",
    name: "AI 写作评分",
    tag: "四维度逐条批改",
    desc: "提交 Task 1 / Task 2，返回任务完成度、连贯与衔接、词汇资源、语法准确性四项分数与行内改写建议。",
    meta: "平均 45 秒出分",
    panel: "score",
  },
  {
    id: "essay",
    no: "03",
    name: "AI 写作范文",
    tag: "分数段范文对比",
    desc: "同一道题，对照 5 到 9 分真实范文与逐维度评语，看清每一分差距到底差在哪。",
    meta: "4 个分数段",
    panel: "essay",
  },
  {
    id: "speaking",
    no: "04",
    name: "AI 口语评分",
    tag: "Part 1–3 全流程",
    desc: "与 AI 考官完成三部分口语模考，逐句转写，反馈流利度、发音、词汇广度与语法。",
    meta: "响应 380 ms",
    panel: "speak",
  },
  {
    id: "lr",
    no: "05",
    name: "听力阅读分析",
    tag: "定位到题型",
    desc: "TFNG、Matching Headings、Y/N/NG —— 精确到拖慢你的那一类题，而不是泛泛刷套题。",
    meta: "12 类题型标签",
    panel: "vocab",
  },
  {
    id: "vocab",
    no: "06",
    name: "AI 词汇能力分析",
    tag: "词汇画像",
    desc: "从你的真实产出中提取词汇广度、学术词占比与重复率，给出目标分段的替换词表。",
    meta: "AWL 覆盖度追踪",
    panel: "vocab",
  },
  {
    id: "path",
    no: "07",
    name: "AI 学习路径规划",
    tag: "按考试日期倒推",
    desc: "根据诊断结果与考试日期生成周计划，漏练自动重排，不制造愧疚感。",
    meta: "12 周自适应",
    panel: "path",
  },
  {
    id: "boost",
    no: "08",
    name: "AI 领航强化训练",
    tag: "薄弱项专项",
    desc: "把报告里的短板变成每日 20 分钟的定向训练，配 119 节直播 + 录播课程。",
    meta: "每日 20 分钟",
    panel: "path",
  },
];

function Panel({ cap }: { cap: Cap }) {
  if (cap.panel === "essay") {
    return <SampleEssays />;
  }

  if (cap.panel === "speak") {
    return (
      <div className="grid gap-4 xl:grid-cols-2">
        <SpeakingRecorder compact />
        <SpeakingReport />
      </div>
    );
  }

  if (cap.panel === "vocab") {
    return (
      <div className="space-y-4">
        {[
          { l: "词汇广度", v: 78, c: "var(--primary)" },
          { l: "学术词 AWL 占比", v: 64, c: "var(--primary-bright)" },
          { l: "同义替换率", v: 52, c: "var(--magenta)" },
          { l: "重复用词控制", v: 71, c: "var(--accent)" },
        ].map((r, i) => (
          <div key={r.l}>
            <div className="mb-1.5 flex justify-between text-sm">
              <span className="text-muted-foreground">{r.l}</span>
              <span className="font-display font-bold">{r.v}%</span>
            </div>
            <GrowBar value={r.v} color={r.c} delay={i * 100} />
          </div>
        ))}
        <div className="flex flex-wrap gap-2 pt-2">
          {["significant", "substantial", "considerable", "marked", "pronounced"].map((w) => (
            <span key={w} className="rounded-lg bg-secondary px-2.5 py-1 text-xs font-medium">
              {w}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (cap.panel === "path") {
    return (
      <div className="space-y-2.5">
        {[
          { w: "第 1–3 周", t: "诊断 + 听力精听打底", done: true },
          { w: "第 4–6 周", t: "阅读题型专项 · TFNG / Headings", done: true },
          { w: "第 7–9 周", t: "写作 Task 2 结构化训练", done: false },
          { w: "第 10–12 周", t: "四科全真模考 × 4 + 复盘", done: false },
        ].map((s) => (
          <div
            key={s.w}
            className="flex items-center gap-3 rounded-xl border border-border bg-secondary/60 px-4 py-3"
          >
            <span
              className={cn(
                "grid h-6 w-6 shrink-0 place-items-center rounded-full text-[10px] font-bold",
                s.done ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground",
              )}
            >
              {s.done ? "✓" : "·"}
            </span>
            <span className="font-display text-xs font-bold text-muted-foreground">{s.w}</span>
            <span className="text-sm">{s.t}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <div className="eyebrow">综合表现</div>
          <div className="font-display text-5xl font-extrabold">9.0</div>
        </div>
        <div className="rounded-xl bg-accent/15 px-3 py-1.5 text-xs font-bold text-ink">
          分数段 7 → 8
        </div>
      </div>
      <div className="mt-6 space-y-4">
        {[
          { l: "任务完成度", v: 90, c: "var(--primary)" },
          { l: "连贯与衔接", v: 88, c: "var(--primary-bright)" },
          { l: "词汇资源", v: 84, c: "var(--magenta)" },
          { l: "语法准确性", v: 92, c: "var(--accent)" },
        ].map((r, i) => (
          <div key={r.l}>
            <div className="mb-1.5 flex justify-between text-sm">
              <span className="text-muted-foreground">{r.l}</span>
              <span className="font-display font-bold">{(r.v / 10).toFixed(1)}</span>
            </div>
            <GrowBar value={r.v} color={r.c} delay={i * 110} />
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-xl border border-border bg-secondary/70 p-4 text-sm leading-relaxed">
        结构清晰、观点完整；继续加强词汇变化与句式准确性，可对照 8 分范文的段落展开方式。
      </div>
    </div>
  );
}

export function Capabilities() {
  const [active, setActive] = useState(0);
  const cap = CAPS[active] ?? CAPS[0]!;

  return (
    <section id="capability" className="mx-auto max-w-6xl px-5 py-24 md:py-32">
      <Reveal>
        <div className="eyebrow">Capabilities</div>
        <h2 className="mt-3 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] font-extrabold">
          一套系统，覆盖四科全部提分环节。
        </h2>
        <p className="mt-4 max-w-xl text-muted-foreground">
          七项能力，同一个自适应引擎。不是通用聊天机器人套壳，而是对着雅思评分标准长出来的产品。
        </p>
      </Reveal>

      <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <ul className="divide-y divide-border border-y border-border">
            {CAPS.map((c, i) => (
              <li key={c.id}>
                <button
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={cn(
                    "group flex w-full items-center gap-4 px-1 py-4 text-left transition-colors",
                    active === i ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <span
                    className={cn(
                      "font-display text-xs font-bold transition-colors",
                      active === i ? "text-primary" : "text-muted-foreground/60",
                    )}
                  >
                    {c.no}
                  </span>
                  <span className="font-display text-lg font-bold">{c.name}</span>
                  <span className="ml-auto text-xs">{c.tag}</span>
                  <span
                    className={cn(
                      "h-6 w-0.5 rounded-full transition-all",
                      active === i ? "bg-primary opacity-100" : "opacity-0",
                    )}
                  />
                </button>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={100}>
          <div className="surface-card p-6 md:p-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="eyebrow">{cap.no} · {cap.name}</div>
                <div className="mt-1 font-display text-xl font-bold">{cap.tag}</div>
              </div>
              <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                {cap.meta}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{cap.desc}</p>
            <div className="mt-7">
              <Panel cap={cap} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
