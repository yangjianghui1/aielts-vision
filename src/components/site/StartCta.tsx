import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const ENTRIES = [
  { title: "0 元快速测评", desc: "10 分钟看清当前英语能力水平", price: "免费" },
  { title: "¥29.9 迷你模考", desc: "能力分析报告 + 测评结果解读", price: "¥29.9" },
];

export function StartCta() {
  return (
    <section id="cta" className="relative overflow-hidden py-24 md:py-32" style={{ background: "var(--navy)" }}>
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-[540px] w-[540px] -translate-x-1/2 rounded-full opacity-45 blur-3xl"
        style={{ background: "var(--gradient-deep)" }}
      />
      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <Reveal>
          <div className="eyebrow" style={{ color: "var(--lilac)" }}>
            Start Small
          </div>
          <h2
            className="mt-3 font-display text-[clamp(2rem,4.4vw,3.25rem)] leading-[1.1] font-extrabold"
            style={{ color: "#ffffff" }}
          >
            先试一试，
            <br />
            再决定更适合你的备考方式。
          </h2>
          <p className="mt-5 text-base" style={{ color: "var(--lilac)" }}>
            低门槛体验，快速了解当前水平、熟悉真实考试流程。无需信用卡。
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {ENTRIES.map((e) => (
              <a
                key={e.title}
                href="#"
                className="group rounded-2xl border p-6 text-left transition-colors"
                style={{ borderColor: "rgba(220,220,232,0.22)", background: "rgba(255,255,255,0.05)" }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg font-bold" style={{ color: "#ffffff" }}>
                    {e.title}
                  </span>
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    style={{ color: "var(--accent)" }}
                  />
                </div>
                <p className="mt-2 text-sm" style={{ color: "var(--lilac)" }}>
                  {e.desc}
                </p>
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={160}>
          <a
            href="#"
            className="mt-8 inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            style={{ background: "var(--gradient-brand)" }}
          >
            立即免费注册
            <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 text-xs text-muted-foreground sm:flex-row">
        <div className="flex items-center gap-2">
          <span
            className="grid h-6 w-6 place-items-center rounded-md font-display text-[10px] font-extrabold text-primary-foreground"
            style={{ background: "var(--gradient-brand)" }}
          >
            A
          </span>
          <span className="font-display font-bold text-foreground">AIELTS 语焉</span>
        </div>
        <p>© 2026 语焉雅思 · 获英国文化教育协会（British Council）支持</p>
      </div>
    </footer>
  );
}
