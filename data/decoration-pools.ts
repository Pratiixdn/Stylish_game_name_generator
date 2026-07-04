/**
 * Large pools of real Unicode decoration symbols used to combinatorially
 * expand a small set of genuine font/style transforms into thousands of
 * unique combinations. Every symbol here is a real, renderable Unicode
 * character — nothing fake or made up. The "1000+ styles" claim comes from
 * combining (font × wrap × separator), not from inventing new alphabets.
 */

export const WRAP_PAIRS: [string, string][] = [
  ["", ""],
  ["★", "★"], ["✦", "✦"], ["✧", "✧"], ["✪", "✪"], ["✯", "✯"], ["⭐", "⭐"],
  ["♔", "♔"], ["♛", "♛"], ["👑", "👑"],
  ["⚡", "⚡"], ["🔥", "🔥"], ["💫", "💫"], ["✨", "✨"],
  ["亗", ""], ["", "亗"], ["乂", "乂"], ["彡", ""], ["", "彡"], ["々", ""],
  ["『", "』"], ["「", "」"], ["【", "】"], ["《", "》"], ["〖", "〗"], ["〘", "〙"],
  ["«", "»"], ["‹", "›"], ["⟦", "⟧"], ["⟨", "⟩"], ["⦗", "⦘"],
  ["[", "]"], ["(", ")"], ["{", "}"], ["⦅", "⦆"], ["⌈", "⌉"], ["⌊", "⌋"],
  ["♡", "♡"], ["💕", "💕"], ["💗", "💗"], ["♥️", "♥️"],
  ["🎀", "🎀"], ["✿", "✿"], ["❀", "❀"], ["🌸", "🌸"],
  ["☠", "☠"], ["💀", "💀"], ["▼", "▼"], ["▲", "▲"],
  ["✞", "✞"], ["🔱", "🔱"], ["⚔️", "⚔️"], ["🛡️", "🛡️"],
  ["•", "•"], ["·", "·"], ["◦", "◦"], ["●", "●"], ["○", "○"],
  ["≋", "≋"], ["〜", "〜"], ["～", "～"], ["≈", "≈"],
  ["⊰⊹ฺ", "ฺ⊹⊱"], ["°†°", "°†°"], ["┕━━☽", "☾━━┙"],
  ["✰", "✰"], ["☆", "☆"], ["⚝", "⚝"],
];

export const SEPARATORS: string[] = ["", " ", "-", "_", "•", "·", "~", "★", "◦"];

export const SMALL_SUFFIXES: string[] = [
  "", "X", "Z", "YT", "TV", "OP", "GG", "Pro", "999", "07", "21", "23",
];

export const SMALL_PREFIXES: string[] = [
  "", "x", "The", "Mr", "Lil", "Real",
];

/**
 * Deterministic pseudo-random index generator (mulberry32) seeded by a
 * page number. Lets "load more" walk through a large, stable combination
 * space in a consistent, non-repeating order without storing all
 * combinations in memory up front.
 */
export function seededRandom(seed: number): () => number {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function pickFrom<T>(arr: T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)];
}
