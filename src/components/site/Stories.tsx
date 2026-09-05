import { Marquee } from "./Marquee";
import { Reveal } from "@/components/motion/Reveal";

type Story = { name: string; meta: string; quote: string; gain: string };

const ROW_A: Story[] = [
  { name: "林*颐", meta: "上海 · 曼彻斯特大学", quote: "写作一直卡 6，AI 反馈把逻辑断层和替换词一次性标出来，第一次看清 7 分作文怎么写。", gain: "6.0 → 7.5" },
  { name: "陈*", meta: "成都 · 加拿大技术移民", quote: "口语 Part 2 全程计时加转写，填充词多到自己都吓一跳，两周就改过来了。", gain: "6.5 → 7.5" },
  { name: "赵*宁", meta: "北京 · 帝国理工硕士", quote: "听力解析直接定位到 Section 3 错题的原文句，反复精听后瓶颈终于破了。", gain: "7.0 → 8.0" },
  { name: "黄*树", meta: "广州 · NHS 护理注册", quote: "全职工作只能晚上练，AI 评分报告帮我锁定薄弱题型，每次 30 分钟都有明确目标。", gain: "5.5 → 7.0" },
];

const ROW_B: Story[] = [
  { name: "苏*", meta: "杭州 · 墨尔本大学", quote: "模考界面和真实机考几乎一样，考试当天完全没有陌生感。", gain: "6.5 → 8.0" },
  { name: "何*远", meta: "武汉 · 德国工程硕士", quote: "写作范文按分数段拆解，6.5 和 7.5 的差距一目了然，替换词表直接抄进模板。", gain: "6.5 → 7.5" },
  { name: "毕*", meta: "南京 · 英国博士", quote: "模考预估分和实际只差 0.5，考前心里有底这件事比什么都重要。", gain: "7.0 → 8.5" },
  { name: "郑*笛", meta: "西安 · 药剂师注册", quote: "三周备考，AI 考官抓出的语法小错是线下老师从没提过的。", gain: "6.0 → 7.5" },
];

function Card({ s }: { s: Story }) {
  return (
    <div className="mr-5 w-[22rem] shrink-0 rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center gap-3">
        <span
          className="grid h-10 w-10 place-items-center rounded-full font-display text-sm font-bold text-primary-foreground"
          style={{ background: "var(--gradient-plum)" }}
        >
          {s.name.slice(0, 1)}
        </span>
        <div>
          <div className="font-display text-sm font-bold">{s.name}</div>
          <div className="text-xs text-muted-foreground">{s.meta}</div>
        </div>
        <span className="ml-auto rounded-full bg-accent/15 px-2.5 py-1 font-display text-xs font-bold">
          {s.gain}
        </span>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">「{s.quote}」</p>
    </div>
  );
}

export function Stories() {
  return (
    <section id="stories" className="overflow-hidden py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="eyebrow">Stories</div>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] font-extrabold">
            43 万中国考生的提分现场
          </h2>
        </Reveal>
      </div>

      <div className="mt-10 space-y-5">
        <Marquee items={ROW_A.map((s) => <Card key={s.name} s={s} />)} />
        <Marquee reverse items={ROW_B.map((s) => <Card key={s.name} s={s} />)} />
      </div>
    </section>
  );
}
