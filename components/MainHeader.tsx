import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/ui/SearchBar";

export default function MainHeader() {
    return (
        <div className="bg-white py-5 px-4 md:px-8 border-b border-slate-200 relative z-[100]">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Logo Block */}
                <Link href="/" className="flex items-center gap-5 animate-fade-in-left">
                    <div className="flex items-center justify-center rounded-sm -mt-2.5">
                        <Image
                            src="/img/logo.png"
                            alt="iTestchem Logo"
                            width={56}
                            height={56}
                            className="h-14 w-auto object-contain"
                            priority
                        />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 leading-none">
                            iTestchem
                        </h1>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1.5">
                            Laboratory Sdn Bhd
                        </p>
                    </div>
                </Link>

                {/* Search & CTA */}
                <div className="flex items-center gap-4 w-full md:w-auto animate-fade-in-right">
                    <SearchBar />
                    <Link href="/quote" className="hidden md:flex items-center gap-2 bg-slate-navy hover:bg-black text-white px-6 py-2.5 rounded-sm text-xs font-bold uppercase tracking-widest shadow transition-all whitespace-nowrap">
                        Request Quote
                    </Link>
                </div>
            </div>
        </div>
    );
}
