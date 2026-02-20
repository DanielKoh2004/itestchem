import type { Metadata } from "next";
import TopUtilityBar from "@/components/TopUtilityBar";
import MainHeader from "@/components/MainHeader";
import MainNavigation from "@/components/MainNavigation";
import Footer from "@/components/Footer";
import AboutContent from "@/components/about/AboutContent";

export const metadata: Metadata = {
    title: "About Us | i-TESTCHEM Laboratory Services",
    description:
        "Learn about i-TESTCHEM Laboratory Services — a SAMM-accredited MS ISO/IEC 17025 agricultural and environmental testing laboratory in Sarawak, Malaysia, managed by a registered Chemist with over 20 years of analytical experience.",
};

export default function AboutPage() {
    return (
        <>
            <header className="w-full shadow-sm z-50 relative">
                <TopUtilityBar />
                <MainHeader />
                <MainNavigation />
            </header>

            <main className="flex-grow">
                <AboutContent />
            </main>

            <Footer />
        </>
    );
}
