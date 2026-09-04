import { useState } from "react";
import { cn } from "@/lib/utils";

type EssayItem = {
  score: number;
  words: number;
  comments: [string, string, string, string]; // 任务完成 / 连贯衔接 / 词汇 / 语法
  essay: string[];
};

const DIM_TABS = ["任务完成度", "连贯性和衔接性", "词汇资源", "语法范围和准确性"] as const;

const GROUPS: { band: string; items: EssayItem[] }[] = [
  {
    band: "5/6",
    items: [
      {
        score: 5,
        words: 153,
        comments: [
          "To improve, ensure that you provide a clear overview and accurately report data. Make relevant comparisons and highlight key trends to fully address the task requirements.",
          "段落之间缺少明确衔接，信息罗列多于组织；建议使用 firstly / in contrast 等连接词分组信息。",
          "用词基础且有误用（datas、evidences）；数据描述停留在 have / has，缺少 accounts for / varies 等表达。",
          "长句控制不稳，出现 run-on 与主谓一致问题；建议先写短句保证准确，再尝试复合句。",
        ],
        essay: [
          "The table illustrates datas of the metro systems in the cities New York, London, Tokyo, Paris, Mexico, and Beijing. Overall, to fully understand how they function, four categories have been considered: line, total distance in miles, annual journeys undertaken, and cost of each ticket.",
          "New York City subway had the most railways, followed by Beijing and Paris metro, with 24, 19, and 16, respectively. It also dominated in miles covered, being 659 as opposed to 359 miles for Paris. However, Paris Metro fall short of London tube and Turkey. London tube, Turkey, and Mexico railway systems all have under 14 lines, covering below 300 miles.",
          "Contrally, Beijing has the annual travels flowed by Tokyo subway with 3.6 and 3.1 billion travels. New York, London, Mexico, and Paris subways all had under 2 billion journey's. Despite these differences, London single tickets are the most expensive, costing $7.30 compared to $0.23 in Mexico, the lowest of all cities.",
        ],
      },
      {
        score: 6,
        words: 155,
        comments: [
          "Your response identifies some key features, but to improve, focus on making more detailed comparisons and covering all relevant trends.",
          "整体有分段意识，Nevertheless 等衔接词开始使用，但段内信息顺序仍可更有逻辑。",
          "出现 brenched / regard the cost 等搭配问题；能尝试 the cheapest / the most expensive 等比较结构。",
          "简单句准确率较高，但复杂句偶发结构错误；分词短语的使用值得继续打磨。",
        ],
        essay: [
          "The data provide information on underground systems in various cities worldwide. The evidences point out that the longest and most brenched metro system is in New York City, while the outstanding number of journeys on the Bejing Subway makes it the most used.",
          "Nevertheless, the last variable the table considers regard the cost of single ticket, and in this context, the Mexico City Metro results to be the cheapest, whereas the London Tube is the most expensive among all. The New York Subway accounts for 24 lines spreading on 659 miles, almost twice the Bejing Subway at 357 miles in total length.",
          "Considering annual journeys, Asian systems are the most used, with Bejing at 3.6 billion and Tokyo at 3.1 billion journeys yearly, showing their popularity. The cost of single ticket largely varies between the peak of 7.30 US dollars in London and the cheap 0.23 US dollars in Mexixo CIty, making a significant difference.",
        ],
      },
    ],
  },
  {
    band: "6/7",
    items: [
      {
        score: 6,
        words: 155,
        comments: [
          "关键特征有所识别，但对比不够充分，趋势覆盖不全。",
          "分段意识初步形成，衔接词使用仍较机械。",
          "词汇尝试多样但有搭配错误。",
          "简单句稳定，复杂句准确性待提高。",
        ],
        essay: [
          "The data provide information on underground systems in various cities worldwide. The evidences point out that the longest and most brenched metro system is in New York City, while the outstanding number of journeys on the Bejing Subway makes it the most used.",
          "Nevertheless, the last variable the table considers regard the cost of single ticket, and in this context, the Mexico City Metro results to be the cheapest, whereas the London Tube is the most expensive among all.",
        ],
      },
      {
        score: 7,
        words: 153,
        comments: [
          "Your response successfully identifies key features and makes relevant comparisons, but a more comprehensive overview of general trends would enhance your task achievement.",
          "Overall 段清晰，In contrast / Lastly 等衔接自然，信息分组合理。",
          "能使用 highlighting / dominates / annual riders 等较准确表达，搭配基本得当。",
          "复合句使用自如，仅有个别小误，不影响理解。",
        ],
        essay: [
          "The infographic provides an overview of subway systems in six countries, highlighting key differences in size, passenger numbers, and ticket prices.",
          "Overall, no clear trend exists based on geographical position. New York City has the largest metro system, with 24 lines covering 659 miles. In contrast, Beijing's system, though smaller at 19 lines and 357 miles, has nearly double the annual passengers — 3.6 billion versus 1.65 billion in NYC, showing its high demand.",
        ],
      },
    ],
  },
  {
    band: "7/8",
    items: [
      {
        score: 7,
        words: 153,
        comments: [
          "Your response successfully identifies key features and makes relevant comparisons, but a more comprehensive overview of general trends would enhance your task achievement.",
          "Overall 段清晰，衔接词自然，信息分组合理。",
          "用词准确，能使用 less common 表达。",
          "句式多样且大多准确。",
        ],
        essay: [
          "The infographic provides an overview of subway systems in six countries, highlighting key differences in size, passenger numbers, and ticket prices.",
          "Overall, no clear trend exists based on geographical position. New York City has the largest metro system, with 24 lines covering 659 miles. In contrast, Beijing's system, though smaller at 19 lines and 357 miles, has nearly double the annual passengers — 3.6 billion versus 1.65 billion in NYC, showing its high demand.",
          "Paris, Tokyo, and Mexico City have similar system sizes but differ significantly in passenger numbers and ticket prices. Tokyo sees 3.1 billion annual riders, about twice that of Paris (1.5 billion) and Mexico City (1.6 billion). Ticket costs vary, with Paris at $2.30, Tokyo at $1.64, and Mexico City at just $0.23, making it the most affordable.",
          "Lastly, London has the fewest lines but the second-longest network (249 miles). However, its ticket price is the highest, at $7.30 per ride, making it expensive for commuters.",
        ],
      },
      {
        score: 8,
        words: 168,
        comments: [
          "信息筛选得当，总览全面且对比精准，仅个别次要数据可再取舍。",
          "段落推进有清晰逻辑线，指代与衔接自然流畅。",
          "词汇范围宽，搭配地道（dominates in / varies considerably）。",
          "句式灵活多变，绝大多数句子零错误。",
        ],
        essay: [
          "The table compares six major metro systems in terms of network size, ridership, and ticket pricing.",
          "New York dominates in scale, operating 24 lines across 659 miles, yet Beijing carries by far the heaviest traffic at 3.6 billion journeys a year — more than double New York's figure. Tokyo follows closely at 3.1 billion, while Paris and Mexico City, despite their mid-sized networks, serve around 1.5–1.6 billion passengers each.",
          "Pricing shows no correlation with size or demand: London, with the fewest lines, charges a striking $7.30 per single journey, whereas Mexico City — the most affordable — costs merely $0.23.",
        ],
      },
    ],
  },
  {
    band: "8/9",
    items: [
      {
        score: 8,
        words: 168,
        comments: [
          "信息筛选得当，总览全面且对比精准。",
          "段落推进逻辑清晰，衔接自然。",
          "词汇范围宽，搭配地道。",
          "句式灵活，错误极少。",
        ],
        essay: [
          "The table compares six major metro systems in terms of network size, ridership, and ticket pricing.",
          "New York dominates in scale, operating 24 lines across 659 miles, yet Beijing carries by far the heaviest traffic at 3.6 billion journeys a year. Pricing shows no correlation with size or demand: London charges a striking $7.30 per journey, whereas Mexico City costs merely $0.23.",
        ],
      },
      {
        score: 9,
        words: 174,
        comments: [
          "完全满足任务要求，总览凝练，关键特征与对比无一遗漏。",
          "行文一气呵成，衔接手段丰富而不着痕迹。",
          "用词精准老练，学术搭配自然（a striking inverse relationship）。",
          "句式完全服务于表达，全程无可见错误。",
        ],
        essay: [
          "The table presents data on six urban rail networks, measured by route lines, track length, annual ridership, and single-fare cost.",
          "What emerges is a striking inverse relationship between scale and affordability. New York operates the most extensive network (24 lines, 659 miles), yet it is Beijing — with a considerably smaller system — that records the heaviest usage, at 3.6 billion journeys annually, marginally ahead of Tokyo's 3.1 billion.",
          "Fares, meanwhile, vary by a factor of thirty: a single ride costs $7.30 in London, the least extensive network, against just $0.23 in Mexico City, suggesting that pricing reflects local policy rather than system size or demand.",
        ],
      },
    ],
  },
];

