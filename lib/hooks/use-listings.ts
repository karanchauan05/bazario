"use client";

import { useState, useEffect } from 'react';
import { Listing } from '@/lib/types';
import { StorageService } from '@/lib/storage';
import { LISTINGS } from '@/lib/data/listings';

export function useListings(category?: string) {
    const [listings, setListings] = useState<Listing[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching
        const load = () => {
            const local = StorageService.getListings();
            // Map local listings to match generic Listing type if needed, but they should match
            const all = [...local, ...LISTINGS];

            let filtered = all;
            if (category) {
                filtered = all.filter(l => l.category === category);
            }

            // Sort by date new to old
            filtered.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());

            setListings(filtered);
            setLoading(false);
        };

        load();
        // Add event listener for storage changes if we want real-time updates across tabs
        // window.addEventListener('storage', load);
        // return () => window.removeEventListener('storage', load);
    }, [category]);

    return { listings, loading };
}
