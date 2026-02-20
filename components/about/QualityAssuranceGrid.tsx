import { ClipboardCheck, FlaskConical, TestTubes } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface QAColumn {
    icon: LucideIcon;
    title: string;
    subtitle: string;
    description: string;
    details: string[];
}

const qaColumns: QAColumn[] = [
    {
        icon: ClipboardCheck,
        title: "External Validation",
        subtitle: "Proficiency Testing",
        description:
            "Annual enrolment in nationally coordinated Proficiency Testing (PT) programs to benchmark analytical performance against peer laboratories.",
        details: [
            "AgLAM Proficiency Testing — yearly participation",
            "JKM (Jabatan Kimia Malaysia) PT rounds",
            "z-score performance tracking and corrective action protocols",
        ],
    },
    {
        icon: FlaskConical,
        title: "Internal Controls",
        subtitle: "Reference & Replicate Testing",
        description:
            "Systematic use of in-house reference materials and replicate measurements to ensure day-to-day precision and long-term reproducibility.",
        details: [
            "In-house reference materials for each analytical scope",
            "Replicate testing and control charting (Shewhart / CUSUM)",
            "Method blank and calibration verification routines",
        ],
    },
    {
        icon: TestTubes,
        title: "Matrix Integrity",
        subtitle: "Fortified Samples & Blanks",
        description:
            "Implementation of laboratory fortified matrices (LFM) and laboratory fortified blanks (LFB) to verify method accuracy and detect matrix interferences.",
        details: [
            "Laboratory Fortified Matrix (LFM) recovery studies",
            "Laboratory Fortified Blank (LFB) spike-and-recovery",
            "Matrix interference detection and correction protocols",
        ],
    },
];

export default function QualityAssuranceGrid() {
    return (
        <section className="bg-background-legacy py-16 border-y border-slate-200">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Section header */}
                <div className="text-center mb-12 max-w-2xl mx-auto">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-10 bg-borneo-green" />
                        <span className="text-[11px] text-borneo-green font-bold uppercase tracking-[0.2em]">
                            Quality Assurance / Quality Control
                        </span>
                        <div className="h-px w-10 bg-borneo-green" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-3">
                        Rigorous QA/QC Protocols
                    </h2>
                    <p className="text-sm text-slate-500 leading-relaxed">
                        Every analysis at i-TESTCHEM is governed by a multi-layered quality
                        assurance framework designed to ensure accuracy, precision, and
                        regulatory defensibility.
                    </p>
                </div>

                {/* 3-column grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {qaColumns.map((col, index) => {
                        const IconComponent = col.icon;
                        return (
                            <div
                                key={col.title}
                                className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in-up"
                                style={{ animationDelay: `${index * 0.15}s` }}
                            >
                                {/* Card header */}
                                <div className="bg-borneo-green-dark p-5 text-white">
                                    <IconComponent className="w-7 h-7 text-emerald-300 mb-3" />
                                    <h3 className="text-lg font-bold mb-1">{col.title}</h3>
                                    <p className="text-[10px] text-emerald-300/70 uppercase tracking-wider font-semibold">
                                        {col.subtitle}
                                    </p>
                                </div>

                                {/* Card body */}
                                <div className="p-5">
                                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                                        {col.description}
                                    </p>
                                    <ul className="space-y-2.5">
                                        {col.details.map((detail) => (
                                            <li
                                                key={detail}
                                                className="flex items-start gap-2 text-[11px] text-slate-600"
                                            >
                                                <span className="w-1.5 h-1.5 bg-borneo-green rounded-full mt-1.5 shrink-0" />
                                                <span className="leading-relaxed">{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
