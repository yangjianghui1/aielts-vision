import { useState } from "react";
import { ChevronLeft, ChevronRight, Info, SquarePen, X } from "lucide-react";
import { cn } from "@/lib/utils";

const PARTS = [
  { id: 1, label: "Part 1", count: "(13 的 13)" },
  { id: 2, label: "Part 2", count: "(6 的 13)" },
  { id: 3, label: "Part 3", count: "(7 的 14)" },
];

const PASSAGE = [
  "The sixth, seventh and eighth rules related to the plot. The film had to be set in the here and now, and in the place in which the filming occurred. Genre movies were unacceptable, so the film could not be horror or fantasy, for example, and had to be realistic. Finally, the films were not allowed to contain superficial action such as murders. These rules meant that the films were concerned with everyday aspects of life such as familial relationships, friendships and so on.",
  "The ninth rule dictated only the use of the standard Academy 35mm format. The final rule stated that the director must not be credited. This most likely stemmed from the prevalence of high-budget films at the time, in which the popularity of the directors and actors alike was considered an important factor in choosing to go and see a film. The other aim of the final rule was to stop directors from showcasing their own personal tastes within their films, but instead encouraging them to simply exhibit the truth about the characters and the story.",
  "With these rules in mind, the two directors each went on to make a film following the rules of the manifesto. The first film to be made in accordance to the vow of chastity was Vinterberg's Festen (1998). The film tells the story of a family gathering celebrating the head of the family's sixtieth birthday. Vinterberg in fact shot the film on a digital video camera and proceeded to blow it up to fit the 35mm gauge, giving the film a very grainy effect.",
  "The second Dogme 95 film made was Lars Von Trier's The Idiots (1998). It portrays a group of adults who are seeking a way to display their 'inner idiots'. Although he generally complied with the rules, Von Trier admitted to having interfered with the location by moving candles around to achieve the desired lighting.",
  "Following the creation of Festen and Idiots, further Danish directors joined the movement, forming the so-called 'Dogme Brethren'. Filmmakers from all over the world have since attempted to follow the vow of chastity while creating Dogme 95 films, many finding it an effective way to approach making low-budget films.",
];

const TFNG = ["TRUE", "FALSE", "NOT GIVEN"] as const;

const Q9_OPTIONS = [
  { key: "A", label: "… put cameras on their shoulders." },
  { key: "B", label: "… be avoided." },
  { key: "C", label: "… prevent them from imposing their own style on a film." },
  { key: "D", label: "… use professional musicians on the film soundtrack." },
  { key: "E", label: "… use a maximum of one lamp when filming." },
  { key: "F", label: "… alter anything in the location they had chosen to shoot the film." },
  { key: "G", label: "… tell the actors how to act." },
];

const FEEDBACK_8 =
  "不太对！第十段指出创始人 terminated the movement in that year as they felt the manifesto was resulting in formulaic films。这表明结束这场运动的原因与其艺术成果有关，而不是对核心理念或原则的个人失望。因此，FALSE 是正确答案。你的答案 TRUE 是错误的，因为 “disenchanted” 意味着信念或热情的丧失，而这并不是文本所描述的停止这场运动的原因。";

const FEEDBACK_9 =
  "B 不正确！原文中 Von Trier 承认 moved candles around to achieve the desired lighting，即对拍摄地点做了改动，而规则禁止的正是 F - 对选定的拍摄地点做任何改动。F 才是正确答案。";

function Radio({
  checked,
  tone,
  onClick,
}: {
  checked: boolean;
  tone: "right" | "wrong" | "plain";
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "grid h-4 w-4 shrink-0 place-items-center rounded-full border-2 transition-colors",
        tone === "right" && "border-emerald-500",
        tone === "wrong" && "border-red-500",
        tone === "plain" && (checked ? "border-primary" : "border-border hover:border-primary/50"),
      )}
      aria-label="选择"
    >
      {checked && (
        <span
          className={cn(
            "h-2 w-2 rounded-full",
            tone === "right" ? "bg-emerald-500" : tone === "wrong" ? "bg-red-500" : "bg-primary",
          )}
        />
      )}
    </button>
  );
}

function FeedbackBubble({ text, onClose }: { text: string; onClose: () => void }) {
  return (
    <div className="absolute top-6 right-0 z-20 w-[min(100%,400px)] overflow-hidden rounded-xl border border-border bg-card shadow-xl">
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span
            className="rounded-md px-2 py-0.5 text-[10px] font-bold text-white"
            style={{ background: "var(--gradient-brand)" }}
          >
            AI 反馈
          </span>
          <span className="text-[10px] text-muted-foreground">反馈</span>
        </div>
        <button
          onClick={onClose}
          className="grid h-6 w-6 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="关闭反馈"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
      <p className="max-h-48 overflow-y-auto px-3 py-2.5 text-xs leading-relaxed">{text}</p>
    </div>
  );
}

