export const countryCodes = [
    { code: "+60", country: "Malaysia (MY)" },
    { code: "+65", country: "Singapore (SG)" },
    { code: "+62", country: "Indonesia (ID)" },
    { code: "+66", country: "Thailand (TH)" },
    { code: "+63", country: "Philippines (PH)" },
    { code: "+84", country: "Vietnam (VN)" },
    { code: "+86", country: "China (CN)" },
    { code: "+886", country: "Taiwan (TW)" },
    { code: "+81", country: "Japan (JP)" },
    { code: "+82", country: "South Korea (KR)" },
    { code: "+61", country: "Australia (AU)" },
    { code: "+64", country: "New Zealand (NZ)" },
    { code: "+44", country: "United Kingdom (UK)" },
    { code: "+1", country: "United States/Canada (US/CA)" },
];

export const testCategories = [
    "Agricultural",
    "Environmental",
    "Food"
] as const;

export type TestCategory = typeof testCategories[number];

export const testCatalog: Record<TestCategory, { name: string; aliases: string }[]> = {
    Agricultural: [
        { name: "Nitrogen (N)", aliases: "Total Nitrogen, N" },
        { name: "Phosphorus (P)", aliases: "Total Phosphorus, P, P2O5" },
        { name: "Potassium (K)", aliases: "Total Potassium, K, K2O" },
        { name: "Moisture Content", aliases: "Water Content, MC" },
        { name: "Organic Matter", aliases: "OM, Total Organic Carbon, TOC" },
        { name: "Soil pH", aliases: "Acidity, Alkalinity" },
        { name: "Trace Elements (Cu, Zn, Fe, Mn)", aliases: "Micronutrients, Heavy Metals" },
    ],
    Environmental: [
        { name: "Biochemical Oxygen Demand (BOD5)", aliases: "BOD, Oxygen Demand" },
        { name: "Chemical Oxygen Demand (COD)", aliases: "COD, Oxygen Demand" },
        { name: "Total Suspended Solids (TSS)", aliases: "Suspended Solids, TSS" },
        { name: "Oil & Grease (O&G)", aliases: "Hexane Extractable Material, HEM" },
        { name: "Ammoniacal Nitrogen (NH3-N)", aliases: "Ammonia, NH3" },
        { name: "pH Value", aliases: "Acidity, Alkalinity" },
        { name: "Heavy Metals (Pb, Cd, Hg, As)", aliases: "Toxic Metals, Trace Metals" },
    ],
    Food: [
        { name: "Crude Protein", aliases: "Protein Content, Nitrogen" },
        { name: "Crude Fat", aliases: "Total Fat, Lipid Content" },
        { name: "Moisture", aliases: "Water Content, MC" },
        { name: "Ash Content", aliases: "Total Ash, Mineral Content" },
        { name: "Carbohydrate (by difference)", aliases: "Total Carbs" },
        { name: "Energy/Calories", aliases: "Caloric Value" },
        { name: "Total Dietary Fiber", aliases: "Fiber Content" },
    ]
};
