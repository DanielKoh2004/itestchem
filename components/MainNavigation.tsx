import { ChevronDown } from "lucide-react";

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
        label: "Testing Services",
        href: "#",
        dropdown: [
            { label: "Agricultural Analysis", href: "#" },
            { label: "Environmental Analysis", href: "#" },
            { label: "Food & Feed Analysis", href: "#" },
            { label: "Consulting Services", href: "#" },
        ],
    },
    { label: "Consulting", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Careers", href: "#" },
];

export default function MainNavigation() {
    return (
        <nav className="bg-borneo-green text-white">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <ul className="flex items-center gap-0 text-xs font-bold uppercase tracking-widest">
                    {navItems.map((item, index) => (
                        <li
                            key={item.label}
                            className={`${item.dropdown ? "group relative" : "relative"} animate-fade-in-up`}
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <a
                                className={`block py-4 px-6 border-r border-emerald-900/30 flex items-center gap-2 transition-colors ${item.active
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
