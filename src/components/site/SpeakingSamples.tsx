import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Play, Pause, Volume2, Maximize2, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

/* ================= 示例答案（真人现场示范） ================= */

type BandSample = {
  band: string;
  student: string;
  part: string;
  duration: string;
  comment: string;
};

const SAMPLES: BandSample[] = [
  {
    band: "6",
    student: "Tobias",
    part: "Speaking Part 2",
    duration: "02:14",
    comment:
      "回答覆盖了话题卡的全部要点，展开基本充分；偶有停顿与自我纠正，连接词使用较为单一，词汇能达意但缺少变化。",
  },
  {
    band: "5.5",
    student: "Tobias",
    part: "Speaking Part 2",
    duration: "01:58",
    comment:
      "能够持续表达，但重复与自我纠正较频繁；句式以简单句为主，复杂结构尝试时错误明显，发音整体可理解。",
  },
];

function MockVideo({ sample }: { sample: BandSample }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setPlaying(false);
    setProgress(0);
  }, [sample.band]);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setPlaying(false);
          return 0;
        }
        return p + 0.5;
      });
    }, 100);
    return () => clearInterval(t);
  }, [playing]);

  const cur = Math.round((progress / 100) * 134);
  const mm = String(Math.floor(cur / 60)).padStart(2, "0");
  const ss = String(cur % 60).padStart(2, "0");

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-navy">
      {/* 模拟视频画面 */}
      <div className="relative flex aspect-video flex-col items-center justify-center overflow-hidden bg-[#000066]">
        <div
          className="absolute inset-0 opacity-25"
          style={{ background: "var(--gradient-brand)" }}
        />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* 播放按钮 */}
        <button
          onClick={() => setPlaying((v) => !v)}
          aria-label={playing ? "暂停" : "播放"}
          className="relative grid h-16 w-16 place-items-center rounded-full bg-white text-[#5000ff] shadow-xl transition-transform hover:scale-105"
        >
          {playing ? (
            <Pause className="h-6 w-6" fill="currentColor" />
          ) : (
            <Play className="ml-0.5 h-6 w-6" fill="currentColor" />
          )}
        </button>
        <div className="relative mt-4 flex items-center gap-2 text-xs font-medium text-white/80">
          <GraduationCap className="h-4 w-4" />
          {sample.part} · 考生 {sample.student} · 分数 {sample.band}
        </div>
        {playing && (
          <span className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-bold text-white">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#dc3dbe]" />
            示范播放中
          </span>
        )}
      </div>
      {/* 控制条 */}
      <div className="flex items-center gap-3 bg-[#000033] px-4 py-2.5 text-white">
        <button onClick={() => setPlaying((v) => !v)} aria-label="播放/暂停">
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
        <span className="font-display text-[11px] tabular-nums text-white/70">
          {mm}:{ss} / {sample.duration}
        </span>
        <div
          className="relative h-1 flex-1 cursor-pointer rounded-full bg-white/20"
          onClick={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            setProgress(Math.round(((e.clientX - r.left) / r.width) * 100));
          }}
        >
          <div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ width: `${progress}%`, background: "var(--gradient-brand)" }}
          />
        </div>
        <Volume2 className="h-4 w-4 text-white/70" />
        <Maximize2 className="h-4 w-4 text-white/70" />
      </div>
    </div>
  );
}

/* ================= 雅思评分描述 ================= */

type BandDesc = { band: string; points: string[] };

