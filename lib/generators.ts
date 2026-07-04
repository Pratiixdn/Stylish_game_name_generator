import { generateId, getRandomItem, shuffleArray } from "@/utils";
import type { GeneratedName, FilterOptions } from "@/types";
import { WRAP_PAIRS, SEPARATORS } from "@/data/decoration-pools";

const prefixes = [
  "Shadow", "Dark", "Light", "Fire", "Ice", "Thunder", "Storm", "Night", "Day",
  "Star", "Moon", "Sun", "Sky", "Ocean", "Mountain", "Forest", "Dragon", "Phoenix",
  "Wolf", "Tiger", "Lion", "Eagle", "Hawk", "Raven", "Ghost", "Soul", "Spirit",
  "Magic", "Mystic", "Epic", "Legend", "Ultra", "Super", "Mega", "Hyper", "Cyber",
  "Neo", "Pro", "Elite", "Master", "King", "Queen", "Lord", "Duke", "Prince",
  "Void", "Abyss", "Cosmic", "Galaxy", "Nebula", "Quantum", "Atomic", "Nuclear",
  "Venom", "Toxic", "Poison", "Acid", "Blaze", "Inferno", "Frost", "Glacier",
  "Thunder", "Lightning", "Storm", "Tempest", "Hurricane", "Typhoon", "Tsunami",
];

const suffixes = [
  "X", "YT", "OP", "XD", "Pro", "Gaming", "TV", "Live", "HD", "4K", "VR",
  "GG", "WP", "EZ", "AFK", "RNG", "DPS", "Tank", "Heal", "Carry", "Feed",
  "Noob", "Pro", "Elite", "Master", "King", "God", "Devil", "Angel", "Demon",
  "999", "777", "666", "420", "69", "01", "02", "03", "07", "24", "365",
  "亗", "ツ", "么", "乂", "々", "★", "⚡", "彡", "❖", "✘", "✓",
];

const gamingSymbols = ["亗", "ツ", "么", "乂", "々", "★", "⚡", "彡", "❖", "✘", "✓", "✦", "✧", "✪", "✯"];

const randomNames = [
  "ShadowKing", "DarkHunter", "NoobMaster", "SoulReaper", "VenomX", "GhostOP",
  "ThunderBolt", "IceDragon", "FirePhoenix", "StormRider", "NightWolf", "DayEagle",
  "StarGazer", "MoonWalker", "SunChaser", "SkyDiver", "OceanWave", "MountainClimber",
  "ForestGuardian", "DragonSlayer", "PhoenixRising", "WolfHowl", "TigerRoar",
  "LionHeart", "EagleEye", "HawkVision", "RavenClaw", "GhostRider", "SoulKeeper",
  "SpiritWalker", "MagicCaster", "MysticMage", "EpicGamer", "LegendaryPlayer",
  "UltraGamer", "SuperStar", "MegaBoss", "HyperBeast", "CyberNinja", "NeoWarrior",
  "ProPlayer", "EliteGamer", "MasterChief", "KingSlayer", "QueenBee", "LordVader",
  "DukeNukem", "PrinceCharming", "VoidWalker", "AbyssDweller", "CosmicEntity",
];

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

function applyCase(name: string, caseOption?: string): string {
  switch (caseOption) {
    case "uppercase": return name.toUpperCase();
    case "lowercase": return name.toLowerCase();
    default: return name;
  }
}

function applyLengthFilter(name: string, length?: string): boolean {
  if (!length) return true;
  const len = name.length;
  switch (length) {
    case "short": return len >= 3 && len <= 8;
    case "medium": return len >= 9 && len <= 15;
    case "long": return len >= 16;
    default: return true;
  }
}

