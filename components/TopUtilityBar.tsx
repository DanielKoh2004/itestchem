import { Globe, BadgeCheck, LogIn } from "lucide-react";

export default function TopUtilityBar() {
    return (
        <div className="bg-utility-navy text-slate-300 py-2 px-4 md:px-8 border-b border-slate-800 animate-slide-down">
            <div className="max-w-7xl mx-auto flex justify-between items-center text-[11px] font-semibold uppercase tracking-wider">
                <div className="flex items-center gap-6">
                    <span className="flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5" />
                        SAMM Accredited
                    </span>
                    <span className="flex items-center gap-1.5">
                        <BadgeCheck className="w-3.5 h-3.5" />
                        MS ISO/IEC 17025
                    </span>
                </div>
                <a
                    className="text-emerald-400 hover:text-white transition-colors flex items-center gap-1"
                    href="#"
                >
                    <LogIn className="w-3.5 h-3.5" />
                    Client Portal Login
                </a>
            </div>
        </div>
    );
}
