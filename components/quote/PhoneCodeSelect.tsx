"use client";

import { useState, useRef, useEffect } from "react";
import Fuse from "fuse.js";
import { countryCodes } from "@/lib/testCatalog";

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

interface PhoneCodeSelectProps {
    value: string;
    onChange: (code: string) => void;
    error?: string;
}

export default function PhoneCodeSelect({ value, onChange, error }: PhoneCodeSelectProps) {
    const [query, setQuery] = useState(value);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Filter out identical strings if needed, but Fuse handles objects
    const fuse = new Fuse(countryCodes, {
        keys: ["code", "country"],
        threshold: 0.3,
        ignoreLocation: true,
    });

    // Results logic (show all if no query, else show fuse results)
    const results = query.trim() === ""
        ? countryCodes.map((item, id) => ({ item, refIndex: id }))
        : fuse.search(query);

    // Click outside to close. If they clicked outside without selecting a valid code, it leaves it as typed.
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

    const handleSelect = (code: string) => {
        onChange(code);
        setQuery(code);
        setIsOpen(false);
    };

    return (
        <div ref={wrapperRef} className="relative w-full">
            <input
                type="text"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    onChange(e.target.value); // Sync react-hook-form as they type
                    setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
                className={`w-full px-3 py-3 bg-slate-50 border text-sm focus:outline-none focus:ring-2 focus:ring-borneo-green focus:border-borneo-green transition-colors ${error ? 'border-red-300' : 'border-slate-200'}`}
                placeholder="+60"
            />

            {/* Dropdown Menu */}
            {isOpen && results.length > 0 && (
                <div className="absolute z-[80] top-full mt-1 w-full left-0 right-0 bg-white border border-slate-200 shadow-xl rounded-sm max-h-48 overflow-y-auto animate-fade-in-up">
                    <ul className="py-1">
                        {results.map(({ item }) => (
                            <li key={item.code}>
                                <button
                                    type="button"
                                    onClick={() => handleSelect(item.code)}
                                    className="w-full text-left px-3 py-2 hover:bg-emerald-50 border-b border-slate-100 last:border-b-0 transition-colors cursor-pointer"
                                >
                                    <div className="text-sm font-bold text-slate-900">
                                        <Highlight text={item.code} query={query} />
                                    </div>
                                    <div className="text-[10px] text-slate-500 tracking-wider">
                                        <Highlight text={item.country} query={query} />
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {isOpen && query.trim() !== "" && results.length === 0 && (
                <div className="absolute z-[80] top-full mt-1 w-full bg-white border border-slate-200 shadow-xl rounded-sm p-4 text-center">
                    <p className="text-xs text-slate-500">No matching code.</p>
                </div>
            )}
        </div>
    );
}
