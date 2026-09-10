import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/StartCta";
import {
  ArrowRight,
  Award,
  FileText,
  Settings,
  Share2,
  Users,
  Wallet,
  ClipboardList,
  Gift,
  Plane,
} from "lucide-react";

const TITLE = "个人中心 · AIELTS 语焉";
const DESC = "查看您的订单记录、当前权益与学习中心入口。";

export const Route = createFileRoute("/profile")({
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
  component: ProfilePage,
});

const MENU = [
  { icon: ClipboardList, label: "我的订单", active: true },
  { icon: Gift, label: "功能兑换" },
  { icon: Award, label: "成绩报告" },
  { icon: Settings, label: "账号设置" },
  { icon: Share2, label: "推广赚钱" },
  { icon: Users, label: "我的团队" },
  { icon: Wallet, label: "资产提现" },
];

const ORDERS = [
  { id: "ORD1788996980419103", product: "Mini Mock", qty: 1, amount: "¥29.9", date: "2026/9/10 07:36:20", status: "待支付", statusColor: "amber" },
  { id: "ORD1788503616322547", product: "Express Test", qty: 1, amount: "¥0", date: "2026/9/4 14:33:36", status: "已支付", statusColor: "emerald" },
  { id: "ORD1785741465836348", product: "Express Test", qty: 1, amount: "¥0", date: "2026/8/3 15:17:45", status: "已支付", statusColor: "emerald" },
  { id: "ORD178297769293219", product: "Monthly Plan", qty: 1, amount: "¥899", date: "2026/7/2 15:36:09", status: "已取消", statusColor: "slate" },
  { id: "ORD1782977370726647", product: "Mini Mock", qty: 1, amount: "¥29.9", date: "2026/7/2 15:29:30", status: "已支付", statusColor: "emerald" },
  { id: "ORD1782977026609504", product: "Monthly Plan", qty: 1, amount: "¥899", date: "2026/7/2 15:23:46", status: "已过期", statusColor: "slate" },
  { id: "ORD1782972255176115", product: "Monthly Plan", qty: 1, amount: "¥899", date: "2026/7/2 14:04:15", status: "已过期", statusColor: "slate" },
  { id: "ORD1782815134498829", product: "Mini Mock", qty: 1, amount: "¥29.9", date: "2026/6/30 18:25:34", status: "已支付", statusColor: "emerald" },
  { id: "ORD1782521035917861", product: "Mini Mock", qty: 1, amount: "¥29.9", date: "2026/6/27 08:43:56", status: "已支付", statusColor: "emerald" },
  { id: "ORD1782286563490141", product: "IELTS Mock Test", qty: 1, amount: "¥299", date: "2026/6/24 15:36:03", status: "已取消", statusColor: "slate" },
];

const STATUS_STYLES: Record<string, string> = {
  amber: "bg-amber-50 text-amber-600",
  emerald: "bg-emerald-50 text-emerald-600",
  slate: "bg-slate-100 text-slate-500",
};

function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-6xl px-5 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          {/* 左侧边栏 */}
          <aside className="space-y-4">
            {/* 教务档案 */}
            <div className="rounded-3xl p-6 text-white" style={{ background: "var(--navy)" }}>
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl font-extrabold">
                  3
                </div>
                <div>
                  <p className="text-xs" style={{ color: "var(--lilac)" }}>教务档案</p>
                  <p className="font-display text-lg font-bold">185****0313</p>
                  <p className="text-xs" style={{ color: "var(--lilac)" }}>注册于 2026/6/9</p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-sm" style={{ color: "var(--lilac)" }}>当前权益</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">普通会员</span>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-sm" style={{ color: "var(--lilac)" }}>使用状态</span>
                <span className="text-sm font-semibold">未开通</span>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-2 rounded-2xl bg-white/5 p-4 text-center">
                <div>
                  <p className="font-display text-xl font-extrabold text-accent">18</p>
                  <p className="mt-1 text-xs" style={{ color: "var(--lilac)" }}>订单</p>
                </div>
                <div>
                  <p className="font-display text-xl font-extrabold text-accent">1</p>
                  <p className="mt-1 text-xs" style={{ color: "var(--lilac)" }}>团队</p>
                </div>
                <div>
                  <p className="font-display text-xl font-extrabold text-accent">1</p>
                  <p className="mt-1 text-xs" style={{ color: "var(--lilac)" }}>佣金</p>
                </div>
              </div>
            </div>

            {/* 菜单 */}
            <nav className="rounded-3xl border border-border bg-white p-3">
              {MENU.map((m) => (
                <button
                  key={m.label}
                  type="button"
                  className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm transition-colors ${
                    m.active
                      ? "bg-primary/5 font-semibold text-primary"
                      : "text-muted-foreground hover:bg-muted/50"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <m.icon className="h-4 w-4" />
                    {m.label}
                  </span>
                  {m.active && <ArrowRight className="h-4 w-4" />}
                </button>
              ))}
            </nav>

            {/* 推荐入口 */}
            <div className="rounded-3xl border border-accent/20 bg-accent/5 p-5">
              <div className="flex items-center gap-2 font-display text-sm font-bold text-foreground">
                <Share2 className="h-4 w-4 text-accent" />
                推荐入口
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                直属好友实付奖励 9%，二级团队实付奖励 3%
              </p>
              <button
                type="button"
                className="mt-4 flex w-full items-center justify-center gap-1 rounded-xl border border-border bg-white py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted/50"
              >
                立即推广 <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </aside>

          {/* 右侧订单 */}
          <section className="rounded-3xl border border-border bg-white p-6 md:p-8">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h1 className="font-display text-2xl font-extrabold text-foreground">我的订单</h1>
                <p className="mt-1 text-sm text-muted-foreground">查看您的购买记录和当前权益</p>
              </div>
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-bright"
              >
                <Plane className="h-4 w-4" />
                前往学习中心
              </Link>
            </div>

            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[720px] caption-bottom text-sm">
                <thead>
                  <tr className="border-b text-left text-xs text-muted-foreground">
                    <th className="pb-3 font-medium">订单号</th>
                    <th className="pb-3 font-medium">产品名称</th>
                    <th className="pb-3 font-medium">数量</th>
                    <th className="pb-3 font-medium">实付金额</th>
                    <th className="pb-3 font-medium">购买时间</th>
                    <th className="pb-3 font-medium">订单状态</th>
                  </tr>
                </thead>
                <tbody>
                  {ORDERS.map((o) => (
                    <tr key={o.id} className="border-b last:border-0">
                      <td className="py-4 text-xs text-muted-foreground">{o.id}</td>
                      <td className="py-4 text-sm font-medium text-foreground">{o.product}</td>
                      <td className="py-4 text-sm text-muted-foreground">{o.qty}</td>
                      <td className="py-4 text-sm font-semibold text-primary">{o.amount}</td>
                      <td className="py-4 text-xs text-muted-foreground">{o.date}</td>
                      <td className="py-4">
                        <span
                          className={`inline-block rounded-lg px-2.5 py-1 text-xs font-semibold ${
                            STATUS_STYLES[o.statusColor]
                          }`}
                        >
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
