import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Info, Pause, Play, SquarePen, Star, Volume2, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Opt = { key: string; label: string };
type Q = { no: number; text: string; options: Opt[]; correct: string; feedback: string };

const PARTS = [
  { id: 1, label: "Part 1" },
  { id: 2, label: "Part 2" },
  { id: 3, label: "Part 3" },
  { id: 4, label: "Part 4" },
];

const QUESTIONS: Q[] = [
  {
    no: 1,
    text: "What is Heath's job?",
    options: [
      { key: "A", label: "Doctor" },
      { key: "B", label: "Teacher" },
      { key: "C", label: "Chemist" },
    ],
    correct: "B",
    feedback:
      "不完全对！这个人说 I left medical school and went into teacher training college to be a science teacher，所以 B - Teacher 才是正确答案。问题问的是希思目前的工作。虽然希思最初考虑当医生，甚至开始了医学院学习，但他明确表示自己离开了那里去当老师。你的答案，A - Doctor，是错误的，因为他决定不再走那条职业道路。",
  },
  {
    no: 2,
    text: "Which of the following continents did Sally NOT visit on her travels?",
    options: [
      { key: "A", label: "Europe" },
      { key: "B", label: "Africa" },
      { key: "C", label: "North America" },
    ],
    correct: "A",
    feedback:
      "答对了！Sally 提到她去过非洲和北美旅行，但说欧洲“还在清单上”，所以 A - Europe 是她没有去过的大洲。",
  },
  {
    no: 3,
    text: "What is Sally's current occupation?",
    options: [
      { key: "A", label: "Journalist" },
      { key: "B", label: "Travel writer" },
      { key: "C", label: "College lecturer" },
    ],
    correct: "A",
    feedback:
      "答对了！Sally 说她“为一家全国性报纸写专题报道”，对应 A - Journalist。她以前写过旅行文章，但那不是她现在的工作。",
  },
  {
    no: 4,
    text: "How many children do Sally and Gordon have?",
    options: [
      { key: "A", label: "None" },
      { key: "B", label: "Two" },
      { key: "C", label: "Three" },
    ],
    correct: "A",
    feedback:
      "答对了！Sally 说“还没要孩子——只养了只狗”，所以答案是 A - None。",
  },
  {
    no: 5,
    text: "When did Heath and Kate get married?",
    options: [
      { key: "A", label: "The last year of college" },
      { key: "B", label: "The year after graduation" },
    ],
    correct: "B",
    feedback:
      "Heath 说他们“毕业后的那个夏天结的婚”，所以 B - The year after graduation 是正确答案。",
  },
];

const DURATION = 193; // 03:13

