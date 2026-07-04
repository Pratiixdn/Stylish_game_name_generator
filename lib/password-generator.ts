export interface PasswordOptions {
  length: number;
  useUppercase: boolean;
  useLowercase: boolean;
  useNumbers: boolean;
  useSymbols: boolean;
  baseName?: string; // optional seed word, e.g. the user's name
  excludeAmbiguous?: boolean; // exclude 0/O, 1/l/I, etc.
}

const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";
const AMBIGUOUS = "0OoIl1";

function stripAmbiguous(pool: string): string {
  return pool
    .split("")
    .filter((c) => !AMBIGUOUS.includes(c))
    .join("");
}

function secureRandomInt(max: number): number {
  if (typeof window !== "undefined" && window.crypto?.getRandomValues) {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    return arr[0] % max;
  }
  return Math.floor(Math.random() * max);
}

function leetify(word: string): string {
  const map: Record<string, string> = { a: "@", A: "@", e: "3", E: "3", i: "1", I: "1", o: "0", O: "0", s: "$", S: "$" };
  return word
    .split("")
    .map((ch) => (Math.random() > 0.5 && map[ch] ? map[ch] : ch))
    .join("");
}

/**
 * Generates a single password from the given options. When baseName is
 * provided, the (lightly obfuscated) name is woven in as a memorable
 * anchor, padded with random characters from the selected pools to reach
 * the requested length and satisfy character-class requirements.
 */
export function generatePassword(options: PasswordOptions): string {
  const {
    length,
    useUppercase,
    useLowercase,
    useNumbers,
    useSymbols,
    baseName,
    excludeAmbiguous,
  } = options;

  let pool = "";
  if (useLowercase) pool += LOWER;
  if (useUppercase) pool += UPPER;
  if (useNumbers) pool += NUMS;
  if (useSymbols) pool += SYMBOLS;
  if (!pool) pool = LOWER + NUMS; // safety fallback if all options were disabled

  if (excludeAmbiguous) pool = stripAmbiguous(pool);

  const chars: string[] = [];

  if (baseName && baseName.trim()) {
    const seed = leetify(baseName.trim().replace(/\s+/g, ""));
    chars.push(...seed.split(""));
  }

  while (chars.length < length) {
    chars.push(pool[secureRandomInt(pool.length)]);
  }

  // Shuffle so the seed word isn't always at the start, then trim to length
  for (let i = chars.length - 1; i > 0; i--) {
    const j = secureRandomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.slice(0, length).join("");
}

export function generatePasswordBatch(options: PasswordOptions, count: number): string[] {
  const results = new Set<string>();
  let attempts = 0;
  while (results.size < count && attempts < count * 5) {
    results.add(generatePassword(options));
    attempts += 1;
  }
  return Array.from(results);
}

export type PasswordStrength = "weak" | "fair" | "strong" | "very-strong";

export function estimatePasswordStrength(password: string): PasswordStrength {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 2) return "weak";
  if (score <= 4) return "fair";
  if (score <= 6) return "strong";
  return "very-strong";
}
