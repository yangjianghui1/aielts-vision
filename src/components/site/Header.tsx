import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "产品能力", href: "#capability" },
  { label: "全真模考", href: "#mock" },
  { label: "会员方案", href: "#pricing" },
  { label: "学员故事", href: "#stories" },
  { label: "常见问题", href: "#faq" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-border bg-background/85 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-2">
          <span
            className="grid h-8 w-8 place-items-center rounded-lg font-display text-sm font-extrabold text-primary-foreground"
            style={{ background: "var(--gradient-brand)" }}
          >
            A
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight">AIELTS 语焉</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#" className="hidden text-sm text-muted-foreground hover:text-foreground sm:block">
            登录
          </a>
          <a
            href="#cta"
            className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-bright"
          >
            免费注册
          </a>
        </div>
      </div>
    </header>
  );
}
