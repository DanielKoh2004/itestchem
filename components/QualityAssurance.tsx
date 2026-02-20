import { Award, FlaskConical, FileCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface QualityItem {
    icon: LucideIcon;
    title: string;
    description: string;
}

const qualityItems: QualityItem[] = [
    {
        icon: Award,
        title: "AgLAM Proficiency Testing",
        description:
            "Active participation in Agricultural Laboratory Proficiency Testing for continuous quality benchmarking.",
    },
    {
        icon: FileCheck,
        title: "JKM Proficiency Testing",
        description:
            "Enrolled in Department of Chemistry Malaysia (JKM) inter-laboratory comparison programs.",
    },
    {
        icon: FlaskConical,
        title: "In-House Reference Materials",
        description:
            "Development and use of in-house reference materials to ensure ongoing analytical accuracy and traceability.",
    },
];

export default function QualityAssurance() {
    return (
        <div className="mt-8 bg-borneo-green-dark text-white rounded-sm shadow-lg overflow-hidden animate-fade-in-up delay-500">
            <div className="p-8">
                <span className="text-emerald-300 uppercase tracking-widest text-[10px] font-bold mb-3 block">
                    Quality Assurance
                </span>
                <h4 className="text-2xl font-bold mb-6">
                    Commitment to Analytical Excellence
                </h4>
                <div className="grid md:grid-cols-3 gap-6">
                    {qualityItems.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                            <div
                                key={item.title}
                                className="flex items-start gap-3 animate-fade-in-up"
                                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                            >
                                <div className="p-2 bg-emerald-800 rounded-sm">
                                    <IconComponent className="w-5 h-5 text-emerald-300" />
                                </div>
                                <div>
                                    <h5 className="text-sm font-bold mb-1">{item.title}</h5>
                                    <p className="text-xs text-emerald-200/70 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
