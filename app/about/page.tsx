import type { Metadata } from "next";
import TopUtilityBar from "@/components/TopUtilityBar";
import MainHeader from "@/components/MainHeader";
import MainNavigation from "@/components/MainNavigation";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import LeadershipAuthority from "@/components/about/LeadershipAuthority";
import AccreditationBanner from "@/components/about/AccreditationBanner";
import QualityAssuranceGrid from "@/components/about/QualityAssuranceGrid";
import LogisticsAndValue from "@/components/about/LogisticsAndValue";
import WhyChooseUs from "@/components/about/WhyChooseUs";

export const metadata: Metadata = {
    title: "About Us | iTestchem Laboratory Sdn Bhd",
    description:
        "Learn about iTestchem Laboratory Sdn Bhd — a SAMM-accredited MS ISO/IEC 17025 agricultural and environmental testing laboratory in Sarawak, Malaysia, managed by a registered Chemist with over 20 years of analytical experience.",
};

export default function AboutPage() {
    return (
        <>
            <header className="w-full shadow-sm relative">
                <TopUtilityBar />
                <MainHeader />
            </header>
            <MainNavigation />

            <main className="flex-grow">
                <AboutHero />
                <WhyChooseUs />
                <LeadershipAuthority />
                <AccreditationBanner />
                <QualityAssuranceGrid />
                <LogisticsAndValue />
            </main>

            <Footer />
        </>
    );
}
