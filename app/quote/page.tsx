import QuoteForm from "@/components/quote/QuoteForm";
import TopUtilityBar from "@/components/TopUtilityBar";
import MainHeader from "@/components/MainHeader";
import MainNavigation from "@/components/MainNavigation";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Request a Quote | iTestchem Laboratory",
    description: "Request a competitive quotation for your analytical testing needs from our accredited laboratory.",
};

export default function QuotePage() {
    return (
        <>
            <TopUtilityBar />
            <MainHeader />
            <MainNavigation />
            <main className="min-h-[70vh] py-16 px-4 md:px-8 bg-slate-50">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-10 text-center">
                        <h1 className="text-3xl font-black text-slate-900 mb-4 animate-fade-in-up">
                            Request a Quotation
                        </h1>
                        <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: "100ms" }}>
                            Provide us with your testing requirements below, and our commercial team will deliver a comprehensive, itemized quotation customized for your application.
                        </p>
                    </div>

                    <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                        <QuoteForm />
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
