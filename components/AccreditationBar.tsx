import { BadgeCheck } from "lucide-react";

interface AccreditationBadge {
    title: string;
    subtitle: string;
    hasIcon?: boolean;
}

const badges: AccreditationBadge[] = [
    { title: "MS ISO/IEC", subtitle: "17025 : 2017" },
    { title: "SAMM", subtitle: "LAB NO. 156" },
    { title: "ILAC MRA", subtitle: "", hasIcon: true },
    { title: "DOE", subtitle: "REGISTERED LAB" },
    { title: "JPSM", subtitle: "CERTIFIED" },
];

export default function AccreditationBar() {
    return (
        <div className="bg-slate-50 border-y border-slate-200 py-12">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <h4 className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-10">
                    Internationally Recognized Accreditation &amp; Compliance
                </h4>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                    {badges.map((badge, index) => (
                        <div
                            key={badge.title}
                            className="flex flex-col items-center border border-slate-200 px-6 py-3 bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default animate-fade-in-up"
                            style={{ animationDelay: `${index * 0.08}s` }}
                        >
                            <span
                                className={`${badge.title === "ILAC MRA" ? "text-2xl" : "text-3xl"
                                    } font-black text-slate-700`}
                            >
                                {badge.title}
                            </span>
                            {badge.hasIcon ? (
                                <BadgeCheck className="w-6 h-6 text-borneo-green" />
                            ) : (
                                <span
                                    className={`${badge.title === "MS ISO/IEC"
                                            ? "text-sm font-bold text-borneo-green tracking-widest"
                                            : "text-[10px] font-bold text-slate-400"
                                        }`}
                                >
                                    {badge.subtitle}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
