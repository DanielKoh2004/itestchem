import { FlaskConical, Calendar, Shield, Award } from "lucide-react";

export default function AboutHero() {
    return (
        <section className="relative bg-slate-navy text-white overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-borneo-green/5 rounded-full -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-borneo-green/5 rounded-full translate-y-1/2 -translate-x-1/4" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 relative">
                <div className="max-w-3xl">
                    {/* Overline */}
                    <div className="flex items-center gap-3 mb-6 animate-fade-in">
                        <div className="h-px w-12 bg-borneo-green" />
                        <span className="text-[11px] text-emerald-400 font-bold uppercase tracking-[0.25em]">
                            About i-TESTCHEM
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl md:text-6xl font-black leading-[1.05] mb-6 animate-fade-in-left">
                        Accredited Analytical
                        <br />
                        <span className="text-emerald-400">Excellence.</span>
                    </h1>

                    {/* Subtext */}
                    <p className="text-lg text-slate-300 leading-relaxed max-w-2xl font-light animate-fade-in-up delay-200">
                        Delivering precise, reliable, and compliant testing solutions for
                        the agricultural and environmental sectors since September 2013.
                    </p>

                    {/* Stat badges */}
                    <div className="flex flex-wrap gap-6 mt-10 animate-fade-in-up delay-300">
                        <StatBadge
                            icon={Calendar}
                            value="Since 2013"
                            label="Established"
                        />
                        <StatBadge
                            icon={Shield}
                            value="ISO 17025"
                            label="Accredited"
                        />
                        <StatBadge
                            icon={Award}
                            value="SAMM"
                            label="Recognized"
                        />
                        <StatBadge
                            icon={FlaskConical}
                            value="4 Scopes"
                            label="Analytical"
                        />
                    </div>
                </div>
            </div>

            {/* Bottom border accent */}
            <div className="h-1.5 bg-gradient-to-r from-borneo-green via-emerald-600 to-borneo-green-dark" />
        </section>
    );
}

function StatBadge({
    icon: Icon,
    value,
    label,
}: {
    icon: typeof Calendar;
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
