import { Listing } from "@/lib/types";

const DESCRIPTIONS = [
    "Barely used, in excellent condition. Selling because I upgraded.",
    "Brand new in box. Never opened. Unwanted gift.",
    "Well loved but still fully functional. Great for beginners.",
    "Mint condition. Comes with all original accessories and receipt.",
    "Good condition for its age. Some minor wear and tear visible.",
    "Like new! Only used a handful of times.",
    "Professional grade equipment. reliable and sturdy.",
    "Vintage item, rare find. perfect for collectors.",
    "Works perfectly. Battery life is still amazing.",
    "Need gone ASAP. Price negotiable for quick pickup."
];

const LOCATIONS = [
    "New York, NY", "Brooklyn, NY", "Los Angeles, CA", "San Francisco, CA",
    "Chicago, IL", "Austin, TX", "Miami, FL", "Seattle, WA", "Boston, MA",
    "Denver, CO", "Portland, OR", "Atlanta, GA", "Dallas, TX", "Phoenix, AZ"
];

const IMAGES_BY_CATEGORY: Record<string, string[]> = {
    electronics: [
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop', // Laptop
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop', // Phone
        'https://images.unsplash.com/photo-1526857240824-92be0cbd857b?q=80&w=800&auto=format&fit=crop', // Watch/Gadget
        'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=800&auto=format&fit=crop', // Phone 2
        'https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=800&auto=format&fit=crop', // Electronics
    ],
    vehicles: [
        'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=800&auto=format&fit=crop', // Mustang
        'https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=800&auto=format&fit=crop', // Car
        'https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=800&auto=format&fit=crop', // Car side
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop', // Car dashboard
    ],
    furniture: [
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop', // Sofa
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop', // Chair
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop', // Minimal chair
        'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=800&auto=format&fit=crop', // Living room
    ],
    fashion: [
        'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop', // Clothes on hanger
        'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop', // Box
        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop', // Jacket
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop', // Fashion model
    ],
    "real-estate": [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop', // Apartment
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop', // Modern house
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&auto=format&fit=crop', // House
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop', // Kitchen
    ],
    hobbies: [
        'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?q=80&w=800&auto=format&fit=crop', // Headphones/Game
        'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop', // Console
        'https://images.unsplash.com/photo-1566438480900-0609be27a4be?q=80&w=800&auto=format&fit=crop', // Camera lens
        'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=800&auto=format&fit=crop', // Yoga
    ]
};

const TITLES_BY_CATEGORY: Record<string, string[]> = {
    electronics: ["iPhone 15 Pro", "Samsung Galaxy S24", "MacBook Air M2", "Sony PlayStation 5", "Nintendo Switch OLED", "iPad Pro 12.9", "Canon EOS R5", "Dell XPS 15", "AirPods Max", "LG C3 OLED TV"],
    vehicles: ["Tesla Model 3", "Honda Civic 2022", "Toyota Camry Hybrid", "Ford F-150", "BMW 330i", "Mercedes C-Class", "Jeep Wrangler", "Porsche 911", "Audi A4", "Subaru Outback"],
    furniture: ["Mid-Century Sofa", "Oak Dining Table", "Ergonomic Office Chair", "Queen Bed Frame", "Standing Desk", "Bookshelf", "Leather Recliner", "Coffee Table", "Wardrobe", "Patio Set"],
    fashion: ["Nike Air Jordan 1", "Vintage Levis 501", "Gucci Handbag", "North Face Jacket", "Ray-Ban Aviators", "Adidas Yeezy Boost", "Rolex Submariner", "Supreme Hoodie", "Lululemon Leggings", "Hermes Belt"],
    "real-estate": ["Modern Downtown Apartment", "Cozy Cottage", "Spacious Family Home", "Luxury Penthouse", "Studio Loft", "Beachfront Condo", "Suburban House", "City Center Office", "Renovated Townhouse", "Lake House"],
    hobbies: ["Gibson Les Paul Guitar", "Yamaha Piano", "Tennis Racket Pro", "Camping Tent 4-Person", "Mountain Bike Trek", "Golf Club Set", "Fishing Rod", "Violin 4/4", "Skateboard Complete", "Yoga Mat High Quality"]
};

// Helper to pick random item
const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Generator function
const generateListings = (): Listing[] => {
    const listings: Listing[] = [];
    let idCounter = 1;

    Object.keys(TITLES_BY_CATEGORY).forEach(category => {
        const titles = TITLES_BY_CATEGORY[category];
        // Generate 15 items per category
        for (let i = 0; i < 15; i++) {
            const baseTitle = pick(titles);
            const condition = pick(['New', 'Like New', 'Good', 'Fair'] as const);

            listings.push({
                id: `gen-${idCounter++}`,
                title: `${baseTitle} - ${condition} Condition`,
                price: Math.floor(Math.random() * 2000) + 50,
                currency: '$',
                description: pick(DESCRIPTIONS),
                category: category as any,
                images: [
                    pick(IMAGES_BY_CATEGORY[category] || IMAGES_BY_CATEGORY['electronics'])
                ],
                location: pick(LOCATIONS),
                postedAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
                condition: condition,
                seller: {
                    id: `seller-${idCounter}`,
                    name: `User ${Math.floor(Math.random() * 1000)}`,
                    joined: '2023-01-01',
                    rating: 4.5 + (Math.random() * 0.5),
                    verified: Math.random() > 0.3
                },
                attributes: {
                    "Generated": "True",
                    "Item #": `${i + 1}`
                },
                featured: Math.random() > 0.8
            });
        }
    });

    return listings;
};

export const LISTINGS: Listing[] = [
    // Keep original listings for consistency
    {
        id: '1',
        title: 'iPhone 14 Pro Max - Deep Purple',
        price: 999,
        currency: '$',
        description: 'Selling my iPhone 14 Pro Max. 256GB storage. Battery health 98%. Comes with original box and cable. Always used with a screen protector and case.',
        category: 'electronics',
        images: [
            'https://casesvilla.com/cdn/shop/products/iPhone14ProMaxDeepPurpleCase_e1bb53e0-2a95-4716-b4bd-aa2bed3544ca.jpg?v=1665399713&width=2048',
            'https://images.unsplash.com/photo-1696446702306-6927d30d5b6e?q=80&w=1000&auto=format&fit=crop'
        ],
        location: 'New York, NY',
        postedAt: '2023-10-15T10:30:00Z',
        condition: 'Like New',
        seller: {
            id: 's1',
            name: 'Alex Johnson',
            joined: '2022-03-10',
            rating: 4.8,
            verified: true
        },
        attributes: {
            "Storage": "256GB",
            "Color": "Deep Purple",
            "Brand": "Apple"
        },
        featured: true
    },
    ...generateListings()
];