const RUBRICS: { tab: string; descs: BandDesc[] }[] = [
  {
    tab: "流畅度与连贯性",
    descs: [
      { band: "09", points: ["语言流畅，几乎没有重复或自我纠正", "任何犹豫都是与内容相关，而非寻找词汇或语法", "表达连贯，使用完全恰当的衔接手段", "充分且恰当地展开话题"] },
      { band: "08", points: ["语言流畅，仅偶尔有重复或自我纠正；犹豫通常与内容相关，很少是因为寻找语言表达", "连贯且恰当地展开话题"] },
      { band: "07", points: ["长篇表达没有明显困难或失去连贯性", "有时可能表现出与语言相关的犹豫，或有一些重复和/或自我纠正", "灵活使用各种连接词和话语标记"] },
      { band: "06", points: ["愿意进行长篇表达，但有时因偶尔的重复、自我纠正或犹豫而失去连贯性", "使用各种连接词和话语标记，但并非总是恰当"] },
      { band: "05", points: ["通常能保持语言流畅，但使用重复、自我纠正和/或放慢语速来维持表达", "可能过度使用某些连接词和话语标记", "简单表达流畅，但更复杂的交流会导致流畅性问题"] },
      { band: "04", points: ["回应时明显停顿，可能说话缓慢，频繁重复和自我纠正", "能连接基本句子，但重复使用简单连接词，有时失去连贯性"] },
      { band: "03", points: ["说话时有长时间停顿", "连接简单句子的能力有限", "只能给出简单回应，经常无法传达基本信息"] },
      { band: "02", points: ["在大多数词语之前长时间停顿", "几乎无法进行交流"] },
      { band: "01", points: ["无法进行交流", "无法评分的语言表达"] },
      { band: "00", points: ["缺席"] },
    ],
  },
  {
    tab: "词汇资源",
    descs: [
      { band: "09", points: ["在所有话题下精准、自如地使用词汇", "习语使用自然、准确"] },
      { band: "08", points: ["词汇资源丰富，能灵活、准确地表达确切含义", "熟练使用不常见词汇与习语，偶有不准确", "能按需要进行有效的改述"] },
      { band: "07", points: ["能灵活使用词汇讨论各种话题", "能使用一些不常见词汇和习语，并意识到语体与搭配", "能有效进行改述"] },
      { band: "06", points: ["词汇量足以进行长时间讨论，含义表达基本清晰", "改述基本成功，但用词有时不当"] },
      { band: "05", points: ["能讨论熟悉与不熟悉的话题，但词汇灵活性有限", "尝试改述，成败参半"] },
      { band: "04", points: ["能谈论熟悉的话题，但对不熟悉的话题只能传达基本含义", "用词错误频繁，很少尝试改述"] },
      { band: "03", points: ["只能使用简单词汇谈论熟悉的个人话题", "在不熟悉的话题上词汇严重不足"] },
      { band: "02", points: ["只能说孤立的单词或背下来的表达"] },
      { band: "01", points: ["无法进行交流", "无法评分的语言表达"] },
      { band: "00", points: ["缺席"] },
    ],
  },
  {
    tab: "语法范围和准确性",
    descs: [
      { band: "09", points: ["结构使用准确、自然且一致", "除口误外，句子始终准确"] },
      { band: "08", points: ["灵活使用多种结构", "大部分句子无错误，仅偶有不恰当或系统性错误"] },
      { band: "07", points: ["较灵活地使用多种复杂结构", "经常产出无错误的句子，但仍有少量语法错误"] },
      { band: "06", points: ["混合使用简单与复杂结构，但灵活性有限", "复杂结构常出错，但很少造成理解困难"] },
      { band: "05", points: ["基本句式准确、合理", "尝试使用更复杂的结构，但错误较多，可能造成理解困难"] },
      { band: "04", points: ["能产出基本句式，部分简单句正确", "错误频繁，可能引起误解"] },
      { band: "03", points: ["尝试基本句式，但成功有限，或依赖背下来的表达", "除背诵内容外错误众多"] },
      { band: "02", points: ["除背下来的短语外，无法产出基本句式"] },
      { band: "01", points: ["无法进行交流", "无法评分的语言表达"] },
      { band: "00", points: ["缺席"] },
    ],
  },
  {
    tab: "发音",
    descs: [
      { band: "09", points: ["灵活使用各种发音特征", "听者理解毫不费力"] },
      { band: "08", points: ["使用广泛的发音特征", "易于理解，口音对清晰度的影响极小"] },
      { band: "07", points: ["展示出 6 分的全部积极特征及 8 分的部分积极特征"] },
      { band: "06", points: ["能使用多种发音特征，但控制不稳定", "整体可被理解，个别词或音的发音不清会降低清晰度"] },
      { band: "05", points: ["展示出 4 分的全部积极特征及 6 分的部分积极特征"] },
      { band: "04", points: ["发音特征使用有限", "发音问题频繁，听者经常难以理解"] },
      { band: "03", points: ["发音问题严重，大部分时间难以理解"] },
      { band: "02", points: ["话语几乎无法理解"] },
      { band: "01", points: ["无法进行交流", "无法评分的语言表达"] },
      { band: "00", points: ["缺席"] },
    ],
  },
];

