import { Container } from "@/components/layout/container";
import { ListingGrid } from "@/components/listings/ListingGrid";
import { CATEGORIES } from "@/lib/data/categories";
import { LISTINGS } from "@/lib/data/listings";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MobileFilters } from "@/components/listings/MobileFilters";

interface CategoryPageProps {
    params: Promise<{
        slug: string;
    }>;
    searchParams: Promise<{
        sort?: string | string[];
        minPrice?: string | string[];
        maxPrice?: string | string[];
        condition?: string | string[];
    }>;
}

// Generate Static Params for SSG
export function generateStaticParams() {
    return CATEGORIES.map((cat) => ({
        slug: cat.slug,
    }));
}

// Dynamic Metadata
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const { slug } = await params;
    const category = CATEGORIES.find((c) => c.slug === slug);
    if (!category) return { title: "Category Not Found" };

    return {
        title: `${category.name} - Classified Ads`,
        description: `Buy and sell ${category.name} locally. Find the best deals on ${category.description}.`,
    };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
    const { slug } = await params;
    const { sort, minPrice, maxPrice, condition } = await searchParams;

    const category = CATEGORIES.find((c) => c.slug === slug);

    if (!category) {
        notFound();
    }

    // Filter Logic
    let categoryListings = LISTINGS.filter((l) => l.category === category.id);

    // Helper to get first string from param (for single-value fields)
    const getString = (param: string | string[] | undefined) => Array.isArray(param) ? param[0] : param;

    // Price Filter
    const min = getString(minPrice);
    if (min) {
        categoryListings = categoryListings.filter(l => l.price >= Number(min));
    }
    const max = getString(maxPrice);
    if (max) {
        categoryListings = categoryListings.filter(l => l.price <= Number(max));
    }

    // Condition Filter
    if (condition) {
        let conditions: string[] = [];
        if (Array.isArray(condition)) {
            conditions = condition;
        } else if (typeof condition === 'string') {
            conditions = condition.split(',');
        }
        categoryListings = categoryListings.filter(l => conditions.includes(l.condition));
    }

    // Sort Logic
    const sortVal = getString(sort);
    if (sortVal === 'price_asc') {
        categoryListings.sort((a, b) => a.price - b.price);
    } else if (sortVal === 'price_desc') {
        categoryListings.sort((a, b) => b.price - a.price);
    } else if (sortVal === 'newest') {
        categoryListings.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
    }

    return (
        <Container className="py-10">
            <div className="mb-8">
                <Button variant="ghost" asChild className="mb-4 pl-0 hover:bg-transparent hover:text-primary">
                    <Link href="/categories">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Categories
                    </Link>
                </Button>
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-serif font-bold tracking-tight text-primary">{category.name}</h1>
                        <p className="text-muted-foreground mt-2">{category.description}</p>
                    </div>
                    {/* Desktop Sort Dropdown */}
                    <div className="hidden lg:block">
                        <span className="text-sm text-muted-foreground mr-2">Sort by:</span>
                        <div className="inline-flex rounded-md shadow-sm">
                            <Link href={`?sort=newest`} className={`px-3 py-1 text-sm border rounded-l-md ${!sort || sort === 'newest' ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-muted'}`}>Newest</Link>
                            <Link href={`?sort=price_asc`} className={`px-3 py-1 text-sm border-t border-b ${sort === 'price_asc' ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-muted'}`}>Price: Low</Link>
                            <Link href={`?sort=price_desc`} className={`px-3 py-1 text-sm border rounded-r-md ${sort === 'price_desc' ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-muted'}`}>Price: High</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Filters */}
            <MobileFilters
                minPrice={min}
                maxPrice={max}
                condition={Array.isArray(condition) ? condition.join(',') : condition}
                sort={sortVal}
                slug={slug}
            />

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Filters Sidebar (Hidden on Mobile) */}
                <aside className="w-full lg:w-64 flex-shrink-0 space-y-6 hidden lg:block">
                    <div className="rounded-lg border bg-card p-4 shadow-sm">
                        <h3 className="font-semibold mb-4 text-primary">Filters</h3>

                        {/* Interactive Filter Form */}
                        <form className="space-y-6">
                            {/* Preserve existing params if needed, but for simplicity we rely on native form action which replaces params */}

                            <div>
                                <h4 className="text-sm font-medium mb-2">Price Range</h4>
                                <div className="flex items-center gap-2">
                                    <input name="minPrice" type="number" placeholder="Min" defaultValue={minPrice} className="w-full rounded-sm border px-2 py-1 text-sm" />
                                    <span>-</span>
                                    <input name="maxPrice" type="number" placeholder="Max" defaultValue={maxPrice} className="w-full rounded-sm border px-2 py-1 text-sm" />
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium mb-2">Condition</h4>
                                <div className="space-y-2">
                                    {['New', 'Like New', 'Good', 'Used'].map(c => (
                                        <div key={c} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="condition"
                                                value={c}
                                                id={c}
                                                className="mr-2 accent-primary"
                                                defaultChecked={condition?.includes(c)}
                                            />
                                            <label htmlFor={c} className="text-sm text-foreground/80">{c}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Button type="submit" size="sm" className="w-full bg-primary text-primary-foreground">
                                Apply Filters
                            </Button>
                            {(minPrice || maxPrice || condition) && (
                                <Link href={`/categories/${slug}`} className="block text-center text-xs text-muted-foreground hover:underline mt-2">
                                    Clear Filters
                                </Link>
                            )}
                        </form>
                    </div>
                </aside>

                {/* Listings */}
                {categoryListings.length > 0 ? (
                    <ListingGrid listings={categoryListings} categoryId={category.id} />
                ) : (
                    <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-dashed text-center bg-muted/10">
                        <p className="text-muted-foreground text-lg">No listings found matching your criteria.</p>
                        <Button variant="link" asChild className="mt-2 text-primary">
                            <Link href={`/categories/${slug}`}>Clear all filters</Link>
                        </Button>
                    </div>
                )}
            </div>

        </Container >
    );
}
