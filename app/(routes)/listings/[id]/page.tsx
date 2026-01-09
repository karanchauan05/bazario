import { Container } from "@/components/layout/container";
import { ImageGallery } from "@/components/listings/ImageGallery";
import { Button } from "@/components/ui/button";
import { LISTINGS } from "@/lib/data/listings";
import { CATEGORIES } from "@/lib/data/categories";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { MapPin, ShieldCheck, Share2, Heart, Flag } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

interface ListingPageProps {
    params: Promise<{
        id: string;
    }>;
}

// Generate Static Params for SSG
export function generateStaticParams() {
    return LISTINGS.map((listing) => ({
        id: listing.id,
    }));
}

// Metadata
export async function generateMetadata({ params }: ListingPageProps): Promise<Metadata> {
    const { id } = await params;
    const listing = LISTINGS.find((l) => l.id === id);
    if (!listing) return { title: "Listing Not Found" };

    return {
        title: `${listing.title} - ${listing.currency}${listing.price}`,
        description: listing.description.substring(0, 160),
    };
}

export default async function ListingPage({ params }: ListingPageProps) {
    const { id } = await params;
    const listing = LISTINGS.find((l) => l.id === id);

    if (!listing) {
        notFound();
    }

    const category = CATEGORIES.find(c => c.id === listing.category);

    return (
        <Container className="py-12">
            {/* Breadcrumbs (Simple) */}
            <nav className="mb-8 text-sm text-muted-foreground flex items-center">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <span className="mx-2 text-stone-300">/</span>
                <Link href="/categories" className="hover:text-primary transition-colors">Categories</Link>
                {category && (
                    <>
                        <span className="mx-2 text-stone-300">/</span>
                        <Link href={`/categories/${category.slug}`} className="hover:text-primary transition-colors">{category.name}</Link>
                    </>
                )}
                <span className="mx-2 text-stone-300">/</span>
                <span className="text-foreground font-medium truncate max-w-[200px]">{listing.title}</span>
            </nav>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 xl:gap-20">
                {/* Left Column: Images */}
                <div className="space-y-4">
                    <ImageGallery images={listing.images} title={listing.title} />
                </div>

                {/* Right Column: Info & Actions */}
                <div className="space-y-8">
                    <div className="border-b border-stone-100 pb-8">
                        <h1 className="text-4xl font-serif font-bold text-primary mb-2 tracking-tight">{listing.title}</h1>
                        <div className="flex items-center gap-4 mt-4">
                            <span className="text-3xl font-medium text-secondary">{listing.currency}{listing.price.toLocaleString()}</span>
                            <div className="h-6 w-px bg-stone-200"></div>
                            <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                <MapPin className="h-4 w-4" />
                                <span>{listing.location}</span>
                            </div>
                        </div>
                    </div>

                    <div className="prose max-w-none text-muted-foreground leading-relaxed whitespace-pre-line text-base">
                        {listing.description}
                    </div>

                    <div className="bg-stone-50 rounded-xl p-6 space-y-4">
                        <h3 className="font-semibold text-primary">Item Details</h3>
                        <dl className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
                            <div className="sm:col-span-1">
                                <dt className="text-muted-foreground mb-1">Condition</dt>
                                <dd className="font-medium text-foreground">{listing.condition}</dd>
                            </div>
                            <div className="sm:col-span-1">
                                <dt className="text-muted-foreground mb-1">Posted On</dt>
                                <dd className="font-medium text-foreground">{format(new Date(listing.postedAt), 'MMM d, yyyy')}</dd>
                            </div>
                            {Object.entries(listing.attributes).map(([key, value]) => (
                                <div key={key} className="sm:col-span-1">
                                    <dt className="text-muted-foreground mb-1">{key}</dt>
                                    <dd className="font-medium text-foreground">{value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    <div className="flex flex-col gap-4 pt-4">
                        <Button size="lg" className="w-full text-lg h-14 rounded-full shadow-md hover:shadow-lg transition-all">
                            Contact Seller
                        </Button>
                        <div className="flex gap-4">
                            <Button variant="outline" className="flex-1 h-12 rounded-full border-stone-200">
                                <Heart className="mr-2 h-4 w-4" /> Save
                            </Button>
                            <Button variant="outline" className="flex-1 h-12 rounded-full border-stone-200">
                                <Share2 className="mr-2 h-4 w-4" /> Share
                            </Button>
                        </div>
                    </div>

                    {/* Seller Info */}
                    <div className="flex items-center gap-4 pt-8 border-t border-stone-100">
                        <div className="h-14 w-14 rounded-full bg-primary/5 flex items-center justify-center text-primary font-bold text-xl border border-primary/10">
                            {listing.seller.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-lg text-primary">{listing.seller.name}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>Member since {new Date(listing.seller.joined).getFullYear()}</span>
                                {listing.seller.verified && (
                                    <>
                                        <span className="h-1 w-1 rounded-full bg-stone-300"></span>
                                        <span className="flex items-center text-green-600">
                                            <ShieldCheck className="mr-1 h-3 w-3" /> Verified
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-start">
                        <Button variant="link" className="text-muted-foreground hover:text-destructive pl-0 h-auto text-xs">
                            <Flag className="mr-2 h-3 w-3" /> Report this ad
                        </Button>
                    </div>

                </div>
            </div>
        </Container>
    );
}
