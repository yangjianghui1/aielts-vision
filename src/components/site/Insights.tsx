import { CalendarDays, MonitorPlay, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import coverImg from "@/assets/insight-cover.jpg";

const POSTS = [
  {
    tag: "考期资讯",
    title: "2026 年 7–9 月雅思机考考期开放报名",
    date: "2026-08-18",
    author: "语焉 Kelly 老师",
    icon: CalendarDays,
  },
  {
    tag: "机考指南",
    title: "雅思机考全流程指南：从报名到出分",
    date: "2026-08-16",
    author: "语焉 Chris 老师",
    icon: MonitorPlay,
  },
  {
    tag: "备考资源",
    title: "官方备考资源与 BC 认证 AI 备考工具",
    date: "2026-08-12",
    author: "语焉 Sophie 老师",
    icon: ShieldCheck,
  },
];

export function Insights() {
  return (
    <section id="insights" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-14 md:py-20">
      <Reveal>
        <div>
          <div className="eyebrow">IELTS Insights</div>
          <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] leading-[1.1] font-extrabold">备考动态</h2>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
            紧跟考试政策变化，掌握机考流程与实用备考方法。
          </p>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <a
            href="#insights"
            className="surface-card lift-on-hover group block h-full overflow-hidden"
          >
            <img
              src={coverImg}
              alt="雅思写作备考"
              loading="lazy"
              width={1280}
              height={960}
              className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] md:h-80"
            />
            <div className="p-6 md:p-7">
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold tracking-wider text-primary">
                政策解读
              </span>
              <h3 className="mt-3 font-display text-xl font-extrabold md:text-2xl">
                中国大陆雅思全面迈入机考时代
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                纸笔考试进入倒计时：梳理关键时间点、机考优势与完整应考流程，帮助你从容完成转场。
              </p>
              <div className="mt-4 text-xs text-muted-foreground">2026-08-20 · 语焉 Iris 老师</div>
            </div>
          </a>
        </Reveal>

        <div className="flex flex-col gap-6">
          {POSTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 80} className="flex-1">
              <a
                href="#insights"
                className="surface-card lift-on-hover flex h-full items-center gap-5 p-5 md:p-6"
              >
                <span
                  className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl"
                  style={{ background: "color-mix(in oklab, var(--primary) 10%, white)" }}
                >
                  <p.icon className="h-8 w-8 text-primary" strokeWidth={1.5} />
                </span>
                <div className="min-w-0">
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold tracking-wider text-primary">
                    {p.tag}
                  </span>
                  <h3 className="mt-2 font-display text-base font-extrabold md:text-lg">{p.title}</h3>
                  <div className="mt-1.5 text-xs text-muted-foreground">
                    {p.date} · {p.author}
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
