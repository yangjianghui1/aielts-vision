import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/StartCta";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowRight, Building2, GraduationCap, LineChart, Users } from "lucide-react";

const TITLE = "机构合作 · AIELTS 语焉";
const DESC = "语焉雅思面向学校、培训机构与留学服务机构提供 AI 测评、全真模考与教研数据支持，共建高效备考解决方案。";

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
    icon: LineChart,
    title: "AI 测评接入",
    desc: "将 FlexCheck AI 写作、口语评分能力嵌入贵方教学系统，学员即可获得即时四维度反馈。",
  },
  {
    icon: GraduationCap,
    title: "全真模考题库",
    desc: "基于英国文化教育协会遴选资源，提供 40+ 套完整模考与能力分析报告。",
  },
  {
    icon: Users,
    title: "学员数据看板",
    desc: "为机构管理者与教师提供班级进度、薄弱项分布与成绩提升曲线。",
  },
  {
    icon: Building2,
    title: "品牌联合运营",
    desc: "支持联合品牌落地页、专属测评入口与会员权益定制。",
  },
];

function Partners() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 md:pt-32">
        <section className="relative overflow-hidden pb-16 md:pb-24">
          <div
            className="pointer-events-none absolute -top-32 right-0 h-[520px] w-[520px] rounded-full opacity-30 blur-3xl"
            style={{ background: "var(--gradient-deep)" }}
          />
          <div className="relative mx-auto max-w-6xl px-5">
            <Reveal>
              <div className="eyebrow" style={{ color: "var(--violet)" }}>Partners</div>
              <h1 className="mt-3 max-w-2xl font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] font-extrabold text-foreground">
                与语焉一起，为更多考生提供科学备考体验
              </h1>
              <p className="mt-5 max-w-xl text-base text-muted-foreground">
                面向学校、培训机构与留学服务机构，提供 AI 测评、全真模考与教研数据支持，共建高效备考解决方案。
              </p>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                  style={{ background: "var(--gradient-brand)" }}
                >
                  预约合作咨询
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-xl border border-input bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
                >
                  返回首页
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="capability" className="border-t border-border bg-white py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-5">
            <Reveal>
              <div className="eyebrow" style={{ color: "var(--violet)" }}>Why partner</div>
              <h2 className="mt-3 font-display text-[clamp(1.5rem,4vw,2.25rem)] font-extrabold text-foreground">
                合作权益
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {BENEFITS.map((b, i) => (
                <Reveal key={b.title} delay={i * 80}>
                  <div className="rounded-2xl border border-border bg-background p-6 shadow-sm transition-shadow hover:shadow-md">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl"
                      style={{ background: "var(--gradient-brand)" }}
                    >
                      <b.icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold text-foreground">{b.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-16 md:py-24" style={{ background: "var(--navy)" }}>
          <div className="mx-auto max-w-3xl px-5 text-center">
            <Reveal>
              <div className="eyebrow" style={{ color: "var(--lilac)" }}>Contact</div>
              <h2 className="mt-3 font-display text-[clamp(1.5rem,4vw,2.25rem)] font-extrabold" style={{ color: "#ffffff" }}>
                开启合作
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base" style={{ color: "var(--lilac)" }}>
                留下机构信息与需求，语焉商务团队将在 1–2 个工作日内与您联系。
              </p>
            </Reveal>

            <Reveal delay={120}>
              <form className="mt-10 space-y-4 text-left" onSubmit={(e) => e.preventDefault()}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="联系人姓名"
                    className="rounded-xl border border-input bg-white px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                  />
                  <input
                    type="text"
                    placeholder="机构名称"
                    className="rounded-xl border border-input bg-white px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                  />
                </div>
                <input
                  type="email"
                  placeholder="工作邮箱"
                  className="w-full rounded-xl border border-input bg-white px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                />
                <textarea
                  rows={4}
                  placeholder="请简单描述合作需求或机构规模"
                  className="w-full resize-none rounded-xl border border-input bg-white px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                />
                <div className="text-center">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl px-8 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                    style={{ background: "var(--gradient-brand)" }}
                  >
                    提交合作意向
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
