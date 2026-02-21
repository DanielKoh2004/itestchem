import { FlaskConical } from "lucide-react";
import SearchBar from "@/components/ui/SearchBar";

export default function MainHeader() {
    return (
        <div className="bg-white py-5 px-4 md:px-8 border-b border-slate-200 relative z-[100]">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Logo Block */}
                <div className="flex items-center gap-5 animate-fade-in-left">
                    <div className="w-14 h-14 bg-borneo-green flex items-center justify-center rounded-sm">
                        <FlaskConical className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 leading-none">
                            iTestchem
                        </h1>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1.5">
                            Laboratory Sdn Bhd
                        </p>
                    </div>
                </div>

                {/* Search & CTA */}
                <div className="flex items-center gap-4 w-full md:w-auto animate-fade-in-right">
                    <SearchBar />
                    <button className="hidden md:flex items-center gap-2 bg-slate-navy hover:bg-black text-white px-6 py-2.5 rounded-sm text-xs font-bold uppercase tracking-widest shadow transition-all whitespace-nowrap">
                        Request Quote
                    </button>
                </div>
            </div>
        </div>
    );
}
