import { ArrowRight, MessageCircle, Music2, QrCode } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import logoAsset from "@/assets/AIELTS-logo.png.asset.json";

const ENTRIES = [
  { title: "0 元快速测评", desc: "25分钟快速看清雅思水平", price: "免费" },
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

const PRODUCT_LINKS = ["Mini Mock 迷你模考", "IELTS Mock Test 全真模考", "冲刺卡", "学期卡"];
const SUPPORT_LINKS = ["服务条款", "隐私政策"];

const SOCIALS = [
  { name: "小红书", icon: <span className="font-display text-[11px] font-extrabold">小红书</span> },
  { name: "抖音", icon: <Music2 className="h-5 w-5" /> },
  { name: "微信公众号", icon: <MessageCircle className="h-5 w-5" /> },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-12">
          {/* 品牌 */}
          <div className="md:col-span-4">
            <img src={logoAsset.url} alt="AIELTS 语焉" className="h-8 w-auto" />
            <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
              英国文化教育协会（British Council）合作伙伴，专注提供系统性的英语备考课程与资料。
            </p>
          </div>

          {/* 产品 */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-bold text-foreground">产品</h3>
            <ul className="mt-4 space-y-2.5">
              {PRODUCT_LINKS.map((l) => (
                <li key={l}>
                  <a href="#pricing" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 支持 */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-bold text-foreground">支持</h3>
            <ul className="mt-4 space-y-2.5">
              {SUPPORT_LINKS.map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 联系客服 */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-bold text-foreground">联系客服</h3>
            <div className="mt-4 flex h-28 w-28 items-center justify-center rounded-xl border border-border bg-white shadow-sm">
              <QrCode className="h-20 w-20 text-foreground" strokeWidth={1.2} />
            </div>
            <p className="mt-3 text-xs leading-5 text-muted-foreground">
              扫码咨询课程 / 会员 / 账号 / 备考答疑
            </p>
          </div>

          {/* 关注我们 */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-bold text-foreground">关注我们</h3>
            <div className="mt-4 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href="#"
                  aria-label={s.name}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-white text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:text-primary"
                  style={{ boxShadow: "0 2px 8px -2px rgba(0,0,102,0.08)" }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <p className="mt-3 text-xs leading-5 text-muted-foreground">
              关注获取备考资料、学习干货、模考资讯、近期活动
            </p>
          </div>
        </div>
      </div>

      {/* 底栏 */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-5 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 语焉智能科技（北京）有限公司 版权所有</p>
          <a href="https://beian.miit.gov.cn" target="_blank" rel="noreferrer" className="transition-colors hover:text-primary">
            京ICP备2024093358号-4
          </a>
        </div>
      </div>
    </footer>
  );
}
