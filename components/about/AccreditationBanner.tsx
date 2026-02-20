import { ShieldCheck, BadgeCheck, CalendarCheck } from "lucide-react";

export default function AccreditationBanner() {
    return (
        <section className="bg-borneo-green-dark text-white py-16 relative overflow-hidden">
            {/* Background pattern */}
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

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
                <div className="grid lg:grid-cols-12 gap-10 items-center">
                    {/* Left — Visual badge */}
                    <div className="lg:col-span-4 flex justify-center lg:justify-start animate-fade-in-left">
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
                    </div>

                    {/* Right — Text content */}
                    <div className="lg:col-span-8 animate-fade-in-right delay-200">
                        <span className="text-emerald-400 uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block">
                            Accreditation Status
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight">
                            MS ISO/IEC 17025 Accredited
                            <br />
                            <span className="text-emerald-300">
                                Under SAMM — Malaysia Laboratory Accreditation Scheme
                            </span>
                        </h2>
                        <p className="text-sm text-emerald-100/70 leading-relaxed mb-8 max-w-2xl">
                            i-TESTCHEM Laboratory Services has been formally accredited under
                            the Skim Akreditasi Makmal Malaysia (SAMM), administered by the
                            Department of Standards Malaysia. This accreditation confirms that
                            our laboratory operates a quality management system, demonstrates
                            technical competence, and produces valid, reliable results.
                        </p>

                        {/* Key facts */}
                        <div className="grid md:grid-cols-3 gap-4">
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
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function AccreditFact({
    icon: Icon,
    label,
    value,
}: {
    icon: typeof CalendarCheck;
    label: string;
    value: string;
}) {
    return (
        <div className="bg-emerald-900/40 border border-emerald-700/30 px-5 py-4">
            <Icon className="w-5 h-5 text-emerald-400 mb-2" />
            <p className="text-[10px] text-emerald-300/60 uppercase tracking-wider font-bold mb-1">
                {label}
            </p>
            <p className="text-sm font-bold text-white">{value}</p>
        </div>
    );
}
