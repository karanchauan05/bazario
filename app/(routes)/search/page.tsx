import { Container } from "@/components/layout/container";
import { ListingGrid } from "@/components/listings/ListingGrid";
import { LISTINGS } from "@/lib/data/listings";
import { CATEGORIES } from "@/lib/data/categories";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SearchX, Filter } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Search Results - Classified Ads",
    description: "Search for listings on our platform.",
};

interface SearchPageProps {
    searchParams: Promise<{
        q?: string | string[];
        category?: string | string[];
    }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const { q, category } = await searchParams;

    // Helper to normalize params
    const getString = (param: string | string[] | undefined) => Array.isArray(param) ? param[0] : param;

    // Normalize query
    const query = getString(q)?.toLowerCase().trim() || "";
    const categoryFilter = getString(category)?.toLowerCase().trim() || "";

    // Filter Logic
    const results = LISTINGS.filter((listing) => {
        const matchesTitle = query ? listing.title.toLowerCase().includes(query) : true;
        const matchesCategory = categoryFilter && categoryFilter !== "all"
            ? listing.category === categoryFilter
            : true;

        return matchesTitle && matchesCategory;
    });

    const activeCategoryName = categoryFilter && categoryFilter !== "all"
        ? CATEGORIES.find(c => c.slug === categoryFilter)?.name
        : "All Categories";

    return (
        <Container className="py-10">
            <div className="mb-8 space-y-4">
                <h1 className="text-3xl font-bold tracking-tight">
                    {query ? `Results for "${query}"` : "Search Results"}
                </h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Filter className="h-4 w-4" />
                    <span>
                        Filtering by: <span className="font-medium text-foreground">{activeCategoryName}</span>
                    </span>
                    {results.length > 0 && (
                        <span className="ml-2 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                            {results.length} found
                        </span>
                    )}
                </div>
            </div>

            {results.length > 0 ? (
                <ListingGrid listings={results} />
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center rounded-xl border border-dashed bg-muted/30">
                    <div className="bg-muted p-4 rounded-full mb-4">
                        <SearchX className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">No listings found</h2>
                    <p className="text-muted-foreground max-w-md mb-8">
                        We couldn't find anything matching your search. Try adjusting your keywords or category.
                    </p>
                    <div className="flex gap-4">
                        <Button asChild>
                            <Link href="/categories">Browse Categories</Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/">Back Home</Link>
                        </Button>
                    </div>
                </div>
            )}
        </Container>
    );
}
