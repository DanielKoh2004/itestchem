export interface SearchResult {
    id: string;
    title: string;
    description: string;
    url: string;
    category: string;
}

export const searchIndex: SearchResult[] = [
    // Core Pages
    {
        id: "home",
        title: "Home",
        description: "iTestchem Laboratory Services homepage.",
        url: "/",
        category: "Page",
    },
    {
        id: "about",
        title: "About Us",
        description: "Learn about our MS ISO/IEC 17025 accredited laboratory.",
        url: "/about",
        category: "Page",
    },
    {
        id: "contact",
        title: "Contact",
        description: "Get in touch with Ms. Koh Yew Ping for quotations and inquiries.",
        url: "/contact",
        category: "Page",
    },
    {
        id: "careers",
        title: "Careers",
        description: "Join our team of dedicated professional chemists and analysts.",
        url: "/careers",
        category: "Page",
    },

    // Services
    {
        id: "srv-agri-1",
        title: "Fertilizer & Compost Analysis",
        description: "Moisture, Amm Nitrogen, Total P, Total Potassium, Boron, Copper, Zinc, pH.",
        url: "/services/agricultural",
        category: "Testing Service",
    },
    {
        id: "srv-agri-2",
        title: "Plant Tissue Analysis",
        description: "NPKMgCaB, Ash, Fresh sample handling.",
        url: "/services/agricultural",
        category: "Testing Service",
    },
    {
        id: "srv-agri-3",
        title: "Soil Analysis",
        description: "pH, Conductivity, Nitrogen, Organic Carbon, CEC, Exchangeable K/Mg/Ca, Particle Size.",
        url: "/services/agricultural",
        category: "Testing Service",
    },
    {
        id: "srv-env-1",
        title: "Water & Wastewater Analysis",
        description: "BOD5, COD, Ammoniacal Nitrogen, Total Suspended Solids, Oil and Grease, Heavy Metals.",
        url: "/services/environmental",
        category: "Testing Service",
    },
    {
        id: "srv-food-1",
        title: "Food & Nutritional Analysis",
        description: "Fat, Protein, Moisture, Ash, Carbohydrate, Energy, Nutritional Labeling.",
        url: "/services/food",
        category: "Testing Service",
    },
    {
        id: "job-intern",
        title: "Hiring Laboratory Intern",
        description: "Gain hands-on experience in sample preparation, analytical chemistry, and ISO 17025 workflows.",
        url: "/careers",
        category: "Careers",
    },
    {
        id: "job-chemist",
        title: "Analytical Chemist",
        description: "Full-Time, Kuching HQ. Requirements: B.Sc in Chemistry, Registered with IKM, 2+ years ISO 17025 experience.",
        url: "/careers",
        category: "Careers",
    },
    {
        id: "job-tech",
        title: "Laboratory Technician",
        description: "Full-Time, Kota Samarahan. Requirements: Diploma in Science, experience in sample preparation.",
        url: "/careers",
        category: "Careers",
    }
];
