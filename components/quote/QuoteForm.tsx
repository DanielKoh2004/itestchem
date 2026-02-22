"use client";

import { useState } from "react";
import { useForm, useFieldArray, Controller, Control, UseFormRegister, UseFormWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Turnstile } from "@marsidev/react-turnstile";
import { Loader2, Plus, Send, Trash2, CheckCircle2 } from "lucide-react";

import { countryCodes, testCategories, testCatalog } from "@/lib/testCatalog";
import { submitQuoteRequest } from "@/app/actions/quote";
import PhoneCodeSelect from "./PhoneCodeSelect";
import TestMultiSelect from "./TestMultiSelect";

// --- Zod Schemas ---

const testItemSchema = z.object({
    sampleType: z.string().min(1, "Select sample type"),
    testNames: z.array(z.string()).min(1, "Please select at least one test parameter"),
    otherSpecification: z.string().optional(),
    quantity: z.number().min(1, "Quantity must be at least 1"),
});

const sampleGroupSchema = z.object({
    category: z.string().min(1, "Category is required"),
    tests: z.array(testItemSchema).min(1, "At least one test must be added to this batch"),
});

const quoteSchema = z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    companyName: z.string().min(2, "Company name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phoneCode: z.string().min(1, "Country code is required"),
    phoneNumber: z.string().min(5, "Phone number is required"),
    sampleGroups: z.array(sampleGroupSchema).min(1, "At least one sample batch must be added"),
});

type QuoteData = z.infer<typeof quoteSchema>;

// --- Sub-Component: Nested Test List ---

interface NestedTestListProps {
    control: Control<QuoteData>;
    register: UseFormRegister<QuoteData>;
    watch: UseFormWatch<QuoteData>;
    groupIndex: number;
    errors: any;
}

function NestedTestList({ control, register, watch, groupIndex, errors }: NestedTestListProps) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `sampleGroups.${groupIndex}.tests`,
    });

    const watchSampleGroups = watch("sampleGroups");
    const currentCategory = watchSampleGroups?.[groupIndex]?.category as string;

    const availableSampleTypes = currentCategory ? Object.keys(testCatalog[currentCategory] || {}) : [];

    return (
        <div className="mt-5 space-y-4">


            {fields.map((testField, testIndex) => {
                // Determine if 'Other analysis' was selected in this specific test row
                const currentTestNames = watchSampleGroups?.[groupIndex]?.tests?.[testIndex]?.testNames || [];
                const currentSampleType = watchSampleGroups?.[groupIndex]?.tests?.[testIndex]?.sampleType as string;
                const isOtherSelected = currentTestNames.some((name: string) => name.toLowerCase().includes("other analysis"));

                const availableTests = (currentCategory && currentSampleType)
                    ? (testCatalog[currentCategory]?.[currentSampleType] || [])
                    : [];

                return (
                    <div key={testField.id} className="relative flex flex-col md:flex-row gap-4 items-start bg-white p-4 border border-slate-100 shadow-sm animate-fade-in-up">

                        {/* Remove Test Button */}
                        {fields.length > 1 && (
                            <button
                                type="button"
                                onClick={() => remove(testIndex)}
                                className="absolute -top-2 -right-2 bg-white text-slate-400 hover:text-red-500 hover:bg-red-50 border border-slate-200 rounded-full p-1.5 transition-colors z-10 shadow-sm cursor-pointer"
                                title="Remove parameter"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        )}

                        {/* Sample Type Select */}
                        <div className="w-full md:w-1/4">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                                Sample Type <span className="text-red-500">*</span>
                            </label>
                            <select
                                {...register(`sampleGroups.${groupIndex}.tests.${testIndex}.sampleType`)}
                                disabled={!currentCategory}
                                className="w-full px-3 py-3 bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-borneo-green transition-colors appearance-none cursor-pointer disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                                defaultValue=""
                            >
                                <option value="" disabled>Select Type</option>
                                {availableSampleTypes.map((st) => (
                                    <option key={st} value={st}>{st}</option>
                                ))}
                            </select>
                            {errors?.sampleGroups?.[groupIndex]?.tests?.[testIndex]?.sampleType && (
                                <p className="text-[10px] text-red-500 mt-1">{errors.sampleGroups[groupIndex].tests[testIndex].sampleType.message}</p>
                            )}
                        </div>

                        {/* Parameter Select */}
                        <div className="flex-1 w-full md:w-1/3">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                                Test / Parameter <span className="text-red-500">*</span>
                            </label>
                            <Controller
                                control={control}
                                name={`sampleGroups.${groupIndex}.tests.${testIndex}.testNames`}
                                render={({ field: { value, onChange } }) => (
                                    <div className="flex flex-col gap-2">
                                        <TestMultiSelect
                                            items={availableTests}
                                            selectedTests={value || []}
                                            onChange={onChange}
                                            error={errors?.sampleGroups?.[groupIndex]?.tests?.[testIndex]?.testNames?.message}
                                            disabled={!currentSampleType}
                                        />

                                        {/* Dynamic 'Other' Input Field */}
                                        {isOtherSelected && (
                                            <input
                                                {...register(`sampleGroups.${groupIndex}.tests.${testIndex}.otherSpecification`)}
                                                className="w-full px-3 py-3 bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-borneo-green focus:border-borneo-green transition-colors animate-fade-in-up"
                                                placeholder="Please specify custom analysis requirements..."
                                            />
                                        )}
                                    </div>
                                )}
                            />
                        </div>

                        {/* Quantity input */}
                        <div className="w-full md:w-1/6">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                                No. of Samples <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register(`sampleGroups.${groupIndex}.tests.${testIndex}.quantity`, { valueAsNumber: true })}
                                type="number"
                                min="1"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-borneo-green focus:border-borneo-green transition-colors text-center"
                            />
                            {errors?.sampleGroups?.[groupIndex]?.tests?.[testIndex]?.quantity && (
                                <p className="text-[10px] text-red-500 mt-1">{errors.sampleGroups[groupIndex].tests[testIndex].quantity.message}</p>
                            )}
                        </div>
                    </div>
                );
            })}

            <button
                type="button"
                onClick={() => append({ sampleType: "", testNames: [], otherSpecification: "", quantity: 1 })}
                disabled={!currentCategory}
                className="mt-2 flex items-center gap-2 px-4 py-2 text-[11px] font-bold text-borneo-green uppercase tracking-widest hover:bg-emerald-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
                <Plus className="w-3.5 h-3.5" /> Add
            </button>
        </div>
    );
}

