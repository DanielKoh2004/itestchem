import type { Metadata } from "next";
import TopUtilityBar from "@/components/TopUtilityBar";
import MainHeader from "@/components/MainHeader";
import MainNavigation from "@/components/MainNavigation";
import Footer from "@/components/Footer";
import JobOpenings from "@/components/careers/JobOpenings";
import ApplicationForm from "@/components/careers/ApplicationForm";

export const metadata: Metadata = {
    title: "Careers | iTestchem",
    description:
        "Join iTestchem Laboratory Sdn Bhd. Explore career opportunities in agricultural and environmental analytical chemistry in Kuching, Sarawak.",
};

export default function CareersPage() {
    return (
        <>
            {/* Header */}
            <header className="w-full shadow-sm relative">
                <TopUtilityBar />
                <MainHeader />
            </header>
            <MainNavigation />

            <main className="flex-grow bg-background-legacy">
                {/* Banner */}
                <section className="bg-slate-navy text-white py-16 border-b-4 border-borneo-green">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-px w-10 bg-emerald-400/50" />
                            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-[0.25em]">
                                Careers
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
                            Join Our{" "}
                            <span className="text-emerald-400">Analytical</span> Team
                        </h1>
                        <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
                            Be part of a SAMM-accredited laboratory advancing agricultural
                            and environmental testing standards in Sarawak. We are looking
                            for driven individuals who share our commitment to scientific
                            rigour and data integrity.
                        </p>
                    </div>
                </section>

                {/* Content Grid */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-14">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Left — Job Openings */}
                        <div className="lg:col-span-5">
                            <JobOpenings />
                        </div>
                        {/* Right — Application Form */}
                        <div className="lg:col-span-7">
                            <ApplicationForm />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
