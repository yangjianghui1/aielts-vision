import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Stats } from "@/components/site/Stats";
import { Capabilities } from "@/components/site/Capabilities";
import { MockScroll } from "@/components/site/MockScroll";
import { Pricing } from "@/components/site/Pricing";
import { Stories } from "@/components/site/Stories";
import { Faq } from "@/components/site/Faq";
import { StartCta, Footer } from "@/components/site/StartCta";

const TITLE = "AIELTS 语焉 · AI 雅思测评与全真模考平台";
const DESC =
  "语焉雅思用 AI 测评、英国文化教育协会遴选题库与 40 套全真模考，提供四维度评分与个性化提分路径，帮助中国考生更快看清水平、持续提分。";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Capabilities />
        <MockScroll />
        <Pricing />
        <Stories />
        <Faq />
        <StartCta />
      </main>
      <Footer />
    </div>
  );
}
