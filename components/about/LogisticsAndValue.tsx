"use client";

import { motion } from "framer-motion";
import type { Easing } from "framer-motion";
import { MapPin, BadgeDollarSign, Truck, Clock } from "lucide-react";
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

interface ValueCardProps {
    icon: LucideIcon;
    title: string;
    text: string;
}

function ValueCard({ icon: Icon, title, text }: ValueCardProps) {
    return (
        <div className="flex items-start gap-3 bg-background-legacy border border-slate-200 p-4">
            <Icon className="w-5 h-5 text-borneo-green shrink-0 mt-0.5" />
            <div>
                <p className="text-sm font-bold text-slate-800 mb-1">{title}</p>
                <p className="text-[11px] text-slate-500 leading-relaxed">{text}</p>
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
                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    {/* Left — Location card + image */}
                    <motion.div variants={fadeUp} className="lg:col-span-5">
                        <div className="bg-slate-navy text-white p-8 shadow-lg">
                            <div className="flex items-center gap-3 mb-5">
                                <MapPin className="w-6 h-6 text-emerald-400" />
                                <h3 className="text-xl font-bold">Strategic Location</h3>
                            </div>
                            <p className="text-sm text-slate-300 leading-relaxed mb-6">
                                Strategically positioned between{" "}
                                <strong className="text-white">Kuching</strong> and{" "}
                                <strong className="text-white">Kota Samarahan</strong>,
                                i-TESTCHEM offers convenient access for plantation estates,
                                government agencies, and industrial clients across Sarawak.
                            </p>
                            <div className="space-y-4 border-t border-slate-700 pt-5">
                                <LocationDetail
                                    icon={Truck}
                                    label="Sample Collection"
                                    text="Scheduled pick-up from major plantation zones"
                                />
                                <LocationDetail
                                    icon={Clock}
                                    label="Operating Hours"
                                    text="Monday – Friday, 8:00 AM – 5:00 PM"
                                />
                            </div>
                        </div>
                        <ImagePlaceholder
                            label="Kuching / Kota Samarahan Facility"
                            className="w-full h-[300px] rounded-sm mt-8"
                        />
                    </motion.div>

                    {/* Right — Value commitment */}
                    <motion.div variants={fadeUp} className="lg:col-span-7">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-px w-10 bg-borneo-green" />
                            <span className="text-[11px] text-borneo-green font-bold uppercase tracking-[0.2em]">
                                Value Proposition
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-4 leading-tight">
                            Competitive Pricing,
                            <br />
                            Uncompromised Quality
                        </h2>
                        <p className="text-sm text-slate-500 leading-relaxed mb-6">
                            i-TESTCHEM is committed to providing{" "}
                            <strong className="text-slate-800">
                                highly competitive pricing
                            </strong>{" "}
                            without sacrificing the assurance of satisfaction. We believe
                            that accredited, traceable laboratory results should be
                            accessible to all industry stakeholders — from large
                            multinational plantations to smallholder enterprises.
                        </p>
                        <p className="text-sm text-slate-500 leading-relaxed mb-8">
                            Our lean operational model, combined with strategic procurement
                            and efficient instrument utilisation, allows us to deliver
                            premium analytical services at costs significantly below
                            regional averages — all while maintaining full compliance with
                            MS ISO/IEC 17025:2017 requirements.
                        </p>

                        {/* Value points */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <ValueCard
                                icon={BadgeDollarSign}
                                title="Competitive Rates"
                                text="Pricing structured for both bulk and individual sample submissions"
                            />
                            <ValueCard
                                icon={MapPin}
                                title="Dual Coverage"
                                text="Kuching HQ and Kota Samarahan Technical Center locations"
                            />
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
