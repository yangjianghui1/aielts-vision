# 语焉 AIELTS 前端-only 交付说明

> 本文档用于把当前 Lovable 项目的前端部分单独摘出来，交给研发团队基于其他框架二次开发。

---

## 1. 项目基础信息

| 项目 | 说明 |
|------|------|
| 当前框架 | TanStack Start v1 + React 19 + Vite 8 |
| 样式方案 | Tailwind CSS v4 + CSS 变量设计系统 |
| 组件库 | Radix UI + shadcn/ui 风格组件（`src/components/ui`） |
| 图标 | lucide-react |
| 图表 | recharts |
| 字体 | Akrobat（英文/数字）、HarmonyOS Sans SC（中文） |

---

## 2. 如何拿到完整源码

### 方式 A：GitHub 同步（推荐）
1. 在 Lovable 编辑器左下角点击 **+ → GitHub → Connect project**
2. 授权 GitHub App，选择要推送到的账号/组织
3. 点击 **Create Repository**，代码会自动同步到 GitHub
4. 研发直接 `git clone` 仓库即可

### 方式 B：下载 ZIP
1. 切换到 **Code Editor 视图**
2. 左侧文件树底部点击 **Download codebase**
3. 解压后交给研发

---

## 3. 前端-only 需要保留的文件

```text
public/                 # 静态资源（favicon、图片等）
src/
  assets/               # 图片、Logo、二维码、字体资源指针（*.asset.json）
  components/
    motion/             # 动画组件（CountUp、Reveal）
    site/               # 页面业务组件（Hero、Pricing、Stories 等）
    ui/                 # shadcn/ui 基础组件
  hooks/                # 自定义 hooks
  lib/                  # 工具函数（utils.ts 等）
  routes/               # 页面路由
    __root.tsx          # 根布局（含字体、全局 head）
    index.tsx           # 首页
  styles.css            # 全局样式 + 设计系统变量
  router.tsx            # 路由配置（如迁移可忽略）
package.json
tsconfig.json
vite.config.ts
```

### 需要删除/替换的后端相关文件

| 文件/目录 | 说明 |
|-----------|------|
| `src/server.ts` | 服务端入口 |
| `src/start.ts` | 启动配置（含 auth middleware） |
| `src/routeTree.gen.ts` | TanStack Router 自动生成，迁移时无需保留 |
| `src/routes/api/` | 服务端 API 路由（本项目暂无，但未来若有需移除） |
| `*.functions.ts` / `*.server.ts` | 服务端函数（本项目暂无） |
| `.env` 中服务端密钥 | 不要提交到前端仓库 |

---

## 4. 设计系统（迁移时必须保留）

所有颜色、字体、圆角、阴影都定义在 `src/styles.css`。

### 4.1 品牌色

| 名称 | 色值 | 用途 |
|------|------|------|
| 语焉紫 | `#5000ff` | 主色、按钮、强调 |
| 智研红 | `#dc3dbe` | 辅助强调、渐变 |
| 跃升橙 | `#ffb500` | 辅助强调、渐变 |
| 深海蓝 | `#000066` | 深色背景、渐变 |
| 皇家蓝 | `#1066ff` | 辅助蓝 |
| 墨黑 | `#1e1e1e` | 主文字 |
| 浅灰 | `#f6f5fb` | 卡片/次级背景 |
| 边框灰 | `#dcdce8` | 边框、分割线 |

### 4.2 品牌渐变

```css
--gradient-brand: linear-gradient(90deg, #5000ff 0%, #dc3dbe 60%, #ffb500 100%);
--gradient-deep: linear-gradient(135deg, #000066 0%, #5000ff 60%, #dcdce8 100%);
--gradient-plum: linear-gradient(135deg, #5a0064 0%, #dc3dbe 60%, #ffc3ff 100%);
```

### 4.3 字体

```css
--font-heading: "Akrobat", "HarmonyOS Sans SC", ui-sans-serif;
--font-body: "Akrobat", "HarmonyOS Sans SC", ui-sans-serif;
```

字体通过 `@font-face` 在 `src/styles.css` 中自托管，资源文件为 CDN 上的 `.woff2`。
若迁移到其他框架，需把字体文件一并迁移，并重新声明 `@font-face`。

### 4.4 圆角与阴影

```css
--radius: 1rem;
--shadow-card: 0 1px 3px rgba(30, 30, 30, 0.06), 0 1px 2px rgba(30, 30, 30, 0.04);
--shadow-lift: 0 18px 40px -18px rgba(30, 30, 30, 0.22);
```

---

## 5. 页面与组件对应关系

