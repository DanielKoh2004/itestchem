"use client";

import { motion } from "framer-motion";
import type { Easing } from "framer-motion";
import { UserCheck, Microscope, GraduationCap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ease: Easing = [0.33, 1, 0.68, 1];
const viewport = { once: true, margin: "-100px" as const };

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
};

interface ExpertiseBadgeProps {
    icon: LucideIcon;
    title: string;
    subtitle: string;
}

function ExpertiseBadge({ icon: Icon, title, subtitle }: ExpertiseBadgeProps) {
    return (
        <div className="flex items-center gap-3 bg-white border border-slate-200 px-4 py-3">
            <Icon className="w-5 h-5 text-borneo-green shrink-0" />
            <div>
                <p className="text-sm font-bold text-slate-800 leading-none">{title}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">
                    {subtitle}
                </p>
            </div>
        </div>
    );
}

export default function LeadershipAuthority() {
    return (
        <section className="bg-white py-16 border-b border-slate-200">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={stagger}
                className="max-w-7xl mx-auto px-4 md:px-8"
            >
                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    {/* Left column — section label */}
                    <motion.div variants={fadeUp} className="lg:col-span-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-px w-10 bg-borneo-green" />
                            <span className="text-[11px] text-borneo-green font-bold uppercase tracking-[0.2em]">
                                Leadership
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-4">
                            Led by Registered
                            <br />
                            Analytical Expertise
                        </h2>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Our laboratory operations are governed by senior chemists with
                            deep regulatory knowledge and decades of hands-on analytical
                            experience across diverse sample matrices.
                        </p>
                    </motion.div>

                    {/* Right column — authority detail */}
                    <motion.div variants={fadeUp} className="lg:col-span-8">
                        <div className="bg-background-legacy border border-slate-200 p-8">
                            {/* Profile header */}
                            <div className="flex items-start gap-5 mb-6 pb-6 border-b border-slate-200">
                                <div className="w-16 h-16 bg-borneo-green-dark flex items-center justify-center shrink-0">
                                    <UserCheck className="w-8 h-8 text-emerald-300" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                                        Registered Chemist — MIC
                                    </h3>
                                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                                        Malaysian Institute of Chemistry · Associate Membership
                                    </p>
                                    <p className="text-xs text-borneo-green font-bold mt-1 tracking-wide">
                                        Registration No. A2276/4256/02/2005
                                    </p>
                                </div>
                            </div>

                            {/* Body text */}
                            <p className="text-sm text-slate-600 leading-relaxed mb-6">
                                The laboratory is managed by a registered Chemist holding
                                Associate Membership with the Malaysian Institute of Chemistry
                                (MIC), with over{" "}
                                <strong className="text-slate-900">
                                    20 years of dedicated analytical experience
                                </strong>{" "}
                                spanning agricultural commodities, environmental monitoring,
                                food safety, and industrial chemistry. This depth of expertise
                                ensures that all analytical procedures adhere to the highest
                                standards of scientific rigour, regulatory compliance, and
                                data integrity.
                            </p>

                            {/* Expertise badges */}
                            <div className="grid md:grid-cols-3 gap-4">
                                <ExpertiseBadge
                                    icon={Microscope}
                                    title="20+ Years"
                                    subtitle="Analytical Experience"
                                />
                                <ExpertiseBadge
                                    icon={GraduationCap}
                                    title="MIC Registered"
                                    subtitle="Professional Chemist"
                                />
                                <ExpertiseBadge
                                    icon={UserCheck}
                                    title="Multi-Matrix"
                                    subtitle="Cross-Sector Expertise"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
