import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, AlertTriangle, UtensilsCrossed } from "lucide-react";
import TopUtilityBar from "@/components/TopUtilityBar";
import MainHeader from "@/components/MainHeader";
import MainNavigation from "@/components/MainNavigation";
import Footer from "@/components/Footer";
export const metadata: Metadata = {
    title: "Food & Nutritional Analysis | i-TESTCHEM Laboratory Sdn Bhd",
    description:
        "Accredited food and nutritional analysis services including proximate analysis, mineral content, and nutritional labeling packages in Sarawak.",
};

/* ───────── data ───────── */

const parameters: string[] = [
    "pH",
    "Fat Content",
    "Protein",
    "Moisture",
    "Ash",
    "Carbohydrate",
    "Energy",
    "Crude Fiber",
    "Sodium Chloride",
    "Sodium",
    "Calcium",
    "Magnesium",
    "Iron",
    "Zinc",
    "Nutritional Labeling (Package): Fat, Protein, Carbohydrate, Energy, Na",
];

/* ───────── page ───────── */

export default function FoodPage() {
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
                        Food &amp; Nutritional Analysis
                    </h1>
                    <p className="text-sm text-slate-400 mt-3 max-w-2xl leading-relaxed">
                        Proximate composition, mineral content, and nutritional
                        labeling analysis to support food safety, quality assurance,
                        and regulatory compliance.
                    </p>
                </div>
            </section>

            {/* Parameter Grid */}
            <section className="max-w-7xl mx-auto py-16 px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:col-span-2 bg-white border border-slate-200 p-6">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 bg-borneo-green/10 flex items-center justify-center">
                                <UtensilsCrossed className="w-5 h-5 text-borneo-green" />
                            </div>
                            <h2 className="text-base font-bold text-slate-900">
                                Food
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
                            {parameters.map((param) => (
                                <div
                                    key={param}
                                    className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed py-1"
                                >
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                                    <span>
                                        {param.startsWith("*") ? (
                                            <>
                                                <span className="text-amber-600 font-semibold">*</span>
                                                {param.slice(1)}
                                            </>
                                        ) : (
                                            param
                                        )}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Warning Box */}
                <div className="mt-12 bg-amber-50 border border-amber-200 p-6 flex flex-col sm:flex-row items-start gap-4">
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                        <p className="text-xs text-amber-800 leading-relaxed">
                            Parameters marked with{" "}
                            <span className="font-bold text-amber-600">(*)</span>{" "}
                            denotes not Accredited parameters.
                        </p>
                    </div>
                </div>

                <div className="mt-10 flex justify-center">
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-slate-navy hover:bg-black text-white px-8 py-3.5 rounded-sm text-xs font-bold uppercase tracking-widest shadow-lg transition-all"
                    >
                        Request Official Quotation
                    </Link>
                </div>
            </section >
            <Footer />
        </>
    );
}
