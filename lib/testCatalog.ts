export const countryCodes = [
    { code: "+60", country: "Malaysia (MY)" },
    { code: "+65", country: "Singapore (SG)" },
    { code: "+62", country: "Indonesia (ID)" },
    { code: "+673", country: "Brunei (BN)" },
    { code: "+66", country: "Thailand (TH)" },
    { code: "+1", country: "United States (US)" },
    { code: "+44", country: "United Kingdom (UK)" },
    { code: "+86", country: "China (CN)" },
    { code: "+91", country: "India (IN)" },
    { code: "+61", country: "Australia (AU)" },
];
export const testCategories = ["Agricultural", "Environmental", "Food & Feed"] as const;

export type TestCategory = typeof testCategories[number];

export const testCatalog: Record<string, Record<string, { name: string; aliases: string }[]>> = {
    "Agricultural": {
        "Fertilizer & Compost": [
            { name: "Moisture", aliases: "water content, h2o" },
            { name: "Ammoniacal Nitrogen", aliases: "amm nitrogen, nh3, nh3-n" },
            { name: "Nitrate Nitrogen / Urea N", aliases: "no3, urea, nitrogen" },
            { name: "Total Nitrogen (Urea N + Amm N)", aliases: "total n, urea, ammonia" },
            { name: "Total Nitrogen (Amm N + Nitrate N)", aliases: "total n, ammonia, nitrate" },
            { name: "Total Nitrogen (Unknown sources)", aliases: "total n, tk, nitrogen" },
            { name: "Total Phosphorus", aliases: "phosphorus, p, total p" },
            { name: "Citric Acid Soluble Phosphorus", aliases: "citric acid, phosphorus, p" },
            { name: "Water Soluble Phosphorus", aliases: "water soluble p, phosphorus" },
            { name: "Total Potassium", aliases: "potassium, k, total k" },
            { name: "Total Magnesium", aliases: "magnesium, mg, total mg" },
            { name: "Water Soluble Magnesium", aliases: "water soluble mg, magnesium" },
            { name: "Total Boron (Titration Mtd)", aliases: "boron, b, borate" },
            { name: "Total Boron (Azo Mtd)", aliases: "boron, b, azo" },
            { name: "Total Sulphate", aliases: "sulphate, so4, sulfur" },
            { name: "Total Calcium", aliases: "calcium, ca" },
            { name: "Total Copper", aliases: "copper, cu" },
            { name: "Total Zinc", aliases: "zinc, zn" },
            { name: "pH Level", aliases: "ph, acidity, basicity" },
            { name: "Any other analysis", aliases: "other, custom" }
        ],
        "Plant": [
            { name: "NPKMgCaB", aliases: "npk, plant, tissue, macro" },
            { name: "NPKMgCaBCuZn", aliases: "npk, plant, tissue, micro" },
            { name: "NPKMgCaBCuZnFeMn", aliases: "npk, plant, tissue, full spec" },
            { name: "Ash", aliases: "ash, minerals, plant" },
            { name: "Fresh sample handling", aliases: "fresh, handling" }
        ],
        "Soil": [
            { name: "pH / Conductivity", aliases: "ph, ec, electrical conductivity" },
            { name: "Salinity (Convert from Conductivity)", aliases: "salt, salinity" },
            { name: "Package: pH, N, Org C, Tot P, Avail P, Exch K/Mg/Ca, CEC", aliases: "package, full soil" },
            { name: "Nitrogen", aliases: "n, nitrogen" },
            { name: "Organic Carbon", aliases: "toc, carbon, organic matter" },
            { name: "Total Phosphorus", aliases: "total p, phosphorus" },
            { name: "Available Phosphorus", aliases: "available p, bray" },
            { name: "Exchangeable K, Mg, Ca", aliases: "exchangeable cations, potassium, magnesium, calcium" },
            { name: "Exchangeable Al", aliases: "exchangeable aluminum, al" },
            { name: "Exchangeable Na", aliases: "exchangeable sodium, na" },
            { name: "Cation Exchange Capacity (CEC)", aliases: "cec, exchange capacity" },
            { name: "Particle Size Analysis", aliases: "soil texture, sand, silt, clay, physical" },
            { name: "Available Copper / Available Zinc", aliases: "available cu, available zn, trace" },
            { name: "Boron", aliases: "boron, b" },
            { name: "Other analysis", aliases: "other, custom" }
        ]
    },
    "Environmental": {
        "Water & Wastewater": [
            { name: "pH", aliases: "ph, acidity, basicity" },
            { name: "BOD5 @ 20°C", aliases: "bod, bod5, biological" },
            { name: "BOD3 @ 30°C", aliases: "bod, bod3, biological" },
            { name: "COD", aliases: "cod, chemical oxygen demand" },
            { name: "Phosphorus", aliases: "p, total p" },
            { name: "Ammoniacal Nitrogen", aliases: "nh3-n, ammonia" },
            { name: "Total Nitrogen, Kjedhal", aliases: "tkn, kjedhal, total n" },
            { name: "Total Solids", aliases: "ts, solids" },
            { name: "Suspended Solids", aliases: "tss, total suspended solids" },
            { name: "Total Dissolved Solids", aliases: "tds, dissolved solids" },
            { name: "Oil and Grease", aliases: "o&g, fat, oil, grease, hexane" },
            { name: "Chloride", aliases: "cl, chloride" },
            { name: "Potassium", aliases: "k, potassium" },
            { name: "Total Hardness", aliases: "hardness, caco3" },
            { name: "Alkalinity", aliases: "alkalinity, caco3" },
            { name: "Heavy Metals (Copper, Zinc, Iron, Manganese)", aliases: "heavy metals, cu, zn, fe, mn" },
            { name: "Any other analysis", aliases: "other, custom" }
        ]
    },
    "Food & Feed": {
        "Food & Feed": [
            { name: "pH", aliases: "ph, acidity, basicity" },
            { name: "Fat Content", aliases: "fat, lipid, crude fat" },
            { name: "Protein", aliases: "protein, crude protein, nitrogen" },
            { name: "Moisture", aliases: "water content, h2o, moisture" },
            { name: "Ash", aliases: "ash, minerals" },
            { name: "Carbohydrate", aliases: "carbs, carbohydrate, sugar" },
            { name: "Energy", aliases: "energy, calories, kcal, caloric value" },
            { name: "Crude Fiber", aliases: "fiber, roughage, crude fiber" },
            { name: "Sodium chloride", aliases: "salt, nacl, sodium chloride" },
            { name: "Sodium", aliases: "na, sodium" },
            { name: "Calcium", aliases: "ca, calcium" },
            { name: "Magnesium", aliases: "mg, magnesium" },
            { name: "Iron", aliases: "fe, iron" },
            { name: "Zinc", aliases: "zn, zinc" },
            { name: "Nutritional Labeling Package", aliases: "fda label, nutrition facts, full spec, package" }
        ]
    }
};
