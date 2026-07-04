/**
 * Expands each decorative section's small template list into 1000+ unique
 * results by combining templates with a large symbol-decoration matrix.
 *
 * Template pool (e.g. 10 Gun Design templates)
 *   × left symbol prefix pool (50 options)
 *   × right symbol suffix pool (50 options)
 *   × spacer pool (5 options)
 * = 10 × 50 × 50 × 5 = 125,000 potential combinations per section,
 *   deduplicated and sliced to [offset, offset+count].
 *
 * Only the actual requested slice is materialised — no memory bloat.
 */

import type { DecorativeSection, DecorativeStyle } from "@/data/decorative-styles";

// Left-side symbol pools by section theme
const LEFT_SYMBOLS: Record<string, string[]> = {
  "royal-crown":     ["♔", "♛", "👑", "⚜", "★", "✦", "⊰⊹ฺ", "◈", "❖", "✿", "🔱", "♕", "⊛", "◆", "⭐", "🌟", "✪", "✯", "✰", "⋆", "꧁", "❁", "𓅓", "🏅", "🥇", "⚝", "🎖", "🏆", "👁", "⚔"],
  "gun-design":      ["︻", "▄︻", "╾━╤デ╦", "︻┳", "︻デ", "🔫", "💣", "⚔️", "🛡", "💥", "☠", "⚠️", "🎯", "🗡️", "⚡", "★", "✦", "◈", "▼", "꧁"],
  "game-styles":     ["❖", "♔", "乂", "彡", "亗", "ʟᴇɢᴇɴᴅ", "ᴘʀᴏ", "NOOB彡《", "ӒK47", "▼", "✦", "★", "⚡", "🔥", "💀", "☠", "⚔️", "🏆", "👑", "💯"],
  "anime-design":    ["🌸", "🥷", "⚔️", "(づ｡◕‿‿◕｡)づ", "🍥⛩️", "⚡🔥", "ฅ^•ﻌ•^ฅ", "🌙🎀", "桜", "⛩️", "🗡️", "忍", "🌺", "🎴", "🏮", "🎐", "✿", "❀", "🎋", "🎑"],
  "cute-styles":     ["✴✴ 🎀", "✴ 🎀", "🎂 ⋆ 🍡 🎀", ": 🎀", "✧ 🎀", "⋆｡‧˚ʚ", "꒰ ♡", "｡･:*:･ﾟ★", "🍭", "🍬", "🌷", "🌈", "🦋", "🌸", "💝", "🎀", "✨", "💕", "🍰", "🌻"],
  "symbolic-styles": ["»»———►", "⚡", "♔", "◦•●◉✿", "°†°", "🌊 .·:*¨", "•´¯`•.", "┕━━☽", "✦", "★", "◆", "⚜", "⊰", "≋", "◈", "❖", "⟡", "⊛", "𓆩", "❁"],
  "small-text":      ["˙", "｡", "·", "•", "◦", "⁺", "₊", "˚", "✦", "⋆", "♡", "✿", "⊹", "𓂃", "ᵎ", "ˊ", "ˋ", "ᐟ", "⌇", "𓈒"],
  "line-styles":     ["━━━━━━━━━━\n", "╔═══════╗\n║ ", "╭━━━━━━━━╮\n┃ ", "┄┄┄┄┄┄┄┄\n", "▀▄▀▄▀▄ ", "‾‾‾‾‾‾\n", "───────── ", "══════════\n", "─────── ", "▬▬▬▬▬▬▬ "],
  "squiggle-styles": ["〜〜〜", "～～", "≋", "≈≈≈", "⟿⟿⟿", "⟲", "∿∿", "〰〰", "≋≋", "〜〜", "～〜", "〜～", "≈≈", "∼∼∼", "≋≋≋", "〜", "～", "≈", "∼", "⟿"],
  "ugly-zalgo":      ["👺😡", "💜👊", "⛵♬", "👺💛", "🌀💥", "😈", "👾", "🐍", "💀", "☠", "🦂", "👻", "🕷️", "🦇", "🌑", "⬛", "🖤", "😤", "🤬", "💢"],
  "weird-styles":    ["", "", "", "", "", "", "", "", "", ""],
  "joiner-styles":   ["", "", "", "", "", "", "", "", "", ""],
  "box-styles":      ["", "【", "「", "『", "⦗", "⦅", "❮", "〘", "⌈", "⌊", "⟦", "❴", "⦇", "⟨", "⌜", "⌞", "⎡", "⎣", "▛", "◤"],
  "star-decorated":  ["★彡[", "✦✦✦", "✧･ﾟ: *✧･ﾟ:*", "⋆｡°✩", "✨🌟", "💫", "⭐⭐⭐", "🌟✨", "✦", "⭐", "💥✨", "🌠", "✯", "✰", "⚝", "☆", "★", "✪", "✫", "✬"],
  "heart-decorated": ["♥️", "💗💗", "·.¸♡", "♡*.✧", "💕💖", "💓", "😍💕", "❤️", "💖", "💝", "💘", "💞", "💟", "🫀", "♡", "❣️", "💌", "💑", "👫", "🥰"],
  "emotion-styles":  ["(◕‿◕)", "(｡♥‿♥｡)", "(◠‿◠)", "(◕ᴗ◕✿)", "ʕ•ᴥ•ʔ", "(╯°□°）╯", "(✧ω✧)", "(≧◡≦)", "(´｡• ᵕ •｡`)", "(∩˃o˂∩)", "(⌒▽⌒)", "（*＾▽＾）", "(◍•ᴗ•◍)", "ヽ(•‿•)ノ", "( ˘ ³˘)♥", "(｡◕‿◕｡)", "(｡♡‿♡｡)", "(づ￣ 3￣)づ", "(っ˘ω˘ς)", "(✿◠‿◠)"],
  "thank-you":       ["🙏✨", "🙏", "💝", "🙏💫", "💖🙏", "✨", "🌟🙏", "💐🙏", "🙏❤️", "✨💖", "🌺🙏", "💫✨", "🎊🙏", "🌸💖", "✨🌟", "💝🙏", "🎉🙏", "🌟💫", "💖✨", "🙏🌟"],
  "sad-styles":      ["😢", "༼;´༎ຶ ۝ ༎ຶ༽", "💔", "(╥﹏╥)", "🌧️", "(｡•́︿•̀｡)", "｡･ﾟﾟ･(>д<)･ﾟﾟ･｡", "😭", "😿", "🥺", "💧", "😔", "(つ﹏<。)", "(ᗒᗩᗕ)", "ᵒᵕᵒ", "( ꩜ ᯅ ꩜;)", "。゜゜(´O`) ゜゜。", "(◞‸◟）", "( ´•̥̥̥ω•̥̥̥` )", "(｡•́︿•̀｡)"],
  "asian-styles":    ["【", "「", "『", "｟", "(ノ◕ヮ◕)ノ*:･ﾟ✧", "〖", "《", "〔", "〘", "〚", "«", "❮", "〈", "《", "「", "『", "【", "〖", "〘", "〚"],
  "birthday-styles": ["🎉🎂", "🎊🎁", "🎂✨", "🎈🎉", "🌟🎂", "🎊🎉🎈", "🎈🎈", "🥳🎉", "🎁🎊", "🎂🎈", "🎉🎊🎂", "🥂🎉", "✨🎂", "🎁🎀", "🎊✨", "🎂🌟", "🎈🎊", "🎉🎁", "🥳🎂", "🌟🎊"],
  "gym-fitness":     ["💪🔥", "🦁", "⚡💪", "🏋️", "💯💪", "🏆", "🦾", "🔥💪", "⚡🏋️", "💥💪", "🏋️‍♂️", "🦵🏽", "🤸", "🏃", "🎽", "🥊", "🤼", "🏅", "🥇", "💣"],
  "free-fire":       ["👑🔥", "⚡", "🎯", "🔥💀", "🏆⚔️", "🎯🔫", "🎮", "【", "🔥", "⚡🔥", "💀🔥", "👑", "⚔️🏆", "🔫🎯", "🎮🎯", "🌟🔥", "💥🔥", "☠️🔥", "🎖️🔥", "⭐🔥"],
  "emoji-styles":    ["😎", "🔥🔥", "🤘😎", "🎉🎊", "👑", "😈", "😇", "💀", "🥶", "😤", "🤩", "🥳", "😏", "🤯", "😱", "🤑", "🥸", "😎👌", "🫡", "💪"],
};

