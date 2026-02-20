import { Download, FileText, Sheet, Package } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface DownloadItem {
    icon: LucideIcon;
    title: string;
    subtitle: string;
    href: string;
}

const downloads: DownloadItem[] = [
    {
        icon: FileText,
        title: "Chain of Custody (CoC)",
        subtitle: "Rev. 2024.1 (PDF)",
        href: "#",
    },
    {
        icon: Sheet,
        title: "Analytical Fee Schedule",
        subtitle: "Effective Jan 2024",
        href: "#",
    },
    {
        icon: Package,
        title: "Sample Packing Guide",
        subtitle: "Logistics & Handling",
        href: "#",
    },
];

export default function QuickDownloads() {
    return (
        <div className="bg-borneo-green p-6 text-white rounded-sm shadow-lg animate-fade-in-right delay-300">
            <h3 className="text-lg font-bold mb-5 border-b border-emerald-700 pb-2 flex items-center gap-2 uppercase tracking-tight">
                <Download className="w-5 h-5 text-emerald-300" />
                Quick Downloads
            </h3>
            <ul className="space-y-4">
                {downloads.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                        <li
                            key={item.title}
                            className="animate-fade-in-up"
                            style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                        >
                            <a className="flex items-center gap-3 group" href={item.href}>
                                <span className="bg-white/10 p-2 rounded-sm group-hover:bg-white/25 transition-colors">
                                    <IconComponent className="w-4 h-4" />
                                </span>
                                <div>
                                    <span className="block text-xs font-bold leading-none group-hover:underline">
                                        {item.title}
                                    </span>
                                    <span className="text-[9px] text-emerald-200/70 uppercase">
                                        {item.subtitle}
                                    </span>
                                </div>
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
