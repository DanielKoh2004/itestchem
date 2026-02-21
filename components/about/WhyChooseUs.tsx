"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Scale, Lock, Users, ChevronDown, BadgeDollarSign } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";

interface Pillar {
    title: string;
    icon: LucideIcon;
    image: string;
    content: string;
}

const pillars: Pillar[] = [
    {
        title: "Integrity, Impartiality & Confidentiality",
        icon: ShieldCheck,
        image: "/img/integrity.jpg",
        content:
            "Uncompromising honesty and scientific accuracy without manipulation. Operating independently of external pressures to remain unbiased. Enforcing strict controls to safeguard client proprietary information.",
    },
    {
        title: "Client Satisfaction",
        icon: Users,
        image: "/img/client satisfaction.jpg",
        content:
            "We work closely with our clients to understand their specific req and regulatory obligations providing professional guidance and dependable analytical support tailored to their needs. The laboratory is structured to deliver accurate and clear reports within a great turnaround time, ensuring confidence and efficiency for our clients.",
    },
    {
        title: "Competitive Pricing",
        icon: BadgeDollarSign,
        image: "/img/competitive price.jpg",
        content:
            "iTestchem is committed to providing highly competitive pricing without sacrificing the assurance of satisfaction.",
    },
];

export default function WhyChooseUs() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="bg-white py-16 border-y border-slate-200">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Section header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="h-px w-10 bg-borneo-green" />
                        <span className="text-[10px] text-borneo-green font-bold uppercase tracking-[0.25em]">
                            ISO/IEC 17025 Pillars
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                        Why Choose iTestchem
                    </h2>
                    <p className="text-sm text-slate-500 mt-2 max-w-xl leading-relaxed">
                        Our laboratory operates on three core pillars mandated by
                        MS ISO/IEC 17025 — the international standard for testing and
                        calibration laboratories.
                    </p>
                </div>

                {/* Accordion — Desktop: flex-row, Mobile: flex-col */}
                <div className="flex flex-col md:flex-row gap-2 h-auto md:h-[500px]">
                    {pillars.map((pillar, index) => {
                        const isActive = activeIndex === index;
                        const Icon = pillar.icon;

                        return (
                            <motion.div
                                key={pillar.title}
                                layout
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                onClick={() => setActiveIndex(index)}
                                className={`group relative overflow-hidden cursor-pointer rounded-sm border border-slate-700 ${isActive
                                    ? "flex-[3] h-[400px] md:h-auto"
                                    : "flex-[1] h-[120px] md:h-auto"
                                    }`}
                            >
                                {/* Background — Image */}
                                <div className="absolute inset-0">
                                    <Image
                                        src={pillar.image}
                                        alt={pillar.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>

                                {/* Dark gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

                                {/* Content */}
                                <div className="relative z-10 h-full flex flex-col justify-end p-5 md:p-6">
                                    {/* Inactive state — icon + rotated title */}
                                    {!isActive && (
                                        <div className="flex md:flex-col items-center gap-3 md:items-start md:justify-end h-full">
                                            <div className="w-10 h-10 bg-borneo-green/20 border border-borneo-green/40 flex items-center justify-center shrink-0">
                                                <Icon className="w-5 h-5 text-emerald-400" />
                                            </div>
                                            {/* Mobile: horizontal title */}
                                            <span className="md:hidden text-white font-bold text-sm uppercase tracking-wider">
                                                {pillar.title}
                                            </span>
                                            {/* Desktop: rotated title */}
                                            <span className="hidden md:block text-white font-bold text-sm uppercase tracking-wider [writing-mode:vertical-lr] rotate-180">
                                                {pillar.title}
                                            </span>
                                        </div>
                                    )}

                                    {/* Active state — full content */}
                                    {isActive && (
                                        <AnimatePresence>
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 20 }}
                                                transition={{ duration: 0.4, delay: 0.15 }}
                                            >
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="w-12 h-12 bg-borneo-green/20 border border-borneo-green/40 flex items-center justify-center">
                                                        <Icon className="w-6 h-6 text-emerald-400" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl md:text-2xl font-black text-white leading-tight">
                                                            {pillar.title}
                                                        </h3>
                                                        <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-[0.2em]">
                                                            Core Pillar {index + 1} of 3
                                                        </span>
                                                    </div>
                                                </div>

                                                <p className="text-sm text-slate-300 leading-relaxed mb-5 max-w-lg border-l-2 border-borneo-green pl-4">
                                                    {pillar.content}
                                                </p>

                                                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                                                    <ChevronDown className="w-3.5 h-3.5" />
                                                    Click another pillar to explore
                                                </div>
                                            </motion.div>
                                        </AnimatePresence>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