const RIGHT_SYMBOLS: Record<string, string[]> = {
  "royal-crown":     ["♔", "♛", "👑", "⚜", "★", "✦", "ฺ⊹⊱", "◈", "❖", "✿", "🔱", "♕", "⊛", "◆", "⭐", "🌟", "✪", "✯", "✰", "⋆", "꧂", "❁", "𓅓", "🏅", "🥇", "⚝", "🎖", "🏆", "👁", "⚔"],
  "gun-design":      ["︻┳デ═—", "═┳┻︻▄", "︻╦デ╤━╼", "—デ═┳︻", "一═┳︻", "🔫", "💣", "⚔️", "🛡", "💥", "☠", "⚠️", "🎯", "🗡️", "⚡", "★", "✦", "◈", "▲", "꧂"],
  "game-styles":     ["❖", "♔", "乂", "彡", "亗", "々", "〆", "✓", "✘", "▼", "✦", "★", "⚡", "🔥", "💀", "☠", "⚔️", "🏆", "👑", "💯"],
  "anime-design":    ["🌸", "🥷", "⛩️", "(づ｡◕‿‿◕｡)づ", "🍥⛩️", "🔥⚡", "ฅ^•ﻌ•^ฅ", "🎀🌙", "桜", "⛩️", "🗡️", "忍", "🌺", "🎴", "🏮", "🎐", "✿", "❀", "🎋", "🎑"],
  "cute-styles":     ["🎀 ✴✴", "🎀 ✴", "🎀 🍡 ⋆ 🎂", "🎀 :", "🎀 ✧", "ɞ˚‧｡⋆", "♡ ꒱", "☆ﾟ･:*:･｡,★ﾟ･:*:･｡", "🍭", "🍬", "🌷", "🌈", "🦋", "🌸", "💝", "🎀", "✨", "💕", "🍰", "🌻"],
  "symbolic-styles": ["◄———««", "⚡", "♔", "✿◉●•◦", "°†°", "¨*:·. 🌊", ".•´¯`•", "☾━━┙", "✦", "★", "◆", "⚜", "⊱", "≋", "◈", "❖", "⟡", "⊛", "𓆪", "❁"],
  "small-text":      ["˙", "｡", "·", "•", "◦", "⁺", "₊", "˚", "✦", "⋆", "♡", "✿", "⊹", "𓂃", "ᵎ", "ˊ", "ˋ", "ᐟ", "⌇", "𓈒"],
  "line-styles":     ["\n━━━━━━━━━━", " ║\n╚═══════╝", " ┃\n╰━━━━━━━━╯", "\n┄┄┄┄┄┄┄┄", " ▀▄▀▄▀▄", "\n______", " ─────────", "\n══════════", " ───────", " ▬▬▬▬▬▬▬"],
  "squiggle-styles": ["〜〜〜", "～～", "≋", "≈≈≈", "⟿⟿⟿", "⟳", "∿∿", "〰〰", "≋≋", "〜〜", "～〜", "〜～", "≈≈", "∼∼∼", "≋≋≋", "〜", "～", "≈", "∼", "⟿"],
  "ugly-zalgo":      ["🐍♦", "👽✎", "🐧🍓", "🐊♪", "💥🌀", "😈", "👾", "🐍", "💀", "☠", "🦂", "👻", "🕷️", "🦇", "🌑", "⬛", "🖤", "😤", "🤬", "💢"],
  "weird-styles":    ["", "", "", "", "", "", "", "", "", ""],
  "joiner-styles":   ["", "", "", "", "", "", "", "", "", ""],
  "box-styles":      ["", "】", "」", "』", "⦘", "⦆", "❯", "〙", "⌉", "⌋", "⟧", "❵", "⦈", "⟩", "⌝", "⌟", "⎤", "⎦", "▟", "◥"],
  "star-decorated":  ["]彡★", " ✦✦✦", " *:･ﾟ✧*:･ﾟ✧", " ✩°｡⋆", " 🌟✨", " 💫", " ⭐⭐⭐", "✨🌟", "✦", "⭐", "✨💥", "🌠", "✯", "✰", "⚝", "☆", "★", "✪", "✫", "✬"],
  "heart-decorated": ["♥️", "💗💗", "♡¸.·", "✧.*♡", "💖💕", "💓", "💕😍", "❤️", "💖", "💝", "💘", "💞", "💟", "🫀", "♡", "❣️", "💌", "💑", "👫", "🥰"],
  "emotion-styles":  ["(◕‿◕)", "(｡♥‿♥｡)", "(◠‿◠)", "(◕ᴗ◕✿)", "ʕ•ᴥ•ʔ", "", "(✧ω✧)", "(≧◡≦)", "(´｡• ᵕ •｡`)", "(∩˃o˂∩)", "(⌒▽⌒)", "（*＾▽＾）", "(◍•ᴗ•◍)", "ヽ(•‿•)ノ", "( ˘ ³˘)♥", "(｡◕‿◕｡)", "(｡♡‿♡｡)", "", "(っ˘ω˘ς)", "(✿◠‿◠)"],
  "thank-you":       ["✨🙏", "🙏", "💝", "💫🙏", "🙏💖", "✨", "🙏🌟", "🙏💐", "❤️🙏", "💖✨", "🙏🌺", "✨💫", "🙏🎊", "💖🌸", "🌟✨", "🙏💝", "🙏🎉", "💫🌟", "✨💖", "🌟🙏"],
  "sad-styles":      ["😢", "༼;´༎ຶ ۝ ༎ຶ༽", "💔", "(╥﹏╥)", "🌧️", "(｡•́︿•̀｡)", "｡･ﾟﾟ･(>д<)･ﾟﾟ･｡", "😭", "😿", "🥺", "💧", "😔", "(つ﹏<。)", "(ᗒᗩᗕ)", "ᵒᵕᵒ", "( ꩜ ᯅ ꩜;)", "。゜゜(´O`) ゜゜。", "(◞‸◟）", "( ´•̥̥̥ω•̥̥̥` )", "(｡•́︿•̀｡)"],
  "asian-styles":    ["】", "」", "』", "｠", "", "〗", "》", "〕", "〙", "〛", "»", "❯", "〉", "》", "」", "』", "】", "〗", "〙", "〛"],
  "birthday-styles": ["🎂🎉", "🎁🎊", "✨🎂", "🎉🎈", "🎂🌟", "🎈🎉🎊", "🎈🎈", "🎉🥳", "🎊🎁", "🎈🎂", "🎂🎉🎊", "🎉🥂", "🎂✨", "🎀🎁", "✨🎊", "🌟🎂", "🎊🎈", "🎁🎉", "🎂🥳", "🎊🌟"],
  "gym-fitness":     ["🔥💪", "🦁", "💪⚡", "🏋️", "💪💯", "🏆", "🦾", "💪🔥", "🏋️⚡", "💪💥", "🏋️‍♂️", "🦵🏽", "🤸", "🏃", "🎽", "🥊", "🤼", "🏅", "🥇", "💣"],
  "free-fire":       ["🔥👑", "⚡", "🎯", "💀🔥", "⚔️🏆", "🔫🎯", "🎮", "】", "🔥", "🔥⚡", "🔥💀", "👑", "🏆⚔️", "🎯🔫", "🎯🎮", "🔥🌟", "🔥💥", "🔥☠️", "🔥🎖️", "🔥⭐"],
  "emoji-styles":    ["😎", "🔥🔥", "😎🤘", "🎊🎉", "👑", "😈", "😇", "💀", "🥶", "😤", "🤩", "🥳", "😏", "🤯", "😱", "🤑", "🥸", "👌😎", "🫡", "💪"],
};

