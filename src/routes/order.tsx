import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/StartCta";
import { ArrowLeft, Check, Shield } from "lucide-react";

const TITLE = "订单确认 · AIELTS 语焉";
const DESC = "确认您的 IELTS Mock Test 订单信息，安全支付后即可开启全真模考。";

export const Route = createFileRoute("/order")({
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
  component: OrderPage,
});

const BENEFITS = [
  "1 套对标雅思题型的全真模考题",
  "听力 / 阅读 / 写作 / 口语全科覆盖",
  "全维度 AI 智能评分",
  "完整复盘报告与成绩追踪",
];

function OrderPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-6xl px-5 pt-24 pb-16 md:pt-32 md:pb-24">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          返回课程列表
        </Link>

        <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
          {/* 左侧商品信息 */}
          <section className="rounded-3xl border border-border bg-white p-6 md:p-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              IELTS Mock Test
            </div>
            <h1 className="mt-5 font-display text-2xl font-extrabold text-foreground md:text-3xl">
              全面升级您的学习体验
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
              1 套对标雅思题型的全真模考 + 全维度 AI 评分 + 复盘建议 + 学习报告。
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              测评时间 3 小时
            </div>

            <div className="mt-8 rounded-2xl border border-border bg-muted/30 p-5 md:p-6">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <h3 className="font-display text-lg font-bold text-foreground">核心权益包</h3>
              </div>
              <div className="mt-2 h-0.5 w-8 bg-primary/30" />
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {BENEFITS.map((b) => (
                  <div key={b} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-sm text-muted-foreground">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 右侧订单确认 */}
          <aside className="h-fit rounded-3xl border border-border bg-white p-6 md:p-8">
            <h2 className="font-display text-xl font-extrabold text-foreground">订单确认</h2>
            <p className="mt-1 text-xs text-muted-foreground">Secure Checkout</p>

            <div className="mt-6 space-y-4 rounded-2xl bg-muted/30 p-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">报名项目</span>
                <span className="font-semibold text-foreground">IELTS Mock Test</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">有效期</span>
                <span className="rounded-lg border border-border bg-white px-2 py-0.5 text-xs font-semibold text-foreground">
                  90 天
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">测评时间</span>
                <span className="rounded-lg border border-border bg-white px-2 py-0.5 text-xs font-semibold text-foreground">
                  3 小时
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">日常价</span>
                <span className="text-muted-foreground line-through">¥699</span>
              </div>
            </div>

            <div className="mt-6 flex items-end justify-between border-t border-border pt-5">
              <span className="font-display text-base font-bold text-foreground">应付总额</span>
              <div className="flex items-baseline gap-0.5">
                <span className="text-sm text-primary">¥</span>
                <span className="font-display text-4xl font-extrabold text-primary">299</span>
              </div>
            </div>

            <button
              type="button"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#07C160] px-6 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Shield className="h-4 w-4" />
              微信安全支付
            </button>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              点击购买即同意
              <a href="#" className="ml-1 text-primary hover:underline">
                《用户服务协议》
              </a>
            </p>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
