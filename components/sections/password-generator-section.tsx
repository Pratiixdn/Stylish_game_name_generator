"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, RefreshCw, Shield, Download } from "lucide-react";
import toast from "react-hot-toast";
import { cn, copyToClipboard } from "@/utils";
import {
  generatePasswordBatch,
  estimatePasswordStrength,
  type PasswordOptions,
} from "@/lib/password-generator";

const strengthConfig: Record<string, { label: string; color: string; width: string }> = {
  weak: { label: "Weak", color: "bg-red-500", width: "25%" },
  fair: { label: "Fair", color: "bg-yellow-500", width: "50%" },
  strong: { label: "Strong", color: "bg-blue-500", width: "75%" },
  "very-strong": { label: "Very Strong", color: "bg-green-500", width: "100%" },
};

export function PasswordGeneratorSection() {
  const [baseName, setBaseName] = useState("");
  const [length, setLength] = useState(16);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [batchCount, setBatchCount] = useState(5);
  const [passwords, setPasswords] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const options: PasswordOptions = useMemo(
    () => ({
      length,
      useUppercase,
      useLowercase,
      useNumbers,
      useSymbols,
      baseName: baseName || undefined,
      excludeAmbiguous,
    }),
    [length, useUppercase, useLowercase, useNumbers, useSymbols, baseName, excludeAmbiguous]
  );

  const handleGenerate = useCallback(() => {
    setPasswords(generatePasswordBatch(options, batchCount));
  }, [options, batchCount]);

  const handleCopy = async (password: string, index: number) => {
    const success = await copyToClipboard(password);
    if (success) {
      setCopiedIndex(index);
      toast.success("Password copied!");
      setTimeout(() => setCopiedIndex(null), 2000);
    } else {
      toast.error("Failed to copy");
    }
  };

  const handleExport = () => {
    if (passwords.length === 0) return;
    const blob = new Blob([passwords.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "generated-passwords.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Exported as TXT");
  };

  const toggles: { key: string; label: string; value: boolean; setter: (v: boolean) => void }[] = [
    { key: "upper", label: "Uppercase (A-Z)", value: useUppercase, setter: setUseUppercase },
    { key: "lower", label: "Lowercase (a-z)", value: useLowercase, setter: setUseLowercase },
    { key: "numbers", label: "Numbers (0-9)", value: useNumbers, setter: setUseNumbers },
    { key: "symbols", label: "Symbols (!@#$)", value: useSymbols, setter: setUseSymbols },
    { key: "ambiguous", label: "Exclude ambiguous (0/O, 1/l)", value: excludeAmbiguous, setter: setExcludeAmbiguous },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="glass rounded-2xl shadow-xl border overflow-hidden">
        <div className="p-6 space-y-5">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Seed word <span className="text-muted-foreground">(optional — e.g. your name)</span>
            </label>
            <input
              type="text"
              value={baseName}
              onChange={(e) => setBaseName(e.target.value.slice(0, 20))}
              placeholder="Leave blank for a fully random password"
              className="w-full px-4 py-3 rounded-xl bg-secondary border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none transition-all"
            />
            <p className="text-xs text-muted-foreground mt-1.5">
              Your seed word is lightly obfuscated and mixed with random characters — never used as-is.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Length</label>
              <span className="text-sm font-mono text-muted-foreground">{length} characters</span>
            </div>
            <input
              type="range"
              min={8}
              max={32}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full accent-foreground"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {toggles.map((t) => (
              <label
                key={t.key}
                className="flex items-center gap-2 text-sm cursor-pointer p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <input
                  type="checkbox"
                  checked={t.value}
                  onChange={(e) => t.setter(e.target.checked)}
                  className="rounded border-muted-foreground"
                />
                {t.label}
              </label>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleGenerate}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-foreground text-background font-semibold text-sm transition-all hover:scale-105"
            >
              <Shield className="h-4 w-4" />
              Generate Passwords
            </button>

            <button
              onClick={handleGenerate}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass text-sm font-medium transition-all hover:scale-105"
            >
              <RefreshCw className="h-4 w-4" />
              Regenerate
            </button>

            <div className="flex items-center gap-1 glass rounded-lg p-1">
              {[1, 5, 10, 20].map((count) => (
                <button
                  key={count}
                  onClick={() => setBatchCount(count)}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                    batchCount === count
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {count}
                </button>
              ))}
            </div>

            {passwords.length > 0 && (
              <button
                onClick={handleExport}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass text-sm font-medium transition-all hover:scale-105"
              >
                <Download className="h-4 w-4" />
                Export TXT
              </button>
            )}
          </div>
        </div>

        <div className="p-6 border-t">
          <AnimatePresence mode="popLayout">
            {passwords.length > 0 ? (
              <motion.div layout className="grid grid-cols-1 gap-3">
                <AnimatePresence>
                  {passwords.map((password, index) => {
                    const strength = estimatePasswordStrength(password);
                    const config = strengthConfig[strength];
                    return (
                      <motion.div
                        key={password + index}
                        layout
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.2, delay: index * 0.03 }}
                        className="group flex items-center justify-between gap-3 p-4 rounded-xl glass hover:bg-secondary transition-all cursor-pointer"
                        onClick={() => handleCopy(password, index)}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-mono text-sm truncate">{password}</p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <div className="h-1 w-20 rounded-full bg-secondary overflow-hidden">
                              <div
                                className={cn("h-full rounded-full", config.color)}
                                style={{ width: config.width }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground">{config.label}</span>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(password, index);
                          }}
                          className="p-1.5 rounded-lg hover:bg-background transition-colors shrink-0"
                          title="Copy"
                        >
                          {copiedIndex === index ? (
                            <Check className="h-3.5 w-3.5 text-green-500" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Configure your options above and click Generate to create secure passwords.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
