import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, FlaskConical, Leaf, Mountain } from "lucide-react";
import TopUtilityBar from "@/components/TopUtilityBar";
import MainHeader from "@/components/MainHeader";
import MainNavigation from "@/components/MainNavigation";
import Footer from "@/components/Footer";
export const metadata: Metadata = {
    title: "Agricultural & Soil Analysis | i-TESTCHEM Laboratory Sdn Bhd",
    description:
        "Comprehensive agricultural testing services including fertilizer, plant tissue, and soil analysis. SAMM-accredited ISO 17025 laboratory in Sarawak.",
};

/* ───────── data ───────── */

interface TestSection {
    title: string;
    icon: React.ReactNode;
    parameters: string[];
}

const sections: TestSection[] = [
    {
        title: "Fertilizer / Compost",
        icon: <FlaskConical className="w-5 h-5 text-borneo-green" />,
        parameters: [
            "Moisture",
            "Amm Nitrogen",
            "Nitrate Nitrogen / Urea N",
            "Total N (Urea N + Amm N)",
            "Total N (Amm N + Nitrate N)",
            "Total N (Unknown sources of N)",
            "Total Phosphorus",
            "Citric Acid Soluble Phosphorus",
            "Water Soluble Phosphorus",
            "Total Potassium",
            "Total Magnesium",
            "Water Soluble Magnesium",
            "Total Boron (Titration Mtd) – For Borate only",
            "Total Boron (Azo Mtd)",
            "Total Sulphate",
            "Total Calcium",
            "Total Copper",
            "Total Zinc",
            "pH",
            "Any other analysis",
        ],
    },
    {
        title: "Plant",
        icon: <Leaf className="w-5 h-5 text-borneo-green" />,
        parameters: [
            "NPKMgCaB",
            "NPKMgCaBCuZn",
            "NPKMgCaBCuZnFeMn",
            "Ash",
            "Fresh sample handling",
        ],
    },
    {
        title: "Soil",
        icon: <Mountain className="w-5 h-5 text-borneo-green" />,
        parameters: [
            "pH / Conductivity",
            "Salinity (Convert from Conductivity)",
            "Package price: pH, Nitrogen, Organic Carbon, Total P, Available P, Exchangeable K, Mg, Ca, CEC",
            "Nitrogen",
            "Organic Carbon",
            "Total Phosphorus",
            "Available Phosphorus",
            "Exchangeable K, Mg, Ca",
            "Exchangeable Al",
            "Exchangeable Na",
            "Cation Exchangeable Capacity (CEC)",
            "Particle Size Analysis",
            "Available Cu / Available Zn",
            "Boron",
            "Other analysis",
        ],
    },
];

/* ───────── page ───────── */

export default function AgriculturalPage() {
    return (
        <>
            <header className="w-full shadow-sm relative">
                <TopUtilityBar />
                <MainHeader />
            </header>
            <MainNavigation />
            {/* Hero Banner */}
            <section className="bg-slate-900 py-20 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-px w-10 bg-borneo-green" />
                        <span className="text-[11px] text-borneo-green font-bold uppercase tracking-[0.2em]">
                            Our Services
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                        Agricultural &amp; Soil Analysis
                    </h1>
                    <p className="text-sm text-slate-400 mt-3 max-w-2xl leading-relaxed">
                        Comprehensive testing of fertilizer, plant tissue and soil
                        samples — supporting sustainable agriculture across Sarawak
                        and beyond.
                    </p>
                </div>
            </section>

            {/* Parameter Grid */}
            <section className="max-w-7xl mx-auto py-16 px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {sections.map((section) => (
                        <div
                            key={section.title}
                            className="bg-white border border-slate-200 p-6 flex flex-col"
                        >
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-10 h-10 bg-borneo-green/10 flex items-center justify-center">
                                    {section.icon}
                                </div>
                                <h2 className="text-base font-bold text-slate-900">
                                    {section.title}
                                </h2>
                            </div>

                            <ul className="space-y-2 flex-1">
                                {section.parameters.map((param) => (
                                    <li
                                        key={param}
                                        className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed"
                                    >
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                                        <span>{param}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>



                <div className="mt-10 flex justify-center">
                    <Link
                        href="/quote"
                        className="inline-flex items-center gap-2 bg-slate-navy hover:bg-black text-white px-8 py-3.5 rounded-sm text-xs font-bold uppercase tracking-widest shadow-lg transition-all"
                    >
                        Request Official Quotation
                    </Link>
                </div>
            </section>
            <Footer />
        </>
    );
}
