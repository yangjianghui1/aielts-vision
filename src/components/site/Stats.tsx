import { Info } from "lucide-react";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { Marquee } from "./Marquee";

const KEYWORDS = [
  "全真模考",
  "AI 写作评分",
  "AI 口语评分",
  "真人外教直播",
  "听力模拟解析",
  "阅读模拟解析",
  "口语写作范文",
  "AI 领航训练",
  "预估分报告",
];

const STATS = [
  { to: 150, suffix: "万+", label: "全球服务雅思学习者", note: "" },
  { to: 43, suffix: "万+", label: "助力中国考生", note: "2021.06 起" },
  { to: 96, suffix: "%", label: "用户成绩提高率", note: "" },
  { to: 98, suffix: "%", label: "用户高度推荐率", note: "" },
];

export function Stats() {
  return (
    <section className="border-y border-border bg-secondary/50">
      <div className="py-6">
        <Marquee
          items={KEYWORDS.map((k) => (
            <span
              key={k}
              className="flex items-center gap-10 px-10 font-display text-3xl font-extrabold text-muted-foreground/35 md:text-4xl"
            >
              {k}
              <span className="h-1.5 w-1.5 rounded-full bg-primary/30" />
            </span>
          ))}
        />
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-14">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 70}>
              <div className="h-full bg-card px-6 py-8 text-center">
                <div className="font-display text-4xl font-extrabold text-primary md:text-5xl">
                  <CountUp to={s.to} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-sm font-semibold">{s.label}</div>
                {s.note && <div className="mt-1 text-xs text-muted-foreground">{s.note}</div>}
              </div>
            </Reveal>
          ))}
        </div>

        <details className="group mt-4">
          <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary">
            <Info className="h-3.5 w-3.5" />
            数据说明
          </summary>
          <div className="mt-3 rounded-xl border border-border bg-card p-4 text-xs leading-relaxed text-muted-foreground">
            数据来源：IELTS Ready Premium 平台全量学员遥测模考数据、英国文化教育协会（BC）ORS
            真实雅思成绩库交叉匹配。统计时间：2025.05.01 – 2026.04.30（完整 12 个月）。样本量：204
            个国家/地区共 316,837 人。
          </div>
        </details>
      </div>
    </section>
  );
}
