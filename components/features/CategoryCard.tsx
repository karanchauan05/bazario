import Link from "next/link";
import { Category } from "@/lib/types";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
    category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
    // Safe dynamic icon rendering
    const IconComponent = (Icons[category.icon as keyof typeof Icons] as LucideIcon) || Icons.HelpCircle;

    return (
        <Link
            href={`/categories/${category.slug}`}
            className="group flex flex-col items-center text-center p-4 rounded-xl transition-all hover:bg-muted/30"
        >
            <div className={cn("mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-stone-100 transition-all group-hover:scale-105 group-hover:bg-white group-hover:shadow-lg border border-stone-200/50")}>
                <IconComponent className="h-8 w-8 text-primary/80 transition-colors group-hover:text-primary" />
            </div>
            <h3 className="font-semibold text-primary">{category.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">{category.itemCount} items</p>
        </Link>
    );
}
