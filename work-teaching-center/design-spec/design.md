# SmartClass UI Kit · 设计规范（design.md）

> **文档定位**：这份文件是 `SmartClass UI Kit` 本地网页的完整设计规范，供设计、前端与 AI 编码工具共同使用。
> **数据来源**：`index.html` 内嵌的 Sketch MeaXure 导出数据（`let data = {...}`），以及 `design-spec/SmartClass-设计规范.html` 网页摘要。所有色值、字号、尺寸、状态标签均从图层数据实测，不是推测。
> **原始规范**：`VERSION 1.0.0 | May 2021`（封面标注）；更新记录至 `V0.0.4 / 2021.09.15`。
> **技术基准**：`resolution: 1`（@1x）、`unit: px`、`colorFormat: color-hex`；共 **57 个画板 / 37 个页面 / 76 个全局色板 / 47 个导出切片**。
> **生成时间**：2026-11-11。旧版 `design.md` 已备份为 `design.md.bak-2026-11-11`。

---

## 0. 落地约定（先读这一节）

1. **不要做 2x 换算**。导出数据 `resolution = 1`，文中所有 px 就是设计稿里的 px。
2. **优先用语义 Token，不要直接写裸色值**：主色用 `--brand-main`，成功/信息/警告/错误各用一组，中性色用 `Grey N%`。语义 Token 见 [附录 A](#附录-acss-token可直接复制)。
3. **状态必须成套实现**：`Normal → Hover → Active → Disable`，输入类再加 `Filled / 错误 / 正确`，按钮再加 `加载中`。只做默认态视为不符合规范。
4. **字体栈**：设计稿主体为 `Microsoft YaHei`（2060 个文本图层），另有 `PingFang SC`（589）、`Helvetica Neue`（504）、`Arial`（78）、`PT Mono`（4）。前端建议 `"Microsoft YaHei", "PingFang SC", "Helvetica Neue", Arial, sans-serif`；等宽/代码场景用 `PT Mono`。
5. **栅格按画布选**：1440 画布用 16px 列间距，1920 居中布局用 24px；左侧导航固定 224px、顶栏 48px。
6. **组件按 Atomic Design 三层引用**：ATOMS（颜色/阴影/栅格/图标/字体/文案）→ MOLECULES（21 类分子组件）→ ORGANISMS（7 类组织组件）。
7. **一处已知的标注不一致**：封面写 `VERSION 1.0.0 | May 2021`，但更新记录最后是 `V0.0.4 / 2021.09.15`。引用版本号时以更新记录为准，或向规范维护人确认后统一。

---

## 1. 文件结构与页面索引

### 1.1 本地网页的目录

| 路径 | 内容 | 数量 |
|---|---|---|
| `index.html` | MeaXure 交互标注主页面，内嵌完整 JSON 数据 | 5.4 MB |
| `proto.html` | 跳转入口，重定向到 `index.html#p` | 1 |
| `links/` | 每个画板的独立入口页（重定向到 `index.html#N`） | 57 个 html |
| `preview/` | 画板预览图 57 张 + `preview/icons/` 缩略图 57 张 | 114 张 png |
| `assets/` | 图标与切片资源，24×24 为主；含 `Balloon 气泡/Tooltips/Top/Left.png` 子目录切片 | 44 个文件（43 顶层 + 1 子目录） |
| `design-spec/SmartClass-设计规范.html` | 2026-10-29 整理的网页版摘要（色彩/阴影/字体/栅格/组件总览） | 1 |
| `design-spec/_shots/` | 上述网页的桌面/移动截图 | 9 张 |

> `design-spec/` 是后人整理的**摘要页**，不是原始规范；两者冲突时以 `index.html` 的图层数据为准。

### 1.2 37 个页面 / 57 个画板

- **Cover 封面** — Cover / Update Record
- **----ATOMS 原子组件----** — ATOMS 原子组件
- **Color 颜色** — Color / Shadow
- **Grid 布局** — Grid-Left-1440 / Grid-Left-1920 / Grid-Middle / Grid-Middle-1920
- **Icon 图标** — Icon
- **Typeface 字体** — Typeface
- **Copywriting 文案** — Syntax / Words
- **----MOLECULES 分子组件----** — MOLECULES 分子组件
- **Badge 徽标** — Badge
- **Balloon 气泡** — Balloon / Case
- **Button 按钮** — Case / 按钮
- **Breadcrumb 面包屑** — Breadcrumb / Case
- **Checkbox 勾选** — Checkbox
- **Date Picker 日期选择器** — 单日期选择 / 范围日期
- **Radio 单选** — Radio
- **Switch 开关** — Switch
- **Input 输入框** — Case / Input
- **Loading 加载** — Loading
- **Line 分割线** — Line
- **Link 文字连接** — Case / Link
- **Menu 菜单** — Case / Menu
- **Message Notice 信息提示** — Case / Message
- **Pagination 分页** — Pagination
- **Search 搜索** — Case / Search
- **Select 下拉选择** — Case / Select
- **Tab 切换器** — Case / Tab
- **Table 表格** — Case / Table
- **Tree 结构树** — Tree
- **Transfer 穿梭框** — Transfer
- **----ORGANISMS 组织组件----** — ORGANISMS 组织组件
- **Dialog 模态弹窗** — Dialog
- **FileUpload 文件上传** — Case / FileUpload
- **Login 登录** — Login
- **Navbar 导航栏** — Navbar
- **Player 播放器** — Player
- **Preview 预览** — Preview
- **Sidebar 侧边栏** — Case / Sidebar

完整画板索引（编号与 `links/` 的 `#N` 对应）见 [附录 C](#附录-c57-个画板索引)。

---

## 2. 设计原则

以下四条是从规范结构归纳的使用原则，不是设计稿原文：

- **语义先行**：颜色先按「品牌 / 成功 / 信息 / 警告 / 错误 / 中性」语义分类，再谈色相。功能色一律配 10% 背景 + 主色 + hover + click 四档。
- **状态完整**：几乎每个组件画板都完整列出 Normal / Hover / Active / Disable，边缘状态不是补丁而是规范的一部分。
- **尺寸成档**：按钮 L/M/S/XS、徽标 M/S/XS、开关 M/S，避免随手给宽高。
- **层级可组合**：原子 → 分子 → 组织三层，组织组件（弹窗、文件上传、登录等）由分子组件拼装，不另起一套样式。

---

## 3. 色彩系统

### 3.1 品牌色 Brand Color

| 角色 | Sketch 色板名 | HEX | RGB | CMYK | 用途（画板原文） |
|---|---|---|---|---|---|
| 品牌主色 Main color | `Aquamarine/JOYWISE BLUE` | `#098C9D` | 9, 140, 157 | 80, 30, 35, 0 | 产品的主色调 |
| 悬停色 Hover color | `Aquamarine/PANTONE 2231 C` | `#007C91` | 0, 124, 145 | 100, 5, 40, 21 | 按钮 hover 等功能的底色 |
| 点击色 Click color | `Aquamarine/PANTONE 2224 C` | `#006980` | 0, 105, 128 | 96, 0, 31, 57 | 按钮按下等功能的底色 |
| 高亮色 Highlight color | `Aquamarine/PANTONE 319 C` | `#2DCCD3` | 45, 204, 211 | 59, 0, 22, 0 | **小面积高亮，请勿大面积使用** |

品牌色另有 10% / 20% / 50% 三档透明度变体。下表左侧为 CSS 的 `#RRGGBBAA` 写法，右侧为 MeaXure 导出的 `#AARRGGBB` 写法，二者是同一颜色的两种记法：

| 不透明度 | CSS `#RRGGBBAA` | Sketch / MeaXure `#AARRGGBB` |
|---|---|---|
| 10% | `#098C9D1A` | `#1A098C9D` |
| 20% | `#098C9D33` | `#33098C9D` |
| 50% | `#098C9D80` | `#80098C9D` |

### 3.2 功能色 Function Color

每组四档：`10% 背景` → `主色` → `hover` → `click`，用途取自画板标注。

| 语义 | 10% 背景 | 主色（PANTONE） | Hover | Click | 典型用途 |
|---|---|---|---|---|---|
| 成功 Success | `#43B02A10` | `#43B02A`（361 C） | `#009639`（355 C） | `#007A33`（356 C） | 操作成功，请勿大面积使用 |
| 信息 / 链接 Info | `#0085CA10` | `#0085CA`（Process Blue C） | `#006BA6`（307 C） | `#004F71`（3025 C） | 按钮、链接、信息提示 |
| 警示 Warning | `#F2A90010` | `#F2A900`（130 C） | `#CC8A00`（131 C） | `#AF6D04`（139 C） | 警示、提示 |
| 错误 Error | `#D2263010` | `#D22630`（1795 C） | `#AF272F`（1805 C） | `#7C2529`（1815 C） | 操作错误、失败、删除 |

> **透明度写法注意**：画板上写的是 `#43B02A10` 这类 8 位简写，但 Sketch 实际 10% 不透明度对应 alpha `0x1A`（MeaXure 导出的 `argb-hex` 为 `#1A43B02A`）。**CSS 请统一写 `rgba(r,g,b,0.10)`**，不要照抄 8 位尾数。

### 3.3 辅助色 Auxiliary color

| HEX | 画板标注 |
|---|---|
| `#009CA6` | PANTONE 320 C |
| `#0085CA` | PANTONE Process Blue C |
| `#8031A7` | 画板标注 PANTONE 355 C（与色值不符，实际应为 527 C，属原稿笔误） |
| `#D22630` | PANTONE 1795 C |
| `#FF671F` | PANTONE 165 C |
| `#F2A900` | PANTONE 130 C |
| `#C4D600` | PANTONE 382 C |
| `#43B02A` | PANTONE 361 C |

### 3.4 品牌色板 Palette（8 色系 × 12 级）

每系从主色开始由浅到深共 12 级，级 1 为主色。表中顺序即 1 → 12 级。

| 色系 | 12 级色值 |
|---|---|
| 青蓝 Teal | `#008CA0` · `#0098A2` · `#00949D` · `#009199` · `#008D95` · `#008990` · `#00858C` · `#008288` · `#007E84` · `#007A7F` · `#00777B` · `#007377` |
| 蓝色 Blue | `#0085CA` · `#0080C2` · `#007BB9` · `#0076B1` · `#0071A9` · `#006CA0` · `#006798` · `#006290` · `#005D88` · `#005880` · `#005479` · `#004F71` |
| 紫色 Purple | `#8031A7` · `#7C31A0` · `#793199` · `#753093` · `#71308C` · `#6D2F85` · `#6A2F7F` · `#662E78` · `#622E72` · `#5E2D6C` · `#5B2D65` · `#572C5F` |
| 红色 Red | `#D22630` · `#CA272F` · `#C2272F` · `#BA272E` · `#B2272E` · `#AA272D` · `#A2272C` · `#9A272C` · `#93272B` · `#8B262A` · `#84262A` · `#7C2529` |
| 橙色 Orange | `#FF671F` · `#F9651F` · `#F3631F` · `#ED621E` · `#E7601E` · `#E15E1E` · `#DB5C1E` · `#D55A1D` · `#CF581D` · `#CA571D` · `#C4551C` · `#BE531C` |
| 黄色 Yellow | `#F2A900` · `#ECA301` · `#E69E01` · `#DF9802` · `#D99302` · `#D38D03` · `#CD8803` · `#C78203` · `#C17D03` · `#BB7804` · `#B57204` · `#AF6D04` |
| 青柠 Lime | `#C4D600` · `#C0D000` · `#BBC900` · `#B7C300` · `#B2BD00` · `#AEB700` · `#AAB100` · `#A5AB00` · `#A1A500` · `#9D9F00` · `#989900` · `#949300` |
| 绿色 Green | `#43B02A` · `#3FAB2B` · `#3AA62D` · `#35A12E` · `#319C2F` · `#2C9730` · `#279230` · `#218D31` · `#1B8832` · `#148432` · `#0B7F33` · `#007A33` |

### 3.5 中性色 Neutral color（15 级）

命名中的 `Grey N%` 表示**含黑量**，N 越大越深；`Grey 2%` 最浅、`Black` 最深。

| 名称 | HEX | 常见用途 |
|---|---|---|
| White | `#FFFFFF` | 卡片/页面白底、反白文字 |
| Grey 2% | `#FAFAFA` | 页面背景 |
| Grey 4% | `#F5F5F5` | 分割区域、禁用底色 |
| Grey 6% | `#F0F0F0` | 输入框底色 |
| Grey 8% | `#EBEBEB` | 边框 / 禁用态 / Border 文字色 |
| Grey 10% | `#E6E6E6` | 边框线 |
| Grey 20% | `#CCCCCC` | 占位/次要文字（Grey 20%） |
| Grey 30% | `#B3B3B3` | 辅助图标 |
| Grey 40% | `#999999` | 辅助说明文字 |
| Grey 50% | `#808080` | 正文主体（Grey 50%） |
| Grey 60% | `#666666` | 正文强调 |
| Grey 70% | `#4D4D4D` | 小标题 |
| Grey 80% | `#333333` | 标题（Grey 80%） |
| Grey 90% | `#1A1A1A` | 最高层级标题 |
| Black | `#000000` | 纯黑场景 |

> 另有一个未列入 15 级色阶、但在图层中出现的 `#D8D8D8`，用于辅助边框。

### 3.6 76 个全局色板名 → HEX

Sketch 文件用 PANTONE / 灰度百分比命名色板，前端命名 Token 时建议保留这层映射。完整清单见 [附录 B](#附录-b全局色板映射76-个)。

---

## 4. 阴影系统

阴影色统一为 `#262626` 加不同透明度，X 偏移与扩散均为 0。

| Token | 级别 | X / Y | 模糊 Blur | 颜色（画板） | CSS |
|---|---|---|---|---|---|
| `shadow-01` | S1 | 0 / 1px | 5px | `#26262610` | `0 1px 5px 0 rgba(38,38,38,0.10)` |
| `shadow-02` | S2 | 0 / 6px | 18px | `#26262614` | `0 6px 18px 0 rgba(38,38,38,0.14)` |
| `shadow-03` | S3 | 0 / 10px | 32px | `#26262618` | `0 10px 32px 0 rgba(38,38,38,0.18)` |
| `shadow-04` | S4 | 0 / 12px | 42px | `#26262624` | `0 12px 42px 0 rgba(38,38,38,0.24)` |

层级建议：S1 卡片默认 → S2 下拉/悬浮卡片 → S3 弹窗与大浮层 → S4 最高层级模态框。阴影层级应与元素层级一一对应，避免叠加。

---

## 5. 字体排版

### 5.1 字阶（10 级，每级 Regular / Bold 两款）

| 层级 | 字号 / 行高 | 字重 | Sketch 样式组 | 适用场景 |
|---|---|---|---|---|
| 特殊标题 Special Title | 68 / 76 | Regular · Bold | `01_特殊标题` | 特大标题、空状态插画文字 |
| 特殊标题 | 56 / 64 | Regular · Bold | `01_特殊标题` | 大页面主标题 |
| 特殊标题 | 46 / 54 | Regular · Bold | `01_特殊标题` | 一级页面标题 |
| 特殊标题 | 38 / 46 | Regular · Bold | `01_特殊标题` | 二级板块标题 |
| 特殊标题 | 30 / 38 | Regular · Bold | `01_特殊标题` | 三级板块标题 |
| 大标题 Large Title | 24 / 32 | Regular · Bold | `02_大标题` | 卡片标题、模块标题 |
| 小标题 Title | 20 / 28 | Regular · Bold | `03_小标题` | 小节标题、表单标题 |
| 顶端 Head | 16 / 24 | Regular · Bold | `04_顶端 Head` | 导航标题、列表项标题、规范表格正文 |
| 正文 Body | 14 / 22 | Regular · Bold | `05_正文 Body` | 正文、按钮文字（全稿最高频字号） |
| 辅助文字 Caption | 12 / 20 | Regular · Bold | `06_辅助文字` | 辅助说明、标签、注释 |

> 规范中 68/56/46/38/30 五档共用 `特殊标题 Special Title` 样式组名，靠字号区分；行高统一为「字号 + 8px」。另有个别标注/角标用到 10px、18px、26px。

### 5.2 语义文字色

取自 `Typeface` 画板示例文本图层的实测 `color`，并与中性色阶对齐：

| 语义 | 画板标注 | 实测 HEX | 说明 |
|---|---|---|---|
| 成功 Success | PANTONE 361 C | `#43B02A` | 成功提示文字 |
| 错误 Error | PANTONE 1795 C | `#D22630` | 错误/校验失败文字 |
| 警示 Warning | PANTONE 130 C | `#F2A900` | 警示文字 |
| 链接 Links | PANTONE Process Blue C | `#0085CA` | 文字链接，hover 加下划线 |
| 正文 Body | Grey 50% | `#808080` | 正文默认色 |
| 次要正文 | Grey 20% | `#CCCCCC` | 弱化文字 |
| 边框 Border | Grey 8% | `#EBEBEB` | 边框/禁用文字 |
| 反白 White | White | `#FFFFFF` | 深色底上的文字 |

> 旧版 `design.md` 曾把「Grey 50%」写成 `#999999`、「Grey 20%」写成 `#333333`，与色阶表不符；此处按中性色画板与示例图层实测值更正。

---

## 6. 布局栅格

### 6.1 四种画布规格

| 画板 | 画布 | 侧栏 | 顶栏 | 内容区 X / 宽 | 列起点 X | 列间距 |
|---|---|---|---|---|---|---|
| `Grid-Left-1440` | 1440 | 224 | 48 | 248 / 1168 | 264 | 16 |
| `Grid-Left-1920` | 1920 | 224 | 48 | 256 / 1584 | 288 | 16 |
| `Grid-Middle` | 1440 | — | 48 | 104 / 1232 | 104 | 16 |
| `Grid-Middle-1920` | 1920 | — | 48 | 60 / 1800 | 60 | 24 |

### 6.2 列宽（3 / 4 / 6 列）

| 画板 | 3 列单宽 | 4 列单宽 | 6 列单宽 |
|---|---|---|---|
| `Grid-Left-1440` | 368 | 272 | 176 |
| `Grid-Left-1920` | 496 | 368 | 240 |
| `Grid-Middle`（1440 居中） | 400 | 296 | 192 |
| `Grid-Middle-1920` | 584 | 432 | 280 |

校核示例：1440 居中 `3×400 + 2×16 = 1232`；1920 居中 `3×584 + 2×24 = 1800`；1920 左布局 `3×496 + 2×16 + 左右各 32 内边距 = 1584`。

### 6.3 通用间距与圆角

从各组件画板的图层矩形统计得到的高频值：

| 项 | 值 | 来源 |
|---|---|---|
| 按钮高度档 | 48 / 40 / 32 / 24（L / M / S / XS） | `按钮` 画板高频矩形 |
| 按钮最小宽度参考 | 88（M）、80（S）、64（XS）、120（L） | 同上 |
| 按钮圆角 | 2（常规）；4 / 12 / 16 / 24（Fillet 圆角款） | 同上 |
| 按钮间距 | 16px 常规 / 8px 紧凑；重要操作靠近容器边缘；容器 ≤320px 可拉伸按钮 | `Button/Case` 画板标注 |
| 输入框高度 / 圆角 | 36px / 4px | `Input` 画板 |
| 表格行高 / 表头 | 36px | `Table` 画板 |
| 分页页码 | 28×28，圆角 4px | `Pagination` 画板 |
| 弹窗 | 宽 640–1080px，最小高 104px、最大高 560px，圆角 6px | `Dialog` 画板 |
| 弹窗文案上限 | 标题单行 14 汉字（28 字符）、正文 3 行 60 汉字（120 字符）、按钮文字单行 16 汉字（32 字符） | `Dialog` 画板 |
| 全局提示条 | 高度 88 / 96px，宽度 Min 92px / Max 956px | `Message` 画板 |
| 分割线 | 实线 / 虚线；线宽 4px、间距 8px（画板标注） | `Line` 画板 |

---

## 7. 图标系统

- **尺寸**：主要图标 24×24 px；`icon-start-date.svg` 为 16×16。
- **风格**：`*-Outlined`（线性，常规/未选中）与 `*-Filled`（面性，选中/激活/强调）成对出现，例如 `Check2-Outlined` / `CheckCircle-Filled`、`Play-Filled` / `Pause-Filled`、`Volume-Filled` / `VolumeSilence-Filled`。
- **导出**：MeaXure 共 47 个切片（46 PNG + 1 SVG），`assets/` 中实际落地 44 个文件。
- **常用清单**：`Search`、`Plus`、`Edit`、`Delete`、`Refresh`、`Loading`、`Eye`、`Close`、`Check2`、`QuestionCircle`、`ExclamationCircle`（Outlined/Filled）、`Calendar`、`Links`、`Reply`、`CaretDown/Right/Up`、`Left2/Right2/Up2/Down2`、`LeftCircle/RightCircle`、`Play/Pause/PlayCircle`、`Fullscreen/FullscreenExit`（含 2/3 变体）、`Volume/VolumeSilence`、`User`、`AfterclassAudio/Doc/Video`。

---

## 8. 组件规范

### 8.1 通用状态机

| 状态 | 画板用词 | 说明 |
|---|---|---|
| 默认 | `Normal` / `默认` | 基础态 |
| 悬停 | `Hover` / `鼠标经过` | 底色换 hover 档 |
| 按下 / 激活 | `Active` / `点击` / `On State` | 底色换 click 档或选中态 |
| 禁用 | `Disable` / `不可用` | 灰阶 + 不可交互 |
| 输入中 / 已填 | `Typing` / `Filled` | 输入类专有 |
| 加载中 | `加载中` | 按钮/播放器显示加载指示 |
| 校验 | `错误` / `正确` | 输入框反馈信息 |

### 8.2 分子组件 Molecules（21 类）

| 组件 | 画板 # | 变体 / 尺寸 | 状态 | 关键约束 |
|---|---|---|---|---|
| Badge 徽标 | 15 | Size M / S / XS；默认 / 应用 / 极值 | — | 数字超过 99 显示 `99+` |
| Balloon 气泡 | 16–17 | Tooltips 12 方位（Top / Right / Bottom / Left × Left / Middle / Right） | — | 带指向箭头，白底 + `shadow-01` |
| Button 按钮 | 18–19 | Primary / Secondary / Fillet / Icon；Warning / Error / Success；L / M / S / XS | 默认 / 鼠标经过 / 点击 / 不可用 / 加载中 | 高度 48/40/32/24，圆角 2px，间距 16/8px |
| Breadcrumb 面包屑 | 20–21 | 基础样式 + Case | — | 最后一级为当前页，不可点击 |
| Checkbox 勾选 | 22 | Off / On / Mix（半选） | Normal / Hover / Active / Disable | 方形勾选态 |
| Date Picker 日期选择器 | 23–24 | 单日期 / 范围日期 | — | 面板带 `shadow-02`，可配快捷选项 |
| Radio 单选 | 25 | Off / On | Normal / Hover / Active / Disable | 圆形选中态 |
| Switch 开关 | 26 | Size M / S；On State / Off State | Normal / Hover / Active / Disable | 开启态用成功色 |
| Input 输入框 | 27–28 | 仅文字 / 前置图标 / 后置图标 / 前后图标 / 前缀 / 可切换前缀 / 后缀 / 密码输入 | Normal / Hover / Active / Filled / Disable；错误 / 正确 | 高 36px、圆角 4px，聚焦品牌色边框 |
| Loading 加载 | 29 | 页面 / 局部 | — | 旋转指示器 |
| Line 分割线 | 30 | 实线 / 虚线 | — | 1px 常用，默认 `#E6E6E6` |
| Link 文字连接 | 31–32 | 常规型 / 强调型 | Normal / Hover / Active（已点击过） | `#0085CA`，hover 下划线 |
| Menu 菜单 | 33–34 | 普通菜单 / 层级菜单 | Normal / Hover / Active / Disable | 选项支持图标、禁用、分组，带 `shadow-02` |
| Message Notice 信息提示 | 35–36 | GLOBAL 全局 / INLINE 行内；正确 / 错误 / 警告 / 主题色 / 普通 | — | 高度 88/96px，宽 Min 92 / Max 956px |
| Pagination 分页 | 37 | FULL 完整型 / COMPACT 精简型；带输入框 / 带总计数 / 带页面显示量 / 页数过多 | Normal | 28×28 页码、圆角 4px；`10条/页` |
| Search 搜索 | 38–39 | 普通 / 圆角居中 / 动态 | Normal / Hover / Active / Filled / Disable | 支持清除 |
| Select 下拉选择 | 40–41 | 普通 / 带搜索栏 | Normal / Hover / Active / Typing / Disable | 菜单条目间距 4 / 12px，`shadow-02` |
| Tab 切换器 | 42–43 | HORIZONTAL / VERTICAL / FILLET；文字 / 带图标 / 带操作 / 带徽标 | Normal / Hover / Active / Disable / On State | 选中态品牌色文字 + 指示线 |
| Table 表格 | 44–45 | 普通表格 / 可操作表格（单选、多选）/ Case | Normal / Hover / Active / Disable | 表头与行高 36px，支持排序、编辑、删除 |
| Tree 结构树 | 46 | 基础组件 / 扩展组件（导航、通用、信息录入） | — | 展开折叠、节点选中、层级连线 |
| Transfer 穿梭框 | 47 | 源列表 / 目的列表 | 未选中 / 选中 / 失效 | 双栏移动，支持搜索 |

### 8.3 组织组件 Organisms（7 类）

| 组件 | 画板 # | 变体 | 关键约束 |
|---|---|---|---|
| Dialog 模态弹窗 | 49 | 基础弹窗 | 宽 640–1080px、高 104–560px、圆角 6px、遮罩 + `shadow-04`；标题/正文/按钮字数上限见 §6.3；确认/取消按钮组 |
| FileUpload 文件上传 | 50–51 | 本地上传 / 资源库 | 上传中 / 完成 / 失败 / 重新上传；删除资源、关闭窗口均需二次确认 |
| Login 登录 | 52 | 账号登录 / 微信登录 | 下次自动登录；账号或密码错误、验证码错误、账号不存在、关联校内组织账号等错误态 |
| Navbar 导航栏 | 53 | LIGHT / DARK | Normal / Hover / Active / Disable / On State；高度 48px（与栅格顶栏一致） |
| Player 播放器 | 54 | 窗口模式 / 全屏 | 倍速 0.5X / 1X / 1.5X / 2X，清晰度 标清/高清/超清/4K；加载中、无法播放、重播、定位播放 |
| Preview 预览 | 55 | 窗口模式 / 全屏 | 视频 `.mp4` / 音频 `.mp3` / 图片 `.jpg`，与播放器共用控件 |
| Sidebar 侧边栏 | 56–57 | LIGHT / DARK；一级 / 二级导航 | 宽 224px；Normal / Hover / Active / Disable / On State |

---

## 9. 文案规范

原始规范用两张 1440×3160 的大画板承载文案规则：`Syntax 语法`（412 图层）与 `Words 用词`（858 图层）。以下条目沿用既有整理稿，**落地前请对照这两张画板逐条复核**。

| 场景 | 规范用词 | 避免使用 |
|---|---|---|
| 确认操作 | 确定 / 确认 | 好的 / 嗯 |
| 取消操作 | 取消 | 算了 / 不要 |
| 删除确认 | 确认删除？ | 真的要删吗？ |
| 成功提示 | 操作成功 | 搞定了 |
| 失败提示 | 操作失败，请重试 | 出错了 |
| 保存 / 提交 | 保存 / 提交 | 存一下 / 发上去 |
| 加载中 | 加载中... | 等等... |
| 暂无数据 | 暂无数据 | 空的 |

语法要点：按钮文字不超过 4 个字；操作类按钮用动词开头；避免口语化；中英文之间留半角空格；数字与单位之间留空格；中文用全角标点、英文用半角。按钮文案里的「确 定 / 取 消」在画板中用全角空格撑开，实现时以 `letter-spacing` 或等宽处理，不要写入真实空格。

---

## 10. 版本更新记录（原稿 `Update Record` 画板）

| 版本 | 人员 | 内容概述 | 更新时间 |
|---|---|---|---|
| V0.0.1 | 王家彬 | 更新全文：新增配色、字体、布局规范；新增徽标、气泡、按钮、面包屑、勾选框、模态弹窗、日期选择、文件上传、单选、输入框、开关、菜单、加载、文字链接、信息提醒、分页、搜索、下拉选择、侧边栏、切换器、表格等组件库 | 2021.05.06 |
| V0.0.2 | 王家彬 | 修改按钮规范：统一横向和纵向按钮宽度、间距，删除适配 Windows 特殊布局 | 2021.05.24 |
| V0.0.3 | 王家彬 | 新增文案规范、导航栏、侧边栏、穿梭框组件；表格组件修改 | 2021.07.28 |
| V0.0.4 | 王家彬 | 新增文件上传、登录、播放器、预览组件；新增图标 | 2021.09.15 |

---

## 11. 维护与校验

- **重新生成/核对数据**：`index.html` 的 `<body>` 内第一个 `<script>` 中有 `let data = {...};`，用 `json.JSONDecoder().raw_decode()` 从 `let data = ` 之后截取即可（尾部还有 `meaxure.render(data)`，不能用整段 `split` 解析）。
- **数据规模**：`resolution=1`、`unit=px`、`colorFormat=color-hex`；`artboards=57`、`slices=47`、`colors=76`、`languages=zh-cn / zh-tw`。
- **画板预览**：`preview/` 下按画板名出图；`links/` 下每个 html 是 `../index.html#N` 的跳转页，N 对应附录 C 的编号。
- **网页摘要**：`design-spec/SmartClass-设计规范.html` 是 2026-10-29 的再整理版本，改设计规范时应同步更新，避免两份说明分叉。

---

## 附录 A：CSS Token（可直接复制）

```css
:root {
  /* 品牌色 */
  --brand-main: #098C9D;
  --brand-hover: #007C91;
  --brand-click: #006980;
  --brand-highlight: #2DCCD3;   /* 仅小面积使用 */

  /* 功能色：bg 用 rgba 表达 10% 不透明度 */
  --success: #43B02A;  --success-bg: rgba(67,176,42,.10);
  --success-hover: #009639;  --success-click: #007A33;
  --info: #0085CA;     --info-bg: rgba(0,133,202,.10);
  --info-hover: #006BA6;  --info-click: #004F71;
  --warning: #F2A900;  --warning-bg: rgba(242,169,0,.10);
  --warning-hover: #CC8A00;  --warning-click: #AF6D04;
  --error: #D22630;    --error-bg: rgba(210,38,48,.10);
  --error-hover: #AF272F;  --error-click: #7C2529;

  /* 中性色：Grey N% = 含黑量 */
  --white: #FFFFFF;
  --gray-2: #FAFAFA;   --gray-4: #F5F5F5;   --gray-6: #F0F0F0;
  --gray-8: #EBEBEB;   --gray-10: #E6E6E6;  --gray-20: #CCCCCC;
  --gray-30: #B3B3B3;  --gray-40: #999999;  --gray-50: #808080;
  --gray-60: #666666;  --gray-70: #4D4D4D;  --gray-80: #333333;
  --gray-90: #1A1A1A;  --black: #000000;

  /* 阴影 */
  --shadow-01: 0 1px 5px 0 rgba(38,38,38,.10);
  --shadow-02: 0 6px 18px 0 rgba(38,38,38,.14);
  --shadow-03: 0 10px 32px 0 rgba(38,38,38,.18);
  --shadow-04: 0 12px 42px 0 rgba(38,38,38,.24);

  /* 圆角 / 栅格 / 尺寸 */
  --radius-sm: 2px;  --radius-md: 4px;  --radius-lg: 6px;
  --gutter-1440: 16px;  --gutter-1920-middle: 24px;
  --sidebar-width: 224px;  --navbar-height: 48px;
  --control-height: 36px;  --table-row-height: 36px;
  --btn-l: 48px;  --btn-m: 40px;  --btn-s: 32px;  --btn-xs: 24px;

  /* 字阶 */
  --font-family: "Microsoft YaHei", "PingFang SC", "Helvetica Neue", Arial, sans-serif;
  --text-body: 14px/22px;  --text-caption: 12px/20px;  --text-head: 16px/24px;
  --text-title: 20px/28px; --text-large-title: 24px/32px;
}
```

---

## 附录 B：全局色板映射（76 个）

**Orange**
- `#F2A900` — Orange/PANTONE 130 C
- `#F79B2E` — Orange/PANTONE 130 U
- `#F2A900` — Orange/PANTONE 130 C 10%
- `#F2A900` — Orange/PANTONE 130 C 20%
- `#F2A900` — Orange/PANTONE 130 C 30%
- `#AF6D04` — Orange/PANTONE 139 C
- `#CC8A00` — Orange/PANTONE 131 C
**OrangeRed**
- `#FF671F` — OrangeRed/PANTONE 165 C
- `#FF671F` — OrangeRed/PANTONE 165 C 10%
- `#FF671F` — OrangeRed/PANTONE 165 C 50%
- `#FF671F` — OrangeRed/PANTONE 165 C 20%
- `#FF7548` — OrangeRed/PANTONE 165 U
- `#BE531C` — OrangeRed/PANTONE 167 C
- `#E35205` — OrangeRed/PANTONE 166 C
**Blue**
- `#0085CA` — Blue/PANTONE Process Blue C
- `#0085CA` — Blue/PANTONE Process Blue C 10%
- `#0085CA` — Blue/PANTONE Process Blue C 20%
- `#0085CA` — Blue/PANTONE Process Blue C 50%
- `#0083C3` — Blue/PANTONE Process Blue U
- `#006BA6` — Blue/PANTONE 307 C
- `#004F71` — Blue/PANTONE 3025 C
**Aquamarine**
- `#007C91` — Aquamarine/PANTONE 2231 C
- `#006980` — Aquamarine/PANTONE 2224 C
- `#25C9D0` — Aquamarine/PANTONE 319 U
- `#2DCCD3` — Aquamarine/PANTONE 319 C
- `#2DCCD3` — Aquamarine/PANTONE 319 C 10%
- `#2DCCD3` — Aquamarine/PANTONE 319 C 50%
- `#2DCCD3` — Aquamarine/PANTONE 319 C 20%
- `#004851` — Aquamarine/PANTONE 316 C
- `#098C9D` — Aquamarine/JOYWISE BLUE
- `#008CA0` — Aquamarine/PANTONE 2230 C
- `#1992A4` — Aquamarine/PANTONE 2230 U
- `#098C9D` — Aquamarine/JOYWISE BLUE 50%
- `#098C9D` — Aquamarine/JOYWISE BLUE 20%
- `#098C9D` — Aquamarine/JOYWISE BLUE 10%
**Green**
- `#43B02A` — Green/PANTONE 361 C
- `#43B02A` — Green/PANTONE 361 C 50%
- `#43B02A` — Green/PANTONE 361 C 10%
- `#43B02A` — Green/PANTONE 361 C 20%
- `#4DAA50` — Green/PANTONE 361 U
- `#007A33` — Green/PANTONE 356 C
- `#009639` — Green/PANTONE 355 C
**GrassGreen**
- `#A8AD00` — GrassGreen/PANTONE 383 C
- `#C4D600` — GrassGreen/PANTONE 382 C 50%
- `#C4D600` — GrassGreen/PANTONE 382 C 10%
- `#C4D600` — GrassGreen/PANTONE 382 C 20%
- `#99C221` — GrassGreen/PANTONE 382 U
- `#949300` — GrassGreen/PANTONE 384 C
- `#C4D600` — GrassGreen/PANTONE 382 C
**Red**
- `#D22630` — Red/PANTONE 1795 C
- `#D22630` — Red/PANTONE 1795 C 10%
- `#D22630` — Red/PANTONE 1795 C 20%
- `#AF272F` — Red/PANTONE 1805 C
- `#7C2529` — Red/PANTONE 1815 C
**Gray**
- `#000000` — Gray/#Gray 100% (Black)
- `#1A1A1A` — Gray/#Gray 90%
- `#333333` — Gray/#Gray 80%
- `#4D4D4D` — Gray/#Gray 70%
- `#666666` — Gray/#Gray 60%
- `#808080` — Gray/#Gray 50%
- `#999999` — Gray/#Gray 40%
- `#B3B3B3` — Gray/#Gray 30%
- `#CCCCCC` — Gray/#Gray 20%
- `#E6E6E6` — Gray/#Gray 10%
- `#EBEBEB` — Gray/#Gray 8%
- `#FAFAFA` — Gray/#Gray 2%
- `#FFFFFF` — Gray/#Gray 0% (White)
- `#F0F0F0` — Gray/#Gray 6%
- `#F5F5F5` — Gray/#Gray 4%
**Purple**
- `#8031A7` — Purple/PANTONE 527 C
- `#702F8A` — Purple/PANTONE 526 C
- `#572C5F` — Purple/PANTONE 525 C
- `#8031A7` — Purple/PANTONE 527 C 10%
- `#8031A7` — Purple/PANTONE 527 C 20%
- `#8031A7` — Purple/PANTONE 527 C 50%
- `#9361B0` — Purple/PANTONE 527 U

---

## 附录 C：57 个画板索引

| # | 页面 | 画板 | 尺寸 | 图层数 |
|---|---|---|---|---|
| 1 | Cover 封面 | Cover | 1440 × 960 | 5 |
| 2 | Cover 封面 | Update Record | 1440 × 960 | 27 |
| 3 | ----ATOMS 原子组件---- | ATOMS 原子组件 | 1440 × 32 | 0 |
| 4 | Color 颜色 | Color | 1440 × 2400 | 307 |
| 5 | Color 颜色 | Shadow | 2000 × 1704 | 83 |
| 6 | Grid 布局 | Grid-Left-1440 | 1440 × 900 | 23 |
| 7 | Grid 布局 | Grid-Left-1920 | 1920 × 900 | 25 |
| 8 | Grid 布局 | Grid-Middle | 1440 × 900 | 22 |
| 9 | Grid 布局 | Grid-Middle-1920 | 1920 × 900 | 22 |
| 10 | Icon 图标 | Icon | 1440 × 2400 | 3 |
| 11 | Typeface 字体 | Typeface | 2000 × 1740 | 79 |
| 12 | Copywriting 文案 | Syntax | 1440 × 3160 | 412 |
| 13 | Copywriting 文案 | Words | 1440 × 3160 | 858 |
| 14 | ----MOLECULES 分子组件---- | MOLECULES 分子组件 | 1440 × 32 | 0 |
| 15 | Badge 徽标 | Badge | 1440 × 960 | 67 |
| 16 | Balloon 气泡 | Balloon | 1440 × 960 | 61 |
| 17 | Balloon 气泡 | Case | 1440 × 960 | 58 |
| 18 | Button 按钮 | Case | 1440 × 2100 | 135 |
| 19 | Button 按钮 | 按钮 | 1440 × 6326 | 1104 |
| 20 | Breadcrumb 面包屑 | Breadcrumb | 1440 × 1425 | 199 |
| 21 | Breadcrumb 面包屑 | Case | 1440 × 1072 | 111 |
| 22 | Checkbox 勾选 | Checkbox | 1440 × 900 | 94 |
| 23 | Date Picker 日期选择器 | 单日期选择 | 1440 × 2830 | 870 |
| 24 | Date Picker 日期选择器 | 范围日期 | 1440 × 1680 | 604 |
| 25 | Radio 单选 | Radio | 1440 × 880 | 72 |
| 26 | Switch 开关 | Switch | 1440 × 880 | 82 |
| 27 | Input 输入框 | Case | 1440 × 944 | 56 |
| 28 | Input 输入框 | Input | 2880 × 2200 | 467 |
| 29 | Loading 加载 | Loading | 1440 × 880 | 12 |
| 30 | Line 分割线 | Line | 1440 × 880 | 18 |
| 31 | Link 文字连接 | Case | 1440 × 880 | 55 |
| 32 | Link 文字连接 | Link | 1440 × 880 | 28 |
| 33 | Menu 菜单 | Case | 1440 × 1954 | 208 |
| 34 | Menu 菜单 | Menu | 1440 × 1440 | 149 |
| 35 | Message Notice 信息提示 | Case | 1440 × 1240 | 100 |
| 36 | Message Notice 信息提示 | Message | 1440 × 1600 | 104 |
| 37 | Pagination 分页 | Pagination | 1440 × 1600 | 585 |
| 38 | Search 搜索 | Case | 1440 × 1100 | 61 |
| 39 | Search 搜索 | Search | 1440 × 1100 | 94 |
| 40 | Select 下拉选择 | Case | 1440 × 1100 | 65 |
| 41 | Select 下拉选择 | Select | 1440 × 1780 | 290 |
| 42 | Tab 切换器 | Case | 1440 × 800 | 41 |
| 43 | Tab 切换器 | Tab | 1440 × 2200 | 275 |
| 44 | Table 表格 | Case | 1440 × 960 | 578 |
| 45 | Table 表格 | Table | 1440 × 1440 | 324 |
| 46 | Tree 结构树 | Tree | 1440 × 900 | 84 |
| 47 | Transfer 穿梭框 | Transfer | 1440 × 900 | 148 |
| 48 | ----ORGANISMS 组织组件---- | ORGANISMS 组织组件 | 1440 × 32 | 0 |
| 49 | Dialog 模态弹窗 | Dialog | 1440 × 2900 | 191 |
| 50 | FileUpload 文件上传 | Case | 1440 × 1240 | 214 |
| 51 | FileUpload 文件上传 | FileUpload | 1440 × 3200 | 1002 |
| 52 | Login 登录 | Login | 1440 × 3200 | 205 |
| 53 | Navbar 导航栏 | Navbar | 1440 × 1700 | 92 |
| 54 | Player 播放器 | Player | 1440 × 1600 | 102 |
| 55 | Preview 预览 | Preview | 1440 × 2180 | 74 |
| 56 | Sidebar 侧边栏 | Case | 1440 × 1700 | 183 |
| 57 | Sidebar 侧边栏 | Sidebar | 1440 × 1700 | 107 |

---

*本文档由 `SmartClass UI Kit/index.html` 的 MeaXure 图层数据实测生成；带「归纳」「建议」「沿用」标注的内容为二次整理，其余均为原稿数据。*

