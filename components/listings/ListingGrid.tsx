"use client";

import { Listing } from "@/lib/types";
import { ListingCard } from "./ListingCard";
import { useEffect, useState } from "react";
import { StorageService } from "@/lib/storage";

interface ListingGridProps {
    listings: Listing[];
    className?: string; // allow overriding grid cols if needed
    categoryId?: string;
}

export function ListingGrid({ listings: initialListings, className, categoryId }: ListingGridProps) {
    const [listings, setListings] = useState<Listing[]>(initialListings);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const localListings = StorageService.getListings();

        if (localListings.length > 0) {
            let filteredLocal = localListings;
            if (categoryId) {
                filteredLocal = localListings.filter(l => l.category === categoryId);
            }

            // Critical fix: Only update if the current state length is different
            // This assumes initialListings + filteredLocal > listings.length
            // A better check would be checking if the first item matches

            if (filteredLocal.length > 0) {
                setListings(prev => {
                    // Start of the array should be the local listings.
                    // If the first item of state matches the first item of local, we probably already merged.
                    if (prev.length >= filteredLocal.length + initialListings.length) {
                        return prev;
                    }
                    return [...filteredLocal, ...initialListings];
                });
            }
        }
    }, [categoryId, initialListings]);

    // Prevent hydration mismatch if needed, but here we want SEO content (initialListings) to show first.
    // So we don't hide anything. The effect adds to it.

    return (
        <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${className || ''}`}>
            {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
            ))}
        </div>
    );
}
