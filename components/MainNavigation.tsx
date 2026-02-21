"use client";

import { useState, useEffect } from "react";
import { ChevronDown, FlaskConical } from "lucide-react";

interface NavItem {
    label: string;
    href: string;
    active?: boolean;
    dropdown?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    {
        label: "Our Services",
        href: "#",
        dropdown: [
            { label: "Agricultural Analysis", href: "/services/agricultural" },
            { label: "Environmental Analysis", href: "/services/environmental" },
            { label: "Food & Feed Analysis", href: "/services/food" },
            { label: "Consultation Services", href: "#" },
        ],
    },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/careers" },
];

export default function MainNavigation() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className="bg-borneo-green text-white sticky top-0 z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center">
                {/* Mini brand mark — visible only when scrolled */}
                <div
                    className={`flex items-center gap-2 pr-5 border-r border-emerald-900/30 transition-all duration-300 overflow-hidden ${scrolled ? "max-w-[200px] opacity-100" : "max-w-0 opacity-0 pr-0 border-r-0"
                        }`}
                >
                    <div className="w-8 h-8 bg-white/10 flex items-center justify-center rounded-sm flex-shrink-0">
                        <FlaskConical className="w-4 h-4 text-emerald-300" />
                    </div>
                    <span className="text-[10px] font-bold tracking-widest whitespace-nowrap">
                        iTestchem
                    </span>
                </div>

                <ul className="flex items-center gap-0 text-xs font-bold uppercase tracking-widest">
                    {navItems.map((item) => (
                        <li
                            key={item.label}
                            className={item.dropdown ? "group relative" : "relative"}
                        >
                            <a
                                className={`flex items-center gap-2 py-4 px-6 border-r border-emerald-900/30 transition-colors ${item.active
                                    ? "bg-borneo-green-dark"
                                    : "hover:bg-borneo-green-dark"
                                    }`}
                                href={item.href}
                            >
                                {item.label}
                                {item.dropdown && (
                                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
                                )}
                            </a>
                            {item.dropdown && (
                                <div className="dropdown-menu absolute left-0 top-full w-64 bg-white text-slate-800 shadow-2xl border-t-4 border-borneo-green-dark z-[100]">
                                    {item.dropdown.map((sub) => (
                                        <a
                                            key={sub.label}
                                            className="block px-6 py-3 hover:bg-slate-50 border-b border-slate-100 text-[11px] transition-colors"
                                            href={sub.href}
                                        >
                                            {sub.label}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
