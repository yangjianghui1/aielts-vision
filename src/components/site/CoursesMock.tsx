import { useMemo, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, Clock, Maximize2, Pause, Play, Search, Volume2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Course = {
  id: string;
  title: string;
  desc: string;
  cat: string;
  dur: "10-20" | "30-40" | "45-60";
  time: string;
  iconBg: string;
  icon: string;
};

const CATS = [
  { id: "all", label: "全部", count: 212 },
  { id: "writing", label: "写作", count: 59 },
  { id: "speaking", label: "口语", count: 25 },
  { id: "listening", label: "听力", count: 20 },
  { id: "reading", label: "阅读", count: 24 },
  { id: "grammar", label: "语法", count: 24 },
];

const DURS = [
  { id: "all", label: "全部时长", count: 212 },
  { id: "10-20", label: "10-20分钟", count: 48 },
  { id: "30-40", label: "30-40分钟", count: 36 },
  { id: "45-60", label: "45-60分钟", count: 128 },
] as const;

const COURSES: Course[] = [
  {
    id: "c1",
    title: "流利度、连贯性和发音",
    desc: "了解口语测试中四项评分标准中的两项",
    cat: "speaking",
    dur: "45-60",
    time: "4:30下午 - 5:15下午",
    iconBg: "bg-accent/25",
    icon: "🗣",
  },
  {
    id: "c2",
    title: "第1部分听力",
    desc: "了解听力第一部分和填写表格",
    cat: "listening",
    dur: "45-60",
    time: "10:30下午 - 11:15下午",
    iconBg: "bg-accent/20",
    icon: "🎧",
  },
  {
    id: "c3",
    title: "语法：连词（高级）",
    desc: "学习如何使用连词连接句子的各个部分（从句）",
    cat: "grammar",
    dur: "10-20",
    time: "11:30下午 - 11:50下午",
    iconBg: "bg-magenta/15",
    icon: "A",
  },
];

const QUIZ = [
  {
    q: "What part of speech is the word 'always'?",
    options: ["verb", "noun", "adverb", "adjective"],
    answer: 2,
  },
  {
    q: "Which sentence uses the mid-position adverb correctly?",
    options: [
      "I go rarely for a walk in the park.",
      "I rarely go for a walk in the park.",
      "Rarely I go for a walk always.",
      "I go for a walk rarely in the park usually.",
    ],
    answer: 1,
  },
  {
    q: "'Sometimes I read before bed.' — Where is the adverb?",
    options: ["end position", "mid-position", "front position", "no adverb"],
    answer: 2,
  },
];

export function CoursesMock() {
  const [cat, setCat] = useState("all");
  const [dur, setDur] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [joined, setJoined] = useState<Record<string, boolean>>({});
  const [playing, setPlaying] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);

  const quiz = QUIZ[qIdx] ?? QUIZ[0]!;
  const goQuiz = (d: number) => {
    setQIdx((i) => (i + d + QUIZ.length) % QUIZ.length);
    setPicked(null);
  };

  const list = useMemo(
    () =>
      COURSES.filter(
        (c) =>
          (cat === "all" || c.cat === cat) &&
          (dur === "all" || c.dur === dur) &&
          (!query || c.title.includes(query) || c.desc.includes(query)),
      ),
    [cat, dur, query],
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-secondary/40 text-[13px]">
      {/* 顶部：搜索 */}
      <div className="border-b border-border bg-card px-4 py-2.5 md:px-5">
        <div className="flex items-center gap-2 rounded-full border border-border bg-secondary/70 px-3.5 py-1.5">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索课程…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
        </div>
      </div>

      {/* 筛选 */}
      <div className="space-y-2 border-b border-border bg-card px-4 py-2.5 md:px-5">
        <div className="flex items-start gap-2.5">
          <span className="mt-1 w-7 shrink-0 text-[11px] font-semibold text-muted-foreground">类别：</span>
          <div className="flex flex-wrap gap-1.5">
            {CATS.map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={cn(
                  "rounded-full border px-2.5 py-1 text-[11px] font-medium transition-all",
                  cat === c.id
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-card hover:border-primary/40 hover:text-primary",
                )}
              >
                {c.label} <span className="opacity-70">{c.count}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <span className="mt-1 w-7 shrink-0 text-[11px] font-semibold text-muted-foreground">时长：</span>
          <div className="flex flex-wrap gap-1.5">
            {DURS.map((d) => (
              <button
                key={d.id}
                onClick={() => setDur(d.id)}
                className={cn(
                  "rounded-full border px-2.5 py-1 text-[11px] font-medium transition-all",
                  dur === d.id
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-card hover:border-primary/40 hover:text-primary",
                )}
              >
                {d.label} <span className="opacity-70">{d.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 今日课程 */}
      <div className="px-4 py-3 md:px-5">
        <div className="mb-2 flex items-baseline justify-between">
          <span className="font-display text-base font-extrabold">今天</span>
          <span className="text-[11px] text-muted-foreground">9 月 4 日</span>
        </div>

        <div className="space-y-2">
          {list.map((c) => {
            const isJoined = !!joined[c.id];
            return (
              <div
                key={c.id}
                className="flex flex-col gap-3 rounded-xl border border-border bg-card p-3 transition-shadow hover:shadow-md sm:flex-row sm:items-center"
              >
                <div className="flex min-w-0 flex-1 items-start gap-2.5">
                  <span
                    className={cn(
                      "grid h-9 w-9 shrink-0 place-items-center rounded-full font-display text-xs font-bold",
                      c.iconBg,
                    )}
                  >
                    {c.icon}
                  </span>
                  <div className="min-w-0">
                    <div className="truncate font-display text-[13px] font-bold md:text-sm">{c.title}</div>
                    <div className="mt-0 line-clamp-1 text-[11px] text-muted-foreground">{c.desc}</div>
                    <div className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {c.time}
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() => setJoined((s) => ({ ...s, [c.id]: !s[c.id] }))}
                    className={cn(
                      "min-w-20 flex-1 rounded-full px-4 py-2 text-xs font-semibold transition-all sm:flex-none",
                      isJoined
                        ? "bg-primary/10 text-primary"
                        : "bg-foreground text-background hover:opacity-85",
                    )}
                  >
                    {isJoined ? "已注册 ✓" : "注册"}
                  </button>
                  <button className="flex min-w-20 flex-1 items-center justify-center gap-1 rounded-full border border-border px-4 py-2 text-xs font-semibold transition-colors hover:border-primary/40 hover:text-primary sm:flex-none">
                    <Play className="h-3 w-3" />
                    观看回放
                  </button>
                </div>
              </div>
            );
          })}
          {list.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border py-8 text-center text-xs text-muted-foreground">
              没有符合条件的课程，换个筛选试试
            </div>
          )}
        </div>
      </div>

      {/* 外教直播课堂 */}
      <div className="border-t border-border bg-card px-4 py-4 md:px-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-display text-base font-extrabold">直播课堂</span>
            <span className="text-[11px] text-muted-foreground">语法：副词的三个位置</span>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-magenta/10 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-magenta">
            <span className="breathe h-1.5 w-1.5 rounded-full bg-magenta" />
            LIVE 直播中
          </span>
        </div>

        {/* 播放器 */}
        <div className="overflow-hidden rounded-xl bg-black text-white">
          <div className="relative aspect-[16/7] w-full bg-[#0d0d1f]">
            {/* 课件 */}
            <div className="absolute inset-y-0 left-0 flex w-[72%] flex-col justify-center gap-1.5 bg-white p-4 text-foreground md:gap-2 md:p-6">
              <div className="font-display text-sm font-extrabold text-primary md:text-base">Three adverb positions</div>
              <p className="text-[11px] text-muted-foreground md:text-xs">There are three positions for adverbs:</p>
              <ul className="space-y-1 text-[10px] leading-snug md:space-y-1.5 md:text-xs">
                <li>– The <b>front position</b> at the beginning of a clause:
                  <span className="block pl-3 italic text-muted-foreground">1) <b className="not-italic text-foreground underline decoration-magenta decoration-2 underline-offset-2">Sometimes</b> I go for a walk in the park.</span>
                </li>
                <li>– The <b>mid-position</b> next to the main verb:
                  <span className="block pl-3 italic text-muted-foreground">2) I <b className="not-italic text-foreground underline decoration-magenta decoration-2 underline-offset-2">rarely</b> go for a walk in the park.</span>
                </li>
                <li className="hidden md:block">– And the <b>end position</b> at the end of a clause:
                  <span className="block pl-3 italic text-muted-foreground">3) I don't go for a walk in the park <b className="not-italic text-foreground underline decoration-magenta decoration-2 underline-offset-2">often</b>.</span>
                </li>
              </ul>
            </div>
            {/* 外教画中画 */}
            <div className="absolute top-2.5 right-2.5 flex h-14 w-20 flex-col items-center justify-end overflow-hidden rounded-lg border border-white/20 md:h-20 md:w-28"
              style={{ background: "linear-gradient(160deg,#5000ff 0%,#dc3dbe 70%,#ffb500 130%)" }}
            >
              <div className="mb-0.5 grid h-7 w-7 place-items-center rounded-full bg-white/25 text-sm md:h-10 md:w-10 md:text-xl">👨‍🏫</div>
              <span className="w-full bg-black/50 py-0.5 text-center text-[8px] font-semibold md:text-[9px]">Gel Tutor · 外教</span>
            </div>
            {/* 控制条 */}
            <div className="absolute inset-x-0 bottom-0 flex items-center gap-2.5 bg-gradient-to-t from-black/90 to-transparent px-3 pt-5 pb-2">
              <button
                onClick={() => setPlaying((p) => !p)}
                className="grid h-7 w-7 place-items-center rounded-full bg-white/15 transition-colors hover:bg-white/30"
                aria-label={playing ? "暂停" : "播放"}
              >
                {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              </button>
              <span className="text-[9px] tabular-nums text-white/80">6:47 / 29:41</span>
              <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/25">
                <div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background: "linear-gradient(90deg,#5000ff,#dc3dbe 60%,#ffb500)",
                    width: "24%",
                    transition: "width 12s linear",
                    ...(playing ? { width: "100%" } : {}),
                  }}
                />
              </div>
              <Volume2 className="h-3.5 w-3.5 text-white/80" />
              <Maximize2 className="h-3.5 w-3.5 text-white/80" />
            </div>
          </div>
        </div>

        {/* 题目分页 */}
        <div className="mt-4 flex items-center justify-center gap-6">
          <button
            onClick={() => goQuiz(-1)}
            className="grid h-8 w-8 place-items-center rounded-full border border-border transition-colors hover:border-primary/40 hover:text-primary"
            aria-label="上一题"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm text-muted-foreground">
            问题 <b className="font-display text-foreground">{qIdx + 1}</b> 的 13
          </span>
          <button
            onClick={() => goQuiz(1)}
            className="grid h-8 w-8 place-items-center rounded-full border border-border transition-colors hover:border-primary/40 hover:text-primary"
            aria-label="下一题"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* 随堂练习 */}
        <div className="mt-4 rounded-2xl border border-border bg-secondary/40 p-5 md:p-7">
          <p className="text-center font-display text-base font-bold md:text-lg">{quiz.q}</p>
          <div className="mx-auto mt-5 grid max-w-2xl gap-2.5 sm:grid-cols-2">
            {quiz.options.map((opt, i) => {
              const isPicked = picked === i;
              const isRight = picked !== null && i === quiz.answer;
              const isWrong = isPicked && i !== quiz.answer;
              return (
                <button
                  key={opt}
                  onClick={() => setPicked(i)}
                  className={cn(
                    "flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all",
                    isRight
                      ? "border-primary bg-primary text-primary-foreground"
                      : isWrong
                        ? "border-magenta bg-magenta/10 text-magenta"
                        : "border-border bg-card hover:border-primary/50 hover:text-primary",
                  )}
                >
                  {isRight && <CheckCircle2 className="h-4 w-4" />}
                  {isWrong && <XCircle className="h-4 w-4" />}
                  {opt}
                </button>
              );
            })}
          </div>
          {picked !== null && (
            <p className="mt-4 text-center text-xs text-muted-foreground">
              {picked === quiz.answer
                ? "回答正确！副词 always 修饰动词，属于 adverb（副词）。"
                : "再想想：always 描述动作发生的频率，修饰的是动词。"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
