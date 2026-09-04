import { useMemo, useState } from "react";
import { CalendarDays, Clock, Play, Search, User, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Course = {
  id: string;
  title: string;
  teacher: string;
  category: string;
  minutes: number;
  date: string;
  time: string;
  status: "live" | "upcoming" | "replay";
};

const COURSES: Course[] = [
  { id: "c1", title: "口语 Part 2 高分故事线搭建", teacher: "Emma R.", category: "口语", minutes: 45, date: "今天", time: "20:00", status: "live" },
  { id: "c2", title: "写作 Task 2 论证展开训练营", teacher: "James W.", category: "写作", minutes: 60, date: "今天", time: "21:00", status: "upcoming" },
  { id: "c3", title: "听力 Section 4 学术讲座精听", teacher: "Sophie L.", category: "听力", minutes: 40, date: "明天", time: "19:30", status: "upcoming" },
  { id: "c4", title: "阅读 Heading 题秒定位技巧", teacher: "Daniel K.", category: "阅读", minutes: 45, date: "明天", time: "20:30", status: "upcoming" },
  { id: "c5", title: "口语发音纠音工作坊", teacher: "Emma R.", category: "口语", minutes: 30, date: "09/02", time: "19:00", status: "replay" },
  { id: "c6", title: "写作 7 分句式升级实战", teacher: "James W.", category: "写作", minutes: 50, date: "09/01", time: "20:00", status: "replay" },
];

const CATEGORIES = ["全部", "口语", "写作", "听力", "阅读"];
const DURATIONS = ["全部时长", "≤ 40 分钟", "41–50 分钟", "> 50 分钟"];

export function CoursesMock() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("全部");
  const [duration, setDuration] = useState("全部时长");
  const [reserved, setReserved] = useState<Record<string, boolean>>({});
  const [playing, setPlaying] = useState(false);

  const list = useMemo(
    () =>
      COURSES.filter((c) => {
        if (category !== "全部" && c.category !== category) return false;
        if (duration === "≤ 40 分钟" && c.minutes > 40) return false;
        if (duration === "41–50 分钟" && (c.minutes <= 40 || c.minutes > 50)) return false;
        if (duration === "> 50 分钟" && c.minutes <= 50) return false;
        if (query && !c.title.includes(query) && !c.teacher.toLowerCase().includes(query.toLowerCase()))
          return false;
        return true;
      }),
    [query, category, duration],
  );

  const groups = useMemo(() => {
    const map = new Map<string, Course[]>();
    for (const c of list) {
      const arr = map.get(c.date) ?? [];
      arr.push(c);
      map.set(c.date, arr);
    }
    return [...map.entries()];
  }, [list]);

  return (
    <div className="grid gap-4 xl:grid-cols-[1.1fr_1fr]">
      {/* 直播播放器 */}
      <div>
        <div className="relative aspect-[16/7] overflow-hidden rounded-xl bg-[linear-gradient(135deg,#000066,#5000ff_60%,#dc3dbe)]">
          <button
            onClick={() => setPlaying((p) => !p)}
            className="absolute inset-0 grid place-items-center"
            aria-label={playing ? "暂停" : "播放"}
          >
            {!playing && (
              <span className="grid h-12 w-12 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25">
                <Play className="h-5 w-5 fill-current" />
              </span>
            )}
          </button>
          <span className="absolute left-3 top-3 rounded-full bg-[#dc3dbe] px-2 py-0.5 text-[10px] font-bold text-white">
            LIVE · 直播中
          </span>
          <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-black/30 px-3 py-2 text-[11px] text-white backdrop-blur">
            <span>00:12:36</span>
            <div className="h-1 flex-1 rounded-full bg-white/25">
              <div className="h-full w-[38%] rounded-full bg-[#ffb500]" />
            </div>
            <span>45:00</span>
            <Volume2 className="h-3.5 w-3.5" />
          </div>
        </div>
        <div className="mt-2.5 flex items-center justify-between rounded-xl border border-border bg-secondary/60 px-3 py-2">
          <div className="min-w-0">
            <div className="truncate font-display text-[13px] font-bold">口语 Part 2 高分故事线搭建</div>
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <User className="h-3 w-3" /> Emma R. · 前雅思考官
            </div>
          </div>
          <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
            随堂练习 × 6
          </span>
        </div>
      </div>

      {/* 课程列表 */}
      <div className="flex min-h-0 flex-col">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索课程或外教"
              className="w-full rounded-lg border border-border bg-card py-1.5 pl-8 pr-2 text-xs outline-none focus:border-primary/40"
            />
          </div>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="rounded-lg border border-border bg-card px-2 py-1.5 text-xs outline-none"
          >
            {DURATIONS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-full border px-2.5 py-1 text-[11px] font-medium transition",
                category === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/30",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-2.5 max-h-56 space-y-2.5 overflow-y-auto pr-1">
          {groups.map(([date, courses]) => (
            <div key={date}>
              <div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground">
                <CalendarDays className="h-3 w-3" /> {date}
              </div>
              <div className="space-y-1.5">
                {courses.map((c) => {
                  const isReserved = reserved[c.id];
                  return (
                    <div
                      key={c.id}
                      className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-3 py-2 transition hover:border-primary/30"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[12.5px] font-semibold">{c.title}</div>
                        <div className="flex items-center gap-2 text-[10.5px] text-muted-foreground">
                          <span>{c.teacher}</span>
                          <span className="flex items-center gap-0.5">
                            <Clock className="h-2.5 w-2.5" /> {c.time} · {c.minutes} 分钟
                          </span>
                        </div>
                      </div>
                      {c.status === "replay" ? (
                        <button className="shrink-0 rounded-lg border border-border px-2.5 py-1 text-[11px] font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-primary">
                          观看回放
                        </button>
                      ) : (
                        <button
                          onClick={() => setReserved((r) => ({ ...r, [c.id]: !r[c.id] }))}
                          className={cn(
                            "shrink-0 rounded-lg px-2.5 py-1 text-[11px] font-semibold transition",
                            isReserved
                              ? "border border-primary/40 bg-primary/10 text-primary"
                              : "bg-primary text-primary-foreground hover:opacity-90",
                          )}
                        >
                          {isReserved ? "已预约" : "预约直播"}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          {list.length === 0 && (
            <div className="py-6 text-center text-xs text-muted-foreground">没有符合条件的课程</div>
          )}
        </div>
      </div>
    </div>
  );
}