const SPACERS = [" ", "", " · ", " ★ ", " ✦ ", " 彡 ", " 亗 ", " ⚡ ", " 🔥 ", " 💫 "];

function applyTemplate(template: string, name: string): string {
  return template.replace(/\{name\}/g, name);
}

function getPoolForSection(sectionId: string, side: "left" | "right"): string[] {
  const pool = side === "left" ? LEFT_SYMBOLS[sectionId] : RIGHT_SYMBOLS[sectionId];
  if (pool && pool.length > 0) return pool;
  // fallback to generic symbols
  return side === "left"
    ? ["★", "✦", "♔", "⚡", "🔥", "亗", "乂", "彡", "✿", "♡", "👑", "💫", "✨", "⊰", "❖"]
    : ["★", "✦", "♔", "⚡", "🔥", "亗", "乂", "彡", "✿", "♡", "👑", "💫", "✨", "⊱", "❖"];
}

export interface ExpandedStyle {
  id: string;
  text: string;
  label: string;
}

let _idCtr = 0;
function uid(): string {
  return `dec-${Date.now().toString(36)}-${(_idCtr++).toString(36)}`;
}

/**
 * Generates `count` unique decorative results for a section starting at
 * `offset`. Uses a stable iteration order (template → left → spacer → right)
 * so "load more" always pages through the same sequence.
 */