export function ReadingAnalysis() {
  const [part, setPart] = useState(1);
  const [openFeedback, setOpenFeedback] = useState<number | null>(8);
  const [pick8, setPick8] = useState<string>("TRUE");
  const [pick9, setPick9] = useState<string>("B");

  const passage = PASSAGE_EN;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      {/* 顶部栏 */}
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <div className="text-center sm:text-left">
          <div className="font-display text-sm font-extrabold md:text-base">Part {part}</div>
          <div className="mt-0.5 text-xs font-medium text-muted-foreground">阅读文本并回答问题</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs font-bold">问题</div>
            <div className="font-display text-xs font-extrabold">1 - 13</div>
          </div>
          <button className="grid h-9 w-9 place-items-center rounded-lg text-primary transition-colors hover:bg-primary/10" aria-label="记笔记">
            <SquarePen className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* 双栏内容 */}
      <div className="grid gap-4 px-5 py-5 lg:grid-cols-2">
        {/* 左：文章 */}
        <div className="max-h-[420px] space-y-4 overflow-y-auto rounded-xl border border-border bg-card p-5">
          <div className="font-display text-sm font-extrabold tracking-wide">DOGME 95</div>
          {passage.map((p, i) => (
            <p key={i} className="text-[13px] leading-relaxed text-foreground/85">
              {p}
            </p>
          ))}
        </div>

        {/* 右：题目 */}
        <div className="max-h-[420px] space-y-7 overflow-y-auto rounded-xl border border-border bg-card p-5">
          {/* Q8 TFNG */}
          <div className="relative">
            <div className="text-sm font-semibold">
              8 The founders of the movement eventually became disenchanted with it.
            </div>
            <div className="mt-3 space-y-2.5">
              {TFNG.map((o) => {
                const isSel = pick8 === o;
                const isCorrect = o === "FALSE";
                const wrong = isSel && !isCorrect;
                const tone = isCorrect && pick8 ? "right" : wrong ? "wrong" : "plain";
                return (
                  <div key={o} className="flex items-center gap-2">
                    <Radio checked={isSel || (pick8 !== null && isCorrect)} tone={tone} onClick={() => setPick8(o)} />
                    <span
                      className={cn(
                        "text-sm",
                        isCorrect && "font-semibold text-emerald-600",
                        wrong && "text-red-500 line-through decoration-red-400/60",
                      )}
                    >
                      {o}
                    </span>
                    {(isCorrect || wrong) && (
                      <button
                        onClick={() => setOpenFeedback(openFeedback === 8 ? null : 8)}
                        className={cn(
                          "grid h-4 w-4 place-items-center rounded-full text-white transition-transform hover:scale-110",
                          isCorrect ? "bg-primary" : "bg-muted-foreground/70",
                        )}
                        aria-label="查看 AI 反馈"
                      >
                        <Info className="h-2.5 w-2.5" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
            {openFeedback === 8 && <FeedbackBubble text={FEEDBACK_8} onClose={() => setOpenFeedback(null)} />}
          </div>

          {/* Q9 多选一 */}
          <div className="relative">
            <div className="text-sm font-semibold">9 The vow of chastity did not allow directors to …</div>
            <div className="mt-3 space-y-2.5">
              {Q9_OPTIONS.map((o) => {
                const isSel = pick9 === o.key;
                const isCorrect = o.key === "F";
                const wrong = isSel && !isCorrect;
                const tone = isCorrect ? "right" : wrong ? "wrong" : "plain";
                return (
                  <div key={o.key} className="flex items-center gap-2">
                    <Radio checked={isSel || isCorrect} tone={tone} onClick={() => setPick9(o.key)} />
                    <span
                      className={cn(
                        "text-sm",
                        isCorrect && "font-semibold text-emerald-600",
                        wrong && "text-red-500 line-through decoration-red-400/60",
                      )}
                    >
                      {o.key} - {o.label}
                    </span>
                    {(isCorrect || wrong) && (
                      <button
                        onClick={() => setOpenFeedback(openFeedback === 9 ? null : 9)}
                        className={cn(
                          "grid h-4 w-4 place-items-center rounded-full text-white transition-transform hover:scale-110",
                          isCorrect ? "bg-primary" : "bg-muted-foreground/70",
                        )}
                        aria-label="查看 AI 反馈"
                      >
                        <Info className="h-2.5 w-2.5" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
            {openFeedback === 9 && <FeedbackBubble text={FEEDBACK_9} onClose={() => setOpenFeedback(null)} />}
          </div>
        </div>
      </div>

      {/* 底部导航 */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-card px-4 py-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {PARTS.map((p) => (
            <button
              key={p.id}
              onClick={() => setPart(p.id)}
              className={cn(
                "rounded-lg border px-2.5 py-1.5 text-center transition-all",
                part === p.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-transparent bg-secondary text-muted-foreground hover:bg-secondary/70",
              )}
            >
              <div className="font-display text-[11px] font-extrabold leading-none">{p.label}</div>
              <div className="mt-0.5 text-[9px] leading-none opacity-70">{p.count}</div>
            </button>
          ))}
          <div className="mx-1 h-8 w-px bg-border" />
          {Array.from({ length: 13 }, (_, i) => i + 1).map((n) => {
            const state = [3, 5, 8, 10, 11].includes(n) ? "wrong" : "right";
            return (
              <button
                key={n}
                className={cn(
                  "grid h-9 w-8 place-items-center rounded-lg border font-display text-xs font-bold transition-all hover:-translate-y-0.5",
                  state === "right"
                    ? "border-emerald-500 text-emerald-600"
                    : "border-red-500 text-red-500",
                )}
              >
                {n}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-lg border border-border bg-card px-6 py-2 text-sm font-semibold transition-colors hover:bg-secondary">
            Close
          </button>
          <button className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-secondary" aria-label="上一页">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="grid h-9 w-9 place-items-center rounded-lg bg-navy text-white transition-transform hover:scale-105" aria-label="下一页">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
