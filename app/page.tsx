import TopUtilityBar from "@/components/TopUtilityBar";
import MainHeader from "@/components/MainHeader";
import MainNavigation from "@/components/MainNavigation";
import HeroSection from "@/components/HeroSection";
import ServicesGrid from "@/components/ServicesGrid";
import QualityAssurance from "@/components/QualityAssurance";
import TechnicalUpdates from "@/components/TechnicalUpdates";
import QuickDownloads from "@/components/QuickDownloads";
import AccreditationBar from "@/components/AccreditationBar";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      {/* Header */}
      <header className="w-full shadow-sm z-50 relative">
        <TopUtilityBar />
        <MainHeader />
        <MainNavigation />
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-background-legacy">
        <HeroSection />

        {/* Content Grid: Services + Sidebar */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Column */}
          <div className="lg:col-span-8">
            <ServicesGrid />
            <QualityAssurance />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <TechnicalUpdates />
            <QuickDownloads />
          </div>
        </div>

        {/* Accreditation Trust Bar */}
        <AccreditationBar />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
