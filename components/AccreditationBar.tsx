import Image from "next/image";
import { BadgeCheck } from "lucide-react";

interface AccreditationBadge {
    title: string;
    subtitle: string;
    hasIcon?: boolean;
}

const badges: AccreditationBadge[] = [
    { title: "MS ISO/IEC", subtitle: "17025 : 2017" },
    { title: "ILAC MRA", subtitle: "", hasIcon: true },
];

export default function AccreditationBar() {
    return (
        <div className="bg-slate-50 border-y border-slate-200 py-12">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                    {/* Left — Accreditation Badges */}
                    <div>
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-8">
                            Internationally Recognized Accreditation
                        </h4>
                        <div className="flex flex-wrap gap-6">
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

                    {/* Right — AgLAM Membership */}
                    <div className="lg:border-l lg:border-slate-200 lg:pl-16">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-8">
                            Professional Membership
                        </h4>
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 flex-shrink-0 bg-white border border-slate-200 p-2 flex items-center justify-center">
                                <Image
                                    src="/img/aglam_logo.png"
                                    alt="AgLAM — Agricultural Laboratory Association of Malaysia"
                                    width={80}
                                    height={80}
                                    className="object-contain"
                                />
                            </div>
                            <div>
                                <h5 className="text-lg font-black text-slate-800 leading-tight">
                                    AgLAM Member
                                </h5>
                                <p className="text-[10px] text-borneo-green font-bold uppercase tracking-[0.15em] mt-0.5 mb-2">
                                    Agricultural Laboratory Association of Malaysia
                                </p>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Active member of AgLAM, participating in collaborative
                                    proficiency testing programs and inter-laboratory
                                    comparisons for agricultural analysis.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
