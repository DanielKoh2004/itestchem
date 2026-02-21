"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Send, CheckCircle2, Upload, FileText, X } from "lucide-react";

const positionOptions = [
    "Analytical Chemist",
    "Laboratory Technician",
    "General Application",
] as const;

const MAX_FILE_SIZE = 5_000_000; // 5 MB

const applicationSchema = z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    position: z.enum(
        ["Analytical Chemist", "Laboratory Technician", "General Application"],
        { error: "Please select a position" }
    ),

});

type ApplicationData = z.infer<typeof applicationSchema>;

export default function ApplicationForm() {
    const [submitted, setSubmitted] = useState(false);
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [resumeError, setResumeError] = useState<string | null>(null);
    const resumeInputRef = useRef<HTMLInputElement>(null);
    const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
    const [coverLetterError, setCoverLetterError] = useState<string | null>(null);
    const coverLetterInputRef = useRef<HTMLInputElement>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ApplicationData>({
        resolver: zodResolver(applicationSchema),
    });

    const validateFile = (file: File): string | null => {
        if (file.type !== "application/pdf") {
            return "Only PDF files are accepted. You uploaded a " + file.type.split("/")[1]?.toUpperCase() + " file.";
        }
        if (file.size > MAX_FILE_SIZE) {
            return "File size must be less than 5 MB. Your file is " + (file.size / 1_000_000).toFixed(1) + " MB.";
        }
        return null;
    };

    const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) { setResumeFile(null); setResumeError(null); return; }
        const file = files[0];
        const error = validateFile(file);
        if (error) {
            setResumeFile(null); setResumeError(error);
            if (resumeInputRef.current) resumeInputRef.current.value = "";
        } else {
            setResumeFile(file); setResumeError(null);
        }
    };

    const clearResume = () => {
        setResumeFile(null); setResumeError(null);
        if (resumeInputRef.current) resumeInputRef.current.value = "";
    };

    const handleCoverLetterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) { setCoverLetterFile(null); setCoverLetterError(null); return; }
        const file = files[0];
        const error = validateFile(file);
        if (error) {
            setCoverLetterFile(null); setCoverLetterError(error);
            if (coverLetterInputRef.current) coverLetterInputRef.current.value = "";
        } else {
            setCoverLetterFile(file); setCoverLetterError(null);
        }
    };

    const clearCoverLetter = () => {
        setCoverLetterFile(null); setCoverLetterError(null);
        if (coverLetterInputRef.current) coverLetterInputRef.current.value = "";
    };

    const onSubmit = async (data: ApplicationData) => {
        // Validate resume on submit
        if (!resumeFile) {
            setResumeError("Please upload your resume");
            return;
        }

        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Application submitted:", {
            ...data,
            resume: resumeFile,
            coverLetter: coverLetterFile ?? null,
        });
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="bg-white border border-slate-200 p-10">
                <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-14 h-14 bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                        <CheckCircle2 className="w-7 h-7 text-borneo-green" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">
                        Application Received
                    </h3>
                    <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
                        Thank you for your interest in joining iTestchem Laboratory
                        Sdn Bhd. Our team will review your application and reach out
                        if your qualifications match our requirements.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white border border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-borneo-green" />
                <h2 className="text-[11px] text-borneo-green font-bold uppercase tracking-[0.2em]">
                    Apply Now
                </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Full Name */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        {...register("fullName")}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-borneo-green focus:border-borneo-green transition-colors"
                        placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.fullName.message as string}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                        {...register("email")}
                        type="email"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-borneo-green focus:border-borneo-green transition-colors"
                        placeholder="your.email@example.com"
                    />
                    {errors.email && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.email.message as string}
                        </p>
                    )}
                </div>

                {/* Position */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Position <span className="text-red-500">*</span>
                    </label>
                    <select
                        {...register("position")}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-borneo-green focus:border-borneo-green transition-colors"
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Select a position
                        </option>
                        {positionOptions.map((opt) => (
                            <option key={opt} value={opt}>
                                {opt}
                            </option>
                        ))}
                    </select>
                    {errors.position && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.position.message as string}
                        </p>
                    )}
                </div>

                {/* Cover Letter (Optional PDF) */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Cover Letter{" "}
                        <span className="text-slate-400 font-normal normal-case">(Optional)</span>
                    </label>

                    {coverLetterFile ? (
                        <div className="flex items-center gap-3 w-full px-4 py-3 bg-emerald-50 border border-emerald-200">
                            <FileText className="w-5 h-5 text-borneo-green shrink-0" />
                            <div className="min-w-0 flex-1">
                                <p className="text-sm text-slate-800 font-semibold truncate">
                                    {coverLetterFile.name}
                                </p>
                                <p className="text-[10px] text-slate-500">
                                    {(coverLetterFile.size / 1_000_000).toFixed(2)} MB · PDF
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={clearCoverLetter}
                                className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <div className="relative">
                            <label className="flex items-center gap-3 w-full px-4 py-4 bg-slate-50 border-2 border-dashed border-slate-300 cursor-pointer hover:border-borneo-green hover:bg-emerald-50/30 transition-colors">
                                <Upload className="w-5 h-5 text-slate-400" />
                                <div>
                                    <p className="text-sm text-slate-600 font-semibold">
                                        Click to upload your cover letter
                                    </p>
                                    <p className="text-[10px] text-slate-400 mt-0.5">
                                        PDF only · Max 5 MB
                                    </p>
                                </div>
                                <input
                                    ref={coverLetterInputRef}
                                    type="file"
                                    accept=".pdf,application/pdf"
                                    onChange={handleCoverLetterChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </label>
                        </div>
                    )}

                    {coverLetterError && (
                        <p className="text-xs text-red-500 mt-1">{coverLetterError}</p>
                    )}
                </div>

                {/* Resume Upload */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Resume <span className="text-red-500">*</span>
                    </label>

                    {resumeFile ? (
                        /* File selected —  show filename + remove button */
                        <div className="flex items-center gap-3 w-full px-4 py-3 bg-emerald-50 border border-emerald-200">
                            <FileText className="w-5 h-5 text-borneo-green shrink-0" />
                            <div className="min-w-0 flex-1">
                                <p className="text-sm text-slate-800 font-semibold truncate">
                                    {resumeFile.name}
                                </p>
                                <p className="text-[10px] text-slate-500">
                                    {(resumeFile.size / 1_000_000).toFixed(2)} MB · PDF
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={clearResume}
                                className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        /* No file — show upload area */
                        <div className="relative">
                            <label className="flex items-center gap-3 w-full px-4 py-4 bg-slate-50 border-2 border-dashed border-slate-300 cursor-pointer hover:border-borneo-green hover:bg-emerald-50/30 transition-colors">
                                <Upload className="w-5 h-5 text-slate-400" />
                                <div>
                                    <p className="text-sm text-slate-600 font-semibold">
                                        Click to upload your resume
                                    </p>
                                    <p className="text-[10px] text-slate-400 mt-0.5">
                                        PDF only · Max 5 MB
                                    </p>
                                </div>
                                <input
                                    ref={resumeInputRef}
                                    type="file"
                                    accept=".pdf,application/pdf"
                                    onChange={handleResumeChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </label>
                        </div>
                    )}

                    {resumeError && (
                        <p className="text-xs text-red-500 mt-1">{resumeError}</p>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-borneo-green hover:bg-borneo-green-dark text-white py-3 text-xs font-bold uppercase tracking-widest shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        <>
                            <Send className="w-4 h-4" />
                            Submit Application
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