| 页面 | 入口路由 | 主要组件 |
|------|----------|----------|
| 首页 | `/` | `Hero`、`Stats`、`MockScroll`、`Capabilities`、`Stories`、`Pricing`、`Insights`、`Faq`、`StartCta` |

### 5.1 首页模块顺序

1. **Header** — 顶部导航
2. **Hero** — 主视觉 + 右侧学习进度面板
3. **Stats** — 关键词跑马灯
4. **MockScroll** — 5 步闭环备考（滚动驱动横向卡片）
5. **Capabilities** — 产品能力（左右布局：左侧能力列表 + 右侧内容面板）
6. **MockTestProduct** — 全真模考产品卡片
7. **Stories** — 学员提分案例（双行 Marquee）
8. **Pricing** — 两档会员 + Token 充值
9. **Insights** — 备考动态
10. **Faq** — 常见问题
11. **StartCta** — 底部 CTA
12. **Footer** — 页脚

### 5.2 能力面板内容组件

能力列表在 `Capabilities.tsx` 中定义，右侧内容根据选中能力切换：

| 能力 | 组件 |
|------|------|
| AI 写作评分 | `WritingFeedback.tsx` |
| AI 口语范文 | `SpeakingSamples.tsx` |
| AI 听力解析 | `ListeningMock.tsx` |
| AI 阅读解析 | `ReadingAnalysis.tsx` |
| 200+ 外教课程 | `CoursesMock.tsx` |

### 5.3 其他业务组件

- `SpeakingRecorder.tsx` — 口语录音/评分演示
- `ReadingMock.tsx` — 阅读模拟题演示
- `SampleEssays.tsx` — 写作范文展示
- `SocialLinks.tsx` — 页脚社媒图标 + 二维码弹窗
- `Marquee.tsx` — 跑马灯基础组件

---

## 6. 迁移到其他框架的建议

### 6.1 若迁移到 Next.js / Vite React / Nuxt

1. **复制保留内容**
   - `src/components/site/*`
   - `src/components/ui/*`
   - `src/components/motion/*`
   - `src/assets/*`
   - `src/styles.css`
   - `src/lib/utils.ts`

2. **替换路由**
   - TanStack Router → Next.js App Router / Pages Router / React Router
   - `src/routes/index.tsx` → 首页
   - 当前项目无其他页面路由

3. **替换动画组件**
   - `Reveal` 组件使用了 Framer Motion（或类似库），请确认目标框架是否已安装对应动画库
   - 若不想引入动画库，可把 `Reveal` 替换为普通 `div`

4. **处理 Tailwind v4**
   - 当前 `src/styles.css` 使用 Tailwind v4 语法：`@import "tailwindcss"`、`@theme inline`
   - 若目标项目使用 Tailwind v3，需要把 `@theme inline` 迁移到 `tailwind.config.js`
   - 颜色变量可直接复用 `:root` 中的 CSS 变量

5. **处理图标**
   - 所有图标来自 `lucide-react`，目标项目安装同一依赖即可

6. **处理图表**
   - `recharts` 用于 Hero 学习进度曲线，迁移时保留 `<ResponsiveContainer>` + `<AreaChart>` 结构

7. **移除后端依赖**
   - 删除 `createServerFn`、`*.functions.ts`、API 路由
   - 把需要的数据硬编码为 JSON 或接入新后端接口

---

## 7. 当前没有后端依赖的组件

本项目当前为纯展示型落地页，以下组件均为静态数据，可直接迁移：

- `Hero.tsx`
- `Stats.tsx`
- `MockScroll.tsx`
- `Capabilities.tsx` 及其子面板
- `MockTestProduct.tsx`
- `Stories.tsx`
- `Pricing.tsx`
- `Insights.tsx`
- `Faq.tsx`
- `StartCta.tsx`
- `Header.tsx` / `Footer.tsx`（在 `__root.tsx` 中引用）

---

## 8. 交付清单

- [ ] 源码已推送到 GitHub / 已下载 ZIP
- [ ] 已移除 `src/server.ts`、`src/start.ts`、后端 API 路由
- [ ] 已保留 `src/styles.css` 和 `src/assets`
- [ ] 已把设计系统变量同步到目标框架
- [ ] 已替换路由库为项目所用框架
- [ ] 已确认动画库依赖或降级为普通 div
- [ ] 已把 `lucide-react`、`recharts` 加入目标项目依赖

---

## 9. 快速启动（保留当前 TanStack Start 框架）

如果研发暂时不改框架，只想在本地跑起来：

```bash
# 安装依赖
bun install

# 本地开发
bun run dev

# 构建
bun run build
```

> 注意：当前项目没有启用 Lovable Cloud / Supabase，因此不需要后端环境变量即可运行。
