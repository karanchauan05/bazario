import { Category } from "@/lib/types";

export const CATEGORIES: Category[] = [
    {
        id: 'electronics',
        name: 'Electronics',
        slug: 'electronics',
        icon: 'Smartphone',
        description: 'Phones, laptops, cameras & more',
        itemCount: 1240,
        bgGradient: 'from-[#024294] to-[#a3d1da]', // Congress Blue -> Aqua Island
    },
    {
        id: 'vehicles',
        name: 'Vehicles',
        slug: 'vehicles',
        icon: 'Car',
        description: 'Cars, motorcycles, parts',
        itemCount: 85,
        bgGradient: 'from-[#90011e] to-[#dc3a44]', // Burgundy -> Valencia
    },
    {
        id: 'furniture',
        name: 'Furniture',
        slug: 'furniture',
        icon: 'Sofa',
        description: 'Sofas, beds, tables & decor',
        itemCount: 340,
        bgGradient: 'from-[#515050] to-[#cb9483]', // Emperor -> My Pink
    },
    {
        id: 'fashion',
        name: 'Fashion',
        slug: 'fashion',
        icon: 'Shirt',
        description: 'Clothing, shoes, accessories',
        itemCount: 2100,
        bgGradient: 'from-[#cb9483] to-[#90011e]', // My Pink -> Burgundy
    },
    {
        id: 'real-estate',
        name: 'Real Estate',
        slug: 'real-estate',
        icon: 'Home',
        description: 'Apartments, houses, offices',
        itemCount: 45,
        bgGradient: 'from-[#024294] to-[#68b38a]', // Congress Blue -> Silver Tree
    },
    {
        id: 'hobbies',
        name: 'Hobbies',
        slug: 'hobbies',
        icon: 'Gamepad2',
        description: 'Gaming, sports, music',
        itemCount: 560,
        bgGradient: 'from-[#68b38a] to-[#a3d1da]', // Silver Tree -> Aqua Island
    },
];
