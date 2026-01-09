"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Menu, X, PlusCircle, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { CATEGORIES } from "@/lib/data/categories";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => setIsOpen(!isOpen);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsCategoryOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = formData.get("q");
        if (query) {
            router.push(`/search?q=${encodeURIComponent(query as string)}`);
        }
    };

    return (
        <nav className="sticky top-0 z-50 w-full bg-white border-b border-stone-200">
            <Container>
                <div className="flex h-20 items-center justify-between gap-8">
                    {/* Logo - Centered alignment on mobile, Left on desktop */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="h-8 w-8 bg-primary rounded-tr-xl rounded-bl-xl flex items-center justify-center transition-transform group-hover:rotate-12">
                            <span className="text-white font-serif font-bold text-lg">B</span>
                        </div>
                        <span className="font-sans text-2xl font-bold tracking-tight text-primary">Bazario.</span>
                    </Link>

                    {/* Desktop Search */}
                    <div className="hidden lg:flex flex-1 max-w-xl mx-auto">
                        <form onSubmit={handleSearch} className="relative w-full group">
                            <input
                                name="q"
                                type="text"
                                placeholder="Search for premium goods..."
                                className="w-full rounded-full border border-stone-200 bg-stone-50 px-5 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/70"
                            />
                            <button type="submit" className="absolute right-1 top-1 bottom-1 bg-white rounded-full p-1.5 shadow-sm border border-stone-100 hover:text-primary transition-colors text-muted-foreground">
                                <Search className="h-4 w-4" />
                            </button>
                        </form>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-6">
                        {/* Categories Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                                className={cn(
                                    "flex items-center text-sm font-semibold transition-colors hover:text-primary focus:outline-none tracking-wide",
                                    isCategoryOpen ? "text-primary" : "text-muted-foreground"
                                )}
                            >
                                Shop <ChevronDown className={cn("ml-1 h-3 w-3 transition-transform", isCategoryOpen && "rotate-180")} />
                            </button>

                            {isCategoryOpen && (
                                <div className="absolute top-full right-0 mt-6 w-72 rounded-xl border border-stone-100 bg-white p-2 shadow-xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                                    <div className="grid gap-1 p-1">
                                        {CATEGORIES.map((cat) => (
                                            <Link
                                                key={cat.id}
                                                href={`/categories/${cat.slug}`}
                                                className="flex items-center justify-between px-4 py-3 text-sm rounded-lg text-stone-600 hover:bg-stone-50 hover:text-primary transition-colors"
                                                onClick={() => setIsCategoryOpen(false)}
                                            >
                                                <span>{cat.name}</span>
                                            </Link>
                                        ))}
                                        <div className="h-px bg-stone-100 my-1" />
                                        <Link
                                            href="/categories"
                                            className="flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-lg bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
                                            onClick={() => setIsCategoryOpen(false)}
                                        >
                                            View All Collections
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        <Link
                            href="#"
                            className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary tracking-wide"
                        >
                            My Ads
                        </Link>

                        {/* Post Ad Button */}
                        <Button asChild className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 shadow-md hover:shadow-lg transition-all h-10">
                            <Link href="/post-ad">
                                <PlusCircle className="mr-2 h-4 w-4" /> Sell Item
                            </Link>
                        </Button>
                    </div>


                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden flex items-center">
                        <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-primary hover:bg-primary/5">
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>
            </Container>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-t border-stone-100 bg-white absolute w-full shadow-lg">
                    <Container className="py-6 space-y-6">
                        <form onSubmit={handleSearch} className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <input
                                name="q"
                                type="text"
                                placeholder="Search..."
                                className="w-full rounded-lg border bg-stone-50 pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary/20"
                            />
                        </form>
                        <div className="flex flex-col space-y-1">
                            <p className="text-xs font-bold text-muted-foreground mb-3 uppercase tracking-wider px-2">Collections</p>
                            {CATEGORIES.map(cat => (
                                <Link
                                    key={cat.id}
                                    href={`/categories/${cat.slug}`}
                                    className="px-2 py-2 text-sm font-medium text-stone-600 hover:text-primary hover:bg-stone-50 rounded-md transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {cat.name}
                                </Link>
                            ))}
                            <Link href="/categories" className="px-2 py-2 text-sm font-bold text-primary hover:bg-stone-50 rounded-md transition-colors mt-2" onClick={() => setIsOpen(false)}>
                                View All Categories
                            </Link>
                        </div>
                        <div className="flex flex-col space-y-2 pt-4 border-t border-stone-100">
                            <Button className="w-full rounded-full" asChild>
                                <Link href="/post-ad" onClick={() => setIsOpen(false)}>
                                    <PlusCircle className="mr-2 h-4 w-4" /> Post an Ad
                                </Link>
                            </Button>
                        </div>
                    </Container>
                </div>
            )}
        </nav>
    );
}
