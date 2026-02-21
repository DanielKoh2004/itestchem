"use client";

import { motion } from "framer-motion";
import type { Easing } from "framer-motion";
import { MapPin, Clock } from "lucide-react";
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

interface LocationDetailProps {
    icon: LucideIcon;
    label: string;
    text: string;
}

function LocationDetail({ icon: Icon, label, text }: LocationDetailProps) {
    return (
        <div className="flex items-start gap-3">
            <Icon className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
            <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-0.5">
                    {label}
                </p>
                <p className="text-xs text-slate-300">{text}</p>
            </div>
        </div>
    );
}



export default function LogisticsAndValue() {
    return (
        <section className="bg-white py-16 border-b border-slate-200">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={stagger}
                className="max-w-7xl mx-auto px-4 md:px-8"
            >
                <div className="grid lg:grid-cols-2 gap-10 items-stretch">
                    {/* Left — Location card */}
                    <motion.div variants={fadeUp} className="bg-slate-navy text-white p-8 md:p-12 shadow-lg h-full flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-6">
                            <MapPin className="w-8 h-8 text-emerald-400" />
                            <h3 className="text-2xl font-bold">Strategic Location</h3>
                        </div>
                        <p className="text-base text-slate-300 leading-relaxed mb-8">
                            Located along the{" "}
                            <strong className="text-white">Kuching-Serian Road</strong>,
                            iTestchem offers convenient access for plantation estates,
                            government agencies, and industrial clients across Sarawak.
                        </p>
                        <div className="space-y-6 border-t border-slate-700 pt-8 mt-auto">
                            <LocationDetail
                                icon={Clock}
                                label="Operating Hours"
                                text="Monday – Friday, 8:00 AM – 5:00 PM"
                            />
                        </div>
                    </motion.div>

                    {/* Right - Facility Image */}
                    <motion.div variants={fadeUp} className="h-full min-h-[400px]">
                        <ImagePlaceholder
                            label="Kuching Laboratory Facility"
                            className="w-full h-full rounded-sm"
                        />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
