import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/StartCta";
import { Reveal } from "@/components/motion/Reveal";
import {
  ArrowRight,
  BookOpen,
  Building2,
  GraduationCap,
  LineChart,
  Users,
} from "lucide-react";

const TITLE = "机构合作 · AIELTS 语焉";
const DESC =
  "语焉雅思面向学校、培训机构与留学服务机构提供 AI 测评、全真模考与教研数据支持，共建高效备考解决方案。";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Partners,
});

const BENEFITS = [
  {
    num: "01",
    title: "丰富的雅思学习产品",
    desc: "由 Guided e-Learning（GEL）支持，覆盖快速测评、迷你模考、全真模考、会员课程与 AI 评分反馈，满足学员从诊断、训练到冲刺的不同需求。",
  },
  {
    num: "02",
    title: "可信的 AI 学习能力",
    desc: "基于 GEL 的真实学习数据，提供成绩预测、能力分析、个性化反馈和学习建议。",
  },
  {
    num: "03",
    title: "清晰的合作收益",
    desc: "通过专属推广入口邀请学员，订单、学员和收益数据在机构后台统一查看。",
  },
  {
    num: "04",
    title: "轻量化运营管理",
    desc: "无需自研平台，即可管理推广成员、查看订单并跟踪合作收益。",
  },
];

const CAPABILITIES = [
  {
    title: "灵活布置学习任务",
    desc: "支持按主题布置作业，可面向全班统一派发，也可针对单个学员分配。",
  },
  {
    title: "可视化班级数据",
    desc: "集中查看进度、成绩趋势和目标达成情况，快速识别需要关注的学员。",
  },
  {
    title: "智能练习与模考",
    desc: "结合系统课程、机考题库与定期模考，让 AI 动态练习匹配不同水平。",
  },
];

function Partners() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 md:pt-32">
        {/* Hero */}
        <section className="relative overflow-hidden pb-16 md:pb-24">
          <div
            className="pointer-events-none absolute -top-32 right-0 h-[520px] w-[520px] rounded-full opacity-30 blur-3xl"
            style={{ background: "var(--gradient-deep)" }}
          />
          <div className="relative mx-auto max-w-6xl px-5">
            <Reveal>
              <div className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--violet)" }}>
                For Schools and Institutions
              </div>
              <h1 className="mt-4 max-w-2xl font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] font-extrabold text-foreground">
                语焉雅思机构合作计划
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
                为高校、国际学校、留学服务机构和语言培训机构提供专业的雅思学习产品与数字化服务。成为合作伙伴，为学员提供高质量的测评、模考和 AI 学习支持，并通过产品推广获得持续合作收益。
              </p>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-bright"
                >
                  咨询客服
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-xl border border-input bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
                >
                  进入机构后台
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 合作权益 */}
        <section className="border-t border-border bg-white py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-5">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {BENEFITS.map((b, i) => (
                <Reveal key={b.title} delay={i * 80}>
                  <div className="rounded-2xl border border-border bg-background p-6 shadow-sm transition-shadow hover:shadow-md">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-extrabold text-white"
                      style={{ background: "var(--gradient-brand)" }}
                    >
                      {b.num}
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold text-foreground">{b.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 平台核心能力 */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-5">
            <Reveal>
              <div className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--violet)" }}>
                Core Capabilities
              </div>
              <h2 className="mt-3 font-display text-[clamp(1.5rem,4vw,2.25rem)] font-extrabold text-foreground">
                平台核心能力
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
                平台集教学管理、雅思课程、智能练习、模考测评与学习数据分析于一体。教师可按班级或学员灵活布置课程、练习和模考任务，实时掌握学习进度、成绩变化与能力表现。平台依托 GEL 的真实雅思学习数据与 FlexCheck AI，提供精准评分、能力分析、个性化反馈和改进建议。
              </p>
            </Reveal>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <Reveal>
                <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
                  <div className="aspect-[16/10] bg-muted/50" />
                  <div className="p-4">
                    <p className="text-sm font-semibold text-foreground">班级与教师管理</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
                  <div className="aspect-[16/10] bg-muted/50" />
                  <div className="p-4">
                    <p className="text-sm font-semibold text-foreground">班级学习数据分析</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={120}>
                <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
                  <div className="aspect-[16/10] bg-muted/50" />
                  <div className="p-4">
                    <p className="text-sm font-semibold text-foreground">主题个性化布置作业，支持全班或单人派发</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={160}>
                <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
                  <div className="aspect-[16/10] bg-muted/50" />
                  <div className="p-4">
                    <p className="text-sm font-semibold text-foreground">AI 动态练习与学习任务</p>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {CAPABILITIES.map((c, i) => (
                <Reveal key={c.title} delay={i * 80}>
                  <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                    <h3 className="font-display text-base font-bold text-foreground">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="py-16 md:py-24" style={{ background: "var(--navy)" }}>
          <div className="mx-auto max-w-6xl px-5">
            <div className="rounded-3xl p-8 md:p-12" style={{ background: "var(--gradient-deep)" }}>
              <Reveal>
                <div className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--lilac)" }}>
                  Get Started
                </div>
                <h2
                  className="mt-3 max-w-2xl font-display text-[clamp(1.5rem,4vw,2.25rem)] leading-[1.15] font-extrabold"
                  style={{ color: "#ffffff" }}
                >
                  让雅思教学、学员服务与合作经营更清晰
                </h2>
                <p className="mt-4 max-w-xl text-base" style={{ color: "var(--lilac)" }}>
                  了解合作政策与平台开通方式，请联系语焉雅思客服。
                </p>
              </Reveal>
              <Reveal delay={120}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-white/90"
                  >
                    咨询客服
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    进入机构后台
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
