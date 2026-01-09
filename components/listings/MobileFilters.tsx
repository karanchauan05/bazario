"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, Filter, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface MobileFiltersProps {
    minPrice?: string;
    maxPrice?: string;
    condition?: string;
    sort?: string;
    slug: string;
}

export function MobileFilters({ minPrice, maxPrice, condition, sort, slug }: MobileFiltersProps) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    // We can rely on native form submission for simplicity, mimicking the server component
    // But since this is a client component, we might want to handle it smarter to avoid full reload?
    // Actually, native form submission to the same URL with query params is perfectly fine and robust.
    // It will trigger a server re-render which is what we want.

    return (
        <div className="lg:hidden mb-6">
            <Button
                variant="outline"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full justify-between"
            >
                <span className="flex items-center gap-2">
                    <Filter className="h-4 w-4" /> Filters & Sort
                </span>
                {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>

            {isOpen && (
                <div className="mt-4 p-4 border rounded-lg bg-card shadow-sm animate-in slide-in-from-top-2">
                    <form action="" className="space-y-6">
                        {/* Sort Options */}
                        <div>
                            <h4 className="text-sm font-medium mb-2">Sort By</h4>
                            <select
                                name="sort"
                                defaultValue={sort || "newest"}
                                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                            >
                                <option value="newest">Newest Listed</option>
                                <option value="price_asc">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                            </select>
                        </div>

                        {/* Price Range */}
                        <div>
                            <h4 className="text-sm font-medium mb-2">Price Range ($)</h4>
                            <div className="flex items-center gap-2">
                                <Input name="minPrice" type="number" placeholder="Min" defaultValue={minPrice} />
                                <span>-</span>
                                <Input name="maxPrice" type="number" placeholder="Max" defaultValue={maxPrice} />
                            </div>
                        </div>

                        {/* Condition */}
                        <div>
                            <h4 className="text-sm font-medium mb-2">Condition</h4>
                            <div className="grid grid-cols-2 gap-2">
                                {['New', 'Like New', 'Good', 'Used'].map(c => (
                                    <div key={c} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            name="condition"
                                            value={c}
                                            id={`mobile-${c}`}
                                            className="accent-primary h-4 w-4"
                                            defaultChecked={condition?.includes(c)}
                                        />
                                        <label htmlFor={`mobile-${c}`} className="text-sm cursor-pointer">{c}</label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                            <Button type="submit" className="flex-1">Apply Filters</Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setIsOpen(false);
                                    router.push(`/categories/${slug}`);
                                }}
                            >
                                Clear
                            </Button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