function fmt(t: number) {
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function ListeningMock() {
  const [part, setPart] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState(0);
  const [openFeedback, setOpenFeedback] = useState<number | null>(1);
  const [picked, setPicked] = useState<Record<number, string>>({ 1: "A", 2: "A", 3: "A", 4: "A" });
  const [translated, setTranslated] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setPos((v) => (v >= DURATION ? 0 : v + 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [playing]);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      {/* 顶部栏 */}
      <div className="border-b border-border px-5 py-3 text-center">
        <div className="font-display text-base font-extrabold md:text-lg">Listening</div>
      </div>
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <div className="text-center sm:text-left">
          <div className="font-display text-sm font-extrabold md:text-base">Part {part}</div>
          <div className="mt-0.5 text-xs font-medium text-muted-foreground">听力作答</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs font-bold">问题</div>
            <div className="font-display text-xs font-extrabold">1 - 10</div>
          </div>
          <button className="grid h-9 w-9 place-items-center rounded-lg text-primary transition-colors hover:bg-primary/10" aria-label="记笔记">
            <SquarePen className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* AI 反馈就绪条 */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-secondary/60 px-5 py-2.5">
        <div className="flex items-center gap-2">
          <span className="rounded-md border border-border bg-card px-2 py-0.5 font-display text-xs font-extrabold text-foreground">
            FlexCheck AI
          </span>
          <span className="rounded bg-accent/90 px-1.5 py-0.5 text-[9px] font-bold text-ink">BETA</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="mr-1 hidden text-[10px] text-muted-foreground sm:block">请为此翻译评分</span>
            {[1, 2, 3, 4, 5].map((s) => (
              <button key={s} onClick={() => setRating(s)} aria-label={`评分 ${s} 星`}>
                <Star
                  className={cn(
                    "h-3.5 w-3.5 transition-colors",
                    s <= rating ? "fill-accent text-accent" : "text-muted-foreground/50 hover:text-accent",
                  )}
                />
              </button>
            ))}
          </div>
          <button
            onClick={() => setTranslated((v) => !v)}
            className="rounded-full px-4 py-1.5 text-xs font-bold text-white shadow-sm transition-transform hover:scale-[1.03]"
            style={{ background: "var(--gradient-brand)" }}
          >
            {translated ? "切换至英语" : "切换至英语"}
          </button>
        </div>
      </div>

      {/* 题目区 */}
      <div className="max-h-[440px] overflow-y-auto px-5 py-5">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="font-display text-sm font-extrabold">Questions 1 - 5</div>
          <p className="mt-1 text-xs text-muted-foreground">
            {translated ? "选择正确答案。" : "Choose the correct answer."}
          </p>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            {translated
              ? "你将听到两位老朋友偶遇时的对话。"
              : "You will hear a conversation between two old friends who meet each other by chance."}
          </p>

          {/* 音频播放器 */}
          <div className="mt-3 flex items-center gap-3 rounded-lg border border-border bg-secondary/50 px-3 py-2.5">
            <button
              onClick={() => setPlaying((v) => !v)}
              className="grid h-7 w-7 shrink-0 place-items-center text-primary transition-transform hover:scale-110"
              aria-label={playing ? "暂停" : "播放"}
            >
              {playing ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current" />}
            </button>
            <Volume2 className="h-4 w-4 shrink-0 text-magenta" />
            <button
              className="group relative h-1.5 flex-1 cursor-pointer rounded-full bg-border"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setPos(Math.round(((e.clientX - rect.left) / rect.width) * DURATION));
              }}
              aria-label="播放进度"
            >
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-primary transition-[width] duration-300"
                style={{ width: `${(pos / DURATION) * 100}%` }}
              />
            </button>
            <span className="shrink-0 font-display text-[11px] font-semibold text-muted-foreground tabular-nums">
              {fmt(pos)} / {fmt(DURATION)}
            </span>
          </div>
        </div>

        {/* 问题两列 */}
        <div className="mt-5 grid gap-x-8 gap-y-6 md:grid-cols-2">
          {QUESTIONS.map((q) => {
            const sel = picked[q.no];
            const isOpen = openFeedback === q.no;
            return (
              <div key={q.no}>
                <div className="text-sm font-semibold">
                  {q.no} {q.text}
                </div>
                <div className="relative mt-2.5 space-y-2">
                  {q.options.map((o) => {
                    const isSel = sel === o.key;
                    const isCorrect = o.key === q.correct;
                    const wrong = isSel && !isCorrect;
                    return (
                      <div key={o.key} className="flex items-center gap-2">
                        <button
                          onClick={() => setPicked((p) => ({ ...p, [q.no]: o.key }))}
                          className="flex items-center gap-2 text-left text-sm"
                        >
                          <span
                            className={cn(
                              "grid h-4 w-4 shrink-0 place-items-center rounded-full border-2 transition-colors",
                              isCorrect && sel
                                ? "border-emerald-500"
                                : wrong
                                  ? "border-red-500"
                                  : isSel
                                    ? "border-primary"
                                    : "border-border",
                            )}
                          >
                            {(isSel || (sel && isCorrect)) && (
                              <span
                                className={cn(
                                  "h-2 w-2 rounded-full",
                                  isCorrect ? "bg-emerald-500" : wrong ? "bg-red-500" : "bg-primary",
                                )}
                              />
                            )}
                          </span>
                          <span
                            className={cn(
                              isCorrect && sel && "font-semibold text-emerald-600",
                              wrong && "text-red-500 line-through decoration-red-400/60",
                            )}
                          >
                            {o.key} - {o.label}
                          </span>
                        </button>
                        {(isCorrect || wrong) && sel && (
                          <button
                            onClick={() => setOpenFeedback(isOpen ? null : q.no)}
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

                  {/* AI 反馈气泡 */}
                  {isOpen && (
                    <div className="absolute top-0 right-0 z-10 w-[min(100%,380px)] overflow-hidden rounded-xl border border-border bg-card shadow-xl">
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
                          onClick={() => setOpenFeedback(null)}
                          className="grid h-6 w-6 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                          aria-label="关闭反馈"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="max-h-44 overflow-y-auto px-3 py-2.5 text-xs leading-relaxed text-foreground">
                        {q.feedback}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
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
              <div className="mt-0.5 text-[9px] leading-none opacity-70">(10 的 10)</div>
            </button>
          ))}
          <div className="mx-1 h-8 w-px bg-border" />
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => {
            const state = n === 1 ? "wrong" : n <= 4 ? "right" : "todo";
            return (
              <button
                key={n}
                className={cn(
                  "grid h-9 w-8 place-items-center rounded-lg border font-display text-xs font-bold transition-all hover:-translate-y-0.5",
                  state === "right" && "border-emerald-500 text-emerald-600",
                  state === "wrong" && "border-red-500 text-red-500",
                  state === "todo" && "border-border text-muted-foreground hover:border-primary/40",
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
