# Anugya A Boutique Hotel — Indore

Built for Anugya by Exsora. **All 8 phases of the build plan are complete.**
The site is functionally and visually finished: full cinematic homepage,
all six room detail pages with real photography, Amenities/Experience/
Gallery as genuine visual storytelling, Contact/Location trust-building,
a booking funnel walked end-to-end and fixed where it broke, and a Phase 8
polish pass covering performance, SEO, accessibility, and a dedicated
mobile sweep.

**What's not done, and can't be from here**: every field marked
`PLACEHOLDER` in `src/config/siteConfig.ts` (phone, WhatsApp, email,
address, Instagram, Google Maps, Google Reviews, check-in/out times), the
provisional room-photo assignment, and the hero video. These need real
data from the client — see the "Still needs the client" section below.

## New discovery worth your attention

One of the client's own uploaded photos (`public/assets/rooms/deluxe/02.jpg`
— the welcome-basket shot) clearly shows the **Anugya logo** in use: a lotus
mark above an "Anugya — a boutique hotel" wordmark, burned into the wooden
amenity kit. It also shows what looks like a phone number on the same item,
but the text sits on angled wood grain and isn't reliably legible even
zoomed in — I did not transcribe it into `siteConfig.ts`, since a
misread phone number is worse than a placeholder one. Worth pulling the
real number from the client directly, and worth asking if a clean vector
copy of that logo exists — it would let Phase 8 replace the text wordmark
in the navbar with the real mark.

