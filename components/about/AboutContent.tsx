"use client";

import { motion } from "framer-motion";
import type { Easing } from "framer-motion";
import {
    FlaskConical,
    Calendar,
    Shield,
    Award,
    UserCheck,
    Microscope,
    GraduationCap,
    ShieldCheck,
    BadgeCheck,
    CalendarCheck,
    ClipboardCheck,
    TestTubes,
    MapPin,
    BadgeDollarSign,
    Truck,
    Clock,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

/* ═══════════════════════════════════════════════
   Shared animation presets
   ═══════════════════════════════════════════════ */

const viewportConfig = { once: true, margin: "-100px" as const };

const easeOut: Easing = [0.33, 1, 0.68, 1];

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

const scaleDown = {
    hidden: { opacity: 0, scale: 1.08 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.7, ease: easeOut },
    },
};

const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
};

/* ═══════════════════════════════════════════════
   1. AnimatedHero
   ═══════════════════════════════════════════════ */

function AnimatedHero() {
    return (
        <section className="bg-slate-navy text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
                {/* Left — Text */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    <motion.div
                        variants={fadeUp}
                        className="flex items-center gap-3 mb-6"
                    >
                        <div className="h-px w-12 bg-borneo-green" />
                        <span className="text-[11px] text-emerald-400 font-bold uppercase tracking-[0.25em]">
                            About iTestchem
                        </span>
                    </motion.div>

                    <motion.h1
                        variants={fadeUp}
                        className="text-5xl md:text-6xl font-black leading-[1.05] mb-6"
                    >
                        Accredited Analytical
                        <br />
                        <span className="text-emerald-400">Excellence.</span>
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        className="text-lg text-slate-300 leading-relaxed max-w-xl font-light"
                    >
                        Delivering precise, reliable, and compliant testing solutions for
                        the agricultural and environmental sectors since September 2013.
                    </motion.p>

                    {/* Stat badges */}
                    <motion.div
                        variants={fadeUp}
                        className="flex flex-wrap gap-4 mt-10"
                    >
                        <StatBadge icon={Calendar} value="Since 2013" label="Established" />
                        <StatBadge icon={Shield} value="ISO 17025" label="Accredited" />
                        <StatBadge icon={Award} value="SAMM" label="Recognized" />
                        <StatBadge icon={FlaskConical} value="4 Scopes" label="Analytical" />
                    </motion.div>
                </motion.div>

                {/* Right — Image placeholder with scale-down */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={scaleDown}
                >
                    <ImagePlaceholder
                        label="Main Laboratory Facility"
                        className="w-full h-[400px] rounded-sm"
                    />
                </motion.div>
            </div>

            {/* Bottom accent */}
            <div className="h-1.5 bg-gradient-to-r from-borneo-green via-emerald-600 to-borneo-green-dark" />
        </section>
    );
}

function StatBadge({
    icon: Icon,
    value,
    label,
}: {
    icon: LucideIcon;
    value: string;
    label: string;
}) {
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

/* ═══════════════════════════════════════════════
   2. ScrollRevealAuthority
   ═══════════════════════════════════════════════ */

function ScrollRevealAuthority() {
    return (
        <section className="bg-slate-navy text-white py-16 border-y border-slate-800">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                variants={fadeUp}
                className="max-w-7xl mx-auto px-4 md:px-8"
            >
                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    {/* Left — Label */}
                    <div className="lg:col-span-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-px w-10 bg-emerald-500" />
                            <span className="text-[11px] text-emerald-400 font-bold uppercase tracking-[0.2em]">
                                Leadership
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold leading-tight mb-4">
                            Led by Registered
                            <br />
                            Analytical Expertise
                        </h2>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Our laboratory operations are governed by senior chemists with
                            deep regulatory knowledge and decades of hands-on analytical
                            experience across diverse sample matrices.
                        </p>
                    </div>

                    {/* Right — Authority card */}
                    <div className="lg:col-span-8">
                        <div className="bg-slate-800/60 border border-slate-700 p-8">
                            {/* Profile header */}
                            <div className="flex items-start gap-5 mb-6 pb-6 border-b border-slate-700">
                                <div className="w-16 h-16 bg-borneo-green-dark flex items-center justify-center shrink-0">
                                    <UserCheck className="w-8 h-8 text-emerald-300" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-1">
                                        Registered Chemist — MIC
                                    </h3>
                                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                                        Malaysian Institute of Chemistry · Associate Membership
                                    </p>
                                    <p className="text-xs text-emerald-400 font-bold mt-1 tracking-wide">
                                        Registration No. A2276/4256/02/2005
                                    </p>
                                </div>
                            </div>

                            {/* Body */}
                            <p className="text-sm text-slate-300 leading-relaxed mb-6">
                                The laboratory is managed by a registered Chemist holding
                                Associate Membership with the Malaysian Institute of Chemistry
                                (MIC), with over{" "}
                                <strong className="text-white">
                                    20 years of dedicated analytical experience
                                </strong>{" "}
                                spanning agricultural commodities, environmental monitoring,
                                food safety, and industrial chemistry. This depth of expertise
                                ensures that all analytical procedures adhere to the highest
                                standards of scientific rigour, regulatory compliance, and data
                                integrity.
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
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

function ExpertiseBadge({
    icon: Icon,
    title,
    subtitle,
}: {
    icon: LucideIcon;
    title: string;
    subtitle: string;
}) {
    return (
        <div className="flex items-center gap-3 bg-slate-700/40 border border-slate-600 px-4 py-3">
            <Icon className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
                <p className="text-sm font-bold text-white leading-none">{title}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">
                    {subtitle}
                </p>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════
   3. StaggeredAccreditationBanner
   ═══════════════════════════════════════════════ */

function StaggeredAccreditationBanner() {
    return (
        <section className="bg-borneo-green-dark text-white py-16 relative overflow-hidden">
            {/* Subtle diagonal pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)",
                        backgroundSize: "24px 24px",
                    }}
                />
            </div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                variants={staggerContainer}
                className="max-w-7xl mx-auto px-4 md:px-8 relative"
            >
                <div className="grid lg:grid-cols-12 gap-10 items-center">
                    {/* Left — Visual badge */}
                    <motion.div
                        variants={fadeUp}
                        className="lg:col-span-4 flex justify-center lg:justify-start"
                    >
                        <div className="relative">
                            <div className="w-48 h-48 border-4 border-emerald-500/30 flex items-center justify-center">
                                <div className="w-36 h-36 bg-emerald-900/50 border-2 border-emerald-400/40 flex flex-col items-center justify-center text-center">
                                    <ShieldCheck className="w-10 h-10 text-emerald-300 mb-2" />
                                    <span className="text-2xl font-black leading-none">
                                        ISO/IEC
                                    </span>
                                    <span className="text-3xl font-black text-emerald-400 leading-none">
                                        17025
                                    </span>
                                    <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-[0.2em] mt-1">
                                        : 2017
                                    </span>
                                </div>
                            </div>
                            {/* Corner accents */}
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-400" />
                            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-400" />
                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald-400" />
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald-400" />
                        </div>
                    </motion.div>

                    {/* Right — Text */}
                    <div className="lg:col-span-8">
                        <motion.span
                            variants={fadeUp}
                            className="text-emerald-400 uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block"
                        >
                            Accreditation Status
                        </motion.span>
                        <motion.h2
                            variants={fadeUp}
                            className="text-3xl md:text-4xl font-bold mb-5 leading-tight"
                        >
                            MS ISO/IEC 17025 Accredited
                            <br />
                            <span className="text-emerald-300">
                                Under SAMM — Malaysia Laboratory Accreditation Scheme
                            </span>
                        </motion.h2>
                        <motion.p
                            variants={fadeUp}
                            className="text-sm text-emerald-100/70 leading-relaxed mb-8 max-w-2xl"
                        >
                            iTestchem Laboratory Services has been formally accredited under
                            the Skim Akreditasi Makmal Malaysia (SAMM), administered by the
                            Department of Standards Malaysia. This accreditation confirms that
                            our laboratory operates a quality management system, demonstrates
                            technical competence, and produces valid, reliable results.
                        </motion.p>

                        {/* Key facts — staggered */}
                        <motion.div
                            variants={staggerContainer}
                            className="grid md:grid-cols-3 gap-4"
                        >
                            <AccreditFact
                                icon={CalendarCheck}
                                label="Date of Accreditation"
                                value="25 June 2014"
                            />
                            <AccreditFact
                                icon={BadgeCheck}
                                label="Accreditation Body"
                                value="Standards Malaysia (SAMM)"
                            />
                            <AccreditFact
                                icon={ShieldCheck}
                                label="Standard"
                                value="MS ISO/IEC 17025:2017"
                            />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

function AccreditFact({
    icon: Icon,
    label,
    value,
}: {
    icon: LucideIcon;
    label: string;
    value: string;
}) {
    return (
        <motion.div
            variants={fadeUp}
            className="bg-emerald-900/40 border border-emerald-700/30 px-5 py-4"
        >
            <Icon className="w-5 h-5 text-emerald-400 mb-2" />
            <p className="text-[10px] text-emerald-300/60 uppercase tracking-wider font-bold mb-1">
                {label}
            </p>
            <p className="text-sm font-bold text-white">{value}</p>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════
   4. QAAnimatedGrid
   ═══════════════════════════════════════════════ */

interface QAColumn {
    icon: LucideIcon;
    title: string;
    subtitle: string;
    description: string;
    details: string[];
}

const qaColumns: QAColumn[] = [
    {
        icon: ClipboardCheck,
        title: "External Validation",
        subtitle: "Proficiency Testing",
        description:
            "Annual enrolment in nationally coordinated Proficiency Testing (PT) programs to benchmark analytical performance against peer laboratories.",
        details: [
            "AgLAM Proficiency Testing — yearly participation",
            "JKM (Jabatan Kimia Malaysia) PT rounds",
            "z-score performance tracking and corrective action protocols",
        ],
    },
    {
        icon: FlaskConical,
        title: "Internal Controls",
        subtitle: "Reference & Replicate Testing",
        description:
            "Systematic use of in-house reference materials and replicate measurements to ensure day-to-day precision and long-term reproducibility.",
        details: [
            "In-house reference materials for each analytical scope",
            "Replicate testing and control charting (Shewhart / CUSUM)",
            "Method blank and calibration verification routines",
        ],
    },
    {
        icon: TestTubes,
        title: "Matrix Integrity",
        subtitle: "Fortified Samples & Blanks",
        description:
            "Implementation of laboratory fortified matrices (LFM) and laboratory fortified blanks (LFB) to verify method accuracy and detect matrix interferences.",
        details: [
            "Laboratory Fortified Matrix (LFM) recovery studies",
            "Laboratory Fortified Blank (LFB) spike-and-recovery",
            "Matrix interference detection and correction protocols",
        ],
    },
];

function QAAnimatedGrid() {
    return (
        <section className="bg-background-legacy py-16 border-y border-slate-200">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Section header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportConfig}
                    variants={fadeUp}
                    className="text-center mb-12 max-w-2xl mx-auto"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-10 bg-borneo-green" />
                        <span className="text-[11px] text-borneo-green font-bold uppercase tracking-[0.2em]">
                            Quality Assurance / Quality Control
                        </span>
                        <div className="h-px w-10 bg-borneo-green" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-3">
                        Rigorous QA/QC Protocols
                    </h2>
                    <p className="text-sm text-slate-500 leading-relaxed">
                        Every analysis at iTestchem is governed by a multi-layered quality
                        assurance framework designed to ensure accuracy, precision, and
                        regulatory defensibility.
                    </p>
                </motion.div>

                {/* 3-column grid — staggered */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportConfig}
                    variants={staggerContainer}
                    className="grid md:grid-cols-3 gap-6"
                >
                    {qaColumns.map((col) => {
                        const IconComponent = col.icon;
                        return (
                            <motion.div
                                key={col.title}
                                variants={fadeUp}
                                className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300"
                            >
                                {/* Card header */}
                                <div className="bg-borneo-green-dark p-5 text-white">
                                    <IconComponent className="w-7 h-7 text-emerald-300 mb-3" />
                                    <h3 className="text-lg font-bold mb-1">{col.title}</h3>
                                    <p className="text-[10px] text-emerald-300/70 uppercase tracking-wider font-semibold">
                                        {col.subtitle}
                                    </p>
                                </div>
                                {/* Card body */}
                                <div className="p-5">
                                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                                        {col.description}
                                    </p>
                                    <ul className="space-y-2.5">
                                        {col.details.map((detail) => (
                                            <li
                                                key={detail}
                                                className="flex items-start gap-2 text-[11px] text-slate-600"
                                            >
                                                <span className="w-1.5 h-1.5 bg-borneo-green rounded-full mt-1.5 shrink-0" />
                                                <span className="leading-relaxed">{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}

/* ═══════════════════════════════════════════════
   5. LogisticsAndValue
   ═══════════════════════════════════════════════ */

function LogisticsAndValue() {
    return (
        <section className="bg-white py-16 border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportConfig}
                    variants={staggerContainer}
                    className="grid lg:grid-cols-12 gap-12 items-start"
                >
                    {/* Left — Location card */}
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
                                iTestchem offers convenient access for plantation estates,
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
                            iTestchem is committed to providing{" "}
                            <strong className="text-slate-800">
                                highly competitive pricing
                            </strong>{" "}
                            without sacrificing the assurance of satisfaction. We believe that
                            accredited, traceable laboratory results should be accessible to
                            all industry stakeholders — from large multinational plantations
                            to smallholder enterprises.
                        </p>
                        <p className="text-sm text-slate-500 leading-relaxed mb-8">
                            Our lean operational model, combined with strategic procurement
                            and efficient instrument utilisation, allows us to deliver premium
                            analytical services at costs significantly below regional
                            averages — all while maintaining full compliance with MS ISO/IEC
                            17025:2017 requirements.
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
                </motion.div>
            </div>
        </section>
    );
}

function LocationDetail({
    icon: Icon,
    label,
    text,
}: {
    icon: LucideIcon;
    label: string;
    text: string;
}) {
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

function ValueCard({
    icon: Icon,
    title,
    text,
}: {
    icon: LucideIcon;
    title: string;
    text: string;
}) {
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

/* ═══════════════════════════════════════════════
   Page Export
   ═══════════════════════════════════════════════ */

export default function AboutContent() {
    return (
        <>
            <AnimatedHero />
            <ScrollRevealAuthority />
            <StaggeredAccreditationBanner />
            <QAAnimatedGrid />
            <LogisticsAndValue />
        </>
    );
}