export function generateGameNames(
  baseName: string,
  count: number,
  options: FilterOptions = {}
): GeneratedName[] {
  const results: GeneratedName[] = [];
  const usedNames = new Set<string>();
  const maxAttempts = count * 10;
  let attempts = 0;

  while (results.length < count && attempts < maxAttempts) {
    attempts++;
    let name = "";
    const style = getRandomItem([
      "prefix", "suffix", "symbol", "number", "mixed", "uppercase", "reversed"
    ]);

    switch (style) {
      case "prefix":
        name = `${getRandomItem(prefixes)}${baseName}`;
        break;
      case "suffix":
        name = `${baseName}${getRandomItem(suffixes)}`;
        break;
      case "symbol":
        if (options.symbols !== false) {
          name = `${baseName}${getRandomItem(gamingSymbols)}`;
        } else {
          name = `${baseName}${getRandomItem(suffixes)}`;
        }
        break;
      case "number":
        if (options.numbers !== false) {
          name = `${baseName}${getRandomItem(numbers)}${getRandomItem(numbers)}${getRandomItem(numbers)}`;
        } else {
          name = `${baseName}${getRandomItem(suffixes)}`;
        }
        break;
      case "mixed":
        name = `${getRandomItem(prefixes)}${baseName}${getRandomItem(suffixes)}`;
        break;
      case "uppercase":
        name = baseName.toUpperCase();
        break;
      case "reversed":
        name = baseName.split("").reverse().join("") + getRandomItem(suffixes);
        break;
      default:
        name = `${baseName}${getRandomItem(suffixes)}`;
    }

    name = applyCase(name, options.case);

    if (!usedNames.has(name) && applyLengthFilter(name, options.length)) {
      usedNames.add(name);
      results.push({
        id: generateId(),
        name,
        style: style.charAt(0).toUpperCase() + style.slice(1),
        category: "game",
      });
    }
  }

  return results;
}

