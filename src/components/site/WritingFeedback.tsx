import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const RING_R = 44;
const RING_C = 2 * Math.PI * RING_R;

type Section = {
  title: string;
  score: string;
  overall?: string;
  strengths?: string;
  weaknesses?: string;
  errors?: string;
  advice?: string;
  feedback?: string;
};

const SECTIONS: Section[] = [
  {
    title: "整体评价",
    score: "9.0",
    overall:
      "该回应完全满足任务要求，并在所有四项标准中展现出很高的熟练度。它清晰准确地概述了表格的主要特征，对各城市进行了相关比较，并用具体数据支持了总览。该回应组织良好且连贯，段落清晰，思路衔接逻辑分明。词汇丰富而准确，语法准确且多样。总体而言，该回应是雅思 9 分范文的一个出色示例。",
  },
  {
    title: "任务完成度",
    score: "9.0",
    strengths:
      "该回答清晰且准确地概述了表格的主要特征，包括最大的地下系统、最繁忙的系统，以及最贵和最便宜的票价。它涵盖了所有关键特征，并对各城市之间进行了相关比较。",
    weaknesses: "未注明。",
    errors: "未注明。",
    advice: "无需，因为响应已完全满足任务要求。",
    feedback:
      "该回应有效地总结了表格的主要特征，并对城市之间进行了相关比较。它提供了清晰的概述，并用表格中的具体数据加以支持。",
  },
  {
    title: "连贯性和衔接性",
    score: "9.0",
    strengths:
      "段落组织清晰，先总览后细节，比较关系自然推进；衔接词使用准确而不机械。",
    weaknesses: "未注明。",
    errors: "未注明。",
    advice: "可继续保持「总览 → 分组比较 → 细节数据」的段落推进方式。",
    feedback: "全文思路衔接逻辑分明，读者无需费力即可跟上比较线索。",
  },
  {
    title: "词汇资源",
    score: "9.0",
    strengths:
      "用词丰富而准确，同义替换自然，如 rank first / the most extensive / the priciest 等表达灵活多样。",
    weaknesses: "未注明。",
    errors: "未注明。",
    advice: "无需。",
    feedback: "词汇选择精准地道，搭配自然，展现出很高的词汇熟练度。",
  },
  {
    title: "语法范围和准确性",
    score: "9.0",
    strengths: "句式多样，比较级、被动语态与复杂从句使用准确，全文几乎无语法错误。",
    weaknesses: "未注明。",
    errors: "未注明。",
    advice: "无需。",
    feedback: "语法结构丰富且控制得当，准确性与复杂度兼具。",
  },
];

export function WritingFeedback() {
  const [openQ, setOpenQ] = useState(false);
  const [openIdx, setOpenIdx] = useState<number | null>(1);
  const [perfOpen, setPerfOpen] = useState(true);

  return (
    <div className="space-y-3 text-left">
      {/* 顶部分数区 */}
      <div className="rounded-2xl border border-border bg-secondary/50 p-5">
        <div className="flex flex-wrap items-center gap-5">
          <div>
            <div className="text-sm font-bold text-ink">FlexCheck AI 预测分数</div>
            <div className="mt-1 font-display text-sm text-muted-foreground">
              目标：<span className="ml-1 text-2xl font-extrabold text-ink">6.5</span>
            </div>
          </div>
          {/* 分数环 */}
          <div className="relative mx-auto h-24 w-24">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
              <circle cx="50" cy="50" r={RING_R} fill="none" stroke="var(--border)" strokeWidth="9" />
              <circle
                cx="50"
                cy="50"
                r={RING_R}
                fill="none"
                stroke="var(--primary)"
                strokeWidth="9"
                strokeLinecap="round"
                strokeDasharray={RING_C}
                strokeDashoffset={RING_C * (1 - 9 / 9)}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[10px] font-semibold text-muted-foreground">您的分数：</span>
              <span className="font-display text-2xl font-extrabold text-ink">9</span>
            </div>
          </div>
          {/* 四维分数 */}
          <ul className="ml-auto space-y-1.5">
            {["任务完成度", "连贯性和衔接性", "词汇资源", "语法范围和准确性"].map((l) => (
              <li key={l} className="flex items-baseline gap-2 text-sm">
                <span className="font-display font-extrabold text-ink">9.0</span>
                <span className="text-ink/80">{l}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 问题手风琴 */}
      <div className="rounded-2xl border border-border bg-card">
        <button
          type="button"
          onClick={() => setOpenQ((v) => !v)}
          className="flex w-full items-center justify-between px-5 py-4"
        >
          <span className="text-base font-extrabold text-ink">问题</span>
          <ChevronDown className={cn("h-5 w-5 text-ink transition-transform", openQ && "rotate-180")} />
        </button>
        {openQ && (
          <p className="border-t border-border px-5 py-4 text-sm leading-relaxed text-muted-foreground">
            The table below gives information about the underground railway systems in six cities.
            Summarise the information by selecting and reporting the main features, and make
            comparisons where relevant.
          </p>
        )}
      </div>

      {/* 您的表现 */}
      <div className="rounded-2xl border border-border bg-card">
        <button
          type="button"
          onClick={() => setPerfOpen((v) => !v)}
          className="flex w-full items-center justify-between px-5 py-4"
        >
          <span className="text-base font-extrabold text-ink">您的表现</span>
          <ChevronDown className={cn("h-5 w-5 text-ink transition-transform", perfOpen && "rotate-180")} />
        </button>

        {perfOpen && (
          <div className="border-t border-border">
            {SECTIONS.map((s, i) => {
              const open = openIdx === i;
              return (
                <div key={s.title} className={cn(i > 0 && "border-t border-border")}>
                  <button
                    type="button"
                    onClick={() => setOpenIdx(open ? null : i)}
                    className="flex w-full items-center justify-between px-5 py-4"
                  >
                    <span className="text-base font-extrabold text-primary">{s.title}</span>
                    <span className="flex items-center gap-2">
                      <span className="text-sm font-bold text-ink">得分：</span>
                      <span className="font-display text-xl font-extrabold text-ink">{s.score}</span>
                      {s.overall === undefined && (
                        <ChevronDown
                          className={cn("h-4 w-4 text-primary/50 transition-transform", open && "rotate-180")}
                        />
                      )}
                    </span>
                  </button>

                  {open && (
                    <div className="space-y-4 px-5 pb-5 text-sm leading-relaxed">
                      {s.overall !== undefined ? (
                        <div>
                          <div className="mb-1 font-bold text-ink">反馈：</div>
                          <p className="text-muted-foreground">{s.overall}</p>
                        </div>
                      ) : (
                        <>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                              <div className="mb-1 font-bold text-ink">优势：</div>
                              <p className="text-muted-foreground">{s.strengths}</p>
                            </div>
                            <div>
                              <div className="mb-1 font-bold text-ink">弱点：</div>
                              <p className="text-muted-foreground">{s.weaknesses}</p>
                            </div>
                          </div>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                              <div className="mb-1 font-bold text-ink">错误：</div>
                              <p className="text-muted-foreground">{s.errors}</p>
                            </div>
                            <div>
                              <div className="mb-1 font-bold text-ink">改进建议：</div>
                              <p className="text-muted-foreground">{s.advice}</p>
                            </div>
                          </div>
                          <div>
                            <div className="mb-1 font-bold text-ink">反馈：</div>
                            <p className="text-muted-foreground">{s.feedback}</p>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
