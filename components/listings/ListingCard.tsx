import Link from "next/link";
import Image from "next/image";
import { Listing } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ListingCardProps {
    listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
    return (
        <Link href={`/listings/${listing.id}`} className="group block h-full">
            <div className="h-full flex flex-col rounded-xl overflow-hidden bg-transparent transition-all hover:bg-transparent">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-stone-100 mb-3">
                    <Image
                        src={listing.images[0]}
                        alt={listing.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {listing.featured && (
                        <div className="absolute left-2 top-2 bg-secondary text-primary text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                            Featured
                        </div>
                    )}
                    <div className="absolute bottom-2 right-2 bg-black/40 px-2 py-0.5 rounded text-[10px] font-medium text-white backdrop-blur-md">
                        {listing.condition}
                    </div>
                </div>
                <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-1">
                        <h3 className="line-clamp-1 text-base font-medium text-foreground group-hover:text-primary transition-colors">
                            {listing.title}
                        </h3>
                    </div>

                    <p className="text-lg font-bold text-primary mb-2">
                        {listing.currency}{listing.price.toLocaleString()}
                    </p>

                    <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span className="truncate max-w-[120px]">{listing.location}</span>
                        </div>
                        <span className="text-stone-400">•</span>
                        <span>{formatDistanceToNow(new Date(listing.postedAt))} ago</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
