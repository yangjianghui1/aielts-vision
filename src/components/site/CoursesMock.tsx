import { useMemo, useState } from "react";
import { Clock, Play, Search } from "lucide-react";
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
  {
    id: "c4",
    title: "Task 2 观点类作文结构",
    desc: "四段式展开：立场、论证、让步与结论",
    cat: "writing",
    dur: "45-60",
    time: "2:00下午 - 2:45下午",
    iconBg: "bg-primary/10",
    icon: "✍",
  },
  {
    id: "c5",
    title: "阅读 Heading 题速解",
    desc: "用首尾句定位段落主旨，告别逐句精读",
    cat: "reading",
    dur: "30-40",
    time: "3:00下午 - 3:35下午",
    iconBg: "bg-primary/10",
    icon: "📖",
  },
  {
    id: "c6",
    title: "Part 2 个人陈述素材库",
    desc: "8 个万能故事线覆盖 90% 话题卡",
    cat: "speaking",
    dur: "30-40",
    time: "6:00下午 - 6:35下午",
    iconBg: "bg-accent/25",
    icon: "🎙",
  },
];

export function CoursesMock() {
  const [cat, setCat] = useState("all");
  const [dur, setDur] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [joined, setJoined] = useState<Record<string, boolean>>({});

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
    <div className="overflow-hidden rounded-2xl border border-border bg-secondary/40">
      {/* 顶部：搜索 */}
      <div className="border-b border-border bg-card px-4 py-3.5 md:px-6">
        <div className="flex items-center gap-2 rounded-full border border-border bg-secondary/70 px-4 py-2">
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
      <div className="space-y-2.5 border-b border-border bg-card px-4 py-3.5 md:px-6">
        <div className="flex items-start gap-3">
          <span className="mt-1.5 w-8 shrink-0 text-xs font-semibold text-muted-foreground">类别：</span>
          <div className="flex flex-wrap gap-1.5">
            {CATS.map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
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
        <div className="flex items-start gap-3">
          <span className="mt-1.5 w-8 shrink-0 text-xs font-semibold text-muted-foreground">时长：</span>
          <div className="flex flex-wrap gap-1.5">
            {DURS.map((d) => (
              <button
                key={d.id}
                onClick={() => setDur(d.id)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
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
      <div className="px-4 py-4 md:px-6">
        <div className="mb-3 flex items-baseline justify-between">
          <span className="font-display text-lg font-extrabold">今天</span>
          <span className="text-xs text-muted-foreground">9 月 4 日</span>
        </div>

        <div className="space-y-3">
          {list.map((c) => {
            const isJoined = !!joined[c.id];
            return (
              <div
                key={c.id}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 transition-shadow hover:shadow-md sm:flex-row sm:items-center"
              >
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  <span
                    className={cn(
                      "grid h-11 w-11 shrink-0 place-items-center rounded-full font-display text-sm font-bold",
                      c.iconBg,
                    )}
                  >
                    {c.icon}
                  </span>
                  <div className="min-w-0">
                    <div className="truncate font-display text-sm font-bold md:text-base">{c.title}</div>
                    <div className="mt-0.5 line-clamp-1 text-xs text-muted-foreground md:text-sm">{c.desc}</div>
                    <div className="mt-1.5 flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {c.time}
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() => setJoined((s) => ({ ...s, [c.id]: !s[c.id] }))}
                    className={cn(
                      "min-w-24 flex-1 rounded-full px-5 py-2.5 text-sm font-semibold transition-all sm:flex-none",
                      isJoined
                        ? "bg-primary/10 text-primary"
                        : "bg-foreground text-background hover:opacity-85",
                    )}
                  >
                    {isJoined ? "已注册 ✓" : "注册"}
                  </button>
                  <button className="flex min-w-24 flex-1 items-center justify-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary sm:flex-none">
                    <Play className="h-3.5 w-3.5" />
                    观看回放
                  </button>
                </div>
              </div>
            );
          })}
          {list.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border py-10 text-center text-sm text-muted-foreground">
              没有符合条件的课程，换个筛选试试
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
