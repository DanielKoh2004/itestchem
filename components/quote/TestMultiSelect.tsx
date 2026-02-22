"use client";

import { useState, useRef, useEffect } from "react";
import { X, Search } from "lucide-react";
import Fuse from "fuse.js";
import { testCatalog, TestCategory } from "@/lib/testCatalog";

/* ═══════════════════════════════════════════════
   Highlight Helper
   ═══════════════════════════════════════════════ */
const Highlight = ({ text, query }: { text: string; query: string }) => {
    if (!query) return <>{text}</>;

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

interface TestMultiSelectProps {
    category: TestCategory;
    selectedTests: string[];
    onChange: (tests: string[]) => void;
    error?: string;
}

export default function TestMultiSelect({ category, selectedTests, onChange, error }: TestMultiSelectProps) {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Get catalog items for category
    const catalogItems = testCatalog[category] || [];

    // Filter out already selected items to not show them in dropdown
    const availableItems = catalogItems.filter(item => !selectedTests.includes(item.name));

    // Search setup
    const fuse = new Fuse(availableItems, {
        keys: ["name", "aliases"],
        threshold: 0.3,
        ignoreLocation: true,
    });

    // Results logic (show all if no query, else show fuse results)
    const results = query.trim() === ""
        ? availableItems.map((item, id) => ({ item, refIndex: id }))
        : fuse.search(query);

    // Click outside to close
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
    }, []);

    const handleSelect = (testName: string) => {
        onChange([...selectedTests, testName]);
        setQuery("");
        setIsOpen(false); // Can keep open if we want rapid selection, but closing feels cleaner
    };

    const handleRemove = (testName: string) => {
        onChange(selectedTests.filter(t => t !== testName));
    };

    return (
        <div className="w-full flex flex-col gap-2">
            {/* Selected Pills */}
            {selectedTests.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-1">
                    {selectedTests.map(test => (
                        <div key={test} className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-sm text-xs font-bold shadow-sm animate-fade-in-up">
                            <span>{test}</span>
                            <button
                                type="button"
                                onClick={() => handleRemove(test)}
                                className="text-emerald-600 hover:text-red-600 hover:bg-red-50 rounded-sm p-0.5 transition-colors cursor-pointer"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Input & Dropdown Wrapper */}
            <div ref={wrapperRef} className="relative">
                <div className="relative">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setIsOpen(true);
                        }}
                        onFocus={() => setIsOpen(true)}
                        className={`w-full pl-4 pr-10 py-3 bg-slate-50 border text-sm focus:outline-none focus:ring-2 focus:ring-borneo-green focus:border-borneo-green transition-colors ${error ? 'border-red-300' : 'border-slate-200'}`}
                        placeholder="Search & select multiple parameters (e.g. BOD, Nitrogen...)"
                    />
                    <div className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-slate-400 pointer-events-none">
                        <Search className="w-4 h-4" />
                    </div>
                </div>

                {error && <p className="text-xs text-red-500 mt-1">{error}</p>}

                {/* Dropdown Menu */}
                {isOpen && results.length > 0 && (
                    <div className="absolute z-50 top-full mt-1 w-full bg-white border border-slate-200 shadow-xl rounded-sm max-h-60 overflow-y-auto animate-fade-in-up">
                        <ul className="py-1">
                            {results.map(({ item }) => (
                                <li key={item.name}>
                                    <button
                                        type="button"
                                        onClick={() => handleSelect(item.name)}
                                        className="w-full text-left px-4 py-2.5 hover:bg-emerald-50 border-b border-slate-100 last:border-b-0 transition-colors cursor-pointer"
                                    >
                                        <div className="text-sm font-bold text-slate-900">
                                            <Highlight text={item.name} query={query} />
                                        </div>
                                        {item.aliases && (
                                            <div className="text-[10px] text-slate-500 tracking-wider">
                                                Aliases: <Highlight text={item.aliases} query={query} />
                                            </div>
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {isOpen && query.trim() !== "" && results.length === 0 && (
                    <div className="absolute z-50 top-full mt-1 w-full bg-white border border-slate-200 shadow-xl rounded-sm p-4 text-center">
                        <p className="text-xs text-slate-500">No matching parameters found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
