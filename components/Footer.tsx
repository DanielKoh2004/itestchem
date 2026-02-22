import { Globe, Mail, Radio } from "lucide-react";
import Link from "next/link";

interface FooterLinkGroup {
    heading: string;
    links: { label: string; href: string }[];
}

interface OfficeInfo {
    heading: string;
    officeName: string;
    address: string[];
    phone: string;
    extra: string;
}

const corporateLinks: FooterLinkGroup = {
    heading: "Corporate",
    links: [
        { label: "About iTestchem", href: "#" },
        { label: "Our Team", href: "#" },
        { label: "Quality Policy", href: "#" },
        { label: "Sustainability Commitment", href: "#" },
        { label: "Careers", href: "#" },
    ],
};

const offices: OfficeInfo[] = [
    {
        heading: "Our Office",
        officeName: "Kuching, Sarawak",
        address: [
            "1st Floor, Sublot 6",
            "Contempo Commercial Centre",
            "Mile 8, Kuching-Serian Road",
            "93250 Kuching, Sarawak, Malaysia",
        ],
        phone: "Ms. Elvina Anak Let: 013-8183876",
        extra: "E: itestchem@gmail.com",
    },
];

const sectorLinks: FooterLinkGroup = {
    heading: "Our Sectors",
    links: [
        { label: "Palm Oil Industry", href: "#" },
        { label: "Agriculture & Plantations", href: "#" },
        { label: "Environmental Monitoring", href: "#" },
        { label: "Food & Beverage", href: "#" },
        { label: "Consultation", href: "/services/consultancy" },
    ],
};

const bottomLinks = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Analysis", href: "#" },
    { label: "Anti-Bribery Policy", href: "#" },
    { label: "Site Map", href: "#" },
];

const disclaimer = `DISCLAIMER: iTestchem Laboratory Sdn Bhd provides professional laboratory testing services. All reports and results issued by iTestchem are for the exclusive use of the client and are based strictly on the sample(s) as received. We do not accept liability for consequences arising from improper sampling techniques performed by third parties or for interpretations made by clients. Our maximum liability in any circumstance is limited to the cost of the specific analysis performed. Re-testing requests must be submitted within 14 business days of report issuance. Unauthorized reproduction or alteration of our certificates of analysis is strictly prohibited under Malaysian law.`;

export default function Footer() {
    return (
        <footer className="bg-slate-navy text-slate-400 pt-20 pb-10 text-[13px]">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Top Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16 border-b border-slate-700 pb-16">
                    {/* Corporate Links */}
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6 border-l-4 border-borneo-green pl-3">
                            {corporateLinks.heading}
                        </h4>
                        <ul className="space-y-3">
                            {corporateLinks.links.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        className="hover:text-emerald-400 transition-colors"
                                        href={link.href}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Office Columns */}
                    {offices.map((office) => (
                        <div key={office.heading}>
                            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6 border-l-4 border-borneo-green pl-3">
                                {office.heading}
                            </h4>
                            <p className="font-bold text-slate-200 mb-2">
                                {office.officeName}
                            </p>
                            <address className="not-italic leading-relaxed mb-4 text-slate-500">
                                {office.address.map((line, i) => (
                                    <span key={i}>
                                        {line}
                                        {i < office.address.length - 1 && <br />}
                                    </span>
                                ))}
                            </address>
                            <p className="text-xs">{office.phone}</p>
                            {office.extra && <p className="text-xs">{office.extra}</p>}
                        </div>
                    ))}

                    {/* Sectors */}
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6 border-l-4 border-borneo-green pl-3">
                            {sectorLinks.heading}
                        </h4>
                        <ul className="space-y-3">
                            {sectorLinks.links.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        className="hover:text-emerald-400 transition-colors"
                                        href={link.href}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Technical Bulletins */}
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6 border-l-4 border-borneo-green pl-3">
                            Technical Bulletins
                        </h4>
                        <p className="mb-4 text-xs text-slate-500">
                            Subscribe for regulatory updates and laboratory technical notes.
                        </p>
                        <form className="flex flex-col gap-2">
                            <input
                                className="bg-slate-800 border border-slate-700 text-white text-xs px-3 py-3 focus:outline-none focus:ring-2 focus:ring-borneo-green focus:border-borneo-green placeholder:text-slate-600"
                                placeholder="Work Email Address"
                                type="email"
                            />
                            <button
                                type="submit"
                                className="bg-borneo-green hover:bg-borneo-green-dark text-white font-bold text-[10px] uppercase tracking-widest py-3 transition-colors"
                            >
                                Subscribe Now
                            </button>
                        </form>
                        <div className="flex gap-4 mt-6">
                            <Link
                                className="text-slate-600 hover:text-emerald-400 transition-colors"
                                href="#"
                                aria-label="Website"
                            >
                                <Globe className="w-5 h-5" />
                            </Link>
                            <Link
                                className="text-slate-600 hover:text-emerald-400 transition-colors"
                                href="#"
                                aria-label="Email"
                            >
                                <Mail className="w-5 h-5" />
                            </Link>
                            <Link
                                className="text-slate-600 hover:text-emerald-400 transition-colors"
                                href="#"
                                aria-label="Podcast"
                            >
                                <Radio className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                        <p>© 2024 iTESTCHEM LABORATORY SDN BHD.</p>
                        <div className="flex flex-wrap gap-8">
                            {bottomLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    className="hover:text-emerald-400 transition-colors"
                                    href={link.href}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="text-[9px] text-slate-600 leading-relaxed text-justify border-t border-slate-700 pt-6">
                        {disclaimer}
                    </div>
                </div>
            </div>
        </footer>
    );
}
