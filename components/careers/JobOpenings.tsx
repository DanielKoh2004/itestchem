"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Easing } from "framer-motion";
import { Briefcase, MapPin, Clock, ChevronRight, ChevronLeft, Search } from "lucide-react";

const ease: Easing = [0.33, 1, 0.68, 1];

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

type EmploymentType = "Full-Time" | "Part-Time" | "Internship";

interface JobPosition {
    title: string;
    type: EmploymentType;
    location: string;
    requirements: string[];
}

const positions: JobPosition[] = [
    {
        title: "Analytical Chemist",
        type: "Full-Time",
        location: "Kuching HQ",
        requirements: [
            "B.Sc in Chemistry or related field",
            "Registered with Institut Kimia Malaysia (IKM)",
            "2+ years of experience in ISO 17025 laboratory environment",
        ],
    },
    {
        title: "Laboratory Technician",
        type: "Full-Time",
        location: "Kuching HQ",
        requirements: [
            "Diploma in Science or related field",
            "Experience in sample preparation and handling",
        ],
    },
    {
        title: "Quality Assurance Officer",
        type: "Part-Time",
        location: "Kuching HQ",
        requirements: [
            "Degree in Chemistry, Biology, or related field",
            "Knowledge of ISO 17025 quality management systems",
            "Attention to detail and strong documentation skills",
        ],
    },
    {
        title: "Laboratory Intern",
        type: "Internship",
        location: "Kuching HQ",
        requirements: [
            "Currently pursuing a Diploma or Degree in Chemistry, Biology, or related field",
            "Eager to learn laboratory techniques and analytical instrumentation",
        ],
    },
];

const filterTabs: { label: string; value: EmploymentType | "All" }[] = [
    { label: "All", value: "All" },
    { label: "Full-Time", value: "Full-Time" },
    { label: "Part-Time", value: "Part-Time" },
    { label: "Internship", value: "Internship" },
];

export default function JobOpenings() {
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState<EmploymentType | "All">("All");
    const [page, setPage] = useState(1);
    const perPage = 2;

    const filtered = useMemo(() => {
        return positions.filter((job) => {
            const matchesFilter = activeFilter === "All" || job.type === activeFilter;
            const matchesSearch =
                search.trim() === "" ||
                job.title.toLowerCase().includes(search.toLowerCase()) ||
                job.requirements.some((r) =>
                    r.toLowerCase().includes(search.toLowerCase())
                );
            return matchesFilter && matchesSearch;
        });
    }, [search, activeFilter]);

    // Reset to page 1 when search or filter changes
    useEffect(() => { setPage(1); }, [search, activeFilter]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    const paginated = filtered.slice((page - 1) * perPage, page * perPage);

    return (
        <div>
            <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-borneo-green" />
                <h2 className="text-[11px] text-borneo-green font-bold uppercase tracking-[0.2em]">
                    Open Positions
                </h2>
            </div>

            {/* Search Bar */}
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search positions or requirements..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-borneo-green focus:border-borneo-green transition-colors"
                />
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
                {filterTabs.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => setActiveFilter(tab.value)}
                        className={`px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider border transition-all ${activeFilter === tab.value
                            ? "bg-borneo-green text-white border-borneo-green"
                            : "bg-white text-slate-500 border-slate-200 hover:border-borneo-green hover:text-borneo-green"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Job Cards */}
            <AnimatePresence mode="wait">
                {filtered.length > 0 ? (
                    <motion.div
                        key={activeFilter + search + page}
                        initial="hidden"
                        animate="visible"
                        variants={stagger}
                        className="flex flex-col gap-5"
                    >
                        {paginated.map((job) => (
                            <motion.div
                                key={job.title}
                                variants={fadeUp}
                                className="bg-white border border-slate-200 p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 leading-tight">
                                            {job.title}
                                        </h3>
                                        <div className="flex items-center gap-4 mt-2">
                                            <span className="flex items-center gap-1.5 text-[11px] text-slate-500">
                                                <Briefcase className="w-3.5 h-3.5 text-borneo-green" />
                                                {job.type}
                                            </span>
                                            <span className="flex items-center gap-1.5 text-[11px] text-slate-500">
                                                <MapPin className="w-3.5 h-3.5 text-borneo-green" />
                                                {job.location}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-10 h-10 bg-borneo-green/10 flex items-center justify-center flex-shrink-0">
                                        <Clock className="w-5 h-5 text-borneo-green" />
                                    </div>
                                </div>

                                <div className="border-t border-slate-100 pt-4">
                                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-2">
                                        Requirements
                                    </p>
                                    <ul className="space-y-1.5">
                                        {job.requirements.map((req) => (
                                            <li
                                                key={req}
                                                className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed"
                                            >
                                                <ChevronRight className="w-3 h-3 text-borneo-green mt-0.5 shrink-0" />
                                                {req}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-10 bg-white border border-slate-200"
                    >
                        <p className="text-sm text-slate-400">
                            No positions found matching your criteria.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-5 bg-white border border-slate-200 px-4 py-2.5">
                <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-500 hover:text-borneo-green disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    Prev
                </button>
                <span className="text-[11px] text-slate-400 font-bold">
                    {filtered.length} result{filtered.length !== 1 ? "s" : ""} · Page {page} of {totalPages}
                </span>
                <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-500 hover:text-borneo-green disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                    Next
                    <ChevronRight className="w-3.5 h-3.5" />
                </button>
            </div>

            <p className="text-[11px] text-slate-400 mt-6 leading-relaxed italic">
                Don&apos;t see a role that fits? Submit a general application and
                we&apos;ll keep your resume on file for future openings.
            </p>
        </div>
    );
}