/* ================= 主组件 ================= */

function AccordionSection({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-5 py-4 text-left md:px-6"
      >
        <span className="font-display text-lg font-bold">{title}</span>
        {open ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </button>
      {open && <div className="border-t border-border px-5 py-5 md:px-6">{children}</div>}
    </div>
  );
}

export function SpeakingSamples() {
  const [openSection, setOpenSection] = useState<"sample" | "rubric">("sample");
  const [sampleIdx, setSampleIdx] = useState(0);
  const [rubricIdx, setRubricIdx] = useState(0);

  const sample = SAMPLES[sampleIdx] ?? SAMPLES[0]!;
  const rubric = RUBRICS[rubricIdx] ?? RUBRICS[0]!;

  return (
    <div className="space-y-4">
      {/* 示例答案 */}
      <AccordionSection
        title="示例答案"
        open={openSection === "sample"}
        onToggle={() => setOpenSection(openSection === "sample" ? "rubric" : "sample")}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">分数段：</span>
            {SAMPLES.map((s, i) => (
              <button
                key={s.band}
                onClick={() => setSampleIdx(i)}
                className={cn(
                  "grid h-12 w-12 place-items-center rounded-full font-display text-sm font-bold transition-all",
                  i === sampleIdx
                    ? "scale-105 bg-[#dc3dbe] text-white shadow-lg"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/70",
                )}
              >
                {s.band}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">学生：</span>
            <span className="font-display text-base font-extrabold">{sample.student}</span>
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-[#dc3dbe]/[0.06] p-4 text-sm leading-relaxed text-muted-foreground">
          每个视频展示了考生在口语测试不同部分回答问题的情况。您可以单独观看每个部分的视频，并阅读有关其表现的评论。您可以看到每位学生获得的分数以及他们期望的分数。
        </div>

        <div className="mt-5">
          <div className="mb-3 font-display text-base font-bold">模范答案：</div>
          <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
            <MockVideo sample={sample} />
            <div className="rounded-2xl border border-border bg-secondary/50 p-4">
              <div className="flex items-center gap-2">
                <span
                  className="rounded-md px-2 py-0.5 text-[11px] font-bold text-white"
                  style={{ background: "var(--gradient-brand)" }}
                >
                  Band {sample.band}
                </span>
                <span className="text-xs text-muted-foreground">考官点评</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{sample.comment}</p>
            </div>
          </div>
        </div>
      </AccordionSection>

      {/* 雅思评分描述 */}
      <AccordionSection
        title="雅思评分描述"
        open={openSection === "rubric"}
        onToggle={() => setOpenSection(openSection === "rubric" ? "sample" : "rubric")}
      >
        <div className="flex flex-wrap gap-x-8 gap-y-2 border-b border-border">
          {RUBRICS.map((r, i) => (
            <button
              key={r.tab}
              onClick={() => setRubricIdx(i)}
              className={cn(
                "relative pb-3 text-sm font-bold transition-colors",
                i === rubricIdx ? "text-[#dc3dbe]" : "text-foreground/70 hover:text-foreground",
              )}
            >
              {r.tab}
              {i === rubricIdx && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 bg-[#dc3dbe]" />
              )}
            </button>
          ))}
        </div>
        <div className="mt-5 grid max-h-[420px] gap-3 overflow-y-auto pr-1 sm:grid-cols-2">
          {rubric.descs.map((d) => (
            <div
              key={d.band}
              className={cn(
                "flex gap-4 rounded-xl border border-border bg-secondary/40 p-4",
                Number(d.band) % 2 === 1 && "bg-secondary/70",
              )}
            >
              <span className="font-display text-2xl font-extrabold text-foreground/15">{d.band}</span>
              <ul className="space-y-1.5 text-sm leading-relaxed text-muted-foreground">
                {d.points.map((p, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </AccordionSection>
    </div>
  );
}
