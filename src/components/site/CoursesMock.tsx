import { useMemo, useState } from "react";
import { Clock, Maximize2, Pause, Play, Search, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Course = {
  id: string;
  title: string;
  desc: string;
  time: string;
  category: "写作" | "口语" | "听力" | "阅读" | "语法";
  minutes: number;
  day: string;
  date: string;
  badge: string;
  tone: string;
};

const COURSES: Course[] = [
  {
    id: "c1",
    title: "流利度、连贯性和发音",
    desc: "了解口语测试中四项评分标准中的两项",
    time: "4:30下午 - 5:15下午",
    category: "口语",
    minutes: 45,
    day: "今天",
    date: "9 月 4 日",
    badge: "🗣",
    tone: "bg-[#ffb500]/15",
  },
  {
    id: "c2",
    title: "第1部分听力",
    desc: "了解听力第一部分和填写表格",
    time: "10:30下午 - 11:15下午",
    category: "听力",
    minutes: 45,
    day: "今天",
    date: "9 月 4 日",
    badge: "🎧",
    tone: "bg-[#ffb500]/15",
  },
  {
    id: "c3",
    title: "语法：连词（高级）",
    desc: "学习如何使用连词连接句子的各个部分（从句）",
    time: "11:30下午 - 11:50下午",
    category: "语法",
    minutes: 20,
    day: "今天",
    date: "9 月 4 日",
    badge: "A",
    tone: "bg-[#dc3dbe]/12",
  },
  {
    id: "c4",
    title: "Task 2 论证展开与例证",
    desc: "掌握主体段落的论点铺陈与支撑细节写法",
    time: "7:00下午 - 7:40下午",
    category: "写作",
    minutes: 40,
    day: "明天",
    date: "9 月 5 日",
    badge: "✍",
    tone: "bg-[#5000ff]/10",
  },
  {
    id: "c5",
    title: "Heading 题快速定位",
    desc: "段落主旨识别与干扰项排除技巧",
    time: "8:00下午 - 8:50下午",
    category: "阅读",
    minutes: 50,
    day: "明天",
    date: "9 月 5 日",
    badge: "📖",
    tone: "bg-[#1066ff]/12",
  },
  {
    id: "c6",
    title: "Part 2 故事线搭建",
    desc: "用一条主线串起 2 分钟长答案",
    time: "9:00下午 - 9:30下午",
    category: "口语",
    minutes: 30,
    day: "明天",
    date: "9 月 5 日",
    badge: "🗣",
    tone: "bg-[#ffb500]/15",
  },
];

const CATEGORIES: { label: string; count: number }[] = [
  { label: "全部", count: 212 },
  { label: "写作", count: 59 },
  { label: "口语", count: 25 },
  { label: "听力", count: 20 },
  { label: "阅读", count: 24 },
  { label: "语法", count: 24 },
];

const DURATIONS: { label: string; count: number }[] = [
  { label: "全部时长", count: 212 },
  { label: "10-20分钟", count: 48 },
  { label: "30-40分钟", count: 36 },
  { label: "45-60分钟", count: 128 },
];

function inDuration(minutes: number, label: string) {
  if (label === "全部时长") return true;
  if (label === "10-20分钟") return minutes <= 20;
  if (label === "30-40分钟") return minutes > 20 && minutes <= 40;
  return minutes > 40;
}

export function CoursesMock() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("全部");
  const [duration, setDuration] = useState("全部时长");
  const [reserved, setReserved] = useState<Record<string, boolean>>({});
  const [playing, setPlaying] = useState(false);

  const groups = useMemo(() => {
    const list = COURSES.filter((c) => {
      if (category !== "全部" && c.category !== category) return false;
      if (!inDuration(c.minutes, duration)) return false;
      if (query && !c.title.includes(query) && !c.desc.includes(query)) return false;
      return true;
    });
    const map = new Map<string, Course[]>();
    for (const c of list) {
      const arr = map.get(c.day) ?? [];
      arr.push(c);
      map.set(c.day, arr);
    }
    return [...map.entries()];
  }, [query, category, duration]);

  return (
    <div className="space-y-3">
      {/* 搜索与筛选 */}
      <div className="rounded-xl border border-border bg-card p-3">
        <div className="relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索课程..."
            className="w-full rounded-lg border border-border bg-secondary/50 py-2 pl-3 pr-9 text-xs outline-none focus:border-primary/40"
          />
          <Search className="absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        </div>

        <div className="mt-3 flex items-start gap-2">
          <span className="mt-1 w-8 shrink-0 text-[11px] text-muted-foreground">类别：</span>
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((c) => (
              <button
                key={c.label}
                onClick={() => setCategory(c.label)}
                className={cn(
                  "rounded-full border px-2.5 py-1 text-[11px] font-semibold transition",
                  category === c.label
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground hover:border-primary/30",
                )}
              >
                {c.label}{" "}
                <span className={cn("font-normal", category === c.label ? "opacity-80" : "text-muted-foreground")}>
                  {c.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-2 flex items-start gap-2">
          <span className="mt-1 w-8 shrink-0 text-[11px] text-muted-foreground">时长：</span>
          <div className="flex flex-wrap gap-1.5">
            {DURATIONS.map((d) => (
              <button
                key={d.label}
                onClick={() => setDuration(d.label)}
                className={cn(
                  "rounded-full border px-2.5 py-1 text-[11px] font-semibold transition",
                  duration === d.label
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground hover:border-primary/30",
                )}
              >
                {d.label}{" "}
                <span className={cn("font-normal", duration === d.label ? "opacity-80" : "text-muted-foreground")}>
                  {d.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 课程列表 */}
      <div className="max-h-72 space-y-3 overflow-y-auto pr-1">
        {groups.map(([day, courses]) => (
          <div key={day}>
            <div className="mb-1.5 flex items-baseline justify-between">
              <div className="font-display text-sm font-extrabold">{day}</div>
              <div className="text-[11px] text-muted-foreground">{courses[0]?.date}</div>
            </div>
            <div className="space-y-1.5">
              {courses.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-3 py-2 transition hover:border-primary/30"
                >
                  <span
                    className={cn(
                      "grid h-8 w-8 shrink-0 place-items-center rounded-full text-[13px] font-bold",
                      c.tone,
                    )}
                  >
                    {c.badge}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[12.5px] font-bold">{c.title}</div>
                    <div className="truncate text-[11px] text-muted-foreground">{c.desc}</div>
                    <div className="mt-0.5 flex items-center gap-1 text-[10.5px] text-muted-foreground">
                      <Clock className="h-2.5 w-2.5" /> {c.time}
                    </div>
                  </div>
                  <button
                    onClick={() => setReserved((r) => ({ ...r, [c.id]: !r[c.id] }))}
                    className={cn(
                      "shrink-0 rounded-full px-3.5 py-1.5 text-[11px] font-bold transition",
                      reserved[c.id]
                        ? "border border-primary/40 bg-primary/10 text-primary"
                        : "bg-[#000066] text-white hover:opacity-90",
                    )}
                  >
                    {reserved[c.id] ? "已预约" : "预约"}
                  </button>
                  <button className="flex shrink-0 items-center gap-1 rounded-full border border-border px-3 py-1.5 text-[11px] font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-primary">
                    <Play className="h-2.5 w-2.5" /> 观看回放
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
        {groups.length === 0 && (
          <div className="py-6 text-center text-xs text-muted-foreground">没有符合条件的课程</div>
        )}
      </div>

      {/* 直播课堂 */}
      <div className="rounded-xl border border-border bg-card p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-sm font-extrabold">直播课堂</span>
            <span className="text-[11px] text-muted-foreground">语法：副词的三个位置</span>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-[#dc3dbe]/10 px-2 py-0.5 text-[10px] font-bold text-[#dc3dbe]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#dc3dbe]" /> LIVE 直播中
          </span>
        </div>

        <div className="mt-2.5 grid gap-2 sm:grid-cols-[1fr_150px]">
          <div className="relative overflow-hidden rounded-xl border border-border bg-secondary/40 p-4">
            <div className="font-display text-base font-extrabold text-primary">Three adverb positions</div>
            <p className="mt-1 text-[11px] text-muted-foreground">There are three positions for adverbs:</p>
            <ul className="mt-1.5 space-y-1 text-[11.5px] leading-relaxed">
              <li>
                – The <b>front position</b> at the beginning of a clause:
                <div className="pl-3 italic">
                  1) <u className="decoration-[#dc3dbe] decoration-2">Sometimes</u> I go for a walk in the park.
                </div>
              </li>
              <li>
                – The <b>mid-position</b> next to the main verb:
                <div className="pl-3 italic">
                  2) I <u className="decoration-[#dc3dbe] decoration-2">rarely</u> go for a walk in the park.
                </div>
              </li>
              <li>
                – And the <b>end position</b> at the end of a clause:
                <div className="pl-3 italic">
                  3) I don’t go for a walk in the park{" "}
                  <u className="decoration-[#dc3dbe] decoration-2">often</u>.
                </div>
              </li>
            </ul>
          </div>

          <div className="relative min-h-[130px] overflow-hidden rounded-xl bg-[#000033]">
            <div className="absolute inset-2 rounded-lg bg-[linear-gradient(150deg,#5000ff,#dc3dbe_60%,#ffb500)]">
              <div className="grid h-full place-items-center">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-white/20 text-lg backdrop-blur">
                  👩‍🏫
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-black/35 py-1 text-center text-[10px] font-semibold text-white backdrop-blur">
                Gel Tutor · 外教
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-2 rounded-lg bg-secondary/60 px-2.5 py-1.5 text-[11px] text-muted-foreground">
          <button
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "暂停" : "播放"}
            className="grid h-6 w-6 place-items-center rounded-full border border-border text-foreground transition hover:border-primary/50 hover:text-primary"
          >
            {playing ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          </button>
          <span>6:47 / 29:41</span>
          <div className="h-1 flex-1 rounded-full bg-border">
            <div className="h-full w-[23%] rounded-full bg-[linear-gradient(90deg,#5000ff,#dc3dbe_60%,#ffb500)]" />
          </div>
          <Volume2 className="h-3.5 w-3.5" />
          <Maximize2 className="h-3.5 w-3.5" />
        </div>
      </div>
    </div>
  );
}
