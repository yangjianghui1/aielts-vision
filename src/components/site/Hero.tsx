import { ArrowRight, Play, Headphones, BookOpen, PenLine, Mic } from "lucide-react";
import { CountUp, GrowBar } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";

const CRITERIA = [
  { label: "任务完成度", value: 90, color: "var(--primary)" },
  { label: "连贯与衔接", value: 88, color: "var(--primary-bright)" },
  { label: "词汇资源", value: 82, color: "var(--magenta)" },
  { label: "语法准确性", value: 86, color: "var(--accent)" },
];

const CHIPS = [
  { icon: Headphones, label: "听力" },
  { icon: BookOpen, label: "阅读" },
  { icon: PenLine, label: "写作" },
  { icon: Mic, label: "口语" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
      <div
        className="pointer-events-none absolute -top-40 -right-32 h-[520px] w-[520px] rounded-full opacity-25 blur-3xl"
        style={{ background: "var(--gradient-deep)" }}
      />
      <div
        className="pointer-events-none absolute top-40 -left-40 h-[420px] w-[420px] rounded-full opacity-15 blur-3xl"
        style={{ background: "var(--gradient-plum)" }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs text-muted-foreground">
              <span className="breathe h-1.5 w-1.5 rounded-full bg-primary" />
              获得英国文化教育协会（British Council）支持 · 深耕 AI 提分领域
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 font-display text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.04] font-extrabold">
              引领科技教育
              <br />
              成就<span className="text-gradient-brand">全球卓越</span>
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              用 AI 测评、英国文化教育协会遴选题库与全真模考资源，搭配个性化报告，帮助学习者更快看清英语水平、找到方向、持续提分。
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#cta"
                className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-bright"
              >
                0 元快速测评
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#mock"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3.5 text-sm font-semibold transition-colors hover:border-primary/50"
              >
                <Play className="h-4 w-4 text-primary" />
                看 90 秒演示
              </a>
            </div>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-8 flex flex-wrap gap-2">
              {CHIPS.map((c) => (
                <span
                  key={c.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold"
                >
                  <c.icon className="h-3.5 w-3.5 text-primary" />
                  {c.label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* 仿真 AI 评分报告面板 */}
        <Reveal delay={160}>
          <div className="surface-card relative p-6 md:p-7" style={{ boxShadow: "var(--shadow-lift)" }}>
            <div className="flex items-start justify-between">
              <span className="eyebrow">AI 预估总分</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-[10px] font-bold tracking-wider text-primary">
                <span className="breathe h-1.5 w-1.5 rounded-full bg-accent" />
                LIVE
              </span>
            </div>

            <div className="mt-2 flex items-end gap-3">
              <CountUp to={7.5} decimals={1} className="font-display text-6xl leading-none font-extrabold" />
              <span className="pb-2 text-sm font-bold text-accent">+0.5 / 周</span>
            </div>

            <div className="mt-7 space-y-4">
              {CRITERIA.map((c, i) => (
                <div key={c.label}>
                  <div className="mb-1.5 flex justify-between text-sm">
                    <span className="text-muted-foreground">{c.label}</span>
                    <span className="font-display font-bold">{(c.value / 10).toFixed(1)}</span>
                  </div>
                  <GrowBar value={c.value} color={c.color} delay={i * 120} />
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-border bg-secondary/70 p-4">
              <div className="eyebrow mb-1.5">AI 导师建议</div>
              <p className="text-sm leading-relaxed">
                「本周连贯性提升明显。下一步：在写引言前先完成 Task 2 题干改写练习。」
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
