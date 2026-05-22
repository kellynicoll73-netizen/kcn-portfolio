# kellynicoll.ca — Site Build Briefing

## Project overview

Personal portfolio website for Kelly Nicoll, Senior Creative, Brand and Experience Leader. The site should feel clean, confident and professional — letting the work speak for itself. No decorative elements, no unnecessary complexity. The design language is consistent with Kelly's existing case study PDFs and resume.

Site URL: kellynicoll.ca
Deployment: Vercel (free tier)
Tech stack: HTML, CSS, JavaScript — static site, no frameworks required

---

## Code standards

- Clean, semantic HTML throughout — use `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>` appropriately, not `<div>` for everything
- WCAG 2.1 AA accessibility compliance throughout:
  - One `<h1>` per page
  - Alt text on all images including carousel slides
  - Sufficient colour contrast on all text (check light blue on white carefully)
  - Full keyboard navigability for carousel and contact form
  - Visible focus states on all interactive elements
- Open Graph meta tags and meta description on every page for correct social/LinkedIn preview
- Contact form must use Formspree or Netlify Forms — no API keys or credentials in client-side code
- Simple, maintainable solutions preferred over clever ones — if an approach is complex, find a simpler one
- No frameworks, no build tools — plain HTML/CSS/JS only

---

## Design system

### Colours
- Dark blue: #1F3864
- Light blue: #2E74B5
- White: #FFFFFF (page backgrounds)
- Near-black: #1A1A1A (body copy)
- Mid-grey: #888888 (tertiary text, captions)
- Light grey: #F0F0F0 (subtle backgrounds where needed, e.g. carousel placeholder)