function EssayBlock({ item, dim }: { item: EssayItem; dim: number }) {
  const [expanded, setExpanded] = useState(false);
  const long = item.essay.length > 2;

  return (
    <div className="grid gap-4 border-t border-border/60 pt-4 first:border-0 first:pt-0 md:grid-cols-[180px_1fr]">
      {/* 左：分数 + 维度点评 */}
      <div className="border-l-[3px] border-magenta pl-3.5">
        <div className="font-display text-base font-extrabold text-magenta">
          分数段： <span className="text-xl">{item.score}</span>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.comments[dim]}</p>
      </div>
      {/* 右：范文 */}
      <div className="min-w-0">
        <div className={cn("relative", !expanded && long && "max-h-44 overflow-hidden")}>
          {item.essay.map((para, i) => (
            <p key={i} className="mb-3 text-[13px] leading-relaxed text-foreground/90 last:mb-0">
              {para}
            </p>
          ))}
          {!expanded && long && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-card to-transparent" />
          )}
        </div>
        <div className="mt-2 flex items-center justify-between">
          {long ? (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs font-bold text-primary transition-opacity hover:opacity-75"
            >
              {expanded ? "收起 ↑" : "展开全文 ↓"}
            </button>
          ) : (
            <span />
          )}
          <span className="text-xs tabular-nums text-muted-foreground">{item.words}</span>
        </div>
      </div>
    </div>
  );
}

