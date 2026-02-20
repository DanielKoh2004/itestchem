import { Leaf, Droplets, Utensils, BookOpenCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ServiceBullet {
    text: string;
}

interface ServiceCardData {
    icon: LucideIcon;
    title: string;
    description: string;
    bullets: ServiceBullet[];
}

const services: ServiceCardData[] = [
    {
        icon: Leaf,
        title: "Agricultural Analysis",
        description:
            "Fertilizer, Plant/Foliar, and Soil testing for plantation crops and agricultural compliance.",
        bullets: [
            { text: "Total Nitrogen, P₂O₅, K₂O" },
            { text: "Foliar & Tissue Nutrient Levels" },
            { text: "Soil pH & Cation Exchange" },
        ],
    },
    {
        icon: Droplets,
        title: "Environmental Analysis",
        description:
            "Comprehensive Water Quality testing for drinking water, irrigation, and industrial effluent.",
        bullets: [
            { text: "BOD/COD & Suspended Solids" },
            { text: "Microbiological Analysis" },
            { text: "POME Treatment Monitoring" },
        ],
    },
    {
        icon: Utensils,
        title: "Food & Feed",
        description:
            "Nutritional labeling, animal feeds, compost, and bunch ash analysis for export quality.",
        bullets: [
            { text: "Nutritional Labeling (Proximate)" },
            { text: "Animal Feed Composition" },
            { text: "Compost & Bunch Ash Analysis" },
        ],
    },
    {
        icon: BookOpenCheck,
        title: "Consulting Services",
        description:
            "MS ISO/IEC 17025 accreditation consulting and internal auditing for laboratories.",
        bullets: [
            { text: "Accreditation Gap Analysis" },
            { text: "Internal Audit Programs" },
            { text: "Method Validation Support" },
        ],
    },
];

function ServiceCard({
    service,
    index,
}: {
    service: ServiceCardData;
    index: number;
}) {
    const IconComponent = service.icon;
    return (
        <div
            className="bg-white border border-slate-200 p-5 rounded-sm shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all duration-300 hover:-translate-y-0.5 group animate-fade-in-up"
            style={{ animationDelay: `${0.1 + index * 0.1}s` }}
        >
            <div className="flex items-start gap-4">
                <div className="p-2 bg-emerald-50 rounded-sm group-hover:bg-borneo-green transition-colors duration-300">
                    <IconComponent className="w-6 h-6 text-borneo-green group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                    <h4 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-borneo-green transition-colors">
                        {service.title}
                    </h4>
                    <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                        {service.description}
                    </p>
                    <ul className="text-[11px] text-slate-400 space-y-1.5 font-medium">
                        {service.bullets.map((bullet) => (
                            <li key={bullet.text} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-borneo-green rounded-full shrink-0" />
                                {bullet.text}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default function ServicesGrid() {
    return (
        <div>
            <div className="mb-6 border-b-2 border-borneo-green pb-3 flex justify-between items-end">
                <h3 className="text-3xl font-bold text-slate-800">
                    Core Analytical Scopes
                </h3>
                <a
                    className="text-xs font-bold text-borneo-green uppercase tracking-wider hover:underline"
                    href="#"
                >
                    Download Service Catalogue
                </a>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                {services.map((service, index) => (
                    <ServiceCard key={service.title} service={service} index={index} />
                ))}
            </div>
        </div>
    );
}
