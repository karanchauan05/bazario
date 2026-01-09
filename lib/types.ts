export type CategoryId = 'electronics' | 'vehicles' | 'furniture' | 'fashion' | 'services' | 'real-estate' | 'jobs' | 'hobbies';

export interface Category {
    id: CategoryId;
    name: string;
    slug: string;
    icon: string; // We will use generic names mapped to Lucide icons
    description: string;
    itemCount: number;
    bgGradient: string; // For UI flair
}

export interface Listing {
    id: string;
    title: string;
    price: number;
    currency: string;
    description: string;
    category: CategoryId;
    images: string[];
    location: string;
    postedAt: string; // ISO date
    condition: 'New' | 'Like New' | 'Good' | 'Fair' | 'Poor';
    seller: {
        id: string;
        name: string;
        avatar?: string;
        joined: string;
        rating: number;
        verified: boolean;
    };
    attributes: Record<string, string>; // e.g., { "Brand": "Apple", "Year": "2022" }
    featured?: boolean;
}
