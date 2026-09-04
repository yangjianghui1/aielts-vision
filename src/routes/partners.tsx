import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/StartCta";
import { Reveal } from "@/components/motion/Reveal";

const TITLE = "机构合作 · AIELTS 语焉雅思机构合作计划";
const DESC =
  "语焉雅思为高校、国际学校、留学服务机构和语言培训机构提供专业的雅思学习产品与数字化服务：班级管理、AI 评分、模考测评与学习数据分析。";

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

const VALUES = [
  {
    no: "01",
    title: "丰富的雅思学习产品",
    desc: "由 Guided e-Learning（GEL）支持，覆盖快速测评、迷你模考、全真模考、会员课程与 AI 评分反馈，满足学员从诊断、训练到冲刺的不同需求。",
  },
  {
    no: "02",
    title: "可信的 AI 学习能力",
    desc: "基于 GEL 的真实学习数据，提供成绩预测、能力分析、个性化反馈和学习建议。",
  },
  {
    no: "03",
    title: "清晰的合作收益",
    desc: "通过专属推广入口邀请学员，订单、学员和收益数据在机构后台统一查看。",
  },
  {
    no: "04",
    title: "轻量化运营管理",
    desc: "无需自研平台，即可管理推广成员、查看订单并跟踪合作收益。",
  },
];

const CAPS = [
  { title: "班级与教师管理", desc: "统一管理班级、教师与学员账号，批量开通与分组。" },
  { title: "班级学习数据分析", desc: "集中查看进度、成绩趋势和目标达成情况，快速识别需要关注的学员。" },
  { title: "主题个性化布置作业", desc: "支持按主题布置作业，可面向全班统一派发，也可针对单个学员分配。" },
  { title: "AI 动态练习与学习任务", desc: "结合系统课程、机考题库与定期模考，让 AI 动态练习匹配当前水平。" },
];

function MockPanel({ label }: { label: string }) {
  return (
    <div className="surface-card overflow-hidden">
      <div className="h-1.5 w-full" style={{ background: "var(--gradient-brand)" }} />
      <div className="space-y-2 bg-secondary/50 p-5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-magenta/60" />
          <span className="h-2 w-2 rounded-full bg-accent/60" />
          <span className="h-2 w-2 rounded-full bg-primary/40" />
          <span className="ml-2 h-2 w-24 rounded-full bg-border" />
        </div>
        <div className="grid grid-cols-3 gap-2 pt-1">
          <div className="space-y-1.5 rounded-lg bg-card p-2.5">
            {[100, 76, 88, 64].map((w, i) => (
              <div key={i} className="h-1.5 rounded-full bg-secondary" style={{ width: `${w}%` }} />
            ))}
          </div>
          <div className="col-span-2 space-y-1.5 rounded-lg bg-card p-2.5">
            {[92, 100, 70, 84, 60].map((w, i) => (
              <div key={i} className="h-1.5 rounded-full bg-secondary" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border px-5 py-3 text-xs font-semibold">{label}</div>
    </div>
  );
}

function Partners() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
          <div
            className="pointer-events-none absolute -top-40 -right-24 h-[520px] w-[520px] rounded-full opacity-25 blur-3xl"
            style={{ background: "var(--gradient-brand)" }}
          />
          <div className="relative mx-auto max-w-6xl px-5">
            <Reveal>
              <div className="eyebrow">For Schools and Institutions</div>
              <h1 className="mt-3 font-display text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.1] font-extrabold">
                语焉雅思机构合作计划
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                为高校、国际学校、留学服务机构和语言培训机构提供专业的雅思学习产品与数字化服务。成为合作伙伴，为学员提供高质量的测评、模考和
                AI 学习支持，并通过产品推广获得持续合作收益。
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/#cta"
                  className="rounded-xl px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                  style={{ background: "var(--gradient-brand)" }}
                >
                  咨询客服
                </a>
                <a
                  href="/#cta"
                  className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
                >
                  进入机构后台
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 合作价值 */}
        <section className="border-y border-border bg-secondary/40 py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-5 px-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.no} delay={i * 70}>
                <div className="surface-card lift-on-hover h-full p-6">
                  <span className="rounded-lg bg-primary/10 px-2 py-1 font-display text-xs font-extrabold text-primary">
                    {v.no}
                  </span>
                  <h3 className="mt-4 font-display text-base font-extrabold">{v.title}</h3>
                  <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 平台核心能力 */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <Reveal>
              <div className="eyebrow">Core Capabilities</div>
              <h2 className="mt-3 font-display text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.12] font-extrabold">
                平台核心能力
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                平台集教学管理、雅思课程、智能练习、模考测评与学习数据分析于一体。教师可按班级或学员灵活布置课程、练习和模考任务，实时掌握学习进度、成绩变化与能力表现。平台依托
                GEL 的真实雅思学习数据与 FlexCheck AI，提供精准评分、能力分析、个性化反馈和改进建议。
              </p>
            </Reveal>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {CAPS.map((c, i) => (
                <Reveal key={c.title} delay={i * 70}>
                  <MockPanel label={c.title} />
                </Reveal>
              ))}
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {[
                { t: "灵活布置学习任务", d: "支持按主题布置作业，可面向全班统一派发，也可针对单个学员分配。" },
                { t: "可视化班级数据", d: "集中查看进度、成绩趋势和目标达成情况，快速识别需要关注的学员。" },
                { t: "智能练习与模考", d: "结合系统课程、机考题库与定期模考，让 AI 动态练习匹配当前水平。" },
              ].map((x, i) => (
                <Reveal key={x.t} delay={i * 70}>
                  <div className="surface-card h-full p-6">
                    <h3 className="font-display text-base font-extrabold">{x.t}</h3>
                    <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">{x.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-24 md:pb-32">
          <div className="mx-auto max-w-6xl px-5">
            <Reveal>
              <div
                className="relative overflow-hidden rounded-3xl px-8 py-14 md:px-14"
                style={{ background: "var(--gradient-deep)" }}
              >
                <div className="eyebrow" style={{ color: "var(--lilac)" }}>
                  Get Started
                </div>
                <h2
                  className="mt-3 font-display text-[clamp(1.6rem,3.4vw,2.5rem)] leading-[1.15] font-extrabold"
                  style={{ color: "#ffffff" }}
                >
                  让雅思教学、学员服务与合作经营更清晰
                </h2>
                <p className="mt-4 text-sm" style={{ color: "var(--lilac)" }}>
                  了解合作政策与平台开通方式，请联系语焉雅思客服。
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="/#cta"
                    className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-primary transition-opacity hover:opacity-90"
                  >
                    咨询客服
                  </a>
                  <a
                    href="/#cta"
                    className="rounded-xl border px-5 py-3 text-sm font-semibold"
                    style={{ borderColor: "rgba(255,255,255,0.35)", color: "#ffffff" }}
                  >
                    进入机构后台
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
