"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";
import { submitContactForm } from "@/app/actions/contact";

const inquiryOptions = [
    "Request a Quote",
    "Technical Support",
    "Sample Tracking",
    "General Inquiry",
] as const;

type InquiryOption = (typeof inquiryOptions)[number];

const contactSchema = z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    companyName: z.string().min(2, "Company name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    inquiryType: z.enum([
        "Request a Quote",
        "Technical Support",
        "Sample Tracking",
        "General Inquiry",
    ], { error: "Please select an inquiry type" }),
    message: z
        .string()
        .min(10, "Message must be at least 10 characters")
        .max(1000, "Message must not exceed 1000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
    const [isSuccess, setIsSuccess] = useState(false);
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        setSubmitError(null);
        if (!turnstileToken) {
            setSubmitError("Please complete the CAPTCHA to verify you are human.");
            return;
        }

        const response = await submitContactForm(data, turnstileToken);

        if (response.error) {
            setSubmitError(response.error);
        } else if (response.success) {
            setIsSuccess(true);
            reset();
            setTurnstileToken(null);
            setTimeout(() => setIsSuccess(false), 15000);
        }
    };

    return (
        <div className="h-full bg-white flex flex-col">
            {/* Form header */}
            <div className="bg-background-legacy border-b border-slate-200 px-8 py-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="h-px w-8 bg-borneo-green" />
                    <span className="text-[10px] text-borneo-green font-bold uppercase tracking-[0.2em]">
                        Get In Touch
                    </span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Send Us a Message</h2>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Fill out the form below and our team will respond within 1 business
                    day.
                </p>
            </div>

            {/* Form body */}
            <div className="flex-1 px-8 py-8 overflow-y-auto">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Full Name */}
                    <div>
                        <label
                            htmlFor="fullName"
                            className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                        >
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="fullName"
                            type="text"
                            placeholder="Enter your full name"
                            className={`w-full bg-slate-50 border text-sm text-slate-900 px-4 py-3 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-borneo-green focus:border-borneo-green transition-all ${errors.fullName ? "border-red-400" : "border-slate-200"
                                }`}
                            {...register("fullName")}
                        />
                        {errors.fullName && (
                            <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>
                        )}
                    </div>

                    {/* Company Name */}
                    <div>
                        <label
                            htmlFor="companyName"
                            className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                        >
                            Company / Organisation <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="companyName"
                            type="text"
                            placeholder="Company or organisation name"
                            className={`w-full bg-slate-50 border text-sm text-slate-900 px-4 py-3 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-borneo-green focus:border-borneo-green transition-all ${errors.companyName ? "border-red-400" : "border-slate-200"
                                }`}
                            {...register("companyName")}
                        />
                        {errors.companyName && (
                            <p className="text-xs text-red-500 mt-1">{errors.companyName.message}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                        >
                            Work Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="your.email@company.com"
                            className={`w-full bg-slate-50 border text-sm text-slate-900 px-4 py-3 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-borneo-green focus:border-borneo-green transition-all ${errors.email ? "border-red-400" : "border-slate-200"
                                }`}
                            {...register("email")}
                        />
                        {errors.email && (
                            <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Inquiry Type */}
                    <div>
                        <label
                            htmlFor="inquiryType"
                            className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                        >
                            Inquiry Type <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="inquiryType"
                            className={`w-full bg-slate-50 border text-sm text-slate-900 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-borneo-green focus:border-borneo-green transition-all appearance-none ${errors.inquiryType ? "border-red-400" : "border-slate-200"
                                }`}
                            defaultValue=""
                            {...register("inquiryType")}
                        >
                            <option value="" disabled>
                                Select inquiry type
                            </option>
                            {inquiryOptions.map((opt) => (
                                <option key={opt} value={opt}>
                                    {opt}
                                </option>
                            ))}
                        </select>
                        {errors.inquiryType && (
                            <p className="text-xs text-red-500 mt-1">{errors.inquiryType.message}</p>
                        )}
                    </div>

                    {/* Message */}
                    <div>
                        <label
                            htmlFor="message"
                            className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                        >
                            Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="message"
                            rows={5}
                            placeholder="Describe your testing requirements, sample types, or any specific questions..."
                            className={`w-full bg-slate-50 border text-sm text-slate-900 px-4 py-3 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-borneo-green focus:border-borneo-green transition-all resize-none ${errors.message ? "border-red-400" : "border-slate-200"
                                }`}
                            {...register("message")}
                        />
                        {errors.message && (
                            <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>
                        )}
                    </div>

                    {submitError && (
                        <div className="text-xs text-red-500 font-bold border-l-2 border-red-500 pl-3">
                            {submitError}
                        </div>
                    )}

                    {isSuccess && (
                        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-800 px-5 py-4 text-sm font-medium">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                            <div>
                                <p className="font-bold">Message sent successfully.</p>
                                <p className="text-xs text-emerald-600 mt-0.5">
                                    Our team will get back to you within 1 business day.
                                </p>
                            </div>
                        </div>
                    )}

                    <Turnstile
                        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
                        onSuccess={(token: string) => setTurnstileToken(token)}
                        onError={() => setTurnstileToken(null)}
                    />

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-borneo-green hover:bg-borneo-green-dark disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold text-xs uppercase tracking-[0.2em] py-4 flex items-center justify-center gap-2 transition-all shadow-lg border border-emerald-700"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Sending...
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4" />
                                Submit Inquiry
                            </>
                        )}
                    </button>

                    <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                        By submitting this form, you agree to our Terms of Analysis and
                        acknowledge our Privacy Policy. All submitted data is processed in
                        compliance with Malaysian PDPA 2010.
                    </p>
                </form>
            </div>
        </div>
    );
}
