import type { Metadata } from "next";
import TopUtilityBar from "@/components/TopUtilityBar";
import MainHeader from "@/components/MainHeader";
import MainNavigation from "@/components/MainNavigation";
import Footer from "@/components/Footer";
import InteractiveMapDirectory from "@/components/contact/InteractiveMapDirectory";
import ContactForm from "@/components/contact/ContactForm";
import { MapPin, Phone, Mail } from "lucide-react";

export const metadata: Metadata = {
    title: "Contact Us | iTestchem",
    description:
        "Get in touch with iTestchem Laboratory Sdn Bhd in Kuching, Sarawak. Request a quote, track samples, or reach our technical support team.",
};

export default function ContactPage() {
    return (
        <>
            <header className="w-full shadow-sm relative">
                <TopUtilityBar />
                <MainHeader />
            </header>
            <MainNavigation />

            {/* Dark banner */}
            <section className="bg-slate-navy text-white py-14 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-borneo-green/5 rounded-full -translate-y-1/2 translate-x-1/4" />
                <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-px w-10 bg-borneo-green" />
                        <span className="text-[11px] text-emerald-400 font-bold uppercase tracking-[0.25em]">
                            Reach Out
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
                        Contact iTestchem
                    </h1>
                    <p className="text-sm text-slate-300 max-w-xl leading-relaxed font-light">
                        Whether you need a quote, technical support, or sample collection
                        arrangements — our team is ready to assist you.
                    </p>

                    {/* Quick contact facts */}
                    <div className="flex flex-wrap gap-6 mt-8">
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <MapPin className="w-4 h-4 text-emerald-400" />
                            <span>Kuching, Sarawak</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <Phone className="w-4 h-4 text-emerald-400" />
                            <span>013-8183876</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <Mail className="w-4 h-4 text-emerald-400" />
                            <span>itestchem@gmail.com</span>
                        </div>
                    </div>
                </div>
                <div className="h-1 bg-gradient-to-r from-borneo-green via-emerald-600 to-borneo-green-dark mt-14" />
            </section>

            {/* Split-screen content */}
            <main className="flex-grow">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[800px]">
                    {/* Left — Map + Directory */}
                    <InteractiveMapDirectory />

                    {/* Right — Contact Form */}
                    <ContactForm />
                </div>
            </main>

            <Footer />
        </>
    );
}
