import { ArrowRight, Play, Headphones, BookOpen, PenLine, Mic, Clock, FileQuestion, BadgeCheck, TrendingUp } from "lucide-react";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";

const CHIPS = [
  { icon: Headphones, label: "听力" },
  { icon: BookOpen, label: "阅读" },
  { icon: PenLine, label: "写作" },
  { icon: Mic, label: "口语" },
];

const SKILLS = [
  { icon: Mic, label: "口语", score: 7.0, color: "#ffb500" },
  { icon: Headphones, label: "听力", score: 7.5, color: "#5000ff" },
  { icon: PenLine, label: "写作", score: 6.5, color: "#dc3dbe" },
  { icon: BookOpen, label: "阅读", score: 7.5, color: "#1066ff" },
];

const WEEKS = ["7月 8–15", "7月 16–23", "7月 24–31", "8月 1–8"];
// 稳步上升的备考曲线：5.5 → 7.5
const CURVE = "M0,120 C40,116 70,108 100,98 S160,80 200,66 S290,42 340,28 S400,14 440,8";

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
                href="#pricing"
                className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-bright"
              >
                开通会员
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

        {/* 仿真学习进度面板 */}
        <Reveal delay={160}>
          <div
            className="relative overflow-hidden rounded-2xl p-6 text-white md:p-7"
            style={{ background: "#060633", boxShadow: "var(--shadow-lift)" }}
          >
            {/* 顶部切换 */}
            <div className="flex rounded-full bg-white/10 p-1 text-xs font-semibold">
              <span className="flex-1 rounded-full bg-white/20 py-2 text-center">所有练习</span>
              <span className="flex-1 py-2 text-center text-white/50">仅模拟测试</span>
            </div>

            {/* 分数总览 */}
            <div className="mt-5 flex items-start justify-between">
              <div>
                <div className="font-display text-xl font-bold">您的进度 *</div>
                <div className="mt-0.5 text-xs text-white/50">雅思分数段</div>
              </div>
              <div className="flex items-end gap-1.5 font-display leading-none">
                <CountUp to={7.5} decimals={1} className="text-4xl font-extrabold" />
                <span className="pb-0.5 text-lg font-bold text-white/40">/ 9.0</span>
              </div>
            </div>

            {/* 上升曲线 */}
            <div className="mt-4">
              <svg viewBox="0 0 440 140" className="w-full">
                <defs>
                  <linearGradient id="heroCurve" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#5000ff" />
                    <stop offset="60%" stopColor="#dc3dbe" />
                    <stop offset="100%" stopColor="#ffb500" />
                  </linearGradient>
                  <linearGradient id="heroCurveFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5000ff" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#5000ff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={`${CURVE} L440,140 L0,140 Z`} fill="url(#heroCurveFill)" />
                <path
                  d={CURVE}
                  fill="none"
                  stroke="url(#heroCurve)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={1}
                  style={{ animation: "draw-curve 1.8s ease-out 0.4s forwards" }}
                />
              </svg>
              <div className="mt-1 grid grid-cols-4 text-center text-[10px] text-white/40">
                {WEEKS.map((w) => (
                  <span key={w}>{w}</span>
                ))}
              </div>
            </div>

            {/* 四项分数 */}
            <div className="mt-5 grid grid-cols-2 gap-2.5">
              {SKILLS.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between rounded-full bg-white/10 px-4 py-2.5"
                >
                  <span className="flex items-center gap-2 text-xs font-semibold">
                    <s.icon className="h-4 w-4" style={{ color: s.color }} />
                    {s.label}
                  </span>
                  <span className="font-display text-lg font-bold">{s.score.toFixed(1)}</span>
                </div>
              ))}
            </div>

            {/* 学习数据 */}
            <div className="mt-4 rounded-2xl border border-white/15 p-4">
              <div className="grid grid-cols-2 divide-x divide-white/10">
                <div className="pr-4">
                  <div className="flex items-center gap-1.5 text-xs text-white/50">
                    <Clock className="h-3.5 w-3.5 text-primary-bright" />
                    学习时长
                  </div>
                  <div className="mt-1 font-display text-lg font-bold">54min 14sec</div>
                </div>
                <div className="pl-4">
                  <div className="flex items-center gap-1.5 text-xs text-white/50">
                    <FileQuestion className="h-3.5 w-3.5 text-magenta" />
                    练习题数
                  </div>
                  <div className="mt-1 font-display text-lg font-bold">14</div>
                </div>
              </div>
              <div className="mt-3 border-t border-white/10 pt-3">
                <div className="flex items-center gap-1.5 text-xs text-white/50">
                  <BadgeCheck className="h-3.5 w-3.5 text-primary-bright" />
                  最佳表现题型
                </div>
                <div className="mt-1 font-display text-sm font-bold">
                  IELTS Speaking Part 2 <span className="text-white/40">/ Speaking</span>
                </div>
              </div>
              <div className="mt-3 border-t border-white/10 pt-3">
                <div className="flex items-center gap-1.5 text-xs text-white/50">
                  <TrendingUp className="h-3.5 w-3.5 text-accent" />
                  需改进题型
                </div>
                <div className="mt-1 font-display text-sm font-bold">
                  Matching information to categories <span className="text-white/40">/ Reading</span>
                </div>
              </div>
            </div>

            <p className="mt-3 text-[10px] leading-relaxed text-white/35">
              * 本系统提供的分数是基于练习测试的雅思预估分数，可能与您的实际雅思考试成绩有所差异。
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
