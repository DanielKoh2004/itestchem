"use client";

import { motion } from "framer-motion";
import type { Easing } from "framer-motion";
import { FlaskConical, Calendar, Shield, Award } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

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

const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease } },
};

interface StatBadgeProps {
    icon: LucideIcon;
    value: string;
    label: string;
}

function StatBadge({ icon: Icon, value, label }: StatBadgeProps) {
    return (
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3">
            <Icon className="w-5 h-5 text-emerald-400" />
            <div>
                <p className="text-sm font-bold text-white leading-none">{value}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">
                    {label}
                </p>
            </div>
        </div>
    );
}

export default function AboutHero() {
    return (
        <section className="relative bg-slate-navy text-white overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-borneo-green/5 rounded-full -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-borneo-green/5 rounded-full translate-y-1/2 -translate-x-1/4" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left — Text content */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    variants={stagger}
                >
                    {/* Overline */}
                    <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
                        <div className="h-px w-12 bg-borneo-green" />
                        <span className="text-[11px] text-emerald-400 font-bold uppercase tracking-[0.25em]">
                            About i-TESTCHEM
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        variants={fadeUp}
                        className="text-5xl md:text-6xl font-black leading-[1.05] mb-6"
                    >
                        Accredited Analytical
                        <br />
                        <span className="text-emerald-400">Excellence.</span>
                    </motion.h1>

                    {/* Subtext */}
                    <motion.p
                        variants={fadeUp}
                        className="text-lg text-slate-300 leading-relaxed max-w-xl font-light"
                    >
                        Delivering precise, reliable, and compliant testing solutions for
                        the agricultural and environmental sectors since September 2013.
                    </motion.p>

                    {/* Stat badges */}
                    <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-10">
                        <StatBadge icon={Calendar} value="Since 2013" label="Established" />
                        <StatBadge icon={Shield} value="ISO 17025" label="Accredited" />
                        <StatBadge icon={Award} value="SAMM" label="Recognized" />
                        <StatBadge icon={FlaskConical} value="4 Scopes" label="Analytical" />
                    </motion.div>
                </motion.div>

                {/* Right — Image placeholder (scales in) */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    variants={scaleIn}
                >
                    <ImagePlaceholder
                        label="Main Laboratory Facility"
                        className="w-full h-[500px] rounded-sm shadow-2xl"
                    />
                </motion.div>
            </div>

            {/* Bottom border accent */}
            <div className="h-1.5 bg-gradient-to-r from-borneo-green via-emerald-600 to-borneo-green-dark" />
        </section>
    );
}
