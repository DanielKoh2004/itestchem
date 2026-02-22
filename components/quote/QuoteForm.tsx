"use client";

import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Turnstile } from "@marsidev/react-turnstile";
import { Loader2, Plus, Send, Trash2, CheckCircle2 } from "lucide-react";

import { countryCodes, testCategories, TestCategory } from "@/lib/testCatalog";
import { submitQuoteRequest } from "@/app/actions/quote";
import TestMultiSelect from "./TestMultiSelect";
import PhoneCodeSelect from "./PhoneCodeSelect";

const quoteItemSchema = z.object({
    category: z.string().min(1, "Category is required"),
    testNames: z.array(z.string()).min(1, "Please select at least one test parameter"),
    quantity: z.number().min(1, "At least 1 sample is required"),
});

const quoteSchema = z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    companyName: z.string().min(2, "Company name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phoneCode: z.string().min(1, "Country code is required"),
    phoneNumber: z.string().min(5, "Phone number is required"),
    tests: z.array(quoteItemSchema).min(1, "At least one analysis category must be added"),
});

type QuoteData = z.infer<typeof quoteSchema>;

export default function QuoteForm() {
    const [isSuccess, setIsSuccess] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

    const {
        register,
        control,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<QuoteData>({
        resolver: zodResolver(quoteSchema),
        defaultValues: {
            phoneCode: "+60",
            tests: [{ category: "Agricultural", testNames: [], quantity: 1 }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "tests",
    });

    const watchTests = watch("tests");

    const onSubmit = async (data: QuoteData) => {
        setSubmitError(null);

        if (!turnstileToken) {
            setSubmitError("Please complete the CAPTCHA to verify you are human.");
            return;
        }

        const response = await submitQuoteRequest(data, turnstileToken);

        if (response.error) {
            setSubmitError(response.error);
        } else if (response.success) {
            setIsSuccess(true);
            reset();
            setTurnstileToken(null);
            setTimeout(() => setIsSuccess(false), 15000);
        }
    };

    if (isSuccess) {
        return (
            <div className="bg-white border border-emerald-200 p-10 animate-fade-in-up">
                <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 flex items-center justify-center rounded-full animate-pulse-slow">
                        <CheckCircle2 className="w-8 h-8 text-borneo-green" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">
                        Quote Request Sent Successfully
                    </h3>
                    <p className="text-sm text-slate-600 max-w-md leading-relaxed">
                        Thank you for reaching out to iTestchem Laboratory Sdn Bhd. Our commercial team has received your request and will provide a comprehensive quotation to your email shortly.
                    </p>
                    <button
                        onClick={() => setIsSuccess(false)}
                        className="mt-4 px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
                    >
                        Submit Another Request
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white border border-slate-200 shadow-sm p-6 md:p-10">
            <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-10 bg-borneo-green" />
                <h2 className="text-sm text-borneo-green font-bold uppercase tracking-[0.2em]">
                    Request a Quote
                </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* 1. Personal & Company Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 border-b border-slate-100">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register("fullName")}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-borneo-green focus:border-borneo-green transition-colors"
                            placeholder="John Doe"
                        />
                        {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                            Company Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register("companyName")}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-borneo-green focus:border-borneo-green transition-colors"
                            placeholder="Acme Corp Sdn Bhd"
                        />
                        {errors.companyName && <p className="text-xs text-red-500 mt-1">{errors.companyName.message}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register("email")}
                            type="email"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-borneo-green focus:border-borneo-green transition-colors"
                            placeholder="john@example.com"
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                            Phone Number <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-2">
                            {/* Custom Datalist for Country Codes */}
                            <div className="w-1/3 relative">
                                <Controller
                                    control={control}
                                    name="phoneCode"
                                    render={({ field: { value, onChange } }) => (
                                        <PhoneCodeSelect
                                            value={value}
                                            onChange={onChange}
                                            error={errors.phoneCode?.message}
                                        />
                                    )}
                                />
                            </div>
                            <div className="flex-1">
                                <input
                                    {...register("phoneNumber")}
                                    type="tel"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-borneo-green focus:border-borneo-green transition-colors"
                                    placeholder="12 345 6789"
                                />
                            </div>
                        </div>
                        {(errors.phoneCode || errors.phoneNumber) && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.phoneCode?.message || errors.phoneNumber?.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* 2. Dynamic Tests Section */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                            Analysis Requirements <span className="text-red-500">*</span>
                        </label>
                    </div>

                    <div className="space-y-6">
                        {fields.map((field, index) => {
                            const currentCategory = watchTests?.[index]?.category as TestCategory;

                            return (
                                <div
                                    key={field.id}
                                    className="p-5 bg-slate-50/50 border border-slate-100 animate-fade-in-up relative"
                                    style={{ zIndex: 50 - index }}
                                >
                                    {/* Remove Button (Top Right) */}
                                    {fields.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="absolute top-3 right-3 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 border border-transparent rounded transition-colors shrink-0 cursor-pointer"
                                            title="Remove parameter group"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}

                                    <div className="flex flex-col lg:flex-row gap-5">
                                        {/* Category Select */}
                                        <div className="w-full lg:w-1/4">
                                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                                                Category
                                            </label>
                                            <select
                                                {...register(`tests.${index}.category`)}
                                                className="w-full px-3 py-3 bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-borneo-green focus:border-borneo-green transition-colors appearance-none cursor-pointer"
                                            >
                                                {testCategories.map((cat) => (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Multi Select for Test Names */}
                                        <div className="flex-1 w-full">
                                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                                                Test Parameters
                                            </label>
                                            <Controller
                                                control={control}
                                                name={`tests.${index}.testNames`}
                                                render={({ field: { value, onChange } }) => (
                                                    <TestMultiSelect
                                                        category={currentCategory}
                                                        selectedTests={value || []}
                                                        onChange={onChange}
                                                        error={errors.tests?.[index]?.testNames?.message}
                                                    />
                                                )}
                                            />
                                        </div>

                                        {/* Quantity */}
                                        <div className="w-full lg:w-32">
                                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
                                                No. of Samples
                                            </label>
                                            <input
                                                {...register(`tests.${index}.quantity`, { valueAsNumber: true })}
                                                type="number"
                                                min="1"
                                                className="w-full px-4 py-3 bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-borneo-green focus:border-borneo-green transition-colors text-center"
                                                placeholder="Qty"
                                            />
                                            {errors.tests?.[index]?.quantity && (
                                                <p className="text-[10px] text-red-500 mt-1">{errors.tests[index]?.quantity?.message}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <button
                        type="button"
                        onClick={() => append({ category: "Agricultural", testNames: [], quantity: 1 })}
                        className="mt-6 flex items-center gap-2 px-4 py-2 border border-borneo-green/30 rounded-sm text-xs font-bold text-borneo-green uppercase tracking-widest hover:bg-emerald-50 hover:border-borneo-green transition-all cursor-pointer"
                    >
                        <Plus className="w-4 h-4" /> Add Another Category
                    </button>
                    {errors.tests?.root && (
                        <p className="text-xs text-red-500 mt-2">{errors.tests.root.message}</p>
                    )}
                </div>

                {/* 3. Footer / Submit Section */}
                <div className="pt-6 border-t border-slate-100">
                    {submitError && (
                        <div className="mb-4 text-xs text-red-500 font-bold border-l-2 border-red-500 pl-3">
                            {submitError}
                        </div>
                    )}

                    <div className="mb-6">
                        <Turnstile
                            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
                            onSuccess={(tokenParam: string) => setTurnstileToken(tokenParam)}
                            onError={() => setTurnstileToken(null)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full md:w-auto flex items-center justify-center gap-2 bg-borneo-green hover:bg-borneo-green-dark text-white px-10 py-4 text-xs font-bold uppercase tracking-widest shadow-md transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Processing Request...
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4" />
                                Submit Quote Request
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
