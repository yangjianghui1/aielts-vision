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
                href="#cta"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3.5 text-sm font-semibold transition-colors hover:border-primary/50"
              >
                <Play className="h-4 w-4 text-primary" />
                免费注册
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
            className="relative overflow-hidden rounded-2xl border border-border bg-card/70 p-5 tracking-tight backdrop-blur-xl md:p-6"
            style={{ boxShadow: "var(--shadow-lift)" }}
          >
            {/* 顶部切换 */}
            <div className="flex rounded-full bg-muted p-1 text-[11px] font-semibold">
              <span className="flex-1 rounded-full bg-background py-1.5 text-center shadow-sm">所有练习</span>
              <span className="flex-1 py-1.5 text-center text-muted-foreground">仅模拟测试</span>
            </div>

            {/* 分数总览 */}
            <div className="mt-4 flex items-start justify-between">
              <div>
                <div className="font-display text-lg font-bold">您的进度 *</div>
                <div className="mt-0.5 text-[11px] text-muted-foreground">雅思分数段</div>
              </div>
              <div className="flex items-end gap-1.5 font-display leading-none">
                <CountUp to={7.5} decimals={1} className="text-3xl font-extrabold" />
                <span className="pb-0.5 text-base font-bold text-muted-foreground">/ 9.0</span>
              </div>
            </div>

            {/* 上升曲线 + 纵轴 */}
            <div className="mt-3">
              <svg viewBox="0 0 460 120" className="w-full">
                <defs>
                  <linearGradient id="heroCurve" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#5000ff" />
                    <stop offset="60%" stopColor="#dc3dbe" />
                    <stop offset="100%" stopColor="#ffb500" />
                  </linearGradient>
                  <linearGradient id="heroCurveFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5000ff" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#5000ff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* 纵轴分数标签 */}
                <g className="text-[9px] fill-muted-foreground">
                  <text x="4" y="108">5.5</text>
                  <text x="4" y="82">6.5</text>
                  <text x="4" y="56">7.5</text>
                  <text x="4" y="30">8.5</text>
                </g>
                {/* 水平网格线 */}
                <g stroke="currentColor" strokeWidth="0.5" className="text-border">
                  <line x1="28" y1="104" x2="460" y2="104" />
                  <line x1="28" y1="78" x2="460" y2="78" />
                  <line x1="28" y1="52" x2="460" y2="52" />
                  <line x1="28" y1="26" x2="460" y2="26" />
                </g>
                {/* 曲线填充与线条 */}
                <g transform="translate(28, 0)">
                  <path d={`${CURVE} L440,120 L0,120 Z`} fill="url(#heroCurveFill)" />
                  <path
                    d={CURVE}
                    fill="none"
                    stroke="url(#heroCurve)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    pathLength={1}
                    strokeDasharray={1}
                    strokeDashoffset={1}
                    style={{ animation: "draw-curve 1.8s ease-out 0.4s forwards" }}
                  />
                </g>
              </svg>
              <div className="mt-1 grid grid-cols-4 gap-1 pl-7 text-center text-[10px] text-muted-foreground">
                {WEEKS.map((w) => (
                  <span key={w}>{w}</span>
                ))}
              </div>
            </div>

            {/* 四项分数 */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {SKILLS.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between rounded-full border border-border bg-muted/60 px-3 py-2"
                >
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold">
                    <s.icon className="h-3.5 w-3.5" style={{ color: s.color }} />
                    {s.label}
                  </span>
                  <span className="font-display text-base font-bold">{s.score.toFixed(1)}</span>
                </div>
              ))}
            </div>

            {/* 学习数据 */}
            <div className="mt-3 rounded-xl border border-border p-3">
              <div className="grid grid-cols-2 divide-x divide-border">
                <div className="pr-3">
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Clock className="h-3 w-3 text-primary-bright" />
                    学习时长
                  </div>
                  <div className="mt-0.5 font-display text-base font-bold">54min 14sec</div>
                </div>
                <div className="pl-3">
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <FileQuestion className="h-3 w-3 text-magenta" />
                    练习题数
                  </div>
                  <div className="mt-0.5 font-display text-base font-bold">14</div>
                </div>
              </div>
              <div className="mt-2 border-t border-border pt-2">
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <BadgeCheck className="h-3 w-3 text-primary-bright" />
                  最佳表现题型
                </div>
                <div className="mt-0.5 font-display text-xs font-bold">
                  IELTS Speaking Part 2 <span className="text-muted-foreground">/ Speaking</span>
                </div>
              </div>
              <div className="mt-2 border-t border-border pt-2">
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <TrendingUp className="h-3 w-3 text-accent" />
                  需改进题型
                </div>
                <div className="mt-0.5 font-display text-xs font-bold">
                  Matching information to categories <span className="text-muted-foreground">/ Reading</span>
                </div>
              </div>
            </div>

            <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground/70">
              * 本系统提供的分数是基于练习测试的雅思预估分数，可能与您的实际雅思考试成绩有所差异。
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
