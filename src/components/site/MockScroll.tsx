import { useEffect, useRef, useState } from "react";

const CARDS = [
  { no: "01", title: "摸底定位", sub: "全真模考摸底，定位短板", body: "完成整套仿真模考，输出四科分项数据，识别薄弱题型、分数缺口，找准备考起点。" },
  { no: "02", title: "专项训练", sub: "分模块专项针对性练习", body: "听力 / 阅读 / 写作 / 口语分题型拆解训练，针对错题、失分点定向刷题，打磨答题手感。" },
  { no: "03", title: "知识补全", sub: "知识点课程学习，补齐能力", body: "学习题型方法论、审题逻辑、高分表达，补齐词汇语法、答题框架等底层知识。" },
  { no: "04", title: "模考校验", sub: "强化全真模考，验证提升效果", body: "完整走完整套雅思考试链路，复刻真实考试计时环境，检验学习成果，训练时间分配。" },
  { no: "05", title: "复盘迭代", sub: "错题深度复盘，闭环迭代", body: "依托答题反馈解析，消化错题，修正知识漏洞，回到专项训练持续优化，循环提分。" },
];

export function MockScroll() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      setProgress(Math.min(Math.max(-rect.top / total, 0), 1));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="mock" ref={wrapRef} className="relative h-[420vh] bg-secondary/40">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-5">
          <div className="eyebrow">Learning Loop · 五步提分闭环</div>
          <h2 className="mt-3 max-w-3xl font-display text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.12] font-extrabold">
            5 步闭环备考，打通雅思完整提分路径
          </h2>
        </div>

        <div className="mt-10 w-full overflow-visible">
          <div
            className="flex gap-6 px-5"
            style={{
              transform: `translateX(calc(${-progress * (CARDS.length - 1)} * (min(78vw, 24rem) + 1.5rem)))`,
              transition: "transform 120ms linear",
              width: "max-content",
            }}
          >
            {CARDS.map((c) => (
              <article
                key={c.no}
                className="surface-card lift-on-hover flex h-[22rem] w-[min(78vw,24rem)] shrink-0 flex-col overflow-hidden"
              >
                <div
                  className="flex h-28 items-end justify-between p-5"
                  style={{ background: "var(--gradient-deep)" }}
                >
                  <span className="font-display text-3xl font-extrabold text-primary-foreground/90">
                    {c.no}
                  </span>
                  <span className="rounded-full bg-background/85 px-2.5 py-1 text-[10px] font-bold tracking-wider">
                    {c.sub}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-bold">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                  <span className="mt-auto text-xs text-muted-foreground">
                    模块 {c.no} / 0{CARDS.length}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-10 w-full max-w-6xl px-5">
          <div className="h-0.5 w-full overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full"
              style={{ width: `${progress * 100}%`, background: "var(--gradient-brand)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
