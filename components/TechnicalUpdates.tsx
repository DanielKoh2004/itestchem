interface NewsItem {
    date: string;
    title: string;
    excerpt: string;
    imageUrl: string;
}

const newsItems: NewsItem[] = [
    {
        date: "Nov 08, 2023",
        title: "Expansion of ICP-MS Analytical Capabilities",
        excerpt:
            "New equipment installed to enhance detection limits for ultra-trace heavy metals.",
        imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCFZ5psAhDIqPeMaThlvvH55qKJGFl0HQT8IvM0QESo0iSABYdRb3fL_he0meBihO0uja6gSkVjL80U2-9sx8onI20n3piW_V3fX8V6YVK6rGPuSGUTGf5MkjPN8eZsB4kkRJuTFPTtTH5RlNu2hmOFPurEYAYBH8eu0TORvC1lQCIhWfomgl8e2D_7l9sLhlJLxZYRBevjTUky_nfJYqsibtIKLP_UoKeCwiR4PJ2WSGD_A1DEoe-TApk_O5pk8cVZLYeoHBpOJ454",
    },
    {
        date: "Oct 24, 2023",
        title: "ISO/IEC 17025:2017 Audit Successfully Completed",
        excerpt:
            "i-TESTCHEM continues to uphold the highest standards of lab quality management.",
        imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDhyDUNJi6dogTMqt9lCtkH7dupqWbB85DV4g84-0rvHovbrrwjfRdgkyloTjseuAc4ezzTuWyZhX3AJQRxWUtq4_ddI7Uwq2Vawj-lLBet-ZzPVWuevx8sg6tCdrgscAJt3ejtiE31Wu4pTiAks0bxwnrvo0JVktGciD3At8vftbTZAYJ3GsmiiO__6oSaygX1ALRWsBwv6s_-Wc7pesOGieiqv99y_byCt9KkmUjrauzZXShRlUeMb6RJ0d9Uw0jXLsI00Yalnhin",
    },
    {
        date: "Sep 12, 2023",
        title: "Updated Soil Sampling Protocol for Borneo Terrain",
        excerpt:
            "Technical guidelines released for improved representative sampling in peatlands.",
        imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAqvhD53F0ZpcTPyu2Wdi69h2WRda73Yefu8N9775DxpwYqKU3mlh3ldUyUtC6F1JnK6T9Bmnfn3hEvI78WzkOFxRwo-w7QtOn8gR6SxnENE0HrofNXHXryDplR1O7hMEOJtvZ8qD1QLBtBRlFDKHZuc2cJ70jYwGcMqYps6pcy8l4TLzEJnYWNiCnqqcLenfMrMofmGy2mntB7jrshPa9piXbsJbfCTTTuzKiI2QOSF1nIe1ijUdzrmS-LPbaaM0nHagu5-BYN4ssT",
    },
];

export default function TechnicalUpdates() {
    return (
        <div className="bg-white border border-slate-200 rounded-sm overflow-hidden animate-fade-in-right delay-100">
            <div className="bg-slate-50 px-5 py-3 border-b-2 border-borneo-green">
                <h3 className="text-lg font-bold text-slate-800 uppercase tracking-tight">
                    Technical Updates
                </h3>
            </div>
            <div className="divide-y divide-slate-100">
                {newsItems.map((item, index) => (
                    <div
                        key={item.title}
                        className="p-5 hover:bg-slate-50 cursor-pointer group transition-colors animate-fade-in-up"
                        style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                    >
                        <div className="flex gap-4">
                            <div className="w-16 h-16 bg-slate-200 shrink-0 rounded-sm overflow-hidden">
                                <div
                                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                                    style={{ backgroundImage: `url('${item.imageUrl}')` }}
                                />
                            </div>
                            <div>
                                <div className="text-[10px] text-borneo-green font-bold mb-1">
                                    {item.date}
                                </div>
                                <h5 className="text-[13px] font-bold text-slate-700 group-hover:text-borneo-green leading-tight transition-colors">
                                    {item.title}
                                </h5>
                                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-snug">
                                    {item.excerpt}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="bg-slate-50 p-3 text-center border-t border-slate-200">
                <button className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-borneo-green transition-colors">
                    View All Updates
                </button>
            </div>
        </div>
    );
}
