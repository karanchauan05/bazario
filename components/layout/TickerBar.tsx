import { Container } from "@/components/layout/container";

export function TickerBar() {
    const tickerItems = [
        "🔥 HOT: iPhone 14 Pro Max sold for $950 in Brooklyn",
        "📈 TRENDING: Vintage Furniture sales up 20% this week",
        "🆕 JUST LISTED: 2019 Tesla Model 3 in San Francisco",
        "⚡ QUICK SALE: Sony A7 IV gone in 2 hours!",
        "💎 FEATURED: Renovated Loft in Downtown Chicago",
        "🚀 NEW FEATURES: Instant Chat now available for verified users"
    ];

    return (
        <div className="bg-primary text-primary-foreground py-2.5 overflow-hidden relative z-40 shadow-sm">
            <Container className="flex items-center">
                <div className="bg-secondary text-primary font-bold text-[10px] px-2 py-0.5 rounded-sm mr-3 uppercase tracking-wider shrink-0 animate-pulse">
                    Live
                </div>
                <div className="flex-1 overflow-hidden relative group">
                    <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
                        {tickerItems.map((item, i) => (
                            <span key={i} className="mx-8 text-xs font-medium tracking-wide opacity-90">
                                {item}
                            </span>
                        ))}
                        {/* Duplicate for seamless loop */}
                        {tickerItems.map((item, i) => (
                            <span key={`dup-${i}`} className="mx-8 text-xs font-medium tracking-wide opacity-90">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    );
}
