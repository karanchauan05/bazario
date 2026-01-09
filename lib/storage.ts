import { Listing } from "@/lib/types";

const STORAGE_KEYS = {
    LISTINGS: 'bazario_listings',
    USER: 'bazario_user_session',
};

export const StorageService = {
    // Listings
    getListings: (): Listing[] => {
        if (typeof window === 'undefined') return [];
        const data = localStorage.getItem(STORAGE_KEYS.LISTINGS);
        return data ? JSON.parse(data) : [];
    },

    saveListing: (listing: Listing) => {
        const listings = StorageService.getListings();
        listings.unshift(listing);
        localStorage.setItem(STORAGE_KEYS.LISTINGS, JSON.stringify(listings));
    },

    deleteListing: (id: string) => {
        const listings = StorageService.getListings().filter(l => l.id !== id);
        localStorage.setItem(STORAGE_KEYS.LISTINGS, JSON.stringify(listings));
    },

    // Initialize with seed data if empty
    initialize: (seedData: Listing[]) => {
        if (typeof window === 'undefined') return;
        if (!localStorage.getItem(STORAGE_KEYS.LISTINGS)) {
            localStorage.setItem(STORAGE_KEYS.LISTINGS, JSON.stringify(seedData));
        }
    }
};