Separately: `family-suite/03.jpg` and `family-suite/02.jpg` both show a
lounge chair with what may be a pull-out mechanism — possibly the "sofa cum
bed" amenity I previously flagged as unconfirmed in any photo. Worth
checking those two specifically.

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build     # production build to dist/
npm run preview   # serve the production build locally
```

Requires Node 18+.

## What's real vs. placeholder

**Real:**
- All 47 uploaded room photographs, copied into `public/assets/rooms/**`
  (originals also kept in `reference-photos/` at the repo root — not shipped
  to the live site — for reconciliation, see below)
- Room names, prices, and amenities — copied verbatim from the client brief
- All 74 property amenities, categorized without dropping any
- Design tokens (color, type) derived from the actual photography
- WhatsApp deep-link message templates, matching the brief's exact wording

**Placeholder — do not ship without replacing:**
- `src/config/siteConfig.ts` — phone, WhatsApp number, email, address,
  Instagram, Google Maps URL, Google Reviews URL, check-in/out times. Every
  field is commented `PLACEHOLDER`.
- `src/data/reviews.ts` — intentionally ships **empty**, not with a fake
  rating. Fabricating a star rating or testimonial is a different category
  of risk than a placeholder phone number (it's guest-facing social proof),
  so this file waits for real Google data rather than inventing one.
- Hero video — brief §22 calls for cinematic video; none was supplied, so
  the hero currently uses a real room photograph instead of stock footage.
- Location page map embed — no real address yet, so it's an honest empty
  state rather than a map pointing at an invented location.

## Room photo assignment is provisional

The 47 source photos cluster into three visual styles, not six — which
lines up with the brief itself noting Presidential and Executive Suite
share identical amenities. I could not visually distinguish Deluxe /
Executive / Premium from each other, or confidently split the two suites,
from photography alone.

Current assignment (`src/data/rooms.ts`) is a best guess, flagged with
`imagesConfirmed: false` on every room. All 47 originals remain, numbered,
in `reference-photos/` at the repo root so the client can say "numbers 3, 9, 16,
20 are the Executive Room" and the reassignment is a five-minute data-file
edit, not a rebuild.

## Visual QA tooling

`scripts/screenshot.mjs` and `scripts/screenshot-sections.mjs` drive a
headless browser through the built site and capture screenshots at key
scroll states, viewports, and routes — this is how the homepage and room
pages were actually checked (not just compiled) before delivery. To use:

```bash
npm run build
npx vite preview --port 4173 &
npx playwright install chromium   # first time only
node scripts/screenshot.mjs
node scripts/screenshot-sections.mjs
```

Screenshots land in `shots/` (gitignored). Worth running again after any
future content or animation change.

## Stack

React 19 + TypeScript + Vite + Tailwind CSS 3 + React Router + GSAP
(ScrollTrigger) + Lenis + Framer Motion + Lucide icons. Fonts are
self-hosted via `@fontsource` (Fraunces + Inter) rather than a Google Fonts
CDN call, so the site doesn't depend on external font loading at runtime.

## Hero curtain removed, subtitle polished, logo/reload scroll fixes

**Curtain-split removed**: the screen-splitting scroll-exit read as too
showy, not premium. Removed entirely (confirmed zero `clip-path`
elements remain). Replaced with something quieter: the text still fades
and scales down as you scroll past (unchanged), and the photo now simply
continues its own slow zoom a little further while darkening to black —
verified this progresses smoothly with real scroll positions (opacity
0 → 36% → 72% → 100% at 0/300/600/900px), not just present-at-rest.

**"Hotel & Boutique" subtitle**: now flanked by two thin gold rules that
draw in on entrance, and has its own slow continuous letter-spacing
breathe (same technique as the title's, offset so the two aren't moving
in lockstep) — reads as considered rather than static. Top spacing from
"Anugya" is unchanged, as asked.

**Logo click**: previously did nothing if you were already on the
homepage (React Router doesn't re-trigger on a same-path Link click).
Added an explicit scroll-to-top on click — verified directly: scrolled
to 2500px, clicked the logo, landed back at ~0.

**Reload starts at the top**: browsers can restore the previous scroll
position on reload, which could land you mid-page instead of at the top
under the logo. Forced scroll-to-top on every load and set
`history.scrollRestoration = "manual"`. Verified the actual behavior
that matters: scrolled to 1800px, reloaded, landed at exactly 0.

Full console sweep clean, reduced-motion confirmed to disable both the
darken-exit and the subtitle's entrance (lines show immediately instead
of animating in), zero overflow on mobile.

## Hero — Concept C, "Layered Depth" (approved), darker edges, bigger branding

**Layered depth**: at rest, three layers now drift at different rates as
the cursor moves (desktop with a real pointer only, gated on
`(pointer: fine)` — nothing to track on touch, confirmed this evaluates
`false` on a mobile emulation and `true` on desktop). Background photo
drifts least, text a little more, a soft gold bokeh flare in front
drifts the most. Uses `gsap.quickTo` rather than setting values directly
on every mousemove event.

**Caught a real bug before shipping**: my first version had the
mouse-parallax setup return early inside an `if` block, which — for
anyone with a fine pointer, i.e. most desktop users — meant the
scroll-exit curtain effect from the previous round never got set up at
all, since the code after that early return never ran. Restructured so
both are independent and always run.

**Then hit a genuinely confusing debugging detour**: after the fix, a
follow-up verification made it look like the background layer moved
correctly but the text and flare layers didn't — same mousemove event,
same handler, two different results. Added temporary debug logging to
find out why, and traced it to two separate testing artifacts, not
application bugs: first, running the dev server and the test in
*separate* tool calls doesn't keep a background process alive between
calls (has to be one server-start-then-test sequence, as used
throughout this project); second, Playwright's synthetic
`page.mouse.move()` with interpolation steps doesn't reliably fire
multiple real events in headless mode, so only one partial event was
ever landing. Confirmed the real fix by dispatching genuine sequential
`MouseEvent`s directly — all three layers moved with mathematically
exact values matching the intended formulas. Debug logging removed
before shipping.

**Darker edges**: added a radial vignette (darkens toward the
edges/corners specifically) layered on top of the existing flat + linear
wash, which only darkened top-to-bottom.

**Bigger, classier branding**: "Anugya" grew past the old `display-xl`
cap to `clamp(4.5rem, 11vw, 10.5rem)`, with more breathing room before
the "Hotel & Boutique" subtitle beneath it.

Full console sweep clean, reduced-motion confirmed to zero out all
parallax (checked transform stays `none` even after a dispatched
mousemove), zero horizontal overflow on mobile from the larger text.

## "Hotel & Boutique" subtitle everywhere Anugya appears standalone, map behind the location teaser

**Branding**: added a small "Hotel & Boutique" line directly beneath
every standalone "Anugya" brand moment — Navbar (stacked under the
wordmark next to the logo), Hero (below the huge title, wired into the
existing entrance timeline rather than just appearing instantly), and
the closing brand section (same treatment). On the Hero specifically,
also simplified the eyebrow from "Hotel & boutique — Indore" to just
"Indore, Madhya Pradesh," since repeating "Hotel & Boutique" twice in
the same viewport (once above the title, once now below it) would have
been redundant.

**Location teaser** (homepage, before the footer): the real map embed
now sits behind the "Find us in Indore" text as atmosphere — same
`output=embed` technique used on `/location`, but deliberately
non-interactive (`pointer-events-none`) here, since an interactive map
sitting behind scrolling content would intercept mouse-wheel input as
map-zoom instead of page scroll. The dedicated functional map still
lives on `/location`; this one is purely visual, with a dark gradient
overlay for text legibility. Same sandbox caveat as before applies — I
can see the iframe's own chrome rendering through the overlay, which
confirms it's live, but I can't verify actual map tiles render from
here; worth checking specifically when you test.

Full console sweep clean across all routes, zero horizontal overflow
introduced (checked directly), confirmed on mobile too.

## Comprehensive responsive audit

Ran an automated sweep across every page × six viewports (375, 390, 768,
1280, 1440, 1920px wide — 54 combinations) checking console errors and
horizontal overflow (`scrollWidth` vs `clientWidth`) directly, not just
eyeballing screenshots.

**Found and fixed one real bug**: horizontal overflow on the homepage
specifically at 768px (tablet) width, 13px over. Root cause: the
IntroSection's scroll-linked image (added in the previous round — scales
from 1.15 down to 1 as you scroll to it) starts in its enlarged
pre-scroll state below the fold, and unlike Hero/ClosingBrandSection,
this section's root element was missing `overflow-hidden` to contain
that oversized box. Added it. Re-ran the full 54-combination sweep after
the fix — zero overflow issues anywhere, only the known `/location` map
iframe hitting my sandbox's Google-domain block remained (not a real
bug, confirmed earlier in this project).

Also individually checked: all 6 room detail pages at 3 viewports (0
issues), and that the FAQ accordion, Amenities accordion, gallery
lightbox, and mobile menu all function correctly — not just render —
across mobile/tablet/desktop.

## Closing brand section, Contact page, and IntroSection — premium pass

**Closing brand section**: "Anugya" is now full hero-scale (`display-xl`,
was one size down) and has a proper entrance — a gold rule and eyebrow
play in as the section scrolls into view (previously the wordmark had no
entrance at all since it sits below the fold and the old animation only
fired on mount). Added a slow-pulsing gold glow behind the wordmark and
gave the continuous breathe more range, so it reads as genuinely alive
rather than just present.

**Contact page**: rebuilt the plain underlined text links
("Get directions," "Google reviews," "Instagram") into real pill buttons
with icons, lift, and glow on hover. Contact details moved from a plain
definition list into icon-badged rows on a glass panel; the form sits on
a matching glass panel now instead of bare fields on the page background.

**IntroSection** (right below the hero): added a gold rule + eyebrow, a
row of three real facts (Indore location, 6 room types, the confirmed
24-hour front desk amenity — nothing invented), a second real photo
overlapping the main image's corner for editorial depth instead of one
flat rectangle, and a scroll-linked scale on the image (was a static
mount-time fade).

**On the reviews section**: raised again in this round — held the line.
Won't fabricate names, quotes, or ratings for a real business, however
the request is framed. The carousel mechanism is fully built and tested;
it's genuinely waiting on real review data, not a placeholder that needs
more convincing to fill in.

## Hero scroll behavior — Concept A + C combined (approved)

Added genuine scroll-scrubbed exit behavior on top of the existing
entrance/idle cross-dissolve (which is unchanged). Two effects, tied
directly to scroll position via a single `ScrollTrigger`, not timed
animations:

- **Parallax depth exit** (Concept A): as scroll begins, the text group
  fades, scales down to 92%, and drifts upward — finishes by 40% of the
  hero's scroll range.
- **Curtain reveal** (Concept C): starting at 10% and running the rest of
  the way, the hero photo splits down the center and both halves slide
  apart toward the screen edges, reaching a full 100%-viewport-width
  separation by the time the hero has scrolled out of view.

The curtain halves fade in from the live cross-dissolve over their first
15% of progress, so the handoff from "idle cross-dissolve" to "fixed
exit frame" is never a visible jump. Both effects are skipped entirely
under `prefers-reduced-motion` — verified this directly (checked computed
opacity/transform at scrollY=400 stayed at the untouched idle state).

Verified this is a real scrubbed animation, not just present at rest and
at one other point: read the actual computed `opacity`/`transform`
values at four different scroll positions (0, 200, 500, 900px) and
confirmed they progress monotonically and correctly — text fully hidden
by mid-scroll, curtains reach exactly ±1440px (full viewport width) by
late scroll. Screenshotted the visible gap opening mid-image to confirm
it reads correctly, not just that the numbers were right.

## Auto-carousel reviews, Instagram frame fix, new closing brand section

**Reviews carousel**: rebuilt with genuine auto-advance (not just manual
swipe) — timer-driven, pauses on hover/touch, dot indicators are
clickable to jump directly, all disabled under `prefers-reduced-motion`
(auto-rotating content is a real vestibular concern for some users, so
reduced-motion gets manual-only navigation). **Verified thoroughly**: I
temporarily injected obviously-labeled test data ("TEMP TEST DATA ONE"
etc.) into `reviews.ts`, confirmed auto-advance genuinely progresses,
manual dot-clicks jump correctly, and hover genuinely pauses it — then
restored the file to its real empty state and confirmed zero test
content leaked into the shipped build (`grep`-equivalent check on the
final page text). The carousel mechanism is real and tested; it's simply
waiting for real review data.

**Instagram mockup bug fix**: the phone frame was missing
`overflow-hidden`, so the grid's square photo corners poked out past the
frame's rounded boundary at the bottom instead of following the curve.
Individual photos also had no rounding at all. Both fixed — frame now
properly clips its contents, and each photo tile has its own rounded
corners, closer to how the reference actually looks.

**New closing brand section**, last thing before the footer: same
cross-dissolve technique as the Hero (still no real video — three real
photos instead), but blurred this time rather than sharp, so it reads as
a distinct bookend rather than a hero repeat. Large centered wordmark
with a slow continuous breathe, "Book Now" (WhatsApp) and "Explore Rooms"
(`/rooms`) side by side.

## Item 4 — hero scroll concepts

Presented as concepts in chat, not built — see conversation.

## Real logo integrated

Client supplied the actual brand mark (a monogram "A" with a decorative
lotus-arch "a" inside, gold and dark green). Cropped it to content
(source had wide transparent padding) and generated three sizes:
`logo.png` (large, boot splash), `logo-mark.png` (compact, navbar/footer/
Instagram avatar), and a square `favicon.png`. Wired in everywhere a
placeholder or text-only mark stood in before:

- **Navbar**: logo + "Anugya" wordmark lockup, replacing text-only.
  Verified legible in both navbar states — a drop-shadow was added for
  the transparent-over-hero state specifically, since the logo's dark
  green doesn't have much contrast against a dark photo without it;
  confirmed clean in both via screenshot.
- **Favicon**: real logo now, not the generic Vite default.
  Boot splash: shows the logo instead of plain text.
- **Footer**: logo added above the wordmark, on a light backdrop chip —
  the footer's dark walnut background doesn't give the logo's dark green
  enough contrast on its own.
- **Instagram phone mockup**: the avatar circle was a generic Camera icon
  standing in for a profile picture we didn't have — now shows the real
  logo, which is honest (it's genuinely their mark) without pretending to
  be an actual saved Instagram profile photo.

One thing worth flagging: an early check of the footer logo showed what
looked like a blank gray box — turned out to be the social-proof popup's
backdrop-blur dimming that part of the screenshot, not a broken image.
Re-checked with the popup dismissed and confirmed the logo renders fine;
worth remembering that a suspicious screenshot isn't automatically a bug.

## Floating button corrected, FAQ section added

**Misread a request**: "add a call-to-action button just above the
WhatsApp floating button" was interpreted as "add a new Book Now
button between Call and WhatsApp." That was wrong — it meant the Call
button itself belongs there, which it already did before that addition.
Removed the extra button; floating stack is back to just Call + WhatsApp.
"Book Now" wording stays everywhere else it was explicitly requested
(room cards, room detail pages) — only the floating-button misread
was reverted.

**FAQ section added** to the homepage, before "Our Hotels." Multiple items
can be open at once (not a single-select accordion), springs open with a
slight overshoot matching the same interaction language as the Amenities
page, glass surface. Every answer is either backed by real data already
on the site (the confirmed address, real amenities like parking and
airport transfers, real room types) or an honest redirect to WhatsApp
where the actual answer isn't confirmed yet (check-in/out times, exact
meal inclusions) — never invented a policy or time to fill a gap.
Verified two items can be genuinely open simultaneously (checked
`aria-expanded` state directly), not just that the UI looks right.

## Major batch: hero polish, popup/reviews/Instagram redesign, real map, room grid, floating CTAs, back-to-top

Ten changes requested together. Grouped by what actually happened:

**Correction on the map embed** — earlier I said Google's Embed API requires
a paid key and shipped a non-iframe card instead. That conclusion was
wrong in an important way: I re-tested and the "403" was **my own
sandbox's network egress blocking google.com domains outright**
(confirmed directly: `Host not in allowlist: maps.google.com`), not
Google rejecting the request. A real visitor's browser has normal
internet access, unrelated to my sandbox. `Location.tsx` now has the real
`output=embed` iframe wired in, plus a "Send via WhatsApp" contact form
beside it. I cannot personally screenshot Google's servers from this
sandbox, so **please verify the map actually renders** when you test —
I'm confident in the technique, just can't confirm it end-to-end myself.

**Hero text** — caught a real rendering bug before shipping: the first
attempt used a gold gradient clipped to the text (`background-clip:
text`) for a "shimmer," and it rendered as a muddy olive smear, not gold,
when combined with the layered shadow. Replaced with a solid warm
champagne color (`#F7ECD6`) and a clean multi-layer dark shadow for real
depth — confirmed clean in a screenshot before calling it done.

**Popup** — rebuilt from the small corner pill into a true centered modal
with backdrop, matching the reference: eyebrow, heading, body copy, solid
"Leave a Google Review" + outline "Follow on Instagram," "Maybe later."
Same timing logic as before (3s after load, reappears on reload, not on
in-app navigation).

**Google Reviews section** — rebuilt as a dark carousel-ready layout with
individual review cards (star rating, quote, initials avatar, name) plus
the "Enjoyed your visit? Share it with others." banner from the
reference. Still shows the honest empty state, not fake reviews — the
card rendering is real, working code, just fed by an empty array. Never
invented review text or names to match the reference's populated look.

**Instagram section** — rebuilt as a two-column layout with a CSS phone
frame on the right holding a 3×3 grid of real Anugya photos and the real
handle. The only invented pieces are the phone chrome itself and a
generic icon standing in for a profile picture (we don't have Anugya's
actual one) — never implied that's a real photo of their profile.

**Room grid** — homepage room section changed from the pinned horizontal
scroll to a 2-column grid (no more scroll-jacking), same treatment
applied to `/rooms`. `RoomCard` rebuilt to be genuinely animated: hovering
crossfades to a second real photo where available, reveals a gradient
info panel with amenity highlights, and shows both a prominent gold
**"Book Now"** (WhatsApp) and a secondary "Explore in detail" link — not
just a photo with a caption. Room detail pages relabeled their WhatsApp
CTAs to "Book Now" too.

**Floating CTAs** — added a gold "Book Now" button (links to `/rooms`)
between the existing Call and WhatsApp buttons — three stacked bottom-right
now, "Book Now" visually distinct since it's the one meant to read as an
action rather than a contact method.

**Back-to-top** — new button, bottom-left (opposite the contact stack,
matching the reference), fades in after ~600px of scroll, smooth-scrolls
to top.

**Bug caught during testing, not before**: my first hover test on the new
`RoomCard` showed no change at all — turned out `page.hover('.group')`
matched the Navbar logo (which also uses the `group` class for its own
hover effect) since it comes first in the DOM, not the room card. Redid
the test targeting the actual card and confirmed the crossfade/reveal
genuinely works — a reminder that an inconclusive test isn't the same as
a passing one.

Full console sweep clean across all 14 routes (the one flagged item was
the map iframe hitting my sandbox's known Google-domain block, not an
app bug) — checked on both desktop and mobile viewports.

## Navbar rebuilt — Concept A, contrast bug fixed, loading screens added

Real bug caught by the client: the transparent/white-text navbar state
was designed for the dark hero photo on Home and room-detail pages, but
every other page (Rooms, Amenities, Experience, Gallery, Location,
Contact, Privacy Policy) has a plain light background at the top —
white-on-white, invisible. Fixed by having the navbar check the current
route: only pages with a real dark hero at the top (`/` and
`/rooms/:slug`) get the transparent-at-top treatment; everywhere else
renders the solid glass state immediately, even at scroll position 0.
Verified both states with screenshots, not just the logic.

Added on top, per Concept A:
- **Active-tab sliding underline** — measures the current nav link's
  position and animates a gold underline to it, including sliding
  between positions on route change (not just appearing/disappearing).
  Verified the underline's actual transform/width changed between two
  different pages, confirming it truly slides rather than resetting.
- **Active-tab color tint** — gold text color reinforces the underline
  rather than relying on one signal alone.
- **Logo hover** — subtle scale on the wordmark.
- **Mobile menu** — wipe transition (circular clip-path expanding from
  the corner where the menu button sits) instead of a plain fade.

**Loading screens**, the other ask in the same message:
- **Boot splash**: static HTML in `index.html` (visible before any JS
  runs, not a React component), showing the wordmark, faded out once
  React actually mounts — not a fixed timer, so it never outstays a fast
  load or cuts off a slow one. Verified present immediately on load and
  gone ~3s later under throttled network.
- **Route-transition bar**: the lazy-route `Suspense` fallback was
  previously a literally invisible empty div. Replaced with a slim gold
  indeterminate progress bar at the top of the viewport. Confirmed it
  actually renders during a throttled navigation via a DOM query, not
  just added and assumed.

## Room Discovery reverted to original

Concept A ("Pinned Horizontal Journey") didn't land — reverted all three
pieces back to how they were before that redesign started:

- Homepage showcase: back to the plain per-panel scale un-zoom, price
  back to plain inline text (no diagonal wipe, no independent price
  badge).
- `/rooms`: back to the card grid (`RoomCard` × 6), not the vertical
  snap-scroll panels with sidebar.
- Room detail hero: back to a plain static render, no zoom/settle
  entrance.

Verified this is a genuine revert, not just visually similar — checked
the built JS chunk sizes shrank back down (`Rooms` chunk dropped to
~1KB, `RoomCard` split back into its own chunk) and confirmed
console-clean across all 14 routes.

## Amenities rebuilt — Concept A, "Layered Category Reveal" (approved)

All 8 categories are now collapsed by default (first one open on arrival
so the page doesn't look inert), each a full-width band with a real
photo backdrop at low opacity — never captioned as depicting that
specific category. Tapping a band springs it open with a slight
overshoot (`back.out`, kept subtle) into a light panel of item pills;
opening a new one closes whatever was open. Removed the old always-open
lists and the separate photo dividers between category groups, since
each band now carries its own photo.

Fixed a real bug before shipping: first draft generated the panel's
`id`/`aria-controls` from the category *title* ("Guest services"), which
contains a space and is invalid as an HTML id. Switched to the existing
kebab-case category slug. Verified the accordion logic directly — panel
heights via `getBoundingClientRect()`, not just visual inspection —
confirming only one panel is ever open, `aria-expanded` tracks correctly,
and reduced-motion users get the same open/closed state instantly with
no spring.

## Room Discovery rebuilt — Concept A, "Pinned Horizontal Journey" (approved)

Three pieces, all part of the one approved concept:

- **Homepage showcase**: each panel's image now reveals via a diagonal
  clip-path wipe (not a flat scale) as it becomes active, and the price
  sits in its own badge with independent slide/fade timing — separate
  motion from the name/CTA block. Verified the clip-path values actually
  change with a diagonal offset between top and bottom edges (not a
  straight cut) by reading the computed style mid-scroll, not just
  eyeballing it.
- **`/rooms`**: rebuilt from a card grid into six full-height panels with
  scroll-snap and a persistent sidebar (room names on desktop, dots on
  mobile) that jumps straight to any room. Snap uses GSAP ScrollTrigger's
  own snap, not native CSS scroll-snap — this site's Lenis smoothing is
  wired through ScrollTrigger already, and native scroll-snap fights
  Lenis's momentum handling. Verified clicking a sidebar item actually
  scrolls to the right panel and highlights the right name, not just that
  it compiled.
- **Room detail hero**: settles in from a slight zoom/dim instead of
  appearing flat, approximating continuity with the panel you clicked
  from. Worth being honest about the limit here: this is the same photo
  settling into place, not a true shared-element DOM transition across
  the route change — that would need the browser View Transitions API
  (inconsistent support) or heavier routing tooling than this project
  uses. Reads as continuous because it's the same image, not because the
  DOM node is literally shared.

All three respect `prefers-reduced-motion` (verified each independently),
and the whole sweep is console-clean across all 14 routes.

## Hero rebuilt — Concept A (approved), typography revised twice

First pass: plain single-block text — flagged as too simple/static.
Second pass: letter-by-letter reveal — flagged as not wanting the
word-building-itself effect. Landed on: "Anugya" as one confident block
again, but ~45% longer and with more travel than the very first pass, so
it reads as weighted rather than hurried. Kept everything added along the
way — the hairline gold rule beforehand, italic Fraunces tagline after,
and the barely-perceptible letter-spacing breathe once it settles.
Verified the title is back to a plain text node (no leftover letter
spans) and reduced-motion still shows everything instantly.

## Social proof popup added

A small glass pill — Instagram + Google Reviews icons — appears 3 seconds
after every page load or reload, per request. A few things worth knowing
about how it's built:

- **Reappears every reload on purpose**: uses plain component state, not
  localStorage/sessionStorage, since the request was for it to show
  "every time," not the more typical "once per session" pattern.
- **Fires once per browser load, not once per click**: it lives in
  `SiteLayout`, which doesn't remount when you navigate within the site,
  so clicking between pages won't re-trigger it — only an actual page
  load/refresh does. Verified this distinction explicitly (SPA nav vs.
  reload) rather than assuming it.
- **Went through two redesigns before shipping**: the first version was a
  fuller card (heading + description + two labeled buttons) positioned
  bottom-left. Screenshotting it caught a real problem — on the homepage
  it overlapped the hero's "Explore rooms" button and the booking bar.
  Moved it to stack above the Call/WhatsApp buttons instead, which fixed
  desktop but a still-too-tall card partially covered "Book your stay" on
  mobile specifically — the primary conversion CTA, which matters more
  than this popup ever should. Final version is icon-only and small
  enough to clear both CTAs on every viewport tested, confirmed via
  programmatic overlap checks, not just eyeballing a screenshot.
- Dismissible via the × or Escape; respects `prefers-reduced-motion`.

## Real business data wired in

Client supplied: phone/WhatsApp number, full address, Google Maps share
link, Instagram profile. All updated in `src/config/siteConfig.ts` and
verified — actually checked the rendered `tel:`, `wa.me`, Maps, and
Instagram hrefs in the browser rather than assuming the config change
would propagate correctly.

**One thing worth knowing**: I initially tried building a real embedded
map on the Location page now that we have a confirmed address, using the
old no-API-key `maps?q=...&output=embed` trick. It 403s. Checked why via
search rather than guessing: Google's Maps Embed API now requires a
billed Google Cloud API key, and the old unauthenticated query trick is
being phased out. Shipping an iframe that errors for every visitor would
be worse than not having one, so the Location page instead shows the
confirmed address in a well-designed card with a working "Get Directions"
link straight to Google Maps. If the client sets up a Maps Embed API key
later, there's a comment in `src/pages/Location.tsx` with the exact
iframe swap needed.

**Only one phone number was supplied** — it's used for both the "Phone"
and "WhatsApp" fields in config. Split them if that's wrong.

**Still placeholder**: email, check-in/out times, Google Reviews link.

## Sister hotels — small mention added

Per client request: a small cross-link, not full pages. Added:
- A homepage section (`OurHotels`, `id="hotels"`) between Instagram and
  Location — glass cards matching the site's aesthetic, listing both
  properties with area and a link to Contact.
- A one-line mention in the footer (present on every page) linking to
  that section via `/#hotels`, which required teaching `SiteLayout` to
  scroll to a hash target instead of always forcing scroll-to-top —
  verified working from a non-home page, not just assumed.

**Deliberately text/icon-only, no photos**: there's no real photography
for either property, and using Anugya's own room photos to represent a
different, unrelated hotel would misrepresent what that hotel actually
looks like — a different problem than a placeholder gap.

**Worth confirming with the client before this ships**: "Silver Sky
(Twinkle Regency)" and "Hotel Silver Sky" are near-identically named.
Worth double-checking these are genuinely two separate properties and
not the same one listed twice. Data lives in `src/data/sisterHotels.ts`
— currently just name + area, nothing else, since that's all that was
supplied.

## Visual redesign pass — glass + motion

Direct client feedback: the site read as too flat/static, closer to a
template than a premium custom build. Concrete response, not just a
tweak:

- **Glassmorphism** on every major surface that was previously flat —
  navbar (frosted on scroll, subtle glass sheen even at the top), booking
  bar (was solid white cells, now a true frosted glass panel with
  individual translucent fields), room cards (glass surface + floating
  glass price badge on the photo + glow border on hover), amenity teaser
  cards, the reviews panel, and every CTA/closing section.
- **Glow**: gold CTAs now carry a soft ambient glow that intensifies on
  hover with a lift, instead of a flat color change. Secondary buttons
  went from a plain outline to a frosted-glass fill.
- **Ambient depth**: a reusable `<AmbientGlow>` — soft, slowly drifting
  blurred gradient orbs — sits behind key light-background sections
  (Intro, Amenities teaser, Reviews, Closing CTAs) so glass panels have
  something with color to actually blur, instead of a flat cream field.
- **Richer motion**: every scroll-reveal now has a subtle scale-in
  (0.96→1) alongside the existing fade/drift — small enough to stay
  restrained, large enough to read as alive rather than static.
- Shared `glowButton`/`glassButton` constants (`src/lib/buttonStyles.ts`)
  keep this consistent everywhere instead of one-off classes per file.

Verified clean console/build across all 14 routes after the pass, and
checked the booking bar and CTA glass treatment on mobile specifically
since that's the highest-traffic surface.

## Global call button added

The persistent WhatsApp button is now a stacked pair — Call and WhatsApp,
both `fixed` bottom-right on every page via `FloatingContactButtons`
(replaces the old standalone `WhatsAppButton`). Same restrained styling
for both; the icon (phone vs. chat bubble) is what tells them apart.
WhatsApp keeps the lower, more thumb-reachable position since the brief
names it the primary conversion channel. Verified it doesn't collide with
the booking bar or footer on mobile.

## What's done (Phase 8 — Polish)

**Performance:**
- Removed 4.8MB of reference photos that were sitting in `public/` and
  therefore shipping to every visitor despite no page linking to them —
  moved to `reference-photos/` at the repo root.
- Checked the "compress images" brief item honestly rather than assuming
  it needed work: the source photos already passed through WhatsApp's
  compression (no EXIF, already progressive JPEG, quality-80 re-encoding
  saved essentially nothing). No further gain available there without a
  visible quality tradeoff, so I left them as-is rather than doing a
  pointless pass.
- Route-based code splitting via `React.lazy` — verified in the build
  output that each page is now its own 0.5–4.9KB chunk instead of one
  417KB bundle.
- Audited every `<img>` for `loading="lazy"` vs eager; fixed two that were
  missing it entirely (`RoomShowcase`'s desktop panel) and added
  `fetchpriority="high"` to the two above-the-fold hero images.
- Production build: 4.3MB total (`dist/`), largely the real photography.

**SEO:**
- Built a lightweight `useSeo` hook — per-page title, meta description,
  canonical URL, Open Graph, and Twitter Card tags — wired into all 9
  pages. Verified with Playwright that titles actually change per route,
  not just that the code compiles.
- `LodgingBusiness` JSON-LD site-wide, room-specific `HotelRoom` JSON-LD
  on every room detail page (verified the room name actually appears in
  the rendered structured data). `robots.txt` and `sitemap.xml` added.
- Honest caveat worth flagging: this is a client-rendered SPA, so these
  tags are only visible to crawlers that execute JavaScript. True
  SSR/prerendering would guarantee correct tags for every crawler on
  first byte — worth considering before launch if SEO ranking matters,
  but that's an architectural change beyond a polish pass.

**Accessibility:**
- Skip-to-content link — confirmed via automated test that it's the
  first Tab stop on the page.
- Gallery lightbox gained `role="dialog"`/`aria-modal`, focus moving to
  the close button on open, and focus returning to the thumbnail that
  opened it on close — all verified working, not just added.
- Mobile menu now closes on Escape and is properly `inert` when closed
  (confirmed both states) so keyboard users can't tab into hidden content
  behind it.

**Mobile sweep:**
- Screenshotted every page at 390px width using real incremental
  scrolling (not `fullPage` screenshots, which turned out to produce
  false-positive "blank" sections because GSAP ScrollTrigger reveals
  don't fire without genuine scroll events — worth knowing if you extend
  this yourself). No further layout bugs found beyond the booking-bar fix
  from Phase 7.

## Still needs the client

Nothing left to build without it — the remaining gaps are all data, not
code:
- WhatsApp number, phone, email, address, check-in/out times
- Instagram handle, Google Maps place link, Google Reviews link/rating
- Confirmation of which numbered photo belongs to which room (see
  `reference-photos/` and the note in `src/data/rooms.ts`)
- Hero + any supporting video footage
- The real domain, to replace the `Anugyahotel.example` placeholder in
  `useSeo.ts`, `robots.txt`, and `sitemap.xml`
- A vector copy of the logo, if one exists — a lotus mark is visible on
  the welcome-kit photo (`deluxe/02.jpg`) but isn't usable at that
  resolution/angle for the navbar

## What's done (Phase 7)

- **Found and fixed a real mobile bug**: the booking bar's "Check
  availability" CTA didn't span full width on mobile, leaving a broken
  empty box next to it — the exact "stacked desktop layout, not designed
  for mobile" mistake brief §41 warns against. This was in every build
  since Phase 2 and only surfaced now under an actual mobile-viewport
  screenshot.
- Amenities, Experience, and Gallery previously dead-ended at the footer
  with no path back to booking — brief §42 is explicit that every
  important section should lead toward conversion. Added a shared
  `<ClosingCTA>` used consistently across all three.
- Contact page's phone, WhatsApp, and email were plain text, not actually
  clickable (`tel:`, `wa.me`, `mailto:`) — fixed, and verified the hrefs
  resolve correctly, not just that they look like links.
- Added a one-line note under the contact form ("Opens WhatsApp with your
  details pre-filled") so the redirect to WhatsApp isn't a surprise —
  brief §13 is explicit that enquiries shouldn't feel like they leave the
  user waiting.

## What's done (Phase 6)

- **Contact page was missing required elements.** Brief §27 explicitly
  lists Google Maps, Instagram, Google Reviews, and a booking CTA as
  Contact-page requirements — none were there. Added all four.
- **Location page** gained a genuine "About Indore" section. The one
  time-sensitive claim in it (cleanest-city ranking) was checked against
  current search results before writing — Indore has held the title for 8
  consecutive years as of the 2024-25 Swachh Survekshan. Everything else
  is long-stable general knowledge about the city, not a claim about this
  specific hotel's proximity to anything (that needs a confirmed address).
- The map placeholder went from a plain dashed-border box to a properly
  designed pending state with a working "Open in Google Maps" link —
  still honest about not having a real embed, just no longer looking
  unfinished.
- Instagram grid tiles now link out to the profile and match the hover
  treatment added to the Gallery page in Phase 5, for consistency.

## What's done (Phase 5)

- **Experience page rewritten from scratch.** The Phase 2 version was
  text-only with zero photography and only 6 of the brief's 7 beats
  (missing "Comfort," and the copy claimed "in seven parts" while showing
  six — both fixed). Now alternating photo/text sections with real,
  independently-verified imagery per beat.
- **Amenities page** gained a 3-photo hero strip and full-width mood-photo
  dividers between category groups, breaking up what the brief specifically
  warned against ("a boring 74-item icon grid"). Photos are deliberately
  uncaptioned as depicting a specific category — there's no dedicated
  gym/parking/shuttle shot in the source photos, and captioning a bedroom
  photo as "Wellness & fitness" would misrepresent what it shows.
- **Gallery page** gained hover-scale on every image, scroll-reveal
  entrances, and a proper fade/scale transition on the lightbox — all
  called for in brief §21 and previously missing. Also expanded from 10 to
  18 images using the wider verified photo pool from Phase 4.
- Caught and fixed one more image mismatch during this pass: the
  "Service" beat on the Experience page was using an unpolished
  cables/remote-control closeup instead of a presentable shot.

## What's done (Phase 4)

- Rooms index cards now include the short description required by brief
  §17 (was missing)
- Every room's gallery expanded with additional photos independently
  verified against the source contact sheets, not just carried over from
  Phase 2's initial best guess
- Room detail pages gained a "Stay details" section (check-in/out, rate)
  per brief §18 — check-in/out show `TBD` honestly rather than an invented
  time
- A fourth, previously unnoticed headboard style turned up in 3 photos
  during this pass (indices 22, 23, 34) — left unassigned rather than
  guessed into an existing room; flagged in `rooms.ts` and here for the
  client conversation

## What's done (Phase 3)

- Cinematic hero: staggered type entrance, slow Ken Burns drift on a real
  photo (video pending), animated scroll cue
- Pinned horizontal room showcase on desktop (GSAP ScrollTrigger + Lenis),
  with a native swipeable card row on mobile/reduced-motion instead of
  forcing scroll-jacking on touch devices
- Editorial intro, amenities teaser, experience strip, honest-empty-state
  Google Reviews section, Instagram teaser grid (curated from real photos),
  location teaser — all composed on the homepage
- Fixed a real bug caught in visual QA: several rooms' lead image was a
  bathroom shot instead of the room itself; reordered every room's image
  array so the strongest real photo leads everywhere `images[0]` is used

## What's next (Phase 4+)

- Complete room galleries once photo-to-room assignment is confirmed by
  the client (see `reference-photos/` and the note above)
- Amenities/Experience/Gallery pages beyond their current
  foundation-level state (they work; Phase 5 is polishing them)
- Instagram live feed, Google Reviews live data, Location map embed —
  currently honest placeholders, not fabricated data
- Three.js — only if a specific moment genuinely calls for it, per brief §3
