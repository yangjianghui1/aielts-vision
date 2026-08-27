import { useEffect, useRef, useState } from "react";

const CARDS = [
  { no: "01", title: "Listening", sub: "四种口音", body: "英音、澳音、新西兰与印度英语 —— 与考试当天同源的语音材料，难度自动跟随你的正确率。" },
  { no: "02", title: "Reading", sub: "题型专项", body: "True/False/Not Given、Matching Headings、Y/N/NG，逐题型定位失分点。" },
  { no: "03", title: "Writing Task 1", sub: "图表描述", body: "折线、柱状、流程与地图题，数据描述句式库与四维评分同时返回。" },
  { no: "04", title: "Writing Task 2", sub: "议论文", body: "五类题型的论证骨架，行内改写建议直接标注在你的原文上。" },
  { no: "05", title: "Speaking Part 2", sub: "Cue Card", body: "1 分钟准备 + 2 分钟陈述全程计时，转写稿逐句标注停顿与填充词。" },
  { no: "06", title: "Mock Test", sub: "四科连考", body: "3 小时完整流程，还原机考界面与时间压力，考前至少完整跑通两次。" },
  { no: "07", title: "Review", sub: "多分段范文", body: "对照 5/6、6/7、7/8、8/9 四档答案，看清下一档到底差在哪里。" },
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
          <div className="eyebrow">Mock Test · 40 套全真模考</div>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.12] font-extrabold">
            横向走完整条雅思考试链路。
          </h2>
        </div>

        <div className="mt-10 w-full overflow-hidden">
          <div
            className="flex gap-6 px-5"
            style={{
              transform: `translateX(calc(${-progress * (CARDS.length - 1)} * (min(78vw, 24rem) + 1.5rem)))`,
              transition: "transform 120ms linear",
            }}
          >
            {CARDS.map((c) => (
              <article
                key={c.no}
                className="surface-card flex h-[22rem] w-[min(78vw,24rem)] shrink-0 flex-col overflow-hidden"
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
