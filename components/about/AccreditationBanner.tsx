"use client";

import { motion } from "framer-motion";
import type { Easing } from "framer-motion";
import { ShieldCheck, CheckCircle2, ClipboardCheck, FlaskConical } from "lucide-react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

const ease: Easing = [0.33, 1, 0.68, 1];
const viewport = { once: true, margin: "-100px" as const };

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, ease } },
};

const slideUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const qaCommitments = [
    {
        icon: ClipboardCheck,
        title: "AgLAM Proficiency Testing",
        text: "Active participant in the Agricultural Laboratory Association of Malaysia (AgLAM) proficiency testing program for soil, plant tissue, and fertilizer analysis.",
    },
    {
        icon: FlaskConical,
        title: "JKM Proficiency Testing",
        text: "Enrolled in the Jabatan Kimia Malaysia (JKM) proficiency testing scheme for environmental and water quality parameters.",
    },
    {
        icon: CheckCircle2,
        title: "In-House Reference Materials",
        text: "Maintains a library of validated in-house reference materials for continuous quality control and instrument calibration across all scopes.",
    },
];

export default function AccreditationBanner() {
    return (
        <section
            id="accreditation"
            className="scroll-mt-14 relative overflow-hidden"
        >
            {/* ── Green background band ── */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={fadeIn}
                className="bg-borneo-green-dark relative py-20"
            >
                {/* Geometric CSS grid overlay */}
                <div className="absolute inset-0 opacity-[0.06]">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `
                                linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
                            `,
                            backgroundSize: "60px 60px",
                        }}
                    />
                </div>

                {/* Decorative corner shapes */}
                <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4" />

                <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
                    {/* Section overline */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-px w-10 bg-emerald-400/50" />
                        <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-[0.25em]">
                            Accreditation Status
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-3">
                        Nationally Accredited Laboratory
                    </h2>
                    <p className="text-sm text-emerald-200/80 max-w-lg leading-relaxed font-light">
                        Operating under the highest international standard for testing
                        and calibration laboratories.
                    </p>
                </div>
            </motion.div>

            {/* ── Certificate card — overlaps the green band ── */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-8 relative z-10 pb-16">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    variants={slideUp}
                    className="bg-white rounded-sm shadow-2xl border border-slate-200 overflow-hidden"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-12">
                        {/* Left — SAMM badge area */}
                        <div className="lg:col-span-4 bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col items-center justify-center p-10 gap-6">
                            <ImagePlaceholder
                                label="SAMM Logo"
                                className="w-32 h-32 rounded-sm"
                            />
                            <div className="text-center">
                                <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold">
                                    Skim Akreditasi Makmal Malaysia
                                </p>
                                <div className="h-px w-16 bg-borneo-green mx-auto my-3" />
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Standard Malaysia
                                    <br />
                                    Laboratory Accreditation Scheme
                                </p>
                            </div>
                        </div>

                        {/* Right — Certificate text */}
                        <div className="lg:col-span-8 p-8 md:p-12">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-borneo-green/10 border border-borneo-green/20 flex items-center justify-center">
                                    <ShieldCheck className="w-5 h-5 text-borneo-green" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-slate-900 leading-tight">
                                        Certificate of Accreditation
                                    </h3>
                                    <p className="text-[10px] text-borneo-green font-bold uppercase tracking-[0.2em]">
                                        MS ISO/IEC 17025:2017
                                    </p>
                                </div>
                            </div>

                            <div className="border-l-4 border-borneo-green pl-6 mb-8">
                                <p className="text-sm text-slate-700 leading-relaxed">
                                    iTestchem Laboratory Sdn Bhd
                                    (formerly known as i-TESTCHEM Laboratory Services) has been{" "}
                                    <strong className="text-slate-900">
                                        accredited under the Standard Malaysia Laboratory
                                        Accreditation Scheme (SAMM)
                                    </strong>{" "}
                                    for{" "}
                                    <strong className="text-slate-900">
                                        MS ISO/IEC 17025
                                    </strong>{" "}
                                    since{" "}
                                    <strong className="text-borneo-green">
                                        June 25, 2014
                                    </strong>
                                    , covering chemical testing for agricultural,
                                    environmental, microbiological and related matrices.
                                </p>
                            </div>

                            {/* QA Commitment pills */}
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={viewport}
                                variants={stagger}
                                className="grid grid-cols-1 md:grid-cols-3 gap-4"
                            >
                                {qaCommitments.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <motion.div
                                            key={item.title}
                                            variants={fadeUp}
                                            className="bg-slate-50 border border-slate-200 p-4 rounded-sm"
                                        >
                                            <Icon className="w-5 h-5 text-borneo-green mb-2" />
                                            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-1">
                                                {item.title}
                                            </h4>
                                            <p className="text-[11px] text-slate-500 leading-relaxed">
                                                {item.text}
                                            </p>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>

                            {/* Bottom note */}
                            <p className="text-[11px] text-slate-400 mt-6 leading-relaxed italic">
                                Our commitment to quality assurance extends beyond compliance —
                                continuous improvement through internal audits, proficiency testing,
                                and method validation is embedded in every analytical workflow.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
