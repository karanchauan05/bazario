import { Container } from "@/components/layout/container";
import { ListingGrid } from "@/components/listings/ListingGrid";
import { CategoryCard } from "@/components/features/CategoryCard";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/data/categories";
import { LISTINGS } from "@/lib/data/listings";
import { ArrowRight, Star, TrendingUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const featuredListings = LISTINGS.filter(l => l.featured).slice(0, 4);
  const recentListings = LISTINGS.slice(0, 8);

  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center text-center text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
            alt="Bazario Hero"
            fill
            className="object-cover brightness-[0.65]"
            priority
          />
        </div>

        <Container className="relative z-10 flex flex-col items-center">
          <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium backdrop-blur-md border border-white/20">
            The Premium Marketplace
          </span>
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl mb-6 max-w-4xl drop-shadow-sm">
            Discover Extraordinary <br />
            <span className="text-secondary">Local Finds</span>
          </h1>
          <p className="max-w-2xl text-lg sm:text-xl text-gray-100 mb-10 leading-relaxed drop-shadow-sm font-light">
            Bazario connects you with curated, high-quality listings in your community.
            From vintage decor to modern tech, find what speaks to you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 h-12 text-base shadow-lg hover:shadow-xl transition-all" asChild>
              <Link href="/categories">
                Shop Collections
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full bg-white/10 text-white border-white/40 hover:bg-white/20 hover:text-white font-semibold px-8 h-12 text-base backdrop-blur-sm" asChild>
              <Link href="/post-ad">
                Sell an Item
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Categories Section */}
      <Container>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2 text-primary">Browse by Category</h2>
          <p className="text-muted-foreground">Explore our wide range of premium collections</p>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {CATEGORIES.map(cat => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </Container>


      {/* Featured Listings - "Curated Picks" */}
      <section className="bg-[#FAF9F6] py-16 border-y border-stone-100">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 text-secondary font-medium mb-2">
                <Star className="h-5 w-5 fill-current" />
                <span>Handpicked for You</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-primary">Curated Selections</h2>
            </div>
            <Button variant="ghost" className="text-primary hover:text-primary/80 hover:bg-transparent p-0 flex items-center gap-2 group" asChild>
              <Link href="/categories?sort=featured">
                View All Featured <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          <ListingGrid listings={featuredListings} />
        </Container>
      </section>

      {/* Recent Listings - "Fresh Arrivals" */}
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-secondary font-medium mb-2">
              <TrendingUp className="h-5 w-5" />
              <span>Just In</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-primary">Fresh Arrivals</h2>
          </div>
          <Button variant="ghost" className="text-primary hover:text-primary/80 hover:bg-transparent p-0 flex items-center gap-2 group" asChild>
            <Link href="/categories?sort=newest">
              View All New <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <ListingGrid listings={recentListings} />

        <div className="mt-16 relative overflow-hidden rounded-3xl bg-primary text-white p-10 sm:p-20 text-center">
          {/* Decorative Circles */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col items-center">
            <h3 className="text-3xl sm:text-4xl font-bold mb-6">Start Selling on Bazario Today</h3>
            <p className="max-w-xl text-primary-foreground/80 mb-10 text-lg">
              Join thousands of sellers in your community. List your items for free and reach serious buyers instantly.
            </p>
            <Button size="lg" className="rounded-full bg-white text-primary hover:bg-white/90 font-bold px-10 h-14 text-lg" asChild>
              <Link href="/post-ad">Create Listing</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
