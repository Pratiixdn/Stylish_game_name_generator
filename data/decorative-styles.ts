/**
 * Decorative "wrap" style templates — unlike the character-map fonts in
 * data/fonts.ts (which re-encode every letter), these wrap the input name
 * with symbols/emoji/borders. Use {name} as the substitution token.
 * Organized into the same named sections as the reference design list.
 */

export interface DecorativeStyle {
  id: string;
  label: string;
  template: string; // use {name} where the input should go
  joiner?: string; // if set, characters are interleaved with this joiner
  wrapEach?: [string, string]; // if set, each character is wrapped individually
  transform?: "superscript" | "subscript" | "smallcaps" | "reversed" | "bubble" | "fullwidth" | "mirror" | "strikethrough";
}

export interface DecorativeSection {
  id: string;
  title: string;
  styles: DecorativeStyle[];
}

export const decorativeStyleSections: DecorativeSection[] = [
  {
    id: "royal-crown",
    title: "Royal & Crown Styles",
    styles: [
      { id: "royal-crown", label: "Royal Crown", template: "⊰⊹ฺ ♔ {name} ♔ ฺ⊹⊱" },
      { id: "cool-boy", label: "Cool Boy", template: "亗 COOL {name} ×͜×" },
      { id: "trident", label: "Trident", template: "⊰⊹ฺ 🔱 {name} 🔱 ฺ⊹⊱" },
      { id: "christian-cross", label: "Christian Cross", template: "⊰⊹ฺ ✞ {name} ✞ ฺ⊹⊱" },
      { id: "ind-warrior", label: "IND Warrior", template: "ᴵᴺᴰ ϟ {name} ⚝" },
      { id: "sparkle-star", label: "Sparkle Star", template: "✧ {name} ⚝" },
      { id: "ind-king", label: "IND King", template: "ᴵᴺᴰ ͜͡ {name} 亗" },
      { id: "boxed-crown", label: "Boxed Crown", template: "♔ ⟦ {name} ⟧ ♔" },
      { id: "alone-boy", label: "Alone Boy", template: "×͜× ALONE BOY {name}" },
      { id: "mixed-char", label: "Mixed Char", template: "Cool ジり {name} 〆" },
    ],
  },
  {
    id: "gun-design",
    title: "Gun Design Styles",
    styles: [
      { id: "sniper-style", label: "Sniper Style", template: "︻┳デ═— {name} —デ═┳︻" },
      { id: "ak-47", label: "AK-47", template: "▄︻┻┳═一 {name} 一═┳┻︻▄" },
      { id: "pistol", label: "Pistol", template: "╾━╤デ╦︻ {name} ︻╦デ╤━╼" },
      { id: "double-smg", label: "Double SMG", template: "︻デ═一 {name} 一═デ︻" },
      { id: "rifle", label: "Rifle", template: "︻┳═一 {name} 一═┳︻" },
      { id: "gatling-gun", label: "Gatling Gun", template: "︻╦̵̵͇̿̿̿̿══╤─ {name} ─╤══̿̿̿̿" },
      { id: "rocket-launcher", label: "Rocket Launcher", template: "︻┳═一 {name} ╾━╤デ╦︻" },
      { id: "desert-eagle", label: "Desert Eagle", template: "🔫 {name} 🔫" },
    ],
  },
  {
    id: "game-styles",
    title: "Game Styles",
    styles: [
      { id: "pro-legend", label: "PRO LEGEND", template: "❖ PRO LEGEND {name} ❖" },
      { id: "mr-king", label: "MR √ King", template: "♔ MR √ {name} ☂" },
      { id: "the-flash", label: "The Flash", template: "тнє {name} ⚡" },
      { id: "legendary", label: "Legendary々", template: "ʟᴇɢᴇɴᴅ {name} 々" },
      { id: "pro-player", label: "Pro Player〆", template: "ᴘʀᴏ {name} 〆" },
      { id: "noob-style", label: "Noob Style", template: "NOOB彡《 {name} 》" },
      { id: "ak47-warrior", label: "AK47 Warrior", template: "ӒK47艾 {name}" },
      { id: "cross-killer", label: "Cross Killer", template: "乂 {name} 乂" },
      { id: "ninja-move", label: "Ninja Move", template: "༺デ═一 {name} 一═デ༻" },
      { id: "dark-knight", label: "Dark Knight", template: "▼ {name} ▼" },
    ],
  },
  {
    id: "anime-design",
    title: "Anime Design Styles",
    styles: [
      { id: "sakura", label: "Sakura", template: "🌸 {name} 🌸" },
      { id: "ninja", label: "Ninja", template: "🥷 {name} 🥷" },
      { id: "katana", label: "Katana", template: "⚔️ {name} ⛩️" },
      { id: "otaku-love", label: "Otaku Love", template: "(づ｡◕‿‿◕｡)づ {name}" },
      { id: "shinobi", label: "Shinobi", template: "🍥⛩️ {name} ⛩️🍥" },
      { id: "super-saiyan", label: "Super Saiyan", template: "⚡🔥 {name} 🔥⚡" },
      { id: "kawaii-neko", label: "Kawaii Neko", template: "ฅ^•ﻌ•^ฅ {name} ฅ^•ﻌ•^ฅ" },
      { id: "moon-prism", label: "Moon Prism", template: "🌙🎀 {name} 🎀🌙" },
    ],
  },
  {
    id: "cute-styles",
    title: "Cute Styles",
    styles: [
      { id: "cute-heart-1", label: "Cute Heart 1", template: "✴✴ 🎀 {name} 🎀 ✴✴" },
      { id: "cute-heart-2", label: "Cute Heart 2", template: "✴ 🎀 {name} 🎀 ✴" },
      { id: "cute-candy", label: "Cute Candy", template: "🎂 ⋆ 🍡 🎀 {name} 🎀 🍡 ⋆ 🎂" },
      { id: "cute-bow", label: "Cute Bow", template: ": 🎀 {name} 🎀 :" },
      { id: "cute-sparkle", label: "Cute Sparkle", template: "✧ 🎀 {name} 🎀 ✧" },
      { id: "kawaii", label: "Kawaii", template: "⋆｡‧˚ʚ {name} ɞ˚‧｡⋆" },
      { id: "pastel-dream", label: "Pastel Dream", template: "꒰ ♡ {name} ♡ ꒱" },
      { id: "sweet", label: "Sweet", template: "｡･:*:･ﾟ★,｡･:*:･ﾟ☆ {name} ☆ﾟ･:*:･｡,★ﾟ･:*:･｡" },
    ],
  },
  {
    id: "symbolic-styles",
    title: "Symbolic Styles",
    styles: [
      { id: "double-arrow", label: "Double Arrow", template: "»»———► {name} ◄———««" },
      { id: "lightning", label: "Lightning", template: "⚡{name}⚡" },
      { id: "crown", label: "Crown", template: "♔ {name} ♔" },
      { id: "tribal", label: "Tribal", template: "◦•●◉✿ {name} ✿◉●•◦" },
      { id: "elegant", label: "Elegant", template: "°†° «[{name}]» °†°" },
      { id: "wave", label: "Wave", template: "🌊 .·:*¨{name}¨*:·. 🌊" },
      { id: "symbol-mix", label: "Symbol Mix", template: "•´¯`•. {name} .•´¯`•" },
      { id: "ornate", label: "Ornate", template: "┕━━☽【{name}】☾━━┙" },
    ],
  },
  {
    id: "small-text",
    title: "Small Text Styles",
    styles: [
      { id: "superscript", label: "Superscript", template: "{name}", transform: "superscript" },
      { id: "subscript", label: "Subscript", template: "{name}", transform: "subscript" },
      { id: "mini-caps", label: "Mini Caps", template: "{name}", transform: "smallcaps" },
      { id: "tiny", label: "Tiny", template: "˙{name}˙" },
      { id: "small-aesthetic", label: "Small Aesthetic", template: "｡{name}｡" },
      { id: "micro", label: "Micro", template: "·{name}·" },
    ],
  },
  {
    id: "line-styles",
    title: "Line Styles",
    styles: [
      { id: "top-bottom", label: "Top Bottom", template: "━━━━━━━━━━\n{name}\n━━━━━━━━━━" },
      { id: "boxed", label: "Boxed", template: "╔═══════╗\n║ {name} ║\n╚═══════╝" },
      { id: "double-line", label: "Double Line", template: "╭━━━━━━━━╮\n┃ {name} ┃\n╰━━━━━━━━╯" },
      { id: "dashed", label: "Dashed", template: "┄┄┄┄┄┄┄┄\n{name}\n┄┄┄┄┄┄┄┄" },
      { id: "thick-border", label: "Thick Border", template: "▀▄▀▄▀▄ {name} ▀▄▀▄▀▄" },
      { id: "underline", label: "Underline", template: "{name}\n______" },
      { id: "overline", label: "Overline", template: "‾‾‾‾‾‾\n{name}" },
    ],
  },
  {
    id: "squiggle-styles",
    title: "Squiggle Styles",
    styles: [
      { id: "wave-1", label: "Wave 1", template: "〜〜〜 {name} 〜〜〜" },
      { id: "wave-2", label: "Wave 2", template: "～～{name}～～" },
      { id: "curvy", label: "Curvy", template: "≋{name}≋" },
      { id: "wavy-lines", label: "Wavy Lines", template: "≈≈≈ {name} ≈≈≈" },
      { id: "zigzag", label: "Zigzag", template: "⟿⟿⟿ {name} ⟿⟿⟿" },
      { id: "spiral", label: "Spiral", template: "⟲ {name} ⟳" },
      { id: "squiggly", label: "Squiggly", template: "∿∿ {name} ∿∿" },
    ],
  },
  {
    id: "ugly-zalgo",
    title: "Ugly / Zalgo Styles",
    styles: [
      { id: "crazy-1", label: "Crazy 1", template: "👺😡 {name} 🐍♦" },
      { id: "crazy-2", label: "Crazy 2", template: "💜👊 {name} 👽✎" },
      { id: "monster", label: "Monster", template: "⛵♬ {name} 🐧🍓" },
      { id: "chaotic", label: "Chaotic", template: "👺💛 {name} 🐊♪" },
      { id: "wild", label: "Wild", template: "🌀💥 {name} 💥🌀" },
    ],
  },
  {
    id: "weird-styles",
    title: "Weird Styles",
    styles: [
      { id: "inverted", label: "Inverted", template: "{name}", transform: "mirror" },
      { id: "reversed-weird", label: "Reversed", template: "{name}", transform: "reversed" },
      { id: "strikethrough-weird", label: "Strikethrough", template: "{name}", transform: "strikethrough" },
      { id: "bubble-weird", label: "Bubble", template: "{name}", transform: "bubble" },
      { id: "fullwidth-weird", label: "Fullwidth", template: "{name}", transform: "fullwidth" },
    ],
  },
  {
    id: "joiner-styles",
    title: "Joiner Styles",
    styles: [
      { id: "dot-joiner", label: "Dot Joiner", template: "{name}", joiner: "•" },
      { id: "star-joiner", label: "Star Joiner", template: "{name}", joiner: "★" },
      { id: "arrow-joiner", label: "Arrow Joiner", template: "{name}", joiner: "→" },
      { id: "heart-joiner", label: "Heart Joiner", template: "{name}", joiner: "♡" },
      { id: "circle-joiner", label: "Circle Joiner", template: "{name}", joiner: "○" },
      { id: "dash-joiner", label: "Dash Joiner", template: "{name}", joiner: "-" },
      { id: "wave-joiner", label: "Wave Joiner", template: "{name}", joiner: "~" },
      { id: "space-joiner", label: "Space Joiner", template: "{name}", joiner: "  " },
    ],
  },
  {
    id: "box-styles",
    title: "Box Styles",
    styles: [
      { id: "boxed-letters", label: "Boxed Letters", template: "{name}", wrapEach: ["【", "】"] },
      { id: "brackets", label: "Brackets", template: "{name}", wrapEach: ["［", "］"] },
      { id: "double-bracket", label: "Double Bracket", template: "{name}", wrapEach: ["⦑", "⦒"] },
      { id: "circled-box", label: "Circled", template: "{name}", transform: "bubble" },
      { id: "parentheses", label: "Parentheses", template: "⦅{name}⦆" },
    ],
  },
  {
    id: "star-decorated",
    title: "Star Decorated Styles",
    styles: [
      { id: "star-frame", label: "Star Frame", template: "★彡[{name}]彡★" },
      { id: "starry", label: "Starry", template: "✦✦✦ {name} ✦✦✦" },
      { id: "sparkle-stars", label: "Sparkle Stars", template: "✧･ﾟ: *✧･ﾟ:* {name} *:･ﾟ✧*:･ﾟ✧" },
      { id: "star-border", label: "Star Border", template: "⋆｡°✩ {name} ✩°｡⋆" },
      { id: "night-sky", label: "Night Sky", template: "✨🌟 {name} 🌟✨" },
      { id: "shooting-star", label: "Shooting Star", template: "💫 {name} 💫" },
      { id: "star-trail", label: "Star Trail", template: "⭐⭐⭐ {name} ⭐⭐⭐" },
    ],
  },
  {
    id: "heart-decorated",
    title: "Heart Decorated Styles",
    styles: [
      { id: "love-frame", label: "Love Frame", template: "♥️ {name} ♥️" },
      { id: "heart-border", label: "Heart Border", template: "💗💗 {name} 💗💗" },
      { id: "romantic", label: "Romantic", template: "·.¸♡ {name} ♡¸.·" },
      { id: "love-wings", label: "Love Wings", template: "♡*.✧ {name} ✧.*♡" },
      { id: "hearts-around", label: "Hearts Around", template: "💕💖 {name} 💖💕" },
      { id: "pink-love", label: "Pink Love", template: "💓 {name} 💓" },
      { id: "heart-eyes", label: "Heart Eyes", template: "😍💕 {name} 💕😍" },
    ],
  },
  {
    id: "emotion-styles",
    title: "Emotion Styles",
    styles: [
      { id: "happy", label: "Happy", template: "(◕‿◕) {name} (◕‿◕)" },
      { id: "love-face", label: "Love Face", template: "(｡♥‿♥｡) {name} (｡♥‿♥｡)" },
      { id: "cute-face", label: "Cute Face", template: "(◠‿◠) {name} (◠‿◠)" },
      { id: "kawaii-face", label: "Kawaii Face", template: "(◕ᴗ◕✿) {name} (◕ᴗ◕✿)" },
      { id: "bear-hug", label: "Bear Hug", template: "ʕ•ᴥ•ʔ {name} ʕ•ᴥ•ʔ" },
      { id: "table-flip", label: "Table Flip", template: "(╯°□°）╯ {name}" },
      { id: "sparkle-eyes", label: "Sparkle Eyes", template: "(✧ω✧) {name} (✧ω✧)" },
    ],
  },
  {
    id: "thank-you",
    title: "Thank You Styles",
    styles: [
      { id: "grateful", label: "Grateful", template: "🙏✨ {name} ✨🙏" },
      { id: "thank-you", label: "Thank You", template: "🙏 Thank You - {name} 🙏" },
      { id: "appreciation", label: "Appreciation", template: "💝 {name} - With Gratitude 💝" },
      { id: "blessed", label: "Blessed", template: "🙏💫 {name} 💫🙏" },
      { id: "thanks-heart", label: "Thanks Heart", template: "💖🙏 {name} 🙏💖" },
      { id: "gratitude", label: "Gratitude", template: "✨ {name} - Forever Grateful ✨" },
    ],
  },
  {
    id: "sad-styles",
    title: "Sad Styles",
    styles: [
      { id: "crying", label: "Crying", template: "😢 {name} 😢" },
      { id: "tears", label: "Tears", template: "༼;´༎ຶ ۝ ༎ຶ༽ {name}" },
      { id: "heartbroken", label: "Heartbroken", template: "💔 {name} 💔" },
      { id: "sobbing", label: "Sobbing", template: "(╥﹏╥) {name} (╥﹏╥)" },
      { id: "rain", label: "Rain", template: "🌧️ {name} 🌧️" },
      { id: "blue", label: "Blue", template: "(｡•́︿•̀｡) {name}" },
      { id: "melancholy", label: "Melancholy", template: "｡･ﾟﾟ･(>д<)･ﾟﾟ･｡ {name}" },
    ],
  },
  {
    id: "asian-styles",
    title: "Asian Styles",
    styles: [
      { id: "chinese-style", label: "Chinese Style", template: "【{name}】" },
      { id: "japanese", label: "Japanese", template: "「{name}」" },
      { id: "asian-brackets", label: "Asian Brackets", template: "『{name}』" },
      { id: "cjk-style", label: "CJK Style", template: "｟{name}｠" },
      { id: "kaomoji", label: "Kaomoji", template: "(ノ◕ヮ◕)ノ*:･ﾟ✧ {name}" },
      { id: "kawaii-asian", label: "Kawaii Asian", template: "〖{name}〗" },
      { id: "oriental", label: "Oriental", template: "《{name}》" },
    ],
  },
  {
    id: "birthday-styles",
    title: "Birthday Styles",
    styles: [
      { id: "party", label: "Party", template: "🎉🎂 {name} 🎂🎉" },
      { id: "celebration", label: "Celebration", template: "🎊🎁 Happy Birthday {name} 🎁🎊" },
      { id: "cake-time", label: "Cake Time", template: "🎂✨ {name} ✨🎂" },
      { id: "birthday-bash", label: "Birthday Bash", template: "🎈🎉 {name} 🎉🎈" },
      { id: "special-day", label: "Special Day", template: "🌟🎂 {name}'s Birthday! 🎂🌟" },
      { id: "confetti", label: "Confetti", template: "🎊🎉🎈 {name} 🎈🎉🎊" },
      { id: "balloons", label: "Balloons", template: "🎈🎈 {name} 🎈🎈" },
    ],
  },
  {
    id: "gym-fitness",
    title: "Gym & Fitness Styles",
    styles: [
      { id: "muscle-power", label: "Muscle Power", template: "💪🔥 {name} 🔥💪" },
      { id: "beast-mode", label: "Beast Mode", template: "🦁 {name} 🦁" },
      { id: "gym-warrior", label: "Gym Warrior", template: "⚡💪 {name} 💪⚡" },
      { id: "fitness-freak", label: "Fitness Freak", template: "🏋️ {name} 🏋️" },
      { id: "strong", label: "Strong", template: "💯💪 {name} 💪💯" },
      { id: "champion", label: "Champion", template: "🏆 {name} 🏆" },
      { id: "bodybuilder", label: "Bodybuilder", template: "🦾 {name} 🦾" },
    ],
  },
  {
    id: "free-fire",
    title: "Free Fire Styles",
    styles: [
      { id: "ff-king", label: "FF King", template: "👑🔥 {name} 🔥👑" },
      { id: "pro-player-ff", label: "Pro Player", template: "⚡ {name} ⚡" },
      { id: "headshot", label: "Headshot", template: "🎯 {name} 🎯" },
      { id: "booyah", label: "Booyah", template: "🔥💀 {name} 💀🔥" },
      { id: "legend-ff", label: "Legend", template: "🏆⚔️ {name} ⚔️🏆" },
      { id: "sniper-ff", label: "Sniper", template: "🎯🔫 {name} 🔫🎯" },
      { id: "gamer", label: "Gamer", template: "🎮 {name} 🎮" },
      { id: "ff-stylish", label: "FF Stylish", template: "【{name}】" },
    ],
  },
  {
    id: "emoji-styles",
    title: "Emoji Styles",
    styles: [
      { id: "cool-guy", label: "Cool Guy", template: "😎 {name} 😎" },
      { id: "fire", label: "Fire", template: "🔥🔥 {name} 🔥🔥" },
      { id: "rockstar", label: "Rockstar", template: "🤘😎 {name} 😎🤘" },
      { id: "party-emoji", label: "Party", template: "🎉🎊 {name} 🎊🎉" },
      { id: "king-queen", label: "King Queen", template: "👑 {name} 👑" },
      { id: "devil", label: "Devil", template: "😈 {name} 😈" },
      { id: "angel", label: "Angel", template: "😇 {name} 😇" },
      { id: "skull", label: "Skull", template: "💀 {name} 💀" },
    ],
  },
];
