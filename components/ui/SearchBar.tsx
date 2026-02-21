"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import Fuse, { FuseResult } from "fuse.js";
import { searchIndex, SearchResult } from "@/lib/searchIndex";

// Initialize Fuse.js with the search index
const fuse = new Fuse(searchIndex, {
    keys: ["title", "description", "category"],
    threshold: 0.15,
    ignoreLocation: true,
});

/* ═══════════════════════════════════════════════
   Highlight Component
   ═══════════════════════════════════════════════ */
const Highlight = ({ text, query }: { text: string; query: string }) => {
    if (!query) return <>{text}</>;

    // Escape special characters in the query for the regex
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const parts = text.split(new RegExp(`(${escapedQuery})`, "gi"));

    return (
        <>
            {parts.map((part, index) =>
                part.toLowerCase() === query.toLowerCase() ? (
                    <span
                        key={index}
                        className="text-emerald-500 font-black bg-emerald-500/10 px-0.5 rounded-sm"
                    >
                        {part}
                    </span>
                ) : (
                    <span key={index}>{part}</span>
                )
            )}
        </>
    );
};

/* ═══════════════════════════════════════════════
   Main SearchBar Component
   ═══════════════════════════════════════════════ */
export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<FuseResult<SearchResult>[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Perform search whenever the query changes
    useEffect(() => {
        if (query.trim() === "") {
            setResults([]);
            setIsOpen(false);
        } else {
            const fuseResults = fuse.search(query);
            setResults(fuseResults);
            setIsOpen(true);
        }
    }, [query]);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    const handleClear = () => {
        setQuery("");
        setResults([]);
        setIsOpen(false);
    };

    return (
        <div ref={wrapperRef} className="relative w-full md:w-96 z-50">
            {/* Search Input */}
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => {
                        if (query.trim() !== "" && results.length > 0) {
                            setIsOpen(true);
                        }
                    }}
                    className="w-full pl-10 pr-10 py-2.5 border-2 border-slate-200 text-slate-900 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-borneo-green focus:border-borneo-green transition-colors rounded-sm text-sm"
                    placeholder="Search scopes, documentation..."
                />
                <div className="absolute left-0 top-0 h-full px-3 flex items-center justify-center text-slate-400 pointer-events-none">
                    <Search className="w-4 h-4" />
                </div>
                {query.length > 0 && (
                    <button
                        onClick={handleClear}
                        className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                        aria-label="Clear search"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Dropdown Results */}
            {isOpen && results.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-sm shadow-xl border border-slate-200 overflow-hidden max-h-[400px] overflow-y-auto">
                    <ul className="py-2">
                        {results.map((result) => (
                            <li key={result.item.id}>
                                <Link
                                    href={result.item.url}
                                    onClick={() => {
                                        setIsOpen(false);
                                        setQuery("");
                                    }}
                                    className="block px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-b-0"
                                >
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                                        <Highlight text={result.item.category} query={query} />
                                    </span>
                                    <h4 className="text-sm font-bold text-slate-900 mb-0.5">
                                        <Highlight text={result.item.title} query={query} />
                                    </h4>
                                    <p className="text-xs text-slate-500 line-clamp-2">
                                        <Highlight text={result.item.description} query={query} />
                                    </p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* No Results Fallback */}
            {isOpen && query.trim() !== "" && results.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-sm shadow-xl border border-slate-200 p-4 text-center">
                    <p className="text-sm text-slate-500">No results found for "{query}".</p>
                </div>
            )}
        </div>
    );
}
