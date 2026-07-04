# Changes made

UI/UX, theme, colors, layout, existing generator pages — untouched. All changes additive.

## 1. Fake testimonials removed
- Deleted `components/sections/testimonials-section.tsx`
- Removed its import/render from `app/page.tsx`

## 2. New decorative name styles (your pasted designs)
- `data/decorative-styles.ts` — 24 sections (Royal Crown, Gun Design, Game Styles, Anime, Cute, Symbolic, Small Text, Line, Squiggle, Zalgo, Weird, Joiner, Box, Star, Heart, Emotion, Thank You, Sad, Asian, Birthday, Gym/Fitness, Free Fire, Emoji)
- `lib/decorative-renderer.ts` — real Unicode transforms for superscript/subscript/smallcaps/bubble/fullwidth/mirror/strikethrough (no fake lookalikes)
- `components/sections/decorative-styles-showcase.tsx` + `decorative-styles-section.tsx` — new section, list/grid toggle, copy-to-clipboard
- Added below the existing generator on `/generators/stylish-text/` only — generator itself untouched

## 3. Password Generator (new feature)
- `lib/password-generator.ts` — crypto-random when available, optional name-seeded mode, strength estimator
- `components/sections/password-generator-section.tsx` — length slider, character-set toggles, batch generate, TXT export
- New page: `/generators/password/`
- Linked in navbar dropdown + footer

## 4. AdSense
- `components/ui/ad-slot.tsx` — real `<ins class="adsbygoogle">` units at top/hero/content/sidebar/article/bottom positions
- Loader script added to `app/layout.tsx` head
- Placed on homepage (hero, content, bottom), stylish-text page, blog index, blog posts (in-article)
- **Replace `ca-pub-XXXXXXXXXXXXXXXX` and the slot IDs in `ad-slot.tsx` + `layout.tsx` with your real AdSense values before going live** — currently placeholders so layout/CLS is correct either way

## 5. Blog — 20 real posts + fixed dead route
- `data/blog-posts.ts` — 20 full posts (gaming names, unicode, symbols, fonts, nicknames, clan names, password security x2, streaming, Discord, anime, dark/edgy, birthday, leetspeak history, etc.)
- `app/blog/[slug]/page.tsx` — **this didn't exist before**, every blog link 404'd. Built it with related posts + in-article ad slot.
- `lib/blog-renderer.tsx` — lightweight markdown-to-JSX for the post body
- `app/blog/page.tsx` — swapped its old 6-post inline array for the real 20-post data file, same card markup

## Bugs fixed along the way (pre-existing, not introduced by this round)
- `next-themes` was imported in `theme-provider.tsx`/`theme-toggle.tsx` but missing from `package.json` — build failed immediately without it. Added.
- `/about/#faq` link in footer pointed at a section with no `id="faq"` — silently scrolled nowhere. Added the id.
- Several unused imports were blocking the strict lint-as-error build (`about/page.tsx`, `contact/page.tsx`, `generator-section.tsx`) — removed, zero visual effect.
- `lib/generators.ts` had an implicit-`any` TypeScript error in the font-map lookup — added a type annotation, zero behavior change.

## Note on this build environment
Fonts (`next/font/google`) require network access to fonts.googleapis.com, which this sandbox doesn't have — verified the build compiles correctly using a temporary font stub, then restored the real Google Fonts setup before packaging. Will build normally wherever you deploy with normal internet access (Vercel, your own machine, etc).