export function expandSection(
  section: DecorativeSection,
  inputName: string,
  count: number,
  offset: number
): ExpandedStyle[] {
  const styles = section.styles as DecorativeStyle[];
  const leftPool = getPoolForSection(section.id, "left");
  const rightPool = getPoolForSection(section.id, "right");

  const seen = new Set<string>();
  const results: ExpandedStyle[] = [];

  let total = 0;
  let yielded = 0;

  outer: for (const style of styles) {
    const base = applyTemplate(style.template, inputName || "Player");
    // First: the base template itself with no extra decoration
    const baseText = applyTemplate(style.template, inputName || "Player");
    for (const spacer of SPACERS) {
      for (const left of leftPool) {
        for (const right of rightPool) {
          const text =
            left
              ? right
                ? `${left}${spacer}${base}${spacer}${right}`
                : `${left}${spacer}${base}`
              : right
              ? `${base}${spacer}${right}`
              : baseText;

          if (seen.has(text)) continue;
          seen.add(text);

          if (total >= offset) {
            results.push({
              id: uid(),
              text,
              label: style.label,
            });
            yielded++;
            if (yielded >= count) break outer;
          }
          total++;
        }
      }
    }
  }

  return results;
}

/**
 * Estimated total combos per section (upper-bound, before dedup).
 * Used to show "X of N" in the UI and decide whether "load more" is available.
 */
export function estimateSectionTotal(section: DecorativeSection): number {
  const leftPool = getPoolForSection(section.id, "left");
  const rightPool = getPoolForSection(section.id, "right");
  return section.styles.length * SPACERS.length * leftPool.length * rightPool.length;
}
