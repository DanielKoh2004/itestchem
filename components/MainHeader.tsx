import { FlaskConical, Search } from "lucide-react";

export default function MainHeader() {
    return (
        <div className="bg-white py-5 px-4 md:px-8 border-b border-slate-200">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Logo Block */}
                <div className="flex items-center gap-5 animate-fade-in-left">
                    <div className="w-14 h-14 bg-borneo-green flex items-center justify-center rounded-sm">
                        <FlaskConical className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 leading-none">
                            i-TESTCHEM
                        </h1>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1.5">
                            Laboratory Services
                        </p>
                    </div>
                </div>

                {/* Search & CTA */}
                <div className="flex items-center gap-4 w-full md:w-auto animate-fade-in-right">
                    <div className="relative w-full md:w-96">
                        <input
                            className="w-full pl-4 pr-12 py-2.5 border-2 border-slate-200 rounded-sm text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-borneo-green focus:border-borneo-green"
                            placeholder="Search analytical scopes, parameters, or documentation..."
                            type="text"
                        />
                        <button className="absolute right-0 top-0 h-full px-4 text-slate-400 hover:text-borneo-green">
                            <Search className="w-5 h-5" />
                        </button>
                    </div>
                    <button className="hidden md:flex items-center gap-2 bg-slate-navy hover:bg-black text-white px-6 py-2.5 rounded-sm text-xs font-bold uppercase tracking-widest shadow transition-all whitespace-nowrap">
                        Request Quote
                    </button>
                </div>
            </div>
        </div>
    );
}