export function SampleEssays() {
  const [group, setGroup] = useState(2); // 默认 7/8
  const [dim, setDim] = useState(0);
  const g = GROUPS[group]!;

  return (
    <div className="rounded-xl border border-border bg-card p-4 md:p-5">
      <div className="flex items-center justify-between">
        <span className="font-display text-base font-extrabold">示例答案</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-muted-foreground">
          <path d="m18 15-6-6-6 6" />
        </svg>
      </div>

      {/* 分数段切换 */}
      <div className="mt-4 flex items-center gap-2.5">
        {GROUPS.map((gr, i) => (
          <button
            key={gr.band}
            onClick={() => setGroup(i)}
            className={cn(
              "grid h-11 w-11 place-items-center rounded-full font-display text-sm font-extrabold transition-all",
              group === i
                ? "bg-magenta text-primary-foreground shadow-[0_6px_16px_-6px_var(--magenta)]"
                : "bg-border/60 text-muted-foreground hover:bg-border",
            )}
          >
            {gr.band}
          </button>
        ))}
      </div>

      {/* 评分维度 Tab */}
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 border-b border-border">
        {DIM_TABS.map((t, i) => (
          <button
            key={t}
            onClick={() => setDim(i)}
            className={cn(
              "relative pb-2 text-xs font-bold transition-colors",
              dim === i ? "text-magenta" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t}
            {dim === i && <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-magenta" />}
          </button>
        ))}
      </div>

      <div key={`${group}-${dim}`} className="mt-4 space-y-5 animate-fade-in">
        {g.items.map((item) => (
          <EssayBlock key={item.score} item={item} dim={dim} />
        ))}
      </div>
    </div>
  );
}
