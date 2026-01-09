import { MetadataRoute } from 'next';
import { CATEGORIES } from '@/lib/data/categories';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://bazario.vercel.app'; // Update with actual domain

    const categoryUrls = CATEGORIES.map((cat) => ({
        url: `${baseUrl}/categories/${cat.slug}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/post-ad`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        ...categoryUrls,
    ];
}
