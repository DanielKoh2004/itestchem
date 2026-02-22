"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import TopUtilityBar from "@/components/TopUtilityBar";
import MainHeader from "@/components/MainHeader";
import MainNavigation from "@/components/MainNavigation";
import Footer from "@/components/Footer";
import {
    Microscope,
    Sprout,
    CheckCircle2,
    Award,
    LineChart,
    ShieldCheck,
    ArrowRight,
    ClipboardCheck,
    BookOpenCheck,
    Lightbulb,
    FileSpreadsheet
} from "lucide-react";

// --- Animation Variants ---
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] } },
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

export default function ConsultancyServicesPage() {
    return (
        <>
            <header className="w-full shadow-sm relative z-50">
                <TopUtilityBar />
                <MainHeader />
            </header>
            <MainNavigation />
            <main className="bg-white min-h-screen pt-0">
                {/* 1. Hero Section */}
                <section className="relative bg-slate-50 border-b border-slate-200 py-24 md:py-32 overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50" />
                    </div>

                    <div className="container mx-auto px-6 lg:px-8 relative z-10 max-w-5xl text-center">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                        >
                            <motion.div variants={fadeUp} className="flex justify-center items-center gap-3 mb-6">
                                <div className="h-px w-10 bg-borneo-green" />
                                <span className="text-xs text-borneo-green font-bold uppercase tracking-[0.2em]">
                                    Strategic Advisory
                                </span>
                                <div className="h-px w-10 bg-borneo-green" />
                            </motion.div>

                            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-8">
                                Consultancy & <br className="hidden md:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-borneo-green to-emerald-600">
                                    Advisory Services
                                </span>
                            </motion.h1>

                            <motion.p variants={fadeUp} className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                                Solving complex laboratory compliance and agricultural yield challenges with data-driven, evidence-based expertise tailored for enterprise-grade operations.
                            </motion.p>
                        </motion.div>
                    </div>
                </section>

                {/* 2. The Two Service Pillars */}
                <section className="py-24 bg-white relative">
                    <div className="container mx-auto px-6 lg:px-8 max-w-6xl">

                        {/* Pillar 1: Laboratory Accreditation */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                variants={fadeUp}
                                className="order-2 lg:order-1 relative"
                            >
                                <div className="absolute -inset-4 bg-slate-50 border border-slate-100 rounded-2xl -z-10 transform -rotate-1 hidden lg:block" />
                                <div className="bg-white border border-slate-200 p-8 md:p-10 shadow-xl rounded-xl relative z-10">
                                    <ul className="space-y-6">
                                        {[
                                            { icon: ClipboardCheck, title: "Gap Analysis", desc: "Comprehensive evaluation of current systems against ISO standards." },
                                            { icon: BookOpenCheck, title: "QMS Development", desc: "Designing robust Quality Management Systems tailored to your workflow." },
                                            { icon: Microscope, title: "Method Validation", desc: "Technical support for validating analytical methodologies." },
                                            { icon: ShieldCheck, title: "Risk Assessment", desc: "Identifying and mitigating operational and analytical risks." },
                                            { icon: Award, title: "Audit Readiness", desc: "Rigorous preparation workflows to guarantee accreditation success." },
                                        ].map((item, idx) => (
                                            <li key={idx} className="flex gap-4 items-start">
                                                <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-1">
                                                    <item.icon className="w-5 h-5 text-borneo-green" />
                                                </div>
                                                <div>
                                                    <h4 className="text-slate-900 font-bold text-base mb-1">{item.title}</h4>
                                                    <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>

                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                variants={staggerContainer}
                                className="order-1 lg:order-2 space-y-6"
                            >
                                <motion.div variants={fadeUp} className="w-16 h-16 bg-slate-900 flex items-center justify-center rounded-2xl shadow-lg mb-6">
                                    <Award className="w-8 h-8 text-white" />
                                </motion.div>
                                <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                                    Laboratory Accreditation Advisory (ISO/IEC 17025)
                                </motion.h2>
                                <motion.p variants={fadeUp} className="text-lg text-slate-600 leading-relaxed">
                                    End-to-end guidance for laboratories seeking rigorous compliance with ISO/IEC 17025. We transform daunting regulatory requirements into streamlined, executable protocols that guarantee successful assessments.
                                </motion.p>
                            </motion.div>
                        </div>

                        {/* Pillar 2: Agronomic Advisory */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                variants={staggerContainer}
                                className="space-y-6"
                            >
                                <motion.div variants={fadeUp} className="w-16 h-16 bg-borneo-green flex items-center justify-center rounded-2xl shadow-lg mb-6">
                                    <Sprout className="w-8 h-8 text-white" />
                                </motion.div>
                                <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                                    Agronomic Advisory Services
                                </motion.h2>
                                <motion.p variants={fadeUp} className="text-lg text-slate-600 leading-relaxed">
                                    Professional agronomic evaluation and evidence-based recommendations tailored to optimize crop performance, boost yields, and ensure sustainable agricultural outcomes for commercial plantations.
                                </motion.p>
                            </motion.div>

                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                variants={fadeUp}
                                className="relative"
                            >
                                <div className="absolute -inset-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl -z-10 transform rotate-1 hidden lg:block" />
                                <div className="bg-slate-900 border border-slate-800 p-8 md:p-10 shadow-2xl rounded-xl relative z-10">
                                    <ul className="space-y-6">
                                        {[
                                            { icon: FileSpreadsheet, title: "Nutrient Management Planning", desc: "Customized fertilizer programs based on precise analytical data." },
                                            { icon: Microscope, title: "Soil & Plant Interpretation", desc: "Translating complex lab results into actionable field insights." },
                                            { icon: LineChart, title: "Yield Optimization", desc: "Scientific strategies to maximize output and resource efficiency." },
                                            { icon: Lightbulb, title: "Sustainable Practices", desc: "Long-term environmental soil health and conservation strategies." },
                                        ].map((item, idx) => (
                                            <li key={idx} className="flex gap-4 items-start">
                                                <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 mt-1">
                                                    <item.icon className="w-5 h-5 text-emerald-400" />
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-bold text-base mb-1">{item.title}</h4>
                                                    <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        </div>

                    </div>
                </section>

                {/* 3. Why Partner With Us (Grid) */}
                <section className="py-24 bg-slate-50 border-t border-slate-200">
                    <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Why Partner With iTestchem</h2>
                            <p className="text-slate-600">Our consultancy isn't just theory—it's backed by decades of active laboratory and field experience.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: ShieldCheck,
                                    title: "Accredited Expertise",
                                    desc: "We operate an internationally accredited laboratory ourselves, giving us first-hand perspective on the rigorous demands of ISO standards."
                                },
                                {
                                    icon: LineChart,
                                    title: "Data-Driven Decisions",
                                    desc: "We rely on empirical data and deep analytical interpretations to formulate advisory that impacts your bottom line."
                                },
                                {
                                    icon: CheckCircle2,
                                    title: "End-to-End Support",
                                    desc: "From the initial consultation phase directly through to field implementation and audit defense, we are your dedicated partners."
                                }
                            ].map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "-50px" }}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: idx * 0.15 } }
                                    }}
                                    className="bg-white p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="w-12 h-12 bg-emerald-50 text-borneo-green flex items-center justify-center mb-6">
                                        <feature.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">{feature.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. Hard CTA Banner */}
                <section className="bg-slate-900 py-20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-borneo-green/10 -skew-x-12 translate-x-1/4" />

                    <div className="container mx-auto px-6 lg:px-8 relative z-10 text-center max-w-3xl">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-8"
                        >
                            Let Us Know Your Needs.
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-3 bg-borneo-green hover:bg-emerald-600 text-white px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] transition-all shadow-xl hover:shadow-emerald-900/50 hover:-translate-y-0.5"
                            >
                                Request a Consultation
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
