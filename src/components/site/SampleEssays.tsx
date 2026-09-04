import { useState } from "react";
import { cn } from "@/lib/utils";

type EssayItem = {
  score: number;
  comments: [string, string, string, string]; // 任务完成 / 连贯衔接 / 词汇 / 语法
  essay: string[];
};

const DIM_TABS = ["任务完成度", "连贯性和衔接性", "词汇资源", "语法范围和准确性"] as const;

// —— 各分数段真实范文（同一道地铁数据图表题） ——
const ESSAY_5 = [
  "The table illustrates datas of the metro systems in the cities New York, London, Tokyo, Paris, Mexico, and Beijing. Overall, to fully understand how they function, four categories have been considered: line, total distance in miles, annual journeys undertaken, and cost of each ticket.",
  "New York City subway had the most railways, followed by Beijing and Paris metro, with 24, 19, and 16, respectively. It also dominated in miles covered, being 659 as opposed to 359 miles for Paris. However, Paris Metro fall short of London tube and Turkey. London tube, Turkey, and Mexico railway systems all have under 14 lines, covering below 300 miles.",
  "Contrally, Beijing has the annual travels flowed by Tokyo subway with 3.6 and 3.1 billion travels. New York, London, Mexico, and Paris subways all had under 2 billion journey's. Despite these differences, London single tickets are the most expensive, costing $7.30 compared to $0.23 in Mexico, the lowest of all cities.",
];

const ESSAY_6 = [
  "The data provide information on underground systems in various cities worldwide. The evidences point out that the longest and most brenched metro system is in New York City, while the outstanding number of journeys on the Bejing Subway makes it the most used.",
  "Nevertheless, the last variable the table considers regard the cost of single ticket, and in this context, the Mexico City Metro results to be the cheapest, whereas the London Tube is the most expensive among all. The New York Subway accounts for 24 lines spreading on 659 miles, almost twice the Bejing Subway at 357 miles in total length. Considering annual journeys, Asian systems are the most used, with Bejing at 3.6 billion and Tokyo at 3.1 billion journeys yearly, showing their popularity. The cost of single ticket largely varies between the peak of 7.30 US dollars in London and the cheap 0.23 US dollars in Mexico City, making a significant difference.",
];

const ESSAY_7 = [
  "The infographic provides an overview of subway systems in six countries, highlighting key differences in size, passenger numbers, and ticket prices.",
  "Overall, no clear trend exists based on geographical position. New York City has the largest metro system, with 24 lines covering 659 miles. In contrast, Beijing's system, though smaller at 19 lines and 357 miles, has nearly double the annual passengers — 3.6 billion versus 1.65 billion in NYC, showing its high demand.",
  "Paris, Tokyo, and Mexico City have similar system sizes but differ significantly in passenger numbers and ticket prices. Tokyo sees 3.1 billion annual riders, about twice that of Paris (1.5 billion) and Mexico City (1.6 billion). Ticket costs vary, with Paris at $2.30, Tokyo at $1.64, and Mexico City at just $0.23, making it the most affordable.",
  "Lastly, London has the fewest lines but the second-longest network (249 miles). However, its ticket price is the highest, at $7.30 per ride, making it expensive for commuters.",
];

const ESSAY_8 = [
  "The table provides data on metro systems in six cities, comparing their network size, passenger volume, and ticket costs.",
  "Overall, metro systems with larger networks do not necessarily have higher passenger numbers or fares. Notably, Beijing and Tokyo have the busiest systems, while London has the most expensive tickets despite a smaller network.",
  "New York has the largest metro system, with 24 lines spanning 659 miles, yet its annual ridership (1.65 billion) is significantly lower than Tokyo (3.1 billion) and Beijing (3.6 billion), despite those cities having shorter networks. London, with only 11 lines and 249 miles of track, charges $7.30 per ticket, making it the most expensive system.",
  "In contrast, Mexico City has the cheapest fare ($0.23) but still accommodates 1.6 billion annual journeys, surpassing London. Paris has the shortest network (127 miles) yet records 1.5 billion trips annually.",
  "This data suggests a loose correlation between affordability and ridership, with Asian metros handling the most passengers at lower fares, while Western systems tend to have higher costs and fewer passengers.",
];

