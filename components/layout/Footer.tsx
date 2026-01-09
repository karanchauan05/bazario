import Link from 'next/link';
import { Container } from './container';

export function Footer() {
    return (
        <footer className="bg-[#0B485D] text-white pt-16 pb-8">
            <Container>
                <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5 mb-16">
                    <div className="col-span-2 lg:col-span-2 space-y-4">
                        <Link href="/" className="flex items-center space-x-2 font-bold text-2xl mb-4">
                            <span className="font-serif">Bazario.</span>
                        </Link>
                        <p className="text-sm text-gray-300 max-w-xs leading-relaxed">
                            The premium marketplace for community commerce. Discover unique local finds or sell your items to a trusted network of buyers.
                        </p>
                        <div className="flex gap-4 pt-2">
                            {/* Social Placeholders */}
                            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                                <span className="text-xs">IG</span>
                            </div>
                            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                                <span className="text-xs">TW</span>
                            </div>
                            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                                <span className="text-xs">FB</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-secondary">Discover</h3>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li><Link href="/categories" className="hover:text-white transition-colors">All Categories</Link></li>
                            <li><Link href="/categories?sort=newest" className="hover:text-white transition-colors">New Arrivals</Link></li>
                            <li><Link href="/categories?sort=featured" className="hover:text-white transition-colors">Featured</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-secondary">Support</h3>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li><Link href="/" className="hover:text-white transition-colors">Help Center</Link></li>
                            <li><Link href="/" className="hover:text-white transition-colors">Safety Tips</Link></li>
                            <li><Link href="/" className="hover:text-white transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-secondary">Legal</h3>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li><Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/" className="hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link href="/" className="hover:text-white transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col items-center justify-between gap-4 md:flex-row text-xs text-gray-400">
                    <p>
                        © {new Date().getFullYear()} Bazario Inc. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <span>Made with ❤️ for the community</span>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
