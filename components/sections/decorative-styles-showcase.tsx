"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, List, LayoutGrid, ChevronDown } from "lucide-react";
import { decorativeStyleSections } from "@/data/decorative-styles";
import { expandSection, estimateSectionTotal } from "@/lib/decorative-expander";
import { cn, copyToClipboard } from "@/utils";
import toast from "react-hot-toast";

const PAGE_SIZE = 50;

interface SectionState {
  page: number;  // how many pages loaded so far
  loading: boolean;
}

export function DecorativeStylesShowcase({ baseName = "Player" }: { baseName?: string }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const [sectionStates, setSectionStates] = useState<Record<string, SectionState>>({});

  const getPage = (sectionId: string) => sectionStates[sectionId]?.page ?? 1;

  const getResults = useCallback(
    (sectionId: string) => {
      const section = decorativeStyleSections.find((s) => s.id === sectionId);
      if (!section) return [];
      const page = getPage(sectionId);
      return expandSection(section, baseName, PAGE_SIZE * page, 0);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [baseName, sectionStates]
  );

  const handleLoadMore = (sectionId: string) => {
    setSectionStates((prev) => ({
      ...prev,
      [sectionId]: { page: (prev[sectionId]?.page ?? 1) + 1, loading: false },
    }));
  };

  const handleCopy = async (text: string, id: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedId(id);
      toast.success("Copied!");
      setTimeout(() => setCopiedId(null), 2000);
    } else {
      toast.error("Failed to copy");
    }
  };

  return (
    <div className="space-y-10">
      {decorativeStyleSections.map((section, sectionIndex) => {
        const results = getResults(section.id);
        const total = estimateSectionTotal(section);
        const page = getPage(section.id);
        const hasMore = PAGE_SIZE * page < total;

        return (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: Math.min(sectionIndex * 0.02, 0.2) }}
            className="glass rounded-2xl border overflow-hidden"
          >
            {/* Section header */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div>
                <h3 className="text-base font-semibold">{section.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Showing {results.length.toLocaleString()} of {total.toLocaleString()}+ styles
                </p>
              </div>
              <div className="flex items-center gap-1 glass rounded-lg p-1">
                <button
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                  className={cn(
                    "p-1.5 rounded-md transition-colors",
                    viewMode === "list" ? "bg-secondary" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <List className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                  className={cn(
                    "p-1.5 rounded-md transition-colors",
                    viewMode === "grid" ? "bg-secondary" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Results grid/list */}
            <div
              className={cn(
                "p-4",
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2"
                  : "flex flex-col gap-2"
              )}
            >
              {results.map((style) => (
                <button
                  key={style.id}
                  onClick={() => handleCopy(style.text, style.id)}
                  className="group flex items-center justify-between gap-3 p-3 rounded-xl hover:bg-secondary transition-colors text-left"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate whitespace-pre-line leading-relaxed">
                      {style.text}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{style.label}</p>
                  </div>
                  <span className="shrink-0 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    {copiedId === style.id ? (
                      <Check className="h-3.5 w-3.5 text-green-500" />
                    ) : (
                      <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                  </span>
                </button>
              ))}
            </div>

            {/* Load more */}
            {hasMore && (
              <div className="px-4 pb-4 flex justify-center">
                <button
                  onClick={() => handleLoadMore(section.id)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass text-sm font-medium hover:bg-secondary transition-colors"
                >
                  <ChevronDown className="h-4 w-4" />
                  Load more styles
                </button>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
