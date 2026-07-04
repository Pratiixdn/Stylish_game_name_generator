"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Heart,
  Share2,
  RefreshCw,
  Search,
  Filter,
  Sparkles,
  Type,
  Shapes,
  Users,
  User,
  Gamepad2,
  Wand2,
  Check,
  Star,
} from "lucide-react";
import { cn, generateId, copyToClipboard } from "@/utils";
import toast from "react-hot-toast";
import { generateGameNames, generateStylishText, generateUnicodeFonts } from "@/lib/generators";
import { symbols } from "@/data/symbols";
import type { GeneratedName, FilterOptions } from "@/types";

const tabs = [
  { id: "game", label: "Game Names", icon: Gamepad2 },
  { id: "stylish", label: "Stylish Text", icon: Type },
  { id: "unicode", label: "Unicode Fonts", icon: Sparkles },
  { id: "symbols", label: "Symbols", icon: Shapes },
  { id: "clan", label: "Clan Names", icon: Users },
  { id: "nickname", label: "Nicknames", icon: User },
];

const bulkOptions = [10, 50, 100, 500];

export function GeneratorSection() {
  const [activeTab, setActiveTab] = useState("game");
  const [input, setInput] = useState("");
  const [generatedNames, setGeneratedNames] = useState<GeneratedName[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [history, setHistory] = useState<GeneratedName[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [bulkCount, setBulkCount] = useState(10);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    const savedHistory = localStorage.getItem("history");
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history.slice(0, 100)));
  }, [history]);

  const handleGenerate = useCallback(() => {
    setIsGenerating(true);

    setTimeout(() => {
      let results: GeneratedName[] = [];

      switch (activeTab) {
        case "game":
          results = generateGameNames(input || "Player", bulkCount, filterOptions);
          break;
        case "stylish":
          results = generateStylishText(input || "Style", bulkCount);
          break;
        case "unicode":
          results = generateUnicodeFonts(input || "Font", bulkCount);
          break;
        case "symbols":
          results = symbols.slice(0, bulkCount).map((s) => ({
            id: generateId(),
            name: s.char,
            style: s.category,
            category: "symbol",
          }));
          break;
        case "clan":
          results = generateGameNames(input || "Clan", bulkCount, { ...filterOptions, style: "clan" });
          break;
        case "nickname":
          results = generateGameNames(input || "Nick", bulkCount, { ...filterOptions, style: "nickname" });
          break;
      }

      setGeneratedNames(results);
      setHistory((prev) => [...results, ...prev].slice(0, 100));
      setIsGenerating(false);
    }, 300);
  }, [activeTab, input, bulkCount, filterOptions]);

  useEffect(() => {
    handleGenerate();
  }, []);

  const handleCopy = async (name: string, id: string) => {
    const success = await copyToClipboard(name);
    if (success) {
      setCopiedId(id);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopiedId(null), 2000);
    } else {
      toast.error("Failed to copy");
    }
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
    toast.success(
      favorites.includes(id) ? "Removed from favorites" : "Added to favorites"
    );
  };

  const handleShare = async (name: string) => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Check out this name!", text: name });
      } catch {
        // User cancelled
      }
    } else {
      await handleCopy(name, "share");
    }
  };

  const handleExport = (format: "txt" | "csv" | "json") => {
    const names = generatedNames.map((n) => n.name);
    let content = "";
    let mimeType = "";
    let extension = "";

    switch (format) {
      case "txt":
        content = names.join("\n");
        mimeType = "text/plain";
        extension = "txt";
        break;
      case "csv":
        content = "Name,Style,Category\n" + generatedNames.map((n) => `"${n.name}","${n.style}","${n.category}"`).join("\n");
        mimeType = "text/csv";
        extension = "csv";
        break;
      case "json":
        content = JSON.stringify(generatedNames, null, 2);
        mimeType = "application/json";
        extension = "json";
        break;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `generated-names.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Exported as ${format.toUpperCase()}`);
  };

  const filteredNames = generatedNames.filter((name) =>
    name.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="generator" className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Generate Your Perfect <span className="text-gradient">Name</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose from multiple generators to create unique gaming names, stylish text, fancy symbols, and more.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-2xl shadow-xl border overflow-hidden">
            {/* Tabs */}
            <div className="flex overflow-x-auto scrollbar-hide border-b">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap border-b-2",
                    activeTab === tab.id
                      ? "border-foreground text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-6 space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value.slice(0, 30))}
                  placeholder="Enter your name or any word..."
                  className="w-full px-4 py-4 rounded-xl bg-secondary border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none transition-all"
                  onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                  {input.length}/30
                </div>
              </div>

              {/* Controls */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-foreground text-background font-semibold text-sm transition-all hover:scale-105 disabled:opacity-50"
                >
                  <Wand2 className="h-4 w-4" />
                  {isGenerating ? "Generating..." : "Generate"}
                </button>

                <button
                  onClick={() => {
                    setInput("");
                    handleGenerate();
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass text-sm font-medium transition-all hover:scale-105"
                >
                  <RefreshCw className="h-4 w-4" />
                  Randomize
                </button>

                <div className="flex items-center gap-1 glass rounded-lg p-1">
                  {bulkOptions.map((count) => (
                    <button
                      key={count}
                      onClick={() => setBulkCount(count)}
                      className={cn(
                        "px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                        bulkCount === count
                          ? "bg-foreground text-background"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {count}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass text-sm font-medium transition-all",
                    showFilters && "bg-secondary"
                  )}
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </button>
              </div>

              {/* Filters Panel */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <select
                        className="px-3 py-2 rounded-lg bg-secondary border-0 text-sm focus:ring-2 focus:ring-ring"
                        value={filterOptions.length || ""}
                        onChange={(e) =>
                          setFilterOptions({
                            ...filterOptions,
                            length: e.target.value as FilterOptions["length"],
                          })
                        }
                      >
                        <option value="">Any Length</option>
                        <option value="short">Short (3-8)</option>
                        <option value="medium">Medium (9-15)</option>
                        <option value="long">Long (16+)</option>
                      </select>

                      <select
                        className="px-3 py-2 rounded-lg bg-secondary border-0 text-sm focus:ring-2 focus:ring-ring"
                        value={filterOptions.style || ""}
                        onChange={(e) =>
                          setFilterOptions({
                            ...filterOptions,
                            style: e.target.value,
                          })
                        }
                      >
                        <option value="">Any Style</option>
                        <option value="cool">Cool</option>
                        <option value="cute">Cute</option>
                        <option value="dark">Dark</option>
                        <option value="professional">Professional</option>
                        <option value="anime">Anime</option>
                        <option value="esports">Esports</option>
                        <option value="fantasy">Fantasy</option>
                        <option value="cyberpunk">Cyberpunk</option>
                        <option value="sci-fi">Sci-Fi</option>
                        <option value="minimal">Minimal</option>
                      </select>

                      <select
                        className="px-3 py-2 rounded-lg bg-secondary border-0 text-sm focus:ring-2 focus:ring-ring"
                        value={filterOptions.case || ""}
                        onChange={(e) =>
                          setFilterOptions({
                            ...filterOptions,
                            case: e.target.value as FilterOptions["case"],
                          })
                        }
                      >
                        <option value="">Any Case</option>
                        <option value="uppercase">UPPERCASE</option>
                        <option value="lowercase">lowercase</option>
                        <option value="mixed">Mixed Case</option>
                      </select>

                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filterOptions.symbols}
                            onChange={(e) =>
                              setFilterOptions({
                                ...filterOptions,
                                symbols: e.target.checked,
                              })
                            }
                            className="rounded border-muted-foreground"
                          />
                          Symbols
                        </label>
                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filterOptions.numbers}
                            onChange={(e) =>
                              setFilterOptions({
                                ...filterOptions,
                                numbers: e.target.checked,
                              })
                            }
                            className="rounded border-muted-foreground"
                          />
                          Numbers
                        </label>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search & Export */}
            <div className="px-6 py-3 border-t flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search generated names..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary border-0 text-sm focus:ring-2 focus:ring-ring focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Export:</span>
                {(["txt", "csv", "json"] as const).map((format) => (
                  <button
                    key={format}
                    onClick={() => handleExport(format)}
                    className="px-3 py-1.5 rounded-lg glass text-xs font-medium hover:bg-secondary transition-colors"
                  >
                    {format.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Grid */}
            <div className="p-6 border-t">
              <AnimatePresence mode="popLayout">
                {isGenerating ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-16 rounded-xl bg-secondary animate-pulse"
                      />
                    ))}
                  </div>
                ) : filteredNames.length > 0 ? (
                  <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                  >
                    <AnimatePresence>
                      {filteredNames.map((name, index) => (
                        <motion.div
                          key={name.id}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.2, delay: index * 0.03 }}
                          className="group relative flex items-center justify-between p-4 rounded-xl glass hover:bg-secondary transition-all cursor-pointer"
                          onClick={() => handleCopy(name.name, name.id)}
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{name.name}</p>
                            <p className="text-xs text-muted-foreground">{name.style}</p>
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopy(name.name, name.id);
                              }}
                              className="p-1.5 rounded-lg hover:bg-background transition-colors"
                              title="Copy"
                            >
                              {copiedId === name.id ? (
                                <Check className="h-3.5 w-3.5 text-green-500" />
                              ) : (
                                <Copy className="h-3.5 w-3.5" />
                              )}
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(name.id);
                              }}
                              className="p-1.5 rounded-lg hover:bg-background transition-colors"
                              title="Favorite"
                            >
                              <Heart
                                className={cn(
                                  "h-3.5 w-3.5",
                                  favorites.includes(name.id) && "fill-red-500 text-red-500"
                                )}
                              />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleShare(name.name);
                              }}
                              className="p-1.5 rounded-lg hover:bg-background transition-colors"
                              title="Share"
                            >
                              <Share2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <div className="text-center py-12">
                    <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      No results found. Try adjusting your filters or generate new names.
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Favorites */}
            {favorites.length > 0 && (
              <div className="px-6 py-4 border-t">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  Favorites ({favorites.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {generatedNames
                    .filter((n) => favorites.includes(n.id))
                    .map((name) => (
                      <button
                        key={name.id}
                        onClick={() => handleCopy(name.name, name.id)}
                        className="px-3 py-1.5 rounded-lg glass text-sm hover:bg-secondary transition-colors"
                      >
                        {name.name}
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