const ESSAY_9 = [
  "The table provides a comparison of six metro systems in terms of their network size, passenger volume, and ticket costs.",
  "Overall, the New York City Subway has the largest network, while the Tokyo and Beijing subways accommodate the highest number of passengers annually. In contrast, London has the most expensive ticket fares, whereas Mexico City offers the cheapest travel option.",
  "New York's 24 lines spanning 659 miles make it the most extensive system, nearly three times the length of London's 249 miles despite the latter charging the highest fare at $7.30 per ticket. Meanwhile, the Tokyo and Beijing subways handle the greatest passenger loads, with 3.1 billion and 3.6 billion annual journeys, respectively. Notably, Beijing achieves this despite having relatively low fares at $0.45 per ride.",
  "The Mexico City Metro stands out with the lowest fare at just $0.23, yet it serves 1.6 billion passengers annually, surpassing London. Similarly, Paris has a smaller network (127 miles) but accommodates 1.5 billion journeys, charging $2.30 per ticket.",
];

const GROUPS: { band: string; items: EssayItem[] }[] = [
  {
    band: "5/6",
    items: [
      {
        score: 5,
        comments: [
          "To improve, ensure that you provide a clear overview and accurately report data. Make relevant comparisons and highlight key trends to fully address the task requirements.",
          "段落之间缺少明确衔接，信息罗列多于组织；建议使用 firstly / in contrast 等连接词分组信息。",
          "用词基础且有误用（datas、journey's）；数据描述停留在 have / has，缺少 accounts for / varies 等表达。",
          "长句控制不稳，出现 run-on 与主谓一致问题（Paris Metro fall short）；建议先写短句保证准确，再尝试复合句。",
        ],
        essay: ESSAY_5,
      },
      {
        score: 6,
        comments: [
          "Your response identifies some key features, but to improve, focus on making more detailed comparisons and covering all relevant trends.",
          "整体有分段意识，Nevertheless 等衔接词开始使用，但段内信息顺序仍可更有逻辑。",
          "出现 brenched / regard the cost 等搭配问题；能尝试 the cheapest / the most expensive 等比较结构。",
          "简单句准确率较高，但复杂句偶发结构错误；分词短语的使用值得继续打磨。",
        ],
        essay: ESSAY_6,
      },
    ],
  },
  {
    band: "6/7",
    items: [
      {
        score: 6,
        comments: [
          "Your response identifies some key features, but to improve, focus on making more detailed comparisons and covering all relevant trends.",
          "整体有分段意识，Nevertheless 等衔接词开始使用，但段内信息顺序仍可更有逻辑。",
          "出现 brenched / regard the cost 等搭配问题；能尝试 the cheapest / the most expensive 等比较结构。",
          "简单句准确率较高，但复杂句偶发结构错误；分词短语的使用值得继续打磨。",
        ],
        essay: ESSAY_6,
      },
      {
        score: 7,
        comments: [
          "Your response successfully identifies key features and makes relevant comparisons, but a more comprehensive overview of general trends would enhance your task achievement.",
          "Overall 段清晰，In contrast / Lastly 等衔接自然，信息分组合理。",
          "能使用 highlighting / annual riders 等较准确表达，搭配基本得当。",
          "复合句使用自如，仅有个别小误，不影响理解。",
        ],
        essay: ESSAY_7,
      },
    ],
  },
  {
    band: "7/8",
    items: [
      {
        score: 7,
        comments: [
          "Your response successfully identifies key features and makes relevant comparisons, but a more comprehensive overview of general trends would enhance your task achievement.",
          "Overall 段清晰，衔接词自然，信息分组合理。",
          "用词准确，能使用 less common 表达。",
          "句式多样且大多准确。",
        ],
        essay: ESSAY_7,
      },
      {
        score: 8,
        comments: [
          "You have effectively covered the key features with clear comparisons and correlations. However, some data relationships could be analyzed further for even greater depth.",
          "段落推进有清晰逻辑线，Overall 总览 + In contrast 对比，指代与衔接自然流畅。",
          "词汇范围宽，搭配地道（accommodates / ridership / correlation）。",
          "句式灵活多变，括号补充与比较结构运用娴熟，绝大多数句子零错误。",
        ],
        essay: ESSAY_8,
      },
    ],
  },
  {
    band: "8/9",
    items: [
      {
        score: 8,
        comments: [
          "You have effectively covered the key features with clear comparisons and correlations. However, some data relationships could be analyzed further for even greater depth.",
          "段落推进逻辑清晰，衔接自然。",
          "词汇范围宽，搭配地道。",
          "句式灵活，错误极少。",
        ],
        essay: ESSAY_8,
      },
      {
        score: 9,
        comments: [
          "You effectively summarize key trends and make relevant comparisons. You have ensured a deep analysis of variations in data rather than just stating differences.",
          "行文一气呵成，总览—细节—亮点层层递进，衔接手段丰富而不着痕迹。",
          "用词精准老练，学术搭配自然（stands out / accommodate / respectively）。",
          "句式完全服务于表达，数据嵌入自然，全程无可见错误。",
        ],
        essay: ESSAY_9,
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
