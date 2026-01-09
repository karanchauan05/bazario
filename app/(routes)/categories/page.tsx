import { Container } from "@/components/layout/container";
import { CategoryCard } from "@/components/features/CategoryCard";
import { CATEGORIES } from "@/lib/data/categories";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Browse Categories - Classified Ads",
    description: "Find what you are looking for by browsing our wide range of categories.",
};

export default function CategoryIndexPage() {
    return (
        <Container className="py-10">
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">All Categories</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Explore our curated collections of items.
                </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-5xl mx-auto">
                {CATEGORIES.map((cat) => (
                    <CategoryCard key={cat.id} category={cat} />
                ))}
            </div>
        </Container>
    );
}
