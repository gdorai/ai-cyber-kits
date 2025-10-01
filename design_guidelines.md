# Design Guidelines: Everyday Digital Safety & AI Checkpoint

## Design Approach: Trust-First Utility System

**Selected Framework**: Hybrid approach drawing from Linear's modern minimalism + Stripe's clarity + security-focused trust indicators

**Core Principle**: Professional credibility with approachable usability - security tools that feel powerful yet friendly for everyday users.

---

## Visual Identity

### Color Palette

**Light Mode:**
- Primary Brand: 220 85% 52% (confident blue - conveys trust and security)
- Surface: 0 0% 100% (clean white)
- Surface Secondary: 220 20% 97% (subtle off-white)
- Text Primary: 220 20% 15% (dark slate)
- Text Secondary: 220 15% 45% (medium gray)
- Success (Safe): 142 71% 45% (reassuring green)
- Warning (Medium Risk): 38 92% 50% (attention amber)
- Danger (High Risk): 0 84% 60% (alert red)
- Info Accent: 200 95% 50% (bright cyan for highlights)

**Dark Mode:**
- Primary Brand: 220 90% 58% (brighter blue for contrast)
- Surface: 220 20% 10% (deep charcoal)
- Surface Secondary: 220 18% 15% (slightly lighter charcoal)
- Text Primary: 220 10% 95% (near white)
- Text Secondary: 220 10% 70% (light gray)
- Success: 142 71% 50%
- Warning: 38 92% 55%
- Danger: 0 84% 65%
- Info Accent: 200 90% 55%

### Typography

**Font Stack**: 
- Primary: 'Inter' (Google Fonts) - clean, highly legible for UI
- Monospace: 'JetBrains Mono' (for code/technical displays)

**Scale**:
- Hero Title: text-5xl md:text-7xl, font-bold, tracking-tight
- Section Heading: text-3xl md:text-4xl, font-semibold
- Tool Card Title: text-xl md:text-2xl, font-semibold
- Body: text-base (16px), font-normal, leading-relaxed
- Small/Caption: text-sm, text-secondary
- Result Labels: text-xs uppercase tracking-wide font-medium

### Layout System

**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Component padding: p-6 to p-8
- Section spacing: py-16 md:py-24
- Card gaps: gap-6 to gap-8
- Container: max-w-7xl mx-auto px-6

---

## Page Structure

### Hero Section (50vh)
- Split layout: Left 60% (content), Right 40% (visual)
- **Image**: Abstract geometric pattern with circuit board elements overlaid with translucent security icons (shield, lock, checkmark) - conveys tech sophistication and protection
- Headline emphasizing "Everyday" + "Free" + "Instant"
- Subheading explaining the four tools
- Primary CTA: "Try Tools Below" (scroll anchor)
- Trust indicators strip: "100% Private • No Data Stored • Open Source"

### Tools Grid Section
- 2x2 grid on desktop (grid-cols-1 md:grid-cols-2), gap-8
- Each tool card is interactive preview:
  - Icon (use Heroicons)
  - Tool name + one-line description
  - Mini input preview (non-functional teaser)
  - "Try Tool" button → expands into full tool interface
- Visual hierarchy: Cards have subtle elevation (shadow-lg), hover state lifts (translate-y)

### Individual Tool Interfaces
**Consistent Pattern for All Four:**
1. **Input Section**: 
   - Large textarea or input field with clear placeholder
   - Supporting text explaining what to input
   - "Analyze" or "Check" primary button
   
2. **Results Section** (appears after analysis):
   - Risk meter/score visualization (horizontal bar with color gradient)
   - Breakdown cards showing specific findings
   - Explainability annotations (your research twist)
   - Action recommendations (bullet list with checkmarks)

3. **Educational Context**:
   - Collapsible "How This Works" section
   - Links to related resources

### Features Section (3-column grid)
- Column 1: "🔒 Privacy First" - No data stored, all processing local/ephemeral
- Column 2: "🧠 AI-Powered" - Research-backed detection algorithms
- Column 3: "📖 Educational" - Learn while you check

### Footer
- Links: About, Contact, Documentation, GitHub
- Newsletter signup: "Stay safe - get monthly security tips"
- Affiliation: University/Lab credit with logo

---

## Component Library

### Cards
- Border: border border-gray-200 dark:border-gray-700
- Radius: rounded-xl
- Padding: p-6 to p-8
- Elevation: shadow-md hover:shadow-xl transition-all
- Background: bg-surface with subtle gradient on hover

### Buttons
- Primary: bg-primary text-white, px-6 py-3, rounded-lg, font-medium
- Secondary: variant="outline", border-2
- Icon size: w-5 h-5 alongside text

### Risk Meters
- Horizontal bar: h-3 rounded-full overflow-hidden
- Gradient fill based on risk level (green→yellow→red)
- Percentage label above bar
- Animation: fill animates on mount (transition-all duration-700)

### Input Fields
- Border: border-2 focus:border-primary
- Padding: px-4 py-3
- Radius: rounded-lg
- Dark mode: bg-surface-secondary

### Annotations (for explainability)
- Inline highlights in analysis results
- Tooltip hover reveals reasoning
- Color-coded underlines (blue for detection points)

---

## Data Visualization

### Breach Lookup Results
- List of breaches with: Icon, Breach name, Date, Severity badge
- Expandable details for each breach
- Summary card at top: "X breaches found" with risk level

### Phishing Analyzer Results
- Highlighted suspicious phrases in original text
- Category breakdown: Urgency Score, Financial Risk, Link Safety
- Each metric with progress bar visualization

### AI Detector Results
- Confidence percentage (large, prominent display)
- Perplexity chart (simple line graph if feasible, otherwise bar chart)
- Key indicators list with explanations

### Bias Spotlight Results
- Text with color-coded highlights (by bias type)
- Legend explaining each color
- Metrics: Objectivity score, Emotional language count, Bias indicators count

---

## Images
1. **Hero Image** (Right side, 40% width): Abstract geometric security visualization with soft blue gradients, circuit patterns, and floating shield/lock icons. Should feel modern and trustworthy, not intimidating.

2. **Feature Icons**: Use Heroicons throughout (shield-check, document-magnifying-glass, sparkles, light-bulb)

---

## Animations
**Minimal & Purposeful Only:**
- Risk meter fill animation (once on mount)
- Card hover lift (subtle 2px translate-y)
- Results fade-in (opacity transition)
- NO: Parallax, complex scroll animations, floating elements

---

## Accessibility & Polish
- High contrast ratios (WCAG AAA where possible)
- Focus indicators on all interactive elements (ring-2 ring-primary)
- Loading states for all async operations (spinner + "Analyzing..." text)
- Error states with helpful messages
- Responsive breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)