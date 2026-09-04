import { Reveal } from "@/components/motion/Reveal";
import wechatQrAsset from "@/assets/wechat-qr.jpg.asset.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    tag: "成绩",
    q: "只用语焉备考，真的能上 7 分吗？",
    a: "会员学员中，持续练习 6–8 周后普遍出现 0.5–1.5 分的提升。AI 评分遵循与考官一致的四项标准：任务完成度、连贯与衔接、词汇资源、语法准确性。",
  },
  {
    tag: "口语",
    q: "AI 口语考官和真实考试一样吗？",
    a: "同样的 Part 1–3 三部分结构、同样的计时与评分标准，说完即出分，并附逐句转写与发音标注。",
  },
  {
    tag: "评分",
    q: "预估分有多准？",
    a: "完成四套完整模考后，预估分与真实成绩的偏差通常在 ±0.5 以内。",
  },
  {
    tag: "定价",
    q: "不买会员可以先试试吗？",
    a: "可以。0 元快速测评了解当前水平，¥29.9 迷你模考获得能力分析报告与结果解读，再决定是否购买会员。",
  },
  {
    tag: "Token",
    q: "Token 是什么，会员套餐内用完怎么办？",
    a: "Token 用于解锁 Advantage AI 精细化反馈。套餐内额度用尽后可单独购买充值包，20/50/100/200 四档。",
  },
  {
    tag: "题库",
    q: "题目来源是哪里？",
    a: "英国文化教育协会（British Council）遴选题库与模考资源，40 套全真模考持续更新，覆盖最新考试趋势。",
  },
  {
    tag: "合作",
    q: "语焉雅思与 GEL、BC 的关系是什么？",
    a: "英国 GEL 是一家成立 15 年的教育科技公司，GEL 是 BC 全球雅思考试唯一线上技术合作伙伴；语焉是英国文化教育协会（British Council）合作伙伴，负责 GEL 产品在中国的本土化运营、产品交付与市场落地。",
  },
];

export function Faq() {
  return (
    <section id="faq" className="border-y border-border bg-secondary/40 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <div>
            <div className="eyebrow">FAQ</div>
            <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] leading-[1.1] font-extrabold">
              报名前，大家都在问。
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              还有别的问题？加客服老师微信，真人在线答疑，领取雅思学习资料。
            </p>
            <div className="mt-5 inline-block rounded-2xl border border-border bg-card p-3 shadow-sm">
              <img
                src={wechatQrAsset.url}
                alt="语焉 AIELTS 客服微信二维码"
                className="h-36 w-36 rounded-xl object-contain"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={90}>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f) => (
              <AccordionItem key={f.q} value={f.q} className="border-border">
                <AccordionTrigger className="py-5 text-left hover:no-underline">
                  <span className="flex items-start gap-3">
                    <span className="mt-0.5 rounded-full bg-card px-2.5 py-1 text-[10px] font-bold tracking-wider text-primary">
                      {f.tag}
                    </span>
                    <span className="font-display text-base font-bold">{f.q}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