// --- Main Form Component ---

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
            sampleGroups: [
                {
                    category: "",
                    tests: [{ sampleType: "", testNames: [], otherSpecification: "", quantity: 1 }]
                }
            ],
        },
    });

    const { fields: groupFields, append: appendGroup, remove: removeGroup } = useFieldArray({
        control,
        name: "sampleGroups",
    });

    const watchSampleGroups = watch("sampleGroups");

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

            // Scroll to top to ensure the success message is visible
            window.scrollTo({ top: 0, behavior: "smooth" });
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
                {/* 1. Personal & Company Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 border-b border-slate-100">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register("fullName")}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-borneo-green focus:border-borneo-green transition-colors"
                            placeholder="Enter your full name"
                        />
                        {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                            Company / Organisation <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register("companyName")}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-borneo-green focus:border-borneo-green transition-colors"
                            placeholder="Company or organisation name"
                        />
                        {errors.companyName && <p className="text-xs text-red-500 mt-1">{errors.companyName.message}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                            Work Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register("email")}
                            type="email"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-borneo-green focus:border-borneo-green transition-colors"
                            placeholder="your.email@company.com"
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                            Phone Number <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-2">
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

                {/* 2. Dynamic Sample Batches Section */}
                <div>

                    <div className="space-y-8">
                        {groupFields.map((groupField, groupIndex) => {
                            return (
                                <div
                                    key={groupField.id}
                                    className="relative p-6 bg-slate-50/50 border border-slate-200 rounded-sm shadow-sm animate-fade-in-up"
                                >
                                    {/* Batch Header */}
                                    <div className="flex items-center justify-between mb-5">
                                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide flex items-center gap-2">
                                            <span className="w-6 h-6 rounded-full bg-borneo-green/10 text-borneo-green flex items-center justify-center text-xs">
                                                {groupIndex + 1}
                                            </span>
                                            New Category
                                        </h3>

                                        {/* Remove Group Button */}
                                        {groupFields.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeGroup(groupIndex)}
                                                className="text-slate-400 hover:text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-sm text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" /> Remove
                                            </button>
                                        )}
                                    </div>

                                    {/* Batch Top-Level Select (Category) */}
                                    <div className="mb-2">
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                                            Category <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            {...register(`sampleGroups.${groupIndex}.category`)}
                                            className="w-full px-3 py-3 bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-borneo-green transition-colors appearance-none cursor-pointer"
                                            defaultValue=""
                                        >
                                            <option value="" disabled>Select Category</option>
                                            {testCategories.map((cat) => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Nested Test Array */}
                                    <NestedTestList
                                        control={control}
                                        register={register}
                                        watch={watch}
                                        groupIndex={groupIndex}
                                        errors={errors}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    <button
                        type="button"
                        onClick={() => appendGroup({
                            category: "",
                            tests: [{ sampleType: "", testNames: [], otherSpecification: "", quantity: 1 }]
                        })}
                        className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-4 border-2 border-dashed border-slate-300 rounded-sm text-xs font-bold text-slate-500 uppercase tracking-widest hover:bg-slate-50 hover:border-borneo-green hover:text-borneo-green transition-all cursor-pointer"
                    >
                        <Plus className="w-5 h-5" /> Add New Category
                    </button>
                    {errors.sampleGroups && (
                        <p className="text-xs text-red-500 mt-2">{errors.sampleGroups.message}</p>
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
