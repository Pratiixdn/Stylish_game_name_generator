import type { DecorativeStyle } from "@/data/decorative-styles";

// Real Unicode superscript code points only. Letters without a true
// superscript form (b, d, f, m, o, p, q, t, z) are not faked — applyCharMap
// falls back to the original character for any key not listed here.
const SUPERSCRIPT_MAP: Record<string, string> = {
  a: "ᵃ", c: "ᶜ", e: "ᵉ", g: "ᵍ", h: "ʰ", i: "ⁱ", j: "ʲ", k: "ᵏ", l: "ˡ",
  n: "ⁿ", r: "ʳ", s: "ˢ", u: "ᵘ", v: "ᵛ", w: "ʷ", x: "ˣ", y: "ʸ",
  "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹",
};

const SUBSCRIPT_MAP: Record<string, string> = {
  a: "ₐ", e: "ₑ", h: "ₕ", i: "ᵢ", j: "ⱼ", k: "ₖ", l: "ₗ", m: "ₘ", n: "ₙ",
  o: "ₒ", p: "ₚ", r: "ᵣ", s: "ₛ", t: "ₜ", u: "ᵤ", v: "ᵥ", x: "ₓ",
  "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄", "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉",
};

const SMALLCAPS_MAP: Record<string, string> = {
  a: "ᴀ", b: "ʙ", c: "ᴄ", d: "ᴅ", e: "ᴇ", f: "ғ", g: "ɢ", h: "ʜ", i: "ɪ",
  j: "ᴊ", k: "ᴋ", l: "ʟ", m: "ᴍ", n: "ɴ", o: "ᴏ", p: "ᴘ", q: "ǫ", r: "ʀ",
  s: "s", t: "ᴛ", u: "ᴜ", v: "ᴠ", w: "ᴡ", x: "x", y: "ʏ", z: "ᴢ",
};

const MIRROR_MAP: Record<string, string> = {
  a: "ɒ", b: "d", c: "ɔ", d: "b", e: "ɘ", f: "Ꮈ", g: "ǫ", h: "ʜ", i: "i",
  j: "ꞁ", k: "ʞ", l: "l", m: "m", n: "ᴎ", o: "o", p: "q", q: "p", r: "ɿ",
  s: "ƨ", t: "T", u: "u", v: "v", w: "w", x: "x", y: "Y", z: "z",
};

const BUBBLE_MAP: Record<string, string> = {
  a: "ⓐ", b: "ⓑ", c: "ⓒ", d: "ⓓ", e: "ⓔ", f: "ⓕ", g: "ⓖ", h: "ⓗ", i: "ⓘ",
  j: "ⓙ", k: "ⓚ", l: "ⓛ", m: "ⓜ", n: "ⓝ", o: "ⓞ", p: "ⓟ", q: "ⓠ", r: "ⓡ",
  s: "ⓢ", t: "ⓣ", u: "ⓤ", v: "ⓥ", w: "ⓦ", x: "ⓧ", y: "ⓨ", z: "ⓩ",
  A: "Ⓐ", B: "Ⓑ", C: "Ⓒ", D: "Ⓓ", E: "Ⓔ", F: "Ⓕ", G: "Ⓖ", H: "Ⓗ", I: "Ⓘ",
  J: "Ⓙ", K: "Ⓚ", L: "Ⓛ", M: "Ⓜ", N: "Ⓝ", O: "Ⓞ", P: "Ⓟ", Q: "Ⓠ", R: "Ⓡ",
  S: "Ⓢ", T: "Ⓣ", U: "Ⓤ", V: "Ⓥ", W: "Ⓦ", X: "Ⓧ", Y: "Ⓨ", Z: "Ⓩ",
  "0": "⓪", "1": "①", "2": "②", "3": "③", "4": "④", "5": "⑤", "6": "⑥", "7": "⑦", "8": "⑧", "9": "⑨",
};

const FULLWIDTH_MAP: Record<string, string> = {
  a: "ａ", b: "ｂ", c: "ｃ", d: "ｄ", e: "ｅ", f: "ｆ", g: "ｇ", h: "ｈ", i: "ｉ",
  j: "ｊ", k: "ｋ", l: "ｌ", m: "ｍ", n: "ｎ", o: "ｏ", p: "ｐ", q: "ｑ", r: "ｒ",
  s: "ｓ", t: "ｔ", u: "ｕ", v: "ｖ", w: "ｗ", x: "ｘ", y: "ｙ", z: "ｚ",
  A: "Ａ", B: "Ｂ", C: "Ｃ", D: "Ｄ", E: "Ｅ", F: "Ｆ", G: "Ｇ", H: "Ｈ", I: "Ｉ",
  J: "Ｊ", K: "Ｋ", L: "Ｌ", M: "Ｍ", N: "Ｎ", O: "Ｏ", P: "Ｐ", Q: "Ｑ", R: "Ｒ",
  S: "Ｓ", T: "Ｔ", U: "Ｕ", V: "Ｖ", W: "Ｗ", X: "Ｘ", Y: "Ｙ", Z: "Ｚ",
  "0": "０", "1": "１", "2": "２", "3": "３", "4": "４", "5": "５", "6": "６", "7": "７", "8": "８", "9": "９",
};

function applyCharMap(input: string, map: Record<string, string>): string {
  return Array.from(input)
    .map((ch) => map[ch] ?? map[ch.toLowerCase()] ?? ch)
    .join("");
}

function applyTransform(input: string, transform: DecorativeStyle["transform"]): string {
  switch (transform) {
    case "superscript":
      return applyCharMap(input, SUPERSCRIPT_MAP);
    case "subscript":
      return applyCharMap(input, SUBSCRIPT_MAP);
    case "smallcaps":
      return applyCharMap(input, SMALLCAPS_MAP);
    case "mirror":
      return Array.from(input)
        .reverse()
        .map((ch) => MIRROR_MAP[ch.toLowerCase()] ?? ch)
        .join("");
    case "reversed":
      return Array.from(input).reverse().join("");
    case "bubble":
      return applyCharMap(input, BUBBLE_MAP);
    case "fullwidth":
      return applyCharMap(input, FULLWIDTH_MAP);
    case "strikethrough":
      return Array.from(input)
        .map((ch) => ch + "\u0336")
        .join("");
    default:
      return input;
  }
}

/**
 * Renders a decorative style template against an input name, applying
 * joiner interleaving, per-character wraps, or Unicode transforms as
 * configured on the style definition.
 */
export function renderDecorativeStyle(style: DecorativeStyle, input: string): string {
  const name = input.trim() || "Player";

  let rendered = name;
  if (style.transform) {
    rendered = applyTransform(name, style.transform);
  } else if (style.joiner !== undefined) {
    rendered = Array.from(name).join(style.joiner);
  } else if (style.wrapEach) {
    const [open, close] = style.wrapEach;
    rendered = Array.from(name)
      .map((ch) => `${open}${ch}${close}`)
      .join("");
  }

  return style.template.replace("{name}", rendered);
}