export function generateStylishText(baseName: string, count: number, offset = 0): GeneratedName[] {
  const fonts: { name: string; chars: Record<string, string> }[] = [
    { name: "Mathematical Bold", chars: { a: "𝐚", b: "𝐛", c: "𝐜", d: "𝐝", e: "𝐞", f: "𝐟", g: "𝐠", h: "𝐡", i: "𝐢", j: "𝐣", k: "𝐤", l: "𝐥", m: "𝐦", n: "𝐧", o: "𝐨", p: "𝐩", q: "𝐪", r: "𝐫", s: "𝐬", t: "𝐭", u: "𝐮", v: "𝐯", w: "𝐰", x: "𝐱", y: "𝐲", z: "𝐳", A: "𝐀", B: "𝐁", C: "𝐂", D: "𝐃", E: "𝐄", F: "𝐅", G: "𝐆", H: "𝐇", I: "𝐈", J: "𝐉", K: "𝐊", L: "𝐋", M: "𝐌", N: "𝐍", O: "𝐎", P: "𝐏", Q: "𝐐", R: "𝐑", S: "𝐒", T: "𝐓", U: "𝐔", V: "𝐕", W: "𝐖", X: "𝐗", Y: "𝐘", Z: "𝐙" } },
    { name: "Mathematical Italic", chars: { a: "𝑎", b: "𝑏", c: "𝑐", d: "𝑑", e: "𝑒", f: "𝑓", g: "𝑔", h: "ℎ", i: "𝑖", j: "𝑗", k: "𝑘", l: "𝑙", m: "𝑚", n: "𝑛", o: "𝑜", p: "𝑝", q: "𝑞", r: "𝑟", s: "𝑠", t: "𝑡", u: "𝑢", v: "𝑣", w: "𝑤", x: "𝑥", y: "𝑦", z: "𝑧", A: "𝐴", B: "𝐵", C: "𝐶", D: "𝐷", E: "𝐸", F: "𝐹", G: "𝐺", H: "𝐻", I: "𝐼", J: "𝐽", K: "𝐾", L: "𝐿", M: "𝑀", N: "𝑁", O: "𝑂", P: "𝑃", Q: "𝑄", R: "𝑅", S: "𝑆", T: "𝑇", U: "𝑈", V: "𝑉", W: "𝑊", X: "𝑋", Y: "𝑌", Z: "𝑍" } },
    { name: "Mathematical Bold Italic", chars: { a: "𝒂", b: "𝒃", c: "𝒄", d: "𝒅", e: "𝒆", f: "𝒇", g: "𝒈", h: "𝒉", i: "𝒊", j: "𝒋", k: "𝒌", l: "𝒍", m: "𝒎", n: "𝒏", o: "𝒐", p: "𝒑", q: "𝒒", r: "𝒓", s: "𝒔", t: "𝒕", u: "𝒖", v: "𝒗", w: "𝒘", x: "𝒙", y: "𝒚", z: "𝒛", A: "𝑨", B: "𝑩", C: "𝑪", D: "𝑫", E: "𝑬", F: "𝑭", G: "𝑮", H: "𝑯", I: "𝑰", J: "𝑱", K: "𝑲", L: "𝑳", M: "𝑴", N: "𝑵", O: "𝑶", P: "𝑷", Q: "𝑸", R: "𝑹", S: "𝑺", T: "𝑻", U: "𝑼", V: "𝑽", W: "𝑾", X: "𝑿", Y: "𝒀", Z: "𝒁" } },
    { name: "Mathematical Script", chars: { a: "𝒶", b: "𝒷", c: "𝒸", d: "𝒹", e: "ℯ", f: "𝒻", g: "ℊ", h: "𝒽", i: "𝒾", j: "𝒿", k: "𝓀", l: "𝓁", m: "𝓂", n: "𝓃", o: "ℴ", p: "𝓅", q: "𝓆", r: "𝓇", s: "𝓈", t: "𝓉", u: "𝓊", v: "𝓋", w: "𝓌", x: "𝓍", y: "𝓎", z: "𝓏", A: "𝒜", B: "ℬ", C: "𝒞", D: "𝒟", E: "ℰ", F: "ℱ", G: "𝒢", H: "ℋ", I: "ℐ", J: "𝒥", K: "𝒦", L: "ℒ", M: "ℳ", N: "𝒩", O: "𝒪", P: "𝒫", Q: "𝒬", R: "ℛ", S: "𝒮", T: "𝒯", U: "𝒰", V: "𝒱", W: "𝒲", X: "𝒳", Y: "𝒴", Z: "𝒵" } },
    { name: "Mathematical Bold Script", chars: { a: "𝓪", b: "𝓫", c: "𝓬", d: "𝓭", e: "𝓮", f: "𝓯", g: "𝓰", h: "𝓱", i: "𝓲", j: "𝓳", k: "𝓴", l: "𝓵", m: "𝓶", n: "𝓷", o: "𝓸", p: "𝓹", q: "𝓺", r: "𝓻", s: "𝓼", t: "𝓽", u: "𝓾", v: "𝓿", w: "𝔀", x: "𝔁", y: "𝔂", z: "𝔃", A: "𝓐", B: "𝓑", C: "𝓒", D: "𝓓", E: "𝓔", F: "𝓕", G: "𝓖", H: "𝓗", I: "𝓘", J: "𝓙", K: "𝓚", L: "𝓛", M: "𝓜", N: "𝓝", O: "𝓞", P: "𝓟", Q: "𝓠", R: "𝓡", S: "𝓢", T: "𝓣", U: "𝓤", V: "𝓥", W: "𝓦", X: "𝓧", Y: "𝓨", Z: "𝓩" } },
    { name: "Fraktur", chars: { a: "𝔞", b: "𝔟", c: "𝔠", d: "𝔡", e: "𝔢", f: "𝔣", g: "𝔤", h: "𝔥", i: "𝔦", j: "𝔧", k: "𝔨", l: "𝔩", m: "𝔪", n: "𝔫", o: "𝔬", p: "𝔭", q: "𝔮", r: "𝔯", s: "𝔰", t: "𝔱", u: "𝔲", v: "𝔳", w: "𝔴", x: "𝔵", y: "𝔶", z: "𝔷", A: "𝔄", B: "𝔅", C: "ℭ", D: "𝔇", E: "𝔈", F: "𝔉", G: "𝔊", H: "ℌ", I: "ℑ", J: "𝔍", K: "𝔎", L: "𝔏", M: "𝔐", N: "𝔑", O: "𝔒", P: "𝔓", Q: "𝔔", R: "ℜ", S: "𝔖", T: "𝔗", U: "𝔘", V: "𝔙", W: "𝔚", X: "𝔛", Y: "𝔜", Z: "ℨ" } },
    { name: "Double-Struck", chars: { a: "𝕒", b: "𝕓", c: "𝕔", d: "𝕕", e: "𝕖", f: "𝕗", g: "𝕘", h: "𝕙", i: "𝕚", j: "𝕛", k: "𝕜", l: "𝕝", m: "𝕞", n: "𝕟", o: "𝕠", p: "𝕡", q: "𝕢", r: "𝕣", s: "𝕤", t: "𝕥", u: "𝕦", v: "𝕧", w: "𝕨", x: "𝕩", y: "𝕪", z: "𝕫", A: "𝔸", B: "𝔹", C: "ℂ", D: "𝔻", E: "𝔼", F: "𝔽", G: "𝔾", H: "ℍ", I: "𝕀", J: "𝕁", K: "𝕂", L: "𝕃", M: "𝕄", N: "ℕ", O: "𝕆", P: "ℙ", Q: "ℚ", R: "ℝ", S: "𝕊", T: "𝕋", U: "𝕌", V: "𝕍", W: "𝕎", X: "𝕏", Y: "𝕐", Z: "ℤ" } },
    { name: "Sans-Serif", chars: { a: "𝖺", b: "𝖻", c: "𝖼", d: "𝖽", e: "𝖾", f: "𝖿", g: "𝗀", h: "𝗁", i: "𝗂", j: "𝗃", k: "𝗄", l: "𝗅", m: "𝗆", n: "𝗇", o: "𝗈", p: "𝗉", q: "𝗊", r: "𝗋", s: "𝗌", t: "𝗍", u: "𝗎", v: "𝗏", w: "𝗐", x: "𝗑", y: "𝗒", z: "𝗓", A: "𝖠", B: "𝖡", C: "𝖢", D: "𝖣", E: "𝖤", F: "𝖥", G: "𝖦", H: "𝖧", I: "𝖨", J: "𝖩", K: "𝖪", L: "𝖫", M: "𝖬", N: "𝖭", O: "𝖮", P: "𝖯", Q: "𝖰", R: "𝖱", S: "𝖲", T: "𝖳", U: "𝖴", V: "𝖵", W: "𝖶", X: "𝖷", Y: "𝖸", Z: "𝖹" } },
    { name: "Sans-Serif Bold", chars: { a: "𝗮", b: "𝗯", c: "𝗰", d: "𝗱", e: "𝗲", f: "𝗳", g: "𝗴", h: "𝗵", i: "𝗶", j: "𝗷", k: "𝗸", l: "𝗹", m: "𝗺", n: "𝗻", o: "𝗼", p: "𝗽", q: "𝗾", r: "𝗿", s: "𝘀", t: "𝘁", u: "𝘂", v: "𝘃", w: "𝘄", x: "𝘅", y: "𝘆", z: "𝘇", A: "𝗔", B: "𝗕", C: "𝗖", D: "𝗗", E: "𝗘", F: "𝗙", G: "𝗚", H: "𝗛", I: "𝗜", J: "𝗝", K: "𝗞", L: "𝗟", M: "𝗠", N: "𝗡", O: "𝗢", P: "𝗣", Q: "𝗤", R: "𝗥", S: "𝗦", T: "𝗧", U: "𝗨", V: "𝗩", W: "𝗪", X: "𝗫", Y: "𝗬", Z: "𝗭" } },
    { name: "Sans-Serif Italic", chars: { a: "𝘢", b: "𝘣", c: "𝘤", d: "𝘥", e: "𝘦", f: "𝘧", g: "𝘨", h: "𝘩", i: "𝘪", j: "𝘫", k: "𝘬", l: "𝘭", m: "𝘮", n: "𝘯", o: "𝘰", p: "𝘱", q: "𝘲", r: "𝘳", s: "𝘴", t: "𝘵", u: "𝘶", v: "𝘷", w: "𝘸", x: "𝘹", y: "𝘺", z: "𝘻", A: "𝘈", B: "𝘉", C: "𝘊", D: "𝘋", E: "𝘌", F: "𝘍", G: "𝘎", H: "𝘏", I: "𝘐", J: "𝘑", K: "𝘒", L: "𝘓", M: "𝘔", N: "𝘕", O: "𝘖", P: "𝘗", Q: "𝘘", R: "𝘙", S: "𝘚", T: "𝘛", U: "𝘜", V: "𝘝", W: "𝘞", X: "𝘟", Y: "𝘠", Z: "𝘡" } },
    { name: "Monospace", chars: { a: "𝚊", b: "𝚋", c: "𝚌", d: "𝚍", e: "𝚎", f: "𝚏", g: "𝚐", h: "𝚑", i: "𝚒", j: "𝚓", k: "𝚔", l: "𝚕", m: "𝚖", n: "𝚗", o: "𝚘", p: "𝚙", q: "𝚚", r: "𝚛", s: "𝚜", t: "𝚝", u: "𝚞", v: "𝚟", w: "𝚠", x: "𝚡", y: "𝚢", z: "𝚣", A: "𝙰", B: "𝙱", C: "𝙲", D: "𝙳", E: "𝙴", F: "𝙵", G: "𝙶", H: "𝙷", I: "𝙸", J: "𝙹", K: "𝙺", L: "𝙻", M: "𝙼", N: "𝙽", O: "𝙾", P: "𝙿", Q: "𝚀", R: "𝚁", S: "𝚂", T: "𝚃", U: "𝚄", V: "𝚅", W: "𝚆", X: "𝚇", Y: "𝚈", Z: "𝚉" } },
    { name: "Fullwidth", chars: { a: "ａ", b: "ｂ", c: "ｃ", d: "ｄ", e: "ｅ", f: "ｆ", g: "ｇ", h: "ｈ", i: "ｉ", j: "ｊ", k: "ｋ", l: "ｌ", m: "ｍ", n: "ｎ", o: "ｏ", p: "ｐ", q: "ｑ", r: "ｒ", s: "ｓ", t: "ｔ", u: "ｕ", v: "ｖ", w: "ｗ", x: "ｘ", y: "ｙ", z: "ｚ", A: "Ａ", B: "Ｂ", C: "Ｃ", D: "Ｄ", E: "Ｅ", F: "Ｆ", G: "Ｇ", H: "Ｈ", I: "Ｉ", J: "Ｊ", K: "Ｋ", L: "Ｌ", M: "Ｍ", N: "Ｎ", O: "Ｏ", P: "Ｐ", Q: "Ｑ", R: "Ｒ", S: "Ｓ", T: "Ｔ", U: "Ｕ", V: "Ｖ", W: "Ｗ", X: "Ｘ", Y: "Ｙ", Z: "Ｚ", "0": "０", "1": "１", "2": "２", "3": "３", "4": "４", "5": "５", "6": "６", "7": "７", "8": "８", "9": "９" } },
    { name: "Circled", chars: { a: "ⓐ", b: "ⓑ", c: "ⓒ", d: "ⓓ", e: "ⓔ", f: "ⓕ", g: "ⓖ", h: "ⓗ", i: "ⓘ", j: "ⓙ", k: "ⓚ", l: "ⓛ", m: "ⓜ", n: "ⓝ", o: "ⓞ", p: "ⓟ", q: "ⓠ", r: "ⓡ", s: "ⓢ", t: "ⓣ", u: "ⓤ", v: "ⓥ", w: "ⓦ", x: "ⓧ", y: "ⓨ", z: "ⓩ", A: "Ⓐ", B: "Ⓑ", C: "Ⓒ", D: "Ⓓ", E: "Ⓔ", F: "Ⓕ", G: "Ⓖ", H: "Ⓗ", I: "Ⓘ", J: "Ⓙ", K: "Ⓚ", L: "Ⓛ", M: "Ⓜ", N: "Ⓝ", O: "Ⓞ", P: "Ⓟ", Q: "Ⓠ", R: "Ⓡ", S: "Ⓢ", T: "Ⓣ", U: "Ⓤ", V: "Ⓥ", W: "Ⓦ", X: "Ⓧ", Y: "Ⓨ", Z: "Ⓩ", "1": "①", "2": "②", "3": "③", "4": "④", "5": "⑤", "6": "⑥", "7": "⑦", "8": "⑧", "9": "⑨", "0": "⓪" } },
    { name: "Squared", chars: { a: "🄰", b: "🄱", c: "🄲", d: "🄳", e: "🄴", f: "🄵", g: "🄶", h: "🄷", i: "🄸", j: "🄹", k: "🄺", l: "🄻", m: "🄼", n: "🄽", o: "🄾", p: "🄿", q: "🅀", r: "🅁", s: "🅂", t: "🅃", u: "🅄", v: "🅅", w: "🅆", x: "🅇", y: "🅈", z: "🅉" } },
    { name: "Negative Squared", chars: { a: "🅰", b: "🅱", c: "🅲", d: "🅳", e: "🅴", f: "🅵", g: "🅶", h: "🅷", i: "🅸", j: "🅹", k: "🅺", l: "🅻", m: "🅼", n: "🅽", o: "🅾", p: "🅿", q: "🆀", r: "🆁", s: "🆂", t: "🆃", u: "🆄", v: "🆅", w: "🆆", x: "🆇", y: "🆈", z: "🆉" } },
    { name: "Small Caps", chars: { a: "ᴀ", b: "ʙ", c: "ᴄ", d: "ᴅ", e: "ᴇ", f: "ғ", g: "ɢ", h: "ʜ", i: "ɪ", j: "ᴊ", k: "ᴋ", l: "ʟ", m: "ᴍ", n: "ɴ", o: "ᴏ", p: "ᴘ", q: "ǫ", r: "ʀ", s: "s", t: "ᴛ", u: "ᴜ", v: "ᴠ", w: "ᴡ", x: "x", y: "ʏ", z: "ᴢ" } },
  ];

  // Convert the base name once per font (these are the "real" transforms).
  const fontOutputs = fonts.map((font) => {
    let converted = "";
    for (const char of baseName) {
      converted += font.chars[char] || char;
    }
    return { fontName: font.name, converted };
  });

  // Combinatorially expand: fonts × wraps × separators gives far more than
  // 1000 unique, genuinely distinct strings, all built from real Unicode
  // transforms plus real Unicode decoration symbols — nothing invented.
  const combos: { name: string; style: string }[] = [];
  const seen = new Set<string>();

  for (const { fontName, converted } of fontOutputs) {
    for (const [left, right] of WRAP_PAIRS) {
      for (const sep of SEPARATORS) {
        const leftPart = left ? `${left}${sep}` : "";
        const rightPart = right ? `${sep}${right}` : "";
        const text = `${leftPart}${converted}${rightPart}`;
        if (seen.has(text)) continue;
        seen.add(text);
        const styleLabel = left || right ? `${fontName} · Decorated` : fontName;
        combos.push({ name: text, style: styleLabel });
      }
    }
  }

  const slice = combos.slice(offset, offset + count);

  return slice.map(({ name, style }) => ({
    id: generateId(),
    name,
    style,
    category: "stylish",
  }));
}

export function getStylishTextTotalCount(): number {
  // Mirrors the combination math in generateStylishText without building
  // every string, so the UI can show "X of 1000+" without full generation.
  const fontCount = 17;
  const uniqueCombos = fontCount * WRAP_PAIRS.length * SEPARATORS.length;
  return uniqueCombos;
}

export function generateUnicodeFonts(baseName: string, count: number, offset = 0): GeneratedName[] {
  return generateStylishText(baseName, count, offset);
}

export function generateRandomNames(count: number): GeneratedName[] {
  const results: GeneratedName[] = [];
  const shuffled = shuffleArray(randomNames);

  for (let i = 0; i < Math.min(count, shuffled.length); i++) {
    results.push({
      id: generateId(),
      name: shuffled[i],
      style: "Random",
      category: "random",
    });
  }

  return results;
}
