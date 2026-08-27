import { Check, ChevronDown } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const PLANS = [
  {
    name: "冲刺卡",
    tagline: "冲刺雅思首选",
    price: "¥899",
    unit: "/ 期",
    rows: [
      ["1 个月", "使用期限"],
      ["4 次", "AI 模考评分"],
      ["60", "Token 一次性发放"],
    ],
    service: "专属服务：学习资源包",
    cta: "选择冲刺卡",
    featured: false,
    badge: "最省钱",
  },
  {
    name: "学期卡",
    tagline: "折合 ¥467 / 月",
    price: "¥2799",
    unit: "/ 期",
    rows: [
      ["6 个月", "使用期限"],
      ["24 次", "每月 4 次 AI 模考评分"],
      ["360", "每月 60 Token"],
    ],
    service: "专属服务：全权益学习服务",
    cta: "选择学期卡",
    featured: true,
    badge: "最受欢迎",
  },
];

const INCLUDED = [
  "40 套全真模考",
  "AI 英语能力测评",
  "AI 写作 / 口语评分",
  "听力阅读表现分析",
  "AI 词汇能力分析",
  "AI 学习路径规划",
  "AI 领航强化训练",
  "119 节课程（直播 + 录播）",
];

const TOKENS = [
  { n: "20 Tokens", tag: "轻量补充", price: "¥239", desc: "约 4 组口语及写作精细化反馈" },
  { n: "50 Tokens", tag: "日常训练", price: "¥449", desc: "约 10 组口语及写作精细化反馈" },
  { n: "100 Tokens", tag: "进阶提升", price: "¥799", desc: "约 20 组口语及写作精细化反馈" },
  { n: "200 Tokens", tag: "高频训练", price: "¥1399", desc: "约 40 组口语及写作精细化反馈" },
];

export function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-5 py-24 md:py-32">
      <Reveal>
        <div className="eyebrow">Membership</div>
        <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] font-extrabold">
          两档会员，按备考周期选择。
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {PLANS.map((p, i) => (
          <Reveal key={p.name} delay={i * 90}>
            <div
              className="surface-card lift-on-hover relative h-full p-8"
              style={p.featured ? { borderColor: "var(--primary)", boxShadow: "var(--shadow-lift)" } : undefined}
            >
              <span
                className="absolute -top-3 left-8 rounded-full px-3 py-1 text-[10px] font-bold tracking-wider text-primary-foreground"
                style={{ background: p.featured ? "var(--primary)" : "var(--ink)" }}
              >
                {p.badge}
              </span>

              <div className="eyebrow">Membership Plan</div>
              <h3 className="mt-2 font-display text-2xl font-extrabold">{p.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>

              <div className="mt-6 flex items-end gap-1">
                <span className="font-display text-5xl font-extrabold">{p.price}</span>
                <span className="pb-2 text-sm text-muted-foreground">{p.unit}</span>
              </div>

              <div className="mt-7 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-border bg-border">
                {p.rows.map(([v, l]) => (
                  <div key={l} className="bg-card px-3 py-4 text-center">
                    <div className="font-display text-lg font-extrabold text-primary">{v}</div>
                    <div className="mt-1 text-[11px] leading-tight text-muted-foreground">{l}</div>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-sm font-semibold">{p.service}</p>

              <a
                href="#cta"
                className="mt-7 block rounded-xl px-6 py-3.5 text-center text-sm font-semibold transition-colors"
                style={
                  p.featured
                    ? { background: "var(--primary)", color: "var(--primary-foreground)" }
                    : { border: "1px solid var(--border)" }
                }
              >
                {p.cta}
              </a>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={80}>
        <div className="surface-card mt-6 p-8">
          <div className="eyebrow">两档会员均包含</div>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {INCLUDED.map((it) => (
              <li key={it} className="flex items-center gap-2.5 text-sm">
                <Check className="h-4 w-4 shrink-0 text-primary" />
                {it}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <details className="group surface-card mt-6 p-6">
          <summary className="flex cursor-pointer list-none items-center justify-between">
            <span>
              <span className="eyebrow">AI Credits</span>
              <span className="mt-1 block font-display text-lg font-bold">
                Token 充值包 · 4 档，¥239 起
              </span>
            </span>
            <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform group-open:rotate-180" />
          </summary>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TOKENS.map((t) => (
              <div key={t.n} className="lift-on-hover rounded-xl border border-border p-5">
                <div className="font-display text-base font-bold">{t.n}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{t.tag}</div>
                <div className="mt-4 font-display text-2xl font-extrabold text-primary">{t.price}</div>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{t.desc}</p>
              </div>
            ))}
          </div>
        </details>
      </Reveal>
    </section>
  );
}