### Typography
- Font: Helvetica Neue throughout — all weights
- If Helvetica Neue is unavailable, fallback stack: `'Helvetica Neue', Helvetica, Arial, sans-serif`
- No other typefaces used anywhere on the site
- All text left-aligned throughout
- Body text: 16px, regular weight, line-height 1.7
- Headings: bold weight, dark blue (#1F3864)
- Subheadings / labels: light blue (#2E74B5)
- Tertiary text: mid-grey (#888888)

### Layout principles
- Clean and minimal throughout
- Generous white space — do not crowd elements
- No decorative elements, no gradients, no shadows (except functional focus rings)
- Consistent left-aligned layout across all pages

---

## Navigation

### Behaviour
- Fixed top nav, full width, white background
- Does not collapse on scroll — always visible

### Left side
- Text: **Kelly Nicoll** | Senior Creative, Brand and Experience Leader
- "Kelly Nicoll" in bold dark blue, pipe separator, descriptor in regular weight dark blue
- Entire left side functions as a home button (links to /)
- No hover animation on this element

### Right side
- Items: | My thinking | My work | About me | Get in touch
- Pipe separators between items
- All items in light blue (#2E74B5)
- Hover state: smooth transition from light blue to dark blue (#1F3864), or light weight to medium weight — subtle, not flashy
- My work has a dropdown revealing the five individual case study pages:
  - Partners Conference
  - Office Refresh
  - Consumer Insights
  - Camp PwC
  - Trust Roadmap
- Dropdown appears on hover, disappears on mouse-out, styled consistently with nav

---

## Pages

---

### Home (/)

#### Layout
Two-column hero layout, full viewport height on load.

**Left column (approx 35% width):**
- Large bold dark blue name stacked across two lines:
  ```
  Kelly
  Nicoll
  ```
  Name should be large — dominant visual element of the page
- Below name: light blue title on two lines:
  ```
  Senior Creative,
  Brand and Experience Leader
  ```
- Below title: mid-grey tagline:
  ```
  Let's bring your brand to life, together.
  ```
- Generous vertical spacing between all three elements
- No other content in left column

**Right column (approx 65% width):**
- Full-height image carousel (see carousel spec below)
- No padding or border — image fills the column edge to edge

#### Carousel spec
- 6 slides, one per case study / thought leadership piece
- Auto-advances every 5 seconds
- Manual prev/next navigation: small subtle arrow buttons inset within the left and right edges of the image (not outside the image bounds)
- Dot navigation at the bottom of the carousel: small dots indicating total slides and current position
- Smooth fade or slide transition between images
- On hover: semi-transparent dark overlay fades in over the image, revealing mouseover copy (see carousel_mouseover_copy.md for full copy and structure)
- On click: navigates to the relevant case study page or /thinking
- On mobile: overlay text always visible (no hover state on touch devices)
- Arrow buttons and dots: subtle, low-contrast — should not compete with the imagery

#### Carousel image assets
Images will be provided by Kelly. One hero image per slide. File names and slide order to be confirmed when assets are supplied.

#### No other content on homepage
The homepage is intentionally minimal — name, title, tagline, carousel only. No bio excerpt, no footer links beyond standard nav.

---

### My thinking (/thinking)

This page presents Kelly's Brand Excitement thought leadership piece.

#### Structure
- Page heading: Beyond the brand police: The new era of brand pride
- Subheading: A positive and proactive approach to brand compliance through building brand excitement
- Date: February 2026

**Section 1: Why brands need a bridge**
The old model of rigid brand books and mandatory approvals can't keep pace with distributed teams and digital-first delivery. The opposite extreme — no guidance at all — leads to chaos and inconsistency. Organizations need a bridge: structure without stifling creativity, education without over-policing, tools that enable rather than constrain.

**Section 2: The inversion**
Compliance is an outcome, not a method. When people understand the brand, believe in its values and have tools that make delivery easy and beautiful, they want to get it right. Enforcement is a trailing indicator — it catches problems after they've happened. Excitement is a leading indicator — it prevents problems by making people care before they create.

**Section 3: The four inputs**
Four inputs that build brand excitement across an entire organisation:

1. **Committed leadership** — Leadership sets the tone. When leaders champion the brand — not just approve it, but visibly care about it — the organization takes notice. Leadership excitement is the permission structure that signals brand matters as a business priority.

2. **A compelling story** — The visual brand is an indicator of story, not the story in and of itself. Most great brands tell stories of change or transformation. Without a compelling story, a brand is just colours and a logo. With one, it's a rallying point.

3. **Broad brand ownership** — A brand owned by everyone is delivered by everyone. This isn't about delegating brand to marketing — it's about making brand everyone's responsibility and everyone's source of pride.

4. **Simple, accessible tools** — Complexity kills enthusiasm. Simple tools and clear processes make correct delivery the path of least resistance. When beautiful, on-brand work is easier to produce than off-brand work, compliance becomes automatic.

**Section 4: Research validates the approach**
Key statistics supporting each input — to be laid out as a four-column stat block, one column per input, with stats and source citations below each.

**Section 5: Imagine this in your organization**
Closing call to action — inviting readers to picture applying the framework to their own brand.

#### PDF link
Prominent link to full PDF: "Read the full piece" — links to Google Drive PDF (URL to be supplied by Kelly)

#### Design notes
- Use the same colour hierarchy as the case studies: dark blue headers, light blue subheads, black body copy
- The four inputs should be visually distinct — consider a four-column or two-by-two card layout
- Stats block should use large numerals in dark blue, source text in mid-grey

---

### My work (/work)

#### Layout
- Page heading: My work
- Five case study cards in a clean grid (two columns on desktop, one column on mobile)
- Below the grid: a callout linking to /thinking so visitors who land here directly don't miss the thought leadership piece

#### Case study card spec
Each card contains:
- Hero image (provided by Kelly)
- Category label (small, uppercase, mid-grey)
- Case study title (bold, dark blue)
- One-line description (the Role line from carousel_mouseover_copy.md)
- Link to individual case study page

#### Thinking callout
Below the case study grid, a simple ruled-off section:
- Text: Also: read my thinking on brand
- Subtext: Beyond the brand police — the new era of brand pride
- Link: /thinking

---

### Individual case study pages

Five pages, one per case study. All follow the same template.

**URLs:**
- /work/partners-conference
- /work/office-refresh
- /work/consumer-insights
- /work/camp-pwc
- /work/trust-roadmap

#### Page template
Each page contains:

1. **Category label** — small, uppercase, light blue
2. **Title** — large, bold, dark blue
3. **Role / subtitle** — italic, one line, mid-grey
4. **Opening paragraph** — the Director-level framing paragraph from the case study (see individual PDFs). This establishes Kelly's role as vision-setter, cross-functional lead and stakeholder manager before moving into project details.
5. **Key images** — 2 to 3 images from the case study. Images provided by Kelly. Captions in mid-grey below each.
6. **Stat block** — where applicable, the key metrics from the case study results page (e.g. 1,000+ attendees / 94% satisfaction / New organizational standard). Large numerals in dark blue, descriptor text below in mid-grey.
7. **What made this work** — the bulleted summary from the results page of each case study, rendered as a clean list
8. **PDF link** — prominent button or link: "Read the full case study" — links to Google Drive PDF (URLs to be supplied by Kelly)

#### Case study content source
All copy comes directly from the individual case study PDFs. Do not paraphrase or generate new copy — use the text from the PDFs as supplied.

#### PDF links
Google Drive URLs to be supplied by Kelly before this section is built.

---

### About me (/about)

#### Content
- Page heading: About me
- Headshot (photo to be supplied by Kelly)
- Bio (to be written and supplied by Kelly — not to be generated)
- Links section:
  - LinkedIn (URL to be supplied)
  - Instagram (URL to be supplied)

#### Design notes
- Headshot should be positioned left or right of bio text on desktop, above on mobile
- Keep layout clean and simple — this is not a CV page, just a human introduction

---

### Get in touch (/contact)

#### Content
- Page heading: Get in touch
- Short intro line (to be supplied by Kelly — suggested: "I'd love to hear about your next project.")
- Contact form

#### Form fields
- Name (text input, required)
- Email (email input, required)
- Message (textarea, required)
- Send button

#### Form handler
Use Formspree or Netlify Forms. No API keys or credentials in client-side code. Form should show a simple success message on submission — no page redirect.

#### No phone number displayed on site

---

## Responsive behaviour

- Desktop: all layouts as described above
- Tablet: nav collapses to hamburger menu, two-column homepage becomes stacked, case study grid becomes single column
- Mobile: all content single column, carousel overlay text always visible (not hover-dependent), touch-friendly tap targets on all interactive elements

---

## Build order

Build and review in this sequence before moving to the next step:

1. Homepage — layout matching mockup exactly, with working carousel and hover overlays
2. Navigation — fixed top nav with hover states and My work dropdown
3. My work page — case study grid and Thinking callout
4. Individual case study pages — all five using shared template
5. My thinking page — Brand Excitement content
6. About me page
7. Get in touch page — contact form with Formspree/Netlify handler
8. Final pass — accessibility check, colour contrast check, keyboard navigation test, Open Graph meta tags on all pages

---

## Assets to be supplied by Kelly

- Homepage carousel images (6 — one per case study / thought leadership piece)
- Case study hero and highlight images (2–3 per case study)
- Headshot for About me page
- Google Drive PDF links for all six pieces
- LinkedIn URL
- Instagram URL
- Bio text for About me page
- Contact page intro line
- Formspree or Netlify Forms account / endpoint

---

## Reference files

- `carousel_mouseover_copy.md` — full copy and structure for all six carousel hover overlays
- Homepage mockup jpg — build homepage layout to match this exactly
