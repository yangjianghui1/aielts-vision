import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { GrowBar } from "@/components/motion/CountUp";
import { SpeakingRecorder, SpeakingReport } from "@/components/site/SpeakingRecorder";
import { SampleEssays } from "@/components/site/SampleEssays";
import { ReadingMock } from "@/components/site/ReadingMock";
import { WritingFeedback } from "@/components/site/WritingFeedback";
import { SpeakingSamples } from "@/components/site/SpeakingSamples";
import { ListeningMock } from "@/components/site/ListeningMock";
import { ReadingAnalysis } from "@/components/site/ReadingAnalysis";
import { cn } from "@/lib/utils";

type Cap = {
  id: string;
  no: string;
  name: string;
  tag: string;
  desc: string;
  meta: string;
  panel: "score" | "speak" | "vocab" | "path" | "essay" | "mock" | "writing" | "speak-sample" | "listening" | "reading" | "courses";
};

const CAPS: Cap[] = [
  {
    id: "mock",
    no: "01",
    name: "全真模考",
    tag: "完整还原机考流程",
    desc: "40 套全真模考，真实页面操作、时间节奏与作答方式，考前把陌生感全部消耗掉。",
    meta: "3 小时 · 四科连考",
    panel: "mock",
  },
  {
    id: "writing",
    no: "02",
    name: "AI 写作评分",
    tag: "四维度逐条批改",
    desc: "提交 Task 1 / Task 2，返回任务完成度、连贯与衔接、词汇资源、语法准确性四项分数与行内改写建议。",
    meta: "平均 45 秒出分",
    panel: "writing",
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
    id: "speak-sample",
    no: "05",
    name: "AI 口语范文",
    tag: "真人现场示范",
    desc: "真人考官视角的口语示范视频，对照 5.5 与 6 分现场表现，逐分数段读解官方评分描述，看清差距到底在哪。",
    meta: "示范视频 + 评分描述",
    panel: "speak-sample",
  },
  {
    id: "vocab",
    no: "06",
    name: "AI 听力解析",
    tag: "逐题 AI 讲解",
    desc: "真实机考听力界面，作答后每道题都有 AI 逐题解析：为什么对、为什么错、原文依据在哪。",
    meta: "4 个 Part · 40 题精讲",
    panel: "listening",
  },
  {
    id: "path",
    no: "07",
    name: "AI 阅读解析",
    tag: "逐题原文定位",
    desc: "真实机考阅读界面，TFNG、选择、匹配各题型逐题 AI 讲解，中英文反馈一键切换，错因直接定位到原文句子。",
    meta: "3 个 Part · 40 题精讲",
    panel: "reading",
  },
  {
    id: "boost",
    no: "08",
    name: "200+外教课程",
    tag: "地道口语强输出",
    desc: "200+ 节外教直播与录播课程，覆盖听说读写与语法全类别，按类别、时长自由筛选，注册直播或随时观看回放。",
    meta: "直播 + 回放 · 每日更新",
    panel: "courses",
  },
];

function Panel({ cap }: { cap: Cap }) {
  if (cap.panel === "mock") {
    return <ReadingMock />;
  }

  if (cap.panel === "essay") {
    return <SampleEssays />;
  }

  if (cap.panel === "writing") {
    return <WritingFeedback />;
  }

  if (cap.panel === "speak") {
    return (
      <div className="grid gap-4 xl:grid-cols-2">
        <SpeakingRecorder compact />
        <SpeakingReport />
      </div>
    );
  }

  if (cap.panel === "speak-sample") {
    return <SpeakingSamples />;
  }

  if (cap.panel === "listening") {
    return <ListeningMock />;
  }

  if (cap.panel === "reading") {
    return <ReadingAnalysis />;
  }

  if (cap.panel === "courses") {
    return <CoursesMock />;
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
    <section id="capability" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 md:py-32">
      <Reveal>
        <div className="eyebrow">Capabilities</div>
        <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] font-extrabold whitespace-nowrap">
          一套系统，覆盖四科全部提分环节。
        </h2>
        <p className="mt-4 text-muted-foreground whitespace-nowrap">
          依托 GEL 的真实雅思学习数据与 FlexCheck AI，提供精准评分、能力分析、个性化反馈和改进建议。
        </p>
        <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground/70">
          页面内容为演示效果，部分信息经过简化处理，完整版本具备更专业丰富的能力。
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(260px,300px)_1fr]">
        <Reveal>
          <div className="grid grid-cols-1 gap-2.5">
            {CAPS.map((c, i) => (
              <button
                key={c.id}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition-all",
                  active === i
                    ? "border-primary/30 bg-primary/5 text-foreground shadow-sm"
                    : "border-border bg-card text-muted-foreground hover:border-primary/20 hover:bg-primary/[0.02] hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "font-display text-[10px] font-bold transition-colors",
                    active === i ? "text-primary" : "text-muted-foreground/60",
                  )}
                >
                  {c.no}
                </span>
                <div className="flex flex-1 flex-col">
                  <span className="font-display text-sm font-bold leading-tight">{c.name}</span>
                  <span className="text-[11px] opacity-75">{c.tag}</span>
                </div>
                <span
                  className={cn(
                    "h-2 w-2 shrink-0 rounded-full transition-all",
                    active === i ? "bg-primary opacity-100" : "opacity-0",
                  )}
                />
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="surface-card p-4 md:p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="eyebrow">{cap.no} · {cap.name}</div>
                <div className="mt-0.5 font-display text-base font-bold md:text-lg">{cap.tag}</div>
              </div>
              <span className="w-fit rounded-full border border-border px-2.5 py-0.5 text-[11px] text-muted-foreground">
                {cap.meta}
              </span>
            </div>
            <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-muted-foreground">{cap.desc}</p>
            <div className="mt-3">
              <Panel cap={cap} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
