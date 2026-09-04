import { Check } from "lucide-react";
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
  { n: "20 Tokens", tag: "轻量补充", price: "239", desc: "约可完成 4 组雅思口语及写作的 Advantage AI 精细化反馈", featured: true },
  { n: "50 Tokens", tag: "日常训练", price: "449", desc: "约可完成 10 组雅思口语及写作的 Advantage AI 精细化反馈", featured: false },
  { n: "100 Tokens", tag: "进阶提升", price: "799", desc: "约可完成 20 组雅思口语及写作的 Advantage AI 精细化反馈", featured: false },
  { n: "200 Tokens", tag: "高频训练", price: "1399", desc: "约可完成 40 组雅思口语及写作的 Advantage AI 精细化反馈", featured: false },
];

export function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 md:py-32">
      <Reveal>
        <div className="eyebrow">Membership</div>
        <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] font-extrabold">
          两档会员，按备考周期选择
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {PLANS.map((p, i) => (
          <Reveal key={p.name} delay={i * 90}>
            <div
              className="surface-card lift-on-hover group relative h-full border-primary p-8 transition-all duration-300 hover:[background:var(--gradient-brand)] hover:text-white hover:shadow-[var(--shadow-lift)] hover:border-transparent"
              style={p.featured ? { boxShadow: "var(--shadow-lift)" } : undefined}
            >
              <span
                className={`absolute -top-3 left-8 rounded-full px-3 py-1 text-[10px] font-bold tracking-wider text-primary-foreground transition-colors group-hover:bg-white group-hover:text-primary ${
                  p.featured ? "bg-primary" : "bg-navy"
                }`}
              >
                {p.badge}
              </span>

              <div className="eyebrow transition-colors group-hover:text-white/80">Membership Plan</div>
              <h3 className="mt-2 font-display text-2xl font-extrabold">{p.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground transition-colors group-hover:text-white/85">
                {p.tagline}
              </p>

              <div className="mt-6 flex items-end gap-1">
                <span className="font-display text-5xl font-extrabold">{p.price}</span>
                <span className="pb-2 text-sm text-muted-foreground transition-colors group-hover:text-white/80">
                  {p.unit}
                </span>
              </div>

              <div className="mt-7 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-primary/25 bg-border transition-colors group-hover:border-white/20 group-hover:bg-transparent">
                {p.rows.map(([v, l]) => (
                  <div key={l} className="bg-card px-3 py-4 text-center transition-colors group-hover:bg-transparent">
                    <div className="font-display text-lg font-extrabold text-primary transition-colors group-hover:text-white">
                      {v}
                    </div>
                    <div className="mt-1 text-[11px] leading-tight text-muted-foreground transition-colors group-hover:text-white/80">
                      {l}
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-sm font-semibold transition-colors group-hover:text-white/90">{p.service}</p>

              <a
                href="#cta"
                className="mt-7 block rounded-xl bg-primary px-6 py-3.5 text-center text-sm font-semibold text-white transition-colors group-hover:bg-white group-hover:text-primary"
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
        <div className="mt-16">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="eyebrow">AI Credits</div>
              <h3 className="mt-2 font-display text-2xl font-extrabold md:text-3xl">
                Token 充值包，随用随充
              </h3>
            </div>
            <p className="max-w-md text-sm text-muted-foreground">
              会员套餐内 Token 用完后，可购买充值包继续解锁高级 AI 反馈。
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TOKENS.map((t) => (
              <div
                key={t.n}
                className="lift-on-hover group relative flex flex-col overflow-hidden rounded-2xl border border-primary bg-card p-6 transition-all duration-300 hover:[background:var(--gradient-brand)] hover:text-white hover:shadow-[var(--shadow-lift)] hover:border-transparent"
              >
                {/* 装饰 T 水印 */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-5 -bottom-10 font-display text-[150px] leading-none font-extrabold select-none text-primary opacity-[0.05] transition-opacity group-hover:opacity-[0.14] group-hover:text-white"
                >
                  T
                </span>

                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 font-display text-lg font-extrabold text-primary transition-colors group-hover:bg-white/20 group-hover:text-white">
                  T
                </span>

                <div className="mt-5 font-display text-xl font-extrabold">{t.n}</div>
                <div className="mt-0.5 text-xs opacity-85 transition-opacity group-hover:opacity-100">
                  <span className="text-muted-foreground transition-colors group-hover:text-white/85">{t.tag}</span>
                </div>

                <div className="mt-5 flex items-start gap-0.5">
                  <span className="pt-1.5 font-display text-lg font-extrabold">¥</span>
                  <span className="font-display text-4xl font-extrabold tracking-tight">{t.price}</span>
                </div>

                <p className="mt-5 flex items-start gap-1.5 text-xs leading-relaxed text-muted-foreground transition-colors group-hover:text-white/90">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary transition-colors group-hover:text-white" />
                  {t.desc}
                </p>

                <button className="relative z-10 mt-6 w-full rounded-xl bg-primary py-3 text-sm font-bold text-white transition-colors hover:opacity-90 group-hover:bg-white group-hover:text-primary">
                  立即购买
                </button>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
